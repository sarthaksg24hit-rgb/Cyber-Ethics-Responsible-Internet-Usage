import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Shield,
  Menu,
  X,
  LogOut,
  BookOpen,
  Target,
  Clock,
  Lock,
  Circle,
  CheckCircle,
  ChevronRight,
  Scale,
  Fingerprint,
  Users,
  ShieldAlert,
  Copyright,
  Award,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';
import ProgressRing from '../../components/ProgressRing';
import './Dashboard.css';

const API_BASE = 'http://localhost:3001/api';

const ICON_MAP = {
  Shield,
  Scale,
  Fingerprint,
  Users,
  ShieldAlert,
  Lock,
  Copyright,
};

const COLOR_CYCLE = ['blue', 'teal', 'purple', 'pink', 'orange', 'green', 'blue'];

function ModuleCard({ module, status, score, onClick }) {
  const IconComponent = ICON_MAP[module.icon] || BookOpen;
  const colorClass = COLOR_CYCLE[(module.order - 1) % COLOR_CYCLE.length];

  const statusLabel = status === 'completed' ? 'Completed' : 'Available';

  return (
    <div
      className="module-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onClick();
      }}
    >
      <div className="module-card-top">
        <div className={`module-card-icon ${colorClass}`}>
          <IconComponent size={22} />
        </div>
        <span className={`module-card-status-badge ${status}`}>
          {status === 'completed' && <CheckCircle size={12} />}
          {statusLabel}
        </span>
      </div>
      <h3>{module.title}</h3>
      <p className="module-card-desc">{module.shortDescription}</p>
      <div className="module-card-footer">
        <span className="module-card-time">
          <Clock size={14} />
          {module.estimatedMinutes}m
        </span>
        {status === 'completed' && score !== undefined && (
          <span className={`module-card-score ${score >= 70 ? 'pass' : 'below'}`}>{score}%</span>
        )}
        {status === 'available' && (
          <ChevronRight size={16} style={{ color: 'var(--accent-blue)' }} />
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user, token, logout } = useAuth();
  const { progress, fetchProgress, getModuleStatus, getOverallProgress, getCertificateProgress } =
    useProgress();
  const navigate = useNavigate();

  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch modules
  useEffect(() => {
    const loadModules = async () => {
      try {
        const res = await fetch(`${API_BASE}/modules`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setModules(data);
        }
      } catch (err) {
        console.error('Failed to load modules:', err);
      } finally {
        setLoading(false);
      }
    };

    loadModules();
    fetchProgress();
  }, [token, fetchProgress]);

  // Overall progress
  const overall = useMemo(() => getOverallProgress(), [getOverallProgress]);

  // Current module (first uncompleted)
  const currentModule = useMemo(() => {
    for (const mod of modules) {
      const status = getModuleStatus(mod.id);
      if (status === 'available') return mod;
    }
    return modules[modules.length - 1] || null;
  }, [modules, getModuleStatus]);

  // Average score
  const averageScore = useMemo(() => {
    const scores = Object.values(progress).filter((p) => p.score !== undefined);
    if (scores.length === 0) return 0;
    const total = scores.reduce((sum, p) => sum + (p.score || 0), 0);
    return Math.round(total / scores.length);
  }, [progress]);

  const firstName = user?.name?.split(' ')[0] || 'Student';

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner" />
      </div>
    );
  }

  const CurrentModuleIcon =
    currentModule && ICON_MAP[currentModule.icon]
      ? ICON_MAP[currentModule.icon]
      : BookOpen;

  const currentStatus = currentModule
    ? getModuleStatus(currentModule.id)
    : null;
  const currentProgress = currentModule ? progress[currentModule.id] : null;

  return (
    <div className="dashboard-layout">
      {/* Sidebar backdrop for mobile */}
      <div
        className={`sidebar-backdrop ${sidebarOpen ? 'active' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link
            to="/dashboard"
            className="sidebar-brand"
            onClick={() => setSidebarOpen(false)}
          >
            <Shield size={22} className="sidebar-brand-icon" />
            <span className="sidebar-brand-text">CyberEthics</span>
          </Link>

          <div className="sidebar-user">
            <div className="sidebar-avatar">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user?.name || 'User'}</div>
              <div className="sidebar-user-email">
                {user?.email || 'user@example.com'}
              </div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="sidebar-progress">
          <ProgressRing
            percentage={overall.percentage}
            size={90}
            strokeWidth={7}
          />
          <span className="sidebar-progress-text">
            {overall.completed} of {overall.total} modules completed
          </span>
        </div>

        {/* Module List */}
        <div className="sidebar-modules">
          <div className="sidebar-modules-title">Modules</div>
          <ul className="sidebar-module-list">
            {modules.map((mod) => {
              const status = getModuleStatus(mod.id);
              const modProgress = progress[mod.id];
              const isActive =
                currentModule && currentModule.id === mod.id;

              const StatusIcon =
                status === 'completed'
                  ? CheckCircle
                  : Circle;

              return (
                <li key={mod.id}>
                  <div
                    className={`sidebar-module-item ${status} ${
                      isActive ? 'active' : ''
                    }`}
                    onClick={() => {
                      navigate(`/module/${mod.id}`);
                      setSidebarOpen(false);
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <span className={`sidebar-module-icon ${status}`}>
                      <StatusIcon size={16} />
                    </span>
                    <span className="sidebar-module-title">{mod.title}</span>
                    {status === 'completed' && modProgress?.score !== undefined && (
                      <span className="sidebar-module-score">
                        {modProgress.score}%
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="sidebar-footer">
          <button className="sidebar-logout-btn" onClick={logout}>
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <button
            className="topbar-hamburger"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="topbar-greeting">
            Hello, {firstName}
            <span>Let's keep learning!</span>
          </div>
          <div className="topbar-actions">
            <button className="topbar-logout" onClick={logout}>
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </header>

        <div className="dashboard-content">
          {/* Welcome */}
          <div className="dashboard-welcome animate-fadeIn">
            <h1>
              Welcome back,{' '}
              <span className="name-highlight">{firstName}!</span>
            </h1>
            <p>
              Continue your journey to becoming a responsible digital citizen.
            </p>
          </div>

          {/* Stats */}
          <div className="dashboard-stats">
            <div className="stat-card animate-fadeIn delay-1">
              <div className="stat-card-header">
                <span className="stat-card-label">Modules Completed</span>
                <div className="stat-card-icon">
                  <BookOpen size={18} />
                </div>
              </div>
              <div className="stat-card-value">
                {overall.completed}/{overall.total}
              </div>
            </div>

            <div className="stat-card animate-fadeIn delay-2">
              <div className="stat-card-header">
                <span className="stat-card-label">Average Score</span>
                <div className="stat-card-icon">
                  <Target size={18} />
                </div>
              </div>
              <div className="stat-card-value">{averageScore}%</div>
            </div>

            <div className="stat-card animate-fadeIn delay-3">
              <div className="stat-card-header">
                <span className="stat-card-label">Time Spent</span>
                <div className="stat-card-icon">
                  <Clock size={18} />
                </div>
              </div>
              <div className="stat-card-value">
                ~{overall.completed * 15}m
              </div>
            </div>
          </div>

          {/* Continue Learning */}
          {currentModule && (
            <div className="dashboard-section animate-fadeIn delay-3">
              <div className="dashboard-section-header">
                <h2>Continue Learning</h2>
              </div>
              <div className="current-module-card">
                <div className="current-module-icon">
                  <CurrentModuleIcon size={28} />
                </div>
                <div className="current-module-info">
                  <h3>{currentModule.title}</h3>
                  <p>{currentModule.shortDescription}</p>
                  <span className="current-module-status">
                    {currentStatus === 'completed'
                      ? `Quiz score: ${
                          currentProgress?.score ?? '—'
                        }%`
                      : 'Not started'}
                  </span>
                </div>
                <Link
                  to={`/module/${currentModule.id}`}
                  className="btn-primary"
                >
                  {currentStatus === 'completed'
                    ? 'Review'
                    : 'Start Module'}
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          )}

          {/* Certificate Progress Banner */}
          {(() => {
            const cert = getCertificateProgress();
            return (
              <div className={`certificate-banner glass-card animate-fadeIn delay-3 ${cert.eligible ? 'eligible' : ''}`}>
                <div className="cert-banner-icon">
                  <Award size={32} />
                </div>
                <div className="cert-banner-content">
                  <h3>{cert.eligible ? '🎉 You are eligible for your certificate!' : 'Earn Your Certificate'}</h3>
                  <p>
                    {cert.eligible
                      ? 'Congratulations! You scored above 70% in all modules. Claim your certificate now!'
                      : `Score above 70% in all 7 modules to earn your certificate. Progress: ${cert.passedCount}/${cert.total} modules passed.`}
                  </p>
                  {!cert.eligible && (
                    <div className="cert-module-dots">
                      {cert.modules.map((m) => (
                        <span key={m.moduleId} className={`cert-dot ${m.passed ? 'passed' : m.completed ? 'below' : 'pending'}`} title={`Module ${m.moduleId}: ${m.score !== null ? m.score + '%' : 'Not attempted'}`}>
                          {m.moduleId}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                {cert.eligible && (
                  <Link to="/certificate" className="btn-primary">
                    <Award size={18} /> View Certificate
                  </Link>
                )}
              </div>
            );
          })()}

          {/* All Modules */}
          <div className="dashboard-section animate-fadeIn delay-4">
            <div className="dashboard-section-header">
              <h2>All Modules</h2>
            </div>
            <div className="modules-grid">
              {modules.map((mod) => {
                const status = getModuleStatus(mod.id);
                const modProgress = progress[mod.id];

                return (
                  <ModuleCard
                    key={mod.id}
                    module={mod}
                    status={status}
                    score={modProgress?.score}
                    onClick={() => navigate(`/module/${mod.id}`)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
