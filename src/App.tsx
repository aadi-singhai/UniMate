import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppProvider, useApp } from './contexts/AppContext';

// Screens
import { SplashScreen } from './screens/SplashScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { RoleSelectionScreen } from './screens/RoleSelectionScreen';
import { LoginScreen } from './screens/LoginScreen';
import { SignupScreen } from './screens/SignupScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { AttendanceScreen } from './screens/AttendanceScreen';
import { TimetableScreen } from './screens/TimetableScreen';
import { NotesScreen } from './screens/NotesScreen';
import { EventsScreen } from './screens/EventsScreen';
import { ComplaintScreen } from './screens/ComplaintScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { AdminDashboardScreen } from './screens/AdminDashboardScreen';
import { TeacherDashboardScreen } from './screens/TeacherDashboardScreen';
import { TeacherAttendanceScreen } from './screens/TeacherAttendanceScreen';
import { TeacherTimetableScreen } from './screens/TeacherTimetableScreen';

// ─── Icons ───────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 20, className = '' }: { name: string; size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {name === 'dashboard' && <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>}
    {name === 'attendance' && <><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></>}
    {name === 'timetable' && <><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>}
    {name === 'notes' && <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></>}
    {name === 'events' && <><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.14 1.12a2 2 0 012-.22h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.9a16 16 0 006.12 6.12l1.15-1.15a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></>}
    {name === 'complaints' && <><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></>}
    {name === 'profile' && <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></>}
    {name === 'logout' && <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></>}
    {name === 'menu' && <><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>}
    {name === 'close' && <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>}
    {name === 'chevron' && <polyline points="9 18 15 12 9 6" />}
    {name === 'wifi' && <><path d="M5 12.55a11 11 0 0114.08 0" /><path d="M1.42 9a16 16 0 0121.16 0" /><path d="M8.53 16.11a6 6 0 016.95 0" /><circle cx="12" cy="20" r="1" fill="currentColor" /></>}
  </svg>
);

// ─── Types ────────────────────────────────────────────────────────────────────
type NavItem = {
  id: string;
  label: string;
  icon: string;
  roles: string[];
};

// ─── Nav Config ───────────────────────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', roles: ['student'] },
  { id: 'teacher-dashboard', label: 'Dashboard', icon: 'dashboard', roles: ['teacher'] },
  { id: 'admin-dashboard', label: 'Dashboard', icon: 'dashboard', roles: ['admin'] },
  { id: 'attendance', label: 'Attendance', icon: 'attendance', roles: ['student', 'teacher'] },
  { id: 'timetable', label: 'Timetable', icon: 'timetable', roles: ['student', 'teacher'] },
  { id: 'notes', label: 'Notes', icon: 'notes', roles: ['student', 'teacher'] },
  { id: 'events', label: 'Events', icon: 'events', roles: ['student', 'teacher', 'admin'] },
  { id: 'complaints', label: 'Complaints', icon: 'complaints', roles: ['student', 'teacher', 'admin'] },
  { id: 'profile', label: 'Profile', icon: 'profile', roles: ['student', 'teacher', 'admin'] },
];

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({
  userRole,
  currentScreen,
  userName,
  userEmail,
  onNavigate,
  onLogout,
  collapsed,
  onToggle,
}: {
  userRole: string;
  currentScreen: string;
  userName: string;
  userEmail: string;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  collapsed: boolean;
  onToggle: () => void;
}) {
  const visibleItems = NAV_ITEMS.filter(item => item.roles.includes(userRole));
  const activeScreen = currentScreen;

  return (
    <aside
      style={{
        width: collapsed ? '72px' : '240px',
        minHeight: '100vh',
        background: '#0f1117',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.25s cubic-bezier(0.4,0,0.2,1)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 100,
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <div style={{ padding: collapsed ? '20px 0' : '20px 20px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)', justifyContent: collapsed ? 'center' : 'flex-start' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon name="wifi" size={16} className="" />
        </div>
        {!collapsed && (
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '16px', letterSpacing: '-0.3px', fontFamily: "'DM Sans', sans-serif" }}>UniMate</div>
            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{userRole}</div>
          </div>
        )}
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {visibleItems.map(item => {
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: collapsed ? '10px 0' : '10px 12px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                background: isActive ? 'rgba(99,102,241,0.15)' : 'transparent',
                color: isActive ? '#818cf8' : 'rgba(255,255,255,0.45)',
                fontSize: '14px',
                fontWeight: isActive ? 500 : 400,
                transition: 'all 0.15s ease',
                width: '100%',
                textAlign: 'left',
                fontFamily: "'DM Sans', sans-serif",
                position: 'relative',
              }}
              onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
              onMouseLeave={e => { if (!isActive) { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.45)'; } }}
            >
              {isActive && (
                <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: '3px', height: '20px', borderRadius: '0 3px 3px 0', background: '#818cf8' }} />
              )}
              <Icon name={item.icon} size={18} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div style={{ padding: '12px 8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        {!collapsed && (
          <div style={{ padding: '10px 12px', marginBottom: '4px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)' }}>
            <div style={{ color: '#fff', fontSize: '13px', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{userName}</div>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{userEmail}</div>
          </div>
        )}
        <button
          onClick={onLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: collapsed ? '10px 0' : '10px 12px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            borderRadius: '8px', border: 'none', cursor: 'pointer',
            background: 'transparent', color: 'rgba(255,100,100,0.6)',
            fontSize: '14px', width: '100%', textAlign: 'left',
            fontFamily: "'DM Sans', sans-serif",
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.1)'; (e.currentTarget as HTMLButtonElement).style.color = '#f87171'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,100,100,0.6)'; }}
        >
          <Icon name="logout" size={18} />
          {!collapsed && <span>Sign out</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        style={{
          position: 'absolute', top: '22px', right: '-12px',
          width: '24px', height: '24px', borderRadius: '50%',
          background: '#1e2130', border: '1px solid rgba(255,255,255,0.1)',
          color: 'rgba(255,255,255,0.4)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.15s ease',
          zIndex: 10,
        }}
      >
        <div style={{ transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.25s ease', display: 'flex' }}>
          <Icon name="chevron" size={12} />
        </div>
      </button>
    </aside>
  );
}

// ─── Top Bar ─────────────────────────────────────────────────────────────────
function TopBar({ title, sidebarWidth }: { title: string; sidebarWidth: string }) {
  return (
    <header style={{
      position: 'fixed', top: 0, left: sidebarWidth, right: 0, height: '60px',
      background: 'rgba(15,17,23,0.85)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', alignItems: 'center', padding: '0 32px',
      zIndex: 50, transition: 'left 0.25s cubic-bezier(0.4,0,0.2,1)',
    }}>
      <h1 style={{ color: '#fff', fontSize: '18px', fontWeight: 600, margin: 0, fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.3px' }}>{title}</h1>
    </header>
  );
}

// ─── Desktop Shell ────────────────────────────────────────────────────────────
function DesktopShell({
  children,
  currentScreen,
  user,
  onNavigate,
  onLogout,
}: {
  children: React.ReactNode;
  currentScreen: string;
  user: { name: string; email: string; role: string };
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? '72px' : '240px';

  const screenTitles: Record<string, string> = {
    'dashboard': 'Dashboard',
    'teacher-dashboard': 'Dashboard',
    'admin-dashboard': 'Dashboard',
    'attendance': 'Attendance',
    'timetable': 'Timetable',
    'notes': 'Notes',
    'events': 'Events',
    'complaints': 'Complaints',
    'profile': 'Profile',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0c12', fontFamily: "'DM Sans', sans-serif" }}>
      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');`}</style>

      <Sidebar
        userRole={user.role}
        currentScreen={currentScreen}
        userName={user.name}
        userEmail={user.email}
        onNavigate={onNavigate}
        onLogout={onLogout}
        collapsed={collapsed}
        onToggle={() => setCollapsed(c => !c)}
      />

      <TopBar title={screenTitles[currentScreen] || 'UniMate'} sidebarWidth={sidebarWidth} />

      {/* Main content */}
      <main style={{
        marginLeft: sidebarWidth,
        paddingTop: '60px',
        minHeight: '100vh',
        transition: 'margin-left 0.25s cubic-bezier(0.4,0,0.2,1)',
        background: '#0a0c12',
      }}>
        {/* Inner wrapper — constrains content and removes mobile max-width */}
        <div style={{ padding: '32px', maxWidth: '100%' }}>
          {children}
        </div>
      </main>
    </div>
  );
}

// ─── Pre-auth screens wrapper ─────────────────────────────────────────────────
function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0c12',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');`}</style>
      <div style={{
        width: '100%',
        maxWidth: '460px',
        padding: '0 24px',
      }}>
        {children}
      </div>
    </div>
  );
}

// ─── Onboarding / Splash wrapper (full screen, centered) ─────────────────────
function FullPageShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0c12',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');`}</style>
      <div style={{ width: '100%', maxWidth: '640px', padding: '0 24px' }}>
        {children}
      </div>
    </div>
  );
}

// ─── App Content ─────────────────────────────────────────────────────────────
function AppContent() {
  const { user, setUser, currentScreen, setCurrentScreen } = useApp();

  const handleRoleSelect = (role: 'student' | 'teacher' | 'admin') => {
    setCurrentScreen('login');
    sessionStorage.setItem('selectedRole', role);
  };

  const handleLogin = (email: string, password: string) => {
    const role = (sessionStorage.getItem('selectedRole') as 'student' | 'teacher' | 'admin') || 'student';
    setUser({ id: '1', name: 'Alex Johnson', email, role });
    if (role === 'admin') setCurrentScreen('admin-dashboard');
    else if (role === 'teacher') setCurrentScreen('teacher-dashboard');
    else setCurrentScreen('dashboard');
  };

  const handleSignup = (name: string, email: string, password: string) => {
    const role = (sessionStorage.getItem('selectedRole') as 'student' | 'teacher' | 'admin') || 'student';
    setUser({ id: '1', name, email, role });
    if (role === 'admin') setCurrentScreen('admin-dashboard');
    else if (role === 'teacher') setCurrentScreen('teacher-dashboard');
    else setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('splash');
    sessionStorage.removeItem('selectedRole');
  };

  const handleNavigate = (screen: string) => setCurrentScreen(screen);

  const handleBack = () => {
    if (user) {
      if (user.role === 'admin') setCurrentScreen('admin-dashboard');
      else if (user.role === 'teacher') setCurrentScreen('teacher-dashboard');
      else setCurrentScreen('dashboard');
    } else {
      setCurrentScreen('role-selection');
    }
  };

  // ── Pre-auth screens ──
  if (currentScreen === 'splash') {
    return <FullPageShell><SplashScreen onComplete={() => setCurrentScreen('onboarding')} /></FullPageShell>;
  }
  if (currentScreen === 'onboarding') {
    return <FullPageShell><OnboardingScreen onComplete={() => setCurrentScreen('role-selection')} /></FullPageShell>;
  }
  if (currentScreen === 'role-selection') {
    return <FullPageShell><RoleSelectionScreen onRoleSelect={handleRoleSelect} /></FullPageShell>;
  }
  if (currentScreen === 'login') {
    return (
      <AuthShell>
        <LoginScreen
          onLogin={handleLogin}
          onSignupClick={() => setCurrentScreen('signup')}
        />
      </AuthShell>
    );
  }
  if (currentScreen === 'signup') {
    return (
      <AuthShell>
        <SignupScreen
          onSignup={handleSignup}
          onLoginClick={() => setCurrentScreen('login')}
        />
      </AuthShell>
    );
  }

  if (!user) {
    return <FullPageShell><SplashScreen onComplete={() => setCurrentScreen('onboarding')} /></FullPageShell>;
  }

  // ── Authenticated — render with Desktop Shell ──
  const renderScreen = () => {
    // Admin
    if (user.role === 'admin') {
      if (currentScreen === 'admin-dashboard') return <AdminDashboardScreen onBack={handleBack} />;
      if (currentScreen === 'profile') return <ProfileScreen onBack={handleBack} userName={user.name} userEmail={user.email} userRole={user.role} onLogout={handleLogout} />;
      if (currentScreen === 'complaints') return <ComplaintScreen onBack={handleBack} userRole={user.role} />;
      if (currentScreen === 'events') return <EventsScreen onBack={handleBack} userRole={user.role} />;
    }

    // Teacher
    if (user.role === 'teacher') {
      if (currentScreen === 'teacher-dashboard') return <TeacherDashboardScreen userName={user.name} userAvatar={user.avatar} onNavigate={handleNavigate} />;
      if (currentScreen === 'attendance') return <TeacherAttendanceScreen onBack={handleBack} />;
      if (currentScreen === 'timetable') return <TeacherTimetableScreen onBack={handleBack} />;
      if (currentScreen === 'notes') return <NotesScreen onBack={handleBack} userRole={user.role} />;
      if (currentScreen === 'events') return <EventsScreen onBack={handleBack} userRole={user.role} />;
      if (currentScreen === 'complaints') return <ComplaintScreen onBack={handleBack} userRole={user.role} />;
      if (currentScreen === 'profile') return <ProfileScreen onBack={handleBack} userName={user.name} userEmail={user.email} userRole={user.role} onLogout={handleLogout} />;
    }

    // Student
    if (currentScreen === 'dashboard') return <DashboardScreen userName={user.name} userAvatar={user.avatar} onNavigate={handleNavigate} />;
    if (currentScreen === 'attendance') return <AttendanceScreen onBack={handleBack} />;
    if (currentScreen === 'timetable') return <TimetableScreen onBack={handleBack} />;
    if (currentScreen === 'notes') return <NotesScreen onBack={handleBack} userRole={user.role} />;
    if (currentScreen === 'events') return <EventsScreen onBack={handleBack} userRole={user.role} />;
    if (currentScreen === 'complaints') return <ComplaintScreen onBack={handleBack} userRole={user.role} />;
    if (currentScreen === 'profile') return <ProfileScreen onBack={handleBack} userName={user.name} userEmail={user.email} userRole={user.role} onLogout={handleLogout} />;

    return null;
  };

  return (
    <DesktopShell
      currentScreen={currentScreen}
      user={user}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
    >
      {renderScreen()}
    </DesktopShell>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        {/* Remove the mobile max-w-md constraint — full width for desktop */}
        <div style={{ minHeight: '100vh' }}>
          <AppContent />
        </div>
      </AppProvider>
    </ThemeProvider>
  );
}
