'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  return (
    <iframe
      src="/anime_promo_engine.html"
      style={{
        width: '100vw',
        height: '100vh',
        border: 'none',
        display: 'block',
        position: 'fixed',
        inset: 0,
        backgroundColor: '#070913',
      }}
      title="Anime Promo Engine"
    />
  );
}
