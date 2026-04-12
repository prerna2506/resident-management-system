import React, { useState, useEffect } from 'react';
const API_BASE = 'http://localhost:3001/api';
import './App.css';
import poolImg from './assets/swimming_pool.png';
import { Analytics } from '@vercel/analytics/react';

// --- SVGs & Icons ---
const BellIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;
const UserIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const CalendarIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const AlertTriangleIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
const CreditCardIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>;
const NewspaperIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path><path d="M18 14h-8"></path><path d="M15 18h-5"></path><path d="M10 6h8v4h-8V6Z"></path></svg>;
const EditIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;

// --- Components ---

function Navigation({ currentView, setCurrentView }) {
  const navItems = ['Dashboard', 'Facilities', 'Payments', 'Community'];
  
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        Society<span style={{fontWeight: 400}}>Concierge</span>
      </div>
      <div className="navbar-links">
        {navItems.map(item => (
          <a 
            key={item} 
            href="#" 
            className={`nav-link ${currentView === item.toLowerCase() ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setCurrentView(item.toLowerCase()); }}
          >
            {item}
          </a>
        ))}
      </div>
      <div className="navbar-actions">
        <button className="icon-btn"><BellIcon /></button>
        <button className="icon-btn"><UserIcon /></button>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">Society Concierge</div>
      <div className="footer-links">
        <a href="#">Contact Us</a>
        <a href="#">Legal Policy</a>
        <a href="#">Privacy</a>
        <a href="#">Terms of Service</a>
      </div>
      <div>© 2024 Society Concierge. All rights reserved.</div>
    </footer>
  );
}

// --- Views ---

function DashboardView({ setCurrentView }) {
  const [data, setData] = useState({ announcements: [], dues: { amount: 0, invoiceNumber: '', dueDate: '' } });
  useEffect(() => {
    Promise.all([
      fetch(API_BASE + '/dashboard/announcements').then(r => r.json()),
      fetch(API_BASE + '/dashboard/dues').then(r => r.json())
    ]).then(([announcements, dues]) => setData({ announcements, dues }));
  }, []);
  const announcements = data.announcements || [];
  const dues = data.dues || {};

  return (
    <div className="fade-in">
      <div className="dashboard-banner">
        <div className="subtitle" style={{color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, fontSize: '0.8rem', fontWeight: 700}}>Good Morning, Resident</div>
        <h1>Welcome to Skyline Terrace</h1>
        <p>Your luxury living experience, curated. All your society needs in one digital concierge.</p>
      </div>

      <div className="quick-links">
        <div className="quick-link-card" onClick={() => setCurrentView('facilities')}>
          <div className="icon"><CalendarIcon /></div>
          <div style={{fontWeight: 600}}>Book Amenities</div>
        </div>
        <div className="quick-link-card" onClick={() => setCurrentView('community')}>
          <div className="icon" style={{color: 'var(--danger)', background: 'var(--danger-bg)'}}><AlertTriangleIcon /></div>
          <div style={{fontWeight: 600}}>Raise Complaint</div>
        </div>
        <div className="quick-link-card" onClick={() => setCurrentView('payments')}>
          <div className="icon"><CreditCardIcon /></div>
          <div style={{fontWeight: 600}}>Pay Maintenance</div>
        </div>
        <div className="quick-link-card" onClick={() => setCurrentView('dashboard')}>
          <div className="icon"><NewspaperIcon /></div>
          <div style={{fontWeight: 600}}>Community News</div>
        </div>
      </div>

      <div className="grid-cols-2">
        <div>
          <div className="flex-between" style={{marginBottom: 16}}>
            <h2>Recent Announcements</h2>
            <a href="#" style={{color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem'}}>View All</a>
          </div>
          
          {announcements.length > 0 && (
            <div className="card" style={{padding: 0, overflow: 'hidden', marginBottom: 16}}>
              <div style={{display: 'flex'}}>
                <img src={announcements[0].image || "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=400&h=250"} style={{width: '50%', objectFit: 'cover'}} alt="Lobby" />
                <div style={{padding: 24}}>
                  <h3 style={{marginBottom: 8}}>{announcements[0].title}</h3>
                  <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>{announcements[0].description}</p>
                </div>
              </div>
            </div>
          )}
          <div className="grid-cols-2" style={{gap: 16}}>
            {announcements.slice(1).map(a => (
              <div key={a.id} className="card" style={{background: a.type === 'minor' ? '#f4f4f5' : 'var(--primary-bg)', border: 'none'}}>
                <div style={{fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8}}>{a.timeAgo}</div>
                <h4 style={{marginBottom: 8}}>{a.title}</h4>
                <p style={{color: 'var(--text-muted)', fontSize: '0.8rem'}}>{a.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="card" style={{marginBottom: 24}}>
            <div className="flex-between" style={{marginBottom: 8}}>
              <div className="subtitle" style={{margin:0}}>MAINTENANCE DUE</div>
              <span className="badge danger" style={{background: 'var(--danger-bg)'}}>DUES PENDING</span>
            </div>
            <h2 style={{fontSize: '2rem', marginBottom: 8}}>${dues.amount ? dues.amount.toFixed(2) : '0.00'}</h2>
            <p style={{color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 16}}>Invoice #{dues.invoiceNumber} • Due by {dues.dueDate}</p>
            <button className="btn-primary" style={{width: '100%', justifyContent: 'center'}} onClick={() => setCurrentView('payments')}>PAY NOW</button>
          </div>

          <h3 style={{marginBottom: 16}}>Amenity Availability</h3>
          <div className="card">
            <div className="flex-between" style={{padding: '12px 0', borderBottom: '1px solid var(--border-color)'}}>
              <span style={{fontWeight: 500}}>Swimming Pool</span>
              <span style={{color: 'var(--success)', fontWeight: 700, fontSize: '0.8rem'}}>● OPEN</span>
            </div>
            <div className="flex-between" style={{padding: '12px 0', borderBottom: '1px solid var(--border-color)'}}>
              <span style={{fontWeight: 500}}>Mini Theater</span>
              <span style={{color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.8rem'}}>BOOKED</span>
            </div>
            <div className="flex-between" style={{padding: '12px 0'}}>
              <span style={{fontWeight: 500}}>Tennis Court</span>
              <span style={{color: 'var(--success)', fontWeight: 700, fontSize: '0.8rem'}}>● OPEN</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceHubView() {
  const [complaints, setComplaints] = useState([]);
  const [form, setForm] = useState({ category: 'Maintenance & Repairs', urgency: 'Standard', subject: '', description: '' });

  const loadComplaints = () => fetch(API_BASE + '/complaints').then(r => r.json()).then(setComplaints);
  useEffect(() => { loadComplaints(); }, []);

  const handleSubmit = () => {
    fetch(API_BASE + '/complaints', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    }).then(() => {
       setForm({ category: 'Maintenance & Repairs', urgency: 'Standard', subject: '', description: '' });
       loadComplaints();
    });
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1>Service Hub</h1>
        <p style={{color: 'var(--text-muted)'}}>Experience seamless resolution. Your concerns are our priority. Use the portal below to lodge and track community requests.</p>
      </div>

      <div className="grid-cols-2" style={{gridTemplateColumns: '1fr 1fr'}}>
        <div className="service-form">
          <div className="header">
            <div className="header-icon"><EditIcon /></div>
            <div>
              <h2 style={{margin:0}}>New Complaint</h2>
              <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Formalize your request for society intervention</p>
            </div>
          </div>
          
          <div className="grid-cols-2" style={{gap: 16}}>
            <div className="form-group">
              <label>Category</label>
              <select className="form-control" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                <option>Maintenance & Repairs</option>
                <option>Security</option>
                <option>Sanitation</option>
              </select>
            </div>
            <div className="form-group">
              <label>Urgency</label>
              <div style={{display: 'flex', gap: 8}}>
                <button className="form-control" style={{background: form.urgency === 'Standard' ? 'var(--primary)' : '', color: form.urgency === 'Standard' ? 'white' : ''}} onClick={() => setForm({...form, urgency: 'Standard'})}>Standard</button>
                <button className="form-control" style={{background: form.urgency === 'Urgent' ? 'var(--primary)' : '', color: form.urgency === 'Urgent' ? 'white' : ''}} onClick={() => setForm({...form, urgency: 'Urgent'})}>Urgent</button>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Subject</label>
            <input type="text" className="form-control" placeholder="Brief summary of the issue" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea className="form-control" placeholder="Provide as much detail as possible to expedite resolution..." value={form.description} onChange={e => setForm({...form, description: e.target.value})}></textarea>
          </div>

          <button className="btn-primary" onClick={handleSubmit}>Lodge Complaint &rarr;</button>
        </div>

        <div>
          <div className="flex-between" style={{marginBottom: 24}}>
            <h2 style={{margin:0}}>My Active Complaints</h2>
            <span className="badge" style={{background: 'var(--primary-bg)', color: 'var(--primary)'}}>{complaints.length} OPEN</span>
          </div>

          <div className="complaint-list">
            {complaints.length === 0 ? (
              <div className="complaint-card" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>No active complaints.</div>
            ) : complaints.map(c => (
              <div key={c.id} className="complaint-card">
                <div className="complaint-header">
                  <span className="subtitle" style={{margin:0}}>{c.category}</span>
                  <span className="badge" style={{background: '#f3e8ff', color: '#9333ea'}}>{c.status}</span>
                </div>
                <h3 style={{fontSize: '1.1rem', marginBottom: 8}}>{c.subject}</h3>
                <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 16}}>{c.description}</p>
                <div className="flex-between" style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>
                  <span>Logged on {c.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentsView() {
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    fetch(API_BASE + '/payments/history').then(r => r.json()).then(setPayments);
  }, []);

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="subtitle">FINANCIAL OVERVIEW</div>
        <h1 style={{marginTop: 8}}>Payments & Billing</h1>
      </div>

      <div className="grid-cols-2" style={{gridTemplateColumns: '1.2fr 1fr'}}>
        <div>
          <div className="balance-card">
            <div style={{opacity: 0.9, marginBottom: 8}}>Current Balance Due</div>
            <div className="amount">$1,420.50</div>
            <div className="flex-between">
              <div>
                <div style={{opacity: 0.8, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 1}}>NEXT DUE DATE</div>
                <div style={{fontWeight: 600, fontSize: '1.1rem'}}>October 15, 2024</div>
              </div>
              <button className="btn-primary" style={{background: 'white', color: 'var(--primary)'}}>
                Pay Full Balance
              </button>
            </div>
          </div>

          <div className="card" style={{background: 'var(--primary-bg)', border: 'none'}}>
            <h3 style={{marginBottom: 24}}>Current Charges</h3>
            <div className="flex-between" style={{marginBottom: 16}}>
              <div>
                <div style={{fontWeight: 600}}>Maintenance Fees</div>
                <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Monthly recurring</div>
              </div>
              <div style={{fontWeight: 700, color: 'var(--primary)'}}>$850.00</div>
            </div>
            <div className="flex-between" style={{marginBottom: 16}}>
              <div>
                <div style={{fontWeight: 600}}>Clubhouse Booking</div>
                <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Sept 12, Event</div>
              </div>
              <div style={{fontWeight: 700, color: 'var(--primary)'}}>$450.00</div>
            </div>
            <div className="flex-between" style={{marginBottom: 24, paddingBottom: 24, borderBottom: '1px dashed rgba(148,51,117,0.2)'}}>
              <div>
                <div style={{fontWeight: 600}}>Late Fee</div>
                <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Aug Overdue</div>
              </div>
              <div style={{fontWeight: 700, color: 'var(--danger)'}}>$120.50</div>
            </div>
            <div className="flex-between">
              <h3 style={{margin: 0}}>Total</h3>
              <h3 style={{margin: 0}}>$1,420.50</h3>
            </div>
          </div>
        </div>

        <div>
          <div className="flex-between" style={{marginBottom: 16}}>
            <h3 style={{margin: 0}}>Saved Methods</h3>
            <a href="#" style={{color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem'}}>Add New</a>
          </div>
          
          <div className="card" style={{display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12}}>
            <div style={{padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: 4}}>💳</div>
            <div style={{flex: 1}}>
              <div style={{fontWeight: 700}}>•••• 4242</div>
              <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Expires 12/26</div>
            </div>
            <span className="badge" style={{background: 'var(--primary-bg)', color: 'var(--primary)'}}>DEFAULT</span>
          </div>
          
          <div className="card" style={{display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32}}>
            <div style={{padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: 4}}>🏦</div>
            <div style={{flex: 1}}>
              <div style={{fontWeight: 700}}>Chase Checking</div>
              <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>•••• 8812</div>
            </div>
          </div>

          <div className="card">
            <div className="flex-between" style={{marginBottom: 24}}>
              <h3 style={{margin: 0}}>Payment History</h3>
              <button className="badge" style={{background: 'var(--primary-bg)', color: 'var(--primary)', border: 'none', padding: '6px 16px'}}>Export PDF</button>
            </div>
            
            <div className="payment-history">
              <table>
                <thead>
                  <tr>
                    <th>DATE</th>
                    <th>REFERENCE</th>
                    <th>STATUS</th>
                    <th>AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.length === 0 ? (
                    <tr>
                      <td colSpan="4" style={{textAlign: 'center', padding: '24px', color: 'var(--text-muted)'}}>No recent transactions found.</td>
                    </tr>
                  ) : payments.map(p => (
                    <tr key={p.id}>
                      <td>{p.date}</td>
                      <td>
                        <div style={{fontWeight: 700, color: 'var(--text-main)'}}>{p.reference}</div>
                        <div style={{fontSize: '0.75rem'}}>{p.reason}</div>
                      </td>
                      <td><span className={"badge " + (p.status === 'Completed' ? 'success' : '')}>● {p.status}</span></td>
                      <td style={{fontWeight: 700}}>${p.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card" style={{marginTop: 32, background: 'var(--primary-bg)', border: 'none', padding: 0, display: 'flex', overflow: 'hidden'}}>
        <div style={{padding: 48, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <h2 style={{fontSize: '2rem', marginBottom: 16}}>Go Paperless. Go Green.</h2>
          <p style={{color: 'var(--text-muted)', marginBottom: 24, maxWidth: '80%'}}>Switch to digital invoicing and help our community reduce its environmental footprint. Paperless residents get a $5 monthly credit on maintenance fees.</p>
          <div>
            <button className="btn-primary">Enable Digital Billing</button>
          </div>
        </div>
        <img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=600&h=400" style={{width: '40%', objectFit: 'cover'}} alt="Green Earth" />
      </div>
    </div>
  );
}

function FacilitiesView() {
  const [facilities, setFacilities] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState('Fitness Center');

  const load = () => {
    fetch(API_BASE + '/facilities').then(r => r.json()).then(setFacilities);
    fetch(API_BASE + '/facilities/bookings').then(r => r.json()).then(setBookings);
  };
  useEffect(() => { load(); }, []);

  const handleBooking = () => {
    fetch(API_BASE + '/facilities/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ facility: selectedFacility, date: 'Oct 24, 2024', time: '02:00 PM' })
    }).then(load);
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1>Amenity Booking</h1>
        <p style={{color: 'var(--text-muted)'}}>Curate your leisure time within the society grounds.</p>
      </div>

      <div className="grid-cols-2" style={{gridTemplateColumns: '1.5fr 1fr'}}>
        <div>
          <div className="flex-between" style={{marginBottom: 24}}>
            <h2 style={{margin: 0}}>Available Amenities</h2>
            <div className="subtitle" style={{margin: 0}}>4 FACILITIES ACTIVE</div>
          </div>

          <div className="amenity-grid">
            <div className="amenity-card">
              <img src={poolImg} className="amenity-img" alt="Pool" />
              <div className="amenity-info">
                <div className="flex-between" style={{marginBottom: 8}}>
                  <h3 style={{margin: 0}}>Swimming Pool</h3>
                  <span className="pill" style={{background: '#fee2e2', color: '#ef4444'}}>Open</span>
                </div>
                <p style={{color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 16}}>Olympic-sized heated pool with dedicated lap lanes and children&apos;s splash zone.</p>
                <div style={{display: 'flex', gap: 16, fontSize: '0.8rem', color: 'var(--text-muted)'}}>
                  <span>⏱ 06:00 - 22:00</span>
                  <span>👥 Max 20</span>
                </div>
              </div>
            </div>
            
            <div className="amenity-card" style={{border: '2px solid var(--primary)'}}>
              <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=500&h=300" className="amenity-img" alt="Gym" />
              <div className="amenity-info">
                <div className="flex-between" style={{marginBottom: 8}}>
                  <h3 style={{margin: 0}}>Fitness Center</h3>
                  <span className="pill" style={{background: 'var(--primary)', color: 'white'}}>Selected</span>
                </div>
                <p style={{color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 16}}>State-of-the-art TechnoGym equipment and a dedicated yoga studio space.</p>
                <div style={{display: 'flex', gap: 16, fontSize: '0.8rem', color: 'var(--text-muted)'}}>
                  <span>⏱ 24/7 Access</span>
                  <span>👥 Max 12</span>
                </div>
              </div>
            </div>

            <div className="amenity-card">
              <img src="https://images.unsplash.com/photo-1510006851064-e6056cd0e3a8?auto=format&fit=crop&q=80&w=500&h=300" className="amenity-img" alt="Clubhouse" />
              <div className="amenity-info">
                <div className="flex-between" style={{marginBottom: 8}}>
                  <h3 style={{margin: 0}}>Clubhouse</h3>
                  <span className="pill" style={{background: 'var(--primary-bg)', color: 'var(--primary)'}}>Available</span>
                </div>
                <p style={{color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 16}}>Perfect for social gatherings, featuring a private bar and multimedia lounge.</p>
                <div style={{display: 'flex', gap: 16, fontSize: '0.8rem', color: 'var(--text-muted)'}}>
                  <span>⏱ 10:00 - 23:00</span>
                  <span>👥 Max 50</span>
                </div>
              </div>
            </div>

            <div className="amenity-card">
              <img src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=500&h=300" className="amenity-img" alt="Tennis" />
              <div className="amenity-info">
                <div className="flex-between" style={{marginBottom: 8}}>
                  <h3 style={{margin: 0}}>Tennis Courts</h3>
                  <span className="pill" style={{background: 'var(--primary-bg)', color: 'var(--primary)'}}>Available</span>
                </div>
                <p style={{color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 16}}>Two championship-grade hard courts with night lighting capabilities.</p>
                <div style={{display: 'flex', gap: 16, fontSize: '0.8rem', color: 'var(--text-muted)'}}>
                  <span>⏱ 07:00 - 21:00</span>
                  <span>👥 Max 4</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-between" style={{marginTop: 48, marginBottom: 24}}>
            <h2 style={{margin: 0}}>My Bookings</h2>
            <a href="#" style={{color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem'}}>View History</a>
          </div>
          
          <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
             {bookings.map(b => (
               <div key={b.id} className="card" style={{display: 'flex', alignItems: 'center', gap: 24}}>
                <div style={{width: 48, height: 48, background: 'var(--primary-bg)', color: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem'}}>{b.icon}</div>
                <div style={{flex: 1}}>
                  <h4 style={{margin: 0, marginBottom: 4}}>{b.facility}</h4>
                  <div style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>{b.date} • {b.time}</div>
                </div>
                <div style={{fontWeight: 600, color: 'var(--text-muted)'}}>{b.status}</div>
               </div>
             ))}
             {bookings.length === 0 && <div className="card">No upcoming bookings.</div>}
          </div>
        </div>

        <div>
          <div className="scheduler">
            <h3 style={{marginBottom: 24}}>Booking Scheduler</h3>
            
            <div className="flex-between" style={{marginBottom: 16}}>
              <div style={{fontWeight: 700}}>October 2024</div>
              <div style={{display: 'flex', gap: 8}}>
                <button style={{padding: '4px 8px'}}>&lt;</button>
                <button style={{padding: '4px 8px'}}>&gt;</button>
              </div>
            </div>
            
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', gap: 8, fontSize: '0.8rem', marginBottom: 8, color: 'var(--text-muted)'}}>
              <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, textAlign: 'center', fontSize: '0.9rem', fontWeight: 500}}>
              <div style={{color: 'var(--text-muted)'}}>29</div>
              <div style={{color: 'var(--text-muted)'}}>30</div>
              <div>1</div><div>2</div><div>3</div>
              <div style={{background: 'var(--primary)', color: 'white', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto'}}>4</div>
              <div>5</div>
              <div>6</div><div>7</div><div>8</div><div>9</div><div>10</div><div>11</div><div>12</div>
            </div>
            
            <div className="subtitle" style={{marginTop: 32, marginBottom: 12}}>AVAILABLE SLOTS</div>
            <div className="time-slots">
              <button className="slot-btn">09:00 AM</button>
              <button className="slot-btn">11:30 AM</button>
              <button className="slot-btn active">02:00 PM</button>
              <button className="slot-btn">04:30 PM</button>
              <button className="slot-btn">06:00 PM</button>
              <button className="slot-btn">08:30 PM</button>
            </div>
            
            <div style={{marginTop: 32, padding: 24, background: 'var(--bg-color)', borderRadius: 'var(--radius-md)'}}>
              <div className="flex-between" style={{marginBottom: 12}}>
                <span style={{color: 'var(--text-muted)'}}>Selected Facility</span>
                <span style={{fontWeight: 700}}>
                   <select style={{border: 'none', background: 'transparent', fontWeight: 700}} value={selectedFacility} onChange={e => setSelectedFacility(e.target.value)}>
                     {facilities.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                   </select>
                </span>
              </div>
              <div className="flex-between" style={{marginBottom: 12}}>
                <span style={{color: 'var(--text-muted)'}}>Date</span>
                <span style={{fontWeight: 700}}>Oct 24, 2024</span>
              </div>
              <div className="flex-between" style={{marginBottom: 24}}>
                <span style={{color: 'var(--text-muted)'}}>Time</span>
                <span style={{fontWeight: 700}}>02:00 PM</span>
              </div>
              <button className="btn-primary" style={{width: '100%', justifyContent: 'center'}} onClick={handleBooking}>Confirm Booking</button>
              <p style={{fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: 16}}>By confirming, you agree to the society amenity usage policies and code of conduct.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <div className="app-container">
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="page-container">
        {currentView === 'dashboard' && <DashboardView setCurrentView={setCurrentView} />}
        {currentView === 'community' && <ServiceHubView />}
        {currentView === 'payments' && <PaymentsView />}
        {currentView === 'facilities' && <FacilitiesView />}
      </main>

      <Footer />
      <Analytics />
    </div>
  );
}
