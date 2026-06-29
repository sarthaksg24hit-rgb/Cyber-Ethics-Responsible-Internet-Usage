import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  Shield,
  Award,
  Clock,
  BookOpen,
  Target,
  ArrowLeft,
  RefreshCw,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import './Admin.css';

const API_BASE = 'http://localhost:3001/api';

export default function Admin() {
  const { user, token } = useAuth();
  const [usersData, setUsersData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedUser, setExpandedUser] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to fetch user data');
      }

      const data = await res.json();
      setUsersData(data.users);
      setTotalUsers(data.totalUsers);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && user?.isAdmin) fetchUsers();
  }, [token, user]);

  // Redirect non-admins (after all hooks)
  if (user && !user.isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  const formatDate = (isoString) => {
    if (!isoString) return '—';
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const toggleExpand = (userId) => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };

  // Stats
  const studentUsers = usersData.filter((u) => !u.isAdmin);
  const certEligible = studentUsers.filter((u) => u.certificateEligible).length;
  const avgScoreAll = studentUsers.length > 0
    ? Math.round(studentUsers.reduce((sum, u) => sum + u.avgScore, 0) / studentUsers.length)
    : 0;

  return (
    <div className="admin-page">
      <div className="container admin-container animate-fadeIn">

        <div className="admin-top-bar">
          <Link to="/dashboard" className="btn-ghost">
            <ArrowLeft size={20} /> Back to Dashboard
          </Link>
          <button className="btn-secondary" onClick={fetchUsers} disabled={loading}>
            <RefreshCw size={16} className={loading ? 'spin' : ''} /> Refresh
          </button>
        </div>

        <header className="admin-header">
          <div className="admin-header-icon">
            <Shield size={32} />
          </div>
          <div>
            <h1>Admin Dashboard</h1>
            <p>View and monitor all registered users and their progress.</p>
          </div>
        </header>

        {error && (
          <div className="admin-error glass-card">
            <p>Error: {error}</p>
          </div>
        )}

        {/* Summary Stats */}
        <div className="admin-stats">
          <div className="admin-stat-card glass-card">
            <div className="admin-stat-icon users-icon">
              <Users size={20} />
            </div>
            <div className="admin-stat-info">
              <span className="admin-stat-value">{studentUsers.length}</span>
              <span className="admin-stat-label">Total Students</span>
            </div>
          </div>

          <div className="admin-stat-card glass-card">
            <div className="admin-stat-icon cert-icon">
              <Award size={20} />
            </div>
            <div className="admin-stat-info">
              <span className="admin-stat-value">{certEligible}</span>
              <span className="admin-stat-label">Certificate Eligible</span>
            </div>
          </div>

          <div className="admin-stat-card glass-card">
            <div className="admin-stat-icon score-icon">
              <Target size={20} />
            </div>
            <div className="admin-stat-info">
              <span className="admin-stat-value">{avgScoreAll}%</span>
              <span className="admin-stat-label">Avg. Score</span>
            </div>
          </div>

          <div className="admin-stat-card glass-card">
            <div className="admin-stat-icon module-icon">
              <BookOpen size={20} />
            </div>
            <div className="admin-stat-info">
              <span className="admin-stat-value">6</span>
              <span className="admin-stat-label">Total Modules</span>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="admin-table-section glass-card">
          <div className="admin-table-header">
            <h2><Users size={20} /> Registered Users</h2>
            <span className="admin-table-count">{totalUsers} total</span>
          </div>

          {loading ? (
            <div className="admin-table-loading">
              <div className="spinner"></div>
              <p>Loading user data...</p>
            </div>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Signed Up</th>
                    <th>Last Login</th>
                    <th>Modules</th>
                    <th>Avg Score</th>
                    <th>Certificate</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {usersData.map((u) => (
                    <React.Fragment key={u.id}>
                      <tr className={expandedUser === u.id ? 'expanded' : ''}>
                        <td className="td-id">{u.id}</td>
                        <td>
                          <div className="user-cell">
                            <div className="user-avatar">{u.name.charAt(0).toUpperCase()}</div>
                            <span>{u.name}</span>
                          </div>
                        </td>
                        <td className="td-email">{u.email}</td>
                        <td>
                          <span className={`role-badge ${u.isAdmin ? 'admin' : 'student'}`}>
                            {u.isAdmin ? 'Admin' : 'Student'}
                          </span>
                        </td>
                        <td className="td-date">{formatDate(u.signedUpAt)}</td>
                        <td className="td-date">{formatDate(u.lastLoginAt)}</td>
                        <td>
                          <span className="modules-cell">
                            {u.modulesPassed}/{u.modulesAttempted > 6 ? 6 : u.modulesAttempted}
                            <span className="modules-label"> passed</span>
                          </span>
                        </td>
                        <td>
                          <span className={`score-cell ${u.avgScore >= 70 ? 'high' : u.avgScore > 0 ? 'low' : 'none'}`}>
                            {u.avgScore > 0 ? `${u.avgScore}%` : '—'}
                          </span>
                        </td>
                        <td>
                          {u.certificateEligible ? (
                            <span className="cert-badge eligible">
                              <Award size={14} /> Yes
                            </span>
                          ) : (
                            <span className="cert-badge not-eligible">
                              No
                            </span>
                          )}
                        </td>
                        <td>
                          {!u.isAdmin && u.modulesAttempted > 0 && (
                            <button
                              className="expand-btn"
                              onClick={() => toggleExpand(u.id)}
                              title="View module details"
                            >
                              {expandedUser === u.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                          )}
                        </td>
                      </tr>

                      {/* Expanded row — module progress detail */}
                      {expandedUser === u.id && (
                        <tr className="expanded-row">
                          <td colSpan="10">
                            <div className="expanded-content">
                              <h4>Module Progress for {u.name}</h4>
                              <div className="expanded-modules-grid">
                                {[1, 2, 3, 4, 5, 6].map((modId) => {
                                  const modProgress = u.progress?.[modId] || u.progress?.[String(modId)];
                                  return (
                                    <div key={modId} className={`expanded-module-card ${modProgress ? (modProgress.score >= 70 ? 'passed' : 'attempted') : 'not-attempted'}`}>
                                      <span className="expanded-module-id">Module {modId}</span>
                                      {modProgress ? (
                                        <>
                                          <span className={`expanded-module-score ${modProgress.score >= 70 ? 'pass' : 'fail'}`}>
                                            {modProgress.score}%
                                          </span>
                                          <span className="expanded-module-date">
                                            {formatDate(modProgress.completedAt)}
                                          </span>
                                        </>
                                      ) : (
                                        <span className="expanded-module-na">Not attempted</span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
