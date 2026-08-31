import React from 'react';
import { 
  Settings, 
  Moon, 
  Sun, 
  Volume2, 
  VolumeX, 
  Languages, 
  BookOpen, 
  ShieldCheck, 
  Trash2,
  Check
} from 'lucide-react';
import { AppSettings } from '../types';
import { soundManager } from '../utils/audio';
import { getTranslation } from '../utils/translations';

interface SettingsModalProps {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  updateSettings,
  onClose
}) => {
  const t = getTranslation(settings.language);

  const languages: { code: AppSettings['language']; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी (Hindi)' },
    { code: 'bn', label: 'বাংলা (Bengali)' },
    { code: 'te', label: 'తెలుగు (Telugu)' },
    { code: 'mr', label: 'मराठी (Marathi)' },
    { code: 'ta', label: 'தமிழ் (Tamil)' }
  ];

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to reset all test history and local progress?')) {
      localStorage.removeItem('pariksha_test_history');
      localStorage.removeItem('pariksha_typing_history');
      soundManager.playClick();
      alert('Local history cleared.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div 
        id="app-settings-modal"
        className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6"
      >
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                {t.settingsTitle}
              </h3>
              <p className="text-xs text-slate-500">{t.settingsSubtitle}</p>
            </div>
          </div>
          <button
            onClick={() => { onClose(); soundManager.playClick(); }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {/* Language Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-indigo-500" />
              {t.primaryLanguage}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    updateSettings({ language: lang.code });
                    soundManager.playClick();
                  }}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all border text-left flex items-center justify-between ${
                    settings.language === lang.code
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-950 dark:text-indigo-200'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span>{lang.label}</span>
                  {settings.language === lang.code && <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* Theme & Audio Controls */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">{t.soundEffects}</span>
                <span className="text-[11px] text-slate-500">{t.soundDesc}</span>
              </div>
              <button
                onClick={() => {
                  const next = !settings.soundEnabled;
                  updateSettings({ soundEnabled: next });
                  soundManager.setEnabled(next);
                  if (next) soundManager.playClick();
                }}
                className={`p-2 rounded-xl text-xs font-bold ${
                  settings.soundEnabled ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600'
                }`}
              >
                {settings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">{t.darkMode}</span>
                <span className="text-[11px] text-slate-500">{t.darkModeDesc}</span>
              </div>
              <button
                onClick={() => {
                  const next = settings.theme === 'dark' ? 'light' : 'dark';
                  updateSettings({ theme: next });
                  soundManager.playClick();
                }}
                className={`p-2 rounded-xl text-xs font-bold ${
                  settings.theme === 'dark' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {settings.theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Offline Data Reset */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={handleClearHistory}
              className="text-xs text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.clearHistory}</span>
            </button>

            <button
              onClick={() => { onClose(); soundManager.playClick(); }}
              className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-xs"
            >
              {t.doneBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
