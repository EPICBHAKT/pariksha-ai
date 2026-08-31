import React, { useState } from 'react';
import { 
  WifiOff, 
  BookOpen, 
  Search, 
  Filter, 
  CheckCircle2, 
  Lightbulb, 
  Play, 
  Sparkles, 
  Layers,
  Eye,
  EyeOff
} from 'lucide-react';
import { Question, Subject, ExamInfo, AppSettings } from '../types';
import { ALL_QUESTIONS, generateMockSet, generateExamQuestions } from '../data/questionBank';
import { EXAMS_DATA } from '../data/examsData';
import { soundManager } from '../utils/audio';
import { getTranslation } from '../utils/translations';

interface OfflineBankProps {
  onStartOfflineTest: (exam: ExamInfo, questions: Question[]) => void;
  language?: AppSettings['language'];
}

export const OfflineBankView: React.FC<OfflineBankProps> = ({ 
  onStartOfflineTest,
  language = 'en'
}) => {
  const t = getTranslation(language);
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [mockQuestionCount, setMockQuestionCount] = useState<number>(50);

  const subjects: { name: Subject; label: string }[] = [
    { name: 'Quantitative Aptitude', label: 'Quant' },
    { name: 'Reasoning Ability', label: 'Reasoning' },
    { name: 'General Awareness & GK', label: 'GK & GA' },
    { name: 'English Language', label: 'English' },
    { name: 'General Science', label: 'Science' },
    { name: 'Computer Knowledge', label: 'Computer' },
    { name: 'Banking & Financial Awareness', label: 'Banking' }
  ];

  const getSubjectCount = (sub: Subject | 'ALL') => {
    if (sub === 'ALL') return ALL_QUESTIONS.length;
    return ALL_QUESTIONS.filter(q => {
      const qSub = q.subject.toLowerCase();
      const targetSub = sub.toLowerCase();
      if (qSub === targetSub) return true;
      if (targetSub.includes('gk') || targetSub.includes('general awareness')) {
        return qSub.includes('gk') || qSub.includes('general awareness') || qSub.includes('knowledge');
      }
      if (targetSub.includes('english')) {
        return qSub.includes('english') || qSub.includes('comprehension');
      }
      return qSub.includes(targetSub.split(' ')[0]);
    }).length;
  };

  const filteredQuestions = ALL_QUESTIONS.filter((q) => {
    let matchesSub = selectedSubject === 'ALL';
    if (!matchesSub) {
      const qSub = q.subject.toLowerCase();
      const targetSub = selectedSubject.toLowerCase();
      if (qSub === targetSub) matchesSub = true;
      else if (targetSub.includes('gk') || targetSub.includes('general awareness')) {
        matchesSub = qSub.includes('gk') || qSub.includes('general awareness') || qSub.includes('knowledge');
      } else if (targetSub.includes('english')) {
        matchesSub = qSub.includes('english') || qSub.includes('comprehension');
      } else {
        matchesSub = qSub.includes(targetSub.split(' ')[0]);
      }
    }

    const matchesQuery = 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.explanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSub && matchesQuery;
  });

  const toggleReveal = (qId: string) => {
    setRevealedAnswers(prev => ({ ...prev, [qId]: !prev[qId] }));
    soundManager.playClick();
  };

  const handleLaunchMock = (count: number = 50) => {
    soundManager.playFanfare();
    const defaultExam = EXAMS_DATA[0];
    // Generate strictly unique mock test from offline bank
    const uniqueQuestions = selectedSubject === 'ALL'
      ? generateMockSet(count)
      : generateExamQuestions(defaultExam.name, count, selectedSubject);
    onStartOfflineTest(defaultExam, uniqueQuestions);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 animate-fadeIn">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
            <WifiOff className="w-3.5 h-3.5" />
            <span>100% Offline-Ready Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.offlineBankTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            {t.offlineBankSubtitle}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <select
            value={mockQuestionCount}
            onChange={(e) => setMockQuestionCount(Number(e.target.value))}
            className="px-3 py-3 rounded-2xl bg-slate-800 border border-slate-700 text-white text-xs font-bold focus:outline-hidden"
          >
            <option value={25}>25 Qs</option>
            <option value={50}>50 Qs</option>
            <option value={75}>75 Qs</option>
            <option value={100}>100 Qs</option>
          </select>

          <button
            id="launch-offline-mock-btn"
            onClick={() => handleLaunchMock(mockQuestionCount)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{t.startTestBtn} ({mockQuestionCount} Qs)</span>
          </button>
        </div>
      </div>

      {/* Subject Filter & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Subject Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar w-full sm:w-auto">
            <button
              onClick={() => { setSelectedSubject('ALL'); soundManager.playClick(); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedSubject === 'ALL'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <span>{t.allSubjects}</span>
              <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                selectedSubject === 'ALL' ? 'bg-indigo-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}>
                {ALL_QUESTIONS.length}
              </span>
            </button>
            {subjects.map((sub) => {
              const count = getSubjectCount(sub.name);
              return (
                <button
                  key={sub.name}
                  onClick={() => { setSelectedSubject(sub.name); soundManager.playClick(); }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    selectedSubject === sub.name
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span>{sub.label}</span>
                  <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                    selectedSubject === sub.name ? 'bg-indigo-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={t.searchExamPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Questions Flash List */}
        <div className="space-y-4">
          {filteredQuestions.map((q, index) => {
            const isRevealed = revealedAnswers[q.id];

            return (
              <div
                key={q.id}
                id={`offline-q-${q.id}`}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 font-extrabold text-xs text-indigo-700 dark:text-indigo-300">
                      Q {index + 1}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {q.subject} • {q.topic}
                    </span>
                  </div>

                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    q.difficulty === 'Easy'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : q.difficulty === 'Moderate'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                  }`}>
                    {q.difficulty}
                  </span>
                </div>

                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                  {q.question}
                </p>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.options.map((opt, optIdx) => {
                    const optLetter = String.fromCharCode(65 + optIdx);
                    const isCorrect = optIdx === q.correctIndex;

                    return (
                      <div
                        key={optIdx}
                        className={`p-2.5 rounded-xl border flex items-center justify-between ${
                          isRevealed && isCorrect
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 font-bold'
                            : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold">({optLetter})</span>
                          <span>{opt}</span>
                        </div>
                        {isRevealed && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Reveal Answer / Explanation Action */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => toggleReveal(q.id)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors w-fit"
                  >
                    {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{isRevealed ? t.hideSolutionBtn : t.showSolutionBtn}</span>
                  </button>

                  {isRevealed && (
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {t.correctOption}: ({q.correctOption})
                    </span>
                  )}
                </div>

                {/* Solution Reveal Dropdown */}
                {isRevealed && (
                  <div className="p-4 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-2 text-xs text-slate-800 dark:text-slate-200 animate-fadeIn">
                    <p className="leading-relaxed font-mono">
                      {q.explanation}
                    </p>
                    {q.shortcutTrick && (
                      <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200">
                        ⚡ <strong>{t.shortcutTrick}:</strong> {q.shortcutTrick}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
