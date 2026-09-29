'use client';

import React, { useState } from 'react';
import { Calendar, Clock, Send, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { playSound } from '../SoundFX';

export default function Step8Schedule({
  scheduleDate,
  setScheduleDate,
  scheduleTime,
  setScheduleTime,
  publishMode,
  setPublishMode,
  onDispatchWorker,
  soundEnabled
}) {
  return (
    <section className="studio-card">
      <div className="card-header">
        <div className="card-title-group">
          <span className="eyebrow-tag">Stage 08 — Scheduling & Queue Dispatch</span>
          <h2>Approve & Schedule Live Drop</h2>
          <p>Choose between immediate live background publishing or queued publishing during peak engagement hours.</p>
        </div>
        <span className="chip-badge cyan">
          <Clock size={13} /> Peak Slot: 6:00 PM - 9:00 PM
        </span>
      </div>

      <div className="controls-grid">
        <div className="input-group">
          <label htmlFor="publishModeSelect">Publishing Mode</label>
          <select
            id="publishModeSelect"
            value={publishMode}
            onChange={(e) => setPublishMode(e.target.value)}
          >
            <option value="immediate">🚀 Immediate Background Render & Publish</option>
            <option value="scheduled">📅 Queue for Scheduled Peak Slot</option>
          </select>
        </div>

        {publishMode === 'scheduled' && (
          <>
            <div className="input-group">
              <label htmlFor="schedDate">Scheduled Date</label>
              <input
                type="date"
                id="schedDate"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="schedTime">Scheduled Time</label>
              <input
                type="time"
                id="schedTime"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
              />
            </div>
          </>
        )}
      </div>

      <div style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '14px', border: '1px solid var(--border)', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24', fontWeight: 800, fontSize: '13px', marginBottom: '4px' }}>
          <Sparkles size={15} /> AI Audience Timing Recommendation
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
          Anime communities show a +38% higher engagement velocity and share-to-DM rate between 18:00 and 21:30 local creator time.
        </p>
      </div>

      <button
        className="btn btn-primary"
        onClick={() => {
          playSound('success', soundEnabled);
          onDispatchWorker();
        }}
      >
        <Zap size={15} />
        <span>Dispatch Autonomous Background Worker</span>
      </button>
    </section>
  );
}
