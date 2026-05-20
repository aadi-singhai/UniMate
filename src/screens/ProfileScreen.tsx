import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Bell,
  Moon,
  Sun,
  Lock,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { useTheme } from '../contexts/ThemeContext';
import { Switch } from '../components/ui/switch';
import { Button } from '../components/ui/button';

interface ProfileScreenProps {
  onBack: () => void;
  userName: string;
  userEmail: string;
  userRole: 'student' | 'teacher' | 'admin';
  onLogout: () => void;
}

export function ProfileScreen({ onBack, userName, userEmail, userRole, onLogout }: ProfileScreenProps) {
  const { theme, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const userInfo = {
    name: userName,
    email: userEmail,
    phone: '+1 234 567 8900',
    department: 'Computer Science',
    enrollmentId: 'CS2024001',
    joinDate: 'August 2024',
  };

  const settingSections = [
    {
      title: 'Appearance',
      items: [
        {
          icon: theme === 'dark' ? Moon : Sun,
          label: 'Dark Mode',
          action: (
            <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
          ),
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: Bell,
          label: 'Push Notifications',
          action: (
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          ),
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          icon: Lock,
          label: 'Change Password',
          action: <ChevronRight className="w-5 h-5 text-muted-foreground" />,
        },
        {
          icon: User,
          label: 'Edit Profile',
          action: <ChevronRight className="w-5 h-5 text-muted-foreground" />,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <GlassCard className="p-6 rounded-b-3xl mb-6">
        <div className="flex items-center gap-4 mb-2">
          <button onClick={onBack} className="p-2 hover:bg-secondary/50 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl">Profile</h2>
        </div>
      </GlassCard>

      <div className="px-6 space-y-6">
        {/* Profile Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="bg-card border border-border rounded-3xl p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-3xl">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h3 className="mb-1">{userInfo.name}</h3>
                <p className="text-sm text-muted-foreground capitalize">{userRole}</p>
              </div>
              <button className="p-2 hover:bg-secondary rounded-full transition-colors">
                <Edit className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5" />
                <span>{userInfo.email}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5" />
                <span>{userInfo.phone}</span>
              </div>
              {userRole === 'student' && (
                <>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5" />
                    <span>{userInfo.department}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <User className="w-5 h-5" />
                    <span>{userInfo.enrollmentId}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="w-5 h-5" />
                    <span>Joined {userInfo.joinDate}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Settings Sections */}
        {settingSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 * (sectionIndex + 1) }}
          >
            <h3 className="mb-3">{section.title}</h3>
            <div className="bg-card border border-border rounded-3xl overflow-hidden">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <button
                    key={itemIndex}
                    className={`w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors ${
                      itemIndex !== section.items.length - 1 ? 'border-b border-border' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-muted-foreground" />
                      <span>{item.label}</span>
                    </div>
                    {item.action}
                  </button>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* Stats (for students) */}
        {userRole === 'student' && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="mb-3">Your Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-2xl p-4">
                <p className="text-2xl mb-1">75%</p>
                <p className="text-xs text-muted-foreground">Attendance</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-4">
                <p className="text-2xl mb-1">42</p>
                <p className="text-xs text-muted-foreground">Notes Downloaded</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-4">
                <p className="text-2xl mb-1">8</p>
                <p className="text-xs text-muted-foreground">Events Attended</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-4">
                <p className="text-2xl mb-1">3</p>
                <p className="text-xs text-muted-foreground">Complaints Filed</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Logout Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={onLogout}
            variant="destructive"
            className="w-full h-14 rounded-2xl"
            size="lg"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Log Out
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
