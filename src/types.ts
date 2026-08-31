export type ExamCategory = 'SSC' | 'RAILWAY' | 'BANKING' | 'DEFENSE' | 'STATE_PCS' | 'CIVIL_SERVICES';

export type Subject = 
  | 'Quantitative Aptitude'
  | 'Reasoning Ability'
  | 'General Awareness & GK'
  | 'General Knowledge'
  | 'English Language'
  | 'English Comprehension'
  | 'General Science'
  | 'Banking & Financial Awareness'
  | 'Computer Knowledge';

export interface ExamInfo {
  id: string;
  name: string;
  fullName: string;
  category: ExamCategory;
  description: string;
  totalMarks: number;
  durationMinutes: number;
  marksPerQuestion: number;
  negativeMarks: number;
  tier: string;
  subjects: Subject[];
  syllabus: { subject: Subject; topics: string[] }[];
  icon: string; // lucide icon identifier
  badgeColor: string;
  popular?: boolean;
}

export interface Question {
  id: string;
  question: string;
  questionHindi?: string;
  options: string[];
  optionsHindi?: string[];
  correctIndex: number; // 0, 1, 2, 3
  correctOption: 'A' | 'B' | 'C' | 'D';
  subject: Subject;
  topic: string;
  explanation: string;
  explanationHindi?: string;
  shortcutTrick?: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  examTags: string[]; // e.g. ['SSC CGL', 'RRB NTPC']
  year?: string;
}

export interface TestSession {
  id: string;
  examId: string;
  examName: string;
  category: ExamCategory;
  mode: 'practice' | 'exam';
  totalQuestions: number;
  questions: Question[];
  userAnswers: Record<number, number>; // questionIndex -> chosenOptionIndex (or -1 if not answered)
  questionStatus: Record<number, 'unvisited' | 'not_answered' | 'answered' | 'marked_for_review' | 'answered_and_marked'>;
  timeSpentPerQuestion: Record<number, number>; // seconds
  startTime: number;
  endTime?: number;
  timeRemainingSeconds: number;
  totalDurationSeconds: number;
  isCompleted: boolean;
  score: number;
  accuracy: number;
  correctCount: number;
  wrongCount: number;
  unattemptedCount: number;
  xpEarned: number;
  date: string;
}

export interface TypingPassage {
  id: string;
  title: string;
  category: 'SSC DEST' | 'Railway Accounts' | 'Legal/Official' | 'General Practice';
  text: string;
  targetWpm: number;
  durationSeconds: number; // usually 60 for 1 min speed test
}

export interface TypingResult {
  id: string;
  passageId: string;
  passageTitle: string;
  wpm: number;
  rawWpm: number;
  netWpm: number;
  accuracy: number;
  totalChars: number;
  correctChars: number;
  errorChars: number;
  backspaces: number;
  durationSeconds: number;
  isPassed: boolean;
  date: string;
}

export interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  state: string;
  examTarget: string;
  points: number;
  weeklyPoints: number;
  accuracy: number;
  testsCompleted: number;
  streakDays: number;
  badge: 'Rank #1 Master' | 'Top 1% Elite' | 'Diamond Aspirant' | 'Gold Candidate' | 'Silver Scholar' | 'Rising Star';
  isCurrentUser?: boolean;
}

export interface DailyChallenge {
  id: string;
  date: string;
  title: string;
  description: string;
  subject: Subject;
  questionCount: number;
  timeLimitMinutes: number;
  xpReward: number;
  isCompleted: boolean;
  score?: number;
  questions: Question[];
}

export interface MissionTask {
  id: string;
  title: string;
  description: string;
  category: 'daily' | 'weekly' | 'milestone';
  target: number;
  current: number;
  progress?: number;
  totalRequired?: number;
  rewardXp: number;
  rewardCoins: number;
  xpReward?: number;
  coinsReward?: number;
  isCompleted: boolean;
  isClaimed: boolean;
  iconName: string;
}

export type DailyMission = MissionTask;

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  targetExam: string;
  targetCategory: ExamCategory;
  state?: string;
  xp: number;
  level: number;
  coins: number;
  currentStreak: number;
  maxStreak: number;
  lastActiveDate: string;
  streakFreezes: number;
  totalTests: number;
  testsTaken?: number;
  totalQuestionsAttempted: number;
  totalCorrect: number;
  totalStudyMinutes: number;
  averageAccuracy: number;
  bestWpm: number;
  badges: { id: string; name: string; title?: string; description: string; icon: string; unlockedAt: string }[];
  weakTopics: { topic: string; subject: Subject; accuracy: number }[];
  strongTopics: { topic: string; subject: Subject; accuracy: number }[];
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'hi' | 'bn' | 'te' | 'ta' | 'mr';
  soundEnabled: boolean;
  defaultExam: string;
  instantFeedback: boolean;
  showTimer: boolean;
  fontSize: 'normal' | 'large';
}
