import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Users, Shield } from 'lucide-react';

interface RoleSelectionScreenProps {
  onRoleSelect: (role: 'student' | 'teacher' | 'admin') => void;
}

export function RoleSelectionScreen({ onRoleSelect }: RoleSelectionScreenProps) {
  const roles = [
    {
      id: 'student' as const,
      icon: GraduationCap,
      title: 'Student',
      description: 'Access attendance, timetable, notes and events',
      color: '#335CFF',
    },
    {
      id: 'teacher' as const,
      icon: Users,
      title: 'Teacher',
      description: 'Manage classes, upload notes and track attendance',
      color: '#19E68C',
    },
    {
      id: 'admin' as const,
      icon: Shield,
      title: 'Admin',
      description: 'Full access to manage campus operations',
      color: '#F59E0B',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background p-6">
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl mb-2"
        >
          Choose Your Role
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground mb-12"
        >
          Select how you want to use UniMate
        </motion.p>

        <div className="flex flex-col gap-4 w-full max-w-md">
          {roles.map((role, index) => (
            <motion.button
              key={role.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              onClick={() => onRoleSelect(role.id)}
              className="flex items-center gap-4 p-6 bg-card border border-border rounded-3xl hover:scale-[1.02] transition-transform"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: `${role.color}20` }}
              >
                <role.icon className="w-8 h-8" style={{ color: role.color }} />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-xl mb-1">{role.title}</h3>
                <p className="text-sm text-muted-foreground">{role.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
