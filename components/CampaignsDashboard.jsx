'use client';

import React from 'react';
import { Film, Plus, Download, Trash2, ArrowUpRight, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import { playSound } from './SoundFX';

export default function CampaignsDashboard({
  campaigns,
  onSelectCampaign,
  onNewCampaign,
  onDeleteCampaign,
  showToast,
  soundEnabled
}) {
  const exportAllCampaigns = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(campaigns, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `anime_campaigns_export_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    playSound('success', soundEnabled);
    showToast('Exported all campaign bundles as JSON!', '📁');
  };

  return (
    <section className="studio-card">
      <div className="card-header">
        <div className="card-title-group">
          <span className="eyebrow-tag">Portfolio & Queue Manager</span>
          <h2>All Anime Marketing Campaigns</h2>
          <p>Manage, review, export, and monitor active and queued promotional campaigns.</p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary btn-sm" onClick={exportAllCampaigns}>
            <Download size={14} />
            <span>Export JSON Bundle</span>
          </button>
          <button className="btn btn-primary btn-sm" onClick={onNewCampaign}>
            <Plus size={14} />
            <span>New Campaign</span>
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '18px' }}>
        {campaigns.map((camp) => {
          const anime = camp.anime;
          return (
            <div
              key={camp.id}
              style={{
                background: 'rgba(12, 16, 34, 0.9)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'var(--transition)'
              }}
            >
              <div style={{ display: 'flex', gap: '14px', padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <img
                  src={anime.images?.jpg?.image_url || anime.images?.jpg?.large_image_url}
                  alt={anime.title}
                  style={{ width: '60px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span className={`chip-badge ${camp.status === 'live' ? 'live' : 'cyan'}`} style={{ fontSize: '10px', padding: '2px 8px', marginBottom: '4px' }}>
                    {camp.status === 'live' ? '● Published Live' : '● Queued'}
                  </span>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: '4px 0' }}>
                    {anime.title}
                  </h4>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                    ⭐ {anime.score || 8.8} • Created {new Date(camp.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', flex: 1 }}>
                <div style={{ color: '#cbd5e1' }}>
                  <strong style={{ color: 'var(--cyan-bright)' }}>Hook:</strong> {camp.hookText?.slice(0, 70)}...
                </div>
                <div style={{ color: 'var(--muted)', fontSize: '11px' }}>
                  Reach: {camp.metrics?.reach?.toLocaleString() || '48,200'} • Engagement: {camp.metrics?.engagement?.toLocaleString() || '4,820'}
                </div>
              </div>

              <div style={{ padding: '12px 16px', background: 'rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => onSelectCampaign(camp)}
                >
                  <ArrowUpRight size={13} /> Open in Studio
                </button>
                <button
                  style={{ background: 'transparent', border: 0, color: 'var(--muted)', cursor: 'pointer', padding: 4 }}
                  onClick={() => onDeleteCampaign(camp.id)}
                  title="Delete Campaign"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
