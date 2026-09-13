import React from 'react';
import { 
  BookOpen, 
  Keyboard, 
  Trophy, 
  Flame, 
  User, 
  Settings, 
  Volume2, 
  VolumeX, 
  Moon, 
  Sun, 
  Sparkles, 
  Coins, 
  Zap, 
  Wifi, 
  WifiOff, 
  Languages 
} from 'lucide-react';
import { UserProfile, AppSettings } from '../types';
import { soundManager } from '../utils/audio';
import { getTranslation } from '../utils/translations';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  profile: UserProfile;
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  openSettingsModal: () => void;
  openAIGenerator: () => void;
  isOffline: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  profile,
  settings,
  updateSettings,
  openSettingsModal,
  openAIGenerator,
  isOffline
}) => {
  const t = getTranslation(settings.language);

  const toggleSound = () => {
    const next = !settings.soundEnabled;
    updateSettings({ soundEnabled: next });
    soundManager.setEnabled(next);
    if (next) soundManager.playClick();
  };

  const toggleTheme = () => {
    const next = settings.theme === 'dark' ? 'light' : 'dark';
    updateSettings({ theme: next });
    soundManager.playClick();
  };

  const navItems = [
    { id: 'exams', label: t.mockTestsTab, icon: BookOpen, badge: t.mockTestsBadge },
    { id: 'typing', label: t.typingArenaTab, icon: Keyboard, badge: t.typingArenaBadge },
    { id: 'challenges', label: t.dailyStreakTab, icon: Flame, badge: `${profile.currentStreak}d` },
    { id: 'leaderboard', label: t.leaderboardTab, icon: Trophy },
    { id: 'offline', label: t.offlineBankTab, icon: WifiOff, badge: '500 Qs' },
    { id: 'profile', label: t.profileTab, icon: User }
  ];

  const isTestRunnerActive = activeTab === 'test_runner';

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
            {/* Brand Identity */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <button 
                id="brand-logo-btn"
                onClick={() => { setActiveTab('exams'); soundManager.playClick(); }}
                className="flex items-center gap-2 text-left group focus:outline-hidden min-w-0"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform shrink-0">
                  <span className="font-extrabold text-sm sm:text-lg tracking-wider">परी</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight truncate">
                      Pariksha<span className="text-indigo-600 dark:text-indigo-400">AI</span>
                    </span>
                    <span className="hidden xs:inline-block text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 sm:py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 shrink-0">
                      {t.govtExamBadge}
                    </span>
                  </div>
                  <p className="hidden sm:block text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
                    {t.brandSubtitle}
                  </p>
                </div>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-btn-${item.id}`}
                    onClick={() => {
                      setActiveTab(item.id);
                      soundManager.playClick();
                    }}
                    className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                        isActive 
                          ? 'bg-indigo-200 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-200' 
                          : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Top Quick Action Stats & Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              {/* AI Mock Generator Action (Desktop / Tablet) */}
              <button
                id="quick-ai-gen-btn"
                onClick={() => { openAIGenerator(); soundManager.playClick(); }}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-semibold shadow-xs hover:shadow-sm transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>{t.aiMockGenBtn}</span>
              </button>

              {/* Streak & XP Pill */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1 gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-medium text-slate-700 dark:text-slate-200">
                <div className="flex items-center gap-1" title={`${profile.currentStreak} ${t.studyStreak}`}>
                  <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                  <span className="font-bold">{profile.currentStreak}</span>
                </div>
                <div className="w-px h-3 bg-slate-300 dark:bg-slate-600" />
                <div className="flex items-center gap-1" title={t.aspirantCoins}>
                  <Coins className="w-3.5 h-3.5 text-amber-500" />
                  <span className="font-bold">{profile.coins}</span>
                </div>
              </div>

              {/* Language Switch Quick Toggle */}
              <button
                id="lang-quick-toggle-btn"
                onClick={() => {
                  const nextLang = settings.language === 'hi' ? 'en' : 'hi';
                  updateSettings({ language: nextLang });
                  soundManager.playClick();
                }}
                title="Toggle Language"
                className="p-1.5 sm:p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs font-bold"
              >
                <Languages className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500" />
                <span className="uppercase text-[11px] sm:text-xs">{settings.language}</span>
              </button>

              {/* Sound Toggle (Hidden on very narrow mobile to save space, accessible in settings) */}
              <button
                id="sound-toggle-btn"
                onClick={toggleSound}
                title={settings.soundEnabled ? 'Mute Sound' : 'Enable Sound'}
                className="hidden xs:flex p-1.5 sm:p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
              >
                {settings.soundEnabled ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />}
              </button>

              {/* Theme Toggle (Hidden on narrow mobile, available in Settings) */}
              <button
                id="theme-toggle-btn"
                onClick={toggleTheme}
                title="Toggle Theme"
                className="hidden sm:flex p-1.5 sm:p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
              >
                {settings.theme === 'dark' ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />}
              </button>

              {/* Settings Trigger */}
              <button
                id="settings-modal-trigger-btn"
                onClick={() => { openSettingsModal(); soundManager.playClick(); }}
                title={t.settingsTitle}
                className="p-1.5 sm:p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Ergonomic Bottom Navigation Bar (Hidden during active test runner so test controls have full focus) */}
      {!isTestRunnerActive && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 shadow-lg safe-area-inset-bottom">
          <div className="grid grid-cols-6 items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-bottom-nav-${item.id}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    soundManager.playClick();
                  }}
                  className={`flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <div className="relative">
                    <Icon className={`w-5 h-5 ${isActive ? 'scale-110 text-indigo-600 dark:text-indigo-400' : ''} transition-transform`} />
                    {item.id === 'challenges' && profile.currentStreak > 0 && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                    )}
                  </div>
                  <span className="text-[10px] tracking-tight truncate w-full text-center mt-0.5">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
