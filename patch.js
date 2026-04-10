import fs from 'fs';

let content = fs.readFileSync('src/App.jsx', 'utf8');

content = content.replace(
  `import React, { useState } from 'react';`,
  `import React, { useState, useEffect } from 'react';\nconst API_BASE = 'http://localhost:3001/api';`
);

// DashboardView
content = content.replace(
  `function DashboardView({ setCurrentView }) {`,
  `function DashboardView({ setCurrentView }) {
  const [data, setData] = useState({ announcements: [], dues: { amount: 0, invoiceNumber: '', dueDate: '' } });
  useEffect(() => {
    Promise.all([
      fetch(API_BASE + '/dashboard/announcements').then(r => r.json()),
      fetch(API_BASE + '/dashboard/dues').then(r => r.json())
    ]).then(([announcements, dues]) => setData({ announcements, dues }));
  }, []);
  const announcements = data.announcements || [];
  const dues = data.dues || {};
`
);

content = content.replace(
  `<h2 style={{fontSize: '2rem', marginBottom: 8}}>$450.00</h2>`,
  `<h2 style={{fontSize: '2rem', marginBottom: 8}}>\${dues.amount ? dues.amount.toFixed(2) : '0.00'}</h2>`
);
content = content.replace(
  `<p style={{color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 16}}>Invoice #SC-2024-108 • Due by Oct 30</p>`,
  `<p style={{color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 16}}>Invoice #{dues.invoiceNumber} • Due by {dues.dueDate}</p>`
);

content = content.replace(
  `          <div className="card" style={{padding: 0, overflow: 'hidden', marginBottom: 16}}>
            <div style={{display: 'flex'}}>
              <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=400&h=250" style={{width: '50%', objectFit: 'cover'}} alt="Lobby" />
              <div style={{padding: 24}}>
                <h3 style={{marginBottom: 8}}>Clubhouse Renovation & Expansion</h3>
                <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Starting next Monday, the main clubhouse will undergo a 3-week rejuvenation project.</p>
              </div>
            </div>
          </div>
          
          <div className="grid-cols-2" style={{gap: 16}}>
            <div className="card" style={{background: 'var(--primary-bg)', border: 'none'}}>
              <div style={{fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8}}>2 HOURS AGO</div>
              <h4 style={{marginBottom: 8}}>Scheduled Water Maintenance</h4>
              <p style={{color: 'var(--text-muted)', fontSize: '0.8rem'}}>Routine pipe cleaning for Wing A & B between 2 PM and 4 PM today.</p>
            </div>
            <div className="card" style={{background: '#f4f4f5', border: 'none'}}>
              <div style={{fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8}}>YESTERDAY</div>
              <h4 style={{marginBottom: 8}}>New Security Protocols</h4>
              <p style={{color: 'var(--text-muted)', fontSize: '0.8rem'}}>All guest entries will require a digital QR code generated via the app.</p>
            </div>
          </div>`,
  `          {announcements.length > 0 && (
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
          </div>`
);

// ServiceHubView
content = content.replace(
  `function ServiceHubView() {`,
  `function ServiceHubView() {
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
`
);

content = content.replace(
  `<button className="btn-primary">Lodge Complaint &rarr;</button>`,
  `<button className="btn-primary" onClick={handleSubmit}>Lodge Complaint &rarr;</button>`
);

content = content.replace(
  `          <div className="grid-cols-2" style={{gap: 16}}>
            <div className="form-group">
              <label>Category</label>
              <select className="form-control">
                <option>Maintenance & Repairs</option>
                <option>Security</option>
                <option>Sanitation</option>
              </select>
            </div>
            <div className="form-group">
              <label>Urgency</label>
              <div style={{display: 'flex', gap: 8}}>
                <button className="form-control" style={{background: 'var(--primary)', color: 'white'}}>Standard</button>
                <button className="form-control">Urgent</button>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Subject</label>
            <input type="text" className="form-control" placeholder="Brief summary of the issue" />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea className="form-control" placeholder="Provide as much detail as possible to expedite resolution..."></textarea>
          </div>`,
  `          <div className="grid-cols-2" style={{gap: 16}}>
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
          </div>`
);

content = content.replace(
  `<span className="badge" style={{background: 'var(--primary-bg)', color: 'var(--primary)'}}>0 OPEN</span>`,
  `<span className="badge" style={{background: 'var(--primary-bg)', color: 'var(--primary)'}}>{complaints.length} OPEN</span>`
);

content = content.replace(
  `<div className="complaint-card" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No active complaints.
            </div>`,
  `{complaints.length === 0 ? (
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
            ))}`
);

// PaymentsView
content = content.replace(
  `function PaymentsView() {`,
  `function PaymentsView() {
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    fetch(API_BASE + '/payments/history').then(r => r.json()).then(setPayments);
  }, []);
`
);

content = content.replace(
  `                  <tr>
                    <td colSpan="4" style={{textAlign: 'center', padding: '24px', color: 'var(--text-muted)'}}>No recent transactions found.</td>
                  </tr>`,
  `                  {payments.length === 0 ? (
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
                      <td style={{fontWeight: 700}}>\${p.amount.toFixed(2)}</td>
                    </tr>
                  ))}`
);

// FacilitiesView
content = content.replace(
  `function FacilitiesView() {`,
  `function FacilitiesView() {
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
`
);

content = content.replace(
  `<button className="btn-primary" style={{width: '100%', justifyContent: 'center'}}>Confirm Booking</button>`,
  `<button className="btn-primary" style={{width: '100%', justifyContent: 'center'}} onClick={handleBooking}>Confirm Booking</button>`
);

content = content.replace(
  `<div className="flex-between" style={{marginBottom: 12}}>
                <span style={{color: 'var(--text-muted)'}}>Selected Facility</span>
                <span style={{fontWeight: 700}}>Fitness Center</span>
              </div>`,
  `<div className="flex-between" style={{marginBottom: 12}}>
                <span style={{color: 'var(--text-muted)'}}>Selected Facility</span>
                <span style={{fontWeight: 700}}>
                   <select style={{border: 'none', background: 'transparent', fontWeight: 700}} value={selectedFacility} onChange={e => setSelectedFacility(e.target.value)}>
                     {facilities.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                   </select>
                </span>
              </div>`
);

content = content.replace(
  `          <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
            <div className="card" style={{display: 'flex', alignItems: 'center', gap: 24}}>
              <div style={{width: 48, height: 48, background: 'var(--primary-bg)', color: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem'}}>🏋️</div>
              <div style={{flex: 1}}>
                <h4 style={{margin: 0, marginBottom: 4}}>Fitness Center Session</h4>
                <div style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>Today • 18:00 - 19:30</div>
              </div>
              <div style={{display: 'flex', gap: 16}}>
                <button style={{color: 'var(--primary)', fontWeight: 600}}>Reschedule</button>
                <button style={{color: 'var(--danger)', fontWeight: 600}}>Cancel</button>
              </div>
            </div>
            
            <div className="card" style={{display: 'flex', alignItems: 'center', gap: 24, opacity: 0.7}}>
              <div style={{width: 48, height: 48, background: '#f4f4f5', color: 'var(--text-muted)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem'}}>🏊</div>
              <div style={{flex: 1}}>
                <h4 style={{margin: 0, marginBottom: 4}}>Swimming Pool</h4>
                <div style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>Tomorrow • 08:00 - 09:00</div>
              </div>
              <div style={{fontWeight: 600, color: 'var(--text-muted)'}}>Confirmed</div>
            </div>
          </div>`,
  `          <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
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
          </div>`
);


fs.writeFileSync('src/App.jsx', content);
console.log('App.jsx updated exactly with JS script.');
