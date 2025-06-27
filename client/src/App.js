import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CalendarPage from './pages/CalendarPage';
import StudyGroupsPage from './pages/StudyGroupsPage';
import ResourceHubPage from './pages/ResourceHubPage';
import MarketplacePage from './pages/MarketplacePage';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute component={DashboardPage} />}
          />
          <Route
            path="/calendar"
            element={<PrivateRoute component={CalendarPage} />}
          />
          <Route
            path="/studygroups"
            element={<PrivateRoute component={StudyGroupsPage} />}
          />
          <Route
            path="/resourcehub"
            element={<PrivateRoute component={ResourceHubPage} />}
          />
          <Route
            path="/marketplace"
            element={<PrivateRoute component={MarketplacePage} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute component={ProfilePage} />}
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;