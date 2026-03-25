import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Dashboard.module.css';

const STATUS_COLORS = {
  New: { bg: 'rgba(59,130,246,0.15)', color: '#60a5fa' },
  Contacted: { bg: 'rgba(234,179,8,0.15)', color: '#facc15' },
  Qualified: { bg: 'rgba(16,185,129,0.15)', color: '#10B981' },
  Lost: { bg: 'rgba(239,68,68,0.15)', color: '#f87171' },
  Won: { bg: 'rgba(16,185,129,0.25)', color: '#34d399' },
};

const DUMMY_LEADS = [
  { _id: 'd1', 
    name: 'Acme Corp', 
    email: 'ceo@acme.com', 
    company: 'Acme', 
    status: 'Qualified', 
    value: 12000 
  },

  { _id: 'd2', 
    name: 'Globex Inc', 
    email: 'contact@globex.com', 
    company: 'Globex', 
    status: 'Contacted', 
    value: 8500 
  },

  { _id: 'd3', 
    name: 'Initech', 
    email: 'hello@initech.io', 
    company: 'Initech', 
    status: 'New', 
    value: 4200 
  },

  { _id: 'd4', 
    name: 'Umbrella Corp', 
    email: 'biz@umbrella.com', 
    company: 'Umbrella', 
    status: 'Won', 
    value: 31000 
  },

  { _id: 'd5', 
    name: 'Stark Industries', 
    email: 'tony@stark.dev', 
    company: 'Stark', 
    status: 'Lost', 
    value: 0 
  },

];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [leads] = useState(DUMMY_LEADS);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const totalValue = leads.reduce((s, l) => s + (Number(l.value) || 0), 0);
  const wonLeads = leads.filter(l => l.status === 'Won').length;
  const newLeads = leads.filter(l => l.status === 'New').length;

  return (
    <div className={styles.layout}>
     
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarLogo}>
          <span className={styles.logoMark} />
          <span className={styles.logoLabel}>Landing Page</span>
        </div>

        <nav className={styles.nav}>
          <a className={`${styles.navItem} ${styles.navActive}`} href="#">Dashboard</a>
          <a className={styles.navItem} href="#">Team</a>
          <a className={styles.navItem} href="#">Tasks</a>
          <a className={styles.navItem} href="#">Settings</a>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userChip}>
            <div className={styles.avatar}>{user?.name?.[0]?.toUpperCase()}</div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user?.name}</span>
              <span className={styles.userEmail}>{user?.email}</span>
            </div>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />}

     
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <button className={styles.menuBtn} onClick={() => setSidebarOpen(!sidebarOpen)}>
              ☰
            </button>
            <div>
              <h2 className={styles.headerTitle}>Leads Dashboard</h2>
              <p className={styles.headerSub}>
                Welcome, <strong>{user?.name}</strong>
              </p>
            </div>
          </div>

          <button className={styles.addBtn} disabled>
            Add Lead
          </button>
        </header>

      
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Total Leads</span>
            <span className={styles.statValue}>{leads.length}</span>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statLabel}>Pipeline Value</span>
            <span className={styles.statValue}>${totalValue.toLocaleString()}</span>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statLabel}>Deals Won</span>
            <span className={styles.statValue}>{wonLeads}</span>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statLabel}>New Leads</span>
            <span className={styles.statValue}>{newLeads}</span>
          </div>
        </div>

        
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>Status</th>
                <th>Value</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id}>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.company}</td>

                  <td>
                    <span
                      className={styles.badge}
                      style={{
                        background: STATUS_COLORS[lead.status]?.bg,
                        color: STATUS_COLORS[lead.status]?.color,
                      }}
                    >
                      {lead.status}
                    </span>
                  </td>

                  <td>${lead.value.toLocaleString()}</td>

                  <td>
                    <span style={{ opacity: 0.5 }}>Read only</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}