import { describe, expect, it } from 'vitest';
import { filterScenarios } from '@/lib/search';
import { enneagramData } from '@/lib/data';

describe('search', () => {
  it('filters scenarios by context', () => {
    const results = filterScenarios(enneagramData, 'Travail');
    expect(results.every((scenario) => scenario.context === 'Travail')).toBe(true);
  });
});
