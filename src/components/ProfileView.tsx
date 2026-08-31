import React, { useState } from 'react';
import { 
  User, 
  Trophy, 
  Flame, 
  Coins, 
  Award, 
  Clock, 
  CheckCircle2, 
  RotateCcw, 
  Calendar, 
  ChevronRight, 
  Target, 
  Zap, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { UserProfile, TestSession, TypingResult, AppSettings } from '../types';
import { storage } from '../utils/storage';
import { soundManager } from '../utils/audio';
import { getTranslation } from '../utils/translations';

interface ProfileViewProps {
  profile: UserProfile;
  onUpdateProfile: (p: UserProfile) => void;
  onReviewSession: (session: TestSession) => void;
  onStartExam: () => void;
  language?: AppSettings['language'];
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onUpdateProfile,
  onReviewSession,
  onStartExam,
  language = 'en'
}) => {
  const t = getTranslation(language);
  const [testHistory] = useState<TestSession[]>(() => storage.getTestHistory());
  const [typingHistory] = useState<TypingResult[]>(() => storage.getTypingHistory());
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>(profile.name);
  const [targetExam, setTargetExam] = useState<string>(profile.targetExam);
  const [state, setState] = useState<string>(profile.state || 'Delhi (NCR)');
  const [avatar, setAvatar] = useState<string>(profile.avatar);

  const avatars = ['👨‍💼', '👩‍💼', '🧑‍🎓', '👩‍🏫', '👨‍💻', '🇮🇳', '🎯', '⚡'];

  const handleSaveProfile = () => {
    const updated: UserProfile = {
      ...profile,
      name,
      targetExam,
      state,
      avatar
    };
    storage.saveProfile(updated);
    onUpdateProfile(updated);
    setIsEditing(false);
    soundManager.playCorrect();
  };

  const avgAccuracy = testHistory.length > 0
    ? Math.round(testHistory.reduce((acc, curr) => acc + curr.accuracy, 0) / testHistory.length)
    : 0;

  const totalQuestionsSolved = testHistory.reduce((acc, curr) => acc + curr.correctCount + curr.wrongCount, 0);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 animate-fadeIn">
      {/* Profile Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800 pb-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-20 h-20 rounded-3xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-4xl shadow-inner border border-indigo-100 dark:border-indigo-900">
              {profile.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  {profile.name}
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 font-bold">
                  {t.aspirantRank}: Lvl {profile.level}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Target: <strong>{profile.targetExam}</strong> • {profile.state}
              </p>
              <div className="flex items-center gap-3 mt-2 justify-center sm:justify-start text-xs font-semibold">
                <span className="flex items-center gap-1 text-orange-500">
                  <Flame className="w-3.5 h-3.5 fill-orange-500" />
                  {profile.currentStreak} {t.studyStreak}
                </span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="flex items-center gap-1 text-amber-500">
                  <Coins className="w-3.5 h-3.5" />
                  {profile.coins} Coins
                </span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="flex items-center gap-1 text-indigo-500">
                  <Zap className="w-3.5 h-3.5" />
                  {profile.xp} XP
                </span>
              </div>
            </div>
          </div>

          <button
            id="edit-profile-btn"
            onClick={() => { setIsEditing(!isEditing); soundManager.playClick(); }}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors"
          >
            {isEditing ? t.cancel : t.editProfile}
          </button>
        </div>

        {/* Edit Profile Form */}
        {isEditing && (
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-4 animate-fadeIn">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">{t.editProfile}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-500">{t.nameLabel}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">{t.targetExamLabel}</label>
                <input
                  type="text"
                  value={targetExam}
                  onChange={(e) => setTargetExam(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">{t.stateRegionLabel}</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Avatar picker */}
            <div>
              <label className="text-xs font-semibold text-slate-500">{t.selectAvatar}</label>
              <div className="flex gap-2 mt-1">
                {avatars.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setAvatar(a)}
                    className={`p-2 rounded-xl text-xl border transition-all ${
                      avatar === a ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 scale-110' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSaveProfile}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xs"
            >
              {t.saveChanges}
            </button>
          </div>
        )}

        {/* Aggregate Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center">
            <span className="text-xs font-bold text-slate-400 uppercase">{t.testsCompleted}</span>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{testHistory.length}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center">
            <span className="text-xs font-bold text-slate-400 uppercase">{t.accuracyRate}</span>
            <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{avgAccuracy}%</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center">
            <span className="text-xs font-bold text-slate-400 uppercase">{t.questionsSolved}</span>
            <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">{totalQuestionsSolved}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center">
            <span className="text-xs font-bold text-slate-400 uppercase">{t.typingSpeedBenchmark}</span>
            <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
              {typingHistory.length > 0 ? Math.max(...typingHistory.map(t => t.wpm)) : 0} WPM
            </p>
          </div>
        </div>
      </div>

      {/* Badges Showcase */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-500" />
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
            {t.achievementsBadges} ({profile.badges.length})
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {profile.badges.map((b) => (
            <div key={b.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 flex items-center gap-3">
              <span className="text-3xl">{b.icon}</span>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{b.name || b.title}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Test History List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              {t.mockTestHistory}
            </h3>
          </div>
          <button
            onClick={onStartExam}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            {t.startTestBtn} →
          </button>
        </div>

        {testHistory.length === 0 ? (
          <div className="p-8 text-center space-y-3">
            <p className="text-xs text-slate-500">{t.noMockHistory}</p>
            <button
              onClick={onStartExam}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-xs"
            >
              {t.startTestBtn}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {testHistory.map((test) => (
              <div
                key={test.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {test.examName}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 font-bold uppercase">
                      {test.mode}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {new Date(test.date).toLocaleDateString()} • {test.totalQuestions} {t.questionsSolved} • Time: {Math.round((test.totalDurationSeconds - test.timeRemainingSeconds) / 60)} mins
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400">{t.totalScore}</span>
                    <p className="font-extrabold text-sm text-indigo-600 dark:text-indigo-400">{test.score}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400">{t.accuracyRate}</span>
                    <p className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400">{test.accuracy}%</p>
                  </div>

                  <button
                    onClick={() => { onReviewSession(test); soundManager.playClick(); }}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 font-bold text-xs flex items-center gap-1 transition-colors"
                  >
                    <span>{t.detailedAnalysis}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
