'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { enneagramData } from '@/lib/data';
import { filterScenarios } from '@/lib/search';

export default function ScenariosPage() {
  const contexts = Array.from(new Set(enneagramData.scenarios.map((scenario) => scenario.context)));
  const [context, setContext] = useState(contexts[0] ?? '');
  const [targetType, setTargetType] = useState<number | undefined>(undefined);
  const [query, setQuery] = useState('');

  const scenarios = useMemo(() => {
    return filterScenarios(enneagramData, context, targetType).filter((scenario) =>
      scenario.dialogue.toLowerCase().includes(query.toLowerCase())
    );
  }, [context, targetType, query]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Scénarios</CardTitle>
          <CardDescription>Filtrez par contexte et type cible pour pratiquer.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {contexts.map((ctx) => (
              <Button key={ctx} variant={ctx === context ? 'secondary' : 'ghost'} onClick={() => setContext(ctx)}>
                {ctx}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {enneagramData.types.map((type) => (
              <Button
                key={type.id}
                variant={targetType === type.id ? 'secondary' : 'ghost'}
                onClick={() => setTargetType(targetType === type.id ? undefined : type.id)}
              >
                Type {type.id}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Command>
        <CommandInput placeholder="Rechercher un dialogue" value={query} onChange={(event) => setQuery(event.target.value)} />
        <CommandList>
          {scenarios.map((scenario) => (
            <CommandItem key={scenario.id}>
              <div>
                <p className="text-sm font-semibold">{scenario.dialogue}</p>
                <p className="text-xs text-slate-500">Contexte: {scenario.context}</p>
              </div>
              <Badge>Type {scenario.targetType}</Badge>
            </CommandItem>
          ))}
        </CommandList>
      </Command>

      {scenarios.map((scenario) => (
        <Card key={`${scenario.id}-detail`}>
          <CardHeader>
            <CardTitle>Mini-dialogue</CardTitle>
            <CardDescription>{scenario.dialogue}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {scenario.choices.map((choice) => (
              <div key={choice.label} className="rounded-2xl border bg-white p-3">
                <p className="text-sm font-semibold">{choice.label}</p>
                <div className="mt-2 flex gap-2 text-xs text-slate-500">
                  <span>Connexion: {choice.scores.connection}</span>
                  <span>Confiance: {choice.scores.trust}</span>
                  <span>Conflit: {choice.scores.conflict}</span>
                </div>
                <p className="mt-2 text-xs text-slate-500">{choice.correction}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
