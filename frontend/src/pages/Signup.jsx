import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await signup(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to sign up. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClasses =
    'w-full px-3 py-2.5 rounded-[10px] border border-border-input text-sm text-text-primary outline-none focus:border-navbar-end transition-colors';

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-lavender p-5">
      <div className="bg-white rounded-[20px] p-8 w-full max-w-[380px] shadow-[0_4px_24px_rgba(90,30,70,0.08)]">
        <div className="flex items-center justify-center gap-2.5 mb-1.5 text-navbar-end text-xl font-bold">
          <ShieldCheck size={22} />
          SafeHer
        </div>
        <p className="text-center text-[13px] text-text-muted mb-6">Create your account</p>

        {error && <p className="text-[13px] text-danger mb-3">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3.5">
            <label htmlFor="signup-name" className="block text-[12.5px] font-semibold text-text-muted mb-1.5">
              Name
            </label>
            <input
              id="signup-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Priya Sharma"
              autoComplete="name"
              className={inputClasses}
            />
          </div>
          <div className="mb-3.5">
            <label htmlFor="signup-email" className="block text-[12.5px] font-semibold text-text-muted mb-1.5">
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className={inputClasses}
            />
          </div>
          <div className="mb-3.5">
            <label htmlFor="signup-password" className="block text-[12.5px] font-semibold text-text-muted mb-1.5">
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              autoComplete="new-password"
              className={inputClasses}
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-navbar-end hover:bg-[#C2166A] disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-[10px] py-2.5 text-sm font-semibold transition-colors"
          >
            {submitting ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <p className="text-center text-[13px] text-text-muted mt-4.5">
          Already have an account?{' '}
          <Link to="/login" className="text-navbar-end font-semibold no-underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}