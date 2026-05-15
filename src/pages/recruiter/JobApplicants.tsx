import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import StatusBadge from '../../components/StatusBadge';
import { APPLICANTS, JOBS, RECRUITER_USER } from '../../data/dummyData';

const TABS = ['All', 'Payment Validated', 'CV Uploaded', 'Shortlisted', 'Rejected'];

export default function JobApplicants() {
  const { id } = useParams();
  const job = JOBS.find(j => j.id === Number(id)) ?? JOBS[0];
  const [activeTab, setActiveTab] = useState('All');
  const [interests, setInterests] = useState<Record<number, string>>({});

  const filtered = APPLICANTS.filter(a =>
    activeTab === 'All' ? true :
    activeTab === 'Payment Validated' ? a.payment === 'Validated' :
    activeTab === 'CV Uploaded' ? a.cvStatus === 'Uploaded' :
    activeTab === 'Shortlisted' ? (interests[a.id] ?? a.interest) === 'Shortlisted' :
    activeTab === 'Rejected' ? (interests[a.id] ?? a.interest) === 'Rejected' :
    true
  );

  const setInterest = (id: number, val: string) => setInterests(prev => ({ ...prev, [id]: val }));

  return (
    <div className="ats-root">
      <Sidebar role="recruiter" />
      <div className="ats-main">
        <TopBar userName={RECRUITER_USER.name} role="Recruiter" />
        <div style={{ padding: '2rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <Link to="/recruiter/my-posts" style={{ fontSize: '0.8rem', color: 'var(--color-ats-accent)', textDecoration: 'none' }}>← My Job Posts</Link>
            <h1 style={{ fontFamily: 'var(--font-manrope)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-ats-text)', margin: '0.5rem 0 0.25rem' }}>
              {job.title}
            </h1>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-ats-muted)', margin: 0 }}>{job.company} · {APPLICANTS.length} Applicants</p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            {TABS.map(t => <button key={t} onClick={() => setActiveTab(t)} className={`ats-tab${activeTab === t ? ' active' : ''}`}>{t}</button>)}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {filtered.map(a => (
              <div key={a.id} className="ats-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                {/* Avatar */}
                <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: 'var(--color-ats-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>{a.name.charAt(0)}</div>
                {/* Info */}
                <div style={{ flex: 1, minWidth: 200 }}>
                  <h3 style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-ats-text)', margin: '0 0 0.25rem' }}>{a.name}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-ats-muted)', margin: '0 0 0.5rem' }}>{a.education} · {a.experience}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                    {a.skills.map(s => <span key={s} style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', border: '1px solid var(--color-ats-border)', borderRadius: '9999px', color: 'var(--color-ats-muted)' }}>{s}</span>)}
                  </div>
                </div>
                {/* Badges */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', alignItems: 'flex-end' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-ats-muted)' }}>Applied {a.appliedOn}</span>
                  <StatusBadge status={a.payment} />
                  <StatusBadge status={a.cvStatus} />
                </div>
                {/* Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                  <Link to="/recruiter/cv-review" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-ats-accent)', textDecoration: 'none', padding: '0.4rem 0.875rem', border: '1px solid var(--color-ats-accent)', borderRadius: '0.375rem' }}>View CV</Link>
                  <select
                    value={interests[a.id] ?? a.interest}
                    onChange={e => setInterest(a.id, e.target.value)}
                    style={{ fontSize: '0.75rem', backgroundColor: 'var(--color-ats-surface)', border: '1px solid var(--color-ats-border)', color: 'var(--color-ats-text)', borderRadius: '0.375rem', padding: '0.375rem 0.625rem', cursor: 'pointer' }}
                  >
                    <option value="—">Set Status</option>
                    <option value="Interested">Mark as Interested</option>
                    <option value="Shortlisted">Shortlist</option>
                    <option value="Rejected">Reject</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
