import { describe, expect, it } from 'vitest';
import { getScoreResult } from '@/lib/scoring';
import { enneagramData } from '@/lib/data';

describe('scoring', () => {
  it('computes top3 and confidence', () => {
    const answers = enneagramData.questions.slice(0, 5).map((question) => ({
      questionId: question.id,
      score: 3
    }));
    const result = getScoreResult(enneagramData, answers);
    expect(result.top3).toHaveLength(3);
    expect(result.confidence).toBeGreaterThanOrEqual(0);
  });
});
