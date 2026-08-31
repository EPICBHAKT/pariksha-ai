import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  BookOpen, 
  Zap, 
  Lightbulb, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw,
  Bot,
  User,
  Loader2,
  Copy,
  Check
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Question, ExamInfo } from '../types';
import { soundManager } from '../utils/audio';

interface AIExplanationModalProps {
  question: Question;
  selectedOptionIndex: number; // -1 if not attempted
  exam?: ExamInfo | null;
  language?: string;
  onClose: () => void;
}

export const AIExplanationModal: React.FC<AIExplanationModalProps> = ({
  question,
  selectedOptionIndex,
  exam,
  language = 'English',
  onClose
}) => {
  const [explanation, setExplanation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  // Doubt Chat
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [chatInput, setChatInput] = useState<string>('');
  const [isChatSending, setIsChatSending] = useState<boolean>(false);

  const userAnswerLetter = selectedOptionIndex >= 0 ? String.fromCharCode(65 + selectedOptionIndex) : 'Unattempted';

  useEffect(() => {
    fetchExplanation();
  }, [question.id, language]);

  const fetchExplanation = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question.question,
          options: question.options,
          correctAnswer: question.correctOption,
          userAnswer: userAnswerLetter,
          subject: question.subject,
          examName: exam?.name || 'Competitive Exam',
          language
        })
      });
      const data = await res.json();
      if (data.success && data.explanation) {
        setExplanation(data.explanation);
      } else {
        // Fallback to embedded explanation
        setExplanation(`### **Solution & Concept**\n\n**Correct Answer: Option (${question.correctOption})**\n\n${question.explanation}\n\n💡 **Exam Shortcut Trick:**\n${question.shortcutTrick || 'Eliminate extreme options and apply standard syllabus rules.'}`);
      }
    } catch (e) {
      setExplanation(`### **Solution & Concept**\n\n**Correct Answer: Option (${question.correctOption})**\n\n${question.explanation}\n\n💡 **Exam Shortcut Trick:**\n${question.shortcutTrick || 'Eliminate extreme options and apply standard syllabus rules.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isChatSending) return;
    const userMsg = chatInput.trim();
    setChatInput('');
    soundManager.playClick();

    const newHistory = [...chatMessages, { role: 'user' as const, content: userMsg }];
    setChatMessages(newHistory);
    setIsChatSending(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory,
          context: {
            question: question.question,
            correctOption: question.correctOption,
            subject: question.subject,
            topic: question.topic
          }
        })
      });
      const data = await res.json();
      if (data.success && data.reply) {
        setChatMessages([...newHistory, { role: 'assistant', content: data.reply }]);
        soundManager.playCorrect();
      } else {
        setChatMessages([...newHistory, { role: 'assistant', content: 'For this question, always check the fundamental rule or formula first. Try eliminating obvious wrong options.' }]);
      }
    } catch (e) {
      setChatMessages([...newHistory, { role: 'assistant', content: 'Could not connect to AI Mentor. Please review the step-by-step solution provided above.' }]);
    } finally {
      setIsChatSending(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(explanation);
    setCopied(true);
    soundManager.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div 
        id="ai-explanation-drawer"
        className="w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-amber-500 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                ParikshaAI Step-by-Step Mentor
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 font-semibold">
                  Instant AI Solver
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {question.subject} • {question.topic}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              id="copy-ai-notes-btn"
              onClick={handleCopy}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 text-xs flex items-center gap-1 transition-colors"
              title="Copy notes"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              id="close-ai-modal-btn"
              onClick={() => { onClose(); soundManager.playClick(); }}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Question Summary Bar */}
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
            <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
              {question.question}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Correct: Option ({question.correctOption})
              </span>
              {selectedOptionIndex >= 0 && (
                <span className={`flex items-center gap-1 font-bold ${
                  selectedOptionIndex === question.correctIndex
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-rose-600 dark:text-rose-400'
                }`}>
                  {selectedOptionIndex === question.correctIndex ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  Your Pick: Option ({userAnswerLetter})
                </span>
              )}
            </div>
          </div>

          {/* AI Explanation Content */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                Detailed AI Breakdown & Shortcut
              </span>
              {isLoading && (
                <span className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Generating step-by-step logic...
                </span>
              )}
            </div>

            {isLoading ? (
              <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center space-y-3 text-center">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 animate-bounce">
                  <Sparkles className="w-5 h-5" />
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  ParikshaAI is crafting shortcut formulas, topper elimination tricks, and conceptual clarity...
                </p>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 text-slate-800 dark:text-slate-200 text-sm leading-relaxed space-y-3">
                <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:my-1.5">
                  <ReactMarkdown>{explanation}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>

          {/* Doubt Solver / Ask AI Follow-up */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-5 space-y-4">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Have a Doubt? Ask Your AI Tutor
              </h4>
            </div>

            {/* Quick suggested follow-up prompts */}
            <div className="flex flex-wrap gap-1.5">
              {[
                'Why are the other options wrong?',
                'Give me a 20-second shortcut formula',
                'Give another practice question on this topic',
                'How is this tested in SSC CGL / NTPC?'
              ].map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => { setChatInput(prompt); soundManager.playClick(); }}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-100 dark:hover:bg-indigo-950 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors border border-slate-200 dark:border-slate-700"
                >
                  💬 {prompt}
                </button>
              ))}
            </div>

            {/* Chat Thread */}
            {chatMessages.length > 0 && (
              <div className="space-y-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 max-h-60 overflow-y-auto">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2 text-xs ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 text-[10px]">
                        AI
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-indigo-600 text-white font-medium rounded-tr-xs'
                          : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-tl-xs'
                      }`}
                    >
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                ))}
                {isChatSending && (
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-500" />
                    <span>AI Mentor is typing...</span>
                  </div>
                )}
              </div>
            )}

            {/* Chat Input Bar */}
            <div className="flex items-center gap-2">
              <input
                id="ai-doubt-input"
                type="text"
                placeholder="Ask any question or clarification about this solution..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                className="flex-1 px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
              <button
                id="send-ai-doubt-btn"
                onClick={handleSendMessage}
                disabled={!chatInput.trim() || isChatSending}
                className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
