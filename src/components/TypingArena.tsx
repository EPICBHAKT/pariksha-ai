import React, { useState, useEffect, useRef } from 'react';
import { 
  Keyboard, 
  Clock, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Trophy, 
  Zap, 
  Flame, 
  Play, 
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TypingPassage, TypingResult, AppSettings } from '../types';
import { TYPING_PASSAGES } from '../data/typingPassages';
import { storage } from '../utils/storage';
import { soundManager } from '../utils/audio';
import { getTranslation } from '../utils/translations';

interface TypingArenaProps {
  onTestCompleted?: (result: TypingResult) => void;
  language?: AppSettings['language'];
}

export const TypingArena: React.FC<TypingArenaProps> = ({ 
  onTestCompleted,
  language = 'en'
}) => {
  const t = getTranslation(language);
  const [selectedPassage, setSelectedPassage] = useState<TypingPassage>(TYPING_PASSAGES[0]);
  const [userInput, setUserInput] = useState<string>('');
  const [timeRemaining, setTimeRemaining] = useState<number>(60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [backspaceCount, setBackspaceCount] = useState<number>(0);
  const [history, setHistory] = useState<TypingResult[]>([]);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setHistory(storage.getTypingHistory());
  }, [isFinished]);

  // Timer loop
  useEffect(() => {
    let interval: any = null;
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            finishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeRemaining]);

  const startTest = () => {
    setUserInput('');
    setTimeRemaining(selectedPassage.durationSeconds);
    setIsActive(true);
    setIsFinished(false);
    setBackspaceCount(0);
    soundManager.playClick();
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isActive && !isFinished) {
      setIsActive(true);
    }
    const val = e.target.value;
    setUserInput(val);
    soundManager.playClick();

    // Check if whole passage is typed
    if (val.length >= selectedPassage.text.length) {
      finishTest(val);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Backspace') {
      setBackspaceCount(prev => prev + 1);
    }
  };

  const calculateStats = (input: string = userInput, timeSpentSec: number = 60 - timeRemaining) => {
    const timeInMins = Math.max(timeSpentSec, 1) / 60;
    const targetText = selectedPassage.text;

    let correctChars = 0;
    let errorChars = 0;

    for (let i = 0; i < input.length; i++) {
      if (input[i] === targetText[i]) {
        correctChars += 1;
      } else {
        errorChars += 1;
      }
    }

    const totalCharsTyped = input.length;
    const rawWpm = Math.round((totalCharsTyped / 5) / timeInMins);
    const netWpm = Math.max(0, Math.round(((correctChars / 5) - (errorChars / 5)) / timeInMins));
    const accuracy = totalCharsTyped > 0 ? Math.round((correctChars / totalCharsTyped) * 100) : 100;
    const isPassed = netWpm >= selectedPassage.targetWpm && accuracy >= 90;

    return {
      rawWpm,
      netWpm: netWpm || rawWpm,
      accuracy,
      correctChars,
      errorChars,
      totalChars: totalCharsTyped,
      isPassed
    };
  };

  const finishTest = (finalInput: string = userInput) => {
    setIsActive(false);
    setIsFinished(true);

    const timeSpent = selectedPassage.durationSeconds - timeRemaining || 60;
    const stats = calculateStats(finalInput, timeSpent);

    const result: TypingResult = {
      id: `type_${Date.now()}`,
      passageId: selectedPassage.id,
      passageTitle: selectedPassage.title,
      wpm: stats.netWpm,
      rawWpm: stats.rawWpm,
      netWpm: stats.netWpm,
      accuracy: stats.accuracy,
      totalChars: stats.totalChars,
      correctChars: stats.correctChars,
      errorChars: stats.errorChars,
      backspaces: backspaceCount,
      durationSeconds: timeSpent,
      isPassed: stats.isPassed,
      date: new Date().toISOString()
    };

    storage.saveTypingResult(result);
    if (onTestCompleted) onTestCompleted(result);

    if (stats.isPassed) {
      soundManager.playFanfare();
      confetti({ particleCount: 70, spread: 60 });
    } else {
      soundManager.playCorrect();
    }
  };

  const currentStats = calculateStats();

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Official SSC CGL & RRB Skill Test Standard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.typingArenaTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            {t.typingArenaSubtitle}
          </p>
        </div>

        {/* Real-time stats pill */}
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20">
          <div className="text-center">
            <span className="text-[10px] text-slate-300 font-bold uppercase">{t.netSpeed}</span>
            <p className="text-2xl font-extrabold text-amber-400">{currentStats.netWpm} <span className="text-xs font-medium text-white">WPM</span></p>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center">
            <span className="text-[10px] text-slate-300 font-bold uppercase">{t.accuracyRate}</span>
            <p className="text-2xl font-extrabold text-emerald-400">{currentStats.accuracy}%</p>
          </div>
        </div>
      </div>

      {/* Passage Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {TYPING_PASSAGES.map((pass) => (
          <button
            key={pass.id}
            id={`passage-btn-${pass.id}`}
            onClick={() => {
              setSelectedPassage(pass);
              setUserInput('');
              setIsActive(false);
              setIsFinished(false);
              setTimeRemaining(60);
              soundManager.playClick();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedPassage.id === pass.id
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span>{pass.title}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
              {pass.targetWpm} WPM
            </span>
          </button>
        ))}
      </div>

      {/* Main Interactive Typing Box */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* Top Status & Timer Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm text-slate-900 dark:text-white">
              {selectedPassage.title}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold">
              Target: {selectedPassage.targetWpm} WPM
            </span>
          </div>

          <div className={`flex items-center gap-1.5 font-mono font-bold text-sm px-3.5 py-1.5 rounded-xl ${
            timeRemaining <= 10
              ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 animate-pulse'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
          }`}>
            <Clock className="w-4 h-4" />
            <span>00:{timeRemaining.toString().padStart(2, '0')}</span>
          </div>
        </div>

        {/* Target Text Display with Real-time Character Highlighting */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 font-mono text-sm leading-relaxed max-h-48 overflow-y-auto select-none">
          {selectedPassage.text.split('').map((char, index) => {
            let charStyle = 'text-slate-500 dark:text-slate-400';
            const userChar = userInput[index];

            if (userChar !== undefined) {
              if (userChar === char) {
                charStyle = 'text-emerald-600 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/60 font-semibold';
              } else {
                charStyle = 'text-rose-600 dark:text-rose-400 bg-rose-200 dark:bg-rose-950/80 underline font-bold';
              }
            } else if (index === userInput.length) {
              charStyle = 'bg-indigo-500 text-white animate-pulse font-bold px-0.5 rounded-xs';
            }

            return (
              <span key={index} className={charStyle}>
                {char}
              </span>
            );
          })}
        </div>

        {/* Input Area */}
        <div className="space-y-4">
          <textarea
            ref={inputRef}
            id="typing-test-input"
            rows={4}
            disabled={isFinished}
            placeholder={isActive ? t.keepTypingPrompt : t.clickToStartTyping}
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-full p-4 rounded-2xl font-mono text-sm sm:text-base bg-white dark:bg-slate-800 border-2 border-indigo-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 resize-none transition-all disabled:opacity-60"
          />

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span>{t.keystrokes}: {userInput.length}</span>
              <span>{t.errors}: {currentStats.errorChars}</span>
              <span>{t.backspaces}: {backspaceCount}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="reset-typing-btn"
                onClick={startTest}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.restartOneMin}</span>
              </button>

              {isActive && (
                <button
                  id="finish-typing-btn"
                  onClick={() => finishTest()}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  {t.completeTypingTest}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Result Evaluation Card */}
        {isFinished && (
          <div className="p-6 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/50 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Typing Test Results & Evaluation
                </h3>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                currentStats.isPassed
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
              }`}>
                {currentStats.isPassed ? '✓ QUALIFIED (Pass)' : '✕ Below Cutoff'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-500">{t.netSpeed}</span>
                <p className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">{currentStats.netWpm}</p>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-500">{t.accuracyRate}</span>
                <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{currentStats.accuracy}%</p>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-500">Raw Speed</span>
                <p className="text-xl font-extrabold text-slate-800 dark:text-slate-200">{currentStats.rawWpm} WPM</p>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-500">Benchmark</span>
                <p className="text-xl font-extrabold text-slate-800 dark:text-slate-200">{selectedPassage.targetWpm} WPM</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              {currentStats.isPassed
                ? 'Outstanding performance! You meet the qualification criteria for SSC and Railway typing skill tests with high accuracy.'
                : `Aim for at least ${selectedPassage.targetWpm} Net WPM with >90% accuracy. Minimize backspaces to boost rhythm.`}
            </p>
          </div>
        )}
      </div>

      {/* History Log */}
      {history.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
            Recent Typing Test Records
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {history.slice(0, 3).map((item) => (
              <div key={item.id} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{item.wpm} WPM</span>
                  <span className={`font-bold ${item.isPassed ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {item.accuracy}% Acc
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 truncate">{item.passageTitle}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
