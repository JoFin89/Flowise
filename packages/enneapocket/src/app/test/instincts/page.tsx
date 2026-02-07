'use client';

import { useState } from 'react';
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

export default function InstinctsPage() {
  const [profile, setProfile] = useLocalStorage<Profile>('enneapocket_profile', {});
  const [selectedInstinct, setSelectedInstinct] = useState<string | undefined>(profile.instinct);

  const handleSave = () => {
    setProfile({ ...profile, instinct: selectedInstinct ?? enneagramData.instincts[0].id });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Confirmation des instincts</CardTitle>
          <CardDescription>Choisissez votre priorité instinctive.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {enneagramData.instincts.map((instinct) => (
            <div key={instinct.id} className="flex items-center justify-between rounded-2xl border bg-white p-3">
              <div>
                <p className="text-sm font-semibold">{instinct.label}</p>
                <p className="text-xs text-slate-500">{instinct.prompt}</p>
              </div>
              <Button
                variant={selectedInstinct === instinct.id ? 'secondary' : 'ghost'}
                onClick={() => setSelectedInstinct(instinct.id)}
              >
                <Badge>{instinct.id}</Badge>
              </Button>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Link href="/me">
            <Button onClick={handleSave}>Sauvegarder dans mon profil</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
