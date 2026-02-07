'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { enneagramData } from '@/lib/data';

export default function NotificationsPage() {
  const [typeId, setTypeId] = useState(1);
  const [status, setStatus] = useState('');

  const advice = enneagramData.dailyAdvice[String(typeId)]?.[0] ?? 'Conseil personnalisé à venir.';

  const requestNotification = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      setStatus('Notifications non disponibles, utilisation du rappel in-app.');
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      new Notification('EnnéaPocket', { body: advice });
      setStatus('Notification envoyée !');
    } else {
      setStatus('Permission refusée, rappel in-app activé.');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Conseil du jour</CardTitle>
          <CardDescription>Personnalisez selon votre type.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {enneagramData.types.map((type) => (
              <Button
                key={type.id}
                variant={typeId === type.id ? 'secondary' : 'ghost'}
                onClick={() => setTypeId(type.id)}
              >
                Type {type.id}
              </Button>
            ))}
          </div>
          <div className="rounded-2xl border bg-white p-4">
            <Badge>Type {typeId}</Badge>
            <p className="mt-2 text-sm text-slate-600">{advice}</p>
          </div>
          <Button onClick={requestNotification}>Activer le rappel</Button>
          {status && <p className="text-xs text-slate-500">{status}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
