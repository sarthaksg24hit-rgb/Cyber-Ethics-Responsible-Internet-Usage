import React, { useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';
import { Award, ArrowLeft, Download, Shield } from 'lucide-react';
import './Certificate.css';

export default function Certificate() {
  const { user } = useAuth();
  const { isCertificateEligible, getCertificateProgress, progress } = useProgress();
  const certRef = useRef(null);

  if (!isCertificateEligible()) {
    return <Navigate to="/dashboard" replace />;
  }

  const certProgress = getCertificateProgress();
  const averageScore = Math.round(
    certProgress.modules.reduce((sum, m) => sum + (m.score || 0), 0) / certProgress.total
  );

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="certificate-page">
      <div className="container cert-container animate-fadeIn">

        <div className="cert-top-bar no-print">
          <Link to="/dashboard" className="btn-ghost">
            <ArrowLeft size={20} /> Back to Dashboard
          </Link>
          <button className="btn-primary" onClick={handlePrint}>
            <Download size={18} /> Download / Print
          </button>
        </div>

        {/* Certificate Card */}
        <div className="certificate-card" ref={certRef}>
          <div className="cert-border">
            <div className="cert-inner">

              {/* Header ornament */}
              <div className="cert-header-ornament">
                <div className="cert-shield-icon">
                  <Shield size={40} />
                </div>
              </div>

              <div className="cert-header-text">
                <h3 className="cert-org">CyberEthics Learning Platform</h3>
                <h1 className="cert-title">Certificate of Completion</h1>
                <div className="cert-divider"></div>
              </div>

              <div className="cert-body">
                <p className="cert-preamble">This is to certify that</p>
                <h2 className="cert-name">{user?.name || 'Student'}</h2>
                <p className="cert-desc">
                  has successfully completed all seven modules of the
                  <strong> Cyber Ethics & Responsible Internet Usage</strong> programme,
                  demonstrating a thorough understanding of digital citizenship,
                  online safety, privacy, and ethical internet use.
                </p>
              </div>

              <div className="cert-stats">
                <div className="cert-stat">
                  <span className="cert-stat-value">7/7</span>
                  <span className="cert-stat-label">Modules Completed</span>
                </div>
                <div className="cert-stat">
                  <span className="cert-stat-value">{averageScore}%</span>
                  <span className="cert-stat-label">Average Score</span>
                </div>
                <div className="cert-stat">
                  <span className="cert-stat-value">{dateStr}</span>
                  <span className="cert-stat-label">Date Issued</span>
                </div>
              </div>

              <div className="cert-footer">
                <div className="cert-signature">
                  <div className="cert-sig-line"></div>
                  <span>Programme Director</span>
                </div>
                <div className="cert-badge-container">
                  <Award size={48} className="cert-award-icon" />
                </div>
                <div className="cert-signature">
                  <div className="cert-sig-line"></div>
                  <span>Date of Completion</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Module scores summary */}
        <div className="cert-scores-summary glass-card no-print animate-slideUp">
          <h3>Your Module Scores</h3>
          <div className="cert-scores-grid">
            {certProgress.modules.map((m) => (
              <div key={m.moduleId} className="cert-score-item">
                <span className="cert-score-module">Module {m.moduleId}</span>
                <span className="cert-score-value">{m.score}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
