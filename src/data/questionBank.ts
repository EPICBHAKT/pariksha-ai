import { Question, Subject } from '../types';
import { QUANT_QUESTIONS } from './questions/quantQuestions';
import { REASONING_QUESTIONS } from './questions/reasoningQuestions';
import { GK_QUESTIONS } from './questions/gkQuestions';
import { ENGLISH_QUESTIONS } from './questions/englishQuestions';
import { SCIENCE_QUESTIONS } from './questions/scienceQuestions';
import { COMPUTER_QUESTIONS } from './questions/computerQuestions';
import { BANKING_QUESTIONS } from './questions/bankingQuestions';

// Raw Master Question Bank containing 385+ authentic, distinct questions across all subjects
const RAW_ALL_QUESTIONS: Question[] = [
  ...QUANT_QUESTIONS,
  ...REASONING_QUESTIONS,
  ...GK_QUESTIONS,
  ...ENGLISH_QUESTIONS,
  ...SCIENCE_QUESTIONS,
  ...COMPUTER_QUESTIONS,
  ...BANKING_QUESTIONS
];

/**
 * Fisher-Yates (Knuth) Shuffle algorithm for unbiased, truly random question ordering
 */
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Guarantees balanced distribution of correct answers across options A, B, C, and D
 * (exactly ~25% for each option letter), eliminating any single-option bias.
 * Seamlessly preserves option text, Hindi translations, and correct evaluation integrity.
 */
export function balanceOptionDistribution(questions: Question[]): Question[] {
  if (!questions || questions.length === 0) return [];

  // Generate an evenly distributed sequence of target correct indices: [0, 1, 2, 3, 0, 1, 2, 3, ...]
  // 0 = A (25%), 1 = B (25%), 2 = C (25%), 3 = D (25%)
  const targetIndices: number[] = [];
  for (let i = 0; i < questions.length; i++) {
    targetIndices.push(i % 4);
  }
  const shuffledTargetIndices = shuffleArray(targetIndices);
  const optionLetters: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];

  return questions.map((q, idx) => {
    if (!q.options || q.options.length !== 4) return q;

    let origCorrectIdx = 0;
    if (typeof q.correctIndex === 'number' && q.correctIndex >= 0 && q.correctIndex < 4) {
      origCorrectIdx = q.correctIndex;
    } else if (q.correctOption) {
      const letterIdx = ['A', 'B', 'C', 'D'].indexOf(q.correctOption);
      if (letterIdx >= 0) origCorrectIdx = letterIdx;
    }

    const correctOptionText = q.options[origCorrectIdx];
    const correctHindiText = q.optionsHindi && q.optionsHindi[origCorrectIdx] !== undefined 
      ? q.optionsHindi[origCorrectIdx] 
      : undefined;

    // Distractor indices from original array
    const distractorIndices = [0, 1, 2, 3].filter(i => i !== origCorrectIdx);
    const shuffledDistractorIndices = shuffleArray(distractorIndices);

    const targetCorrectIndex = shuffledTargetIndices[idx];
    const newOptions: string[] = new Array(4);
    const newOptionsHindi: (string | undefined)[] = q.optionsHindi ? new Array(4) : [];

    // Place correct option at target index
    newOptions[targetCorrectIndex] = correctOptionText;
    if (q.optionsHindi && correctHindiText !== undefined) {
      newOptionsHindi[targetCorrectIndex] = correctHindiText;
    }

    // Place distractors in the other slots
    let distractorPtr = 0;
    for (let slot = 0; slot < 4; slot++) {
      if (slot !== targetCorrectIndex) {
        const origDistIdx = shuffledDistractorIndices[distractorPtr++];
        newOptions[slot] = q.options[origDistIdx];
        if (q.optionsHindi && q.optionsHindi[origDistIdx] !== undefined) {
          newOptionsHindi[slot] = q.optionsHindi[origDistIdx];
        }
      }
    }

    return {
      ...q,
      options: newOptions,
      ...(q.optionsHindi ? { optionsHindi: newOptionsHindi as string[] } : {}),
      correctIndex: targetCorrectIndex,
      correctOption: optionLetters[targetCorrectIndex]
    };
  });
}

// Master Question Bank with balanced 25% A/B/C/D option distribution
export const ALL_QUESTIONS: Question[] = balanceOptionDistribution(RAW_ALL_QUESTIONS);

export const BASE_QUESTION_BANK: Question[] = ALL_QUESTIONS;

/**
 * Normalizes subject names to ensure robust matching across synonyms/aliases
 */
function matchesSubject(qSubject: string, targetSubject: string): boolean {
  if (!targetSubject || targetSubject === 'ALL') return true;
  const qNorm = qSubject.toLowerCase().trim();
  const tNorm = targetSubject.toLowerCase().trim();

  if (qNorm === tNorm) return true;
  if ((qNorm.includes('general awareness') || qNorm.includes('gk') || qNorm.includes('general knowledge')) &&
      (tNorm.includes('general awareness') || tNorm.includes('gk') || tNorm.includes('general knowledge'))) {
    return true;
  }
  if ((qNorm.includes('english') || qNorm.includes('comprehension')) &&
      (tNorm.includes('english') || tNorm.includes('comprehension'))) {
    return true;
  }
  if ((qNorm.includes('quant') || qNorm.includes('math')) &&
      (tNorm.includes('quant') || tNorm.includes('math'))) {
    return true;
  }
  if (qNorm.includes('reasoning') && tNorm.includes('reasoning')) return true;
  if (qNorm.includes('science') && tNorm.includes('science')) return true;
  if (qNorm.includes('computer') && tNorm.includes('computer')) return true;
  if (qNorm.includes('banking') && tNorm.includes('banking')) return true;

  return false;
}

/**
 * Generates an exam question set with ZERO REPETITION.
 * Every single question returned is strictly unique.
 */
export function generateExamQuestions(
  examName: string,
  targetCount: number = 25,
  subjectFilter?: Subject | 'ALL',
  difficultyFilter?: 'ALL' | 'Easy' | 'Moderate' | 'Hard'
): Question[] {
  let primaryPool = [...ALL_QUESTIONS];

  if (subjectFilter && subjectFilter !== 'ALL') {
    primaryPool = primaryPool.filter(q => matchesSubject(q.subject, subjectFilter));
  }

  if (difficultyFilter && difficultyFilter !== 'ALL') {
    const diffFiltered = primaryPool.filter(q => q.difficulty === difficultyFilter);
    // Use difficulty filter if sufficient questions exist, otherwise fallback to entire subject pool
    if (diffFiltered.length >= targetCount) {
      primaryPool = diffFiltered;
    }
  }

  // Shuffle primary pool randomly
  let shuffledPrimary = shuffleArray(primaryPool);

  const selectedQuestions: Question[] = [];
  const seenIds = new Set<string>();
  const seenQuestions = new Set<string>();

  // Pick unique questions from the filtered pool first
  for (const q of shuffledPrimary) {
    if (selectedQuestions.length >= targetCount) break;
    const normalizedText = q.question.trim().toLowerCase();
    if (!seenIds.has(q.id) && !seenQuestions.has(normalizedText)) {
      seenIds.add(q.id);
      seenQuestions.add(normalizedText);
      selectedQuestions.push({
        ...q,
        id: `q_${examName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${selectedQuestions.length + 1}`,
        examTags: Array.from(new Set([...(q.examTags || []), examName]))
      });
    }
  }

  // If more questions are requested than available in the specific filter, draw unique questions from the broader bank without repeating
  if (selectedQuestions.length < targetCount) {
    const remainingShuffled = shuffleArray(ALL_QUESTIONS);
    for (const q of remainingShuffled) {
      if (selectedQuestions.length >= targetCount) break;
      const normalizedText = q.question.trim().toLowerCase();
      if (!seenIds.has(q.id) && !seenQuestions.has(normalizedText)) {
        seenIds.add(q.id);
        seenQuestions.add(normalizedText);
        selectedQuestions.push({
          ...q,
          id: `q_${examName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${selectedQuestions.length + 1}`,
          examTags: Array.from(new Set([...(q.examTags || []), examName]))
        });
      }
    }
  }

  return balanceOptionDistribution(selectedQuestions);
}

/**
 * Generates a mock set of questions with GUARANTEED ZERO REPETITION and balanced 25% A/B/C/D distribution.
 */
export function generateMockSet(
  targetCount: number = 25,
  subjects?: Subject[],
  difficultyFilter?: 'ALL' | 'Easy' | 'Moderate' | 'Hard'
): Question[] {
  let pool = [...ALL_QUESTIONS];

  if (subjects && subjects.length > 0) {
    pool = pool.filter(q => subjects.some(s => matchesSubject(q.subject, s)));
  }

  if (difficultyFilter && difficultyFilter !== 'ALL') {
    const diffFiltered = pool.filter(q => q.difficulty === difficultyFilter);
    if (diffFiltered.length >= targetCount) {
      pool = diffFiltered;
    }
  }

  const shuffledPool = shuffleArray(pool);
  const result: Question[] = [];
  const seenIds = new Set<string>();
  const seenQuestions = new Set<string>();

  for (const item of shuffledPool) {
    if (result.length >= targetCount) break;
    const textKey = item.question.trim().toLowerCase();
    if (!seenIds.has(item.id) && !seenQuestions.has(textKey)) {
      seenIds.add(item.id);
      seenQuestions.add(textKey);
      result.push({
        ...item,
        id: `mock_q_${result.length + 1}`
      });
    }
  }

  // If still need more to meet targetCount, pull from remaining master bank
  if (result.length < targetCount) {
    const masterShuffled = shuffleArray(ALL_QUESTIONS);
    for (const item of masterShuffled) {
      if (result.length >= targetCount) break;
      const textKey = item.question.trim().toLowerCase();
      if (!seenIds.has(item.id) && !seenQuestions.has(textKey)) {
        seenIds.add(item.id);
        seenQuestions.add(textKey);
        result.push({
          ...item,
          id: `mock_q_${result.length + 1}`
        });
      }
    }
  }

  return balanceOptionDistribution(result);
}

/**
 * Returns the exact count of unique questions available per subject
 */
export function getSubjectQuestionCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const q of ALL_QUESTIONS) {
    const sub = q.subject;
    counts[sub] = (counts[sub] || 0) + 1;
  }
  return counts;
}
