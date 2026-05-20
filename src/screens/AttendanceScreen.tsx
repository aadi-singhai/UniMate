import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wifi, CheckCircle2, XCircle, ArrowLeft, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { GlassCard } from '../components/GlassCard';
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
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <GlassCard className="p-6 rounded-b-3xl mb-6">
        <div className="flex items-center gap-4 mb-2">
          <button onClick={onBack} className="p-2 hover:bg-secondary/50 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl">My Attendance</h2>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Scan WiFi network to mark your attendance for classes
        </p>
      </GlassCard>

      <div className="px-6 space-y-6">
        {/* WiFi Scan Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="bg-card border border-border rounded-3xl p-8">
            <AnimatePresence mode="wait">
              {scanningState === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Wifi className="w-16 h-16 text-primary" />
                  </div>
                  <h3 className="mb-2">Mark Attendance</h3>
                  <p className="text-muted-foreground mb-6 text-sm">
                    Tap to scan WiFi and mark your attendance
                  </p>
                  <Button onClick={handleScan} className="w-full max-w-xs rounded-2xl" size="lg">
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
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-6 relative"
                  >
                    <Wifi className="w-16 h-16 text-primary" />
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="absolute inset-0 border-4 border-primary rounded-full"
                    />
                  </motion.div>
                  <h3 className="mb-2">Scanning WiFi...</h3>
                  <p className="text-muted-foreground text-sm">Verifying your location</p>
                </motion.div>
              )}

              {scanningState === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-32 h-32 rounded-full bg-accent/10 flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 className="w-16 h-16 text-accent" />
                  </motion.div>
                  <h3 className="mb-2">Attendance Marked!</h3>
                  <p className="text-muted-foreground text-sm">You have been marked present</p>
                  <div className="mt-4 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm">
                    ✓ WiFi Verified
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Weekly Overview */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="mb-4">This Week</h3>
          <div className="bg-card border border-border rounded-3xl p-6">
            <div className="grid grid-cols-5 gap-2 mb-4">
              {weeklyData.map((day, index) => {
                const percentage = (day.present / day.total) * 100;
                return (
                  <div key={index} className="text-center">
                    <div className="text-xs text-muted-foreground mb-2">{day.day}</div>
                    <div className="relative w-full h-24 bg-muted rounded-xl overflow-hidden">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${percentage}%` }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                        className="absolute bottom-0 w-full bg-gradient-to-t from-accent to-primary"
                      />
                    </div>
                    <div className="text-xs mt-2">
                      {day.present}/{day.total}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Monthly Analytics */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="mb-4">Monthly Analytics</h3>
          <div className="bg-card border border-border rounded-3xl p-6">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyStats}>
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                  }}
                />
                <Bar dataKey="percentage" radius={[8, 8, 0, 0]}>
                  {monthlyStats.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.percentage >= 75 ? '#19E68C' : '#F59E0B'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent"></div>
                <span className="text-xs text-muted-foreground">≥75% (Good)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
                <span className="text-xs text-muted-foreground">&lt;75% (Low)</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-2xl p-4">
              <CalendarIcon className="w-5 h-5 text-primary mb-2" />
              <p className="text-2xl mb-1">21/28</p>
              <p className="text-xs text-muted-foreground">Days Present</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4">
              <CheckCircle2 className="w-5 h-5 text-accent mb-2" />
              <p className="text-2xl mb-1">75%</p>
              <p className="text-xs text-muted-foreground">Overall</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}