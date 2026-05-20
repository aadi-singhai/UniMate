import React from 'react';
import { motion } from 'motion/react';
import { Bell, Users, BookOpen, Calendar, FileText, TrendingUp, Clock } from 'lucide-react';
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
    <div className="min-h-screen bg-background pb-28">
      {/* Glass Header */}
      <GlassCard className="p-6 rounded-b-3xl mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Good morning,</p>
              <h2 className="text-xl">Prof. {userName}</h2>
            </div>
          </div>
          <button className="relative p-2 rounded-full hover:bg-secondary/50 transition-colors">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-background/50 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Students</span>
            </div>
            <p className="text-2xl">125</p>
          </div>
          <div className="bg-background/50 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground">Courses</span>
            </div>
            <p className="text-2xl">4</p>
          </div>
          <div className="bg-background/50 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-[#F59E0B]" />
              <span className="text-xs text-muted-foreground">Today</span>
            </div>
            <p className="text-2xl">3</p>
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
          <div className="bg-card border border-border rounded-3xl p-6">
            <h3 className="mb-4">Class Attendance Overview</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={classAttendanceData}>
                <XAxis dataKey="class" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                  }}
                />
                <Bar dataKey="percentage" fill="#335CFF" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="mb-4">Quick Actions</h3>
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
          <div className="flex items-center justify-between mb-4">
            <h3>Today's Classes</h3>
            <button onClick={() => onNavigate('timetable')} className="text-sm text-primary">
              View Schedule
            </button>
          </div>
          <div className="space-y-3">
            {todayClasses.map((cls, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4"
              >
                <div className="w-1 h-14 rounded-full" style={{ backgroundColor: cls.color }}></div>
                <div className="flex-1">
                  <h4>{cls.subject}</h4>
                  <p className="text-sm text-muted-foreground">
                    {cls.room} • {cls.students} students
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm">{cls.time}</p>
                  <button 
                    onClick={() => onNavigate('attendance')}
                    className="text-xs text-primary hover:underline mt-1"
                  >
                    Mark Attendance
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
          <h3 className="mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-4 flex items-start gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {activity.type === 'note' && <FileText className="w-5 h-5 text-primary" />}
                  {activity.type === 'attendance' && <Users className="w-5 h-5 text-accent" />}
                  {activity.type === 'assignment' && <BookOpen className="w-5 h-5 text-[#F59E0B]" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{activity.action}</p>
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
