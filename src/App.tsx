import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ImageList } from "./ImageList";
import { AuthProvider, useAuth } from "./AuthContext";
import Login from "./Login";

const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({
  element,
}) => {
  const auth = useAuth();
  return auth.isAuthenticated ? (
    <>{element}</>
  ) : (
    <Navigate to="/login" replace />
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={<ProtectedRoute element={<ImageList />} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
          
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
