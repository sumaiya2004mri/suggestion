'use client';

import React from 'react';
import { Target, Sparkles, Check, ArrowRight, Zap, Flame } from 'lucide-react';
import { playSound } from '../SoundFX';

export default function Step4Select({
  selectedAnime,
  campaignTone,
  setCampaignTone,
  campaignGoal,
  setCampaignGoal,
  onNext,
  showToast,
  soundEnabled
}) {
  const handleProceed = () => {
    playSound('success', soundEnabled);
    showToast(`Campaign strategy bound for ${selectedAnime.title}!`, '🎯');
    onNext();
  };

  return (
    <section className="studio-card">
      <div className="card-header">
        <div className="card-title-group">
          <span className="eyebrow-tag">Stage 04 — Campaign Strategy Binding</span>
          <h2>Bind Target & Audience Persona</h2>
          <p>Configure audience engagement angles and marketing tone for the AI Video and Copywriting generators.</p>
        </div>
        <span className="chip-badge purple">
          <Sparkles size={13} /> Strategy Engine
        </span>
      </div>

      <div className="controls-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        <div className="input-group">
          <label htmlFor="campaignToneSelect">Viral Copy Tone</label>
          <select
            id="campaignToneSelect"
            value={campaignTone}
            onChange={(e) => setCampaignTone(e.target.value)}
          >
            <option value="hype">🔥 High Hype / Shounen Energy</option>
            <option value="dramatic">🎭 Deep Emotional / Masterpiece Hook</option>
            <option value="mystery">💀 Dark Mystery / Plot Twist Warning</option>
            <option value="underrated">💎 Hidden Gem / Underrated Discovery</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="campaignGoalSelect">Primary CTA Objective</label>
          <select
            id="campaignGoalSelect"
            value={campaignGoal}
            onChange={(e) => setCampaignGoal(e.target.value)}
          >
            <option value="saves">📥 Maximize Reel Saves & Bookmarks</option>
            <option value="comments">💬 Drive Debate / Comment Argument</option>
            <option value="shares">🚀 Viral Share to Direct Messages</option>
            <option value="follows">👤 Follow Account for Weekly Anime Drops</option>
          </select>
        </div>
      </div>

      <div style={{ padding: '18px', background: 'rgba(139, 92, 246, 0.08)', borderRadius: '16px', border: '1px solid var(--border-bright)', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c4b5fd', fontWeight: 800, fontSize: '14px', marginBottom: '8px' }}>
          <Target size={16} /> Autonomous AI Strategy Matrix
        </div>
        <div style={{ fontSize: '12px', color: '#e2e8f0', lineHeight: 1.5 }}>
          The studio will generate a 4-scene video script tailored for <strong style={{ color: 'var(--cyan-bright)' }}>{selectedAnime.title}</strong>, featuring a dynamic hook banner, animated synopsis quote, rating badge, and clear call-to-action overlay.
        </div>
      </div>

      <button className="btn btn-primary" onClick={handleProceed}>
        <span>Launch 9:16 Reel Motion Studio</span>
        <ArrowRight size={15} />
      </button>
    </section>
  );
}
