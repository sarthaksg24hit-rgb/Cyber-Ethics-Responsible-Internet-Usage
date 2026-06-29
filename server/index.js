const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { modules } = require('./data/modules');
const { authMiddleware, JWT_SECRET } = require('./middleware/auth');

// ─── App Setup ───────────────────────────────────────────────────────────────

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// ─── In-Memory Data Store ────────────────────────────────────────────────────

const users = [];

// ─── Seed Test User ──────────────────────────────────────────────────────────

(async function seedUsers() {
  const passwordHash = await bcrypt.hash('Test1234', 10);
  users.push({
    id: 1,
    name: 'Test Student',
    email: 'student@test.com',
    passwordHash,
    progress: {},
    signedUpAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  });
  console.log('Seed user created — student@test.com / Test1234');

  // Seed admin account
  const adminHash = await bcrypt.hash('Admin1234', 10);
  users.push({
    id: 2,
    name: 'Admin',
    email: 'admin@cyberethics.com',
    passwordHash: adminHash,
    progress: {},
    signedUpAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
    isAdmin: true,
  });
  console.log('Admin user created — admin@cyberethics.com / Admin1234');
})();

// ─── Helper: generate a JWT for a user ───────────────────────────────────────

function generateToken(user) {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

// ─── Helper: strip quiz answers from a module ────────────────────────────────

function stripAnswers(mod) {
  const { quiz, notes, ...rest } = mod;
  const safeQuiz = (quiz || []).map(({ correctIndex, correctAnswer, explanation, ...q }) => q);
  return { ...rest, quiz: safeQuiz };
}

function stripAnswersWithNotes(mod) {
  const { quiz, ...rest } = mod;
  const safeQuiz = (quiz || []).map(({ correctIndex, correctAnswer, explanation, ...q }) => q);
  return { ...rest, quiz: safeQuiz };
}

// ─── Auth Routes ─────────────────────────────────────────────────────────────

// POST /api/auth/signup
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate fields
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Name is required.' });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'A valid email is required.' });
    }
    if (!password || password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters.' });
    }

    // Check for duplicate email
    if (users.find((u) => u.email === email)) {
      return res.status(409).json({ message: 'Email is already registered.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = {
      id: users.length + 1,
      name: name.trim(),
      email,
      passwordHash,
      progress: {},
      signedUpAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };
    users.push(newUser);

    const token = generateToken(newUser);
    return res.status(201).json({
      token,
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Track last login
    user.lastLoginAt = new Date().toISOString();

    const token = generateToken(user);
    return res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, isAdmin: !!user.isAdmin },
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

// ─── Module Routes (protected) ──────────────────────────────────────────────

// GET /api/modules — list all modules (no answers, no full notes)
app.get('/api/modules', authMiddleware, (req, res) => {
  const list = modules.map((mod) => stripAnswers(mod));
  return res.json(list);
});

// GET /api/modules/:id — single module detail (with notes, no answers)
app.get('/api/modules/:id', authMiddleware, (req, res) => {
  const mod = modules.find((m) => m.id === parseInt(req.params.id, 10));
  if (!mod) {
    return res.status(404).json({ message: 'Module not found.' });
  }
  return res.json(stripAnswersWithNotes(mod));
});

// ─── Quiz Route (protected) ─────────────────────────────────────────────────

// POST /api/quiz/submit
app.post('/api/quiz/submit', authMiddleware, (req, res) => {
  try {
    const { moduleId, answers } = req.body;

    const mod = modules.find((m) => m.id === moduleId);
    if (!mod) {
      return res.status(404).json({ message: 'Module not found.' });
    }

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: 'Answers array is required.' });
    }

    const results = [];
    let correctCount = 0;

    for (const answer of answers) {
      const question = mod.quiz.find((q) => q.id === answer.questionId);
      if (!question) continue;

      let isCorrect = false;
      let userAnswer;
      let correctAnswer;

      if (question.type === 'mcq') {
        userAnswer = answer.selectedIndex;
        correctAnswer = question.correctIndex;
        isCorrect = answer.selectedIndex === question.correctIndex;
      } else if (question.type === 'true-false') {
        userAnswer = answer.selectedAnswer;
        correctAnswer = question.correctAnswer;
        isCorrect = answer.selectedAnswer === question.correctAnswer;
      }

      if (isCorrect) correctCount++;

      results.push({
        questionId: question.id,
        correct: isCorrect,
        correctAnswer,
        explanation: question.explanation,
        userAnswer,
      });
    }

    const total = mod.quiz.length;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    // Save progress
    const user = users.find((u) => u.id === req.user.id);
    if (user) {
      user.progress[moduleId] = {
        completed: percentage >= 60,
        score: percentage,
        completedAt: new Date().toISOString(),
        answers: answers,
      };
    }

    return res.json({ score: correctCount, total, percentage, results });
  } catch (err) {
    console.error('Quiz submit error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

// ─── User Progress Route (protected) ────────────────────────────────────────

// GET /api/user/progress
app.get('/api/user/progress', authMiddleware, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }
  return res.json(user.progress);
});

// ─── Admin Route ─────────────────────────────────────────────────────────────

// GET /api/admin/users — returns all user data (admin only)
app.get('/api/admin/users', authMiddleware, (req, res) => {
  // Check if user is admin
  const requestingUser = users.find((u) => u.id === req.user.id);
  if (!requestingUser || !requestingUser.isAdmin) {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }

  const userData = users.map((u) => {
    // Calculate module stats
    const progressEntries = Object.entries(u.progress || {});
    const modulesAttempted = progressEntries.length;
    const modulesPassed = progressEntries.filter(([, p]) => p.score >= 70).length;
    const avgScore = modulesAttempted > 0
      ? Math.round(progressEntries.reduce((sum, [, p]) => sum + (p.score || 0), 0) / modulesAttempted)
      : 0;
    const certificateEligible = modulesPassed === 6;

    return {
      id: u.id,
      name: u.name,
      email: u.email,
      isAdmin: !!u.isAdmin,
      signedUpAt: u.signedUpAt,
      lastLoginAt: u.lastLoginAt,
      modulesAttempted,
      modulesPassed,
      avgScore,
      certificateEligible,
      progress: u.progress,
    };
  });

  return res.json({ users: userData, totalUsers: userData.length });
});

// ─── Start Server ────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`Cyber Ethics server running on http://localhost:${PORT}`);
});
