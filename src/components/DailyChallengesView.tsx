import React, { useState } from 'react';
import { 
  Flame, 
  CheckCircle2, 
  Coins, 
  Zap, 
  Trophy, 
  Calendar, 
  Sparkles, 
  Play, 
  Clock, 
  Gift, 
  Lock,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile, DailyMission, ExamInfo, AppSettings } from '../types';
import { storage } from '../utils/storage';
import { soundManager } from '../utils/audio';
import { EXAMS_DATA } from '../data/examsData';
import { getTranslation } from '../utils/translations';

interface DailyChallengesProps {
  profile: UserProfile;
  onUpdateProfile: (p: UserProfile) => void;
  onStartDailyQuiz: (exam: ExamInfo) => void;
  onStartTyping: () => void;
  language?: AppSettings['language'];
}

export const DailyChallengesView: React.FC<DailyChallengesProps> = ({
  profile,
  onUpdateProfile,
  onStartDailyQuiz,
  onStartTyping,
  language = 'en'
}) => {
  const t = getTranslation(language);
  const [missions, setMissions] = useState<DailyMission[]>(() => storage.getMissions());
  const [checkedInToday, setCheckedInToday] = useState<boolean>(false);

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const currentDayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

  const handleClaimReward = (missionId: string) => {
    const updated = missions.map(m => {
      if (m.id === missionId && m.isCompleted && !m.isClaimed) {
        soundManager.playFanfare();
        confetti({ particleCount: 60, spread: 50 });
        const xpEarned = m.rewardXp || m.xpReward || 100;
        const coinsEarned = m.rewardCoins || m.coinsReward || 25;
        const newProf = {
          ...profile,
          xp: profile.xp + xpEarned,
          coins: profile.coins + coinsEarned
        };
        storage.saveProfile(newProf);
        onUpdateProfile(newProf);
        return { ...m, isClaimed: true };
      }
      return m;
    });

    setMissions(updated);
    storage.saveMissions(updated);
  };

  const handleDailyCheckIn = () => {
    if (checkedInToday) return;
    soundManager.playFanfare();
    confetti({ particleCount: 80, spread: 70 });
    setCheckedInToday(true);

    const newProf = {
      ...profile,
      currentStreak: profile.currentStreak + 1,
      coins: profile.coins + 50,
      xp: profile.xp + 100
    };
    storage.saveProfile(newProf);
    onUpdateProfile(newProf);
  };

  const defaultExam = EXAMS_DATA.find(e => e.id === 'ssc-cgl') || EXAMS_DATA[0];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 animate-fadeIn">
      {/* Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold">
            <Flame className="w-3.5 h-3.5 text-amber-200 fill-amber-200" />
            <span>{t.dailyStreakTab}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.dailyMissionsTitle}
          </h1>
          <p className="text-xs sm:text-sm text-orange-100 max-w-xl">
            {t.dailyMissionsSubtitle}
          </p>
        </div>

        {/* Big Streak Pill */}
        <div className="p-5 rounded-3xl bg-white/15 backdrop-blur-md border border-white/20 text-center min-w-[200px] flex flex-col items-center">
          <div className="flex items-center gap-2">
            <Flame className="w-8 h-8 text-amber-300 fill-amber-300 animate-bounce" />
            <span className="text-4xl font-black">{profile.currentStreak}</span>
          </div>
          <p className="text-xs font-bold text-amber-200 uppercase tracking-wider mt-1">{t.studyStreak}</p>
          <span className="text-[11px] text-white/80">Multiplier: 1.5x XP Boost</span>
        </div>
      </div>

      {/* 7-Day Streak Tracker */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
              Weekly Attendance & Streak Milestone
            </h3>
          </div>
          <button
            id="daily-checkin-btn"
            onClick={handleDailyCheckIn}
            disabled={checkedInToday}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              checkedInToday
                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 cursor-default'
                : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-xs'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            <span>{checkedInToday ? t.checkedInToday : t.claimDailyCheckin}</span>
          </button>
        </div>

        {/* 7-Days Row */}
        <div className="grid grid-cols-7 gap-2 sm:gap-4 pt-2">
          {daysOfWeek.map((day, idx) => {
            const isPastOrToday = idx <= currentDayIndex;
            const isToday = idx === currentDayIndex;

            return (
              <div
                key={day}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-between h-24 ${
                  isToday
                    ? 'border-orange-500 bg-orange-50/60 dark:bg-orange-950/40 text-orange-950 dark:text-orange-200 ring-2 ring-orange-500/20'
                    : isPastOrToday
                    ? 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/40 dark:bg-emerald-950/20 text-slate-800 dark:text-slate-200'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-slate-400'
                }`}
              >
                <span className="text-[11px] font-bold uppercase">{day}</span>
                {isPastOrToday ? (
                  <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
                ) : (
                  <Lock className="w-4 h-4 text-slate-300 dark:text-slate-700" />
                )}
                <span className="text-[10px] font-bold">
                  {isToday ? 'Today' : isPastOrToday ? 'Done' : `+${(idx + 1) * 10} XP`}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Challenge Card (10-Question Quick Test) */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-300 text-xs font-bold">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Today's Recommended Rapid Test</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold">
            Daily 10-Question Speed Booster
          </h2>
          <p className="text-xs text-slate-300 max-w-md">
            Test your speed in mixed Quantitative Aptitude, General Knowledge, and Reasoning. Earn bonus 150 XP and keep your streak alive.
          </p>
        </div>

        <button
          id="start-daily-speed-btn"
          onClick={() => { onStartDailyQuiz(defaultExam); soundManager.playClick(); }}
          className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Play className="w-4 h-4 fill-slate-950" />
          <span>Launch Today's Quiz (10 Qs)</span>
        </button>
      </div>

      {/* Daily Missions Checklist */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              {t.dailyMissionsTitle}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Resets every 24 hours at 00:00 IST
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full">
            {missions.filter(m => m.isClaimed).length}/{missions.length} {t.claimedBtn}
          </span>
        </div>

        <div className="space-y-3">
          {missions.map((mission) => {
            const current = mission.current ?? mission.progress ?? 0;
            const target = mission.target ?? mission.totalRequired ?? 1;
            const percent = Math.min(100, Math.round((current / target) * 100));
            const xp = mission.rewardXp || mission.xpReward || 100;
            const coins = mission.rewardCoins || mission.coinsReward || 25;

            return (
              <div
                key={mission.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {mission.title}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      ({current}/{target})
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full max-w-md bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold">
                      <Zap className="w-3 h-3" /> +{xp} XP
                    </span>
                    <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold">
                      <Coins className="w-3 h-3" /> +{coins} Coins
                    </span>
                  </div>
                </div>

                {/* Claim / Action Button */}
                <div>
                  {mission.isClaimed ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60">
                      <CheckCircle2 className="w-4 h-4" /> {t.claimedBtn}
                    </span>
                  ) : mission.isCompleted ? (
                    <button
                      onClick={() => handleClaimReward(mission.id)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md transition-all animate-pulse"
                    >
                      {t.claimRewardBtn}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (mission.id === 'm3') onStartTyping();
                        else onStartDailyQuiz(defaultExam);
                        soundManager.playClick();
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors flex items-center gap-1"
                    >
                      <span>{t.goToTaskBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
