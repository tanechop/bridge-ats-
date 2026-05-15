import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Briefcase, CalendarDays } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import PaymentModal from '../../components/PaymentModal';
import StatusBadge from '../../components/StatusBadge';
import { JOBS, SEEKER_USER } from '../../data/dummyData';

const TABS = ['Description', 'Requirements', 'Responsibilities'];

export default function JobDetail() {
  const { id } = useParams();
  const job = JOBS.find(j => j.id === Number(id)) ?? JOBS[0];
  const [activeTab, setActiveTab] = useState('Description');
  const [payOpen, setPayOpen] = useState(false);
  const [applied, setApplied] = useState(false);

  const tabContent: Record<string, React.ReactNode> = {
    Description: <p style={{ lineHeight: 1.8, color: 'var(--color-ats-muted)', fontSize: '0.9rem' }}>{job.description}</p>,
    Requirements: <ul style={{ paddingLeft: '1.25rem', color: 'var(--color-ats-muted)', fontSize: '0.9rem', lineHeight: 2 }}>{job.requirements.map((r, i) => <li key={i}>{r}</li>)}</ul>,
    Responsibilities: <ul style={{ paddingLeft: '1.25rem', color: 'var(--color-ats-muted)', fontSize: '0.9rem', lineHeight: 2 }}>{job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}</ul>,
  };

  return (
    <div className="ats-root">
      <Sidebar role="seeker" />
      <div className="ats-main">
        <TopBar userName={SEEKER_USER.name} role="Job Seeker" />
        <div style={{ padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', alignItems: 'start' }}>
          {/* Left */}
          <div>
            {/* Breadcrumb */}
            <div style={{ fontSize: '0.8rem', color: 'var(--color-ats-muted)', marginBottom: '1.5rem' }}>
              <Link to="/seeker/dashboard" style={{ color: 'var(--color-ats-accent)', textDecoration: 'none' }}>Dashboard</Link>
              <span style={{ margin: '0 0.5rem' }}>›</span>
              <Link to="/seeker/jobs" style={{ color: 'var(--color-ats-accent)', textDecoration: 'none' }}>Browse Jobs</Link>
              <span style={{ margin: '0 0.5rem' }}>›</span>
              {job.title}
            </div>

            {/* Header */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ width: 56, height: 56, borderRadius: '0.75rem', backgroundColor: 'var(--color-ats-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Briefcase size={24} style={{ color: 'var(--color-ats-accent)' }} />
              </div>
              <h1 style={{ fontFamily: 'var(--font-manrope)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-ats-text)', marginBottom: '0.5rem' }}>{job.title}</h1>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-ats-muted)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}><Briefcase size={14} /> {job.company}</span>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-ats-muted)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}><MapPin size={14} /> {job.location}</span>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-ats-muted)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}><Clock size={14} /> {job.posted}</span>
                <StatusBadge status={job.type} />
                <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--color-ats-accent)', backgroundColor: 'rgba(59,130,246,0.1)', padding: '0.25rem 0.625rem', borderRadius: '9999px' }}>{job.sector}</span>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '0.25rem', borderBottom: '1px solid var(--color-ats-border)', marginBottom: '1.5rem' }}>
              {TABS.map(t => (
                <button key={t} onClick={() => setActiveTab(t)} style={{ padding: '0.625rem 1rem', border: 'none', cursor: 'pointer', backgroundColor: 'transparent', fontWeight: activeTab === t ? 700 : 400, color: activeTab === t ? 'var(--color-ats-accent)' : 'var(--color-ats-muted)', borderBottom: `2px solid ${activeTab === t ? 'var(--color-ats-accent)' : 'transparent'}`, marginBottom: -1, fontSize: '0.875rem', transition: 'color 0.15s' }}>
                  {t}
                </button>
              ))}
            </div>
            <div className="ats-card" style={{ marginBottom: '1.5rem' }}>{tabContent[activeTab]}</div>

            {/* Skills */}
            <div>
              <h3 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-ats-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>Required Skills</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {job.skills.map(s => <span key={s} style={{ padding: '0.3rem 0.75rem', borderRadius: '9999px', border: '1px solid var(--color-ats-border)', fontSize: '0.8rem', color: 'var(--color-ats-text)' }}>{s}</span>)}
              </div>
            </div>
          </div>

          {/* Right — Sticky Apply Panel */}
          <div className="ats-card" style={{ position: 'sticky', top: 80, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontFamily: 'var(--font-manrope)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-ats-text)', margin: 0 }}>{job.title}</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-ats-muted)', margin: 0 }}>{job.company} · {job.location}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--color-ats-border)' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-ats-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Salary</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-ats-text)' }}>{job.salary}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-ats-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Deadline</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-ats-text)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <CalendarDays size={14} /> {job.deadline}
                </div>
              </div>
            </div>
            {applied ? (
              <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'rgba(16,185,129,0.08)', borderRadius: '0.5rem', border: '1px solid rgba(16,185,129,0.3)' }}>
                <span style={{ fontWeight: 700, color: 'var(--color-ats-success)', fontSize: '0.875rem' }}>Applied ✅</span>
              </div>
            ) : (
              <>
                <button className="ats-btn-primary" style={{ width: '100%', padding: '0.875rem', fontSize: '0.9rem' }} onClick={() => setPayOpen(true)}>
                  Apply for this Position
                </button>
                <p style={{ fontSize: '0.72rem', color: 'var(--color-ats-muted)', textAlign: 'center', margin: 0 }}>
                  Payment required to submit your application
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <PaymentModal
        open={payOpen}
        onClose={() => { setPayOpen(false); setApplied(true); }}
        jobTitle={job.title}
      />
    </div>
  );
}
