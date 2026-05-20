import React from 'react';
import { motion } from 'motion/react';
import { Bell, Wifi, Calendar, FileText, MessageSquare, TrendingUp, ArrowRight } from 'lucide-react';
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
    { name: 'Absent', value: 25, color: theme === 'dark' ? '#2a2a2a' : '#E0E5EB' },
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

  const statCards = [
    { icon: TrendingUp, label: 'My Attendance', value: '75%', color: '#19E68C', bg: 'rgba(25,230,140,0.08)' },
    { icon: Calendar, label: 'Classes Today', value: '3', color: '#335CFF', bg: 'rgba(51,92,255,0.08)' },
    { icon: FileText, label: 'Pending Notes', value: '12', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)' },
    { icon: Bell, label: 'Announcements', value: '2', color: '#8B5CF6', bg: 'rgba(139,92,246,0.08)' },
  ];

  return (
    <div style={{ width: '100%', minHeight: '100vh' }}>

      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <p style={{ fontSize: '13px', color: 'var(--muted-foreground)', marginBottom: '4px' }}>Welcome back,</p>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--foreground)', letterSpacing: '-0.5px', margin: 0 }}>
            {userName}
          </h1>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '10px 18px', borderRadius: '10px',
          background: 'var(--primary)', color: '#fff',
          border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 500,
        }}>
          <Wifi size={16} />
          Mark Attendance
        </button>
      </div>

      {/* Stat Cards */}
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.05 }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}
      >
        {statCards.map((card, i) => (
          <div key={i} style={{
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: '14px', padding: '20px',
          }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '10px',
              background: card.bg, display: 'flex', alignItems: 'center',
              justifyContent: 'center', marginBottom: '14px',
            }}>
              <card.icon size={18} color={card.color} />
            </div>
            <p style={{ fontSize: '12px', color: 'var(--muted-foreground)', marginBottom: '6px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.6px' }}>
              {card.label}
            </p>
            <p style={{ fontSize: '28px', fontWeight: 700, color: 'var(--foreground)', letterSpacing: '-0.5px', margin: 0 }}>
              {card.value}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', marginBottom: '20px' }}>

        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Attendance Chart + Quick Actions */}
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}
          >
            {/* Chart */}
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '24px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--foreground)', marginBottom: '16px' }}>Monthly Attendance</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <ResponsiveContainer width={130} height={130}>
                  <PieChart>
                    <Pie data={attendanceData} cx="50%" cy="50%" innerRadius={40} outerRadius={58} paddingAngle={4} dataKey="value">
                      {attendanceData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#19E68C', flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: '11px', color: 'var(--muted-foreground)', margin: 0 }}>Present</p>
                      <p style={{ fontSize: '16px', fontWeight: 600, color: 'var(--foreground)', margin: 0 }}>75%</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--muted)', flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: '11px', color: 'var(--muted-foreground)', margin: 0 }}>Absent</p>
                      <p style={{ fontSize: '16px', fontWeight: 600, color: 'var(--foreground)', margin: 0 }}>25%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '24px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--foreground)', marginBottom: '16px' }}>Quick Actions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { icon: Wifi, label: 'Mark Attendance', screen: 'attendance', color: '#335CFF', bg: 'rgba(51,92,255,0.08)' },
                  { icon: FileText, label: 'View Notes', screen: 'notes', color: '#19E68C', bg: 'rgba(25,230,140,0.08)' },
                  { icon: MessageSquare, label: 'Complaints', screen: 'complaints', color: '#8B5CF6', bg: 'rgba(139,92,246,0.08)' },
                ].map((action, i) => (
                  <button
                    key={i}
                    onClick={() => onNavigate(action.screen)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '12px 14px', borderRadius: '10px',
                      background: action.bg, border: 'none', cursor: 'pointer',
                      color: 'var(--foreground)', fontSize: '14px', fontWeight: 500,
                      textAlign: 'left', transition: 'opacity 0.15s',
                    }}
                  >
                    <action.icon size={16} color={action.color} />
                    {action.label}
                    <ArrowRight size={14} color={action.color} style={{ marginLeft: 'auto' }} />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Announcements */}
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '24px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--foreground)', margin: 0 }}>Recent Announcements</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {recentAnnouncements.map((a, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 16px', borderRadius: '10px',
                  background: 'var(--background)', border: '1px solid var(--border)',
                }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '14px', color: 'var(--foreground)', margin: '0 0 3px' }}>{a.title}</p>
                    <p style={{ fontSize: '13px', color: 'var(--muted-foreground)', margin: 0 }}>{a.message}</p>
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--muted-foreground)', whiteSpace: 'nowrap', marginLeft: '16px' }}>{a.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Today's Classes */}
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '24px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--foreground)', margin: 0 }}>Today's Classes</h3>
              <button
                onClick={() => onNavigate('timetable')}
                style={{ fontSize: '13px', color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}
              >
                View All →
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {todayClasses.map((cls, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  padding: '14px', borderRadius: '10px',
                  background: 'var(--background)', border: '1px solid var(--border)',
                }}>
                  <div style={{ width: '3px', height: '40px', borderRadius: '3px', background: cls.color, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: '14px', color: 'var(--foreground)', margin: '0 0 2px' }}>{cls.subject}</p>
                    <p style={{ fontSize: '12px', color: 'var(--muted-foreground)', margin: 0 }}>{cls.room}</p>
                  </div>
                  <span style={{
                    fontSize: '12px', fontWeight: 500,
                    color: cls.color, background: `${cls.color}15`,
                    padding: '4px 10px', borderRadius: '100px',
                    whiteSpace: 'nowrap',
                  }}>{cls.time}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '24px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--foreground)', margin: 0 }}>Upcoming Events</h3>
              <button
                onClick={() => onNavigate('events')}
                style={{ fontSize: '13px', color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}
              >
                View All →
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {upcomingEvents.map((event, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px', borderRadius: '10px',
                  background: 'var(--background)', border: '1px solid var(--border)',
                }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '14px', color: 'var(--foreground)', margin: '0 0 2px' }}>{event.title}</p>
                    <p style={{ fontSize: '12px', color: 'var(--muted-foreground)', margin: 0 }}>{event.type}</p>
                  </div>
                  <span style={{
                    fontSize: '12px', fontWeight: 600,
                    background: 'rgba(51,92,255,0.1)', color: 'var(--primary)',
                    padding: '5px 12px', borderRadius: '100px',
                  }}>{event.date}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}