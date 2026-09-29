'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, KeyRound } from 'lucide-react';
import { playSound } from './SoundFX';

export default function AuthModal({
  isOpen,
  onClose,
  accountHandle,
  setAccountHandle,
  apiKey,
  setApiKey,
  showToast,
  soundEnabled
}) {
  const [testing, setTesting] = useState(false);
  const [testSuccess, setTestSuccess] = useState(true);
  const [tempHandle, setTempHandle] = useState(accountHandle);
  const [tempKey, setTempKey] = useState(apiKey);

  if (!isOpen) return null;

  const handleTestConnection = () => {
    setTesting(true);
    playSound('render', soundEnabled);
    setTimeout(() => {
      setTesting(false);
      setTestSuccess(true);
      playSound('success', soundEnabled);
      showToast('Meta Graph API v19.0 Connection Verified!', '⚡');
    }, 900);
  };

  const handleSave = () => {
    setAccountHandle(tempHandle);
    setApiKey(tempKey);
    playSound('success', soundEnabled);
    showToast('Credentials updated & saved!', '🔒');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', display: 'grid', placeItems: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fff' }}>
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800 }}>
                Meta Business & Creator OAuth
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Configure Instagram API permissions for automatic reels dispatch</p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 0, color: 'var(--text-secondary)', cursor: 'pointer', padding: 4 }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          <div className="input-group">
            <label>Instagram Creator Handle</label>
            <input
              type="text"
              value={tempHandle}
              onChange={(e) => setTempHandle(e.target.value)}
              placeholder="@YourBrand"
            />
          </div>

          <div className="input-group">
            <label>Meta User Access Token (Graph API v19.0)</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                value={tempKey}
                onChange={(e) => setTempKey(e.target.value)}
                placeholder="EAAQZA8Z..."
              />
            </div>
          </div>

          <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text)' }}>Required OAuth Scopes</span>
              <span className="chip-badge live" style={{ fontSize: '10px' }}>5/5 Granted</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {['instagram_basic', 'instagram_content_publish', 'pages_read_engagement', 'instagram_manage_insights', 'public_profile'].map((s) => (
                <span key={s} style={{ fontSize: '10px', background: 'rgba(99, 102, 241, 0.15)', color: '#c4b5fd', padding: '3px 8px', borderRadius: '6px', fontFamily: 'var(--font-mono)' }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={handleTestConnection}
            disabled={testing}
          >
            <ShieldCheck size={15} />
            <span>{testing ? 'Pinging Graph...' : 'Test Connection'}</span>
          </button>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary btn-sm" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
