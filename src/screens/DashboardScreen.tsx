import React from 'react';
import { motion } from 'motion/react';
import { Bell, Wifi, Calendar, FileText, MessageSquare, TrendingUp } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { QuickActionButton } from '../components/QuickActionButton';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { useTheme } from '../contexts/ThemeContext';

interface DashboardScreenProps {
  userName: string;
  userAvatar?: string;
  onNavigate: (screen: string) => void;
}

export function DashboardScreen({ userName, userAvatar, onNavigate }: DashboardScreenProps) {
  const { theme } = useTheme();

  const attendanceData = [
    { name: 'Present', value: 75, color: '#19E68C' },
    { name: 'Absent', value: 25, color: theme === 'dark' ? '#333333' : '#E0E5EB' },
  ];

  const todayClasses = [
    { time: '09:00 AM', subject: 'Data Structures', room: 'Lab 301', color: '#335CFF' },
    { time: '11:00 AM', subject: 'Machine Learning', room: 'Room 204', color: '#19E68C' },
    { time: '02:00 PM', subject: 'Web Development', room: 'Lab 105', color: '#F59E0B' },
  ];

  const upcomingEvents = [
    { title: 'Tech Fest 2024', date: 'Dec 15', type: 'Event' },
    { title: 'Final Exams', date: 'Dec 20', type: 'Important' },
  ];

  const recentAnnouncements = [
    { title: 'Holiday Notice', message: 'Campus will be closed on Dec 25', time: '2 hours ago' },
    { title: 'New Assignment Posted', message: 'Data Structures Assignment 5 is now available', time: '5 hours ago' },
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
              <p className="text-sm text-muted-foreground">Welcome back,</p>
              <h2 className="text-xl">{userName}</h2>
            </div>
          </div>
          <button className="relative p-2 rounded-full hover:bg-secondary/50 transition-colors">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-background/50 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground">My Attendance</span>
            </div>
            <p className="text-2xl">75%</p>
          </div>
          <div className="bg-background/50 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Classes Today</span>
            </div>
            <p className="text-2xl">3</p>
          </div>
        </div>
      </GlassCard>

      <div className="px-6 space-y-6">
        {/* Attendance Chart */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="bg-card border border-border rounded-3xl p-6">
            <h3 className="mb-4">Monthly Attendance</h3>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie
                      data={attendanceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {attendanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent"></div>
                  <div>
                    <p className="text-xs text-muted-foreground">Present</p>
                    <p className="text-sm">75%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted"></div>
                  <div>
                    <p className="text-xs text-muted-foreground">Absent</p>
                    <p className="text-sm">25%</p>
                  </div>
                </div>
              </div>
            </div>
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
              icon={Wifi}
              label="Attendance"
              onClick={() => onNavigate('attendance')}
              variant="primary"
            />
            <QuickActionButton
              icon={FileText}
              label="Notes"
              onClick={() => onNavigate('notes')}
              variant="accent"
            />
            <QuickActionButton
              icon={MessageSquare}
              label="Complaints"
              onClick={() => onNavigate('complaints')}
              variant="secondary"
            />
          </div>
        </motion.div>

        {/* Today's Timetable */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3>Today's Classes</h3>
            <button onClick={() => onNavigate('timetable')} className="text-sm text-primary">
              View All
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
                  <p className="text-sm text-muted-foreground">{cls.room}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">{cls.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-4 flex items-center justify-between"
              >
                <div>
                  <h4>{event.title}</h4>
                  <p className="text-sm text-muted-foreground">{event.type}</p>
                </div>
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {event.date}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Announcements */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="mb-4">Recent Announcements</h3>
          <div className="space-y-3">
            {recentAnnouncements.map((announcement, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-4 flex items-center justify-between"
              >
                <div>
                  <h4>{announcement.title}</h4>
                  <p className="text-sm text-muted-foreground">{announcement.message}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {announcement.time}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}