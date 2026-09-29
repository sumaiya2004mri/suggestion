'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, Eye, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';
import { playSound } from '../SoundFX';
import { FALLBACK_ANIME, GENRE_TAXONOMY } from '../mockData';

export default function Step2Search({
  onSelectAnime,
  onInspectAnime,
  selectedAnime,
  onNext,
  showToast,
  soundEnabled
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [minScore, setMinScore] = useState(7.5);
  const [results, setResults] = useState(FALLBACK_ANIME);
  const [loading, setLoading] = useState(false);
  const [apiSource, setApiSource] = useState('Local Cache');

  const fetchAnime = async () => {
    setLoading(true);
    playSound('render', soundEnabled);

    try {
      let queryUrl = `https://api.jikan.moe/v4/top/anime?limit=16&filter=bypopularity`;
      if (searchTerm.trim()) {
        queryUrl = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(searchTerm)}&limit=16&order_by=popularity&sort=asc&sfw=true`;
      }

      const res = await fetch(queryUrl);
      if (!res.ok) throw new Error('Jikan Rate Limit or Offline');
      const data = await res.json();

      if (data.data && data.data.length > 0) {
        let filtered = data.data.filter((a) => (a.score || 0) >= minScore);
        if (filtered.length === 0) filtered = data.data; // fallback if minScore too high
        setResults(filtered);
        setApiSource('Live Jikan v4 API');
        showToast(`Discovered ${filtered.length} anime results!`, '🔍');
        playSound('success', soundEnabled);
      } else {
        fallbackFilter();
      }
    } catch (e) {
      fallbackFilter();
      setApiSource('Verified Offline Dataset');
      showToast('Loaded offline trending anime collection', '⚡');
    } finally {
      setLoading(false);
    }
  };

  const fallbackFilter = () => {
    let list = [...FALLBACK_ANIME];
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          (a.synopsis && a.synopsis.toLowerCase().includes(q))
      );
    }
    if (selectedGenre !== 'all') {
      list = list.filter((a) =>
        a.genres?.some((g) => g.name.toLowerCase().includes(selectedGenre))
      );
    }
    list = list.filter((a) => (a.score || 0) >= minScore);
    setResults(list.length > 0 ? list : FALLBACK_ANIME);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchAnime();
  };

  return (
    <section className="studio-card">
      <div className="card-header">
        <div className="card-title-group">
          <span className="eyebrow-tag">Stage 02 — Discovery Intelligence</span>
          <h2>Choose Anime Genre or Search</h2>
          <p>Filter by genre taxonomy or search directly across the MyAnimeList / Jikan dataset.</p>
        </div>
        <span className="chip-badge live">
          <span className="status-dot"></span> {apiSource}
        </span>
      </div>

      {/* Search Input Row */}
      <form onSubmit={handleSearchSubmit} className="search-row">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search title or keywords (e.g. Solo Leveling, Frieren, Chainsaw Man)..."
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? <RefreshCw size={15} className="animate-spin" /> : <Search size={15} />}
          <span>{loading ? 'Searching...' : 'Search MAL'}</span>
        </button>
      </form>

      {/* Controls Grid */}
      <div className="controls-grid">
        <div className="input-group">
          <label htmlFor="genreSelect">Genre Taxonomy</label>
          <select
            id="genreSelect"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            {GENRE_TAXONOMY.map((g) => (
              <option key={g.id} value={g.id}>
                {g.label}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Min MAL Score</span>
            <span style={{ color: '#fbbf24', fontWeight: 800 }}>{minScore}+</span>
          </label>
          <input
            type="range"
            min="6.0"
            max="9.0"
            step="0.1"
            value={minScore}
            onChange={(e) => setMinScore(parseFloat(e.target.value))}
            style={{ accentColor: 'var(--violet)', marginTop: '8px' }}
          />
        </div>

        <div className="input-group" style={{ justifyContent: 'flex-end' }}>
          <button type="button" className="btn btn-secondary" onClick={fetchAnime}>
            <Filter size={14} />
            <span>Apply Filters</span>
          </button>
        </div>
      </div>

      {/* Anime Results Grid */}
      <div className="results-grid">
        {results.map((anime) => {
          const isSelected = selectedAnime?.mal_id === anime.mal_id;
          const imgUrl = anime.images?.jpg?.image_url || anime.images?.jpg?.large_image_url;

          return (
            <div
              key={anime.mal_id}
              className={`anime-card ${isSelected ? 'selected' : ''}`}
              onClick={() => {
                onSelectAnime(anime);
                playSound('click', soundEnabled);
              }}
            >
              <div className="anime-card-img-wrap">
                <img src={imgUrl} alt={anime.title} loading="lazy" />
                <div className="anime-card-score">⭐ {anime.score || '8.5'}</div>
                <div className="anime-card-year">
                  {anime.year || anime.season || '2024'}
                </div>
              </div>

              <div className="anime-card-body">
                <div className="anime-card-title">{anime.title}</div>
                <div className="anime-card-synopsis">{anime.synopsis || 'No synopsis'}</div>

                <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onInspectAnime(anime);
                    }}
                  >
                    <Eye size={13} /> Details
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectAnime(anime);
                      playSound('success', soundEnabled);
                      onNext();
                    }}
                  >
                    Select ➔
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
