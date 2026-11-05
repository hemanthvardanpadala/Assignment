import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Loader2 } from 'lucide-react';

function VLogo({ small = false }: { small?: boolean }) {
  const size = small ? 48 : 220;
  return (
    <img
      src="https://ems.sskatt.com/volkskatt.png"
      alt="VolksKatt"
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        filter: 'brightness(1.15) drop-shadow(0 0 18px rgba(59,130,246,0.6))',
        mixBlendMode: 'luminosity',
        opacity: 0.94,
        borderRadius: small ? '14px' : '24px',
        display: 'block',
      }}
      onError={e => {
        // SVG fallback — pink/purple V with dark arrow
        const el = e.currentTarget;
        el.style.display = 'none';
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const s = small ? 48 : 180;
        svg.setAttribute('viewBox', '0 0 120 120');
        svg.setAttribute('width', String(s));
        svg.setAttribute('height', String(s));
        svg.innerHTML = `<defs><linearGradient id="vg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ec4899"/><stop offset="100%" stop-color="#a855f7"/></linearGradient></defs><path d="M15 15 L60 92 L105 15 L87 15 L60 65 L33 15Z" fill="url(#vg)"/><path d="M44 75 L60 108 L76 75Z" fill="#1e1b4b" opacity="0.9"/>`;
        el.parentElement?.appendChild(svg);
      }}
    />
  );
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen login-bg relative">
      <div className="min-h-screen login-overlay flex">

        {/* Left panel — branding */}
        <div className="hidden lg:flex flex-1 flex-col items-center justify-center p-12 gap-10">
          <div className="flex flex-col items-center gap-6">
            {/* Logo box — frosted glass with blue glow */}
            <div style={{
              borderRadius: '36px',
              overflow: 'hidden',
              boxShadow: '0 0 60px 12px rgba(59,130,246,0.35), 0 0 0 1px rgba(255,255,255,0.07)',
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(8px)',
              padding: '20px',
            }}>
              <VLogo />
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Assignment</h2>
              <p className="text-muted-foreground mt-2 text-base">Employee Management System</p>
            </div>
          </div>
        </div>

        {/* Right panel — login form */}
        <div className="flex flex-1 items-center justify-center p-8">
          <div className="w-full max-w-md animate-fadeIn">

            {/* Mobile logo */}
            <div className="flex items-center gap-3 mb-8 lg:hidden">
              <VLogo small />
              <div>
                <p className="font-bold text-foreground">Assignment</p>
                <p className="text-xs text-muted-foreground tracking-widest uppercase">EMS</p>
              </div>
            </div>

            {/* Welcome text — outside the card */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back</h1>
              <p className="text-muted-foreground mt-2">Sign in to your account to continue</p>
            </div>

            {/* Glass card */}
            <div className="glass rounded-xl overflow-hidden">
              {/* Card header */}
              <div className="px-6 pt-6 pb-4 text-center border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <h3 className="text-xl font-semibold text-foreground text-center">Employee Management System</h3>
                <p className="text-muted-foreground text-sm text-center mt-1">Sign in to access your dashboard</p>
              </div>

              {/* Form */}
              <div className="px-6 py-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="hemanth@gmail.com"
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        style={{
                          background: 'rgba(255,255,255,0.07)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          color: 'var(--foreground)',
                        }}
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        style={{
                          background: 'rgba(255,255,255,0.07)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          color: 'var(--foreground)',
                        }}
                      />
                    </div>
                  </div>

                  {error && (
                    <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)' }}
                      className="text-red-400 text-sm rounded-lg px-4 py-3">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full glow-primary font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm mt-1"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Signing in...
                      </>
                    ) : 'Sign In'}
                  </button>
                </form>
              </div>
            </div>

            {/* Footer — outside card */}
            <p className="text-center text-xs text-muted-foreground mt-6">
              © 2026 Assignment · Secure Employee Management
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
