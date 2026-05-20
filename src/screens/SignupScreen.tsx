import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

interface SignupScreenProps {
  onSignup: (name: string, email: string, password: string) => void;
  onLoginClick: () => void;
}

export function SignupScreen({ onSignup, onLoginClick }: SignupScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup(name, email, password);
  };

  return (
    // changed overflow behavior to safeguard mobile keyboard views from breaking layout structures
    <div className="flex flex-col min-h-screen bg-background p-6 overflow-y-auto justify-between max-w-md mx-auto w-full">

      {/* Header Block */}
      <motion.header
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="mt-12 mb-8 shrink-0"
      >
        <h1 className="text-4xl font-semibold tracking-tight text-foreground mb-2">
          Create Account
        </h1>
        <p className="text-muted-foreground">Join UniMate today</p>
      </motion.header>

      {/* Main Form Block */}
      <motion.form
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4, ease: 'easeOut' }}
        onSubmit={handleSubmit}
        className="flex flex-col flex-1 justify-between gap-8"
      >
        <div className="space-y-4">

          {/* Full Name Input */}
          <div className="relative">
            <label htmlFor="signup-name" className="sr-only">Full Name</label>
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <Input
              id="signup-name"
              type="text"
              autoComplete="name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-12 h-14 rounded-2xl bg-input-background border-border focus-visible:ring-2"
              required
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <label htmlFor="signup-email" className="sr-only">Email Address</label>
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <Input
              id="signup-email"
              type="email"
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-12 h-14 rounded-2xl bg-input-background border-border focus-visible:ring-2"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label htmlFor="signup-password" className="sr-only">Password</label>
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <Input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-12 pr-12 h-14 rounded-2xl bg-input-background border-border focus-visible:ring-2"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground p-1 hover:text-foreground rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
              title={showPassword ? "Hide password" : "Show password"}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Form Bottom Interactive Actions Container */}
        <div className="mt-auto pt-6 space-y-4 w-full shrink-0 pb-4">
          <Button
            type="submit"
            className="w-full h-14 rounded-2xl text-base font-medium transition-transform active:scale-[0.98]"
            size="lg"
          >
            Sign Up
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <button
              type="button"
              onClick={onLoginClick}
              className="text-primary font-medium hover:underline outline-none rounded focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Log In
            </button>
          </div>
        </div>
      </motion.form>
    </div>
  );
}