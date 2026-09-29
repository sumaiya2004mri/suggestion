'use client';

import React from 'react';
import { playSound } from './SoundFX';

export const PIPELINE_STEPS = [
  { id: 1, title: "Sign In & Connect", desc: "Meta OAuth & Credentials" },
  { id: 2, title: "Genre & Search", desc: "MAL Query Taxonomy" },
  { id: 3, title: "Research & Verify", desc: "MAL ID & License Check" },
  { id: 4, title: "Select Target Anime", desc: "Bind Active Campaign" },
  { id: 5, title: "Generate 9:16 Video", desc: "Dynamic Reel & Voiceover" },
  { id: 6, title: "Generate Copy & Cover", desc: "Caption, Tags & Thumbnail" },
  { id: 7, title: "Review Asset Readiness", desc: "Compliance & Checks" },
  { id: 8, title: "Approve & Schedule", desc: "Optimal Slot & Timezone" },
  { id: 9, title: "Background Worker", desc: "Rendering & Meta Publish" },
  { id: 10, title: "Live Post & Analytics", desc: "Reach, Engagement & Graph" },
];

export default function Sidebar({
  currentStep,
  setCurrentStep,
  completedSteps,
  selectedAnime,
  soundEnabled
}) {
  const handleStepClick = (stepId) => {
    setCurrentStep(stepId);
    playSound('tab', soundEnabled);
  };

  return (
    <aside className="pipeline-sidebar">
      <div className="pipeline-header">
        <h3>Workflow Steps</h3>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--cyan-bright)' }}>
          Step {currentStep}/10
        </span>
      </div>

      <nav className="pipeline-steps">
        {PIPELINE_STEPS.map((step) => {
          const isActive = currentStep === step.id;
          const isCompleted = completedSteps.includes(step.id);
          return (
            <button
              key={step.id}
              className={`pipeline-step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              onClick={() => handleStepClick(step.id)}
            >
              <span className="step-badge-num">
                {isCompleted && !isActive ? '✓' : String(step.id).padStart(2, '0')}
              </span>
              <div className="pipeline-step-text">
                <strong>{step.title}</strong>
                <small>{step.desc}</small>
              </div>
            </button>
          );
        })}
      </nav>

      {selectedAnime && (
        <div className="sidebar-target-card">
          <div className="pipeline-header">
            <h3>Active Target</h3>
            <span className="chip-badge live" style={{ padding: '2px 8px', fontSize: '10px' }}>
              Selected
            </span>
          </div>
          <div className="mini-target-box">
            <img
              src={selectedAnime.images?.jpg?.image_url || selectedAnime.images?.jpg?.large_image_url}
              alt={selectedAnime.title}
              className="mini-target-thumb"
            />
            <div className="mini-target-meta">
              <h5>{selectedAnime.title}</h5>
              <span>⭐ {selectedAnime.score || '9.0'} • {selectedAnime.genres?.[0]?.name || 'Anime'}</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
