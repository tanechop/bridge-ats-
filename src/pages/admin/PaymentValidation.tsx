import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import StatusBadge from '../../components/StatusBadge';
import { PAYMENTS } from '../../data/dummyData';

const TABS = ['Pending', 'Validated', 'Rejected'];

export default function PaymentValidation() {
  const [activeTab, setActiveTab] = useState('Pending');
  const [statuses, setStatuses] = useState<Record<number, string>>({});
  const [rejectInputs, setRejectInputs] = useState<Record<number, string>>({});
  const [rejectOpen, setRejectOpen] = useState<Record<number, boolean>>({});

  const getStatus = (p: typeof PAYMENTS[0]) => statuses[p.id] ?? p.status;
  const filtered = PAYMENTS.filter(p => getStatus(p) === activeTab);

  const validate = (id: number) => setStatuses(prev => ({ ...prev, [id]: 'Validated' }));
  const reject = (id: number) => { setStatuses(prev => ({ ...prev, [id]: 'Rejected' })); setRejectOpen(prev => ({ ...prev, [id]: false })); };

  return (
    <div className="ats-root">
      <Sidebar role="admin" />
      <div className="ats-main">
        <TopBar userName="Admin" role="Admin" />
        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h1 style={{ fontFamily: 'var(--font-manrope)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-ats-text)', margin: 0 }}>Payment Validation</h1>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {TABS.map(t => <button key={t} onClick={() => setActiveTab(t)} className={`ats-tab${activeTab === t ? ' active' : ''}`}>{t} ({PAYMENTS.filter(p => (statuses[p.id] ?? p.status) === t).length})</button>)}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filtered.length === 0 && <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-ats-muted)' }}>No payments in this category.</div>}
            {filtered.map(p => (
              <div key={p.id} className="ats-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: 'var(--color-ats-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                      {p.applicant.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-ats-text)' }}>{p.applicant}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-ats-muted)' }}>{p.job} — {p.company}</div>
                    </div>
                  </div>
                  <StatusBadge status={getStatus(p)} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-ats-border)' }}>
                  {[{ label: 'Method', v: p.method }, { label: 'Amount', v: p.amount }, { label: 'Reference', v: p.ref }, { label: 'Submitted', v: p.submittedAt }].map(({ label, v }) => (
                    <div key={label}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--color-ats-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>{label}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--color-ats-text)', fontFamily: label === 'Reference' ? 'monospace' : 'inherit', fontWeight: label === 'Amount' ? 700 : 400 }}>{v}</div>
                    </div>
                  ))}
                </div>

                {/* Proof Thumbnail */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                  <div style={{ width: 64, height: 64, backgroundColor: 'var(--color-ats-surface)', border: '1px solid var(--color-ats-border)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, fontSize: '1.5rem' }} title="View payment proof">🖼️</div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-ats-muted)' }}>Payment proof uploaded (click to view full size)</span>
                </div>

                {/* Actions */}
                {getStatus(p) === 'Pending' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button className="ats-btn-primary" style={{ background: 'linear-gradient(135deg, #059669, #10B981)', flex: 1, padding: '0.625rem' }} onClick={() => validate(p.id)}>✅ Validate</button>
                      <button style={{ flex: 1, padding: '0.625rem', backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: 'var(--color-ats-danger)', borderRadius: '0.5rem', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer' }} onClick={() => setRejectOpen(prev => ({ ...prev, [p.id]: !prev[p.id] }))}>❌ Reject</button>
                    </div>
                    {rejectOpen[p.id] && (
                      <div style={{ display: 'flex', gap: '0.625rem' }}>
                        <input className="ats-input" style={{ flex: 1 }} placeholder="Reason for rejection…" value={rejectInputs[p.id] ?? ''} onChange={e => setRejectInputs(prev => ({ ...prev, [p.id]: e.target.value }))} />
                        <button className="ats-btn-primary" style={{ background: 'var(--color-ats-danger)', padding: '0 1rem' }} onClick={() => reject(p.id)}>Confirm</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
