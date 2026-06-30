import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';
import { ArrowLeft, Clock, BookOpen, Video, Brain, Lightbulb, PlayCircle, CheckCircle } from 'lucide-react';
import './TopicDetail.css';

export default function TopicDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const { getModuleStatus, progress } = useProgress();
  
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('notes'); // 'notes', 'video', 'quiz'

  const status = getModuleStatus(parseInt(id, 10));
  const isCompleted = status === 'completed';

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/modules/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch module details');
        }

        const data = await response.json();
        setModule(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchModule();
  }, [id, token, status, navigate]);

  if (loading) {
    return (
      <div className="topic-loading">
        <div className="spinner"></div>
        <p>Loading module content...</p>
      </div>
    );
  }

  if (error || !module) {
    return (
      <div className="topic-error">
        <h2>Oops! Something went wrong.</h2>
        <p>{error}</p>
        <Link to="/dashboard" className="btn-primary">Back to Dashboard</Link>
      </div>
    );
  }

  const moduleProgress = progress[module.id];
  const quizTaken = !!moduleProgress;

  return (
    <div className="topic-detail-page">
      <div className="container topic-container animate-fadeIn">
        
        <button onClick={() => navigate('/dashboard')} className="btn-ghost back-button">
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <header className="topic-header glass-card">
          <div className="topic-header-content">
            <h1 className="gradient-text">{module.title}</h1>
            <div className="topic-meta">
              <span className="badge badge-info">
                <Clock size={14} />
                {module.estimatedMinutes} mins
              </span>
              {isCompleted && (
                <span className="badge badge-success">
                  <CheckCircle size={14} />
                  Completed
                </span>
              )}
            </div>
            <p className="topic-intro">{module.notes?.introduction}</p>
          </div>
        </header>

        <div className="topic-tabs">
          <button 
            className={`tab-button ${activeTab === 'notes' ? 'active' : ''}`}
            onClick={() => setActiveTab('notes')}
          >
            <BookOpen size={18} /> Notes
          </button>
          <button 
            className={`tab-button ${activeTab === 'video' ? 'active' : ''}`}
            onClick={() => setActiveTab('video')}
          >
            <Video size={18} /> Video
          </button>
          <button 
            className={`tab-button ${activeTab === 'quiz' ? 'active' : ''}`}
            onClick={() => setActiveTab('quiz')}
          >
            <Brain size={18} /> Quiz
          </button>
        </div>

        <div className="topic-content animate-slideUp">
          {activeTab === 'notes' && (
            <div className="tab-notes">
              <div className="notes-key-points">
                {module.notes?.keyPoints?.map((point, idx) => (
                  <div key={idx} className="glass-card key-point-card">
                    <h3>{point.heading}</h3>
                    {point.content && <p>{point.content}</p>}
                    {point.table && (
                      <div className="table-responsive">
                        <table className="notes-table">
                          <thead>
                            <tr>
                              {point.table.headers.map((h, i) => <th key={i}>{h}</th>)}
                            </tr>
                          </thead>
                          <tbody>
                            {point.table.rows.map((row, rIdx) => (
                              <tr key={rIdx}>
                                {row.map((cell, cIdx) => <td key={cIdx}>{cell}</td>)}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {module.notes?.examples && module.notes.examples.length > 0 && (
                <div className="glass-card examples-card">
                  <div className="examples-header">
                    <Lightbulb size={24} className="accent-icon" />
                    <h3>Real-world Examples</h3>
                  </div>
                  <ul>
                    {module.notes.examples.map((ex, idx) => (
                      <li key={idx}>{ex}</li>
                    ))}
                  </ul>
                </div>
              )}

              {module.notes?.summary && (
                <div className="glass-card summary-card">
                  <h3>Summary</h3>
                  <p>{module.notes.summary}</p>
                </div>
              )}
              
              <div className="tab-actions">
                <button className="btn-secondary" onClick={() => setActiveTab('video')}>
                  <PlayCircle size={18} /> Watch Video
                </button>
                <button className="btn-primary" onClick={() => setActiveTab('quiz')}>
                  Take Quiz <ArrowLeft className="arrow-right" size={18} />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'video' && (
            <div className="tab-video">
              <div className="video-container glass-card">
                <iframe
                  src={module.videoUrl}
                  title={module.videoTitle}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h3 className="video-title">{module.videoTitle}</h3>
              <p className="video-note">Watch this short video to reinforce the concepts covered in the notes.</p>
              
              <div className="tab-actions">
                <button className="btn-primary" onClick={() => setActiveTab('quiz')}>
                  Take Quiz
                </button>
              </div>
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="tab-quiz glass-card text-center">
              <Brain size={48} className="quiz-icon" />
              <h2>{module.title} Quiz</h2>
              <p>Test your understanding of this topic. Score 70% or above in all modules to earn your certificate.</p>
              
              {quizTaken && (
                <div className="quiz-previous-score">
                  <p>Your highest score:</p>
                  <div className={`score-badge ${moduleProgress.score >= 70 ? 'pass' : 'fail'}`}>
                    {moduleProgress.score}%
                  </div>
                </div>
              )}
              
              <div className="tab-actions center">
                <Link to={`/module/${module.id}/quiz`} className="btn-primary btn-large">
                  {quizTaken ? 'Retake Quiz' : 'Start Quiz'}
                </Link>
              </div>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
