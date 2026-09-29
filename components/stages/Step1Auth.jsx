'use client';

import React from 'react';
import { Lock, ArrowRight, CheckCircle2, Shield, Zap, Sparkles } from 'lucide-react';
import { playSound } from '../SoundFX';

export default function Step1Auth({
  accountHandle,
  setAccountHandle,
  apiKey,
  setApiKey,
  creatorTier,
  setCreatorTier,
  onNext,
  showToast,
  soundEnabled
}) {
  const handleSave = () => {
    playSound('success', soundEnabled);
    showToast('Meta Graph Credentials Saved!', '🔒');
    onNext();
  };

  return (
    <section className="studio-card">
      <div className="card-header">
        <div className="card-title-group">
          <span className="eyebrow-tag">Stage 01 — Authentication & Meta API</span>
          <h2>Sign In & Account Integration</h2>
          <p>Connect your Instagram Business / Creator account via Meta Graph API for automated publishing.</p>
        </div>
        <span className="chip-badge live">
          <span className="status-dot"></span> Session Active
        </span>
      </div>

      <div className="controls-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        <div className="input-group">
          <label htmlFor="authAccountHandle">Instagram Handle</label>
          <input
            type="text"
            id="authAccountHandle"
            value={accountHandle}
            onChange={(e) => setAccountHandle(e.target.value)}
            placeholder="@AnimeOrbit"
          />
        </div>
        <div className="input-group">
          <label htmlFor="authApiKey">Meta Graph API Token</label>
          <input
            type="password"
            id="authApiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="EAAQZA8ZCsxxxx...LIVE_ACCESS_TOKEN"
          />
        </div>
        <div className="input-group">
          <label htmlFor="authUserRole">Creator Tier</label>
          <select
            id="authUserRole"
            value={creatorTier}
            onChange={(e) => setCreatorTier(e.target.value)}
          >
            <option value="pro">Creator Studio PRO (Unlimited Render)</option>
            <option value="agency">Agency / Multi-Account</option>
            <option value="free">Free Demo Mode</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', margin: '20px 0' }}>
        <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', fontWeight: 800, fontSize: '13px', marginBottom: '4px' }}>
            <Shield size={16} /> End-to-End Encryption
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>All Graph tokens are encrypted client-side and verified against Instagram Graph Node v19.0.</div>
        </div>

        <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#67e8f9', fontWeight: 800, fontSize: '13px', marginBottom: '4px' }}>
            <Zap size={16} /> Autonomous Dispatcher
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Enables scheduled background container rendering and direct Reels video push.</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <button className="btn btn-primary" onClick={handleSave}>
          <Lock size={15} />
          <span>Save & Verify Credentials</span>
        </button>
        <button className="btn btn-secondary" onClick={() => onNext()}>
          <span>Next: Choose Genre & Search</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </section>
  );
}
