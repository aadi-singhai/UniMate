import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, CheckCircle2, ArrowLeft, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from 'recharts';

interface AttendanceScreenProps {
  onBack: () => void;
}

export function AttendanceScreen({ onBack }: AttendanceScreenProps) {
  const [scanningState, setScanningState] = useState<'idle' | 'scanning' | 'success' | 'failed'>('idle');

  const weeklyData = [
    { day: 'Mon', present: 4, total: 5 },
    { day: 'Tue', present: 5, total: 5 },
    { day: 'Wed', present: 3, total: 5 },
    { day: 'Thu', present: 5, total: 5 },
    { day: 'Fri', present: 4, total: 5 },
  ];

  const monthlyStats = [
    { month: 'Sep', percentage: 82 },
    { month: 'Oct', percentage: 78 },
    { month: 'Nov', percentage: 85 },
    { month: 'Dec', percentage: 75 },
  ];

  const handleScan = () => {
    setScanningState('scanning');
    setTimeout(() => {
      setScanningState('success');
      setTimeout(() => {
        setScanningState('idle');
      }, 2500);
    }, 2500);
  };

  return (
    <div className="space-y-6 w-full max-w-[1400px] mx-auto p-1">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-card/40 border border-border/60 p-6 rounded-xl backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-secondary/80 rounded-lg transition-colors border border-border/40">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">My Attendance</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Scan campus WiFi networks to instantly log your lectures and lab sessions
            </p>
          </div>
        </div>

        {/* Desktop Mini-Stats Ribbon */}
        <div className="flex items-center gap-4 self-end sm:self-center">
          <div className="bg-card border border-border/80 rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-sm min-w-[140px]">
            <CalendarIcon className="w-5 h-5 text-primary shrink-0" />
            <div>
              <p className="text-xl font-bold tracking-tight leading-none mb-1">21 / 28</p>
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Days Present</p>
            </div>
          </div>
          <div className="bg-card border border-border/80 rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-sm min-w-[140px]">
            <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
            <div>
              <p className="text-xl font-bold tracking-tight leading-none mb-1">75%</p>
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Overall Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Left Column: Interactive Scanning Console (5/12 width) */}
        <div className="lg:col-span-5 h-full">
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col justify-center min-h-[440px]"
          >
            <AnimatePresence mode="wait">
              {scanningState === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center text-center max-w-sm mx-auto"
                >
                  <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center mb-6 ring-8 ring-primary/5">
                    <Wifi className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Network Validation</h3>
                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                    Connect to your lecture hall's designated WiFi point and trigger the localized sweep.
                  </p>
                  <Button onClick={handleScan} className="w-full rounded-xl shadow-md font-medium" size="lg">
                    Scan WiFi Network
                  </Button>
                </motion.div>
              )}

              {scanningState === 'scanning' && (
                <motion.div
                  key="scanning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center mb-6 relative">
                    <Wifi className="w-12 h-12 text-primary" />
                    <motion.div
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.6, 0, 0.6],
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="absolute inset-0 border-2 border-primary rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 tracking-tight">Scanning Campus Node...</h3>
                  <p className="text-muted-foreground text-sm">Verifying room telemetry and cryptographic handshake</p>
                </motion.div>
              )}

              {scanningState === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0.4 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="w-28 h-28 rounded-full bg-accent/10 flex items-center justify-center mb-6 ring-8 ring-accent/5"
                  >
                    <CheckCircle2 className="w-14 h-14 text-accent" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-1 tracking-tight text-accent">Attendance Secured!</h3>
                  <p className="text-muted-foreground text-sm">Your log has been synced directly with the central database</p>
                  <div className="mt-5 bg-accent/10 border border-accent/20 text-accent font-medium px-4 py-1.5 rounded-full text-xs tracking-wide">
                    ✓ SECURE NODE VERIFIED
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Right Column: Advanced Analytics Visualizations (7/12 width) */}
        <div className="lg:col-span-7 space-y-6">

          {/* Weekly Overview Bars */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-base font-semibold mb-5 tracking-tight">Weekly Breakdown</h3>
            <div className="grid grid-cols-5 gap-4">
              {weeklyData.map((day, index) => {
                const percentage = (day.present / day.total) * 100;
                return (
                  <div key={index} className="bg-secondary/20 border border-border/40 rounded-xl p-3 flex flex-col items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground mb-3">{day.day}</span>
                    <div className="relative w-4 h-28 bg-muted/60 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${percentage}%` }}
                        transition={{ delay: 0.2 + index * 0.08, duration: 0.6, ease: 'easeOut' }}
                        className="absolute bottom-0 w-full bg-gradient-to-t from-accent to-primary rounded-full"
                      />
                    </div>
                    <span className="text-xs font-bold mt-3 tracking-tight">
                      {day.present}/{day.total}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Monthly Historical Analytics Chart */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold tracking-tight">Monthly Trends</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent"></div>
                  <span className="text-xs font-medium text-muted-foreground">≥75% (Good)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></div>
                  <span className="text-xs font-medium text-muted-foreground">less than 75% (Low)</span>
                </div>
              </div>
            </div>

            <div className="w-full pt-2">
              <ResponsiveContainer width="100%" height={210}>
                <BarChart data={monthlyStats} margin={{ top: 0, right: 5, left: -20, bottom: 0 }}>
                  <XAxis dataKey="month" stroke="var(--border)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="var(--border)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    cursor={{ fill: 'var(--secondary)', opacity: 0.15 }}
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar dataKey="percentage" barSize={45} radius={[6, 6, 0, 0]}>
                    {monthlyStats.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.percentage >= 75 ? '#19E68C' : '#F59E0B'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}