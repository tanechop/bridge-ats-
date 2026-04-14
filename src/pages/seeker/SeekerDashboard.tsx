import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import { JobCard } from '../../components/JobCard';
import { JOBS, SEEKER_USER } from '../../data/dummyData';

const FILTER_PILLS = ['All', 'Jobs', 'Internships', 'Recent', 'Recommended'];

export default function SeekerDashboard() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = JOBS.filter(j => {
    if (activeFilter === 'Jobs') return j.type !== 'Internship';
    if (activeFilter === 'Internships') return j.type === 'Internship';
    return true;
  }).filter(j => j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="ats-root">
      <Sidebar role="seeker" />
      <div className="ats-main">
        <TopBar userName={SEEKER_USER.name} role="Job Seeker" searchPlaceholder="Search jobs…" onSearch={setSearch} />

        <div style={{ padding: '2rem' }}>
          {/* Profile Snapshot */}
          <div className="ats-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: 'var(--color-ats-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
              {SEEKER_USER.name.charAt(0)}
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-ats-text)', margin: 0 }}>{SEEKER_USER.name}</h2>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, backgroundColor: 'rgba(59,130,246,0.1)', color: 'var(--color-ats-accent)', padding: '0.2rem 0.5rem', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Job Seeker</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-ats-muted)', margin: 0 }}>{SEEKER_USER.title} · {SEEKER_USER.city}</p>
            </div>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-ats-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>CV Status</div>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: SEEKER_USER.cvUploaded ? 'var(--color-ats-success)' : 'var(--color-ats-warning)' }}>
                  {SEEKER_USER.cvUploaded ? 'Uploaded ✅' : 'Not Uploaded ⚠️'}
                </span>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-ats-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.375rem' }}>Profile {SEEKER_USER.profileCompletion}%</div>
                <div style={{ width: 120, height: 6, backgroundColor: 'var(--color-ats-border)', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: `${SEEKER_USER.profileCompletion}%`, height: '100%', backgroundColor: 'var(--color-ats-accent)', borderRadius: '9999px' }} />
                </div>
              </div>
            </div>
            <Link to="/seeker/profile" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-ats-accent)', textDecoration: 'none', whiteSpace: 'nowrap' }}>View Profile →</Link>
          </div>

          {/* Job Feed */}
          <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-ats-text)', margin: 0 }}>Available Opportunities</h2>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {FILTER_PILLS.map(f => (
                <button key={f} onClick={() => setActiveFilter(f)} className={`ats-tab${activeFilter === f ? ' active' : ''}`}>{f}</button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {filtered.map((job: any) => <JobCard key={job.id} job={job} />)}
          </div>

          {filtered.length === 0 && (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-ats-muted)' }}>No opportunities match your search.</div>
          )}
        </div>
      </div>
    </div>
  );
}
