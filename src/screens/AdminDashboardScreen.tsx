import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  MessageSquare,
  BarChart3,
  Settings,
  Menu,
  X,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { StatusChip } from '../components/StatusChip';
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from 'recharts';

interface AdminDashboardScreenProps {
  onBack: () => void;
}

export function AdminDashboardScreen({ onBack }: AdminDashboardScreenProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const menuItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'students', icon: Users, label: 'Students' },
    { id: 'timetable', icon: Calendar, label: 'Timetable' },
    { id: 'events', icon: FileText, label: 'Events' },
    { id: 'complaints', icon: MessageSquare, label: 'Complaints' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const attendanceData = [
    { month: 'Aug', percentage: 82 },
    { month: 'Sep', percentage: 78 },
    { month: 'Oct', percentage: 85 },
    { month: 'Nov', percentage: 80 },
    { month: 'Dec', percentage: 75 },
  ];

  const studentStats = [
    { department: 'CS', count: 450 },
    { department: 'IT', count: 380 },
    { department: 'EC', count: 320 },
    { department: 'ME', count: 290 },
  ];

  const recentComplaints = [
    { id: 1, title: 'Broken AC in Lab 301', status: 'in-review' as const },
    { id: 2, title: 'Library WiFi Issues', status: 'pending' as const },
    { id: 3, title: 'Cafeteria Menu Variety', status: 'resolved' as const },
  ];

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 20 }}
        className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-50 p-6"
      >
        <div className="flex items-center justify-between mb-8">
          <h3>Admin Panel</h3>
          <button onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                  activeTab === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-secondary'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </motion.div>

      {/* Header */}
      <GlassCard className="p-6 rounded-b-3xl mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-secondary/50 rounded-full transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h2 className="text-2xl">Admin Dashboard</h2>
            <p className="text-sm text-muted-foreground">{menuItems.find((m) => m.id === activeTab)?.label}</p>
          </div>
        </div>
      </GlassCard>

      <div className="px-6 space-y-6">
        {activeTab === 'overview' && (
          <>
            {/* Stats Cards */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-card border border-border rounded-2xl p-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <p className="text-2xl mb-1">1,440</p>
                <p className="text-xs text-muted-foreground">Total Students</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                </div>
                <p className="text-2xl mb-1">75%</p>
                <p className="text-xs text-muted-foreground">Avg Attendance</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-4">
                <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5 text-[#F59E0B]" />
                </div>
                <p className="text-2xl mb-1">24</p>
                <p className="text-xs text-muted-foreground">Active Events</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-4">
                <div className="w-10 h-10 rounded-xl bg-[#EF4444]/10 flex items-center justify-center mb-3">
                  <AlertCircle className="w-5 h-5 text-[#EF4444]" />
                </div>
                <p className="text-2xl mb-1">8</p>
                <p className="text-xs text-muted-foreground">Pending Complaints</p>
              </div>
            </motion.div>

            {/* Attendance Trend */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="mb-4">Attendance Trend</h3>
              <div className="bg-card border border-border rounded-3xl p-6">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={attendanceData}>
                    <XAxis dataKey="month" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '12px',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="percentage"
                      stroke="#335CFF"
                      strokeWidth={3}
                      dot={{ fill: '#335CFF', r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Department Distribution */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="mb-4">Students by Department</h3>
              <div className="bg-card border border-border rounded-3xl p-6">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={studentStats}>
                    <XAxis dataKey="department" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '12px',
                      }}
                    />
                    <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="#19E68C" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Recent Complaints */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3>Recent Complaints</h3>
                <button
                  onClick={() => setActiveTab('complaints')}
                  className="text-sm text-primary"
                >
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {recentComplaints.map((complaint) => (
                  <div
                    key={complaint.id}
                    className="bg-card border border-border rounded-2xl p-4 flex items-center justify-between"
                  >
                    <p>{complaint.title}</p>
                    <StatusChip status={complaint.status} />
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}

        {activeTab === 'students' && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="bg-card border border-border rounded-3xl p-6">
              <h3 className="mb-4">Student Management</h3>
              <p className="text-muted-foreground mb-6">
                View and manage student records, attendance, and academic performance.
              </p>
              <div className="space-y-3">
                {['View All Students', 'Export Data', 'Add New Student', 'Generate Reports'].map(
                  (action, index) => (
                    <button
                      key={index}
                      className="w-full bg-secondary/50 hover:bg-secondary text-left px-4 py-3 rounded-2xl transition-colors"
                    >
                      {action}
                    </button>
                  )
                )}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'timetable' && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="bg-card border border-border rounded-3xl p-6">
              <h3 className="mb-4">Timetable Management</h3>
              <p className="text-muted-foreground mb-6">
                Create and manage class schedules for all departments and semesters.
              </p>
              <div className="space-y-3">
                {['View All Timetables', 'Create New Schedule', 'Edit Existing', 'Export Schedule'].map(
                  (action, index) => (
                    <button
                      key={index}
                      className="w-full bg-secondary/50 hover:bg-secondary text-left px-4 py-3 rounded-2xl transition-colors"
                    >
                      {action}
                    </button>
                  )
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
