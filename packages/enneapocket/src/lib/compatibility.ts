import type { EnneagramData } from '@/lib/schemas';

export interface CompatibilityResult {
  strengths: string[];
  risks: string[];
  dos: string[];
  donts: string[];
  repairSteps: string[];
}

export function buildCompatibility(data: EnneagramData, typeA: number, typeB: number, context: string): CompatibilityResult {
  const engine = data.compatibility.engine;
  const specialCase = engine.specialCases.find(
    (entry) => entry.context === context && entry.types.includes(typeA) && entry.types.includes(typeB)
  );

  const baseRule = engine.rules.find((rule) => rule.context === context) ?? engine.rules[0];
  const chosen = specialCase ?? baseRule;

  return {
    strengths: chosen.strengths,
    risks: chosen.risks,
    dos: chosen.dos,
    donts: chosen.donts,
    repairSteps: chosen.repairSteps
  };
}
