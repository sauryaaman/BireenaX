// import { useState,useEffect} from 'react'
// import { BrowserRouter, Routes, Route ,  Navigate,useLocation  } from 'react-router-dom';
// import LandingPage from './pages/landingPage';
// import AdminAuth from './pages/signup';
// import Login from './pages/Login';
// import { AuthProvider } from './context/AuthContext';
// import Dashboard from './pages/dashboard';
// import { useAuth } from './context/AuthContext';
// import LinkedInCallback from './components/LinkedInCallback';
// import './App.css';

// // Protected Route Component
// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useAuth();
//   const location = useLocation();

//   if (!isAuthenticated) {
//     // Redirect to login while saving the attempted location
//     return <Navigate to="/auth" state={{ from: location }} replace />;
//   }

//   return children;
// };


// function App() {
//   //  const token =localStorage.setItem('token', response.data.token);
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Clear OAuth related parameters on route change
//     if (location.search.includes('oauth') || location.search.includes('clientId')) {
//       const url = new URL(window.location.href);
//       url.searchParams.delete('oauth');
//       url.searchParams.delete('clientId');
//       url.searchParams.delete('t');
//       navigate(url.pathname, { replace: true });
//     }
//   }, [location, navigate]);
  
//   return (
    
//     <BrowserRouter>
//       <AuthProvider>
//         <div className="app">
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={<LandingPage />} />
//             <Route path="/auth" element={<AdminAuth />} />
//             <Route path="/login" element={<Login />} />
//             {/* Protected Route*/}
//             <Route
//               path="/dashboard"
//               element={
//                 <ProtectedRoute>
//                   <Dashboard />
//                 </ProtectedRoute>
//               }
//             />
//              {/* Catch all route for unknown paths */}
//             <Route path="*" element={<Navigate to="/" replace />} />
//              <Route path="/auth/linkedin/callback" element={<LinkedInCallback />} />
//           </Routes>
//         </div>
//       </AuthProvider>
//     </BrowserRouter>
    
//   )
// }

// export default App

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import LandingPage from './pages/landingPage';
import AdminAuth from './pages/signup';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/dashboard';
import { useAuth } from './context/AuthContext';
import LinkedInCallback from './components/LinkedInCallback';
import Services from './pages/services';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import AdminProfile from './components/AdminProfile';

import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

// Create AppRoutes component to use router hooks
const AppRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.search.includes('oauth') || location.search.includes('clientId')) {
      const url = new URL(window.location.href);
      url.searchParams.delete('oauth');
      url.searchParams.delete('clientId');
      url.searchParams.delete('t');
      navigate(url.pathname, { replace: true });
    }
  }, [location, navigate]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AdminAuth />} />
      <Route path="/login" element={<Login />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />

      {/* Protected Route*/}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
            
          </ProtectedRoute>
        }
      />
      <Route
        path="/Admin"
        element={
          
          <ProtectedRoute>
            <AdminProfile />
          </ProtectedRoute>
          
        }
        />
      <Route path="/auth/linkedin/callback" element={<LinkedInCallback />} />
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
      
    </Routes>
    
  );
};

// Main App component
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app">
          <AppRoutes />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;