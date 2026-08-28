import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { mockUsers } from '../data/mockData';
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiLoader,
  FiAlertCircle,
  FiBookOpen,
  FiShield,
  FiSun,
  FiMoon,
  FiCheck,
  FiKey,
} from 'react-icons/fi';

export const LoginPage = () => {
  const { login } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // Form input state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // UI & Validation states
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    form: '',
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const from = location.state?.from?.pathname || '/';

  /**
   * Validate a single field or all fields
   */
  const validateField = (name, value) => {
    let error = '';
    const trimmed = value.trim();

    if (name === 'email') {
      if (!trimmed) {
        error = 'Scholar identifier or email is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        error = 'Please enter a valid academic or email address.';
      }
    }

    if (name === 'password') {
      if (!value) {
        error = 'Access key / password is required.';
      } else if (value.length < 6) {
        error = 'Access key must contain at least 6 characters.';
      }
    }

    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation if field was touched
    if (touched[name]) {
      const fieldError = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError,
        form: '',
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldError = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleQuickFillDemo = (demoEmail = 'chidi.okonkwo@guild.ac') => {
    setFormData({
      email: demoEmail,
      password: 'demo123',
    });
    setErrors({ email: '', password: '', form: '' });
    setTouched({ email: true, password: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all as touched
    setTouched({ email: true, password: true });

    // Validate both fields
    const emailError = validateField('email', formData.email);
    const passwordError = validateField('password', formData.password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
        form: '',
      });
      return;
    }

    // Begin simulated authentication
    setIsLoading(true);
    setErrors({ email: '', password: '', form: '' });

    // Artificial delay (750ms) for realistic state
    setTimeout(() => {
      const normalizedEmail = formData.email.trim().toLowerCase();
      const enteredPassword = formData.password;

      // Check matching demo credentials from mockUsers
      const matchedAccount = mockUsers.find(
        (acc) =>
          acc.email.toLowerCase() === normalizedEmail &&
          acc.password === enteredPassword
      );

      if (matchedAccount) {
        // Successful login: persist user profile via context & localStorage
        login(matchedAccount);
        setIsLoading(false);
        navigate(from, { replace: true });
      } else {
        // Failed auth
        setIsLoading(false);
        setErrors((prev) => ({
          ...prev,
          form: 'Invalid credentials. Please verify your email and access key, or use the demo credentials below.',
        }));
      }
    }, 750);
  };

  return (
    <div className="min-h-screen bg-canvas-bg text-ink-primary flex flex-col justify-between p-4 sm:p-6 lg:p-8 selection:bg-brand-terracotta/20 selection:text-brand-terracotta animate-fade-in">
      {/* Top Header Bar / Theme Switcher */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between py-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-brand-terracotta/10 border border-brand-terracotta/20 flex items-center justify-center text-brand-terracotta shadow-sm">
            <FiBookOpen className="w-4 h-4" />
          </div>
          <div className="leading-tight">
            <span className="font-mono text-[10px] text-ink-muted uppercase tracking-widest block">
              The Guild & Ledger
            </span>
            <span className="font-display text-sm font-semibold tracking-tight">
              Academic Portal
            </span>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="px-3 py-1.5 rounded-md border border-border-line bg-surface-card hover:bg-surface-muted text-ink-primary transition-colors flex items-center gap-2 text-xs font-mono focus-visible:ring-2 focus-visible:ring-brand-terracotta focus-visible:outline-none"
        >
          {isDark ? (
            <FiSun className="w-3.5 h-3.5 text-amber-gauge" />
          ) : (
            <FiMoon className="w-3.5 h-3.5 text-ink-muted" />
          )}
          <span className="hidden sm:inline">{isDark ? 'LIGHT' : 'DARK'}</span>
        </button>
      </header>

      {/* Main Authentication Container */}
      <main className="w-full max-w-md mx-auto my-auto py-8 sm:py-12">
        <div className="bg-surface-card border border-border-line rounded-lg shadow-ledger-float overflow-hidden transition-all">
          {/* Signature Visual Element: Ledger Index Header & Milestone Notch Spine */}
          <div className="p-6 sm:p-7 pb-5 border-b border-border-line bg-surface-muted/50">
            <div className="flex items-center justify-between text-[11px] font-mono text-ink-muted mb-2.5">
              <span className="flex items-center gap-1.5 uppercase tracking-wider">
                <FiShield className="w-3.5 h-3.5 text-brand-terracotta" />
                SEC-AUTH // ENTRY REGISTER
              </span>
              <span className="font-semibold text-ink-primary tabular-nums">REGISTER 01</span>
            </div>

            {/* Signature Segmented Notch Spine */}
            <div className="flex gap-1.5 h-1.5 w-full mb-4" aria-hidden="true">
              <div className="flex-1 rounded-[2px] bg-brand-terracotta shadow-sm" />
              <div className="flex-1 rounded-[2px] bg-brand-terracotta/40" />
              <div className="flex-1 rounded-[2px] bg-border-line" />
              <div className="flex-1 rounded-[2px] bg-border-line" />
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-ink-primary leading-tight">
              Scholar Access
            </h1>
            <p className="text-xs text-ink-muted mt-1.5 leading-relaxed">
              Authenticate your scholar credentials to review active curriculum tracks, syllabus milestones, and credit ledgers.
            </p>
          </div>

          {/* Form Area */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Top Form-Level Error */}
            {errors.form && (
              <div
                role="alert"
                className="p-3.5 rounded-md bg-brand-terracotta/10 border border-brand-terracotta/30 flex items-start gap-2.5 text-xs text-brand-terracotta leading-relaxed font-sans"
              >
                <FiAlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{errors.form}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Email Input Field */}
              <div>
                <label
                  htmlFor="scholar-email"
                  className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5"
                >
                  Scholar Email / Identifier <span className="text-brand-terracotta">*</span>
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-muted">
                    <FiMail className="w-4 h-4" />
                  </div>
                  <input
                    id="scholar-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="e.g. chidi.okonkwo@guild.ac"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    disabled={isLoading}
                    className={`w-full pl-10 pr-3.5 py-3 text-sm rounded-md bg-canvas-bg border text-ink-primary font-sans transition-all placeholder:text-ink-muted/50 min-h-[48px] focus-visible:outline-none focus-visible:ring-2 ${
                      errors.email
                        ? 'border-brand-terracotta/80 focus-visible:ring-brand-terracotta/30 focus-visible:border-brand-terracotta'
                        : 'border-border-line focus-visible:border-brand-terracotta focus-visible:ring-brand-terracotta/20'
                    }`}
                  />
                </div>

                {/* Inline Email Error */}
                {errors.email && (
                  <p id="email-error" className="mt-1.5 text-xs font-mono text-brand-terracotta flex items-center gap-1.5">
                    <FiAlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Password Input Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="scholar-password"
                    className="block text-xs font-mono uppercase tracking-wider text-ink-muted"
                  >
                    Passkey / Access Code <span className="text-brand-terracotta">*</span>
                  </label>
                  <span className="text-[11px] font-mono text-ink-muted tabular-nums">min. 6 chars</span>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-muted">
                    <FiLock className="w-4 h-4" />
                  </div>
                  <input
                    id="scholar-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="••••••••"
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                    disabled={isLoading}
                    className={`w-full pl-10 pr-11 py-3 text-sm rounded-md bg-canvas-bg border text-ink-primary font-sans transition-all placeholder:text-ink-muted/50 min-h-[48px] focus-visible:outline-none focus-visible:ring-2 ${
                      errors.password
                        ? 'border-brand-terracotta/80 focus-visible:ring-brand-terracotta/30 focus-visible:border-brand-terracotta'
                        : 'border-border-line focus-visible:border-brand-terracotta focus-visible:ring-brand-terracotta/20'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-ink-muted hover:text-ink-primary transition-colors focus-visible:outline-none focus-visible:text-brand-terracotta"
                  >
                    {showPassword ? (
                      <FiEyeOff className="w-4 h-4" />
                    ) : (
                      <FiEye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Inline Password Error */}
                {errors.password && (
                  <p id="password-error" className="mt-1.5 text-xs font-mono text-brand-terracotta flex items-center gap-1.5">
                    <FiAlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>

              {/* Submit Button with Loading State */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-3 py-3.5 px-4 rounded-md bg-brand-terracotta text-white font-medium text-sm flex items-center justify-center gap-2 shadow-ledger-sm hover:opacity-95 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed transition-all min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta focus-visible:ring-offset-2"
              >
                {isLoading ? (
                  <>
                    <FiLoader className="w-4 h-4 animate-spin" />
                    <span className="font-mono text-xs tracking-wider uppercase">Authenticating Scholar...</span>
                  </>
                ) : (
                  <>
                    <span>Enter Guild Terminal</span>
                    <FiArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Credentials Panel */}
            <div className="pt-5 border-t border-border-line">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-ink-muted flex items-center gap-1.5">
                  <FiKey className="w-3 h-3 text-amber-gauge" />
                  Quick Demo Evaluation
                </span>
                <span className="text-[10px] font-mono text-ink-muted">1-click fill</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {mockUsers.map((account) => (
                  <button
                    key={account.id}
                    type="button"
                    onClick={() => handleQuickFillDemo(account.email)}
                    className="p-2.5 rounded-md bg-surface-muted/80 hover:bg-surface-muted border border-border-line hover:border-brand-terracotta/40 text-left transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta"
                  >
                    <div className="text-[11px] font-medium text-ink-primary flex items-center justify-between">
                      <span>{account.name}</span>
                      <FiCheck className="w-3 h-3 text-progress-spruce opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-[10px] font-mono text-ink-muted truncate mt-0.5">
                      {account.email}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-2.5 text-center text-[11px] font-mono text-ink-muted">
                Demo Key: <code className="px-1.5 py-0.5 rounded bg-surface-muted border border-border-line text-ink-primary">demo123</code>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer System Telemetry */}
      <footer className="w-full max-w-5xl mx-auto py-3 text-center sm:flex sm:justify-between sm:items-center text-[11px] font-mono text-ink-muted border-t border-border-line/60">
        <div>The Guild & Ledger • Academic Curriculum Registry</div>
        <div className="mt-1 sm:mt-0">Node v8.2.2 • Architectural Foundation</div>
      </footer>
    </div>
  );
};

export default LoginPage;
