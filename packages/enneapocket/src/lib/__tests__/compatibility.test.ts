import { describe, expect, it } from 'vitest';
import { buildCompatibility } from '@/lib/compatibility';
import { enneagramData } from '@/lib/data';

describe('compatibility', () => {
  it('returns strengths and risks', () => {
    const result = buildCompatibility(enneagramData, 1, 5, 'Travail');
    expect(result.strengths.length).toBeGreaterThan(0);
    expect(result.risks.length).toBeGreaterThan(0);
  });
});
