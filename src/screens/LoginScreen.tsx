import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, GraduationCap, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

interface LoginScreenProps {
  onLogin: (email: string, password: string) => void;
  onSignupClick: () => void;
}

export function LoginScreen({ onLogin, onSignupClick }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-background">

      {/* Left Column: Platform Branding Panel (Visible on Large Screens) */}
      <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 bg-surface border-r border-border flex-col justify-between p-10 relative overflow-hidden">
        {/* Decorative subtle gradient backing glowing elements */}
        <div className="absolute top-[-20%] left-[-20%] w-[300px] h-[300px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[250px] h-[250px] bg-accent-light/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Header Branding */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-primary block">UniMate</span>
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted block leading-none">Campus Core</span>
          </div>
        </div>

        {/* Core Narrative / Features List */}
        <div className="space-y-8 relative z-10 my-auto py-12">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tight leading-tight text-primary">
              Your Complete Smart Campus Companion.
            </h2>
            <p className="text-sm text-secondary leading-relaxed">
              Consolidate academic rosters, infrastructure ticketing systems, real-time analytics dashboards, and student tools into a singular interface.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-bg-hover border border-border flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-accent-light" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-primary">Unified Dashboard Ecosystem</h4>
                <p className="text-xs text-muted mt-0.5">Instant access to course schedules, resource tracking, and operational tasks.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-bg-hover border border-border flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4 text-success" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-primary">Secure Administrative Controls</h4>
                <p className="text-xs text-muted mt-0.5">Role-based data encryption safeguarding academic record sets and system logs.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-xs text-muted relative z-10">
          © {new Date().getFullYear()} UniMate Platform Group. Secure Data Layer Active.
        </div>
      </div>

      {/* Right Column: Interaction Form Panel */}
      <div className="col-span-1 lg:col-span-7 xl:col-span-8 flex items-center justify-center p-6 sm:p-12 md:p-20 relative">
        <div className="w-full max-w-[460px] flex flex-col justify-center min-h-[550px] py-8">

          {/* Header Area */}
          <motion.div
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-8 text-left"
          >
            <h1 className="text-3xl font-bold tracking-tight mb-2 text-primary">Welcome Back</h1>
            <p className="text-sm text-secondary">Log in to safely manage your UniMate operational space</p>
          </motion.div>

          {/* Login Form Wrapper */}
          <motion.form
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >
            <div className="space-y-4">

              {/* Email Input */}
              <div className="form-group relative">
                <label className="form-label font-medium mb-1">Institutional Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <Input
                    type="email"
                    placeholder="name@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-11 h-12 rounded-xl bg-bg-elevated border-border text-primary placeholder:text-muted focus:border-accent transition-all w-full"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="form-group relative">
                <div className="flex items-center justify-between mb-1">
                  <label className="form-label font-medium">Security Keyphrase</label>
                  <button type="button" className="text-xs font-medium text-accent-light hover:underline bg-transparent border-none cursor-pointer">
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter system account password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-11 pr-11 h-12 rounded-xl bg-bg-elevated border-border text-primary placeholder:text-muted focus:border-accent transition-all w-full"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-secondary transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

            </div>

            {/* Actions Panel */}
            <div className="space-y-4 pt-2">
              <Button type="submit" className="w-full h-12 rounded-xl text-sm font-semibold bg-accent hover:bg-accent/95 text-white transition-all shadow-md shadow-accent/10 flex items-center justify-center gap-2">
                Authenticate Account
              </Button>

              <div className="text-center pt-2">
                <span className="text-xs text-muted">New to the core workspace? </span>
                <button
                  type="button"
                  onClick={onSignupClick}
                  className="text-xs font-semibold text-accent-light hover:underline bg-transparent border-none cursor-pointer"
                >
                  Create Platform Profile
                </button>
              </div>
            </div>
          </motion.form>

        </div>
      </div>
    </div>
  );
}