import React from 'react';
import { motion } from 'motion/react';
import { Bell, Users, BookOpen, Calendar, FileText, Clock } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { QuickActionButton } from '../components/QuickActionButton';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { useTheme } from '../contexts/ThemeContext';

interface TeacherDashboardScreenProps {
  userName: string;
  userAvatar?: string;
  onNavigate: (screen: string) => void;
}

export function TeacherDashboardScreen({ userName, userAvatar, onNavigate }: TeacherDashboardScreenProps) {
  const { theme } = useTheme();

  const classAttendanceData = [
    { class: 'DS', percentage: 85 },
    { class: 'ML', percentage: 78 },
    { class: 'Web', percentage: 92 },
    { class: 'OS', percentage: 88 },
  ];

  const todayClasses = [
    { time: '09:00 AM', subject: 'Data Structures', room: 'Lab 301', students: 45, color: '#335CFF' },
    { time: '11:00 AM', subject: 'Machine Learning', room: 'Room 204', students: 38, color: '#19E68C' },
    { time: '02:00 PM', subject: 'Web Development', room: 'Lab 105', students: 42, color: '#F59E0B' },
  ];

  const recentActivity = [
    { action: 'Uploaded notes for Data Structures', time: '2 hours ago', type: 'note' },
    { action: 'Marked attendance for ML class', time: '5 hours ago', type: 'attendance' },
    { action: 'Created new assignment', time: '1 day ago', type: 'assignment' },
  ];

  return (
    <div className="min-h-screen bg-background pb-28 text-foreground">
      {/* Glass Header */}
      <GlassCard className="p-6 rounded-b-3xl mb-6 border-x-0 border-t-0 border-b border-border/40">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={userName}
                className="w-12 h-12 rounded-full object-cover border border-primary/20"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-semibold shadow-md">
                {userName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground">Good morning,</p>
              <h2 className="text-xl font-bold tracking-tight">Prof. {userName}</h2>
            </div>
          </div>
          <button className="relative p-2 rounded-full hover:bg-secondary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40">
            <Bell className="w-6 h-6 text-foreground/80" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full animate-pulse"></span>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-background/40 backdrop-blur-sm border border-border/40 rounded-2xl p-4 transition-all hover:border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">Students</span>
            </div>
            <p className="text-2xl font-bold tracking-tight">125</p>
          </div>
          <div className="bg-background/40 backdrop-blur-sm border border-border/40 rounded-2xl p-4 transition-all hover:border-accent/20">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-accent" />
              <span className="text-xs font-medium text-muted-foreground">Courses</span>
            </div>
            <p className="text-2xl font-bold tracking-tight">4</p>
          </div>
          <div className="bg-background/40 backdrop-blur-sm border border-border/40 rounded-2xl p-4 transition-all hover:border-amber-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-[#F59E0B]" />
              <span className="text-xs font-medium text-muted-foreground">Today</span>
            </div>
            <p className="text-2xl font-bold tracking-tight">3</p>
          </div>
        </div>
      </GlassCard>

      <div className="px-6 space-y-6">
        {/* Class Attendance Overview */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
            <h3 className="text-base font-semibold mb-4 text-foreground/90">Class Attendance Overview</h3>
            <div className="w-100 h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classAttendanceData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <XAxis dataKey="class" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                  <Tooltip
                    cursor={{ fill: 'rgba(0, 0, 0, 0.04)' }}
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                    }}
                  />
                  <Bar dataKey="percentage" fill="#335CFF" radius={[6, 6, 0, 0]} barSize={28} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-base font-semibold mb-3 text-foreground/90">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-3">
            <QuickActionButton
              icon={Users}
              label="Mark Attendance"
              onClick={() => onNavigate('attendance')}
              variant="primary"
            />
            <QuickActionButton
              icon={FileText}
              label="Upload Notes"
              onClick={() => onNavigate('notes')}
              variant="accent"
            />
            <QuickActionButton
              icon={Calendar}
              label="Manage Schedule"
              onClick={() => onNavigate('timetable')}
              variant="secondary"
            />
          </div>
        </motion.div>

        {/* Today's Classes */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-foreground/90">Today's Classes</h3>
            <button
              onClick={() => onNavigate('timetable')}
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              View Schedule
            </button>
          </div>
          <div className="space-y-3">
            {todayClasses.map((cls, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:border-border/80 transition-all"
              >
                <div className="w-1.5 h-12 rounded-full shrink-0" style={{ backgroundColor: cls.color }}></div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm sm:text-base truncate">{cls.subject}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate mt-0.5">
                    {cls.room} • {cls.students} students
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs sm:text-sm font-medium text-foreground/80">{cls.time}</p>
                  <button
                    onClick={() => onNavigate('attendance')}
                    className="text-xs font-semibold text-primary hover:underline mt-1.5 block ml-auto"
                  >
                    Mark
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-base font-semibold mb-3 text-foreground/90">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-4 flex items-start gap-3 shadow-sm"
              >
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  {activity.type === 'note' && <FileText className="w-4 h-4 text-primary" />}
                  {activity.type === 'attendance' && <Users className="w-4 h-4 text-accent" />}
                  {activity.type === 'assignment' && <BookOpen className="w-4 h-4 text-[#F59E0B]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground/90 leading-snug">{activity.action}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}