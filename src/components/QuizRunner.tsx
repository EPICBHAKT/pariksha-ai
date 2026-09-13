import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  HelpCircle, 
  Layers, 
  Languages, 
  BookMarked, 
  Send,
  Eye,
  RotateCcw,
  Check
} from 'lucide-react';
import { Question, ExamInfo, TestSession, Subject } from '../types';
import { soundManager } from '../utils/audio';
import { AIExplanationModal } from './AIExplanationModal';

interface QuizRunnerProps {
  exam: ExamInfo;
  questions: Question[];
  mode: 'practice' | 'exam';
  onComplete: (session: TestSession) => void;
  onExit: () => void;
  language: string;
}

export const QuizRunner: React.FC<QuizRunnerProps> = ({
  exam,
  questions,
  mode,
  onComplete,
  onExit,
  language: initialLanguage
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [questionStatus, setQuestionStatus] = useState<Record<number, 'unvisited' | 'not_answered' | 'answered' | 'marked_for_review' | 'answered_and_marked'>>({});
  const [timeSpent, setTimeSpent] = useState<Record<number, number>>({});
  const [activeLang, setActiveLang] = useState<'en' | 'hi'>(initialLanguage === 'hi' ? 'hi' : 'en');
  const [showPalette, setShowPalette] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [showAIModal, setShowAIModal] = useState<boolean>(false);

  // Timer Calculation
  const totalDurationSeconds = Math.max(Math.round(questions.length * (exam.durationMinutes / 100) * 60), 300);
  const [timeRemaining, setTimeRemaining] = useState<number>(totalDurationSeconds);
  const [startTime] = useState<number>(Date.now());

  const currentQ = questions[currentIndex];

  // Timer interval
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        if (prev === 300 || prev === 60) {
          soundManager.playTimerTick();
        }
        return prev - 1;
      });

      setTimeSpent((prev) => ({
        ...prev,
        [currentIndex]: (prev[currentIndex] || 0) + 1
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  // Track initial visit status
  useEffect(() => {
    setQuestionStatus((prev) => {
      if (!prev[currentIndex] || prev[currentIndex] === 'unvisited') {
        return { ...prev, [currentIndex]: 'not_answered' };
      }
      return prev;
    });
  }, [currentIndex]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showSubmitModal || showAIModal) return;
      if (['1', '2', '3', '4'].includes(e.key)) {
        const optIndex = parseInt(e.key) - 1;
        handleSelectOption(optIndex);
      } else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'n') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'p') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, userAnswers, showSubmitModal, showAIModal]);

  const handleSelectOption = (optionIndex: number) => {
    const isAlreadySelected = userAnswers[currentIndex] === optionIndex;
    const nextAnswers = { ...userAnswers };

    if (isAlreadySelected) {
      delete nextAnswers[currentIndex];
      setUserAnswers(nextAnswers);
      setQuestionStatus((prev) => ({ ...prev, [currentIndex]: 'not_answered' }));
      soundManager.playClick();
    } else {
      nextAnswers[currentIndex] = optionIndex;
      setUserAnswers(nextAnswers);
      setQuestionStatus((prev) => {
        const current = prev[currentIndex];
        const isMarked = current === 'marked_for_review' || current === 'answered_and_marked';
        return {
          ...prev,
          [currentIndex]: isMarked ? 'answered_and_marked' : 'answered'
        };
      });

      if (mode === 'practice') {
        if (optionIndex === currentQ.correctIndex) {
          soundManager.playCorrect();
        } else {
          soundManager.playWrong();
        }
      } else {
        soundManager.playClick();
      }
    }
  };

  const handleToggleMarkForReview = () => {
    soundManager.playClick();
    setQuestionStatus((prev) => {
      const hasAnswer = userAnswers[currentIndex] !== undefined;
      const current = prev[currentIndex];
      if (current === 'marked_for_review' || current === 'answered_and_marked') {
        return { ...prev, [currentIndex]: hasAnswer ? 'answered' : 'not_answered' };
      } else {
        return { ...prev, [currentIndex]: hasAnswer ? 'answered_and_marked' : 'marked_for_review' };
      }
    });
  };

  const handleClearResponse = () => {
    soundManager.playClick();
    const next = { ...userAnswers };
    delete next[currentIndex];
    setUserAnswers(next);
    setQuestionStatus((prev) => ({
      ...prev,
      [currentIndex]: prev[currentIndex] === 'answered_and_marked' ? 'marked_for_review' : 'not_answered'
    }));
  };

  const handleNext = () => {
    soundManager.playClick();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    soundManager.playClick();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    soundManager.playClick();
    setCurrentIndex(index);
    setShowPalette(false);
  };

  const handleSubmitTest = () => {
    soundManager.playFanfare();
    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;

    questions.forEach((q, idx) => {
      const ans = userAnswers[idx];
      if (ans === undefined) {
        unattemptedCount += 1;
      } else if (ans === q.correctIndex) {
        correctCount += 1;
      } else {
        wrongCount += 1;
      }
    });

    const score = Math.max(0, +(correctCount * exam.marksPerQuestion - wrongCount * exam.negativeMarks).toFixed(2));
    const accuracy = questions.length > unattemptedCount
      ? Math.round((correctCount / (correctCount + wrongCount)) * 100)
      : 0;

    const xpEarned = Math.round(correctCount * 15 + (accuracy > 80 ? 100 : 50));

    const session: TestSession = {
      id: `test_${Date.now()}`,
      examId: exam.id,
      examName: exam.name,
      category: exam.category,
      mode,
      totalQuestions: questions.length,
      questions,
      userAnswers,
      questionStatus,
      timeSpentPerQuestion: timeSpent,
      startTime,
      endTime: Date.now(),
      timeRemainingSeconds: timeRemaining,
      totalDurationSeconds,
      isCompleted: true,
      score,
      accuracy,
      correctCount,
      wrongCount,
      unattemptedCount,
      xpEarned,
      date: new Date().toISOString()
    };

    onComplete(session);
  };

  // Format Timer String
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(userAnswers).length;
  const markedCount = Object.values(questionStatus).filter(s => s === 'marked_for_review' || s === 'answered_and_marked').length;
  const unattemptedCount = questions.length - answeredCount;

  const currentSubject = currentQ.subject;
  const hasAnsweredCurrent = userAnswers[currentIndex] !== undefined;

  return (
    <div className="min-h-[85vh] flex flex-col justify-between space-y-4 pb-8 w-full max-w-full overflow-hidden">
      {/* Top Test Navigation Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 sm:p-4 shadow-xs space-y-2.5 sm:space-y-0">
        {/* Desktop / Tablet Single-Row Bar */}
        <div className="hidden sm:flex items-center justify-between gap-4">
          {/* Exam Title & Subject */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              id="exit-test-btn"
              onClick={() => {
                if (confirm('Are you sure you want to pause or exit this test? Your progress will be saved in practice mode.')) {
                  onExit();
                }
              }}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
              title="Exit Test"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                  {exam.name}
                </h2>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                  mode === 'practice'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                }`}>
                  {mode === 'practice' ? 'Practice' : 'CBT Mock'}
                </span>
              </div>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold truncate">
                Section: {currentSubject}
              </p>
            </div>
          </div>

          {/* Center Timer */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-sm sm:text-base font-bold shadow-inner shrink-0 ${
            timeRemaining < 300
              ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-900 animate-pulse'
              : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
          }`}>
            <Clock className="w-4 h-4" />
            <span>{formatTime(timeRemaining)}</span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              id="test-lang-toggle-btn"
              onClick={() => {
                setActiveLang(prev => prev === 'en' ? 'hi' : 'en');
                soundManager.playClick();
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Languages className="w-3.5 h-3.5 text-indigo-500" />
              <span>{activeLang === 'en' ? 'English' : 'हिंदी'}</span>
            </button>

            <button
              id="question-palette-btn"
              onClick={() => { setShowPalette(!showPalette); soundManager.playClick(); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-indigo-500" />
              <span>Palette</span>
              <span className="bg-indigo-600 text-white text-[10px] px-1.5 py-0.2 rounded-full">
                {currentIndex + 1}/{questions.length}
              </span>
            </button>

            <button
              id="submit-test-btn"
              onClick={() => { setShowSubmitModal(true); soundManager.playClick(); }}
              className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit</span>
            </button>
          </div>
        </div>

        {/* Mobile View Header: 2 Structured Compact Rows */}
        <div className="sm:hidden space-y-2">
          {/* Row 1: Exit, Title, Timer, Submit */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0 flex-1">
              <button
                id="exit-test-btn-mobile"
                onClick={() => {
                  if (confirm('Are you sure you want to pause or exit this test? Your progress will be saved in practice mode.')) {
                    onExit();
                  }
                }}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="min-w-0">
                <h2 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                  {exam.name}
                </h2>
                <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold truncate">
                  {currentSubject}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-mono text-xs font-bold ${
                timeRemaining < 300
                  ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 animate-pulse'
                  : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
              }`}>
                <Clock className="w-3 h-3" />
                <span>{formatTime(timeRemaining)}</span>
              </div>

              <button
                id="submit-test-btn-mobile"
                onClick={() => { setShowSubmitModal(true); soundManager.playClick(); }}
                className="px-3 py-1 rounded-lg bg-indigo-600 text-white font-bold text-xs shadow-xs flex items-center gap-1"
              >
                <Send className="w-3 h-3" />
                <span>End</span>
              </button>
            </div>
          </div>

          {/* Row 2: Language switcher & Palette toggle */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800 text-xs">
            <button
              id="test-lang-toggle-btn-mobile"
              onClick={() => {
                setActiveLang(prev => prev === 'en' ? 'hi' : 'en');
                soundManager.playClick();
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-200 text-[11px]"
            >
              <Languages className="w-3 h-3 text-indigo-500" />
              <span>{activeLang === 'en' ? 'EN' : 'हिंदी'}</span>
            </button>

            <button
              id="question-palette-btn-mobile"
              onClick={() => { setShowPalette(!showPalette); soundManager.playClick(); }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-[11px] font-bold"
            >
              <Layers className="w-3 h-3 text-indigo-500" />
              <span>Q {currentIndex + 1}/{questions.length}</span>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">Palette</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Question Area & Side Palette Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left 3 cols: Question Card */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xs space-y-5">
            {/* Question Header Status */}
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-100 dark:border-slate-800 text-xs gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-extrabold text-xs sm:text-sm shrink-0">
                  Q {currentIndex + 1}/{questions.length}
                </span>
                <span className="text-slate-500 dark:text-slate-400 font-medium truncate">
                  {currentQ.topic}
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  +{exam.marksPerQuestion}
                </span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="font-semibold text-rose-600 dark:text-rose-400">
                  -{exam.negativeMarks}
                </span>
              </div>
            </div>

            {/* Question Statement */}
            <div className="space-y-3">
              <h3 className="text-sm sm:text-lg font-semibold text-slate-900 dark:text-slate-100 leading-relaxed break-words">
                {activeLang === 'hi' && currentQ.questionHindi ? currentQ.questionHindi : currentQ.question}
              </h3>
            </div>

            {/* Options List */}
            <div className="space-y-2.5 sm:space-y-3 pt-2">
              {currentQ.options.map((opt, optIndex) => {
                const optLetter = String.fromCharCode(65 + optIndex);
                const isSelected = userAnswers[currentIndex] === optIndex;
                const isCorrect = optIndex === currentQ.correctIndex;
                const optText = (activeLang === 'hi' && currentQ.optionsHindi?.[optIndex]) ? currentQ.optionsHindi[optIndex] : opt;

                // Practice mode direct feedback styling
                let optionStyle = 'border-slate-200 dark:border-slate-800 hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-800 dark:text-slate-200';
                
                if (mode === 'practice' && hasAnsweredCurrent) {
                  if (isCorrect) {
                    optionStyle = 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/20';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'border-rose-500 bg-rose-50/80 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 ring-2 ring-rose-500/20';
                  } else {
                    optionStyle = 'border-slate-200 dark:border-slate-800 opacity-60 text-slate-500';
                  }
                } else if (isSelected) {
                  optionStyle = 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/50 text-indigo-950 dark:text-indigo-200 ring-2 ring-indigo-500/20';
                }

                return (
                  <button
                    key={optIndex}
                    id={`option-btn-${optIndex}`}
                    onClick={() => handleSelectOption(optIndex)}
                    className={`w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all flex items-center justify-between gap-3 group ${optionStyle}`}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1">
                      <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-950'
                      }`}>
                        {optLetter}
                      </span>
                      <span className="text-xs sm:text-sm font-medium leading-relaxed break-words min-w-0 flex-1">
                        {optText}
                      </span>
                    </div>

                    {mode === 'practice' && hasAnsweredCurrent && (
                      <div className="shrink-0">
                        {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
                        {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Practice Mode Inline Instant Feedback Box */}
            {mode === 'practice' && hasAnsweredCurrent && (
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Solution (Option {currentQ.correctOption})
                  </span>
                  <button
                    id="trigger-ai-explain-btn"
                    onClick={() => { setShowAIModal(true); soundManager.playClick(); }}
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-amber-500 text-white text-xs font-bold shadow-xs hover:shadow-sm transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Explain with AI Mentor</span>
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-mono break-words">
                  {currentQ.explanation}
                </p>
                {currentQ.shortcutTrick && (
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200 text-xs break-words">
                    ⚡ <strong>Shortcut Trick:</strong> {currentQ.shortcutTrick}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom Action Buttons (Responsive Layout) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 sm:p-4 shadow-xs">
            {/* Desktop Layout */}
            <div className="hidden sm:flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  id="mark-review-btn"
                  onClick={handleToggleMarkForReview}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-purple-700 dark:text-purple-300 transition-colors"
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>Mark for Review</span>
                </button>

                <button
                  id="clear-resp-btn"
                  onClick={handleClearResponse}
                  disabled={!hasAnsweredCurrent}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white disabled:opacity-30 transition-colors"
                >
                  Clear Response
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="direct-ai-mentor-btn"
                  onClick={() => { setShowAIModal(true); soundManager.playClick(); }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-200 text-xs font-bold transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>AI Doubt Solver</span>
                </button>

                <button
                  id="prev-question-btn"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold disabled:opacity-40 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  id="next-question-btn"
                  onClick={handleNext}
                  disabled={currentIndex === questions.length - 1}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold disabled:opacity-40 shadow-xs transition-colors"
                >
                  <span>Save & Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mobile Layout: 2 Ergonomic Rows */}
            <div className="sm:hidden space-y-2.5">
              {/* Row 1: Review, Clear, AI Solver */}
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  id="mark-review-btn-mobile"
                  onClick={handleToggleMarkForReview}
                  className="flex items-center justify-center gap-1 py-2 px-1 rounded-xl text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-purple-700 dark:text-purple-300"
                >
                  <Flag className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Review</span>
                </button>

                <button
                  id="clear-resp-btn-mobile"
                  onClick={handleClearResponse}
                  disabled={!hasAnsweredCurrent}
                  className="py-2 px-1 rounded-xl text-[11px] font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 disabled:opacity-30"
                >
                  Clear
                </button>

                <button
                  id="direct-ai-mentor-btn-mobile"
                  onClick={() => { setShowAIModal(true); soundManager.playClick(); }}
                  className="flex items-center justify-center gap-1 py-2 px-1 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 text-[11px] font-bold"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="truncate">AI Mentor</span>
                </button>
              </div>

              {/* Row 2: Previous & Next Navigation */}
              <div className="flex items-center gap-2">
                <button
                  id="prev-question-btn-mobile"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold disabled:opacity-40 flex items-center justify-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  id="next-question-btn-mobile"
                  onClick={handleNext}
                  disabled={currentIndex === questions.length - 1}
                  className="flex-2 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold disabled:opacity-40 shadow-xs flex items-center justify-center gap-1"
                >
                  <span>Save & Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 col: Real CBT Question Palette */}
        <div className={`lg:block ${showPalette ? 'fixed inset-0 z-50 p-4 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center' : 'hidden'}`}>
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Question Palette
              </h4>
              <span className="text-xs text-slate-500 font-bold">
                {answeredCount}/{questions.length} Answered
              </span>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-slate-600 dark:text-slate-400 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-emerald-500 shrink-0" />
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-purple-500 shrink-0" />
                <span>Review ({markedCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-rose-500 shrink-0" />
                <span>Not Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-slate-300 dark:bg-slate-700 shrink-0" />
                <span>Not Visited</span>
              </div>
            </div>

            {/* Numbers Grid */}
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2 pt-2">
              {questions.map((_, idx) => {
                const status = questionStatus[idx] || 'unvisited';
                const isCurrent = currentIndex === idx;
                const isAnswered = userAnswers[idx] !== undefined;
                const isMarked = status === 'marked_for_review' || status === 'answered_and_marked';

                let colorClasses = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400';
                if (isMarked) {
                  colorClasses = 'bg-purple-600 text-white font-bold';
                } else if (isAnswered) {
                  colorClasses = 'bg-emerald-600 text-white font-bold';
                } else if (status === 'not_answered') {
                  colorClasses = 'bg-rose-500/80 text-white font-bold';
                }

                return (
                  <button
                    key={idx}
                    id={`palette-btn-${idx}`}
                    onClick={() => {
                      handleJumpToQuestion(idx);
                      if (window.innerWidth < 1024) setShowPalette(false);
                    }}
                    className={`h-9 rounded-xl text-xs flex items-center justify-center transition-all ${colorClasses} ${
                      isCurrent ? 'ring-2 ring-indigo-500 ring-offset-2 scale-105 shadow-xs' : 'hover:opacity-80'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setShowPalette(false)}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 mt-3"
            >
              Close Palette
            </button>
          </div>
        </div>
      </div>

      {/* Pre-Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mx-auto">
                <Send className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Submit Test Confirmation
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Review your response summary before final evaluation.
              </p>
            </div>

            {/* Stats matrix */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/40">
                <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{answeredCount}</p>
                <p className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300">Answered</p>
              </div>
              <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40">
                <p className="text-xl font-extrabold text-rose-600 dark:text-rose-400">{unattemptedCount}</p>
                <p className="text-[11px] font-medium text-rose-700 dark:text-rose-300">Left Blank</p>
              </div>
              <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/40">
                <p className="text-xl font-extrabold text-purple-600 dark:text-purple-400">{markedCount}</p>
                <p className="text-[11px] font-medium text-purple-700 dark:text-purple-300">Marked</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                id="cancel-submit-btn"
                onClick={() => { setShowSubmitModal(false); soundManager.playClick(); }}
                className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors"
              >
                Resume Test
              </button>
              <button
                id="confirm-submit-btn"
                onClick={handleSubmitTest}
                className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Explanation Drawer Modal */}
      {showAIModal && (
        <AIExplanationModal
          question={currentQ}
          selectedOptionIndex={userAnswers[currentIndex] ?? -1}
          exam={exam}
          language={activeLang === 'hi' ? 'Hindi' : 'English'}
          onClose={() => setShowAIModal(false)}
        />
      )}
    </div>
  );
};
