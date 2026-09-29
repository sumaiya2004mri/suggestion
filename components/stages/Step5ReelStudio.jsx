'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Download, Sparkles, Volume2, ArrowRight, Heart, MessageCircle, Send, Bookmark, Video } from 'lucide-react';
import { playSound } from '../SoundFX';
import { HOOK_PRESETS } from '../mockData';

export default function Step5ReelStudio({
  selectedAnime,
  hookText,
  setHookText,
  ctaText,
  setCtaText,
  voiceStyle,
  setVoiceStyle,
  onNext,
  showToast,
  soundEnabled
}) {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentScene, setCurrentScene] = useState(1);
  const [isTrailer, setIsTrailer] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const animeImgRef = useRef(null);
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(0);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  const duration = 30; // 30-second Reel preview

  // Preload anime poster for canvas
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = selectedAnime.images?.jpg?.large_image_url || selectedAnime.images?.jpg?.image_url;
    img.onload = () => {
      animeImgRef.current = img;
      drawCanvasFrame(0);
    };
  }, [selectedAnime]);

  // Voiceover with Web Speech API
  const speakVoice = () => {
    if (voiceStyle === 'silent' || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const score = selectedAnime.score || 9;
    const text = `${hookText}. ${selectedAnime.title}. Rating: ${score} out of 10. ${ctaText}`;
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = voiceStyle === 'hype' ? 1.2 : 1.0;
    utt.pitch = 1.05;
    window.speechSynthesis.speak(utt);
  };

  const drawCanvasFrame = (time) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    // Background base
    ctx.fillStyle = '#060814';
    ctx.fillRect(0, 0, w, h);

    // Render image with slow cinematic zoom/pan
    const img = animeImgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      const zoom = 1 + (time / duration) * 0.12;
      const nw = w * zoom;
      const nh = h * zoom;
      const nx = (w - nw) / 2;
      const ny = (h - nh) / 2 + Math.sin(time * 0.5) * 15;
      ctx.drawImage(img, nx, ny, nw, nh);
    }

    // Atmospheric Gradients
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, 'rgba(6, 8, 20, 0.85)');
    grad.addColorStop(0.3, 'rgba(6, 8, 20, 0.2)');
    grad.addColorStop(0.7, 'rgba(6, 8, 20, 0.4)');
    grad.addColorStop(1, 'rgba(6, 8, 20, 0.95)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Particle embers
    ctx.fillStyle = 'rgba(236, 72, 153, 0.6)';
    for (let i = 0; i < 20; i++) {
      const px = (Math.sin(time * 0.8 + i * 2) * 0.5 + 0.5) * w;
      const py = ((i * 60 - time * 40) % h + h) % h;
      const pr = 2 + (i % 3);
      ctx.beginPath();
      ctx.arc(px, py, pr, 0, Math.PI * 2);
      ctx.fill();
    }

    // 4-Scene Motion Storyboard
    const progress = Math.min(time / duration, 1);

    if (time <= 6) {
      // Scene 1: Viral Hook
      setCurrentScene(1);
      ctx.save();
      ctx.fillStyle = '#ec4899';
      ctx.shadowColor = 'rgba(236, 72, 153, 0.9)';
      ctx.shadowBlur = 30;
      ctx.beginPath();
      ctx.roundRect(40, 220, w - 80, 160, 24);
      ctx.fill();

      ctx.font = '900 36px Space Grotesk, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      wrapText(ctx, hookText.toUpperCase(), w / 2, 280, w - 120, 44);
      ctx.restore();
    } else if (time <= 14) {
      // Scene 2: Title & Rating Badge
      setCurrentScene(2);
      ctx.save();
      ctx.fillStyle = '#06b6d4';
      ctx.shadowColor = 'rgba(6, 182, 212, 0.9)';
      ctx.shadowBlur = 30;
      ctx.beginPath();
      ctx.roundRect(w / 2 - 140, 240, 280, 60, 30);
      ctx.fill();

      ctx.font = '900 28px Space Grotesk, sans-serif';
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'center';
      ctx.fillText(`⭐ ${selectedAnime.score || 8.8} / 10 SCORE`, w / 2, 280);

      ctx.font = '900 48px Space Grotesk, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(139, 92, 246, 0.8)';
      ctx.shadowBlur = 24;
      wrapText(ctx, selectedAnime.title.toUpperCase(), w / 2, 380, w - 80, 54);
      ctx.restore();
    } else if (time <= 22) {
      // Scene 3: Why you can't miss this / Synopsis Quote
      setCurrentScene(3);
      ctx.save();
      ctx.textAlign = 'center';
      ctx.font = '900 24px Space Grotesk, sans-serif';
      ctx.fillStyle = '#c4b5fd';
      ctx.fillText('WHY YOU CANNOT MISS THIS', w / 2, 280);

      const snip = (selectedAnime.synopsis || "Unbelievable animation and jaw-dropping plot twists.").slice(0, 150) + "...";
      ctx.font = '500 28px Plus Jakarta Sans, sans-serif';
      ctx.fillStyle = '#ffffff';
      wrapText(ctx, `"${snip}"`, w / 2, 360, w - 100, 42);
      ctx.restore();
    } else {
      // Scene 4: Call to action
      setCurrentScene(4);
      ctx.save();
      ctx.textAlign = 'center';
      ctx.font = '900 44px Space Grotesk, sans-serif';
      ctx.fillStyle = '#22d3ee';
      ctx.fillText('SAVE THIS REEL', w / 2, 320);

      ctx.font = 'bold 28px Plus Jakarta Sans, sans-serif';
      ctx.fillStyle = '#ffffff';
      wrapText(ctx, ctaText, w / 2, 400, w - 100, 40);
      ctx.restore();
    }

    // Dynamic Progress Bar at bottom of reel canvas
    ctx.fillStyle = '#8b5cf6';
    ctx.fillRect(0, h - 10, w * progress, 10);
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

  const startReel = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    playSound('click', soundEnabled);
    speakVoice();

    lastTimeRef.current = performance.now();

    const loop = (ts) => {
      const delta = (ts - lastTimeRef.current) / 1000;
      lastTimeRef.current = ts;

      setCurrentTime((prev) => {
        const next = prev + delta;
        if (next >= duration) {
          drawCanvasFrame(0);
          return 0;
        }
        drawCanvasFrame(next);
        return next;
      });

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
  };

  const pauseReel = () => {
    setIsPlaying(false);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const restartReel = () => {
    pauseReel();
    setCurrentTime(0);
    drawCanvasFrame(0);
    playSound('click', soundEnabled);
  };

  const downloadFrameSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `${selectedAnime.title.replace(/[^a-zA-Z0-9]/g, '_')}_reel_frame.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    playSound('success', soundEnabled);
    showToast('HD Reel Frame Snapshot Downloaded!', '📸');
  };

  // Video Export Recording using MediaRecorder
  const startVideoExport = () => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === 'undefined') return;

    try {
      setIsRecording(true);
      restartReel();
      startReel();

      const stream = canvas.captureStream(30);
      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
      recordedChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) recordedChunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${selectedAnime.title.replace(/[^a-zA-Z0-9]/g, '_')}_reel_video.webm`;
        a.click();
        URL.revokeObjectURL(url);
        setIsRecording(false);
        playSound('success', soundEnabled);
        showToast('Full 9:16 Video Exported & Downloaded!', '🎬');
      };

      recorder.start();
      mediaRecorderRef.current = recorder;

      // Automatically stop after 10 seconds of recording demo
      setTimeout(() => {
        if (recorder.state === 'recording') {
          recorder.stop();
        }
      }, 10000);
    } catch (e) {
      console.error('MediaRecorder error', e);
      setIsRecording(false);
      downloadFrameSnapshot();
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <section className="studio-card">
      <div className="card-header">
        <div className="card-title-group">
          <span className="eyebrow-tag">Stage 05 — 9:16 Reel Motion Studio</span>
          <h2>Generate 9:16 Reel Video & Voiceover</h2>
          <p>Real-time vertical canvas motion rendering with dynamic typography, cinematic overlays, and AI voiceover.</p>
        </div>
        <span className="chip-badge purple">
          <Sparkles size={13} /> 720x1280 60FPS Canvas
        </span>
      </div>

      <div className="studio-grid-2col">
        {/* Left Column: 9:16 Phone Preview Canvas */}
        <div>
          <div className="reel-preview-frame">
            {isTrailer ? (
              <iframe
                src={`https://www.youtube.com/embed/${selectedAnime.trailer?.youtube_id || 'O6qVieflwQs'}?autoplay=1&controls=0&mute=0`}
                title="Anime Trailer"
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="autoplay"
              />
            ) : (
              <canvas
                ref={canvasRef}
                width={720}
                height={1280}
                style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
              />
            )}

            {/* Instagram Reels UI Mock Overlay */}
            <div className="reel-overlay-ui">
              <div className="reel-top-bar">
                <span className="reel-tag">⚡ REELS PROMO</span>
                <span className="reel-tag" style={{ background: 'rgba(139,92,246,0.7)' }}>
                  {formatTime(currentTime)} / 00:30
                </span>
              </div>

              <div className="reel-actions-column">
                <div className="reel-action-btn">
                  <Heart size={24} fill="#ff3366" color="#ff3366" />
                  <span>48.2K</span>
                </div>
                <div className="reel-action-btn">
                  <MessageCircle size={24} />
                  <span>1,420</span>
                </div>
                <div className="reel-action-btn">
                  <Send size={24} />
                  <span>Share</span>
                </div>
                <div className="reel-action-btn">
                  <Bookmark size={24} />
                </div>
              </div>

              <div className="reel-bottom-info">
                <div className="reel-account-row">
                  <div className="reel-avatar">AO</div>
                  <span className="reel-account-name">@AnimeOrbit</span>
                  <span className="chip-badge live" style={{ padding: '1px 6px', fontSize: '9px' }}>
                    Follow
                  </span>
                </div>
                <p className="reel-caption-text">{selectedAnime.title} — {hookText}</p>
              </div>
            </div>
          </div>

          {/* Player controls */}
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div
              className="timeline-bar"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const ratio = (e.clientX - rect.left) / rect.width;
                const newT = ratio * duration;
                setCurrentTime(newT);
                drawCanvasFrame(newT);
              }}
            >
              <div
                className="timeline-progress"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={isPlaying ? pauseReel : startReel}
                >
                  {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                  <span>{isPlaying ? 'Pause' : 'Play Reel Preview'}</span>
                </button>
                <button className="btn btn-secondary btn-sm" onClick={restartReel}>
                  <RotateCcw size={14} />
                </button>
              </div>

              <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--cyan-bright)' }}>
                Scene {currentScene}/4
              </div>
            </div>

            {/* Storyboard track chips */}
            <div className="storyboard-track">
              <span className={`scene-badge ${currentScene === 1 ? 'current' : ''}`}>
                01: Viral Hook
              </span>
              <span className={`scene-badge ${currentScene === 2 ? 'current' : ''}`}>
                02: Title & Score
              </span>
              <span className={`scene-badge ${currentScene === 3 ? 'current' : ''}`}>
                03: Plot Synopsis
              </span>
              <span className={`scene-badge ${currentScene === 4 ? 'current' : ''}`}>
                04: Call To Action
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Customization Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Select Viral Opening Hook
            </label>
            <div className="template-chips-row">
              {HOOK_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  className="template-chip"
                  onClick={() => {
                    setHookText(preset.text);
                    drawCanvasFrame(currentTime);
                    playSound('click', soundEnabled);
                    showToast('Opening hook applied!', '🎯');
                  }}
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <textarea
              rows={2}
              value={hookText}
              onChange={(e) => {
                setHookText(e.target.value);
                drawCanvasFrame(currentTime);
              }}
              placeholder="Enter viral hook text overlay..."
            />
          </div>

          <div className="controls-grid" style={{ marginBottom: 0 }}>
            <div className="input-group">
              <label htmlFor="voiceStyleSelect">AI Voiceover Engine</label>
              <select
                id="voiceStyleSelect"
                value={voiceStyle}
                onChange={(e) => setVoiceStyle(e.target.value)}
              >
                <option value="hype">⚡ Hype Shounen Narrator (Fast & Energetic)</option>
                <option value="cinematic">🎬 Cinematic Deep Voice (Normal Pace)</option>
                <option value="silent">🔇 Silent Mode (Captions Only)</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="videoCtaSelect">Ending Call To Action</label>
              <input
                type="text"
                id="videoCtaSelect"
                value={ctaText}
                onChange={(e) => {
                  setCtaText(e.target.value);
                  drawCanvasFrame(currentTime);
                }}
                placeholder="Follow @AnimeOrbit for more drops!"
              />
            </div>
          </div>

          {/* Trailer vs Canvas Switcher */}
          <div style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: '13px' }}>Official Trailer Video Mode</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Toggle between synthesized canvas reel & official YouTube clip</div>
              </div>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setIsTrailer(!isTrailer);
                  pauseReel();
                }}
              >
                <Video size={14} />
                <span>{isTrailer ? 'Show Canvas Reel' : 'Preview Trailer'}</span>
              </button>
            </div>
          </div>

          {/* Export & Navigation */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: 'auto' }}>
            <button
              className="btn btn-secondary"
              onClick={downloadFrameSnapshot}
              title="Download full 720x1280 PNG"
            >
              <Download size={14} />
              <span>Export HD Snapshot</span>
            </button>

            <button
              className="btn btn-accent"
              onClick={startVideoExport}
              disabled={isRecording}
            >
              <Sparkles size={14} />
              <span>{isRecording ? 'Recording WebM Stream...' : 'Render & Export Video'}</span>
            </button>

            <button
              className="btn btn-primary"
              onClick={() => {
                pauseReel();
                playSound('success', soundEnabled);
                onNext();
              }}
            >
              <span>Next: Copy & Cover</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
