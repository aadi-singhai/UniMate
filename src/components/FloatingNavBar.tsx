import React from 'react';
import { Home, Calendar, FileText, MessageSquare, User, Users } from 'lucide-react';

interface FloatingNavBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userRole: 'student' | 'teacher' | 'admin';
}

export function FloatingNavBar({ activeTab, onTabChange, userRole }: FloatingNavBarProps) {
  const navItems = userRole === 'teacher' 
    ? [
        { id: 'dashboard', icon: Home, label: 'Home' },
        { id: 'attendance', icon: Users, label: 'Mark' },
        { id: 'notes', icon: FileText, label: 'Notes' },
        { id: 'timetable', icon: Calendar, label: 'Schedule' },
        { id: 'profile', icon: User, label: 'Profile' },
      ]
    : [
        { id: 'dashboard', icon: Home, label: 'Home' },
        { id: 'timetable', icon: Calendar, label: 'Timetable' },
        { id: 'notes', icon: FileText, label: 'Notes' },
        { id: 'complaints', icon: MessageSquare, label: 'Complaints' },
        { id: 'profile', icon: User, label: 'Profile' },
      ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
      <div className="backdrop-blur-xl bg-card/90 border border-border rounded-3xl shadow-2xl px-4 py-3">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground scale-110'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px]">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}