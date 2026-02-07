'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { enneagramData } from '@/lib/data';
import { buildCompatibility } from '@/lib/compatibility';

export default function CompatibilityPage() {
  const contexts = Array.from(new Set(enneagramData.compatibility.engine.rules.map((rule) => rule.context)));
  const [typeA, setTypeA] = useState(1);
  const [typeB, setTypeB] = useState(2);
  const [context, setContext] = useState(contexts[0] ?? 'Travail');
  const [open, setOpen] = useState(false);

  const result = useMemo(() => buildCompatibility(enneagramData, typeA, typeB, context), [typeA, typeB, context]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Compatibilité</CardTitle>
          <CardDescription>Sélectionnez deux types et un contexte.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xs font-semibold text-slate-500">Type A</p>
            <div className="flex flex-wrap gap-2">
              {enneagramData.types.map((type) => (
                <Button
                  key={type.id}
                  variant={typeA === type.id ? 'secondary' : 'ghost'}
                  onClick={() => setTypeA(type.id)}
                >
                  {type.id}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Type B</p>
            <div className="flex flex-wrap gap-2">
              {enneagramData.types.map((type) => (
                <Button
                  key={type.id}
                  variant={typeB === type.id ? 'secondary' : 'ghost'}
                  onClick={() => setTypeB(type.id)}
                >
                  {type.id}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {contexts.map((ctx) => (
              <Button key={ctx} variant={ctx === context ? 'secondary' : 'ghost'} onClick={() => setContext(ctx)}>
                {ctx}
              </Button>
            ))}
          </div>
          <Button onClick={() => setOpen(true)}>Voir le diagnostic</Button>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Compatibilité {typeA} / {typeB}</DialogTitle>
            <DialogDescription>Contexte: {context}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-sm">
            <div>
              <Badge>Forces</Badge>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
                {result.strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <Badge>Risques</Badge>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
                {result.risks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <Badge>À faire</Badge>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
                {result.dos.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <Badge>À éviter</Badge>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
                {result.donts.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <Badge>Réparation</Badge>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
                {result.repairSteps.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
