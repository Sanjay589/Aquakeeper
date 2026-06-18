import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './components/common/Toast';
import { UserModeProvider } from './contexts/UserModeContext';
import { ErrorBoundary } from './components/common/ErrorBound';
import AppLayout from './components/layout/AppLayout';

// Public pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import NotFound from './pages/NotFound';

// App pages
import Dashboard from './pages/Dashboard';
import BeginnerGuide from './pages/BeginnerGuide';
import MyAquariums from './pages/MyAquariums';
import AquariumDetails from './pages/AquariumDetails';
import MyFish from './pages/MyFish';
import WaterQuality from './pages/WaterQuality';
import Maintenance from './pages/Maintenance';
import AiAssistant from './pages/AiAssistant';
import FishPhotoCheck from './pages/FishPhotoCheck';
import Alerts from './pages/Alerts';
import PetStore from './pages/PetStore';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <UserModeProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />

              {/* Private / Application Routes */}
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/guide" element={<BeginnerGuide />} />
                <Route path="/aquariums" element={<MyAquariums />} />
                <Route path="/aquarium/:id" element={<AquariumDetails />} />
                <Route path="/fish" element={<MyFish />} />
                <Route path="/water-quality" element={<WaterQuality />} />
                <Route path="/maintenance" element={<Maintenance />} />
                <Route path="/ai-assistant" element={<AiAssistant />} />
                <Route path="/photo-check" element={<FishPhotoCheck />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/pet-store" element={<PetStore />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
              </Route>

              {/* Fallback */}
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </BrowserRouter>
        </UserModeProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
};

export default App;
