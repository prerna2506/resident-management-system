import React from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import { FaHome, FaBullhorn, FaTools, FaMoneyBillWave, FaUser, FaCheckCircle, FaClock, FaSignOutAlt, FaRocket, FaPlayCircle } from 'react-icons/fa';
import './App.css';

function LandingPage({ onLogin }) {
  return (
    <div className="landing">
      {/* Navbar */}
      <nav className="landing-nav">
        <div className="brand">Society<span>App</span></div>
        <div className="nav-actions">
          <button className="btn-text" onClick={() => onLogin('resident')}>Login</button>
          <button className="btn-primary" onClick={() => onLogin('admin')}>Admin Portal</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="hero-content">
          <h1>Manage Your Society Seamlessly</h1>
          <p>Handle maintenance, complaints, and communication — all in one modern dashboard.</p>
          <div className="hero-ctas">
            <button className="btn-primary btn-xl" onClick={() => onLogin('admin')}>
              <FaRocket /> Get Started
            </button>
            <button className="btn-secondary btn-xl">
              <FaPlayCircle /> Live Demo
            </button>
          </div>
        </motion.div>
      </header>

      {/* Feature Section */}
      <section className="features-section">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="features-grid">
          <motion.div whileHover={{ scale: 1.05 }} className="feature-card">
            <div className="icon-wrapper"><FaBullhorn /></div>
            <h3>Notices</h3>
            <p>Share updates with all residents instantly and keep everyone in the loop.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="feature-card border-accent">
            <div className="icon-wrapper"><FaTools /></div>
            <h3>Complaints</h3>
            <p>Track and resolve issues efficiently. From plumbing to security, manage it all.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="feature-card">
            <div className="icon-wrapper"><FaMoneyBillWave /></div>
            <h3>Payments</h3>
            <p>Manage maintenance payments with ease. Track dues and invoices beautifully.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        © 2024 SocietyApp. A startup-grade product.
      </footer>
    </div>
  );
}

function Sidebar({ currentView, setCurrentView, onLogout }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaHome /> },
    { id: 'complaints', label: 'Complaints', icon: <FaTools /> },
    { id: 'payments', label: 'Payments', icon: <FaMoneyBillWave /> },
    { id: 'notices', label: 'Notices', icon: <FaBullhorn /> },
    { id: 'profile', label: 'Profile', icon: <FaUser /> }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        Society<span>App</span>
      </div>
      <ul className="sidebar-menu">
        {menuItems.map(item => (
          <li key={item.id} className={currentView === item.id ? 'active' : ''} onClick={() => setCurrentView(item.id)}>
            {item.icon} {item.label}
          </li>
        ))}
      </ul>
      <div className="sidebar-footer" onClick={onLogout}>
        <FaSignOutAlt /> Logout
      </div>
    </div>
  );
}

function DashboardContent() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="dashboard-content">
      <div className="stat-grid">
        <motion.div whileHover={{ scale: 1.02, y: -5 }} className="stat-card">
          <div className="stat-icon residents"><FaUser /></div>
          <div>
            <div className="stat-value">120</div>
            <div className="stat-label">Total Residents</div>
          </div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02, y: -5 }} className="stat-card">
          <div className="stat-icon complaints"><FaTools /></div>
          <div>
            <div className="stat-value">5</div>
            <div className="stat-label">Pending Complaints</div>
          </div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02, y: -5 }} className="stat-card">
          <div className="stat-icon payments"><FaMoneyBillWave /></div>
          <div>
            <div className="stat-value">₹50k</div>
            <div className="stat-label">Paid Payments</div>
          </div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02, y: -5 }} className="stat-card">
          <div className="stat-icon notices"><FaBullhorn /></div>
          <div>
            <div className="stat-value">3</div>
            <div className="stat-label">Notices Posted</div>
          </div>
        </motion.div>
      </div>

      {/* Rest of the Dashboard charts or lists could go here */}
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-placeholder">
          <p className="text-muted">Your society is running smoothly today.</p>
        </div>
      </div>
    </motion.div>
  );
}

function ComplaintsContent() {
  const [complaints, setComplaints] = useState([
    { id: 1, title: 'Water leakage in Block B', status: 'Pending', date: 'Oct 24, 2024' },
    { id: 2, title: 'Lift out of order', status: 'Resolved', date: 'Oct 23, 2024' },
  ]);

  const handleRaiseComplaint = () => {
    toast.success("Complaint Submitted Successfully!");
    setComplaints([{ id: Date.now(), title: 'New demo complaint', status: 'Pending', date: 'Oct 24, 2024' }, ...complaints]);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex-between mb-24">
        <h2>Complaint System</h2>
        <button className="btn-primary" onClick={handleRaiseComplaint}>Raise Complaint</button>
      </div>

      <div className="card list-wrapper">
        {complaints.map(c => (
          <div key={c.id} className="list-item">
            <div className="list-item-main">
              <h4>{c.title}</h4>
              <span className="text-muted"><FaClock style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} /> {c.date}</span>
            </div>
            <div>
              <span className={`status-badge ${c.status.toLowerCase()}`}>
                {c.status === 'Resolved' ? <FaCheckCircle /> : ''} {c.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function PaymentsContent() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h2>Payments</h2>
      <div className="card flex-center empty-state mt-24" style={{ marginTop: 24 }}>
        Payment module coming soon...
      </div>
    </motion.div>
  );
}

function NoticesContent() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h2>Notices</h2>
      <div className="card flex-center empty-state mt-24" style={{ marginTop: 24 }}>
        Notices module coming soon...
      </div>
    </motion.div>
  );
}

export default function App() {
  const [role, setRole] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');

  if (!role) {
    return (
      <>
        <Toaster position="top-center" />
        <LandingPage onLogin={(r) => { setRole(r); toast.success(`Logged in as ${r === 'admin' ? 'Administrator' : 'Resident'}`); }} />
      </>
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard': return <DashboardContent />;
      case 'complaints': return <ComplaintsContent />;
      case 'payments': return <PaymentsContent />;
      case 'notices': return <NoticesContent />;
      default: return <DashboardContent />;
    }
  };

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className="app-layout">
      <Toaster position="top-right" toastOptions={{ className: 'custom-toast' }} />

      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onLogout={() => { setRole(null); setCurrentView('dashboard'); toast.success('Logged out'); }}
      />

      <main className="main-content">
        <header className="topbar">
          <h1 className="page-title">{capitalize(currentView)}</h1>
          <div className="user-profile">
            <div className="avatar"><FaUser /></div>
            <span className="user-name">{role === 'admin' ? 'Admin User' : 'Resident'}</span>
          </div>
        </header>

        <div className="content-scroll">
          <AnimatePresence mode="wait">
            <motion.div key={currentView} className="content-inner">
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
