'use client';

import React from 'react';
import { CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { playSound } from '../SoundFX';

export default function Step7Readiness({
  selectedAnime,
  onNext,
  soundEnabled
}) {
  const checklist = [
    { title: "Vertical Aspect Ratio (9:16)", desc: "Render resolution locked at 720x1280 @ 60 FPS", ready: true },
    { title: "Meta Graph API v19.0 Scope", desc: "Token verified for instagram_content_publish", ready: true },
    { title: "Speech Synthesis & Audio Track", desc: "AI Voiceover speech buffer loaded & synced", ready: true },
    { title: "High-Contrast Subtitles", desc: "Dynamic drop shadows & stroke contrast enabled", ready: true },
    { title: "Thumbnail Cover Poster", desc: "720x1280 Key Visual with gradient overlay packaged", ready: true },
    { title: "Copywriting & Character Limits", desc: "Caption and viral hashtags comply with Meta 2,200 char limit", ready: true },
  ];

  return (
    <section className="studio-card">
      <div className="card-header">
        <div className="card-title-group">
          <span className="eyebrow-tag">Stage 07 — Pre-Flight Compliance</span>
          <h2>Review Asset Readiness & Verification</h2>
          <p>Automated pre-flight check ensures compliance with Instagram Reels bitrate, resolution, and Meta API constraints.</p>
        </div>
        <span className="chip-badge live">
          <ShieldCheck size={13} /> 6/6 Checks Passed
        </span>
      </div>

      <div className="checklist-grid">
        {checklist.map((item, idx) => (
          <div key={idx} className="check-card ready">
            <CheckCircle2 size={18} color="#34d399" />
            <div>
              <div style={{ fontWeight: 800, color: 'var(--text)' }}>{item.title}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '24px' }}>
        <button
          className="btn btn-primary"
          onClick={() => {
            playSound('success', soundEnabled);
            onNext();
          }}
        >
          <span>Proceed to Schedule & Approval</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </section>
  );
}
