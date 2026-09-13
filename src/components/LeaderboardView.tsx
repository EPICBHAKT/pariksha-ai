import React, { useState } from 'react';
import { 
  Trophy, 
  Crown, 
  Flame, 
  Award, 
  Calendar, 
  Globe, 
  CheckCircle2, 
  User, 
  Search,
  Filter,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { LeaderboardUser, AppSettings } from '../types';
import { INITIAL_LEADERBOARD } from '../utils/storage';
import { soundManager } from '../utils/audio';
import { getTranslation } from '../utils/translations';

interface LeaderboardProps {
  language?: AppSettings['language'];
}

export const LeaderboardView: React.FC<LeaderboardProps> = ({ language = 'en' }) => {
  const t = getTranslation(language);
  const [boardType, setBoardType] = useState<'weekly' | 'global'>('weekly');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const sortedUsers = [...INITIAL_LEADERBOARD].sort((a, b) => {
    return boardType === 'weekly' ? b.weeklyPoints - a.weeklyPoints : b.points - a.points;
  });

  const currentUser = sortedUsers.find(u => u.isCurrentUser);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 animate-fadeIn">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold">
            <Crown className="w-3.5 h-3.5 text-amber-200" />
            <span>National Aspirant Rankings</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.leaderboardTab}
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 max-w-xl">
            {t.leaderboardSubtitle}
          </p>
        </div>

        {/* User rank badge */}
        {currentUser && (
          <div className="p-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-center min-w-[180px]">
            <span className="text-[11px] font-bold text-amber-200 uppercase">{t.aspirantRank}</span>
            <p className="text-3xl font-black text-white">#7</p>
            <p className="text-xs font-medium text-amber-100">{boardType === 'weekly' ? `${currentUser.weeklyPoints} Pts This Week` : `${currentUser.points} Total Pts`}</p>
          </div>
        )}
      </div>

      {/* Tabs & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl w-fit">
          <button
            id="weekly-leaderboard-tab"
            onClick={() => { setBoardType('weekly'); soundManager.playClick(); }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              boardType === 'weekly'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.weeklyCycle}</span>
          </button>
          <button
            id="global-leaderboard-tab"
            onClick={() => { setBoardType('global'); soundManager.playClick(); }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              boardType === 'global'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{t.allTimeGlobal}</span>
          </button>
        </div>

        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <span>Weekly reset in: <strong>2d 14h 30m</strong></span>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sortedUsers.slice(0, 3).map((user, index) => {
          const rankColors = [
            'from-amber-500/20 to-yellow-500/10 border-amber-400 dark:border-amber-500/40',
            'from-slate-300/20 to-slate-400/10 border-slate-300 dark:border-slate-600',
            'from-amber-700/20 to-amber-800/10 border-amber-700/40 dark:border-amber-700/30'
          ];
          const rankIcons = ['👑 Rank 1', '🥈 Rank 2', '🥉 Rank 3'];

          return (
            <div
              key={user.id}
              className={`p-5 rounded-3xl bg-gradient-to-b ${rankColors[index]} border bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between space-y-4`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 shadow-xs">
                  {rankIcons[index]}
                </span>
                <span className="text-xs font-bold text-slate-500">{user.state}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-3xl">{user.avatar}</span>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">{user.name}</h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{user.examTarget}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 font-medium">{t.totalScore}</span>
                  <p className="font-extrabold text-slate-900 dark:text-white">
                    {boardType === 'weekly' ? user.weeklyPoints : user.points} Pts
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">{t.accuracyRate}</span>
                  <p className="font-extrabold text-emerald-600 dark:text-emerald-400">{user.accuracy}%</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ranks 4 to 10 Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs">
        <div className="p-3.5 sm:p-4 border-b border-slate-100 dark:border-slate-800 font-bold text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center justify-between">
          <span>Rank & Aspirant</span>
          <div className="flex items-center gap-4 sm:gap-12 md:gap-16">
            <span className="hidden sm:inline">{t.accuracyRate}</span>
            <span>{t.studyStreak}</span>
            <span className="w-14 sm:w-16 text-right">{t.totalScore}</span>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {sortedUsers.map((user, idx) => {
            const isUser = user.isCurrentUser;
            return (
              <div
                key={user.id}
                className={`p-3.5 sm:p-4 flex items-center justify-between transition-colors ${
                  isUser
                    ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-l-4 border-indigo-600'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 pr-2">
                  <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                    idx < 3 ? 'bg-amber-100 text-amber-800 font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}>
                    #{idx + 1}
                  </span>
                  <span className="text-xl sm:text-2xl shrink-0">{user.avatar}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                        {user.name}
                      </span>
                      {isUser && (
                        <span className="text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded-md bg-indigo-600 text-white font-bold shrink-0">
                          YOU
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {user.examTarget} • {user.state}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-12 md:gap-16 text-xs shrink-0">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 hidden sm:inline">
                    {user.accuracy}%
                  </span>
                  <span className="flex items-center gap-1 font-bold text-orange-500">
                    <Flame className="w-3.5 h-3.5 fill-orange-500" />
                    <span>{user.streakDays}d</span>
                  </span>
                  <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white w-14 sm:w-16 text-right">
                    {boardType === 'weekly' ? user.weeklyPoints : user.points}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
