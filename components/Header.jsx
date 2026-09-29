'use client';

import React from 'react';
import { Volume2, VolumeX, Sparkles, Layers, BarChart3, Film } from 'lucide-react';
import { playSound } from './SoundFX';

export default function Header({
  accountHandle,
  activeView,
  setActiveView,
  soundEnabled,
  setSoundEnabled,
  openAuthModal,
  campaignCount = 1
}) {
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) playSound('click', true);
  };

  return (
    <header>
      <div className="container header-inner">
        <div className="brand" onClick={() => setActiveView('pipeline')}>
          <div className="brand-logo">
            <Sparkles size={22} />
          </div>
          <div className="brand-text">
            <h1>
              Anime Promo Engine{' '}
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '6px',
                  background: 'var(--violet)',
                  color: 'white',
                  verticalAlign: 'middle',
                  WebkitTextFillColor: 'initial',
                }}
              >
                PRO v2.4
              </span>
            </h1>
            <p>Autonomous AI Production Engine: Discovery ➔ Video Reel ➔ Publishing ➔ Analytics</p>
          </div>
        </div>

        {/* View switcher tabs */}
        <div className="header-nav">
          <button
            className={`nav-tab-btn ${activeView === 'pipeline' ? 'active' : ''}`}
            onClick={() => {
              setActiveView('pipeline');
              playSound('tab', soundEnabled);
            }}
          >
            <Layers size={15} />
            Pipeline Wizard
          </button>
          <button
            className={`nav-tab-btn ${activeView === 'campaigns' ? 'active' : ''}`}
            onClick={() => {
              setActiveView('campaigns');
              playSound('tab', soundEnabled);
            }}
          >
            <Film size={15} />
            Campaigns ({campaignCount})
          </button>
        </div>

        <div className="header-user-status">
          <button
            className="user-profile-badge"
            id="btnAuthModal"
            onClick={() => {
              openAuthModal();
              playSound('click', soundEnabled);
            }}
            title="Meta Graph API Settings"
          >
            <div className="user-avatar">AO</div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 800 }}>{accountHandle}</div>
              <div style={{ fontSize: '10px', color: '#34d399' }}>● Meta Graph Connected</div>
            </div>
          </button>

          <button
            className="btn btn-secondary btn-sm"
            onClick={toggleSound}
            title="Toggle Synthesizer Sound FX"
          >
            {soundEnabled ? (
              <>
                <Volume2 size={14} color="#22d3ee" />
                <span>Sound ON</span>
              </>
            ) : (
              <>
                <VolumeX size={14} color="#64748b" />
                <span>Sound OFF</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
