import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Activity from './pages/Activity';
import Chat from './pages/Chat';
import MyProfile from './pages/MyProfile';
import { User } from './types';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/activity"
          element={currentUser ? <Activity currentUser={currentUser} /> : <RequireAuth />}
        />

        <Route
          path="/chat/:id"
          element={currentUser ? <Chat currentUser={currentUser} /> : <RequireAuth />}
        />

        <Route
          path="/mypage"
          element={currentUser ? <MyProfile currentUser={currentUser} /> : <RequireAuth />}
        />
      </Routes>
    </Router>
  );
}

function RequireAuth() {
  const location = useLocation();
  return <Navigate to="/login" state={{ from: location }} replace />;
}

export default App;
