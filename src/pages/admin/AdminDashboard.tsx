import React from 'react';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import KPICard from '../../components/KPICard';
import { ADMIN_STATS, ACTIVITY_FEED, MONTHLY_REGISTRATIONS } from '../../data/dummyData';

const MAX_REGISTRATIONS = Math.max(...MONTHLY_REGISTRATIONS.map(m => m.seekers + m.recruiters));

export default function AdminDashboard() {
  return (
    <div className="ats-root">
      <Sidebar role="admin" />
      <div className="ats-main">
        <TopBar userName="Admin" role="Admin" />
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          {/* KPI Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem' }}>
            <KPICard label="Total Users" value={ADMIN_STATS.totalUsers} />
            <KPICard label="Job Seekers" value={ADMIN_STATS.jobSeekers} accent="var(--color-ats-accent)" />
            <KPICard label="Recruiters" value={ADMIN_STATS.recruiters} accent="var(--color-ats-purple)" />
            <KPICard label="Pending Payments" value={ADMIN_STATS.pendingPayments} accent="var(--color-ats-warning)" />
            <KPICard label="Pending CV Reviews" value={ADMIN_STATS.pendingCVReviews} accent="var(--color-ats-warning)" />
            <KPICard label="Active Job Posts" value={ADMIN_STATS.activeJobPosts} accent="var(--color-ats-success)" />
          </div>

          {/* Charts Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
            {/* Bar Chart */}
            <div className="ats-card">
              <h2 style={{ fontFamily: 'var(--font-manrope)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-ats-text)', marginBottom: '1.5rem' }}>Registrations per Month</h2>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem', height: 160 }}>
                {MONTHLY_REGISTRATIONS.map(m => {
                  const total = m.seekers + m.recruiters;
                  return (
                    <div key={m.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem' }}>
                      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: 130 }}>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                          <div style={{ width: '60%', height: `${(m.recruiters / MAX_REGISTRATIONS) * 120}px`, backgroundColor: 'var(--color-ats-purple)', borderRadius: '2px 2px 0 0', minHeight: 4 }} />
                          <div style={{ width: '60%', height: `${(m.seekers / MAX_REGISTRATIONS) * 120}px`, backgroundColor: 'var(--color-ats-accent)', borderRadius: '0 0 2px 2px', minHeight: 4 }} />
                        </div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-ats-text)', marginTop: '0.375rem' }}>{total}</div>
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--color-ats-muted)', fontWeight: 600 }}>{m.month}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.875rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.72rem', color: 'var(--color-ats-muted)' }}><span style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: 'var(--color-ats-accent)', display: 'inline-block' }} />Seekers</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.72rem', color: 'var(--color-ats-muted)' }}><span style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: 'var(--color-ats-purple)', display: 'inline-block' }} />Recruiters</div>
              </div>
            </div>
            {/* Pie Chart */}
            <div className="ats-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-manrope)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-ats-text)', margin: 0 }}>User Breakdown</h2>
              <div style={{ width: 110, height: 110, borderRadius: '50%', background: `conic-gradient(var(--color-ats-accent) 0% 69%, var(--color-ats-purple) 69% 91%, var(--color-ats-warning) 91% 100%)`, boxShadow: '0 0 0 12px var(--color-ats-card)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
                {[{ label: 'Job Seekers', pct: '69%', color: 'var(--color-ats-accent)' }, { label: 'Recruiters', pct: '22%', color: 'var(--color-ats-purple)' }, { label: 'Admins', pct: '9%', color: 'var(--color-ats-warning)' }].map(i => (
                  <div key={i.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-ats-muted)' }}><span style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: i.color, display: 'inline-block', flexShrink: 0 }} />{i.label}</div>
                    <span style={{ fontWeight: 700, color: 'var(--color-ats-text)' }}>{i.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="ats-card">
            <h2 style={{ fontFamily: 'var(--font-manrope)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-ats-text)', marginBottom: '1rem' }}>Recent Activity</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {ACTIVITY_FEED.map(a => (
                <div key={a.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.625rem 0', borderBottom: '1px solid var(--color-ats-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--color-ats-accent)', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-ats-text)' }}>{a.text}</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-ats-muted)', flexShrink: 0, marginLeft: '1rem' }}>{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
