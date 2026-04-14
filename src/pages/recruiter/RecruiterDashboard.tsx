import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import KPICard from '../../components/KPICard';
import StatusBadge from '../../components/StatusBadge';
import { JOBS, APPLICANTS, RECRUITER_USER } from '../../data/dummyData';

const RECENT_POSTS = JOBS.slice(0, 4).map((j, i) => ({
  ...j, postedDate: j.posted, applicants: j.applicants ?? 0, status: i === 3 ? 'Closed' : 'Active',
}));

export default function RecruiterDashboard() {
  return (
    <div className="ats-root">
      <Sidebar role="recruiter" />
      <div className="ats-main">
        <TopBar userName={RECRUITER_USER.name} role="Recruiter" />
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          {/* KPI Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            <KPICard label="Active Job Posts" value={4} accent="var(--color-ats-success)" />
            <KPICard label="Total Applicants" value={37} />
            <KPICard label="CVs to Review" value={12} accent="var(--color-ats-warning)" />
            <KPICard label="Positions Filled" value={2} accent="var(--color-ats-accent)" />
          </div>

          {/* Recent Posts */}
          <div className="ats-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-ats-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontFamily: 'var(--font-manrope)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-ats-text)', margin: 0 }}>My Recent Posts</h2>
              <Link to="/recruiter/my-posts" style={{ fontSize: '0.8rem', color: 'var(--color-ats-accent)', textDecoration: 'none', fontWeight: 600 }}>View All →</Link>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-ats-border)' }}>
                  {['Job Title', 'Type', 'Posted', 'Applicants', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-ats-muted)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECENT_POSTS.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid var(--color-ats-border)' }}>
                    <td style={{ padding: '0.875rem 1rem', fontWeight: 600, color: 'var(--color-ats-text)' }}>{p.title}</td>
                    <td style={{ padding: '0.875rem 1rem', color: 'var(--color-ats-muted)' }}>{p.type}</td>
                    <td style={{ padding: '0.875rem 1rem', color: 'var(--color-ats-muted)' }}>{p.posted}</td>
                    <td style={{ padding: '0.875rem 1rem', color: 'var(--color-ats-text)', fontWeight: 600 }}>{p.applicants}</td>
                    <td style={{ padding: '0.875rem 1rem' }}><StatusBadge status={p.status} /></td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Link to={`/recruiter/my-posts/${p.id}/applicants`} style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-ats-accent)', textDecoration: 'none' }}>View</Link>
                        <span style={{ color: 'var(--color-ats-border)' }}>·</span>
                        <button style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-ats-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>Close</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recent Applicants */}
          <div className="ats-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-ats-border)' }}>
              <h2 style={{ fontFamily: 'var(--font-manrope)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-ats-text)', margin: 0 }}>Recent Applicants</h2>
            </div>
            <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {APPLICANTS.slice(0, 5).map(a => (
                <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: 'var(--color-ats-surface)' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: 'var(--color-ats-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>{a.name.charAt(0)}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-ats-text)' }}>{a.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-ats-muted)' }}>{a.jobTitle}</div>
                  </div>
                  <StatusBadge status={a.payment} />
                  <StatusBadge status={a.cvStatus} />
                  <Link to="/recruiter/cv-review" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-ats-accent)', textDecoration: 'none' }}>View CV</Link>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Link to="/recruiter/post-job" style={{ textDecoration: 'none' }}>
              <div className="ats-card" style={{ textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.15s' }} onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-ats-accent)')} onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-ats-border)')}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>+</div>
                <div style={{ fontWeight: 700, color: 'var(--color-ats-text)', fontSize: '0.9rem' }}>Post a New Job</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-ats-muted)', marginTop: '0.25rem' }}>Create a new open position</div>
              </div>
            </Link>
            <Link to="/recruiter/cv-review" style={{ textDecoration: 'none' }}>
              <div className="ats-card" style={{ textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.15s' }} onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-ats-accent)')} onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-ats-border)')}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📄</div>
                <div style={{ fontWeight: 700, color: 'var(--color-ats-text)', fontSize: '0.9rem' }}>Review Pending CVs</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-ats-muted)', marginTop: '0.25rem' }}>12 CVs awaiting review</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
