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
import { FloatingNavBar } from './components/FloatingNavBar';

function AppContent() {
  const { user, setUser, currentScreen, setCurrentScreen } = useApp();
  const [authScreen, setAuthScreen] = useState<'login' | 'signup'>('login');

  const handleRoleSelect = (role: 'student' | 'teacher' | 'admin') => {
    setAuthScreen('login');
    setCurrentScreen('login');
    // Store the selected role for later use
    sessionStorage.setItem('selectedRole', role);
  };

  const handleLogin = (email: string, password: string) => {
    const role = (sessionStorage.getItem('selectedRole') as 'student' | 'teacher' | 'admin') || 'student';
    const newUser = {
      id: '1',
      name: 'Alex Johnson',
      email,
      role,
    };
    setUser(newUser);
    
    if (role === 'admin') {
      setCurrentScreen('admin-dashboard');
    } else if (role === 'teacher') {
      setCurrentScreen('teacher-dashboard');
    } else {
      setCurrentScreen('dashboard');
    }
  };

  const handleSignup = (name: string, email: string, password: string) => {
    const role = (sessionStorage.getItem('selectedRole') as 'student' | 'teacher' | 'admin') || 'student';
    const newUser = {
      id: '1',
      name,
      email,
      role,
    };
    setUser(newUser);
    
    if (role === 'admin') {
      setCurrentScreen('admin-dashboard');
    } else if (role === 'teacher') {
      setCurrentScreen('teacher-dashboard');
    } else {
      setCurrentScreen('dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('splash');
    sessionStorage.removeItem('selectedRole');
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
  };

  const handleBack = () => {
    if (user) {
      if (user.role === 'admin') {
        setCurrentScreen('admin-dashboard');
      } else if (user.role === 'teacher') {
        setCurrentScreen('teacher-dashboard');
      } else {
        setCurrentScreen('dashboard');
      }
    } else {
      setCurrentScreen('role-selection');
    }
  };

  // Render current screen
  if (currentScreen === 'splash') {
    return <SplashScreen onComplete={() => setCurrentScreen('onboarding')} />;
  }

  if (currentScreen === 'onboarding') {
    return <OnboardingScreen onComplete={() => setCurrentScreen('role-selection')} />;
  }

  if (currentScreen === 'role-selection') {
    return <RoleSelectionScreen onRoleSelect={handleRoleSelect} />;
  }

  if (currentScreen === 'login') {
    return (
      <LoginScreen
        onLogin={handleLogin}
        onSignupClick={() => {
          setAuthScreen('signup');
          setCurrentScreen('signup');
        }}
      />
    );
  }

  if (currentScreen === 'signup') {
    return (
      <SignupScreen
        onSignup={handleSignup}
        onLoginClick={() => {
          setAuthScreen('login');
          setCurrentScreen('login');
        }}
      />
    );
  }

  if (!user) {
    return <SplashScreen onComplete={() => setCurrentScreen('onboarding')} />;
  }

  // Admin screens
  if (user.role === 'admin') {
    if (currentScreen === 'admin-dashboard') {
      return <AdminDashboardScreen onBack={handleBack} />;
    }
    if (currentScreen === 'profile') {
      return (
        <ProfileScreen
          onBack={() => setCurrentScreen('admin-dashboard')}
          userName={user.name}
          userEmail={user.email}
          userRole={user.role}
          onLogout={handleLogout}
        />
      );
    }
    if (currentScreen === 'complaints') {
      return (
        <ComplaintScreen
          onBack={() => setCurrentScreen('admin-dashboard')}
          userRole={user.role}
        />
      );
    }
    if (currentScreen === 'events') {
      return (
        <EventsScreen
          onBack={() => setCurrentScreen('admin-dashboard')}
          userRole={user.role}
        />
      );
    }
  }

  // Teacher screens
  if (user.role === 'teacher') {
    return (
      <>
        {currentScreen === 'teacher-dashboard' && (
          <TeacherDashboardScreen
            userName={user.name}
            userAvatar={user.avatar}
            onNavigate={handleNavigate}
          />
        )}
        {currentScreen === 'attendance' && <TeacherAttendanceScreen onBack={handleBack} />}
        {currentScreen === 'timetable' && <TeacherTimetableScreen onBack={handleBack} />}
        {currentScreen === 'notes' && <NotesScreen onBack={handleBack} userRole={user.role} />}
        {currentScreen === 'events' && (
          <EventsScreen onBack={handleBack} userRole={user.role} />
        )}
        {currentScreen === 'complaints' && (
          <ComplaintScreen onBack={handleBack} userRole={user.role} />
        )}
        {currentScreen === 'profile' && (
          <ProfileScreen
            onBack={handleBack}
            userName={user.name}
            userEmail={user.email}
            userRole={user.role}
            onLogout={handleLogout}
          />
        )}

        {/* Floating Navigation Bar */}
        <FloatingNavBar
          activeTab={currentScreen === 'teacher-dashboard' ? 'dashboard' : currentScreen}
          onTabChange={(tab) => {
            if (tab === 'dashboard') {
              handleNavigate('teacher-dashboard');
            } else {
              handleNavigate(tab);
            }
          }}
          userRole={user.role}
        />
      </>
    );
  }

  // Student screens
  return (
    <>
      {currentScreen === 'dashboard' && (
        <DashboardScreen
          userName={user.name}
          userAvatar={user.avatar}
          onNavigate={handleNavigate}
        />
      )}
      {currentScreen === 'attendance' && <AttendanceScreen onBack={handleBack} />}
      {currentScreen === 'timetable' && <TimetableScreen onBack={handleBack} />}
      {currentScreen === 'notes' && <NotesScreen onBack={handleBack} userRole={user.role} />}
      {currentScreen === 'events' && <EventsScreen onBack={handleBack} userRole={user.role} />}
      {currentScreen === 'complaints' && <ComplaintScreen onBack={handleBack} userRole={user.role} />}
      {currentScreen === 'profile' && (
        <ProfileScreen
          onBack={handleBack}
          userName={user.name}
          userEmail={user.email}
          userRole={user.role}
          onLogout={handleLogout}
        />
      )}

      {/* Floating Navigation Bar */}
      {user.role !== 'admin' && (
        <FloatingNavBar
          activeTab={currentScreen}
          onTabChange={handleNavigate}
          userRole={user.role}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <div className="min-h-screen max-w-md mx-auto relative">
          <AppContent />
        </div>
      </AppProvider>
    </ThemeProvider>
  );
}