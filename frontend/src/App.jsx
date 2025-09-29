import { Route, Routes } from "react-router-dom";

import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import EmailVerificationPage from "./pages/EmailVerificationPage.jsx";
import { useAuthStore } from "./store/authStore.js";
import { useEffect } from "react";
import HomePage from "./pages/HomePage.jsx";

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerificed) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerificed) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const App = () => {
  const { checkAuth } = useAuthStore();

  // See if the user is authenticated
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <RedirectAuthenticatedUser>
              <RegisterPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
      </Routes>
    </div>
  );
};

export default App;
