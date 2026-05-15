import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import StatusBadge from '../../components/StatusBadge';
import { APPLICANTS, RECRUITER_USER } from '../../data/dummyData';

export default function CVReview() {
  const [selected, setSelected] = useState(APPLICANTS[0]);
  const [statuses, setStatuses] = useState<Record<number, string>>({});
  const [saved, setSaved] = useState<Record<number, boolean>>({});

  const save = (id: number) => { setSaved(prev => ({ ...prev, [id]: true })); setTimeout(() => setSaved(prev => ({ ...prev, [id]: false })), 2000); };

  return (
    <div className="ats-root">
      <Sidebar role="recruiter" />
      <div className="ats-main">
        <TopBar userName={RECRUITER_USER.name} role="Recruiter" />
        <div style={{ display: 'flex', height: 'calc(100vh - 57px)', overflow: 'hidden' }}>
          {/* Left Queue */}
          <div style={{ width: 300, flexShrink: 0, borderRight: '1px solid var(--color-ats-border)', overflowY: 'auto', padding: '1rem' }}>
            <h2 style={{ fontFamily: 'var(--font-manrope)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-ats-text)', margin: '0 0 1rem' }}>CV Queue</h2>
            {APPLICANTS.map(a => (
              <button key={a.id} onClick={() => setSelected(a)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', backgroundColor: selected.id === a.id ? 'rgba(59,130,246,0.1)' : 'transparent', textAlign: 'left', marginBottom: '0.375rem', transition: 'background-color 0.15s' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: 'var(--color-ats-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>{a.name.charAt(0)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--color-ats-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-ats-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.jobTitle}</div>
                  <div style={{ marginTop: '0.25rem' }}><StatusBadge status={a.cvStatus} /></div>
                </div>
              </button>
            ))}
          </div>

          {/* Right CV Viewer */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Top bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-manrope)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-ats-text)', margin: '0 0 0.25rem' }}>{selected.name}</h2>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-ats-muted)', margin: 0 }}>Applied for: {selected.jobTitle}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <select
                  value={statuses[selected.id] ?? selected.interest}
                  onChange={e => setStatuses(prev => ({ ...prev, [selected.id]: e.target.value }))}
                  className="ats-input"
                  style={{ width: 'auto', cursor: 'pointer' }}
                >
                  <option value="—">Set Status</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Interested">Interested</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <button className="ats-btn-primary" style={{ padding: '0.625rem 1rem', fontSize: '0.8rem' }} onClick={() => save(selected.id)}>
                  {saved[selected.id] ? '✅ Saved' : 'Save Status'}
                </button>
              </div>
            </div>

            {/* CV Placeholder Viewer */}
            <div style={{ flex: 1, backgroundColor: 'var(--color-ats-surface)', border: '1px solid var(--color-ats-border)', borderRadius: '0.75rem', minHeight: 480, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ fontSize: '4rem' }}>📄</div>
              <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--color-ats-text)' }}>{selected.name} — CV</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-ats-muted)' }}>PDF Viewer (file available after admin validation)</div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="ats-btn-ghost" style={{ flex: 1 }} disabled title="Contact details revealed after admin approval">
                Contact Applicant 🔒
              </button>
              <button className="ats-btn-primary" style={{ flex: 1 }}>Download CV</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
