import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { AuthPage } from '@/pages/AuthPage';
import { GamesPage } from '@/pages/GamesPage';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
}

function App() {
  const backgroundStyle = {
    backgroundImage: `url("https://i.makeagif.com/media/2-21-2023/2A36v2.gif")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div style={backgroundStyle}>
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
    </div>
  );
}

export default App;