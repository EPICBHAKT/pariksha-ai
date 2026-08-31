import { UserProfile, AppSettings, TestSession, TypingResult, MissionTask, LeaderboardUser } from '../types';

const STORAGE_KEYS = {
  PROFILE: 'pariksha_user_profile_v1',
  SETTINGS: 'pariksha_app_settings_v1',
  TEST_HISTORY: 'pariksha_test_history_v1',
  TYPING_HISTORY: 'pariksha_typing_history_v1',
  DAILY_MISSIONS: 'pariksha_daily_missions_v1',
  OFFLINE_DOWNLOADS: 'pariksha_offline_downloads_v1',
  BOOKMARKS: 'pariksha_question_bookmarks_v1'
};

export const DEFAULT_SETTINGS: AppSettings = {
  theme: 'system',
  language: 'en',
  soundEnabled: true,
  defaultExam: 'ssc-cgl',
  instantFeedback: false,
  showTimer: true,
  fontSize: 'normal'
};

export const DEFAULT_PROFILE: UserProfile = {
  name: 'Govind Kumar',
  email: 'aspirant2026@pariksha.ai',
  avatar: '👨‍🎓',
  targetExam: 'SSC CGL',
  targetCategory: 'SSC',
  xp: 1450,
  level: 4,
  coins: 380,
  currentStreak: 5,
  maxStreak: 12,
  lastActiveDate: new Date().toISOString().split('T')[0],
  streakFreezes: 2,
  totalTests: 18,
  totalQuestionsAttempted: 320,
  totalCorrect: 268,
  totalStudyMinutes: 485,
  averageAccuracy: 83.75,
  bestWpm: 42,
  badges: [
    { id: 'b1', name: 'First Milestone', description: 'Completed first full mock test', icon: '🎯', unlockedAt: '2026-08-20' },
    { id: 'b2', name: '5-Day Streak Fire', description: 'Maintained 5 consecutive study days', icon: '🔥', unlockedAt: '2026-08-28' },
    { id: 'b3', name: 'Speed Typer (35+ WPM)', description: 'Passed SSC DEST typing speed threshold', icon: '⚡', unlockedAt: '2026-08-29' }
  ],
  weakTopics: [
    { topic: 'Trigonometry & Heights', subject: 'Quantitative Aptitude', accuracy: 54 },
    { topic: 'Coded Blood Relations', subject: 'Reasoning Ability', accuracy: 62 },
    { topic: 'Ancient Indian Dynasties', subject: 'General Awareness & GK', accuracy: 58 }
  ],
  strongTopics: [
    { topic: 'Percentages & Profit Loss', subject: 'Quantitative Aptitude', accuracy: 94 },
    { topic: 'Syllogism & Venn Diagrams', subject: 'Reasoning Ability', accuracy: 91 },
    { topic: 'Indian Constitution & Articles', subject: 'General Awareness & GK', accuracy: 89 }
  ]
};

export const DEFAULT_MISSIONS: MissionTask[] = [
  {
    id: 'm1',
    title: 'Daily Streak Workout',
    description: 'Solve today’s Daily Challenge speed quiz',
    category: 'daily',
    target: 1,
    current: 0,
    rewardXp: 100,
    rewardCoins: 25,
    isCompleted: false,
    isClaimed: false,
    iconName: 'Flame'
  },
  {
    id: 'm2',
    title: 'Speed Arena Qualifier',
    description: 'Complete 1 typing speed arena test (>30 WPM)',
    category: 'daily',
    target: 1,
    current: 0,
    rewardXp: 150,
    rewardCoins: 35,
    isCompleted: false,
    isClaimed: false,
    iconName: 'Zap'
  },
  {
    id: 'm3',
    title: 'Century Master',
    description: 'Attempt 50 questions across any exam sets',
    category: 'daily',
    target: 50,
    current: 15,
    rewardXp: 250,
    rewardCoins: 60,
    isCompleted: false,
    isClaimed: false,
    iconName: 'Target'
  },
  {
    id: 'm4',
    title: 'Weekly Mock Champion',
    description: 'Complete 3 full-length Mock Tests this week',
    category: 'weekly',
    target: 3,
    current: 1,
    rewardXp: 500,
    rewardCoins: 120,
    isCompleted: false,
    isClaimed: false,
    iconName: 'Trophy'
  }
];

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  { id: 'u1', rank: 1, name: 'Ananya Sharma', avatar: '👩‍💼', state: 'Delhi (NCT)', examTarget: 'SSC CGL (ASO in CSS)', points: 4890, weeklyPoints: 940, accuracy: 96.2, testsCompleted: 48, streakDays: 24, badge: 'Rank #1 Master' },
  { id: 'u2', rank: 2, name: 'Rohan Deshmukh', avatar: '👨‍🎓', state: 'Maharashtra', examTarget: 'IBPS PO (PNB)', points: 4620, weeklyPoints: 890, accuracy: 94.5, testsCompleted: 44, streakDays: 19, badge: 'Top 1% Elite' },
  { id: 'u3', rank: 3, name: 'Priyanka Verma', avatar: '👩‍🏫', state: 'Uttar Pradesh', examTarget: 'RRB NTPC (Station Master)', points: 4380, weeklyPoints: 850, accuracy: 92.8, testsCompleted: 40, streakDays: 16, badge: 'Top 1% Elite' },
  { id: 'u4', rank: 4, name: 'Siddharth Roy', avatar: '👨‍💻', state: 'West Bengal', examTarget: 'SBI PO 2026', points: 4190, weeklyPoints: 780, accuracy: 91.4, testsCompleted: 38, streakDays: 14, badge: 'Diamond Aspirant' },
  { id: 'u5', rank: 5, name: 'Kavita Sundaram', avatar: '👩‍🔬', state: 'Tamil Nadu', examTarget: 'RBI Grade B', points: 3950, weeklyPoints: 720, accuracy: 90.1, testsCompleted: 35, streakDays: 12, badge: 'Diamond Aspirant' },
  { id: 'u6', rank: 6, name: 'Vikram Singh', avatar: '👨‍✈️', state: 'Rajasthan', examTarget: 'SSC CPO (Delhi Police)', points: 3740, weeklyPoints: 680, accuracy: 88.5, testsCompleted: 32, streakDays: 9, badge: 'Gold Candidate' },
  { id: 'u7', rank: 7, name: 'Govind Kumar (You)', avatar: '👨‍🎓', state: 'Bihar', examTarget: 'SSC CGL', points: 3450, weeklyPoints: 620, accuracy: 85.2, testsCompleted: 28, streakDays: 5, badge: 'Gold Candidate', isCurrentUser: true },
  { id: 'u8', rank: 8, name: 'Neha Agrawal', avatar: '👩‍💼', state: 'Madhya Pradesh', examTarget: 'IBPS Clerk', points: 3210, weeklyPoints: 580, accuracy: 84.0, testsCompleted: 25, streakDays: 7, badge: 'Silver Scholar' },
  { id: 'u9', rank: 9, name: 'Manpreet Sandhu', avatar: '👨‍🌾', state: 'Punjab', examTarget: 'RRB Group D', points: 2980, weeklyPoints: 510, accuracy: 82.5, testsCompleted: 22, streakDays: 4, badge: 'Silver Scholar' },
  { id: 'u10', rank: 10, name: 'Deepak Joshi', avatar: '👨‍🏫', state: 'Uttarakhand', examTarget: 'State PCS', points: 2840, weeklyPoints: 470, accuracy: 81.0, testsCompleted: 20, streakDays: 6, badge: 'Rising Star' }
];

export const storage = {
  getProfile(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return data ? JSON.parse(data) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  },

  saveProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {}
  },

  getSettings(): AppSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings(settings: AppSettings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {}
  },

  getTestHistory(): TestSession[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TEST_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveTestSession(session: TestSession): void {
    try {
      const history = storage.getTestHistory();
      const updated = [session, ...history.slice(0, 49)];
      localStorage.setItem(STORAGE_KEYS.TEST_HISTORY, JSON.stringify(updated));

      // Update user profile stats
      const profile = storage.getProfile();
      profile.totalTests += 1;
      profile.totalQuestionsAttempted += session.totalQuestions;
      profile.totalCorrect += session.correctCount;
      profile.xp += session.xpEarned;
      profile.coins += Math.round(session.score * 1.5);
      profile.level = Math.floor(profile.xp / 400) + 1;
      profile.averageAccuracy = Math.round((profile.totalCorrect / profile.totalQuestionsAttempted) * 100);
      profile.totalStudyMinutes += Math.round((session.totalDurationSeconds - session.timeRemainingSeconds) / 60) || 1;

      // Update daily streak
      const today = new Date().toISOString().split('T')[0];
      if (profile.lastActiveDate !== today) {
        profile.currentStreak += 1;
        if (profile.currentStreak > profile.maxStreak) {
          profile.maxStreak = profile.currentStreak;
        }
        profile.lastActiveDate = today;
      }
      storage.saveProfile(profile);

      // Increment missions
      const missions = storage.getMissions();
      missions.forEach(m => {
        if (m.id === 'm3') m.current = Math.min(m.target, m.current + session.totalQuestions);
        if (m.id === 'm4') m.current = Math.min(m.target, m.current + 1);
        if (m.current >= m.target) m.isCompleted = true;
      });
      storage.saveMissions(missions);
    } catch (e) {}
  },

  getTypingHistory(): TypingResult[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TYPING_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveTypingResult(result: TypingResult): void {
    try {
      const history = storage.getTypingHistory();
      const updated = [result, ...history.slice(0, 49)];
      localStorage.setItem(STORAGE_KEYS.TYPING_HISTORY, JSON.stringify(updated));

      const profile = storage.getProfile();
      if (result.wpm > profile.bestWpm) {
        profile.bestWpm = result.wpm;
      }
      profile.xp += result.isPassed ? 150 : 50;
      profile.coins += 20;
      storage.saveProfile(profile);

      // Complete mission
      const missions = storage.getMissions();
      const typingMission = missions.find(m => m.id === 'm2');
      if (typingMission) {
        typingMission.current = 1;
        typingMission.isCompleted = true;
        storage.saveMissions(missions);
      }
    } catch (e) {}
  },

  getMissions(): MissionTask[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DAILY_MISSIONS);
      return data ? JSON.parse(data) : DEFAULT_MISSIONS;
    } catch {
      return DEFAULT_MISSIONS;
    }
  },

  saveMissions(missions: MissionTask[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.DAILY_MISSIONS, JSON.stringify(missions));
    } catch (e) {}
  },

  claimMissionReward(missionId: string): { xp: number; coins: number } | null {
    const missions = storage.getMissions();
    const mission = missions.find(m => m.id === missionId);
    if (!mission || !mission.isCompleted || mission.isClaimed) return null;

    mission.isClaimed = true;
    storage.saveMissions(missions);

    const profile = storage.getProfile();
    profile.xp += mission.rewardXp;
    profile.coins += mission.rewardCoins;
    profile.level = Math.floor(profile.xp / 400) + 1;
    storage.saveProfile(profile);

    return { xp: mission.rewardXp, coins: mission.rewardCoins };
  }
};
