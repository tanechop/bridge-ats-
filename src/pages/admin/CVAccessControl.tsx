import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import StatusBadge from '../../components/StatusBadge';
import { CV_ACCESS_REQUESTS } from '../../data/dummyData';

export default function CVAccessControl() {
  const [requests, setRequests] = useState(CV_ACCESS_REQUESTS);
  const [log, setLog] = useState<Array<{ id: number; action: string; recruiter: string; candidate: string; date: string }>>([
    { id: 1, action: 'Granted', recruiter: 'BrandCo Talent', candidate: 'Amara Diallo', date: 'Jan 21, 2025' },
    { id: 2, action: 'Denied', recruiter: 'Paul Tremblay', candidate: 'Marie Cam', date: 'Jan 17, 2025' },
  ]);

  const handle = (id: number, action: 'Granted' | 'Denied') => {
    const req = requests.find(r => r.id === id);
    if (req) {
      setRequests(prev => prev.map(r => r.id === id ? { ...r, status: action } : r));
      setLog(prev => [{ id: Date.now(), action, recruiter: req.recruiter, candidate: req.candidate, date: 'Today' }, ...prev]);
    }
  };

  const pending = requests.filter(r => r.status === 'Pending');

  return (
    <div className="ats-root">
      <Sidebar role="admin" />
      <div className="ats-main">
        <TopBar userName="Admin" role="Admin" />
        <div style={{ padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
          {/* Access Requests */}
          <div>
            <h1 style={{ fontFamily: 'var(--font-manrope)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-ats-text)', marginBottom: '1.25rem' }}>Access Requests</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {pending.length === 0 && <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-ats-muted)' }}>No pending requests.</div>}
              {pending.map(r => (
                <div key={r.id} className="ats-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--color-ats-text)', fontSize: '0.9rem' }}>{r.recruiter}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-ats-muted)' }}>{r.company}</div>
                    </div>
                    <StatusBadge status={r.status} />
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-ats-muted)' }}>
                    Requesting access to <strong style={{ color: 'var(--color-ats-text)' }}>{r.candidate}</strong>'s contact details for <strong style={{ color: 'var(--color-ats-text)' }}>{r.job}</strong>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-ats-muted)' }}>Interest marked: {r.dateInterest}</div>
                  <div style={{ display: 'flex', gap: '0.625rem' }}>
                    <button className="ats-btn-primary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem', background: 'linear-gradient(135deg, #059669, #10B981)' }} onClick={() => handle(r.id, 'Granted')}>Grant Access</button>
                    <button style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem', backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: 'var(--color-ats-danger)', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }} onClick={() => handle(r.id, 'Denied')}>Deny</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Access Log */}
          <div>
            <h1 style={{ fontFamily: 'var(--font-manrope)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-ats-text)', marginBottom: '1.25rem' }}>Access Log</h1>
            <div className="ats-card" style={{ padding: 0, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--color-ats-border)' }}>
                    {['Recruiter', 'Candidate', 'Action', 'Date'].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-ats-muted)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {log.map(l => (
                    <tr key={l.id} style={{ borderBottom: '1px solid var(--color-ats-border)' }}>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ats-text)' }}>{l.recruiter}</td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ats-text)' }}>{l.candidate}</td>
                      <td style={{ padding: '0.75rem 1rem' }}><StatusBadge status={l.action} /></td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ats-muted)' }}>{l.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
