import type { EnneagramData } from '@/lib/schemas';

export interface Answer {
  questionId: string;
  score: number;
}

export interface ScoreResult {
  totals: Record<number, number>;
  percents: Record<number, number>;
  top3: number[];
  confidence: number;
}

export function computeWeightedScores(data: EnneagramData, answers: Answer[]): Record<number, number> {
  const totals: Record<number, number> = {};
  for (const type of data.types) {
    totals[type.id] = 0;
  }

  const questionMap = new Map(data.questions.map((q) => [q.id, q]));
  const discriminatorMap = new Map(data.discriminators.map((q) => [q.id, q]));

  for (const answer of answers) {
    const question = questionMap.get(answer.questionId) ?? discriminatorMap.get(answer.questionId);
    if (!question) continue;
    for (const [typeId, weight] of Object.entries(question.weights)) {
      const key = Number(typeId);
      totals[key] = (totals[key] ?? 0) + weight * answer.score;
    }
  }

  return totals;
}

export function softmaxPercent(totals: Record<number, number>): Record<number, number> {
  const values = Object.values(totals);
  const max = Math.max(...values, 0);
  const expValues = values.map((value) => Math.exp(value - max));
  const sum = expValues.reduce((acc, value) => acc + value, 0) || 1;
  const result: Record<number, number> = {};
  Object.keys(totals).forEach((key, index) => {
    result[Number(key)] = Number(((expValues[index] / sum) * 100).toFixed(1));
  });
  return result;
}

export function getScoreResult(data: EnneagramData, answers: Answer[]): ScoreResult {
  const totals = computeWeightedScores(data, answers);
  const percents = softmaxPercent(totals);
  const sorted = Object.entries(percents)
    .sort((a, b) => b[1] - a[1])
    .map(([key]) => Number(key));
  const top3 = sorted.slice(0, 3);
  const confidence = Number(((percents[top3[0]] - (percents[top3[1]] ?? 0)) / 100).toFixed(2));
  return { totals, percents, top3, confidence };
}
