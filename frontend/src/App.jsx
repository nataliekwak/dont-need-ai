import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Spinner } from "@heroui/react";

import {
  AssignmentPage,
  EmailVerificationPage,
  ForgotPasswordPage,
  HomePage,
  LandingPage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  WritingGuide,
} from "./pages";
import { useAuthStore } from "./store/authStore.js";

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
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

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const App = () => {
  const { isCheckingAuth, checkAuth, isAuthenticated } = useAuthStore();

  // See if the user is authenticated
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <Spinner size="lg" />;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            {/* If the user is verified show the landing page, else show the home page */}
            {isAuthenticated ? <LandingPage /> : <HomePage />}
          </>
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
      <Route
        path="/verify-email"
        element={
          <RedirectAuthenticatedUser>
            <EmailVerificationPage />
          </RedirectAuthenticatedUser>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <RedirectAuthenticatedUser>
            <ForgotPasswordPage />
          </RedirectAuthenticatedUser>
        }
      />
      <Route
        path="/reset-password/:token"
        element={
          <RedirectAuthenticatedUser>
            <ResetPasswordPage />
          </RedirectAuthenticatedUser>
        }
      />
      <Route
        path="/writing-guide"
        element={
          <ProtectedRoute>
            <WritingGuide />
          </ProtectedRoute>
        }
      />
      <Route
        path="/writing-guide/:assignmentId"
        element={
          <ProtectedRoute>
            <AssignmentPage />
          </ProtectedRoute>
        }
      />
      {/* catch all routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
