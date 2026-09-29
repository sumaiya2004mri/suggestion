'use client';

import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, BarChart3, TrendingUp, Users, Share2, Sparkles, PlusCircle } from 'lucide-react';
import { playSound } from '../SoundFX';

export default function Step10Analytics({
  selectedAnime,
  caption,
  hashtags,
  accountHandle,
  onSaveCampaign,
  soundEnabled
}) {
  const [likes, setLikes] = useState(4820);
  const [isLiked, setIsLiked] = useState(false);
  const [saves, setSaves] = useState(1280);
  const [isSaved, setIsSaved] = useState(false);
  const [activeMetric, setActiveMetric] = useState('reach');

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    playSound('click', soundEnabled);
  };

  const toggleSave = () => {
    setIsSaved(!isSaved);
    setSaves((prev) => (isSaved ? prev - 1 : prev + 1));
    playSound('click', soundEnabled);
  };

  // Mock Performance Data points for 24h graph
  const reachData = [450, 1200, 3100, 6800, 12400, 19800, 28400, 39600, 48200];
  const engagementData = [42, 110, 290, 620, 1150, 1800, 2600, 3700, 4820];
  const shareData = [12, 34, 95, 210, 480, 790, 1100, 1580, 2100];

  const currentDataset = activeMetric === 'reach' ? reachData : activeMetric === 'engagement' ? engagementData : shareData;
  const maxVal = Math.max(...currentDataset);

  return (
    <section className="studio-card">
      <div className="card-header">
        <div className="card-title-group">
          <span className="eyebrow-tag">Stage 10 — Production Live & Real-Time Telemetry</span>
          <h2>Live Post & Real-Time Performance Analytics</h2>
          <p>Meta Graph API webhook telemetry simulates real engagement, reach velocity, and saves.</p>
        </div>
        <span className="chip-badge live">
          <span className="status-dot"></span> Live on Instagram
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', alignItems: 'start' }}>
        {/* Left: Instagram Mobile Post Simulator */}
        <div className="insta-post-card">
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="user-avatar" style={{ width: '30px', height: '30px', fontSize: '11px' }}>AO</div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800 }}>{accountHandle}</div>
                <div style={{ fontSize: '10px', color: '#94a3b8' }}>Original audio • Sponsored</div>
              </div>
            </div>
            <button className="btn btn-secondary btn-sm" style={{ padding: '2px 8px', fontSize: '11px' }}>
              Follow
            </button>
          </div>

          <div style={{ width: '100%', height: '340px', position: 'relative', background: '#0a0d1e' }}>
            <img
              src={selectedAnime.images?.jpg?.large_image_url || selectedAnime.images?.jpg?.image_url}
              alt={selectedAnime.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'rgba(0,0,0,0.7)', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 800 }}>
              ⭐ {selectedAnime.score || 8.8} / 10
            </div>
          </div>

          <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <button
                onClick={toggleLike}
                style={{ background: 'none', border: 0, cursor: 'pointer', color: isLiked ? '#ff3366' : '#fff' }}
              >
                <Heart size={24} fill={isLiked ? '#ff3366' : 'none'} />
              </button>
              <button style={{ background: 'none', border: 0, cursor: 'pointer', color: '#fff' }}>
                <MessageCircle size={24} />
              </button>
              <button style={{ background: 'none', border: 0, cursor: 'pointer', color: '#fff' }}>
                <Send size={24} />
              </button>
            </div>
            <button
              onClick={toggleSave}
              style={{ background: 'none', border: 0, cursor: 'pointer', color: isSaved ? '#fbbf24' : '#fff' }}
            >
              <Bookmark size={24} fill={isSaved ? '#fbbf24' : 'none'} />
            </button>
          </div>

          <div style={{ padding: '0 16px 16px', fontSize: '13px' }}>
            <div style={{ fontWeight: 800, marginBottom: '6px' }}>
              {likes.toLocaleString()} likes • {saves.toLocaleString()} saves
            </div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.4, fontSize: '12px' }}>
              <strong>{accountHandle}</strong> {caption?.slice(0, 120)}...
            </p>
            <div style={{ marginTop: '6px', color: 'var(--cyan-bright)', fontSize: '11px' }}>
              {hashtags?.slice(0, 50)}...
            </div>
          </div>
        </div>

        {/* Right: Analytics & Interactive Charts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            <div
              style={{
                background: activeMetric === 'reach' ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${activeMetric === 'reach' ? 'var(--violet)' : 'var(--border)'}`,
                padding: '14px',
                borderRadius: '12px',
                cursor: 'pointer'
              }}
              onClick={() => setActiveMetric('reach')}
            >
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Total Reach</div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text)' }}>48.2K</div>
              <div style={{ fontSize: '10px', color: '#34d399' }}>+142% vs avg</div>
            </div>

            <div
              style={{
                background: activeMetric === 'engagement' ? 'rgba(6,182,212,0.2)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${activeMetric === 'engagement' ? 'var(--cyan-bright)' : 'var(--border)'}`,
                padding: '14px',
                borderRadius: '12px',
                cursor: 'pointer'
              }}
              onClick={() => setActiveMetric('engagement')}
            >
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Engagements</div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text)' }}>4,820</div>
              <div style={{ fontSize: '10px', color: '#34d399' }}>9.98% Rate</div>
            </div>

            <div
              style={{
                background: activeMetric === 'shares' ? 'rgba(236,72,153,0.2)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${activeMetric === 'shares' ? 'var(--pink)' : 'var(--border)'}`,
                padding: '14px',
                borderRadius: '12px',
                cursor: 'pointer'
              }}
              onClick={() => setActiveMetric('shares')}
            >
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>DM Shares</div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text)' }}>2,100</div>
              <div style={{ fontSize: '10px', color: '#fbbf24' }}>Viral Spike</div>
            </div>
          </div>

          {/* Dynamic SVG Visualizer Graph */}
          <div style={{ background: '#090d20', padding: '18px', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <TrendingUp size={14} color="var(--cyan-bright)" />
                24-Hour Real-Time Telemetry Curve
              </div>
              <span className="chip-badge purple" style={{ fontSize: '10px' }}>
                {activeMetric.toUpperCase()} METRIC
              </span>
            </div>

            {/* SVG Line Chart */}
            <div style={{ width: '100%', height: '140px', position: 'relative' }}>
              <svg viewBox="0 0 400 120" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <defs>
                  <linearGradient id="curveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid horizontal lines */}
                <line x1="0" y1="30" x2="400" y2="30" stroke="rgba(255,255,255,0.05)" />
                <line x1="0" y1="70" x2="400" y2="70" stroke="rgba(255,255,255,0.05)" />
                <line x1="0" y1="110" x2="400" y2="110" stroke="rgba(255,255,255,0.05)" />

                {/* Path Area */}
                {(() => {
                  const pts = currentDataset.map((val, idx) => {
                    const x = (idx / (currentDataset.length - 1)) * 400;
                    const y = 110 - (val / maxVal) * 90;
                    return { x, y };
                  });
                  const pathStr = pts.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '');
                  const areaStr = `${pathStr} L 400 110 L 0 110 Z`;

                  return (
                    <>
                      <path d={areaStr} fill="url(#curveGrad)" />
                      <path d={pathStr} fill="none" stroke="#22d3ee" strokeWidth="3" />
                      {pts.map((p, i) => (
                        <circle key={i} cx={p.x} cy={p.y} r="4" fill="#ffffff" stroke="#8b5cf6" strokeWidth="2" />
                      ))}
                    </>
                  );
                })()}
              </svg>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--muted)', marginTop: '8px' }}>
              <span>0h (Publish)</span>
              <span>6h</span>
              <span>12h</span>
              <span>18h</span>
              <span>24h Peak</span>
            </div>
          </div>

          <button className="btn btn-primary" onClick={onSaveCampaign}>
            <PlusCircle size={15} />
            <span>Save Campaign to Portfolio</span>
          </button>
        </div>
      </div>
    </section>
  );
}
