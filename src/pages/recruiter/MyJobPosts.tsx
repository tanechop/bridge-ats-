import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import StatusBadge from '../../components/StatusBadge';
import { JOBS, RECRUITER_USER } from '../../data/dummyData';

const ALL_POSTS = JOBS.slice(0, 6).map((j, i) => ({ ...j, status: i === 5 ? 'Closed' : i === 4 ? 'Draft' : 'Active', applicants: j.applicants ?? 0 }));
const TABS = ['All', 'Active', 'Closed', 'Draft'];

export default function MyJobPosts() {
  const [activeTab, setActiveTab] = useState('All');
  const filtered = ALL_POSTS.filter(p => activeTab === 'All' || p.status === activeTab);

  return (
    <div className="ats-root">
      <Sidebar role="recruiter" />
      <div className="ats-main">
        <TopBar userName={RECRUITER_USER.name} role="Recruiter" />
        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h1 style={{ fontFamily: 'var(--font-manrope)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-ats-text)', margin: 0 }}>My Job Posts</h1>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {TABS.map(t => <button key={t} onClick={() => setActiveTab(t)} className={`ats-tab${activeTab === t ? ' active' : ''}`}>{t}</button>)}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1rem' }}>
            {filtered.map(p => (
              <div key={p.id} className="ats-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <h3 style={{ fontFamily: 'var(--font-manrope)', fontWeight: 700, fontSize: '0.9375rem', color: 'var(--color-ats-text)', margin: 0 }}>{p.title}</h3>
                  <StatusBadge status={p.status} />
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', fontSize: '0.8rem', color: 'var(--color-ats-muted)' }}>
                  <span>{p.type}</span>
                  <span>·</span>
                  <span>Posted: {p.posted}</span>
                  <span>·</span>
                  <span>Deadline: {p.deadline}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.625rem', borderTop: '1px solid var(--color-ats-border)' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-ats-text)', fontWeight: 600 }}>{p.applicants} Applicants</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link to={`/recruiter/my-posts/${p.id}/applicants`} className="ats-btn-primary" style={{ textDecoration: 'none', padding: '0.4rem 0.875rem', fontSize: '0.8rem', display: 'inline-block', borderRadius: '0.5rem' }}>
                      View Applicants
                    </Link>
                    <button className="ats-btn-ghost" style={{ padding: '0.4rem 0.875rem', fontSize: '0.8rem' }}>Edit / Close</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
