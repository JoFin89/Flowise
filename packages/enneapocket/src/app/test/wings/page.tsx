'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { enneagramData } from '@/lib/data';
import { useLocalStorage } from '@/lib/storage';
import Link from 'next/link';

interface Profile {
  typeId?: number;
  wing?: number;
  instinct?: string;
  notes?: string;
  journal?: { id: string; date: string; text: string }[];
  goals?: { id: string; label: string; done: boolean }[];
}

export default function WingsPage() {
  const [profile, setProfile] = useLocalStorage<Profile>('enneapocket_profile', {});
  const [selectedWing, setSelectedWing] = useState<number | undefined>(profile.wing);

  const testResult = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const stored = window.localStorage.getItem('enneapocket_test_result');
    return stored ? (JSON.parse(stored) as { top3: number[] }) : null;
  }, []);

  const topTypeId = testResult?.top3?.[0] ?? profile.typeId ?? 1;
  const topType = enneagramData.types.find((type) => type.id === topTypeId) ?? enneagramData.types[0];

  const handleConfirm = () => {
    setProfile({ ...profile, typeId: topTypeId, wing: selectedWing ?? topType.wings[0] });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Confirmation des ailes</CardTitle>
          <CardDescription>Choisissez l’aile qui nuance votre type principal.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Type dominant</p>
              <p className="text-lg font-semibold">{topType.name}</p>
            </div>
            <Badge>Type {topType.id}</Badge>
          </div>
          <div className="flex gap-3">
            {topType.wings.map((wing) => (
              <Button
                key={wing}
                variant={selectedWing === wing ? 'secondary' : 'ghost'}
                onClick={() => setSelectedWing(wing)}
              >
                Aile {wing}
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/test/instincts">
            <Button onClick={handleConfirm}>Continuer vers les instincts</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
