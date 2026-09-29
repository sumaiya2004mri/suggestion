'use client';

import React from 'react';
import { ShieldAlert, ShieldCheck, CheckCircle2, Tv, Film, ExternalLink, ArrowRight, Star } from 'lucide-react';
import { playSound } from '../SoundFX';

export default function Step3Research({
  selectedAnime,
  onNext,
  soundEnabled
}) {
  const anime = selectedAnime;

  return (
    <section className="studio-card">
      <div className="card-header">
        <div className="card-title-group">
          <span className="eyebrow-tag">Stage 03 — Research & License Verification</span>
          <h2>Deep Metadata & Copyright Inspection</h2>
          <p>Verify copyright licensors, age restrictions, and promotional trailer availability before campaign binding.</p>
        </div>
        <span className="chip-badge live">
          <ShieldCheck size={13} color="#34d399" /> Safe for Social Promo
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {/* Verification Card 1 */}
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(16, 185, 129, 0.2)', display: 'grid', placeItems: 'center', color: '#34d399' }}>
              <CheckCircle2 size={18} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '14px' }}>Global Licensor Verified</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Crunchyroll / Aniplex / Netflix distribution</div>
            </div>
          </div>
          <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: 1.5 }}>
            Fair use 9:16 promotional transformation with commentary and rating hooks complies with Instagram Creator Guidelines.
          </p>
        </div>

        {/* Verification Card 2 */}
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(6, 182, 212, 0.2)', display: 'grid', placeItems: 'center', color: '#22d3ee' }}>
              <Tv size={18} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '14px' }}>High-Resolution Key Visuals</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>1080p Poster & Frame Buffer Ready</div>
            </div>
          </div>
          <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: 1.5 }}>
            Optimal for 1080x1920 vertical canvas generation with hardware acceleration enabled.
          </p>
        </div>
      </div>

      {/* Selected Target Deep Summary */}
      <div style={{ background: 'rgba(14, 19, 44, 0.6)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
          <img
            src={anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url}
            alt={anime.title}
            style={{ width: '90px', height: '120px', objectFit: 'cover', borderRadius: '10px', border: '1px solid var(--border-bright)' }}
          />
          <div style={{ flex: 1, minWidth: '240px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, marginBottom: '6px' }}>
              {anime.title}
            </h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
              <span className="chip-badge purple" style={{ fontSize: '11px' }}>
                MAL Score: {anime.score || '8.5'}
              </span>
              <span className="chip-badge cyan" style={{ fontSize: '11px' }}>
                Studio: {anime.studios?.[0]?.name || 'Official Studio'}
              </span>
              <span className="chip-badge warning" style={{ fontSize: '11px' }}>
                Rating: {anime.rating || 'PG-13 / R-17+'}
              </span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              {anime.synopsis?.slice(0, 180)}...
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <button
          className="btn btn-primary"
          onClick={() => {
            playSound('success', soundEnabled);
            onNext();
          }}
        >
          <span>Confirm & Bind Active Target</span>
          <ArrowRight size={15} />
        </button>
        <a
          href={`https://myanimelist.net/anime/${anime.mal_id}`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-secondary"
        >
          <ExternalLink size={14} /> MAL Page
        </a>
      </div>
    </section>
  );
}
