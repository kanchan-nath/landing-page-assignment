import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import styles from './Auth.module.css';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { show } = useToast();

  const [step, setStep] = useState('register'); 
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';

    if (!form.email.trim()) errs.email = 'Email is required';

    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email';

    if (!form.password) errs.password = 'Password is required';

    else if (form.password.length < 6) errs.password = 'At least 6 characters';

    setErrors(errs);

    return Object.keys(errs).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validate()) return;
    setLoading(true);

    try {
      await authAPI.register(form);
      setEmail(form.email);
      setStep('otp');
      show('OTP sent to your email!', 'success');

    } catch (err) {

      show(err.response?.data?.message || 'Registration failed', 'error');

    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (val, idx) => {

    if (!/^\d?$/.test(val)) return;

    const next = [...otp];
    next[idx] = val;
    setOtp(next);

    if (val && idx < 5) {
      document.getElementById(`otp-${idx + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (e, idx) => {

    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      document.getElementById(`otp-${idx - 1}`)?.focus();
    }
  };

  const handleOtpPaste = (e) => {

    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);

    if (pasted.length === 6) {
      setOtp(pasted.split(''));
      document.getElementById('otp-5')?.focus();
    }
  };

  const handleVerify = async (e) => {

    e.preventDefault();

    const otpVal = otp.join('');

    if (otpVal.length < 6) {
      show('Please enter the 6-digit OTP', 'error');
      return;
    }
    setLoading(true);

    try {
      const res = await authAPI.verifyOTP({ email, otp: otpVal });
      login(res.data.user, res.data.token);

      show('Account verified! Welcome aboard.', 'success');
      navigate('/dashboard');

    } catch (err) {
      show(err.response?.data?.message || 'Verification failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.bg}>
        <div className={styles.bgOrb1} />
        <div className={styles.bgOrb2} />
      </div>

      <div className={styles.card} style={{ animationDelay: '0.05s' }}>
        <div className={styles.logo}>
          <span className={styles.logoMark} />
          <span className={styles.logoText}>Landing </span>
        </div>

        {step === 'register' ? (
          <>
            <h1 className={styles.title}>Create account</h1>
            <p className={styles.subtitle}>Start your journey with us today</p>

            <form onSubmit={handleRegister} className={styles.form} noValidate>
              <div className={styles.field}>
                <label className={styles.label}>Full Name</label>
                <input
                  className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                  type="text"
                  placeholder="Jane Smith"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  autoComplete="name"
                />
                {errors.name && <span className={styles.error}>{errors.name}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Email address</label>
                <input
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  type="email"
                  placeholder="kanchan@company.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  autoComplete="email"
                />
                {errors.email && <span className={styles.error}>{errors.email}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Password</label>
                <input
                  className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                  type="password"
                  placeholder="Minimum 6 characters"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  autoComplete="new-password"
                />
                {errors.password && <span className={styles.error}>{errors.password}</span>}
              </div>

              <button className={styles.btn} type="submit" disabled={loading}>
                {loading ? <><span className="spinner" /> Sending OTP…</> : 'Create Account'}
              </button>
            </form>

            <p className={styles.switchText}>
              Already have an account?{' '}
              <Link to="/login">Sign in</Link>
            </p>
          </>
        ) : (
          <>
            <div className={styles.otpBack} onClick={() => setStep('register')}>
              ← Back
            </div>
            <h1 className={styles.title}>Verify your email</h1>
            <p className={styles.subtitle}>
              We sent a 6-digit code to <strong style={{ color: 'var(--accent)' }}>{email}</strong>
            </p>

            <form onSubmit={handleVerify} className={styles.form}>
              <div className={styles.otpRow} onPaste={handleOtpPaste}>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    className={styles.otpInput}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(e.target.value, idx)}
                    onKeyDown={e => handleOtpKeyDown(e, idx)}
                    autoFocus={idx === 0}
                  />
                ))}
              </div>

              <button className={styles.btn} type="submit" disabled={loading}>
                {loading ? <><span className="spinner" /> Verifying…</> : 'Verify & Continue'}
              </button>
            </form>

            <p className={styles.switchText}>
              Didn&apos;t receive the code?{' '}
              <span
                style={{ color: 'var(--accent)', cursor: 'pointer' }}
                onClick={handleRegister}
              >
                Resend OTP
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
