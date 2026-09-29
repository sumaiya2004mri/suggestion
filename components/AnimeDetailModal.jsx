'use client';

import React from 'react';
import { X, Star, Calendar, Tv, Sparkles, Check, ExternalLink } from 'lucide-react';
import { playSound } from './SoundFX';

export default function AnimeDetailModal({
  anime,
  isOpen,
  onClose,
  onSelectAndContinue,
  soundEnabled
}) {
  if (!isOpen || !anime) return null;

  const trailerId = anime.trailer?.youtube_id;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ width: 'min(720px, 100%)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <span className="eyebrow-tag">MAL #{anime.mal_id} • Jikan Verified</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 900, marginTop: 4 }}>
              {anime.title}
            </h2>
            {anime.title_japanese && (
              <p style={{ fontSize: '13px', color: 'var(--cyan-bright)' }}>{anime.title_japanese}</p>
            )}
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 0, color: 'var(--text-secondary)', cursor: 'pointer', padding: 4 }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Video Trailer or Poster */}
        <div style={{ width: '100%', height: '280px', borderRadius: '14px', overflow: 'hidden', background: '#000', marginBottom: '18px', position: 'relative' }}>
          {trailerId ? (
            <iframe
              src={`https://www.youtube.com/embed/${trailerId}?autoplay=0&enablejsapi=1`}
              title={`${anime.title} Trailer`}
              style={{ width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img
              src={anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url}
              alt={anime.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
        </div>

        {/* Metadata Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px', marginBottom: '16px' }}>
          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '10px', borderRadius: '10px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Score & Rank</div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#fbbf24', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Star size={14} fill="#fbbf24" /> {anime.score || 'N/A'} <span style={{ fontSize: '11px', color: 'var(--muted)' }}>(#{anime.rank || '—'})</span>
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '10px', borderRadius: '10px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Episodes / Status</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text)' }}>
              {anime.episodes || '?'} eps • {anime.status?.replace('Finished Airing', 'Completed') || 'Airing'}
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '10px', borderRadius: '10px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Studio / Licensor</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#67e8f9' }}>
              {anime.studios?.[0]?.name || 'Studio'} / {anime.licensors?.[0]?.name || 'Global'}
            </div>
          </div>
        </div>

        {/* Synopsis */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '6px', letterSpacing: '0.05em' }}>
            Synopsis & Plot Hook
          </h4>
          <p style={{ fontSize: '13px', color: '#e2e8f0', lineHeight: 1.6, maxHeight: '120px', overflowY: 'auto' }}>
            {anime.synopsis || 'No synopsis provided.'}
          </p>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
          <a
            href={`https://myanimelist.net/anime/${anime.mal_id}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary btn-sm"
          >
            <ExternalLink size={14} /> View on MAL
          </a>

          <button
            className="btn btn-primary"
            onClick={() => {
              playSound('success', soundEnabled);
              onSelectAndContinue(anime);
              onClose();
            }}
          >
            <Check size={16} />
            <span>Select Target & Proceed</span>
          </button>
        </div>
      </div>
    </div>
  );
}
