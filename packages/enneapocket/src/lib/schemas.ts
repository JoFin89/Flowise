import { z } from 'zod';

export const featureSchema = z.object({
  appName: z.string(),
  tagline: z.string(),
  navigation: z.array(z.object({
    label: z.string(),
    href: z.string()
  })),
  sections: z.array(z.object({
    title: z.string(),
    description: z.string(),
    cta: z.object({
      label: z.string(),
      href: z.string()
    })
  }))
});

export const questionSchema = z.object({
  id: z.string(),
  text: z.string(),
  weights: z.record(z.string(), z.number())
});

export const enneagramSchema = z.object({
  types: z.array(z.object({
    id: z.number(),
    name: z.string(),
    summary: z.string(),
    keywords: z.array(z.string()),
    wings: z.array(z.number()),
    illustration: z.string()
  })),
  instincts: z.array(z.object({
    id: z.string(),
    label: z.string(),
    prompt: z.string()
  })),
  questions: z.array(questionSchema),
  discriminators: z.array(questionSchema),
  scenarios: z.array(z.object({
    id: z.string(),
    context: z.string(),
    targetType: z.number(),
    dialogue: z.string(),
    choices: z.array(z.object({
      label: z.string(),
      scores: z.object({
        connection: z.number(),
        trust: z.number(),
        conflict: z.number()
      }),
      correction: z.string()
    }))
  })),
  compatibility: z.object({
    engine: z.object({
      rules: z.array(z.object({
        context: z.string(),
        strengths: z.array(z.string()),
        risks: z.array(z.string()),
        dos: z.array(z.string()),
        donts: z.array(z.string()),
        repairSteps: z.array(z.string())
      })),
      specialCases: z.array(z.object({
        types: z.array(z.number()),
        context: z.string(),
        strengths: z.array(z.string()),
        risks: z.array(z.string()),
        dos: z.array(z.string()),
        donts: z.array(z.string()),
        repairSteps: z.array(z.string())
      }))
    })
  }),
  teamTemplates: z.object({
    byType: z.record(z.string(), z.object({
      synergies: z.array(z.string()),
      tensions: z.array(z.string()),
      recommendations: z.array(z.string())
    }))
  }),
  dailyAdvice: z.record(z.string(), z.array(z.string()))
});

export type EnneagramData = z.infer<typeof enneagramSchema>;
