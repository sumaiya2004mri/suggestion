'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Copy, Download, Sparkles, ArrowRight, Check, Image as ImageIcon } from 'lucide-react';
import { playSound } from '../SoundFX';

export default function Step6CopyCover({
  selectedAnime,
  caption,
  setCaption,
  hashtags,
  setHashtags,
  coverBadge,
  setCoverBadge,
  onNext,
  showToast,
  soundEnabled
}) {
  const coverCanvasRef = useRef(null);
  const animeImgRef = useRef(null);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [copiedTags, setCopiedTags] = useState(false);

  useEffect(() => {
    // Generate AI dynamic caption if default
    if (!caption) {
      setCaption(
        `🚨 STOP SCROLLING! If you haven't watched "${selectedAnime.title}" yet, you are missing out on one of the greatest anime adaptations of this decade.\n\n⭐ MAL Rating: ${selectedAnime.score || 8.8}/10\n🔥 Studio: ${selectedAnime.studios?.[0]?.name || 'Top Tier'}\n\nHave you watched this yet? Drop your ratings below! 👇`
      );
    }
    if (!hashtags) {
      const tagTitle = selectedAnime.title.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
      setHashtags(
        `#anime #${tagTitle} #animerecommendation #animeedit #animefans #otaku #animehype #japananime #reelsviral`
      );
    }
  }, [selectedAnime]);

  // Render Cover Poster Canvas
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = selectedAnime.images?.jpg?.large_image_url || selectedAnime.images?.jpg?.image_url;
    img.onload = () => {
      animeImgRef.current = img;
      drawCover();
    };
  }, [selectedAnime, coverBadge]);

  const drawCover = () => {
    const canvas = coverCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    // Background
    ctx.fillStyle = '#060814';
    ctx.fillRect(0, 0, w, h);

    const img = animeImgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      ctx.drawImage(img, 0, 0, w, h);
    }

    // Heavy dark gradient overlay
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, 'rgba(0,0,0,0.4)');
    grad.addColorStop(0.5, 'rgba(6, 8, 20, 0.4)');
    grad.addColorStop(1, 'rgba(6, 8, 20, 0.95)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Dynamic Top Badge Banner
    ctx.save();
    ctx.fillStyle = '#ec4899';
    ctx.shadowColor = 'rgba(236, 72, 153, 0.8)';
    ctx.shadowBlur = 30;
    ctx.beginPath();
    ctx.roundRect(80, 160, w - 160, 110, 24);
    ctx.fill();

    ctx.font = '900 44px Space Grotesk, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    const badgeLabels = {
      masterpiece: '⭐ 10/10 MASTERPIECE',
      mustwatch: '🔥 MUST WATCH ANIME',
      trending: '⚡ TRENDING NOW',
      underrated: '💎 UNDERRATED GEM'
    };
    ctx.fillText(badgeLabels[coverBadge] || '🔥 MUST WATCH', w / 2, 235);

    // Title at bottom
    ctx.font = '900 76px Space Grotesk, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(139, 92, 246, 0.9)';
    ctx.shadowBlur = 40;
    wrapText(ctx, selectedAnime.title.toUpperCase(), w / 2, h - 380, w - 140, 84);
    ctx.restore();
  };

  const wrapText = (ctx, text, x, y, maxWidth, lineHeight) => {
    const words = text.split(' ');
    let line = '';
    let curY = y;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      if (ctx.measureText(testLine).width > maxWidth && n > 0) {
        ctx.fillText(line, x, curY);
        line = words[n] + ' ';
        curY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, curY);
  };

  const copyToClipboard = (text, type) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      if (type === 'caption') {
        setCopiedCaption(true);
        setTimeout(() => setCopiedCaption(false), 2000);
      } else {
        setCopiedTags(true);
        setTimeout(() => setCopiedTags(false), 2000);
      }
      playSound('click', soundEnabled);
      showToast(`${type === 'caption' ? 'Caption' : 'Hashtags'} copied to clipboard!`, '📋');
    }
  };

  const downloadCoverImage = () => {
    const canvas = coverCanvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `${selectedAnime.title.replace(/[^a-zA-Z0-9]/g, '_')}_cover_poster.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    playSound('success', soundEnabled);
    showToast('Cover Poster downloaded!', '🎨');
  };

  return (
    <section className="studio-card">
      <div className="card-header">
        <div className="card-title-group">
          <span className="eyebrow-tag">Stage 06 — Copywriting & Cover Studio</span>
          <h2>AI Caption Generator & Cover Poster</h2>
          <p>Autonomous copy packaging with high-conversion hashtags and customizable 9:16 vertical poster visual.</p>
        </div>
        <span className="chip-badge live">
          <Sparkles size={13} /> AI Copy Engine Active
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '24px' }}>
        {/* Left: Copywriting & Hashtags */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="input-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <label>Instagram Reel Caption</label>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => copyToClipboard(caption, 'caption')}
                style={{ padding: '3px 8px' }}
              >
                {copiedCaption ? <Check size={12} color="#34d399" /> : <Copy size={12} />}
                <span>{copiedCaption ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <textarea
              rows={6}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Enter your Instagram caption here..."
            />
          </div>

          <div className="input-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <label>Optimized Viral Hashtags</label>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => copyToClipboard(hashtags, 'hashtags')}
                style={{ padding: '3px 8px' }}
              >
                {copiedTags ? <Check size={12} color="#34d399" /> : <Copy size={12} />}
                <span>{copiedTags ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <textarea
              rows={3}
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              placeholder="#anime #animereels..."
            />
          </div>
        </div>

        {/* Right: Cover Poster Studio */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="input-group">
            <label htmlFor="coverBadgeSelect">Poster Badge Sticker</label>
            <select
              id="coverBadgeSelect"
              value={coverBadge}
              onChange={(e) => {
                setCoverBadge(e.target.value);
                playSound('click', soundEnabled);
              }}
            >
              <option value="mustwatch">🔥 MUST WATCH ANIME</option>
              <option value="masterpiece">⭐ 10/10 MASTERPIECE</option>
              <option value="trending">⚡ TRENDING NOW</option>
              <option value="underrated">💎 UNDERRATED GEM</option>
            </select>
          </div>

          {/* Canvas box for cover poster */}
          <div style={{ width: '100%', height: '240px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)', background: '#000', display: 'grid', placeItems: 'center' }}>
            <canvas
              ref={coverCanvasRef}
              width={720}
              height={1280}
              style={{ height: '100%', width: 'auto', display: 'block', objectFit: 'contain' }}
            />
          </div>

          <button className="btn btn-secondary btn-sm" onClick={downloadCoverImage}>
            <Download size={14} />
            <span>Download 720x1280 Cover Poster</span>
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          className="btn btn-primary"
          onClick={() => {
            playSound('success', soundEnabled);
            onNext();
          }}
        >
          <span>Review Asset Readiness</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </section>
  );
}
