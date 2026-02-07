import type { EnneagramData } from '@/lib/schemas';

export function filterScenarios(data: EnneagramData, context: string, targetType?: number) {
  return data.scenarios.filter((scenario) => {
    const matchesContext = context ? scenario.context === context : true;
    const matchesType = targetType ? scenario.targetType === targetType : true;
    return matchesContext && matchesType;
  });
}
