import React, { useState } from 'react';
import { 
  Sparkles, 
  Loader2, 
  Layers, 
  Play, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Zap, 
  BookOpen 
} from 'lucide-react';
import { ExamInfo, Question, AppSettings } from '../types';
import { EXAMS_DATA } from '../data/examsData';
import { soundManager } from '../utils/audio';
import { getTranslation } from '../utils/translations';

interface AIMockGeneratorModalProps {
  onClose: () => void;
  onLaunchGeneratedTest: (exam: ExamInfo, questions: Question[]) => void;
  appLanguage?: AppSettings['language'];
}

export const AIMockGeneratorModal: React.FC<AIMockGeneratorModalProps> = ({
  onClose,
  onLaunchGeneratedTest,
  appLanguage = 'en'
}) => {
  const t = getTranslation(appLanguage);
  const [selectedExamId, setSelectedExamId] = useState<string>(EXAMS_DATA[0].id);
  const [topicFocus, setTopicFocus] = useState<string>('Arithmetic & Data Interpretation');
  const [count, setCount] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Moderate' | 'Hard'>('Moderate');
  const [language, setLanguage] = useState<'English' | 'Hindi'>('English');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const selectedExam = EXAMS_DATA.find(e => e.id === selectedExamId) || EXAMS_DATA[0];

  const suggestedTopics = [
    'Arithmetic & Percentage Tricks',
    'Indian Constitution & Fundamental Rights',
    'Coding-Decoding & Blood Relations',
    'Cloze Test & Error Spotting',
    'Banking Awareness & Monetary Policy',
    'Railways General Science & Physics'
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    setErrorMsg(null);
    soundManager.playClick();

    try {
      const res = await fetch('/api/ai/generate-mock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examName: selectedExam.name,
          category: selectedExam.category,
          topic: topicFocus,
          count,
          difficulty,
          language
        })
      });

      const data = await res.json();
      if (data.success && Array.isArray(data.questions) && data.questions.length > 0) {
        soundManager.playFanfare();
        onLaunchGeneratedTest(selectedExam, data.questions);
      } else {
        setErrorMsg('AI generation encountered an issue. Using instant curated dynamic question set.');
        // Fallback generator from question bank
        const { generateMockSet } = await import('../data/questionBank');
        const fallbackSet = generateMockSet(count, selectedExam.subjects);
        soundManager.playFanfare();
        onLaunchGeneratedTest(selectedExam, fallbackSet);
      }
    } catch (e: any) {
      setErrorMsg('Failed to connect to AI server. Generating from pre-loaded syllabus bank.');
      const { generateMockSet } = await import('../data/questionBank');
      const fallbackSet = generateMockSet(count, selectedExam.subjects);
      soundManager.playFanfare();
      onLaunchGeneratedTest(selectedExam, fallbackSet);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div 
        id="ai-generator-modal"
        className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                {t.aiMockGenerator}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.aiMockSubtitle}
              </p>
            </div>
          </div>
          <button
            onClick={() => { onClose(); soundManager.playClick(); }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="space-y-4">
          {/* Target Exam */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t.selectTargetExam}
            </label>
            <select
              value={selectedExamId}
              onChange={(e) => setSelectedExamId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            >
              {EXAMS_DATA.map((e) => (
                <option key={e.id} value={e.id}>{e.name} ({e.fullName})</option>
              ))}
            </select>
          </div>

          {/* Topic Focus */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t.topicFocus}
            </label>
            <input
              type="text"
              value={topicFocus}
              onChange={(e) => setTopicFocus(e.target.value)}
              placeholder="e.g. Ratio and Proportion, Modern Indian History..."
              className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
            {/* Quick Topic Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {suggestedTopics.map((t, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setTopicFocus(t)}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-amber-950/60 hover:text-amber-900 dark:hover:text-amber-300 transition-colors"
                >
                  + {t}
                </button>
              ))}
            </div>
          </div>

          {/* Question Count & Difficulty & Language */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Count */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {t.questionCount}
              </label>
              <div className="grid grid-cols-4 gap-1">
                {[10, 20, 30, 50].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCount(c)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      count === c
                        ? 'bg-amber-500 text-slate-950 shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {c} Qs
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {t.difficulty}
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="Easy">Easy (Foundation)</option>
                <option value="Moderate">Moderate (Standard)</option>
                <option value="Hard">Hard (Mains Level)</option>
              </select>
            </div>

            {/* Language */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {t.language}
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="English">English</option>
                <option value="Hindi">हिंदी (Hindi)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Generate Action Button */}
        <div className="pt-2">
          <button
            id="generate-ai-mock-btn"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>AI is formulating {count} high-yield questions...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{t.generateMockTestBtn} ({count} Qs)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
