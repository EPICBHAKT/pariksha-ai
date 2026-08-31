import { AppSettings } from '../types';

export type LanguageCode = AppSettings['language'];

export interface TranslationDictionary {
  // Brand & Nav
  brandSubtitle: string;
  govtExamBadge: string;
  mockTestsTab: string;
  mockTestsBadge: string;
  typingArenaTab: string;
  typingArenaBadge: string;
  dailyStreakTab: string;
  leaderboardTab: string;
  offlineBankTab: string;
  profileTab: string;
  aiMockGenBtn: string;
  soundToggle: string;
  themeToggle: string;
  settingsTitle: string;
  languageSelect: string;
  studyStreak: string;
  aspirantCoins: string;

  // Category Selector / Home
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  searchExamPlaceholder: string;
  allExams: string;
  sscExams: string;
  railwayExams: string;
  bankingExams: string;
  defenseExams: string;
  statePcsExams: string;
  allSubjects: string;
  allDifficulties: string;
  easy: string;
  moderate: string;
  hard: string;
  selectExamToPractice: string;
  popularBadge: string;
  questionsCount: string;
  durationMins: string;
  negativeMarking: string;
  marksPerQ: string;
  practiceMode: string;
  practiceModeDesc: string;
  examMode: string;
  examModeDesc: string;
  startTestBtn: string;
  viewSyllabusBtn: string;
  syllabusTitle: string;
  close: string;
  targetCount: string;
  subjectFilter: string;
  difficultyFilter: string;

  // Quiz Runner
  question: string;
  of: string;
  section: string;
  timeRemaining: string;
  languageToggle: string;
  markForReview: string;
  unmarkReview: string;
  clearResponse: string;
  previous: string;
  next: string;
  saveAndNext: string;
  submitTest: string;
  exitQuiz: string;
  questionPalette: string;
  legendAnswered: string;
  legendNotAnswered: string;
  legendMarked: string;
  legendAnsweredMarked: string;
  legendNotVisited: string;
  askAiExplanation: string;
  shortcutTrick: string;
  explanation: string;
  submitConfirmTitle: string;
  submitConfirmDesc: string;
  totalAttempted: string;
  totalUnattempted: string;
  totalMarked: string;
  confirmSubmitBtn: string;
  cancelBtn: string;
  correctAnswer: string;
  wrongAnswer: string;
  yourAnswer: string;

  // Test Results
  resultTitle: string;
  resultSubtitle: string;
  totalScore: string;
  accuracy: string;
  accuracyRate: string;
  speed: string;
  timeTaken: string;
  correctCount: string;
  incorrectCount: string;
  unattempted: string;
  xpEarned: string;
  retakeTestBtn: string;
  retakeTest: string;
  exploreMoreMocks: string;
  testSummary: string;
  correctSummary: string;
  incorrectSummary: string;
  homeBtn: string;
  detailedReview: string;
  subjectBreakdown: string;
  filterAll: string;
  filterCorrect: string;
  filterWrong: string;
  filterUnattempted: string;

  // Typing Arena
  typingTitle: string;
  typingSubtitle: string;
  typingArenaTitle: string;
  typingArenaSubtitle: string;
  selectPassage: string;
  targetWpm: string;
  timeLimit: string;
  startTypingPrompt: string;
  liveWpm: string;
  netWpm: string;
  netSpeed: string;
  cpm: string;
  accuracyPct: string;
  errors: string;
  backspaces: string;
  timeLeft: string;
  restartTyping: string;
  restartOneMin: string;
  completeTypingTest: string;
  keepTypingPrompt: string;
  clickToStartTyping: string;
  keystrokes: string;
  typingPassed: string;
  typingFailed: string;
  typingPassedDesc: string;
  typingFailedDesc: string;

  // Daily Challenges
  dailyStreakTitle: string;
  dailyStreakSubtitle: string;
  dailyMissionsSubtitle: string;
  currentStreakDays: string;
  streakFreeze: string;
  dailyMissionsTitle: string;
  claimReward: string;
  claimRewardBtn: string;
  claimDailyCheckin: string;
  checkedInToday: string;
  claimed: string;
  claimedBtn: string;
  goToTaskBtn: string;
  startDailyMiniQuiz: string;
  bonusReward: string;
  completedBadge: string;
  activeBadge: string;

  // Leaderboard
  leaderboardTitle: string;
  leaderboardSubtitle: string;
  allIndiaRank: string;
  weeklyRank: string;
  weeklyCycle: string;
  allTimeGlobal: string;
  aspirantRank: string;
  stateFilter: string;
  allStates: string;
  aspirantName: string;
  scorePts: string;
  testsCompleted: string;
  topPerformers: string;
  you: string;

  // Offline Bank
  offlineTitle: string;
  offlineSubtitle: string;
  offlineBankTitle: string;
  offlineBankSubtitle: string;
  launchOfflineMock: string;
  searchOfflinePlaceholder: string;
  revealSolution: string;
  hideSolution: string;
  hideSolutionBtn: string;
  showSolutionBtn: string;
  correctOption: string;
  verifiedShortcut: string;
  uniqueQuestionsTotal: string;

  // Profile
  profileTitle: string;
  targetExam: string;
  targetExamLabel: string;
  nameLabel: string;
  stateRegionLabel: string;
  selectAvatar: string;
  saveChanges: string;
  cancel: string;
  questionsSolved: string;
  typingSpeedBenchmark: string;
  achievementsBadges: string;
  mockTestHistory: string;
  noMockHistory: string;
  detailedAnalysis: string;
  level: string;
  totalXp: string;
  studyTime: string;
  badgesTitle: string;
  weakTopicsTitle: string;
  strongTopicsTitle: string;
  recentTestsTitle: string;
  editProfile: string;
  resetData: string;

  // Settings Modal
  settingsHeading: string;
  settingsSubtitle: string;
  primaryLangLabel: string;
  primaryLanguage: string;
  soundEffects: string;
  soundEffectsDesc: string;
  soundDesc: string;
  themeMode: string;
  themeModeDesc: string;
  darkMode: string;
  darkModeDesc: string;
  clearHistoryBtn: string;
  clearHistory: string;
  clearHistoryDesc: string;
  doneBtn: string;

  // AI Generator Modal
  aiGenTitle: string;
  aiGenSubtitle: string;
  aiMockGenerator: string;
  aiMockSubtitle: string;
  selectExam: string;
  selectTargetExam: string;
  customTopic: string;
  topicFocus: string;
  topicPlaceholder: string;
  generateMockBtn: string;
  generateMockTestBtn: string;
  generating: string;
  questionCount: string;
  difficulty: string;
  language: string;
}

export const TRANSLATIONS: Record<LanguageCode, TranslationDictionary> = {
  en: {
    brandSubtitle: 'SSC • Railway • Banking Prep',
    govtExamBadge: 'Govt Exam',
    mockTestsTab: 'Mock Tests',
    mockTestsBadge: '50-500 Qs',
    typingArenaTab: 'Typing Arena',
    typingArenaBadge: '1 Min',
    dailyStreakTab: 'Daily Streak',
    leaderboardTab: 'Leaderboard',
    offlineBankTab: 'Offline Bank',
    profileTab: 'Profile & Tasks',
    aiMockGenBtn: 'AI Mock Generator',
    soundToggle: 'Sound',
    themeToggle: 'Theme',
    settingsTitle: 'Settings',
    languageSelect: 'Language',
    studyStreak: 'Study Streak',
    aspirantCoins: 'Aspirant Coins',

    heroTitle: 'Crack Govt Exams with',
    heroHighlight: 'AI Precision & Real Mocks',
    heroSubtitle: 'Full-length test series for SSC CGL, RRB NTPC, Banking, UPSC CDS, and State Exams with zero question repetition, 1-min typing arena, and AI step-by-step doubt solver.',
    searchExamPlaceholder: 'Search exams (e.g. SSC CGL, RRB NTPC, IBPS PO)...',
    allExams: 'All Exams',
    sscExams: 'SSC Exams',
    railwayExams: 'Railways (RRB)',
    bankingExams: 'Banking (IBPS/SBI)',
    defenseExams: 'Defence & Police',
    statePcsExams: 'State PSC / PCS',
    allSubjects: 'All Subjects (Full Syllabus)',
    allDifficulties: 'All Difficulty Levels',
    easy: 'Easy',
    moderate: 'Moderate',
    hard: 'Hard',
    selectExamToPractice: 'Select Exam & Launch Practice',
    popularBadge: 'Popular',
    questionsCount: 'Questions',
    durationMins: 'Minutes',
    negativeMarking: 'Neg. Marking',
    marksPerQ: 'Marks/Q',
    practiceMode: 'Practice Mode',
    practiceModeDesc: 'Instant answer verification, step-by-step solutions & shortcut tricks after every question.',
    examMode: 'Real Exam Mode',
    examModeDesc: 'Strict TCS/NTA exam timer, negative marking, question palette & comprehensive scorecard at the end.',
    startTestBtn: 'Start Test Now',
    viewSyllabusBtn: 'View Syllabus',
    syllabusTitle: 'Detailed Exam Syllabus & Pattern',
    close: 'Close',
    targetCount: 'Questions Count',
    subjectFilter: 'Subject Focus',
    difficultyFilter: 'Difficulty Level',

    question: 'Question',
    of: 'of',
    section: 'Section',
    timeRemaining: 'Time Remaining',
    languageToggle: 'Language',
    markForReview: 'Mark for Review',
    unmarkReview: 'Unmark Review',
    clearResponse: 'Clear Response',
    previous: 'Previous',
    next: 'Next',
    saveAndNext: 'Save & Next',
    submitTest: 'Submit Test',
    exitQuiz: 'Exit Quiz',
    questionPalette: 'Question Palette',
    legendAnswered: 'Answered',
    legendNotAnswered: 'Not Answered',
    legendMarked: 'Marked for Review',
    legendAnsweredMarked: 'Ans & Marked',
    legendNotVisited: 'Not Visited',
    askAiExplanation: 'Explain with AI Step-by-Step',
    shortcutTrick: 'Smart Shortcut Trick',
    explanation: 'Detailed Solution',
    submitConfirmTitle: 'Ready to Submit Your Test?',
    submitConfirmDesc: 'You still have time remaining. Are you sure you want to finish and evaluate your score now?',
    totalAttempted: 'Attempted',
    totalUnattempted: 'Unattempted',
    totalMarked: 'Marked for Review',
    confirmSubmitBtn: 'Yes, Submit Test',
    cancelBtn: 'Keep Attempting',
    correctAnswer: 'Correct Answer',
    wrongAnswer: 'Your Incorrect Answer',
    yourAnswer: 'Your Response',

    resultTitle: 'Test Performance Report',
    resultSubtitle: 'Complete diagnostic breakdown with sectional accuracy and negative marking evaluation.',
    totalScore: 'Total Score',
    accuracy: 'Accuracy',
    accuracyRate: 'Accuracy Rate',
    speed: 'Speed (Sec/Q)',
    timeTaken: 'Time Taken',
    correctCount: 'Correct Answers',
    incorrectCount: 'Incorrect Answers',
    unattempted: 'Unattempted',
    xpEarned: 'XP & Coins Earned',
    retakeTestBtn: 'Retake Test',
    retakeTest: 'Retake Test',
    exploreMoreMocks: 'Explore More Mocks',
    testSummary: 'Test Completed Successfully',
    correctSummary: 'Correct',
    incorrectSummary: 'Mistakes',
    homeBtn: 'Back to Home',
    detailedReview: 'Detailed Question-by-Question Review',
    subjectBreakdown: 'Subject-wise Performance',
    filterAll: 'All Questions',
    filterCorrect: 'Correct Only',
    filterWrong: 'Wrong Only',
    filterUnattempted: 'Unattempted Only',

    typingTitle: '1-Minute Typing Speed Arena',
    typingSubtitle: 'Official SSC CGL Tier-2, SSC CHSL & Railway Junior Clerk typing speed test simulator with authentic keystroke scoring.',
    typingArenaTitle: '1-Minute Typing Speed Arena',
    typingArenaSubtitle: 'Pass the qualifying speed benchmarks for SSC CGL Tier-2 (27 WPM), SSC CHSL (35 WPM), and Railway Junior Clerk with accurate keystroke diagnostics.',
    selectPassage: 'Select Official Exam Passage',
    targetWpm: 'Target WPM',
    timeLimit: 'Time Limit: 60 Seconds',
    startTypingPrompt: 'Click inside the box and start typing to begin the 1-minute test...',
    liveWpm: 'Current WPM',
    netWpm: 'Net Speed',
    netSpeed: 'Net Speed',
    cpm: 'Keystrokes / Min',
    accuracyPct: 'Accuracy',
    errors: 'Errors',
    backspaces: 'Backspaces',
    timeLeft: 'Time Left',
    restartTyping: 'Restart 1-Min Test',
    restartOneMin: 'Restart (1 Min)',
    completeTypingTest: 'Complete Test',
    keepTypingPrompt: 'Keep typing with focus...',
    clickToStartTyping: 'Click here and start typing to begin the 1-minute test...',
    keystrokes: 'Keystrokes',
    typingPassed: '✓ QUALIFIED (Pass)',
    typingFailed: '✕ Below Cutoff Benchmark',
    typingPassedDesc: 'Outstanding! You surpassed the official speed & accuracy threshold for government typing criteria.',
    typingFailedDesc: 'Keep practicing! Focus on rhythmic typing and minimizing backspaces to hit the qualifying speed benchmark.',

    dailyStreakTitle: 'Daily Aspirant Routine & Streak',
    dailyStreakSubtitle: 'Build discipline with daily check-ins, targeted micro-tasks, and streak freeze protections.',
    dailyMissionsSubtitle: 'Complete tasks to earn XP and Aspirant Coins',
    currentStreakDays: 'Day Streak',
    streakFreeze: 'Streak Freezes',
    dailyMissionsTitle: 'Today\'s Daily Missions',
    claimReward: 'Claim Reward',
    claimRewardBtn: 'Claim Reward',
    claimDailyCheckin: 'Claim Daily Check-in (+25 XP, +10 Coins)',
    checkedInToday: '✓ Checked in Today',
    claimed: 'Claimed',
    claimedBtn: 'Claimed',
    goToTaskBtn: 'Go to Task',
    startDailyMiniQuiz: 'Start Daily 10-Question Sprint',
    bonusReward: 'Bonus 50 XP',
    completedBadge: 'Completed',
    activeBadge: 'In Progress',

    leaderboardTitle: 'All-India Aspirant Leaderboard',
    leaderboardSubtitle: 'Compete against thousands of active government job aspirants across India and rank on top.',
    allIndiaRank: 'All India Rank',
    weeklyRank: 'Weekly Rank',
    weeklyCycle: 'Weekly Cycle',
    allTimeGlobal: 'All-Time Global',
    aspirantRank: 'National Aspirant Rank',
    stateFilter: 'Filter by State',
    allStates: 'All States & UTs',
    aspirantName: 'Aspirant',
    scorePts: 'Points',
    testsCompleted: 'Tests Done',
    topPerformers: 'Top Performers of the Week',
    you: 'YOU',

    offlineTitle: '100% Offline Question Bank (Zero Net Required)',
    offlineSubtitle: 'Comprehensive curated question bank spanning all subjects with verified answers, short tricks, and full solutions stored locally on your device.',
    offlineBankTitle: '100% Offline Question Bank (Zero Net Required)',
    offlineBankSubtitle: 'Explore pre-loaded high-yield questions for all exams with verified solutions and instant filter.',
    launchOfflineMock: 'Launch Offline Mock Test (50 Qs)',
    searchOfflinePlaceholder: 'Search question keywords, topics, or formulas...',
    revealSolution: 'Show Verified Solution & Trick',
    hideSolution: 'Hide Solution',
    hideSolutionBtn: 'Hide Solution',
    showSolutionBtn: 'Show Solution',
    correctOption: 'Correct Option',
    verifiedShortcut: 'Verified Exam Shortcut Trick',
    uniqueQuestionsTotal: 'Offline Questions Available',

    profileTitle: 'Aspirant Profile & Statistics',
    targetExam: 'Target Exam Focus',
    targetExamLabel: 'Target Exam',
    nameLabel: 'Full Name',
    stateRegionLabel: 'State / UT',
    selectAvatar: 'Select Avatar Icon',
    saveChanges: 'Save Profile Changes',
    cancel: 'Cancel',
    questionsSolved: 'Questions Solved',
    typingSpeedBenchmark: 'Top Typing Speed',
    achievementsBadges: 'Achievements & Earned Badges',
    mockTestHistory: 'Recent Mock Test Records',
    noMockHistory: 'No mock tests taken yet. Start a test to view your performance logs.',
    detailedAnalysis: 'Full Review',
    level: 'Preparation Level',
    totalXp: 'Total Experience XP',
    studyTime: 'Total Study Time',
    badgesTitle: 'Milestones & Badges',
    weakTopicsTitle: 'Recommended Focus Areas',
    strongTopicsTitle: 'High-Mastery Topics',
    recentTestsTitle: 'Past Test History',
    editProfile: 'Edit Profile',
    resetData: 'Reset All Data',

    settingsHeading: 'Platform Settings & Customization',
    settingsSubtitle: 'Customize your exam practice experience, toggle audio prompts, and change language.',
    primaryLangLabel: 'Primary Platform Language',
    primaryLanguage: 'Platform Interface Language',
    soundEffects: 'Sound Effects & Audio Cues',
    soundEffectsDesc: 'Play audio clicks on answer selection and victory fanfares on test completion.',
    soundDesc: 'Sound effects for timers, buttons, and test results',
    themeMode: 'Appearance Theme',
    themeModeDesc: 'Toggle between dark and light modes for comfortable night-time study.',
    darkMode: 'Dark Mode Theme',
    darkModeDesc: 'High contrast dark canvas for comfortable night study',
    clearHistoryBtn: 'Clear Test History & Reset Stats',
    clearHistory: 'Clear Test History',
    clearHistoryDesc: 'Wipes all local mock test records, typing logs, and streak progression.',
    doneBtn: 'Save & Close Settings',

    aiGenTitle: 'ParikshaAI Mock Test Generator',
    aiGenSubtitle: 'Generate infinite syllabus-aligned questions with customized difficulty, sub-topics, and question counts powered by Gemini 2.5 Flash.',
    aiMockGenerator: 'AI Custom Mock Generator',
    aiMockSubtitle: 'Powered by Gemini 2.5 Flash for authentic exam questions with strict 25% option balancing',
    selectExam: 'Select Exam Target',
    selectTargetExam: 'Select Target Exam',
    customTopic: 'Custom Topic / Syllabus Focus (Optional)',
    topicFocus: 'Custom Topic / Syllabus Focus',
    topicPlaceholder: 'e.g. Compound Interest, Fundamental Rights, Error Spotting...',
    generateMockBtn: 'Generate & Start AI Mock Test',
    generateMockTestBtn: 'Generate & Launch AI Mock',
    generating: 'Formulating authentic exam questions...',
    questionCount: 'Question Count',
    difficulty: 'Difficulty Level',
    language: 'Question Language'
  },

  hi: {
    brandSubtitle: 'SSC • रेलवे • बैंकिंग परीक्षा तैयारी',
    govtExamBadge: 'सरकारी परीक्षा',
    mockTestsTab: 'मॉक टेस्ट',
    mockTestsBadge: '50-500 प्रश्न',
    typingArenaTab: 'टाइपिंग अखाड़ा',
    typingArenaBadge: '1 मिनट',
    dailyStreakTab: 'दैनिक स्ट्रीक',
    leaderboardTab: 'लीडरबोर्ड',
    offlineBankTab: 'ऑफलाइन बैंक',
    profileTab: 'प्रोफ़ाइल और कार्य',
    aiMockGenBtn: 'AI मॉक जेनरेटर',
    soundToggle: 'ध्वनि',
    themeToggle: 'थीम',
    settingsTitle: 'सेटिंग्स',
    languageSelect: 'भाषा',
    studyStreak: 'अध्ययन स्ट्रीक',
    aspirantCoins: 'एस्पिरेंट सिक्के',

    heroTitle: 'सरकारी परीक्षा पास करें',
    heroHighlight: 'AI सटीकता और असली मॉक टेस्ट के साथ',
    heroSubtitle: 'SSC CGL, RRB NTPC, बैंकिंग, UPSC CDS और राज्य परीक्षाओं के लिए पूर्ण टेस्ट सीरीज - शून्य दोहराव, 1-मिनट टाइपिंग टेस्ट और AI समाधान के साथ।',
    searchExamPlaceholder: 'परीक्षा खोजें (जैसे SSC CGL, RRB NTPC, IBPS PO)...',
    allExams: 'सभी परीक्षाएं',
    sscExams: 'SSC परीक्षाएं',
    railwayExams: 'रेलवे (RRB)',
    bankingExams: 'बैंकिंग (IBPS/SBI)',
    defenseExams: 'रक्षा और पुलिस',
    statePcsExams: 'राज्य PSC / PCS',
    allSubjects: 'सभी विषय (पूर्ण पाठ्यक्रम)',
    allDifficulties: 'सभी कठिनाई स्तर',
    easy: 'सरल',
    moderate: 'मध्यम',
    hard: 'कठिन',
    selectExamToPractice: 'परीक्षा चुनें और अभ्यास शुरू करें',
    popularBadge: 'लोकप्रिय',
    questionsCount: 'प्रश्न',
    durationMins: 'मिनट',
    negativeMarking: 'नेगेटिव मार्किंग',
    marksPerQ: 'अंक/प्रश्न',
    practiceMode: 'अभ्यास मोड',
    practiceModeDesc: 'प्रत्येक प्रश्न के बाद तुरंत उत्तर जांच, विस्तृत समाधान और शॉर्टकट ट्रिक।',
    examMode: 'असली परीक्षा मोड',
    examModeDesc: 'सख्त TCS/NTA टाइमर, नेगेटिव मार्किंग, प्रश्न पैलेट और अंत में पूर्ण स्कोरकार्ड।',
    startTestBtn: 'अभी टेस्ट शुरू करें',
    viewSyllabusBtn: 'पाठ्यक्रम देखें',
    syllabusTitle: 'विस्तृत परीक्षा पाठ्यक्रम और पैटर्न',
    close: 'बंद करें',
    targetCount: 'प्रश्नों की संख्या',
    subjectFilter: 'विषय फोकस',
    difficultyFilter: 'कठिनाई स्तर',

    question: 'प्रश्न',
    of: 'का',
    section: 'अनुभाग',
    timeRemaining: 'शेष समय',
    languageToggle: 'भाषा',
    markForReview: 'समीक्षा के लिए चिह्नित करें',
    unmarkReview: 'चिह्न हटाएं',
    clearResponse: 'उत्तर साफ़ करें',
    previous: 'पिछला',
    next: 'अगला',
    saveAndNext: 'सहेजें और अगला',
    submitTest: 'टेस्ट जमा करें',
    exitQuiz: 'क्विज छोड़ें',
    questionPalette: 'प्रश्न पैलेट',
    legendAnswered: 'उत्तर दिया',
    legendNotAnswered: 'उत्तर नहीं दिया',
    legendMarked: 'समीक्षा हेतु चिह्नित',
    legendAnsweredMarked: 'उत्तरित व चिह्नित',
    legendNotVisited: 'नहीं देखा गया',
    askAiExplanation: 'AI से चरण-दर-चरण समझें',
    shortcutTrick: 'स्मार्ट शॉर्टकट ट्रिक',
    explanation: 'विस्तृत समाधान',
    submitConfirmTitle: 'क्या आप टेस्ट जमा करने के लिए तैयार हैं?',
    submitConfirmDesc: 'आपके पास अभी भी समय शेष है। क्या आप निश्चित रूप से टेस्ट समाप्त करना चाहते हैं?',
    totalAttempted: 'प्रयास किए गए',
    totalUnattempted: 'अप्रयासित',
    totalMarked: 'समीक्षा हेतु चिह्नित',
    confirmSubmitBtn: 'हाँ, टेस्ट जमा करें',
    cancelBtn: 'प्रयास जारी रखें',
    correctAnswer: 'सही उत्तर',
    wrongAnswer: 'आपका गलत उत्तर',
    yourAnswer: 'आपका उत्तर',

    resultTitle: 'टेस्ट प्रदर्शन रिपोर्ट',
    resultSubtitle: 'अनुभागीय सटीकता और नेगेटिव मार्किंग मूल्यांकन के साथ पूर्ण परिणाम।',
    totalScore: 'कुल अंक',
    accuracy: 'सटीकता',
    accuracyRate: 'सटीकता दर',
    speed: 'गति (सेकंड/प्रश्न)',
    timeTaken: 'लिया गया समय',
    correctCount: 'सही उत्तर',
    incorrectCount: 'गलत उत्तर',
    unattempted: 'अप्रयासित',
    xpEarned: 'अर्जित XP और सिक्के',
    retakeTestBtn: 'पुनः टेस्ट दें',
    retakeTest: 'पुनः टेस्ट दें',
    exploreMoreMocks: 'अन्य मॉक टेस्ट देखें',
    testSummary: 'टेस्ट सफलतापूर्वक पूरा हुआ',
    correctSummary: 'सही',
    incorrectSummary: 'गलतियां',
    homeBtn: 'मुख्य पृष्ठ पर लौटें',
    detailedReview: 'विस्तृत प्रश्न-वार समीक्षा',
    subjectBreakdown: 'विषय-वार प्रदर्शन',
    filterAll: 'सभी प्रश्न',
    filterCorrect: 'केवल सही',
    filterWrong: 'केवल गलत',
    filterUnattempted: 'केवल अप्रयासित',

    typingTitle: '1-मिनट टाइपिंग स्पीड एरिना',
    typingSubtitle: 'SSC CGL टियर-2, SSC CHSL और रेलवे क्लर्क टाइपिंग टेस्ट सिम्युलेटर।',
    typingArenaTitle: '1-मिनट टाइपिंग स्पीड एरिना',
    typingArenaSubtitle: 'SSC CGL Tier-2 (27 WPM), SSC CHSL (35 WPM) और रेलवे क्लर्क के लिए सटीक कीस्ट्रोक डायग्नोस्टिक्स के साथ अभ्यास करें।',
    selectPassage: 'आधिकारिक परीक्षा गद्यांश चुनें',
    targetWpm: 'लक्ष्य WPM',
    timeLimit: 'समय सीमा: 60 सेकंड',
    startTypingPrompt: 'बॉक्स में क्लिक करें और 1-मिनट का टेस्ट शुरू करने के लिए टाइप करना शुरू करें...',
    liveWpm: 'वर्तमान WPM',
    netWpm: 'नेट गति',
    netSpeed: 'नेट गति',
    cpm: 'कीस्ट्रोक / मिनट',
    accuracyPct: 'सटीकता',
    errors: 'त्रुटियां',
    backspaces: 'बैकस्पेस',
    timeLeft: 'शेष समय',
    restartTyping: '1-मिनट टेस्ट पुनः शुरू करें',
    restartOneMin: 'पुनः प्रारंभ करें (1 मिनट)',
    completeTypingTest: 'टेस्ट पूर्ण करें',
    keepTypingPrompt: 'एकाग्रता के साथ टाइप करते रहें...',
    clickToStartTyping: '1-मिनट का टेस्ट शुरू करने के लिए यहाँ क्लिक करें और टाइप करना शुरू करें...',
    keystrokes: 'कीस्ट्रोक्स',
    typingPassed: '✓ उत्तीर्ण (पास)',
    typingFailed: '✕ कटऑफ बेंचमार्क से कम',
    typingPassedDesc: 'उत्कृष्ट! आपने सरकारी टाइपिंग परीक्षा के मानक को पार कर लिया है।',
    typingFailedDesc: 'अभ्यास जारी रखें! गति बढ़ाने के लिए बैकस्पेस का कम उपयोग करें।',

    dailyStreakTitle: 'दैनिक एस्पिरेंट रूटीन और स्ट्रीक',
    dailyStreakSubtitle: 'दैनिक चेक-इन और दैनिक मिशनों के साथ अपनी तैयारी में निरंतरता बनाए रखें।',
    dailyMissionsSubtitle: 'XP और एस्पिरेंट सिक्के अर्जित करने के लिए कार्य पूरे करें',
    currentStreakDays: 'दिनों की स्ट्रीक',
    streakFreeze: 'स्ट्रीक फ्रीज',
    dailyMissionsTitle: 'आज के दैनिक मिशन',
    claimReward: 'इनाम प्राप्त करें',
    claimRewardBtn: 'इनाम प्राप्त करें',
    claimDailyCheckin: 'दैनिक चेक-इन प्राप्त करें (+25 XP, +10 सिक्के)',
    checkedInToday: '✓ आज चेक-इन पूरा हुआ',
    claimed: 'प्राप्त किया',
    claimedBtn: 'प्राप्त किया',
    goToTaskBtn: 'कार्य पर जाएं',
    startDailyMiniQuiz: 'दैनिक 10-प्रश्न स्प्रिंट शुरू करें',
    bonusReward: 'बोनस 50 XP',
    completedBadge: 'पूर्ण हुआ',
    activeBadge: 'सक्रिय',

    leaderboardTitle: 'अखिल भारतीय एस्पिरेंट लीडरबोर्ड',
    leaderboardSubtitle: 'देशभर के हजारों सक्रिय छात्रों के साथ प्रतिस्पर्धा करें और शीर्ष पर आएं।',
    allIndiaRank: 'अखिल भारतीय रैंक',
    weeklyRank: 'साप्ताहिक रैंक',
    weeklyCycle: 'साप्ताहिक चक्र',
    allTimeGlobal: 'सर्वकालिक वैश्विक',
    aspirantRank: 'राष्ट्रीय एस्पिरेंट रैंक',
    stateFilter: 'राज्य अनुसार फ़िल्टर',
    allStates: 'सभी राज्य व केंद्रशासित प्रदेश',
    aspirantName: 'छात्र',
    scorePts: 'अंक',
    testsCompleted: 'पूर्ण किए गए टेस्ट',
    topPerformers: 'सप्ताह के शीर्ष प्रदर्शनकर्ता',
    you: 'आप',

    offlineTitle: '100% ऑफलाइन प्रश्न बैंक (इंटरनेट की आवश्यकता नहीं)',
    offlineSubtitle: 'सभी विषयों के सत्यापित उत्तर, शॉर्ट ट्रिक और समाधान के साथ प्रश्न बैंक।',
    offlineBankTitle: '100% ऑफलाइन प्रश्न बैंक (इंटरनेट की आवश्यकता नहीं)',
    offlineBankSubtitle: 'सभी परीक्षाओं के लिए सत्यापित समाधान और त्वरित फ़िल्टर के साथ प्री-लोडेड प्रश्न खोजें।',
    launchOfflineMock: 'ऑफलाइन मॉक टेस्ट शुरू करें (50 प्रश्न)',
    searchOfflinePlaceholder: 'प्रश्न, विषय या सूत्र खोजें...',
    revealSolution: 'सत्यापित समाधान और ट्रिक देखें',
    hideSolution: 'समाधान छिपाएं',
    hideSolutionBtn: 'समाधान छिपाएं',
    showSolutionBtn: 'समाधान देखें',
    correctOption: 'सही विकल्प',
    verifiedShortcut: 'सत्यापित परीक्षा शॉर्टकट ट्रिक',
    uniqueQuestionsTotal: 'उपलब्ध ऑफलाइन प्रश्न',

    profileTitle: 'एस्पिरेंट प्रोफ़ाइल और आंकड़े',
    targetExam: 'लक्ष्य परीक्षा',
    targetExamLabel: 'लक्ष्य परीक्षा',
    nameLabel: 'पूरा नाम',
    stateRegionLabel: 'राज्य / केंद्रशासित प्रदेश',
    selectAvatar: 'अवतार आइकन चुनें',
    saveChanges: 'प्रोफ़ाइल परिवर्तन सहेजें',
    cancel: 'रद्द करें',
    questionsSolved: 'हल किए गए प्रश्न',
    typingSpeedBenchmark: 'सर्वश्रेष्ठ टाइपिंग गति',
    achievementsBadges: 'उपलब्धियां और बैज',
    mockTestHistory: 'हाल के मॉक टेस्ट रिकॉर्ड',
    noMockHistory: 'अभी तक कोई मॉक टेस्ट नहीं दिया गया है।',
    detailedAnalysis: 'पूर्ण समीक्षा',
    level: 'तैयारी का स्तर',
    totalXp: 'कुल अनुभव XP',
    studyTime: 'कुल अध्ययन समय',
    badgesTitle: 'मील के पत्थर और बैज',
    weakTopicsTitle: 'सुधार के प्रमुख क्षेत्र',
    strongTopicsTitle: 'मजबूत विषय',
    recentTestsTitle: 'पिछले टेस्टों का इतिहास',
    editProfile: 'प्रोफ़ाइल संपादित करें',
    resetData: 'सभी डेटा रीसेट करें',

    settingsHeading: 'प्लेटफ़ॉर्म सेटिंग्स',
    settingsSubtitle: 'अपनी परीक्षा अभ्यास सेटिंग्स, ध्वनि और भाषा बदलें।',
    primaryLangLabel: 'मुख्य भाषा',
    primaryLanguage: 'प्लेटफ़ॉर्म इंटरफ़ेस भाषा',
    soundEffects: 'ध्वनि प्रभाव',
    soundEffectsDesc: 'उत्तर चयन पर क्लिक और टेस्ट पूरा होने पर बधाई ध्वनि चलाएं।',
    soundDesc: 'टाइमर, बटन और परिणामों के लिए ध्वनि प्रभाव',
    themeMode: 'थीम मोड',
    themeModeDesc: 'आरामदायक अध्ययन के लिए डार्क और लाइट मोड टॉगल करें।',
    darkMode: 'डार्क मोड थीम',
    darkModeDesc: 'रात में अध्ययन के लिए हाई-कंट्रास्ट डार्क कैनवास',
    clearHistoryBtn: 'टेस्ट इतिहास साफ़ करें',
    clearHistory: 'टेस्ट इतिहास साफ़ करें',
    clearHistoryDesc: 'सभी स्थानीय मॉक टेस्ट रिकॉर्ड और आंकड़े हटा देता है।',
    doneBtn: 'सहेजें और बंद करें',

    aiGenTitle: 'ParikshaAI मॉक टेस्ट जेनरेटर',
    aiGenSubtitle: 'Gemini 2.5 Flash द्वारा संचालित अनुकूलित कठिनाई और विषयों के साथ असीमित प्रश्न तैयार करें।',
    aiMockGenerator: 'AI कस्टम मॉक जेनरेटर',
    aiMockSubtitle: 'प्रामाणिक परीक्षा प्रश्नों और 25% विकल्प संतुलन के साथ Gemini 2.5 Flash द्वारा संचालित',
    selectExam: 'लक्ष्य परीक्षा चुनें',
    selectTargetExam: 'लक्ष्य परीक्षा चुनें',
    customTopic: 'कस्टम विषय / पाठ्यक्रम फोकस',
    topicFocus: 'कस्टम विषय / पाठ्यक्रम फोकस',
    topicPlaceholder: 'जैसे चक्रवृद्धि ब्याज, मौलिक अधिकार, सामान्य विज्ञान...',
    generateMockBtn: 'AI मॉक टेस्ट बनाएं और शुरू करें',
    generateMockTestBtn: 'AI मॉक जेनरेट व लॉन्च करें',
    generating: 'प्रामाणिक परीक्षा प्रश्न तैयार किए जा रहे हैं...',
    questionCount: 'प्रश्नों की संख्या',
    difficulty: 'कठिनाई स्तर',
    language: 'प्रश्न भाषा'
  },

  bn: {
    brandSubtitle: 'SSC • রেলওয়ে • ব্যাংকিং প্রস্তুতি',
    govtExamBadge: 'সরকারি পরীক্ষা',
    mockTestsTab: 'মক টেস্ট',
    mockTestsBadge: '৫০-৫০০ প্রশ্ন',
    typingArenaTab: 'টাইপিং এরিনা',
    typingArenaBadge: '১ মিনিট',
    dailyStreakTab: 'দৈনিক স্ট্রিক',
    leaderboardTab: 'লিডারবোর্ড',
    offlineBankTab: 'অফলাইন ব্যাংক',
    profileTab: 'প্রোফাইল ও টাস্ক',
    aiMockGenBtn: 'AI মক জেনারেটর',
    soundToggle: 'শব্দ',
    themeToggle: 'থিম',
    settingsTitle: 'সেটিংস',
    languageSelect: 'ভাষা',
    studyStreak: 'স্টাডি স্ট্রিক',
    aspirantCoins: 'অ্যাসপিরেন্ট কয়েন',

    heroTitle: 'সরকারি পরীক্ষায় সাফল্য পান',
    heroHighlight: 'AI নির্ভুলতা ও রিয়েল মকের সাথে',
    heroSubtitle: 'SSC CGL, RRB NTPC, ব্যাংকিং ও রাজ্য পরীক্ষার জন্য টেস্ট সিরিজ - জিরো পুনরাবৃত্তি ও AI সমাধান সহ।',
    searchExamPlaceholder: 'পরীক্ষা খুঁজুন (যেমন SSC CGL, RRB NTPC, IBPS PO)...',
    allExams: 'সকল পরীক্ষা',
    sscExams: 'SSC পরীক্ষা',
    railwayExams: 'রেলওয়ে (RRB)',
    bankingExams: 'ব্যাংকিং (IBPS/SBI)',
    defenseExams: 'প্রতিরক্ষা ও পুলিশ',
    statePcsExams: 'রাজ্য PSC / PCS',
    allSubjects: 'সকল বিষয়',
    allDifficulties: 'সকল স্তর',
    easy: 'সহজ',
    moderate: 'মাঝারি',
    hard: 'কঠিন',
    selectExamToPractice: 'পরীক্ষা নির্বাচন করে অনুশীলন শুরু করুন',
    popularBadge: 'জনপ্রিয়',
    questionsCount: 'প্রশ্ন',
    durationMins: 'মিনিট',
    negativeMarking: 'নেগেটিভ মার্কিং',
    marksPerQ: 'নম্বর/প্রশ্ন',
    practiceMode: 'অনুশীলন মোড',
    practiceModeDesc: 'প্রতিটি প্রশ্নের পর তাত্ক্ষণিক উত্তর যাচাই ও শর্টকাট ট্রিক।',
    examMode: 'রিয়েল এক্সাম মোড',
    examModeDesc: 'কঠোর টাইমার, নেগেটিভ মার্কিং ও পূর্ণ স্কোরকার্ড।',
    startTestBtn: 'এখনই টেস্ট শুরু করুন',
    viewSyllabusBtn: 'সিলেবাস দেখুন',
    syllabusTitle: 'বিস্তারিত পরীক্ষার সিলেবাস ও প্যাটার্ন',
    close: 'বন্ধ করুন',
    targetCount: 'প্রশ্নের সংখ্যা',
    subjectFilter: 'বিষয় ফোকাস',
    difficultyFilter: 'কঠিনতা স্তর',

    question: 'প্রশ্ন',
    of: 'এর',
    section: 'বিভাগ',
    timeRemaining: 'বাকি সময়',
    languageToggle: 'ভাষা',
    markForReview: 'রিভিউ এর জন্য চিহ্নিত করুন',
    unmarkReview: 'চিহ্ন তুলুন',
    clearResponse: 'মুছুন',
    previous: 'পূর্ববর্তী',
    next: 'পরবর্তী',
    saveAndNext: 'সংরক্ষণ ও পরবর্তী',
    submitTest: 'টেস্ট জমা দিন',
    exitQuiz: 'প্রস্থান করুন',
    questionPalette: 'প্রশ্ন প্যালেট',
    legendAnswered: 'উত্তর দেওয়া হয়েছে',
    legendNotAnswered: 'উত্তর দেওয়া হয়নি',
    legendMarked: 'রিভিউর জন্য চিহ্নিত',
    legendAnsweredMarked: 'উত্তর সহ চিহ্নিত',
    legendNotVisited: 'দেখা হয়নি',
    askAiExplanation: 'AI দিয়ে ধাপে ধাপে সমাধান জানুন',
    shortcutTrick: 'শর্টকাট ট্রিক',
    explanation: 'বিস্তারিত সমাধান',
    submitConfirmTitle: 'আপনি কি টেস্ট জমা দিতে চান?',
    submitConfirmDesc: 'এখনও সময় বাকি আছে। আপনি কি নিশ্চিত?',
    totalAttempted: 'চেষ্টা করা হয়েছে',
    totalUnattempted: 'বাকি রয়েছে',
    totalMarked: 'চিহ্নিত করা হয়েছে',
    confirmSubmitBtn: 'হ্যাঁ, জমা দিন',
    cancelBtn: 'চালিয়ে যান',
    correctAnswer: 'সঠিক উত্তর',
    wrongAnswer: 'আপনার ভুল উত্তর',
    yourAnswer: 'আপনার উত্তর',

    resultTitle: 'টেস্ট ফলাফল রিপোর্ট',
    resultSubtitle: 'বিস্তারিত নির্ভুলতা ও নেগেটিভ মার্কিং বিশ্লেষণ।',
    totalScore: 'মোট নম্বর',
    accuracy: 'নির্ভুলতা',
    accuracyRate: 'নির্ভুলতার হার',
    speed: 'গতি (সেকেন্ড/প্রশ্ন)',
    timeTaken: 'ব্যয়িত সময়',
    correctCount: 'সঠিক উত্তর',
    incorrectCount: 'ভুল উত্তর',
    unattempted: 'বাকি প্রশ্ন',
    xpEarned: 'অর্জিত XP ও কয়েন',
    retakeTestBtn: 'আবার টেস্ট দিন',
    retakeTest: 'আবার টেস্ট দিন',
    exploreMoreMocks: 'অন্যান্য মক টেস্ট দেখুন',
    testSummary: 'টেস্ট সফলভাবে সম্পন্ন হয়েছে',
    correctSummary: 'সঠিক',
    incorrectSummary: 'ভুল',
    homeBtn: 'হোম পেজে ফিরুন',
    detailedReview: 'প্রশ্ন-ওয়ারি বিস্তারিত পর্যালোচনা',
    subjectBreakdown: 'বিষয়ভিত্তিক ফলাফল',
    filterAll: 'সকল প্রশ্ন',
    filterCorrect: 'শুধুমাত্র সঠিক',
    filterWrong: 'শুধুমাত্র ভুল',
    filterUnattempted: 'শুধুমাত্র অবশিষ্ট',

    typingTitle: '১-মিনিট টাইপিং গতি এরিনা',
    typingSubtitle: 'SSC CGL Tier-2 ও রেলওয়ে পরীক্ষার টাইপিং স্পিড টেস্ট সিমুলেটর।',
    typingArenaTitle: '১-মিনিট টাইপিং গতি এরিনা',
    typingArenaSubtitle: 'SSC CGL Tier-2 (27 WPM), SSC CHSL (35 WPM) এবং রেলওয়ের জন্য টাইপিং স্পিড পরীক্ষা করুন।',
    selectPassage: 'অনুচ্ছেদ বেছে নিন',
    targetWpm: 'টার্গেট WPM',
    timeLimit: 'সময়: ৬০ সেকেন্ড',
    startTypingPrompt: 'টাইপিং শুরু করতে বক্সে ক্লিক করুন...',
    liveWpm: 'বর্তমান WPM',
    netWpm: 'নেট গতি',
    netSpeed: 'নেট গতি',
    cpm: 'কিস্ট্রোক / মিনিট',
    accuracyPct: 'নির্ভুলতা',
    errors: 'ভুল',
    backspaces: 'ব্যাকস্পেস',
    timeLeft: 'সময় বাকি',
    restartTyping: 'পুনরায় শুরু করুন',
    restartOneMin: 'পুনরায় শুরু করুন (১ মিনিট)',
    completeTypingTest: 'টেস্ট সম্পন্ন করুন',
    keepTypingPrompt: 'মনোযোগ দিয়ে টাইপ করতে থাকুন...',
    clickToStartTyping: '১-মিনিটের পরীক্ষা শুরু করতে এখানে ক্লিক করে টাইপ শুরু করুন...',
    keystrokes: 'কিস্ট্রোক্স',
    typingPassed: '✓ পাস করেছেন',
    typingFailed: '✕ কাটঅফের নিচে',
    typingPassedDesc: 'অভিনন্দন! আপনি পরীক্ষায় উত্তীর্ণ হয়েছেন।',
    typingFailedDesc: 'অনুশীলন চালিয়ে যান! নির্ভুলতা বাড়ান।',

    dailyStreakTitle: 'দৈনিক রুটিন ও স্ট্রিক',
    dailyStreakSubtitle: 'নিয়মিত অনুশীলনের মাধ্যমে শৃঙ্খলা বজায় রাখুন।',
    dailyMissionsSubtitle: 'XP এবং কয়েন অর্জনের জন্য টাস্ক পূরণ করুন',
    currentStreakDays: 'দিনের স্ট্রিক',
    streakFreeze: 'স্ট্রিক ফ্রিজ',
    dailyMissionsTitle: 'আজকের দৈনিক মিশন',
    claimReward: 'পুরস্কার নিন',
    claimRewardBtn: 'পুরস্কার নিন',
    claimDailyCheckin: 'দৈনিক চেক-ইন দাবি করুন (+২৫ XP, +১০ কয়েন)',
    checkedInToday: '✓ আজকের চেক-ইন সম্পন্ন',
    claimed: 'নেওয়া হয়েছে',
    claimedBtn: 'নেওয়া হয়েছে',
    goToTaskBtn: 'টাস্কে যান',
    startDailyMiniQuiz: '১০ প্রশ্নের মিনি কুইজ শুরু করুন',
    bonusReward: 'বোনাস ৫০ XP',
    completedBadge: 'সম্পন্ন',
    activeBadge: 'সক্রিয়',

    leaderboardTitle: 'সর্বভারতীয় লিডারবোর্ড',
    leaderboardSubtitle: 'দেশজুড়ে প্রতিযোগীদের সাথে নিজেকে যাচাই করুন।',
    allIndiaRank: 'সর্বভারতীয় র\u200d্যাঙ্ক',
    weeklyRank: 'সাপ্তাহিক র\u200d্যাঙ্ক',
    weeklyCycle: 'সাপ্তাহিক চক্র',
    allTimeGlobal: 'সর্বকালীন গ্লোবাল',
    aspirantRank: 'জাতীয় অ্যাসপিরেন্ট র\u200d্যাঙ্ক',
    stateFilter: 'রাজ্য অনুসারে ফিল্টার',
    allStates: 'সকল রাজ্য',
    aspirantName: 'পরীক্ষার্থী',
    scorePts: 'পয়েন্ট',
    testsCompleted: 'সম্পন্ন টেস্ট',
    topPerformers: 'শীর্ষ পারফর্মার',
    you: 'আপনি',

    offlineTitle: '১০০% অফলাইন প্রশ্ন ব্যাংক',
    offlineSubtitle: 'ইন্টারনেট ছাড়াই সমস্ত প্রশ্নের উত্তর ও শর্টকাট ট্রিক দেখুন।',
    offlineBankTitle: '১০০% অফলাইন প্রশ্ন ব্যাংক',
    offlineBankSubtitle: 'সকল পরীক্ষার জন্য অফলাইন প্রশ্ন এবং সমাধান।',
    launchOfflineMock: 'অফলাইন মক টেস্ট শুরু করুন (৫০ প্রশ্ন)',
    searchOfflinePlaceholder: 'প্রশ্ন খুঁজুন...',
    revealSolution: 'সমাধান ও ট্রিক দেখুন',
    hideSolution: 'সমাধান লুকান',
    hideSolutionBtn: 'সমাধান লুকান',
    showSolutionBtn: 'সমাধান দেখুন',
    correctOption: 'সঠিক বিকল্প',
    verifiedShortcut: 'শর্টকাট ট্রিক',
    uniqueQuestionsTotal: 'উপলব্ধ অফলাইন প্রশ্ন',

    profileTitle: 'প্রোফাইল ও পরিসংখ্যান',
    targetExam: 'টার্গেট পরীক্ষা',
    targetExamLabel: 'টার্গেট পরীক্ষা',
    nameLabel: 'পুরো নাম',
    stateRegionLabel: 'রাজ্য / কেন্দ্রশাসিত অঞ্চল',
    selectAvatar: 'অবতার নির্বাচন করুন',
    saveChanges: 'পরিবর্তন সংরক্ষণ করুন',
    cancel: 'বাতিল',
    questionsSolved: 'সমাধান করা প্রশ্ন',
    typingSpeedBenchmark: 'সর্বোচ্চ টাইপিং স্পিড',
    achievementsBadges: 'কৃতিত্ব ও ব্যাজ',
    mockTestHistory: 'মক টেস্টের ইতিহাস',
    noMockHistory: 'এখনও কোনো টেস্ট দেওয়া হয়নি।',
    detailedAnalysis: 'পূর্ণ পর্যালোচনা',
    level: 'প্রস্তুতির স্তর',
    totalXp: 'মোট XP',
    studyTime: 'মোট পড়ার সময়',
    badgesTitle: 'ব্যাজ ও মাইলস্টোন',
    weakTopicsTitle: 'দুর্বল বিষয়',
    strongTopicsTitle: 'সবল বিষয়',
    recentTestsTitle: 'সাম্প্রতিক টেস্টের ইতিহাস',
    editProfile: 'প্রোফাইল সম্পাদনা',
    resetData: 'সব ডেটা মুছুন',

    settingsHeading: 'প্ল্যাটফর্ম সেটিংস',
    settingsSubtitle: 'শব্দ, থিম এবং ভাষা কাস্টমাইজ করুন।',
    primaryLangLabel: 'ভাষা নির্বাচন',
    primaryLanguage: 'প্ল্যাটফর্ম ইন্টারফেস ভাষা',
    soundEffects: 'সাউন্ড এফেক্ট',
    soundEffectsDesc: 'ক্লিক এবং টেস্ট সম্পন্ন হওয়ার শব্দ সক্রিয় করুন।',
    soundDesc: 'টাইমার এবং টেস্টের জন্য শব্দ',
    themeMode: 'থিম মোড',
    themeModeDesc: 'ডার্ক ও লাইট মোড পরিবর্তন করুন।',
    darkMode: 'ডার্ক মোড থিম',
    darkModeDesc: 'রাতের পড়াশোনার জন্য ডার্ক থিম',
    clearHistoryBtn: 'ইতিহাস মুছুন',
    clearHistory: 'ইতিহাস মুছুন',
    clearHistoryDesc: 'সকল টেস্টের রেকর্ড মুছে ফেলুন।',
    doneBtn: 'সংরক্ষণ ও বন্ধ করুন',

    aiGenTitle: 'AI মক টেস্ট জেনারেটর',
    aiGenSubtitle: 'Gemini 2.5 Flash দিয়ে যেকোনো বিষয়ে আনলিমিটেড মক টেস্ট তৈরি করুন।',
    aiMockGenerator: 'AI কাস্টম মক জেনারেটর',
    aiMockSubtitle: 'Gemini 2.5 Flash দ্বারা পরিচালিত নির্ভুল পরীক্ষা প্রশ্ন',
    selectExam: 'পরীক্ষা বেছে নিন',
    selectTargetExam: 'টার্গেট পরীক্ষা বেছে নিন',
    customTopic: 'কাস্টম টপিক / বিষয়',
    topicFocus: 'কাস্টম টপিক / বিষয়',
    topicPlaceholder: 'যেমন: লাভ ও ক্ষতি, মৌলিক অধিকার...',
    generateMockBtn: 'AI মক টেস্ট তৈরি করুন',
    generateMockTestBtn: 'AI মক জেনারেট ও শুরু করুন',
    generating: 'প্রশ্ন তৈরি হচ্ছে...',
    questionCount: 'প্রশ্নের সংখ্যা',
    difficulty: 'কঠিনতা স্তর',
    language: 'প্রশ্নের ভাষা'
  },

  te: {
    brandSubtitle: 'SSC • రైల్వే • బ్యాంకింగ్ ప్రిపరేషన్',
    govtExamBadge: 'ప్రభుత్వ పరీక్ష',
    mockTestsTab: 'మాక్ టెస్ట్‌లు',
    mockTestsBadge: '50-500 ప్రశ్నలు',
    typingArenaTab: 'టైపింగ్ ఎరీనా',
    typingArenaBadge: '1 నిమిషం',
    dailyStreakTab: 'డైలీ స్ట్రీక్',
    leaderboardTab: 'లీడర్‌బోర్డ్',
    offlineBankTab: 'ఆఫ్‌లైన్ బ్యాంక్',
    profileTab: 'ప్రొఫైల్ & టాస్క్‌లు',
    aiMockGenBtn: 'AI మాక్ జనరేటర్',
    soundToggle: 'శబ్దం',
    themeToggle: 'థీమ్',
    settingsTitle: 'సెట్టింగ్‌లు',
    languageSelect: 'భాష',
    studyStreak: 'స్టడీ స్ట్రీక్',
    aspirantCoins: 'ఆస్పిరెంట్ కాయిన్స్',

    heroTitle: 'ప్రభుత్వ ఉద్యోగ పరీక్షల్లో విజయం సాధించండి',
    heroHighlight: 'AI ఖచ్చితత్వం & రియల్ మాక్ టెస్ట్‌లతో',
    heroSubtitle: 'SSC CGL, RRB NTPC, బ్యాంకింగ్ మరియు రాష్ట్ర పరీక్షల కోసం పూర్తి టెస్ట్ సిరీస్ - పునరావృతం లేని ప్రశ్నలు & AI సొల్యూషన్స్.',
    searchExamPlaceholder: 'పరీక్షను శోధించండి (ఉదా. SSC CGL, RRB NTPC)...',
    allExams: 'అన్ని పరీక్షలు',
    sscExams: 'SSC పరీక్షలు',
    railwayExams: 'రైల్వే (RRB)',
    bankingExams: 'బ్యాంకింగ్ (IBPS/SBI)',
    defenseExams: 'డిఫెన్స్ & పోలీస్',
    statePcsExams: 'స్టేట్ PSC / PCS',
    allSubjects: 'అన్ని సబ్జెక్టులు',
    allDifficulties: 'అన్ని స్థాయిలు',
    easy: 'సులభం',
    moderate: 'మధ్యస్థం',
    hard: 'కఠినం',
    selectExamToPractice: 'పరీక్షను ఎంచుకుని ప్రాక్టీస్ ప్రారంభించండి',
    popularBadge: 'పాపులర్',
    questionsCount: 'ప్రశ్నలు',
    durationMins: 'నిమిషాలు',
    negativeMarking: 'నెగెటివ్ మార్కింగ్',
    marksPerQ: 'మార్కులు/ప్రశ్న',
    practiceMode: 'ప్రాక్టీస్ మోడ్',
    practiceModeDesc: 'ప్రతి ప్రశ్నకు తక్షణ సమాధానం మరియు షార్ట్‌కట్ ట్రిక్స్.',
    examMode: 'రియల్ ఎగ్జామ్ మోడ్',
    examModeDesc: 'కఠినమైన టైమర్, నెగెటివ్ మార్కింగ్ మరియు పూర్తి స్కోర్‌కార్డ్.',
    startTestBtn: 'టెస్ట్ ప్రారంభించండి',
    viewSyllabusBtn: 'సిలబస్ చూడండి',
    syllabusTitle: 'వివరణాత్మక పరీక్ష సిలబస్',
    close: 'మూసివేయి',
    targetCount: 'ప్రశ్నల సంఖ్య',
    subjectFilter: 'సబ్జెక్ట్ ఫోకస్',
    difficultyFilter: 'కఠినత స్థాయి',

    question: 'ప్రశ్న',
    of: 'లో',
    section: 'విభాగం',
    timeRemaining: 'మిగిలిన సమయం',
    languageToggle: 'భాష',
    markForReview: 'సమీక్ష కోసం గుర్తించండి',
    unmarkReview: 'గుర్తు తొలగించండి',
    clearResponse: 'స్పష్టంచేయి',
    previous: 'మునుపటి',
    next: 'తరువాతి',
    saveAndNext: 'సేవ్ & తరువాతి',
    submitTest: 'టెస్ట్ సమర్పించండి',
    exitQuiz: 'నిష్క్రమించు',
    questionPalette: 'ప్రశ్న ప్యాలెట్',
    legendAnswered: 'సమాధానమిచ్చారు',
    legendNotAnswered: 'సమాధానం ఇవ్వలేదు',
    legendMarked: 'సమీక్షకు గుర్తించబడింది',
    legendAnsweredMarked: 'సమాధానంతో గుర్తించబడింది',
    legendNotVisited: 'చూడలేదు',
    askAiExplanation: 'AI దశలవారీ వివరణ అడగండి',
    shortcutTrick: 'షార్ట్‌కట్ ట్రిక్',
    explanation: 'వివరణాత్మక పరిష్కారం',
    submitConfirmTitle: 'టెస్ట్ సమర్పించడానికి సిద్ధంగా ఉన్నారా?',
    submitConfirmDesc: 'ఇంకా సమయం ఉంది. మీరు ఖచ్చితంగా ముగించాలనుకుంటున్నారా?',
    totalAttempted: 'ప్రయత్నించినవి',
    totalUnattempted: 'ప్రయత్నించనివి',
    totalMarked: 'సమీక్షకు గుర్తించినవి',
    confirmSubmitBtn: 'అవును, సమర్పించు',
    cancelBtn: 'కొనసాగించు',
    correctAnswer: 'సరైన సమాధానం',
    wrongAnswer: 'తప్పు సమాధానం',
    yourAnswer: 'మీ సమాధానం',

    resultTitle: 'పరీక్ష పనితీరు నివేదిక',
    resultSubtitle: 'ఖచ్చితత్వం మరియు నెగెటివ్ మార్కింగ్ సమగ్ర విశ్లేషణ.',
    totalScore: 'మొత్తం స్కోర్',
    accuracy: 'ఖచ్చితత్వం',
    accuracyRate: 'ఖచ్చితత్వ రేటు',
    speed: 'వేగం (సెకన్లు/ప్రశ్న)',
    timeTaken: 'తీసుకున్న సమయం',
    correctCount: 'సరైనవి',
    incorrectCount: 'తప్పులు',
    unattempted: 'రాయనివి',
    xpEarned: 'పొందిన XP & కాయిన్స్',
    retakeTestBtn: 'మళ్లీ రాయండి',
    retakeTest: 'మళ్లీ రాయండి',
    exploreMoreMocks: 'మరిన్ని మాక్ టెస్ట్‌లు చూడండి',
    testSummary: 'టెస్ట్ విజయవంతంగా పూర్తయింది',
    correctSummary: 'సరైనవి',
    incorrectSummary: 'తప్పులు',
    homeBtn: 'హోమ్ పేజీకి వెళ్లండి',
    detailedReview: 'ప్రశ్నల వారీ సమీక్ష',
    subjectBreakdown: 'సబ్జెక్ట్ వారీ పనితీరు',
    filterAll: 'అన్ని ప్రశ్నలు',
    filterCorrect: 'సరైనవి మాత్రమే',
    filterWrong: 'తప్పులు మాత్రమే',
    filterUnattempted: 'రాయనివి మాత్రమే',

    typingTitle: '1-నిమిషం టైపింగ్ స్పీడ్ ఎరీనా',
    typingSubtitle: 'SSC CGL Tier-2 & రైల్వే టైపింగ్ స్పీడ్ టెస్ట్ సిమ్యులేటర్.',
    typingArenaTitle: '1-నిమిషం టైపింగ్ స్పీడ్ ఎరీనా',
    typingArenaSubtitle: 'SSC CGL Tier-2 (27 WPM), SSC CHSL (35 WPM) మరియు రైల్వే కోసం టైపింగ్ ప్రాక్టీస్ చేయండి.',
    selectPassage: 'పాసేజ్ ఎంచుకోండి',
    targetWpm: 'టార్గెట్ WPM',
    timeLimit: 'సమయం: 60 సెకన్లు',
    startTypingPrompt: 'టైపింగ్ ప్రారంభించడానికి బాక్స్‌పై క్లిక్ చేయండి...',
    liveWpm: 'ప్రస్తుత WPM',
    netWpm: 'నెట్ స్పీడ్',
    netSpeed: 'నెట్ స్పీడ్',
    cpm: 'కీస్ట్రోక్స్ / నిమిషం',
    accuracyPct: 'ఖచ్చితత్వం',
    errors: 'తప్పులు',
    backspaces: 'బ్యాక్‌స్పేస్‌లు',
    timeLeft: 'సమయం మిగిలింది',
    restartTyping: 'మళ్లీ ప్రారంభించు',
    restartOneMin: 'మళ్లీ ప్రారంభించు (1 నిమిషం)',
    completeTypingTest: 'టెస్ట్ పూర్తి చేయండి',
    keepTypingPrompt: 'ఏకాగ్రతతో టైప్ చేస్తూ ఉండండి...',
    clickToStartTyping: '1-నిమిషం పరీక్షను ప్రారంభించడానికి ఇక్కడ క్లిక్ చేసి టైప్ చేయండి...',
    keystrokes: 'కీస్ట్రోక్స్',
    typingPassed: '✓ ఉత్తీర్ణులయ్యారు',
    typingFailed: '✕ కటాఫ్ కంటే తక్కువ',
    typingPassedDesc: 'అభినందనలు! మీరు అర్హత సాధించారు.',
    typingFailedDesc: 'ప్రాక్టీస్ కొనసాగించండి! బ్యాక్‌స్పేస్‌లను తగ్గించండి.',

    dailyStreakTitle: 'డైలీ ఆస్పిరెంట్ రొటీన్ & స్ట్రీక్',
    dailyStreakSubtitle: 'రోజువారీ ప్రాక్టీస్ ద్వారా క్రమశిక్షణను పెంచుకోండి.',
    dailyMissionsSubtitle: 'XP మరియు కాయిన్స్ సంపాదించడానికి టాస్క్‌లను పూర్తి చేయండి',
    currentStreakDays: 'రోజుల స్ట్రీక్',
    streakFreeze: 'స్ట్రీక్ ఫ్రీజ్',
    dailyMissionsTitle: 'నేటి డైలీ మిషన్లు',
    claimReward: 'రివార్డ్ పొందండి',
    claimRewardBtn: 'రివార్డ్ పొందండి',
    claimDailyCheckin: 'డైలీ చెక్-ఇన్ తీసుకోండి (+25 XP, +10 కాయిన్స్)',
    checkedInToday: '✓ నేడు చెక్-ఇన్ పూర్తయింది',
    claimed: 'తీసుకున్నారు',
    claimedBtn: 'తీసుకున్నారు',
    goToTaskBtn: 'టాస్క్‌కి వెళ్లండి',
    startDailyMiniQuiz: '10 ప్రశ్నల క్విజ్ ప్రారంభించండి',
    bonusReward: 'బోనస్ 50 XP',
    completedBadge: 'పూర్తయింది',
    activeBadge: 'యాక్టివ్',

    leaderboardTitle: 'ఆల్-ఇండియా లీడర్‌బోర్డ్',
    leaderboardSubtitle: 'దేశవ్యాప్తంగా ఉన్న విద్యార్థులతో పోటీపడండి.',
    allIndiaRank: 'ఆల్ ఇండియా ర్యాంక్',
    weeklyRank: 'వీక్లీ ర్యాంక్',
    weeklyCycle: 'వీక్లీ సైకిల్',
    allTimeGlobal: 'ఆల్-టైమ్ గ్లోబల్',
    aspirantRank: 'నేషనల్ ఆస్పిరెంట్ ర్యాంక్',
    stateFilter: 'రాష్ట్రం వారీగా ఫిల్టర్',
    allStates: 'అన్ని రాష్ట్రాలు',
    aspirantName: 'అభ్యర్థి',
    scorePts: 'పాయింట్లు',
    testsCompleted: 'పూర్తయిన టెస్ట్‌లు',
    topPerformers: 'టాప్ పెర్ఫార్మర్లు',
    you: 'మీరు',

    offlineTitle: '100% ఆఫ్‌లైన్ ప్రశ్నల బ్యాంక్',
    offlineSubtitle: 'ఇంటర్నెట్ లేకుండా ప్రాక్టీస్ చేయండి మరియు షార్ట్‌కట్ ట్రిక్స్ చూడండి.',
    offlineBankTitle: '100% ఆఫ్‌లైన్ ప్రశ్నల బ్యాంక్',
    offlineBankSubtitle: 'అన్ని పరీక్షల కోసం ఆఫ్‌లైన్ ప్రశ్నలు మరియు పరిష్కారాలు.',
    launchOfflineMock: 'ఆఫ్‌లైన్ మాక్ టెస్ట్ ప్రారంభించండి (50 ప్రశ్నలు)',
    searchOfflinePlaceholder: 'ప్రశ్నలను శోధించండి...',
    revealSolution: 'పరిష్కారం & ట్రిక్ చూడండి',
    hideSolution: 'పరిష్కారం దాచండి',
    hideSolutionBtn: 'పరిష్కారం దాచండి',
    showSolutionBtn: 'పరిష్కారం చూడండి',
    correctOption: 'సరైన ఎంపిక',
    verifiedShortcut: 'షార్ట్‌కట్ ట్రిక్',
    uniqueQuestionsTotal: 'అందుబాటులో ఉన్న ఆఫ్‌లైన్ ప్రశ్నలు',

    profileTitle: 'ఆస్పిరెంట్ ప్రొఫైల్ & గణాంకాలు',
    targetExam: 'టార్గెట్ పరీక్ష',
    targetExamLabel: 'టార్గెట్ పరీక్ష',
    nameLabel: 'పూర్తి పేరు',
    stateRegionLabel: 'రాష్ట్రం / కేంద్రపాలిత ప్రాంతం',
    selectAvatar: 'అవతార్ ఎంచుకోండి',
    saveChanges: 'మార్పులను సేవ్ చేయండి',
    cancel: 'రద్దు చేయి',
    questionsSolved: 'పరిష్కరించిన ప్రశ్నలు',
    typingSpeedBenchmark: 'టాప్ టైపింగ్ వేగం',
    achievementsBadges: 'విజయాలు & బ్యాడ్జీలు',
    mockTestHistory: 'గత మాక్ టెస్ట్ రికార్డులు',
    noMockHistory: 'ఇంకా ఎలాంటి టెస్ట్‌లు రాయలేదు.',
    detailedAnalysis: 'పూర్తి సమీక్ష',
    level: 'ప్రిపరేషన్ స్థాయి',
    totalXp: 'మొత్తం XP',
    studyTime: 'స్టడీ సమయం',
    badgesTitle: 'బ్యాడ్జీలు',
    weakTopicsTitle: 'బలహీన అంశాలు',
    strongTopicsTitle: 'బలమైన అంశాలు',
    recentTestsTitle: 'ఇటీవలి టెస్ట్ హిస్టరీ',
    editProfile: 'ప్రొఫైల్ ఎడిట్ చేయండి',
    resetData: 'డేటా రీసెట్ చేయండి',

    settingsHeading: 'సెట్టింగ్‌లు',
    settingsSubtitle: 'ఆడియో, థీమ్ మరియు భాషను మార్చండి.',
    primaryLangLabel: 'భాష ఎంపిక',
    primaryLanguage: 'ప్లాట్‌ఫారమ్ భాష',
    soundEffects: 'సౌండ్ ఎఫెక్ట్స్',
    soundEffectsDesc: 'క్లిక్ మరియు టెస్ట్ పూర్తయిన శబ్దాలను ఆన్ చేయండి.',
    soundDesc: 'టైమర్ మరియు బటన్ల కోసం సౌండ్',
    themeMode: 'థీమ్ మోడ్',
    themeModeDesc: 'డార్క్ మరియు లైట్ మోడ్ మార్చండి.',
    darkMode: 'డార్క్ మోడ్ థీమ్',
    darkModeDesc: 'రాత్రి సమయ అధ్యయనం కోసం డార్క్ థీమ్',
    clearHistoryBtn: 'హిస్టరీ తొలగించు',
    clearHistory: 'హిస్టరీ తొలగించు',
    clearHistoryDesc: 'అన్ని టెస్ట్ రికార్డులను క్లియర్ చేయండి.',
    doneBtn: 'సేవ్ & క్లోజ్',

    aiGenTitle: 'AI మాక్ టెస్ట్ జనరేటర్',
    aiGenSubtitle: 'Gemini 2.5 Flash తో మీ అవసరాలకు అనుగుణంగా ప్రశ్నలను రూపొందించండి.',
    aiMockGenerator: 'AI కస్టమ్ మాక్ జనరేటర్',
    aiMockSubtitle: 'Gemini 2.5 Flash ద్వారా ప్రామాణికమైన పరీక్ష ప్రశ్నలు',
    selectExam: 'పరీక్షను ఎంచుకోండి',
    selectTargetExam: 'టార్గెట్ పరీక్షను ఎంచుకోండి',
    customTopic: 'అంశం / సబ్జెక్ట్',
    topicFocus: 'అంశం / సబ్జెక్ట్',
    topicPlaceholder: 'ఉదా: చక్రవడ్డీ, ప్రాథమిక హక్కులు...',
    generateMockBtn: 'AI మాక్ టెస్ట్ రూపొందించండి',
    generateMockTestBtn: 'AI మాక్ టెస్ట్ జనరేట్ చేయండి',
    generating: 'ప్రశ్నలు రూపొందుతున్నాయి...',
    questionCount: 'ప్రశ్నల సంఖ్య',
    difficulty: 'కఠినత స్థాయి',
    language: 'ప్రశ్నల భాష'
  },

  mr: {
    brandSubtitle: 'SSC • रेल्वे • बँकिंग परीक्षा तयारी',
    govtExamBadge: 'सरकारी परीक्षा',
    mockTestsTab: 'मॉक टेस्ट',
    mockTestsBadge: '५०-५०० प्रश्न',
    typingArenaTab: 'टायपिंग अरेना',
    typingArenaBadge: '१ मिनिट',
    dailyStreakTab: 'दैनिक स्ट्रीक',
    leaderboardTab: 'लीडरबोर्ड',
    offlineBankTab: 'ऑफलाइन बँक',
    profileTab: 'प्रोफाइल आणि कार्ये',
    aiMockGenBtn: 'AI मॉक जनरेटर',
    soundToggle: 'आवाज',
    themeToggle: 'थीम',
    settingsTitle: 'सेटिंग्ज',
    languageSelect: 'भाषा',
    studyStreak: 'अभ्यास स्ट्रीक',
    aspirantCoins: 'नाणी (Coins)',

    heroTitle: 'सरकारी परीक्षेत यश मिळवा',
    heroHighlight: 'AI अचूकता आणि खऱ्या मॉक टेस्टसह',
    heroSubtitle: 'SSC CGL, RRB NTPC, बँकिंग व राज्य परीक्षांसाठी संपूर्ण टेस्ट सिरीज - शून्य पुनरावृत्ती आणि AI स्पष्टीकरणासह.',
    searchExamPlaceholder: 'परीक्षा शोधा (उदा. SSC CGL, RRB NTPC, IBPS PO)...',
    allExams: 'सर्व परीक्षा',
    sscExams: 'SSC परीक्षा',
    railwayExams: 'रेल्वे (RRB)',
    bankingExams: 'बँकिंग (IBPS/SBI)',
    defenseExams: 'संरक्षण आणि पोलीस',
    statePcsExams: 'राज्य सेवा / MPSC',
    allSubjects: 'सर्व विषय',
    allDifficulties: 'सर्व काठिण्य पातळी',
    easy: 'सोपे',
    moderate: 'मध्यम',
    hard: 'कठीण',
    selectExamToPractice: 'परीक्षा निवडा आणि सराव सुरू करा',
    popularBadge: 'लोकप्रिय',
    questionsCount: 'प्रश्न',
    durationMins: 'मिनिटे',
    negativeMarking: 'निगेटिव्ह मार्किंग',
    marksPerQ: 'गुण/प्रश्न',
    practiceMode: 'सराव मोड',
    practiceModeDesc: 'प्रत्येक प्रश्नानंतर त्वरित उत्तर आणि शॉर्टकट ट्रिक्स.',
    examMode: 'खरा परीक्षा मोड',
    examModeDesc: 'टायमर, निगेटिव्ह मार्किंग आणि तपशीलवार निकाल.',
    startTestBtn: 'आताच टेस्ट सुरू करा',
    viewSyllabusBtn: 'अभ्यासक्रम पहा',
    syllabusTitle: 'परीक्षेचा सविस्तर अभ्यासक्रम',
    close: 'बंद करा',
    targetCount: 'प्रश्नांची संख्या',
    subjectFilter: 'विषय फोकस',
    difficultyFilter: 'काठिण्य पातळी',

    question: 'प्रश्न',
    of: 'पैकी',
    section: 'विभाग',
    timeRemaining: 'उरलेला वेळ',
    languageToggle: 'भाषा',
    markForReview: 'पुनरावलोकनासाठी चिन्हांकित करा',
    unmarkReview: 'चिन्ह काढा',
    clearResponse: 'उत्तर साफ करा',
    previous: 'मागील',
    next: 'पुढील',
    saveAndNext: 'जतन करा आणि पुढे जा',
    submitTest: 'टेस्ट सबमिट करा',
    exitQuiz: 'बाहेर पडा',
    questionPalette: 'प्रश्न पॅलेट',
    legendAnswered: 'उत्तर दिले',
    legendNotAnswered: 'उत्तर दिले नाही',
    legendMarked: 'पुनरावलोकनासाठी चिन्हांकित',
    legendAnsweredMarked: 'उत्तर देऊन चिन्हांकित',
    legendNotVisited: 'पाहिले नाही',
    askAiExplanation: 'AI कडून टप्प्याटप्प्याने समजून घ्या',
    shortcutTrick: 'शॉर्टकट ट्रिक',
    explanation: 'तपशीलवार स्पष्टीकरण',
    submitConfirmTitle: 'तुम्ही टेस्ट सबमिट करण्यास तयार आहात का?',
    submitConfirmDesc: 'अजून वेळ शिल्लक आहे. तुम्हाला खात्री आहे का?',
    totalAttempted: 'सोडवलेले',
    totalUnattempted: 'न सोडवलेले',
    totalMarked: 'चिन्हांकित केलेले',
    confirmSubmitBtn: 'होय, सबमिट करा',
    cancelBtn: 'चालू ठेवा',
    correctAnswer: 'योग्य उत्तर',
    wrongAnswer: 'तुमचे चुकीचे उत्तर',
    yourAnswer: 'तुमचे उत्तर',

    resultTitle: 'टेस्ट कामगिरी अहवाल',
    resultSubtitle: 'अचूकता आणि निगेटिव्ह मार्किंगचे सविस्तर विश्लेषण.',
    totalScore: 'एकूण गुण',
    accuracy: 'अचूकता',
    accuracyRate: 'अचूकतेचा दर',
    speed: 'वेग (सेकंद/प्रश्न)',
    timeTaken: 'लागलेला वेळ',
    correctCount: 'बरोबर उत्तरे',
    incorrectCount: 'चुकीची उत्तरे',
    unattempted: 'न सोडवलेले',
    xpEarned: 'मिळवलेले XP आणि कॉइन्स',
    retakeTestBtn: 'पुन्हा टेस्ट द्या',
    retakeTest: 'पुन्हा टेस्ट द्या',
    exploreMoreMocks: 'इतर मॉक टेस्ट पहा',
    testSummary: 'टेस्ट यशस्वीरित्या पूर्ण झाली',
    correctSummary: 'बरोबर',
    incorrectSummary: 'चुका',
    homeBtn: 'मुख्य पानावर जा',
    detailedReview: 'तपशीलवार प्रश्न पुनरावलोकन',
    subjectBreakdown: 'विषयनिहाय कामगिरी',
    filterAll: 'सर्व प्रश्न',
    filterCorrect: 'फक्त बरोबर',
    filterWrong: 'फक्त चूक',
    filterUnattempted: 'फक्त न सोडवलेले',

    typingTitle: '१-मिनिट टायपिंग स्पीड अरेना',
    typingSubtitle: 'SSC CGL टियर-२ व रेल्वे टायपिंग स्पीड टेस्ट सिम्युलेटर.',
    typingArenaTitle: '१-मिनिट टायपिंग स्पीड अरेना',
    typingArenaSubtitle: 'SSC CGL Tier-2 (27 WPM), SSC CHSL (35 WPM) आणि रेल्वेसाठी टायपिंगचा सराव करा.',
    selectPassage: 'उतारा निवडा',
    targetWpm: 'लक्ष्य WPM',
    timeLimit: 'वेळ: ६० सेकंद',
    startTypingPrompt: 'टायपिंग सुरू करण्यासाठी बॉक्सवर क्लिक करा...',
    liveWpm: 'सध्याचा WPM',
    netWpm: 'नेट वेग',
    netSpeed: 'नेट वेग',
    cpm: 'कीस्ट्रोक्स / मिनिट',
    accuracyPct: 'अचूकता',
    errors: 'चुका',
    backspaces: 'बॅकस्पेस',
    timeLeft: 'उरलेला वेळ',
    restartTyping: 'पुन्हा सुरू करा',
    restartOneMin: 'पुन्हा सुरू करा (१ मिनिट)',
    completeTypingTest: 'टेस्ट पूर्ण करा',
    keepTypingPrompt: 'एकाग्रतेने टाईप करत रहा...',
    clickToStartTyping: '१-मिनिटांची चाचणी सुरू करण्यासाठी येथे क्लिक करून टाईप करा...',
    keystrokes: 'कीस्ट्रोक्स',
    typingPassed: '✓ उत्तीर्ण (पास)',
    typingFailed: '✕ कटऑफपेक्षा कमी',
    typingPassedDesc: 'अभिनंदन! तुम्ही सरकारी टायपिंग चाचणी उत्तीर्ण केली आहे.',
    typingFailedDesc: 'सराव सुरू ठेवा! अचूकतेवर भर द्या.',

    dailyStreakTitle: 'दैनिक दिनचर्या आणि स्ट्रीक',
    dailyStreakSubtitle: 'दररोज सराव करून सातत्य टिकवून ठेवा.',
    dailyMissionsSubtitle: 'XP आणि नाणी मिळवण्यासाठी कार्ये पूर्ण करा',
    currentStreakDays: 'दिवसांची स्ट्रीक',
    streakFreeze: 'स्ट्रीक फ्रीझ',
    dailyMissionsTitle: 'आजची दैनिक कार्ये',
    claimReward: 'बक्षीस मिळवा',
    claimRewardBtn: 'बक्षीस मिळवा',
    claimDailyCheckin: 'दैनिक चेक-इन मिळवा (+२५ XP, +१० नाणी)',
    checkedInToday: '✓ आजचे चेक-इन पूर्ण झाले',
    claimed: 'मिळवले',
    claimedBtn: 'मिळवले',
    goToTaskBtn: 'कार्यावर जा',
    startDailyMiniQuiz: '१० प्रश्नांची मिनी क्विझ सुरू करा',
    bonusReward: 'बोनस ५० XP',
    completedBadge: 'पूर्ण',
    activeBadge: 'सक्रिय',

    leaderboardTitle: 'अखिल भारतीय लीडरबोर्ड',
    leaderboardSubtitle: 'देशभरातील हजारो विद्यार्थ्यांसोबत स्वतःची तुलना करा.',
    allIndiaRank: 'अखिल भारतीय रँक',
    weeklyRank: 'साप्ताहिक रँक',
    weeklyCycle: 'साप्ताहिक चक्र',
    allTimeGlobal: 'सर्वकालीन ग्लोबल',
    aspirantRank: 'राष्ट्रीय रँक',
    stateFilter: 'राज्यानुसार फिल्टर',
    allStates: 'सर्व राज्ये',
    aspirantName: 'विद्यार्थी',
    scorePts: 'गुण',
    testsCompleted: 'पूर्ण टेस्ट्स',
    topPerformers: 'आठवड्यातील सर्वोत्कृष्ट',
    you: 'तुम्ही',

    offlineTitle: '१००% ऑफलाइन प्रश्न बँक',
    offlineSubtitle: 'इंटरनेटशिवाय सर्व विषयांचे प्रश्न, उत्तरे आणि ट्रिक्स उपलब्ध.',
    offlineBankTitle: '१००% ऑफलाइन प्रश्न बँक',
    offlineBankSubtitle: 'सर्व परीक्षांसाठी ऑफलाइन प्रश्न आणि सत्यापित स्पष्टीकरणे.',
    launchOfflineMock: 'ऑफलाइन मॉक टेस्ट सुरू करा (५० प्रश्न)',
    searchOfflinePlaceholder: 'प्रश्न शोधा...',
    revealSolution: 'स्पष्टीकरण आणि ट्रिक पहा',
    hideSolution: 'स्पष्टीकरण लपवा',
    hideSolutionBtn: 'स्पष्टीकरण लपवा',
    showSolutionBtn: 'स्पष्टीकरण पहा',
    correctOption: 'योग्य पर्याय',
    verifiedShortcut: 'शॉर्टकट ट्रिक',
    uniqueQuestionsTotal: 'उपलब्ध ऑफलाइन प्रश्न',

    profileTitle: 'प्रोफाइल आणि सांख्यिकी',
    targetExam: 'लक्ष्य परीक्षा',
    targetExamLabel: 'लक्ष्य परीक्षा',
    nameLabel: 'पूर्ण नाव',
    stateRegionLabel: 'राज्य / केंद्रशासित प्रदेश',
    selectAvatar: 'अवतार निवडा',
    saveChanges: 'बदल जतन करा',
    cancel: 'रद्द करा',
    questionsSolved: 'सोडवलेले प्रश्न',
    typingSpeedBenchmark: 'सर्वोत्तम टायपिंग वेग',
    achievementsBadges: 'उपलब्धी आणि बॅजेस',
    mockTestHistory: 'मॉक टेस्ट इतिहास',
    noMockHistory: 'अद्याप कोणतीही टेस्ट दिलेली नाही.',
    detailedAnalysis: 'पूर्ण आढावा',
    level: 'तयारीची पातळी',
    totalXp: 'एकूण XP',
    studyTime: 'अभ्यासाचा वेळ',
    badgesTitle: 'बॅजेस',
    weakTopicsTitle: 'कमकुवत विषय',
    strongTopicsTitle: 'मजबूत विषय',
    recentTestsTitle: 'मागील टेस्ट इतिहास',
    editProfile: 'प्रोफाइल संपादित करा',
    resetData: 'सर्व डेटा रीसेट करा',

    settingsHeading: 'सेटिंग्ज',
    settingsSubtitle: 'आवाज, थीम आणि भाषा बदला.',
    primaryLangLabel: 'भाषा निवडा',
    primaryLanguage: 'प्लॅटफॉर्म इंटरफेस भाषा',
    soundEffects: 'ध्वनी प्रभाव',
    soundEffectsDesc: 'क्लिक आणि निकाल आल्यावर आवाज ऐका.',
    soundDesc: 'टायमर आणि बटनांसाठी आवाज',
    themeMode: 'थीम मोड',
    themeModeDesc: 'डार्क आणि लाइट मोड बदला.',
    darkMode: 'डार्क मोड थीम',
    darkModeDesc: 'रात्रीच्या अभ्यासासाठी डार्क थीम',
    clearHistoryBtn: 'इतिहास पुसा',
    clearHistory: 'इतिहास पुसा',
    clearHistoryDesc: 'सर्व टेस्ट रेकॉर्ड हटवा.',
    doneBtn: 'जतन करा आणि बंद करा',

    aiGenTitle: 'AI मॉक टेस्ट जनरेटर',
    aiGenSubtitle: 'Gemini 2.5 Flash च्या मदतीने नवीन प्रश्न तयार करा.',
    aiMockGenerator: 'AI सानुकूल मॉक जनरेटर',
    aiMockSubtitle: 'Gemini 2.5 Flash द्वारे अस्सल परीक्षा प्रश्न',
    selectExam: 'परीक्षा निवडा',
    selectTargetExam: 'लक्ष्य परीक्षा निवडा',
    customTopic: 'विषय / घटक',
    topicFocus: 'विषय / घटक',
    topicPlaceholder: 'उदा: चक्रवाढ व्याज, मूलभूत हक्क...',
    generateMockBtn: 'AI मॉक टेस्ट तयार करा',
    generateMockTestBtn: 'AI मॉक तयार करा आणि सुरू करा',
    generating: 'प्रश्न तयार केले जात आहेत...',
    questionCount: 'प्रश्नांची संख्या',
    difficulty: 'काठिण्य पातळी',
    language: 'प्रश्नाची भाषा'
  },

  ta: {
    brandSubtitle: 'SSC • ரயில்வே • வங்கித் தேர்வு பயிற்சி',
    govtExamBadge: 'அரசுத் தேர்வு',
    mockTestsTab: 'மாதிரித் தேர்வுகள்',
    mockTestsBadge: '50-500 வினாக்கள்',
    typingArenaTab: 'டைப்பிங் அரங்கம்',
    typingArenaBadge: '1 நிமிடம்',
    dailyStreakTab: 'தினசரி ஸ்ட்ரீக்',
    leaderboardTab: 'லீடர்போர்டு',
    offlineBankTab: 'ஆஃப்லைன் வங்கி',
    profileTab: 'சுயவிவரம் & பணிகள்',
    aiMockGenBtn: 'AI மாதிரி ஜெனரேட்டர்',
    soundToggle: 'ஒலி',
    themeToggle: 'தீம்',
    settingsTitle: 'அமைப்புகள்',
    languageSelect: 'மொழி',
    studyStreak: 'படிப்பு ஸ்ட்ரீக்',
    aspirantCoins: 'நாணயங்கள் (Coins)',

    heroTitle: 'அரசுத் தேர்வுகளில் வெற்றி பெறுங்கள்',
    heroHighlight: 'AI துல்லியத்துடன் கூடிய மாதிரித் தேர்வுகள்',
    heroSubtitle: 'SSC CGL, RRB NTPC, வங்கித் தேர்வுகளுக்கான முழுமையான டெஸ்ட் தொடர் - மீண்டும் வராத கேள்விகள் மற்றும் AI விளக்கம்.',
    searchExamPlaceholder: 'தேர்வை தேடவும் (எ.கா. SSC CGL, RRB NTPC)...',
    allExams: 'அனைத்து தேர்வுகள்',
    sscExams: 'SSC தேர்வுகள்',
    railwayExams: 'ரயில்வே (RRB)',
    bankingExams: 'வங்கி (IBPS/SBI)',
    defenseExams: 'பாதுகாப்பு & காவல்துறை',
    statePcsExams: 'மாநில TNPSC / PCS',
    allSubjects: 'அனைத்து பாடங்கள்',
    allDifficulties: 'அனைத்து நிலைகள்',
    easy: 'எளிது',
    moderate: 'நடுத்தரம்',
    hard: 'கடினம்',
    selectExamToPractice: 'தேர்வைத் தேர்ந்தெடுத்து பயிற்சியைத் தொடங்கவும்',
    popularBadge: 'பிரபலமானது',
    questionsCount: 'கேள்விகள்',
    durationMins: 'நிமிடங்கள்',
    negativeMarking: 'நெகடிவ் மதிப்பெண்',
    marksPerQ: 'மதிப்பெண்/கேள்வி',
    practiceMode: 'பயிற்சி முறை',
    practiceModeDesc: 'உடனடி பதில் சரிபார்ப்பு மற்றும் குறுக்குவழிகள்.',
    examMode: 'உண்மையான தேர்வு முறை',
    examModeDesc: 'டைமர், நெகடிவ் மதிப்பெண்கள் மற்றும் முழுமையான மதிப்பெண் அட்டை.',
    startTestBtn: 'தேர்வைத் தொடங்கவும்',
    viewSyllabusBtn: 'பாடத்திட்டத்தைப் பார்க்கவும்',
    syllabusTitle: 'தேர்வு பாடத்திட்டம் மற்றும் மாதிரி',
    close: 'மூடு',
    targetCount: 'கேள்விகளின் எண்ணிக்கை',
    subjectFilter: 'பாட கவனம்',
    difficultyFilter: 'கடினத்தன்மை நிலை',

    question: 'கேள்வி',
    of: 'இல்',
    section: 'பிரிவு',
    timeRemaining: 'மீதமுள்ள நேரம்',
    languageToggle: 'மொழி',
    markForReview: 'மறுஆய்வுக்குக் குறிக்கவும்',
    unmarkReview: 'குறியை நீக்கு',
    clearResponse: 'அழி',
    previous: 'முந்தைய',
    next: 'அடுத்தது',
    saveAndNext: 'சேமி & அடுத்தது',
    submitTest: 'சமர்ப்பிக்கவும்',
    exitQuiz: 'வெளியேறு',
    questionPalette: 'கேள்வி பலகை',
    legendAnswered: 'பதிலளிக்கப்பட்டது',
    legendNotAnswered: 'பதிலளிக்கப்படவில்லை',
    legendMarked: 'மறுஆய்வுக்குக் குறிக்கப்பட்டது',
    legendAnsweredMarked: 'பதிலளித்து குறிக்கப்பட்டது',
    legendNotVisited: 'பார்க்கப்படவில்லை',
    askAiExplanation: 'AI விளக்கத்தைக் கேட்கவும்',
    shortcutTrick: 'குறுக்குவழி முறை',
    explanation: 'முழுமையான விளக்கம்',
    submitConfirmTitle: 'தேர்வைச் சமர்ப்பிக்கத் தயாரா?',
    submitConfirmDesc: 'இன்னும் நேரம் உள்ளது. நிச்சயமாக முடிக்க விரும்புகிறீர்களா?',
    totalAttempted: 'பதிலளித்தவை',
    totalUnattempted: 'பதிலளிக்காதவை',
    totalMarked: 'குறிக்கப்பட்டவை',
    confirmSubmitBtn: 'ஆம், சமர்ப்பி',
    cancelBtn: 'தொடரவும்',
    correctAnswer: 'சரியான பதில்',
    wrongAnswer: 'தவறான பதில்',
    yourAnswer: 'உங்கள் பதில்',

    resultTitle: 'தேர்வு முடிவுகள் அறிக்கை',
    resultSubtitle: 'துல்லியம் மற்றும் நெகடிவ் மதிப்பெண் பற்றிய விரிவான அறிக்கை.',
    totalScore: 'மொத்த மதிப்பெண்',
    accuracy: 'துல்லியம்',
    accuracyRate: 'துல்லிய விகிதம்',
    speed: 'வேகம் (விநாடி/கேள்வி)',
    timeTaken: 'எடுத்துக்கொண்ட நேரம்',
    correctCount: 'சரியானவை',
    incorrectCount: 'தவறானவை',
    unattempted: 'எழுதாதவை',
    xpEarned: 'பெற்ற XP & நாணயங்கள்',
    retakeTestBtn: 'மீண்டும் எழுதவும்',
    retakeTest: 'மீண்டும் எழுதவும்',
    exploreMoreMocks: 'பிற மாதிரித் தேர்வுகள்',
    testSummary: 'தேர்வு வெற்றிகரமாக முடிந்தது',
    correctSummary: 'சரியானவை',
    incorrectSummary: 'தவறுகள்',
    homeBtn: 'முகப்புப் பக்கம் செல்லவும்',
    detailedReview: 'கேள்வி வாரியான ஆய்வு',
    subjectBreakdown: 'பாட வாரியான செயல்திறன்',
    filterAll: 'அனைத்து கேள்விகள்',
    filterCorrect: 'சரியானவை மட்டும்',
    filterWrong: 'தவறானவை மட்டும்',
    filterUnattempted: 'எழுதாதவை மட்டும்',

    typingTitle: '1-நிமிட தட்டச்சு வேக அரங்கம்',
    typingSubtitle: 'SSC CGL Tier-2 & ரயில்வே தட்டச்சு தேர்வு சிமுலேட்டர்.',
    typingArenaTitle: '1-நிமிட தட்டச்சு வேக அரங்கம்',
    typingArenaSubtitle: 'SSC CGL Tier-2 (27 WPM), SSC CHSL (35 WPM) மற்றும் ரயில்வேக்கான தட்டச்சு வேகப் பயிற்சி.',
    selectPassage: 'பகுதியைத் தேர்ந்தெடுக்கவும்',
    targetWpm: 'இலக்கு WPM',
    timeLimit: 'நேரம்: 60 விநாடிகள்',
    startTypingPrompt: 'தட்டச்சு செய்ய பெட்டியில் கிளிக் செய்யவும்...',
    liveWpm: 'தற்போதைய WPM',
    netWpm: 'நிகர வேகம்',
    netSpeed: 'நிகர வேகம்',
    cpm: 'விசை அழுத்தங்கள் / நிமிடம்',
    accuracyPct: 'துல்லியம்',
    errors: 'பிழைகள்',
    backspaces: 'பேக்ஸ்பேஸ்',
    timeLeft: 'மீதமுள்ள நேரம்',
    restartTyping: 'மீண்டும் தொடங்கவும்',
    restartOneMin: 'மீண்டும் தொடங்கு (1 நிமிடம்)',
    completeTypingTest: 'தேர்வை முடிக்கவும்',
    keepTypingPrompt: 'கவனத்துடன் தட்டச்சு செய்யவும்...',
    clickToStartTyping: '1 நிமிட தேர்வைத் தொடங்க இங்கே கிளிக் செய்து தட்டச்சு செய்யவும்...',
    keystrokes: 'விசை அழுத்தங்கள்',
    typingPassed: '✓ தேர்ச்சி பெற்றார்',
    typingFailed: '✕ கட்-ஆஃப் குறைவாக உள்ளது',
    typingPassedDesc: 'வாழ்த்துகள்! நீங்கள் அரசுத் தேர்வு தகுதியை எட்டிவிட்டீர்கள்.',
    typingFailedDesc: 'தொடர்ந்து பயிற்சி செய்யுங்கள்! பேக்ஸ்பேஸைக் குறைக்கவும்.',

    dailyStreakTitle: 'தினசரி பயிற்சி & ஸ்ட்ரீக்',
    dailyStreakSubtitle: 'தினமும் பயிற்சி செய்து தொடர்ச்சியைப் பேணுங்கள்.',
    dailyMissionsSubtitle: 'XP மற்றும் நாணயங்களைப் பெற பணிகளை முடிக்கவும்',
    currentStreakDays: 'நாட்கள் ஸ்ட்ரீக்',
    streakFreeze: 'ஸ்ட்ரீக் ஃப்ரீஸ்',
    dailyMissionsTitle: 'இன்றைய தினசரி பணிகள்',
    claimReward: 'வெகுமதியைப் பெறுக',
    claimRewardBtn: 'வெகுமதியைப் பெறுக',
    claimDailyCheckin: 'தினசரி செக்-இன் பெறுக (+25 XP, +10 நாணயங்கள்)',
    checkedInToday: '✓ இன்றைய செக்-இன் முடிந்தது',
    claimed: 'பெறப்பட்டது',
    claimedBtn: 'பெறப்பட்டது',
    goToTaskBtn: 'பணிக்குச் செல்லவும்',
    startDailyMiniQuiz: '10 கேள்விகள் கொண்ட வினாடி வினா',
    bonusReward: 'போனஸ் 50 XP',
    completedBadge: 'முடிந்தது',
    activeBadge: 'செயலில்',

    leaderboardTitle: 'அகில இந்திய லீடர்போர்டு',
    leaderboardSubtitle: 'நாடு முழுவதிலும் உள்ள மாணவர்களுடன் போட்டியிடுங்கள்.',
    allIndiaRank: 'அகில இந்திய ரேங்க்',
    weeklyRank: 'வாராந்திர ரேங்க்',
    weeklyCycle: 'வாராந்திர சுழற்சி',
    allTimeGlobal: 'எல்லா நேரத்திலும் குளோபல்',
    aspirantRank: 'தேசிய ரேங்க்',
    stateFilter: 'மாநில வாரியாக வடிகட்டவும்',
    allStates: 'அனைத்து மாநிலங்கள்',
    aspirantName: 'மாணவர்',
    scorePts: 'புள்ளிகள்',
    testsCompleted: 'முடிந்த தேர்வுகள்',
    topPerformers: 'வாரத்தின் சிறந்த மாணவர்கள்',
    you: 'நீங்கள்',

    offlineTitle: '100% ஆஃப்லைன் கேள்வி வங்கி',
    offlineSubtitle: 'இணையம் இல்லாமல் அனைத்து வினாக்கள், விடைகள் மற்றும் குறுக்குவழிகள்.',
    offlineBankTitle: '100% ஆஃப்லைன் கேள்வி வங்கி',
    offlineBankSubtitle: 'அனைத்து தேர்வுகளுக்கான ஆஃப்லைன் கேள்விகள் மற்றும் துல்லியமான தீர்வுகள்.',
    launchOfflineMock: 'ஆஃப்லைன் மாதிரித் தேர்வைத் தொடங்கவும் (50 கேள்விகள்)',
    searchOfflinePlaceholder: 'கேள்விகளைத் தேடவும்...',
    revealSolution: 'விளக்கத்தைக் காட்டு',
    hideSolution: 'விளக்கத்தை மறை',
    hideSolutionBtn: 'விளக்கத்தை மறை',
    showSolutionBtn: 'விளக்கத்தைக் காட்டு',
    correctOption: 'சரியான விடை',
    verifiedShortcut: 'குறுக்குவழி முறை',
    uniqueQuestionsTotal: 'கிடைக்கும் ஆஃப்லைன் கேள்விகள்',

    profileTitle: 'சுயவிவரம் & புள்ளிவிவரங்கள்',
    targetExam: 'இலக்கு தேர்வு',
    targetExamLabel: 'இலக்கு தேர்வு',
    nameLabel: 'முழு பெயர்',
    stateRegionLabel: 'மாநிலம் / யூனியன் பிரதேசம்',
    selectAvatar: 'அவதாரைத் தேர்ந்தெடுக்கவும்',
    saveChanges: 'மாற்றங்களைச் சேமிக்கவும்',
    cancel: 'ரத்து செய்',
    questionsSolved: 'தீர்க்கப்பட்ட கேள்விகள்',
    typingSpeedBenchmark: 'உயர் தட்டச்சு வேகம்',
    achievementsBadges: 'சாதனைகள் & பேட்ஜ்கள்',
    mockTestHistory: 'முந்தைய மாதிரித் தேர்வுகள்',
    noMockHistory: 'இதுவரை எந்தத் தேர்வும் எழுதப்படவில்லை.',
    detailedAnalysis: 'முழு ஆய்வு',
    level: 'தயாரிப்பு நிலை',
    totalXp: 'மொத்த XP',
    studyTime: 'படிப்பு நேரம்',
    badgesTitle: 'பேட்ஜ்கள்',
    weakTopicsTitle: 'பலவீனமான பாடங்கள்',
    strongTopicsTitle: 'வலுவான பாடங்கள்',
    recentTestsTitle: 'முந்தைய தேர்வு வரலாறு',
    editProfile: 'சுயவிவரத்தைத் திருத்து',
    resetData: 'தரவை மீட்டமை',

    settingsHeading: 'அமைப்புகள்',
    settingsSubtitle: 'ஒலி, தீம் மற்றும் மொழியைத் தனிப்பயனாக்கவும்.',
    primaryLangLabel: 'மொழி தேர்வு',
    primaryLanguage: 'தள இடைமுக மொழி',
    soundEffects: 'ஒலி விளைவுகள்',
    soundEffectsDesc: 'பொத்தான்கள் மற்றும் தேர்வு முடிவுகளுக்கான ஒலி.',
    soundDesc: 'டைமர் மற்றும் தேர்வுக்கான ஒலி',
    themeMode: 'தீம் முறை',
    themeModeDesc: 'டார்க் மற்றும் லைட் பயன்முறைக்கு மாறவும்.',
    darkMode: 'டார்க் மோட் தீம்',
    darkModeDesc: 'இரவு நேர படிப்புக்கான டார்க் தீம்',
    clearHistoryBtn: 'வரலாற்றை அழி',
    clearHistory: 'வரலாற்றை அழி',
    clearHistoryDesc: 'அனைத்து தேர்வு பதிவுகளையும் அழிக்கவும்.',
    doneBtn: 'சேமித்து மூடு',

    aiGenTitle: 'AI மாதிரித் தேர்வு ஜெனரேட்டர்',
    aiGenSubtitle: 'Gemini 2.5 Flash மூலம் வரம்பற்ற கேள்விகளை உருவாக்கவும்.',
    aiMockGenerator: 'AI தனிப்பயன் மாதிரி ஜெனரேட்டர்',
    aiMockSubtitle: 'Gemini 2.5 Flash மூலம் உண்மையான தேர்வு கேள்விகள்',
    selectExam: 'தேர்வைத் தேர்ந்தெடுக்கவும்',
    selectTargetExam: 'இலக்கு தேர்வைத் தேர்ந்தெடுக்கவும்',
    customTopic: 'விருப்பப் பாடம்',
    topicFocus: 'விருப்பப் பாடம்',
    topicPlaceholder: 'எ.கா: கூட்டு வட்டி, அடிப்படை உரிமைகள்...',
    generateMockBtn: 'AI மாதிரித் தேர்வை உருவாக்கு',
    generateMockTestBtn: 'AI மாதிரி தேர்வை உருவாக்கி தொடங்கவும்',
    generating: 'வினாக்கள் உருவாக்கப்படுகின்றன...',
    questionCount: 'கேள்விகளின் எண்ணிக்கை',
    difficulty: 'கடினத்தன்மை நிலை',
    language: 'கேள்வி மொழி'
  }
};

export function getTranslation(lang?: LanguageCode): TranslationDictionary {
  if (!lang || !TRANSLATIONS[lang]) {
    return TRANSLATIONS.en;
  }
  return TRANSLATIONS[lang];
}
