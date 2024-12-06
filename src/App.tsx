import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { AuthPage } from '@/pages/AuthPage';
import { GamesPage } from '@/pages/GamesPage';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route
          path="/games"
          element={
            <PrivateRoute>
              <GamesPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;