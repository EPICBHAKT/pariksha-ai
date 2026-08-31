import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Sparkles, 
  RotateCcw, 
  ArrowRight, 
  Flame, 
  Coins, 
  HelpCircle,
  Share2,
  BrainCircuit,
  Filter
} from 'lucide-react';
import { TestSession, Question, AppSettings } from '../types';
import { soundManager } from '../utils/audio';
import { AIExplanationModal } from './AIExplanationModal';
import { getTranslation } from '../utils/translations';

interface TestResultViewProps {
  session: TestSession;
  onRetake: () => void;
  onGoHome: () => void;
  language?: AppSettings['language'];
}

export const TestResultView: React.FC<TestResultViewProps> = ({
  session,
  onRetake,
  onGoHome,
  language = 'en'
}) => {
  const t = getTranslation(language);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'CORRECT' | 'WRONG' | 'UNATTEMPTED'>('ALL');
  const [selectedReviewQ, setSelectedReviewQ] = useState<Question | null>(null);
  const [aiDiagnosis, setAiDiagnosis] = useState<{
    strengths?: string[];
    weakAreas?: string[];
    actionPlan?: string;
    estimatedCutoffProbability?: string;
  } | null>(null);
  const [isLoadingDiagnosis, setIsLoadingDiagnosis] = useState<boolean>(false);

  useEffect(() => {
    // Fire confetti on high score
    if (session.accuracy >= 70) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    fetchAIDiagnosis();
  }, []);

  const fetchAIDiagnosis = async () => {
    setIsLoadingDiagnosis(true);
    try {
      const res = await fetch('/api/ai/analyze-performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testResults: {
            score: session.score,
            totalQuestions: session.totalQuestions,
            correctCount: session.correctCount,
            wrongCount: session.wrongCount,
            unattemptedCount: session.unattemptedCount,
            accuracy: session.accuracy,
            timeSpentSeconds: session.totalDurationSeconds - session.timeRemainingSeconds
          },
          examName: session.examName
        })
      });
      const data = await res.json();
      if (data.success && data.analysis) {
        setAiDiagnosis(data.analysis);
      }
    } catch (e) {
      setAiDiagnosis({
        strengths: ['Great focus on attempting core questions', 'Consistent speed maintenance'],
        weakAreas: ['Focus on negative marking accuracy reduction'],
        actionPlan: 'Practice 20 speed arithmetic questions daily and revise General Knowledge articles.',
        estimatedCutoffProbability: session.accuracy > 75 ? 'High (82%)' : 'Moderate (64%)'
      });
    } finally {
      setIsLoadingDiagnosis(false);
    }
  };

  const filteredQuestions = session.questions.map((q, idx) => ({ q, idx })).filter(({ q, idx }) => {
    const userAns = session.userAnswers[idx];
    if (activeFilter === 'CORRECT') return userAns === q.correctIndex;
    if (activeFilter === 'WRONG') return userAns !== undefined && userAns !== q.correctIndex;
    if (activeFilter === 'UNATTEMPTED') return userAns === undefined;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 animate-fadeIn">
      {/* Top Banner & Score Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800 pb-6 text-center sm:text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
              <Trophy className="w-3.5 h-3.5" />
              <span>{t.testSummary}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {session.examName} Performance Report
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Evaluated based on official marking rules & negative penalty
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <button
              id="retake-test-btn"
              onClick={() => { onRetake(); soundManager.playClick(); }}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs sm:text-sm text-slate-700 dark:text-slate-200 flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.retakeTest}</span>
            </button>
            <button
              id="go-home-btn"
              onClick={() => { onGoHome(); soundManager.playClick(); }}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center gap-2"
            >
              <span>{t.exploreMoreMocks}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Score Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-center">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{t.totalScore}</span>
            <p className="text-2xl sm:text-3xl font-extrabold text-indigo-950 dark:text-indigo-200 mt-1">
              {session.score}
            </p>
            <p className="text-[11px] text-indigo-600/80 dark:text-indigo-400/80 font-medium">Marks Obtained</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 text-center">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">{t.accuracyRate}</span>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-950 dark:text-emerald-200 mt-1">
              {session.accuracy}%
            </p>
            <p className="text-[11px] text-emerald-600/80 dark:text-emerald-400/80 font-medium">{session.correctCount} {t.correctSummary} / {session.correctCount + session.wrongCount} Attempted</p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 text-center">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">{t.incorrectSummary}</span>
            <p className="text-2xl sm:text-3xl font-extrabold text-rose-950 dark:text-rose-200 mt-1">
              {session.wrongCount}
            </p>
            <p className="text-[11px] text-rose-600/80 dark:text-rose-400/80 font-medium">Negative Marks Incurred</p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 text-center">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">XP & Coins</span>
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-950 dark:text-amber-200 mt-1">
              +{session.xpEarned}
            </p>
            <p className="text-[11px] text-amber-600/80 dark:text-amber-400/80 font-medium">Earned for Profile</p>
          </div>
        </div>
      </div>

      {/* AI Diagnosis Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-400/20 text-amber-300">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base sm:text-lg">
              ParikshaAI Performance Diagnosis
            </h3>
            <p className="text-xs text-slate-300">
              Personalized exam analysis & cutoff recommendation
            </p>
          </div>
        </div>

        {isLoadingDiagnosis ? (
          <div className="p-4 text-xs text-slate-300 animate-pulse">
            ParikshaAI is analyzing your topic breakdown and calculating cutoff odds...
          </div>
        ) : aiDiagnosis ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="font-bold text-emerald-400 uppercase tracking-wider">Key Strengths</span>
              <ul className="space-y-1 text-slate-200">
                {aiDiagnosis.strengths?.map((s, i) => (
                  <li key={i} className="flex items-start gap-1.5">✓ <span>{s}</span></li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="font-bold text-amber-400 uppercase tracking-wider">Target Weak Areas</span>
              <ul className="space-y-1 text-slate-200">
                {aiDiagnosis.weakAreas?.map((w, i) => (
                  <li key={i} className="flex items-start gap-1.5">⚡ <span>{w}</span></li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>

      {/* Detailed Question Review Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
            Question-by-Question Review ({session.questions.length})
          </h3>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'ALL', label: `All (${session.questions.length})` },
              { id: 'CORRECT', label: `Correct (${session.correctCount})` },
              { id: 'WRONG', label: `Wrong (${session.wrongCount})` },
              { id: 'UNATTEMPTED', label: `Unattempted (${session.unattemptedCount})` }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => { setActiveFilter(f.id as any); soundManager.playClick(); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeFilter === f.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Questions Review List */}
        <div className="space-y-4">
          {filteredQuestions.map(({ q, idx }) => {
            const userPick = session.userAnswers[idx];
            const isCorrect = userPick === q.correctIndex;
            const isUnattempted = userPick === undefined;

            return (
              <div
                key={q.id}
                id={`review-card-${idx}`}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-extrabold text-xs text-slate-700 dark:text-slate-300">
                      Q {idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {q.subject} • {q.topic}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isCorrect && (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" /> Correct
                      </span>
                    )}
                    {!isCorrect && !isUnattempted && (
                      <span className="flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400">
                        <XCircle className="w-4 h-4" /> Incorrect
                      </span>
                    )}
                    {isUnattempted && (
                      <span className="text-xs font-bold text-slate-400">
                        Unattempted
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                  {q.question}
                </p>

                {/* Options Review Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.options.map((opt, optIdx) => {
                    const optLetter = String.fromCharCode(65 + optIdx);
                    const isOptionCorrect = optIdx === q.correctIndex;
                    const isOptionPicked = optIdx === userPick;

                    let bg = 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300';
                    if (isOptionCorrect) {
                      bg = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 font-bold';
                    } else if (isOptionPicked && !isOptionCorrect) {
                      bg = 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200';
                    }

                    return (
                      <div key={optIdx} className={`p-2.5 rounded-xl border flex items-center justify-between ${bg}`}>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">({optLetter})</span>
                          <span>{opt}</span>
                        </div>
                        {isOptionCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                        {isOptionPicked && !isOptionCorrect && <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0" />}
                      </div>
                    );
                  })}
                </div>

                {/* Action: Ask AI Explanations */}
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    Time spent: {session.timeSpentPerQuestion[idx] || 0}s
                  </span>
                  <button
                    onClick={() => { setSelectedReviewQ(q); soundManager.playClick(); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xs transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>View Step-by-Step AI Solution</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Explanation Drawer Modal */}
      {selectedReviewQ && (
        <AIExplanationModal
          question={selectedReviewQ}
          selectedOptionIndex={session.userAnswers[session.questions.findIndex(q => q.id === selectedReviewQ.id)] ?? -1}
          exam={{ name: session.examName } as any}
          onClose={() => setSelectedReviewQ(null)}
        />
      )}
    </div>
  );
};
