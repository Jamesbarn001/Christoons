import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import VideoSplash from './components/VideoSplash';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import PricingSection from './components/PricingSection';
import BentoGrid from './components/BentoGrid';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import AdminDashboard from './pages/admin/AdminDashboard';
import ContentPage from './pages/content/ContentPage';
import ChildDashboard from './pages/dashboard/ChildDashboard';
import TeenDashboard from './pages/dashboard/TeenDashboard';

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/signup" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
};

const HomePage = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <BentoGrid />
      <PricingSection />
    </>
  );
};

// Module-level flag: resets on every hard page load/refresh
let splashShownThisLoad = false;

const AppContent = () => {
  const [splashDone, setSplashDone] = useState(splashShownThisLoad);

  const handleSplashComplete = () => {
    splashShownThisLoad = true;
    setSplashDone(true);
  };

  if (!splashDone) {
    return <VideoSplash onComplete={handleSplashComplete} />;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard/child"
          element={
            <ProtectedRoute roles={['child']}>
              <ChildDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/teen"
          element={
            <ProtectedRoute roles={['teen']}>
              <TeenDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={['admin', 'super_admin', 'teacher']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/content/:category"
          element={
            <ProtectedRoute>
              <ContentPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
