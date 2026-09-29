'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import AuthModal from '../components/AuthModal';
import AnimeDetailModal from '../components/AnimeDetailModal';
import ToastContainer from '../components/ToastContainer';
import CampaignsDashboard from '../components/CampaignsDashboard';

import Step1Auth from '../components/stages/Step1Auth';
import Step2Search from '../components/stages/Step2Search';
import Step3Research from '../components/stages/Step3Research';
import Step4Select from '../components/stages/Step4Select';
import Step5ReelStudio from '../components/stages/Step5ReelStudio';
import Step6CopyCover from '../components/stages/Step6CopyCover';
import Step7Readiness from '../components/stages/Step7Readiness';
import Step8Schedule from '../components/stages/Step8Schedule';
import Step9Worker from '../components/stages/Step9Worker';
import Step10Analytics from '../components/stages/Step10Analytics';

import { FALLBACK_ANIME } from '../components/mockData';
import { playSound } from '../components/SoundFX';

export default function Home() {
  // Navigation & View State
  const [activeView, setActiveView] = useState('pipeline'); // 'pipeline' | 'campaigns'
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([1]);

  // Auth & Profile State
  const [accountHandle, setAccountHandle] = useState('@AnimeOrbit');
  const [apiKey, setApiKey] = useState('EAAQZA8ZCsxxxx...LIVE_ACCESS_TOKEN');
  const [creatorTier, setCreatorTier] = useState('pro');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Selected Target Anime
  const [selectedAnime, setSelectedAnime] = useState(FALLBACK_ANIME[0]);
  const [inspectAnime, setInspectAnime] = useState(null);

  // Strategy & Reel Customization
  const [campaignTone, setCampaignTone] = useState('hype');
  const [campaignGoal, setCampaignGoal] = useState('saves');
  const [hookText, setHookText] = useState('WHY IS EVERYONE GIVING THIS ANIME A 10/10 RIGHT NOW? 🔥');
  const [ctaText, setCtaText] = useState('Follow @AnimeOrbit for more top-tier anime drops!');
  const [voiceStyle, setVoiceStyle] = useState('hype');

  // Copy & Cover
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [coverBadge, setCoverBadge] = useState('mustwatch');

  // Schedule & Publishing
  const [publishMode, setPublishMode] = useState('immediate');
  const [scheduleDate, setScheduleDate] = useState(new Date().toISOString().slice(0, 10));
  const [scheduleTime, setScheduleTime] = useState('19:30');

  // Campaigns Collection
  const [campaigns, setCampaigns] = useState([
    {
      id: 'camp-1',
      anime: FALLBACK_ANIME[0],
      hookText: 'Why is EVERYONE giving this anime a 10/10 right now? 🤯',
      status: 'live',
      createdAt: new Date().toISOString(),
      metrics: { reach: 48200, engagement: 4820, shares: 2100 }
    },
    {
      id: 'camp-2',
      anime: FALLBACK_ANIME[1],
      hookText: 'The #1 masterpiece that 95% of anime fans missed in 2024! 💎',
      status: 'live',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      metrics: { reach: 92400, engagement: 8900, shares: 4300 }
    }
  ]);

  // Audio & Toast State
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [toasts, setToasts] = useState([]);

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCampaigns = localStorage.getItem('anime_promo_campaigns');
        if (savedCampaigns) setCampaigns(JSON.parse(savedCampaigns));

        const savedHandle = localStorage.getItem('anime_promo_handle');
        if (savedHandle) setAccountHandle(savedHandle);
      } catch (e) {
        console.error('Storage load error', e);
      }
    }
  }, []);

  const showToast = (message, icon = '✨') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, icon }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const navigateToStep = (stepNumber) => {
    setCurrentStep(stepNumber);
    if (!completedSteps.includes(stepNumber)) {
      setCompletedSteps((prev) => [...prev, stepNumber]);
    }
    playSound('tab', soundEnabled);
  };

  const handleSelectAnime = (anime) => {
    setSelectedAnime(anime);
    setCaption(
      `🚨 STOP SCROLLING! If you haven't watched "${anime.title}" yet, you are missing out on one of the greatest anime adaptations.\n\n⭐ MAL Rating: ${anime.score || 8.8}/10\n🔥 Studio: ${anime.studios?.[0]?.name || 'Top Tier'}\n\nHave you watched this yet? Drop your ratings below! 👇`
    );
    const tagTitle = anime.title.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    setHashtags(
      `#anime #${tagTitle} #animerecommendation #animeedit #animefans #otaku #animehype #japananime #reelsviral`
    );
    showToast(`Target anime set: ${anime.title}`, '🎯');
  };

  const handleSaveCampaign = () => {
    const newCamp = {
      id: `camp-${Date.now()}`,
      anime: selectedAnime,
      hookText,
      caption,
      hashtags,
      status: 'live',
      createdAt: new Date().toISOString(),
      metrics: { reach: 48200, engagement: 4820, shares: 2100 }
    };

    const updated = [newCamp, ...campaigns];
    setCampaigns(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('anime_promo_campaigns', JSON.stringify(updated));
    }
    playSound('success', soundEnabled);
    showToast('Campaign saved to your portfolio!', '🎉');
    setActiveView('campaigns');
  };

  const handleDeleteCampaign = (id) => {
    const updated = campaigns.filter((c) => c.id !== id);
    setCampaigns(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('anime_promo_campaigns', JSON.stringify(updated));
    }
    showToast('Campaign removed.', '🗑️');
  };

  const handleOpenExistingCampaign = (camp) => {
    setSelectedAnime(camp.anime);
    if (camp.hookText) setHookText(camp.hookText);
    if (camp.caption) setCaption(camp.caption);
    if (camp.hashtags) setHashtags(camp.hashtags);
    setActiveView('pipeline');
    setCurrentStep(5);
    playSound('tab', soundEnabled);
    showToast(`Loaded campaign for ${camp.anime.title}`, '📂');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation Header */}
      <Header
        accountHandle={accountHandle}
        activeView={activeView}
        setActiveView={setActiveView}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        openAuthModal={() => setIsAuthModalOpen(true)}
        campaignCount={campaigns.length}
      />

      {/* Main Content Area */}
      <main className="container">
        {activeView === 'campaigns' ? (
          <CampaignsDashboard
            campaigns={campaigns}
            onSelectCampaign={handleOpenExistingCampaign}
            onNewCampaign={() => {
              setActiveView('pipeline');
              setCurrentStep(2);
            }}
            onDeleteCampaign={handleDeleteCampaign}
            showToast={showToast}
            soundEnabled={soundEnabled}
          />
        ) : (
          <div className="app-layout">
            {/* 10-Step Interactive Sidebar */}
            <Sidebar
              currentStep={currentStep}
              setCurrentStep={navigateToStep}
              completedSteps={completedSteps}
              selectedAnime={selectedAnime}
              soundEnabled={soundEnabled}
            />

            {/* Step View Switcher */}
            <div className="content-area">
              {currentStep === 1 && (
                <Step1Auth
                  accountHandle={accountHandle}
                  setAccountHandle={setAccountHandle}
                  apiKey={apiKey}
                  setApiKey={setApiKey}
                  creatorTier={creatorTier}
                  setCreatorTier={setCreatorTier}
                  onNext={() => navigateToStep(2)}
                  showToast={showToast}
                  soundEnabled={soundEnabled}
                />
              )}

              {currentStep === 2 && (
                <Step2Search
                  selectedAnime={selectedAnime}
                  onSelectAnime={handleSelectAnime}
                  onInspectAnime={(anime) => setInspectAnime(anime)}
                  onNext={() => navigateToStep(3)}
                  showToast={showToast}
                  soundEnabled={soundEnabled}
                />
              )}

              {currentStep === 3 && (
                <Step3Research
                  selectedAnime={selectedAnime}
                  onNext={() => navigateToStep(4)}
                  soundEnabled={soundEnabled}
                />
              )}

              {currentStep === 4 && (
                <Step4Select
                  selectedAnime={selectedAnime}
                  campaignTone={campaignTone}
                  setCampaignTone={setCampaignTone}
                  campaignGoal={campaignGoal}
                  setCampaignGoal={setCampaignGoal}
                  onNext={() => navigateToStep(5)}
                  showToast={showToast}
                  soundEnabled={soundEnabled}
                />
              )}

              {currentStep === 5 && (
                <Step5ReelStudio
                  selectedAnime={selectedAnime}
                  hookText={hookText}
                  setHookText={setHookText}
                  ctaText={ctaText}
                  setCtaText={setCtaText}
                  voiceStyle={voiceStyle}
                  setVoiceStyle={setVoiceStyle}
                  onNext={() => navigateToStep(6)}
                  showToast={showToast}
                  soundEnabled={soundEnabled}
                />
              )}

              {currentStep === 6 && (
                <Step6CopyCover
                  selectedAnime={selectedAnime}
                  caption={caption}
                  setCaption={setCaption}
                  hashtags={hashtags}
                  setHashtags={setHashtags}
                  coverBadge={coverBadge}
                  setCoverBadge={setCoverBadge}
                  onNext={() => navigateToStep(7)}
                  showToast={showToast}
                  soundEnabled={soundEnabled}
                />
              )}

              {currentStep === 7 && (
                <Step7Readiness
                  selectedAnime={selectedAnime}
                  onNext={() => navigateToStep(8)}
                  soundEnabled={soundEnabled}
                />
              )}

              {currentStep === 8 && (
                <Step8Schedule
                  scheduleDate={scheduleDate}
                  setScheduleDate={setScheduleDate}
                  scheduleTime={scheduleTime}
                  setScheduleTime={setScheduleTime}
                  publishMode={publishMode}
                  setPublishMode={setPublishMode}
                  onDispatchWorker={() => navigateToStep(9)}
                  soundEnabled={soundEnabled}
                />
              )}

              {currentStep === 9 && (
                <Step9Worker
                  selectedAnime={selectedAnime}
                  onComplete={() => navigateToStep(10)}
                  showToast={showToast}
                  soundEnabled={soundEnabled}
                />
              )}

              {currentStep === 10 && (
                <Step10Analytics
                  selectedAnime={selectedAnime}
                  caption={caption}
                  hashtags={hashtags}
                  accountHandle={accountHandle}
                  onSaveCampaign={handleSaveCampaign}
                  soundEnabled={soundEnabled}
                />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Global Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        accountHandle={accountHandle}
        setAccountHandle={setAccountHandle}
        apiKey={apiKey}
        setApiKey={setApiKey}
        showToast={showToast}
        soundEnabled={soundEnabled}
      />

      <AnimeDetailModal
        anime={inspectAnime}
        isOpen={Boolean(inspectAnime)}
        onClose={() => setInspectAnime(null)}
        onSelectAndContinue={(anime) => {
          handleSelectAnime(anime);
          navigateToStep(4);
        }}
        soundEnabled={soundEnabled}
      />

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} />
    </div>
  );
}
