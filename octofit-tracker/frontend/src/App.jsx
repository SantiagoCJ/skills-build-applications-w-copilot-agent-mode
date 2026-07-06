import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/users', label: 'Users' },
  { to: '/activities', label: 'Activities' },
  { to: '/teams', label: 'Teams' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-lg-5">
              <h1 className="display-5 fw-bold mb-3">OctoFit Tracker</h1>
              <p className="lead text-muted mb-4">
                A modern multi-tier fitness app for tracking workouts, teams, and progress.
              </p>
              <div className="alert alert-warning" role="alert">
                Define <strong>VITE_CODESPACE_NAME</strong> in <strong>.env.local</strong> for Codespaces URLs such as
                {' '}https://your-codespace-name-8000.app.github.dev/api/users/.
              </div>
              <nav className="nav nav-pills flex-wrap gap-2 mb-4">
                {navItems.map((item) => (
                  <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <Routes>
                <Route path="/" element={<div className="row g-3"><div className="col-md-6"><div className="card h-100 border-0 bg-light"><div className="card-body"><h2 className="h5">Welcome</h2><p className="mb-0 text-muted">Browse users, activities, teams, leaderboard entries, and workouts from the API.</p></div></div></div></div>} />
                <Route path="/users" element={<Users />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/workouts" element={<Workouts />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
