'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, RefreshCw, CheckCircle2, ArrowRight, Sparkles, Cpu } from 'lucide-react';
import { playSound } from '../SoundFX';

export default function Step9Worker({
  selectedAnime,
  onComplete,
  showToast,
  soundEnabled
}) {
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [progress, setProgress] = useState(0);
  const terminalEndRef = useRef(null);

  useEffect(() => {
    runWorker();
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = (msg, type = '') => {
    const ts = new Date().toISOString().slice(11, 19);
    setLogs((prev) => [...prev, { ts, msg, type }]);
  };

  const runWorker = () => {
    setLogs([]);
    setIsRunning(true);
    setIsFinished(false);
    setProgress(5);
    playSound('render', soundEnabled);

    addLog(`Initiating Background Pipeline for: ${selectedAnime.title}`, 'term-cyan');

    setTimeout(() => {
      addLog('Allocating Headless GPU Frame Buffer (720x1280 @ 60 FPS)...', 'term-warn');
      setProgress(25);
    }, 700);

    setTimeout(() => {
      addLog('Synthesizing Multi-Scene Canvas Layers & Particle Effects...', 'term-warn');
      setProgress(50);
    }, 1500);

    setTimeout(() => {
      addLog('Encoding VP9/H.264 WebM Stream & Merging Audio Track...', 'term-warn');
      setProgress(75);
    }, 2300);

    setTimeout(() => {
      addLog('Packaging 720x1280 Cover Poster & Copy Metadata...', 'term-ok');
      setProgress(90);
    }, 3100);

    setTimeout(() => {
      addLog('Pushing Video Container to Meta Graph API: /act_1784/media_publish...', 'term-ok');
    }, 3800);

    setTimeout(() => {
      addLog('Status: 200 OK — Published Live to Instagram Reels feed!', 'term-ok');
      setProgress(100);
      setIsRunning(false);
      setIsFinished(true);
      playSound('success', soundEnabled);
      showToast('Reel Published Live to Instagram!', '🚀');
    }, 4500);
  };

  return (
    <section className="studio-card">
      <div className="card-header">
        <div className="card-title-group">
          <span className="eyebrow-tag">Stage 09 — Background Worker Execution</span>
          <h2>Autonomous Rendering & Meta Graph API Dispatch</h2>
          <p>Headless background rendering node streams frames, packages video containers, and delivers to Instagram Reels endpoint.</p>
        </div>
        <span className={`chip-badge ${isFinished ? 'live' : 'purple'}`}>
          {isRunning ? (
            <>
              <RefreshCw size={13} className="animate-spin" /> Worker Running Job #7184
            </>
          ) : (
            <>
              <CheckCircle2 size={13} /> Job #7184 Complete
            </>
          )}
        </span>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Rendering & Upload Pipeline</span>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--cyan-bright)', fontWeight: 800 }}>
            {progress}%
          </span>
        </div>
        <div className="timeline-bar" style={{ height: '8px' }}>
          <div className="timeline-progress" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Terminal Output */}
      <div className="terminal-box">
        {logs.map((log, idx) => (
          <div key={idx} className="terminal-line">
            <span className="term-ts">[{log.ts}]</span>
            <span className={log.type}>{log.msg}</span>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '20px', alignItems: 'center' }}>
        <button
          className="btn btn-secondary btn-sm"
          onClick={runWorker}
          disabled={isRunning}
        >
          <Cpu size={14} />
          <span>Re-run Worker Job</span>
        </button>

        {isFinished && (
          <button
            className="btn btn-primary"
            onClick={() => {
              playSound('success', soundEnabled);
              onComplete();
            }}
          >
            <span>View Live Post & Real-Time Analytics</span>
            <ArrowRight size={15} />
          </button>
        )}
      </div>
    </section>
  );
}
