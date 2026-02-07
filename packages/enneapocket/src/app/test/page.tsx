'use client';

import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { enneagramData } from '@/lib/data';
import { getScoreResult } from '@/lib/scoring';
import Link from 'next/link';

const SCALE = [0, 1, 2, 3, 4];

export default function TestPage() {
  const [mode, setMode] = useState<'quick_30' | 'pro_72'>('quick_30');
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const baseQuestions = mode === 'quick_30' ? enneagramData.questions.slice(0, 30) : enneagramData.questions.slice(0, 72);
  const answeredList = Object.entries(answers).map(([questionId, score]) => ({ questionId, score }));
  const result = getScoreResult(enneagramData, answeredList);
  const needsDiscriminators = mode === 'quick_30' && answeredList.length >= baseQuestions.length && result.confidence < 0.03;
  const discriminators = needsDiscriminators ? enneagramData.discriminators.slice(0, 6) : [];
  const questions = [...baseQuestions, ...discriminators];
  const complete = questions.length > 0 && questions.every((question) => answers[question.id] !== undefined);

  const topTypes = useMemo(() => {
    return result.top3.map((id) => enneagramData.types.find((type) => type.id === id));
  }, [result.top3]);

  useEffect(() => {
    if (!complete) return;
    window.localStorage.setItem(
      'enneapocket_test_result',
      JSON.stringify({ percents: result.percents, top3: result.top3, confidence: result.confidence })
    );
  }, [complete, result]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Test interactif</CardTitle>
          <CardDescription>Choisissez un mode et répondez avec une intensité de 0 à 4.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={mode} onValueChange={(value) => setMode(value as 'quick_30' | 'pro_72')}>
            <TabsList>
              <TabsTrigger tabValue="quick_30">Quick 30</TabsTrigger>
              <TabsTrigger tabValue="pro_72">Pro 72</TabsTrigger>
            </TabsList>
            <TabsContent tabValue="quick_30">
              <p className="text-sm text-slate-600">Mode adaptatif: +6 questions si les top2 sont proches.</p>
            </TabsContent>
            <TabsContent tabValue="pro_72">
              <p className="text-sm text-slate-600">Analyse approfondie pour équipes et coachs.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Questions</CardTitle>
          <CardDescription>
            {needsDiscriminators
              ? 'Discriminantes activées pour départager vos deux types dominants.'
              : 'Répondez aux items principaux.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea>
            <div className="space-y-4">
              {questions.map((question) => (
                <div key={question.id} className="rounded-2xl border border-slate-100 bg-white p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">{question.id}</p>
                    <Badge>{answers[question.id] ?? '—'}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{question.text}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {SCALE.map((score) => (
                      <Button
                        key={score}
                        variant={answers[question.id] === score ? 'secondary' : 'ghost'}
                        onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: score }))}
                      >
                        {score}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Résultat</CardTitle>
          <CardDescription>Weighted sum + softmax (%) pour les 9 types.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-3 gap-2 text-sm">
            {enneagramData.types.map((type) => (
              <div key={type.id} className="rounded-xl bg-white p-2 text-center">
                <p className="text-xs text-slate-400">Type {type.id}</p>
                <p className="text-sm font-semibold">{result.percents[type.id] ?? 0}%</p>
              </div>
            ))}
          </div>
          <Separator />
          <div className="space-y-2">
            <p className="text-sm font-semibold">Top 3</p>
            <div className="flex flex-wrap gap-2">
              {topTypes.map(
                (type) =>
                  type && (
                    <Badge key={type.id}>
                      {type.name} ({result.percents[type.id]}%)
                    </Badge>
                  )
              )}
            </div>
            <p className="text-xs text-slate-500">Confiance: {(result.confidence * 100).toFixed(1)}%</p>
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/test/wings" aria-disabled={!complete}>
            <Button disabled={!complete}>Confirmer les ailes</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
