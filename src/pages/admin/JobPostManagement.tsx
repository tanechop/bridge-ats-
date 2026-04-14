import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import Modal from '../../components/Modal';
import { JOBS } from '../../data/dummyData';

const JOB_POSTS = JOBS.map((j, i) => ({
  id: j.id, title: j.title, recruiter: 'Paul T.', company: j.company, posted: j.posted,
  applicants: j.applicants ?? 0, status: i === 5 ? 'Flagged' : i === 6 ? 'Closed' : 'Active',
}));
const TABS = ['All', 'Active', 'Flagged', 'Closed'];

export default function JobPostManagement() {
  const [activeTab, setActiveTab] = useState('All');
  const [statuses, setStatuses] = useState<Record<number, string>>({});
  const [previewPost, setPreviewPost] = useState<typeof JOB_POSTS[0] | null>(null);
  const [confirmRemove, setConfirmRemove] = useState<number | null>(null);

  const getStatus = (p: typeof JOB_POSTS[0]) => statuses[p.id] ?? p.status;
  const filtered = JOB_POSTS.filter(p => activeTab === 'All' || getStatus(p) === activeTab);

  const columns = [
    { key: 'title', label: 'Job Title' },
    { key: 'recruiter', label: 'Recruiter' },
    { key: 'company', label: 'Company' },
    { key: 'posted', label: 'Posted' },
    { key: 'applicants', label: 'Applicants' },
    { key: 'status', label: 'Status', render: (r: typeof JOB_POSTS[0]) => <StatusBadge status={getStatus(r)} /> },
    {
      key: 'actions', label: 'Actions', render: (r: typeof JOB_POSTS[0]) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={e => { e.stopPropagation(); setPreviewPost(r); }} style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-ats-accent)', background: 'none', border: 'none', cursor: 'pointer' }}>View</button>
          <button onClick={e => { e.stopPropagation(); setStatuses(prev => ({ ...prev, [r.id]: getStatus(r) === 'Flagged' ? 'Active' : 'Flagged' })); }} style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-ats-warning)', background: 'none', border: 'none', cursor: 'pointer' }}>
            {getStatus(r) === 'Flagged' ? 'Unflag' : 'Flag'}
          </button>
          <button onClick={e => { e.stopPropagation(); setConfirmRemove(r.id); }} style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-ats-danger)', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
        </div>
      ),
    },
  ];

  return (
    <div className="ats-root">
      <Sidebar role="admin" />
      <div className="ats-main">
        <TopBar userName="Admin" role="Admin" />
        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h1 style={{ fontFamily: 'var(--font-manrope)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-ats-text)', margin: 0 }}>Job Post Management</h1>
            <div style={{ display: 'flex', gap: '0.5rem' }}>{TABS.map(t => <button key={t} onClick={() => setActiveTab(t)} className={`ats-tab${activeTab === t ? ' active' : ''}`}>{t}</button>)}</div>
          </div>
          <div className="ats-card" style={{ padding: 0, overflow: 'hidden' }}>
            <DataTable columns={columns} data={filtered} />
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <Modal open={!!previewPost} onClose={() => setPreviewPost(null)} title="Job Post Preview">
        {previewPost && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            <h2 style={{ fontFamily: 'var(--font-manrope)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-ats-text)', margin: 0 }}>{previewPost.title}</h2>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', fontSize: '0.875rem', color: 'var(--color-ats-muted)' }}>
              <span>Recruiter: {previewPost.recruiter}</span><span>·</span>
              <span>Company: {previewPost.company}</span><span>·</span>
              <span>Applicants: {previewPost.applicants}</span>
            </div>
            <StatusBadge status={getStatus(previewPost)} />
          </div>
        )}
      </Modal>

      {/* Remove Confirm */}
      <Modal open={confirmRemove !== null} onClose={() => setConfirmRemove(null)} title="Confirm Removal">
        <p style={{ color: 'var(--color-ats-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Are you sure you want to remove this job post? This action cannot be undone.</p>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="ats-btn-ghost" style={{ flex: 1 }} onClick={() => setConfirmRemove(null)}>Cancel</button>
          <button className="ats-btn-primary" style={{ flex: 1, background: 'var(--color-ats-danger)' }} onClick={() => { if (confirmRemove) setStatuses(prev => ({ ...prev, [confirmRemove]: 'Removed' })); setConfirmRemove(null); }}>Remove</button>
        </div>
      </Modal>
    </div>
  );
}
