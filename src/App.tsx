import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CategorySelector } from './components/CategorySelector';
import { QuizRunner } from './components/QuizRunner';
import { TestResultView } from './components/TestResultView';
import { TypingArena } from './components/TypingArena';
import { LeaderboardView } from './components/LeaderboardView';
import { DailyChallengesView } from './components/DailyChallengesView';
import { OfflineBankView } from './components/OfflineBankView';
import { ProfileView } from './components/ProfileView';
import { SettingsModal } from './components/SettingsModal';
import { AIMockGeneratorModal } from './components/AIMockGeneratorModal';
import { 
  UserProfile, 
  AppSettings, 
  ExamInfo, 
  Question, 
  TestSession, 
  Subject 
} from './types';
import { storage } from './utils/storage';
import { soundManager } from './utils/audio';
import { generateMockSet, generateExamQuestions } from './data/questionBank';
import { EXAMS_DATA } from './data/examsData';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('exams');
  const [profile, setProfile] = useState<UserProfile>(() => storage.getProfile());
  const [settings, setSettings] = useState<AppSettings>(() => storage.getSettings());

  // Active Quiz State
  const [activeExam, setActiveExam] = useState<ExamInfo | null>(null);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [activeMode, setActiveMode] = useState<'practice' | 'exam'>('practice');
  const [activeSession, setActiveSession] = useState<TestSession | null>(null);

  // Modals
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [showAIGeneratorModal, setShowAIGeneratorModal] = useState<boolean>(false);

  // Offline status
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);

  useEffect(() => {
    // Sync Dark Mode class with root document
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  useEffect(() => {
    // Sound preference sync
    soundManager.setEnabled(settings.soundEnabled);

    // Online / Offline event listeners
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [settings.soundEnabled]);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    storage.saveSettings(updated);
  };

  const handleStartConfiguredTest = (config: {
    exam: ExamInfo;
    questionCount: number;
    mode: 'practice' | 'exam';
    subjectFilter: Subject | 'ALL';
    difficulty: 'ALL' | 'Easy' | 'Moderate' | 'Hard';
  }) => {
    const generatedQuestions = generateExamQuestions(
      config.exam.name,
      config.questionCount,
      config.subjectFilter,
      config.difficulty
    );

    setActiveExam(config.exam);
    setActiveQuestions(generatedQuestions);
    setActiveMode(config.mode);
    setActiveTab('test_runner');
  };

  const handleLaunchGeneratedTest = (exam: ExamInfo, questions: Question[]) => {
    setActiveExam(exam);
    setActiveQuestions(questions);
    setActiveMode('practice');
    setShowAIGeneratorModal(false);
    setActiveTab('test_runner');
  };

  const handleTestCompleted = (session: TestSession) => {
    // Save to storage
    storage.saveTestSession(session);

    // Update profile XP & coins
    const updatedProfile: UserProfile = {
      ...profile,
      xp: profile.xp + session.xpEarned,
      coins: profile.coins + Math.round(session.score / 2),
      totalTests: (profile.totalTests || 0) + 1
    };
    storage.saveProfile(updatedProfile);
    setProfile(updatedProfile);

    // Update mission progress
    const missions = storage.getMissions();
    const updatedMissions = missions.map(m => {
      if (m.id === 'm1') {
        const nextProg = (m.current || 0) + 1;
        return { ...m, current: nextProg, isCompleted: nextProg >= (m.target || 1) };
      }
      if (m.id === 'm2' && session.accuracy >= 80) {
        return { ...m, current: 1, isCompleted: true };
      }
      return m;
    });
    storage.saveMissions(updatedMissions);

    setActiveSession(session);
    setActiveTab('test_result');
  };

  const handleRetakeTest = () => {
    if (activeExam && activeQuestions.length > 0) {
      setActiveTab('test_runner');
    } else {
      setActiveTab('exams');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profile={profile}
        settings={settings}
        updateSettings={updateSettings}
        openSettingsModal={() => setShowSettingsModal(true)}
        openAIGenerator={() => setShowAIGeneratorModal(true)}
        isOffline={isOffline}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'exams' && (
          <CategorySelector
            onStartTest={handleStartConfiguredTest}
            openAIGenerator={() => setShowAIGeneratorModal(true)}
            language={settings.language}
          />
        )}

        {activeTab === 'typing' && (
          <TypingArena
            language={settings.language}
            onTestCompleted={() => {
              const missions = storage.getMissions();
              const updated = missions.map(m => {
                if (m.id === 'm3') return { ...m, progress: 1, isCompleted: true };
                return m;
              });
              storage.saveMissions(updated);
            }}
          />
        )}

        {activeTab === 'challenges' && (
          <DailyChallengesView
            profile={profile}
            language={settings.language}
            onUpdateProfile={setProfile}
            onStartDailyQuiz={(exam) => {
              const dailyQs = generateMockSet(10, exam.subjects);
              setActiveExam(exam);
              setActiveQuestions(dailyQs);
              setActiveMode('practice');
              setActiveTab('test_runner');
            }}
            onStartTyping={() => setActiveTab('typing')}
          />
        )}

        {activeTab === 'leaderboard' && (
          <LeaderboardView language={settings.language} />
        )}

        {activeTab === 'offline' && (
          <OfflineBankView
            language={settings.language}
            onStartOfflineTest={(exam, qs) => {
              setActiveExam(exam);
              setActiveQuestions(qs);
              setActiveMode('practice');
              setActiveTab('test_runner');
            }}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            profile={profile}
            language={settings.language}
            onUpdateProfile={setProfile}
            onReviewSession={(session) => {
              setActiveSession(session);
              setActiveTab('test_result');
            }}
            onStartExam={() => setActiveTab('exams')}
          />
        )}

        {activeTab === 'test_runner' && activeExam && activeQuestions.length > 0 && (
          <QuizRunner
            exam={activeExam}
            questions={activeQuestions}
            mode={activeMode}
            onComplete={handleTestCompleted}
            onExit={() => setActiveTab('exams')}
            language={settings.language}
          />
        )}

        {activeTab === 'test_result' && activeSession && (
          <TestResultView
            session={activeSession}
            language={settings.language}
            onRetake={handleRetakeTest}
            onGoHome={() => setActiveTab('exams')}
          />
        )}
      </main>

      {/* Global Modals */}
      {showSettingsModal && (
        <SettingsModal
          settings={settings}
          updateSettings={updateSettings}
          onClose={() => setShowSettingsModal(false)}
        />
      )}

      {showAIGeneratorModal && (
        <AIMockGeneratorModal
          appLanguage={settings.language}
          onClose={() => setShowAIGeneratorModal(false)}
          onLaunchGeneratedTest={handleLaunchGeneratedTest}
        />
      )}
    </div>
  );
};

export default App;
