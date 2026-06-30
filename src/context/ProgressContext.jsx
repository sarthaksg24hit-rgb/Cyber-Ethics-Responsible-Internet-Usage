import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const API_BASE = 'http://localhost:3001/api';
const TOTAL_MODULES = 7;
const CERT_SCORE = 70;

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const { token, isAuthenticated } = useAuth();
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchProgress = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/user/progress`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        // Normalize progress data into { [moduleId]: { completed, score, completedAt } }
        const progressMap = {};
        if (data.progress && Array.isArray(data.progress)) {
          data.progress.forEach((p) => {
            progressMap[p.moduleId] = {
              completed: p.completed,
              score: p.score,
              completedAt: p.completedAt,
            };
          });
        } else if (data.progress && typeof data.progress === 'object') {
          Object.assign(progressMap, data.progress);
        } else if (typeof data === 'object' && !Array.isArray(data)) {
          // Backend returns progress directly as an object
          Object.assign(progressMap, data);
        }
        setProgress(progressMap);
      }
    } catch (err) {
      console.error('Failed to fetch progress:', err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Fetch progress when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchProgress();
    } else {
      setProgress({});
    }
  }, [isAuthenticated, fetchProgress]);

  const submitQuiz = useCallback(
    async (moduleId, answers) => {
      if (!token) throw new Error('Not authenticated');

      const res = await fetch(`${API_BASE}/quiz/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ moduleId, answers }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Quiz submission failed');
      }

      // Update local progress state
      setProgress((prev) => ({
        ...prev,
        [moduleId]: {
          completed: true,
          score: data.percentage,
          completedAt: data.completedAt || new Date().toISOString(),
        },
      }));

      return data;
    },
    [token]
  );

  // All modules are always available — no locking
  const getModuleStatus = useCallback(
    (moduleId) => {
      const moduleNum = typeof moduleId === 'string' ? parseInt(moduleId, 10) : moduleId;

      // Check if this module is completed (quiz taken)
      const moduleProgress = progress[moduleId] || progress[moduleNum];
      if (moduleProgress?.completed) {
        return 'completed';
      }

      return 'available';
    },
    [progress]
  );

  const getOverallProgress = useCallback(() => {
    const completedCount = Object.values(progress).filter(
      (p) => p.completed
    ).length;

    return {
      completed: completedCount,
      total: TOTAL_MODULES,
      percentage: Math.round((completedCount / TOTAL_MODULES) * 100),
    };
  }, [progress]);

  // Check if eligible for certificate: all 6 modules completed with >= 70%
  const isCertificateEligible = useCallback(() => {
    for (let i = 1; i <= TOTAL_MODULES; i++) {
      const mod = progress[i] || progress[String(i)];
      if (!mod || !mod.completed || mod.score < CERT_SCORE) {
        return false;
      }
    }
    return true;
  }, [progress]);

  // Get certificate progress detail
  const getCertificateProgress = useCallback(() => {
    const modules = [];
    for (let i = 1; i <= TOTAL_MODULES; i++) {
      const mod = progress[i] || progress[String(i)];
      modules.push({
        moduleId: i,
        completed: !!mod?.completed,
        score: mod?.score ?? null,
        passed: (mod?.score ?? 0) >= CERT_SCORE,
      });
    }
    const passedCount = modules.filter((m) => m.passed).length;
    return { modules, passedCount, total: TOTAL_MODULES, eligible: passedCount === TOTAL_MODULES };
  }, [progress]);

  const value = {
    progress,
    loading,
    fetchProgress,
    submitQuiz,
    getModuleStatus,
    getOverallProgress,
    isCertificateEligible,
    getCertificateProgress,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}

export default ProgressContext;
