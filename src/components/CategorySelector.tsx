import React, { useState } from 'react';
import { 
  Briefcase, 
  Train, 
  Landmark, 
  Shield, 
  BookOpen, 
  ChevronRight, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Play, 
  Flame,
  Search,
  Award
} from 'lucide-react';
import { ExamInfo, ExamCategory, Subject, AppSettings } from '../types';
import { EXAMS_DATA, CATEGORIES_LIST } from '../data/examsData';
import { soundManager } from '../utils/audio';
import { getTranslation } from '../utils/translations';

interface CategorySelectorProps {
  onStartTest: (config: {
    exam: ExamInfo;
    questionCount: number;
    mode: 'practice' | 'exam';
    subjectFilter: Subject | 'ALL';
    difficulty: 'ALL' | 'Easy' | 'Moderate' | 'Hard';
  }) => void;
  openAIGenerator: () => void;
  language?: AppSettings['language'];
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  onStartTest,
  openAIGenerator,
  language = 'en'
}) => {
  const t = getTranslation(language);
  const [selectedCategory, setSelectedCategory] = useState<ExamCategory | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExam, setSelectedExam] = useState<ExamInfo | null>(null);

  // Test Config State in modal
  const [questionCount, setQuestionCount] = useState<number>(25);
  const [testMode, setTestMode] = useState<'practice' | 'exam'>('practice');
  const [subjectFilter, setSubjectFilter] = useState<Subject | 'ALL'>('ALL');
  const [difficulty, setDifficulty] = useState<'ALL' | 'Easy' | 'Moderate' | 'Hard'>('ALL');

  const filteredExams = EXAMS_DATA.filter((exam) => {
    const matchesCategory = selectedCategory === 'ALL' || exam.category === selectedCategory;
    const matchesQuery = 
      exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleExamClick = (exam: ExamInfo) => {
    setSelectedExam(exam);
    setSubjectFilter('ALL');
    soundManager.playClick();
  };

  const handleLaunch = () => {
    if (!selectedExam) return;
    soundManager.playFanfare();
    onStartTest({
      exam: selectedExam,
      questionCount,
      mode: testMode,
      subjectFilter,
      difficulty
    });
  };

  const getCategoryLabel = (category: ExamCategory | 'ALL') => {
    switch (category) {
      case 'ALL': return `${t.allExams} (${EXAMS_DATA.length})`;
      case 'SSC': return t.sscExams;
      case 'RAILWAY': return t.railwayExams;
      case 'BANKING': return t.bankingExams;
      case 'DEFENSE': return t.defenseExams;
      case 'STATE_PCS': return t.statePcsExams;
      default: return category;
    }
  };

  const getCategoryIcon = (category: ExamCategory) => {
    switch (category) {
      case 'SSC': return <Briefcase className="w-4 h-4 text-amber-500" />;
      case 'RAILWAY': return <Train className="w-4 h-4 text-rose-500" />;
      case 'BANKING': return <Landmark className="w-4 h-4 text-blue-500" />;
      case 'DEFENSE': return <Shield className="w-4 h-4 text-emerald-500" />;
      case 'STATE_PCS': return <BookOpen className="w-4 h-4 text-purple-500" />;
      default: return <Award className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 text-white p-6 sm:p-8 shadow-lg">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Targeting 2026 Competitive Exams</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {t.heroTitle} <span className="text-amber-300">{t.heroHighlight}</span>
          </h1>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            {t.heroSubtitle}
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              id="hero-ai-gen-btn"
              onClick={() => { openAIGenerator(); soundManager.playClick(); }}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.aiMockGenBtn}</span>
            </button>
            <button
              id="hero-cgl-btn"
              onClick={() => {
                const cgl = EXAMS_DATA.find(e => e.id === 'ssc-cgl');
                if (cgl) handleExamClick(cgl);
              }}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all"
            >
              SSC CGL Full Mock (Tier 1)
            </button>
          </div>
        </div>

        {/* Decorative background visual elements */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none" />
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
              id="category-tab-all"
              onClick={() => { setSelectedCategory('ALL'); soundManager.playClick(); }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                selectedCategory === 'ALL'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {getCategoryLabel('ALL')}
            </button>
            {CATEGORIES_LIST.map((cat) => (
              <button
                key={cat.id}
                id={`category-tab-${cat.id.toLowerCase()}`}
                onClick={() => { setSelectedCategory(cat.id); soundManager.playClick(); }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{getCategoryLabel(cat.id)}</span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="exam-search-input"
              type="text"
              placeholder={t.searchExamPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExams.map((exam) => (
            <div
              key={exam.id}
              id={`exam-card-${exam.id}`}
              onClick={() => handleExamClick(exam)}
              className="group cursor-pointer rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all hover:shadow-md relative flex flex-col justify-between"
            >
              <div>
                {/* Header tag */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 group-hover:scale-105 transition-transform">
                      {getCategoryIcon(exam.category)}
                    </span>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{exam.category}</span>
                  </div>
                  {exam.popular && (
                    <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                      <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                      {t.popularBadge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {exam.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mb-2">
                  {exam.fullName}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-2">
                  {exam.description}
                </p>

                {/* Exam Specs Badges */}
                <div className="flex flex-wrap gap-2 text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-4">
                  <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {exam.durationMinutes} {t.durationMins}
                  </span>
                  <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                    +{exam.marksPerQuestion} / -{exam.negativeMarks} {t.negativeMarking}
                  </span>
                  <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md font-semibold text-indigo-600 dark:text-indigo-400">
                    {exam.tier}
                  </span>
                </div>
              </div>

              {/* Action row */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {exam.subjects.length} {t.section}s
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform">
                  {t.startTestBtn}
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Test Launch Configuration Drawer / Modal */}
      {selectedExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div 
            id="exam-config-modal"
            className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                  {getCategoryIcon(selectedExam.category)}
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {selectedExam.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedExam.fullName}
                  </p>
                </div>
              </div>
              <button
                id="close-exam-config-btn"
                onClick={() => { setSelectedExam(null); soundManager.playClick(); }}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            {/* Syllabus Overview Pills */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {t.syllabusTitle}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {selectedExam.subjects.map((sub) => (
                  <span key={sub} className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                    ✓ {sub}
                  </span>
                ))}
              </div>
            </div>

            {/* Test Mode Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {t.practiceMode} / {t.examMode}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  id="mode-practice-btn"
                  onClick={() => { setTestMode('practice'); soundManager.playClick(); }}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    testMode === 'practice'
                      ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm">{t.practiceMode}</span>
                    {testMode === 'practice' && <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                    {t.practiceModeDesc}
                  </p>
                </button>

                <button
                  id="mode-exam-btn"
                  onClick={() => { setTestMode('exam'); soundManager.playClick(); }}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    testMode === 'exam'
                      ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm">{t.examMode}</span>
                    {testMode === 'exam' && <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                    {t.examModeDesc} (-{selectedExam.negativeMarks})
                  </p>
                </button>
              </div>
            </div>

            {/* Question Set Size: 10, 25, 50, 100, 200, 500 Qs */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {t.targetCount}
                </label>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  {questionCount} {t.questionsCount} ({Math.round(questionCount * (selectedExam.durationMinutes / 100))} {t.durationMins})
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[10, 25, 50, 100, 200, 500].map((count) => (
                  <button
                    key={count}
                    id={`count-select-${count}`}
                    onClick={() => { setQuestionCount(count); soundManager.playClick(); }}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      questionCount === count
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {count} Qs
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {t.subjectFilter}
              </label>
              <select
                id="subject-filter-select"
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              >
                <option value="ALL">{t.allSubjects}</option>
                {selectedExam.subjects.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            {/* Launch Button */}
            <div className="pt-2">
              <button
                id="launch-test-final-btn"
                onClick={handleLaunch}
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{t.startTestBtn}: {selectedExam.name} ({questionCount} Qs)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
