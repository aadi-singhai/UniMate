import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  MessageSquare,
  BarChart3,
  Settings,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { StatusChip } from '../components/StatusChip';
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from 'recharts';

interface AdminDashboardScreenProps {
  onBack: () => void;
}

export function AdminDashboardScreen({ onBack }: AdminDashboardScreenProps) {
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
    <div className="space-y-6 w-full max-w-[1400px] mx-auto p-1">
      {/* Top Controls Action Header */}
      <div className="flex items-center justify-between bg-card/40 border border-border/60 p-6 rounded-xl backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-secondary/80 rounded-lg transition-colors border border-border/40">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Admin Dashboard</h2>
            <div className="flex items-center gap-2 mt-0.5 text-sm text-muted-foreground">
              <span>Internal Administration</span>
              <span>•</span>
              <span className="text-primary font-medium">{menuItems.find((m) => m.id === activeTab)?.label}</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher Toolbar Ribbon */}
        <div className="hidden xl:flex items-center gap-1.5 bg-muted/40 border border-border/60 p-1 rounded-xl">
          {menuItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === item.id
                    ? 'bg-card text-foreground border border-border shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Expanded 4-Column High Density Metric Matrix */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider leading-none mb-1">Total Matriculated</p>
                <p className="text-2xl font-bold tracking-tight">1,440</p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider leading-none mb-1">Avg Attendance</p>
                <p className="text-2xl font-bold tracking-tight">75%</p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider leading-none mb-1">Active Events</p>
                <p className="text-2xl font-bold tracking-tight">24</p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#EF4444]/10 flex items-center justify-center shrink-0">
                <AlertCircle className="w-6 h-6 text-[#EF4444]" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider leading-none mb-1">Pending Tickets</p>
                <p className="text-2xl font-bold tracking-tight">8</p>
              </div>
            </div>
          </motion.div>

          {/* Core Analytics Grid Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            {/* Attendance Track Profile (7/12 Workspace Width) */}
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-7 bg-card border border-border rounded-xl p-6 shadow-sm"
            >
              <div className="mb-5">
                <h3 className="text-base font-semibold tracking-tight">System Attendance Velocity</h3>
                <p className="text-xs text-muted-foreground">Rolling institutional percentages over past semester intervals</p>
              </div>
              <div className="w-full pt-2">
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={attendanceData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="month" stroke="var(--border)" fontSize={12} tickLine={false} axisLine={false} dy={8} />
                    <YAxis stroke="var(--border)" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="percentage"
                      stroke="#335CFF"
                      strokeWidth={3}
                      dot={{ fill: '#335CFF', r: 4, strokeWidth: 0 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Department Split Profile (5/12 Workspace Width) */}
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="lg:col-span-5 bg-card border border-border rounded-xl p-6 shadow-sm"
            >
              <div className="mb-5">
                <h3 className="text-base font-semibold tracking-tight">Students by Branch</h3>
                <p className="text-xs text-muted-foreground">Distribution across principal technical departments</p>
              </div>
              <div className="w-full pt-2">
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={studentStats} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <XAxis dataKey="department" stroke="var(--border)" fontSize={12} tickLine={false} axisLine={false} dy={8} />
                    <YAxis stroke="var(--border)" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]} fill="#19E68C" barSize={35} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Bottom Dynamic Activity Stack */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-semibold tracking-tight">Pending Infrastructure Actions</h3>
                <p className="text-xs text-muted-foreground">Most recent campus helpdesk entries awaiting administrative review</p>
              </div>
              <button
                onClick={() => setActiveTab('complaints')}
                className="text-xs font-semibold text-primary hover:underline border border-primary/20 bg-primary/5 px-3 py-1.5 rounded-lg transition-all"
              >
                View Operations Queue
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="bg-secondary/20 border border-border/50 rounded-xl p-4 flex items-center justify-between gap-4"
                >
                  <p className="text-sm font-medium tracking-tight truncate flex-1">{complaint.title}</p>
                  <StatusChip status={complaint.status} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Sub-Panel Layout Content Shells */}
      {activeTab === 'students' && (
        <motion.div initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <div className="bg-card border border-border rounded-xl p-8 max-w-3xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Student Management Suite</h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Query global registries, configure dynamic credentials configurations, track historical session trends, or extract data arrays.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {['View All Students', 'Export Data', 'Add New Student', 'Generate Reports'].map((action, index) => (
                <button
                  key={index}
                  className="bg-secondary/40 border border-border/50 hover:bg-secondary/80 text-left px-5 py-3.5 rounded-xl text-sm font-medium transition-all"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'timetable' && (
        <motion.div initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <div className="bg-card border border-border rounded-xl p-8 max-w-3xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Timetable Mapping Console</h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Design schedule slots, override conflicts, map course locations, and manage section divisions across engineering matrices.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {['View All Timetables', 'Create New Schedule', 'Edit Existing', 'Export Schedule'].map((action, index) => (
                <button
                  key={index}
                  className="bg-secondary/40 border border-border/50 hover:bg-secondary/80 text-left px-5 py-3.5 rounded-xl text-sm font-medium transition-all"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}