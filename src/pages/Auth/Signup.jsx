import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, User, Mail, Lock, Eye, EyeOff, AlertCircle, Check, Circle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/Toast';
import './Auth.css';

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { addToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /* Password requirement checks */
  const requirements = useMemo(() => [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Contains a number', met: /\d/.test(password) },
  ], [password]);

  const allRequirementsMet = requirements.every((r) => r.met);
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;

  const isFormValid =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    allRequirementsMet &&
    passwordsMatch &&
    agreed;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    /* Client-side validation */
    if (!name.trim()) { setError('Please enter your name.'); return; }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { setError('Please enter a valid email address.'); return; }

    if (!allRequirementsMet) { setError('Password does not meet all requirements.'); return; }

    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }

    if (!agreed) { setError('You must agree to the Privacy Policy and Terms.'); return; }

    setIsLoading(true);
    try {
      await signup(name.trim(), email.trim(), password);
      addToast({ type: 'success', message: 'Account created successfully! Welcome aboard 🎉' });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <div className="auth-logo">
            <Shield size={26} />
          </div>
          <h1>Create Your Account</h1>
          <p>Start your cyber ethics learning journey today</p>
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="input-group">
            <User className="input-icon" />
            <input
              className="input-field"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </div>

          {/* Email */}
          <div className="input-group">
            <Mail className="input-icon" />
            <input
              className="input-field"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <Lock className="input-icon" />
            <input
              className="input-field"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Password requirements checklist */}
          {password.length > 0 && (
            <ul className="password-requirements">
              {requirements.map((req) => (
                <li key={req.label} className={req.met ? 'met' : ''}>
                  {req.met ? (
                    <Check className="req-icon" />
                  ) : (
                    <Circle className="req-icon" />
                  )}
                  {req.label}
                </li>
              ))}
            </ul>
          )}

          {/* Confirm Password */}
          <div className="input-group">
            <Lock className="input-icon" />
            <input
              className="input-field"
              type={showConfirm ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirm((v) => !v)}
              aria-label={showConfirm ? 'Hide password' : 'Show password'}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Passwords match hint */}
          {confirmPassword.length > 0 && !passwordsMatch && (
            <p style={{ fontSize: '0.8rem', color: 'var(--accent-red)', margin: '-0.5rem 0 0' }}>
              Passwords do not match
            </p>
          )}

          {/* Privacy checkbox */}
          <label className="auth-checkbox">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span>
              I agree to the{' '}
              <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
              {' '}and{' '}
              <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>
            </span>
          </label>

          {/* Error */}
          {error && (
            <div className="auth-error">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="btn-primary auth-submit"
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? (
              <>
                <span className="btn-spinner" />
                Creating account…
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="auth-footer">
          Already have an account?{' '}
          <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
}
