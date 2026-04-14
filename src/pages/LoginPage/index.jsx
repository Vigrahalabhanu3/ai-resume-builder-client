// ============================================
// LoginPage.jsx - Authentication Page
// ============================================

import './index.css';
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext.jsx';
import { register, emailLogin, googleLogin } from '../../services/authService.js';
import { HiDocumentText, HiShieldCheck, HiSparkles, HiCheck } from 'react-icons/hi2';

function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = isRegister
        ? await register(name, email, password)
        : await emailLogin(email, password);
      login(result.token, result.user);
      toast.success(isRegister ? 'Account created!' : 'Welcome back!');
      navigate('/home');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Authentication failed');
    }
    setIsLoading(false);
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const result = await googleLogin(credentialResponse.credential);
      login(result.token, result.user);
      toast.success('Welcome!');
      navigate('/home');
    } catch (error) {
      toast.error('Google login failed');
    }
  };

  return (
    <div className="auth-page">
      {/* Logo above card */}
      <Link to="/" className="navbar-brand" style={{ marginBottom: '28px' }}>
        <div className="navbar-logo">
          <HiDocumentText />
        </div>
        <span className="navbar-title">AI Resume Builder</span>
      </Link>

      {/* Auth Card */}
      <div className="auth-card">
        <h2 className="heading-lg mb-xs text-center">
          {isRegister ? 'Create your account' : 'Welcome back'}
        </h2>
        <p className="text-muted mb-lg text-center">
          {isRegister ? 'Start building AI-powered resumes' : 'Sign in to continue building'}
        </p>

        {/* Google Login */}
        <div className="flex-center mb-md">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error('Google login failed')}
            theme="outline"
            size="large"
            width="100%"
            text={isRegister ? 'signup_with' : 'signin_with'}
          />
        </div>

        <div className="login-divider">
          <div className="login-divider-line" />
          <span className="login-divider-text">or</span>
          <div className="login-divider-line" />
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="form-group">
              <label className="label-text">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
                placeholder="Your full name"
                required
              />
            </div>
          )}
          <div className="form-group">
            <label className="label-text">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="form-group">
            <label className="label-text">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="At least 6 characters"
              minLength={6}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`btn btn-primary-gradient btn-full ${isLoading ? 'btn-disabled' : ''}`}
            style={{ marginTop: '8px' }}
          >
            {isLoading ? 'Please wait...' : isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-muted mt-lg">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-purple font-medium"
            style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
          >
            {isRegister ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>

      {/* Below card */}
      <Link to="/" className="text-muted" style={{ marginTop: '20px', fontSize: '13px' }}>
        &larr; Back to Home
      </Link>

      <div className="auth-trust-line">
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <HiShieldCheck /> Secure login
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <HiSparkles /> AI-powered
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <HiCheck /> Free to start
        </span>
      </div>
    </div>
  );
}

export default LoginPage;
