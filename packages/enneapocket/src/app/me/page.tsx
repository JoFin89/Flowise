'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { enneagramData } from '@/lib/data';
import { useLocalStorage } from '@/lib/storage';

interface Profile {
  typeId?: number;
  wing?: number;
  instinct?: string;
  notes?: string;
  journal?: { id: string; date: string; text: string }[];
  goals?: { id: string; label: string; done: boolean }[];
}

const DEFAULT_GOALS = [
  { id: 'goal-1', label: 'Observer mes automatismes', done: false },
  { id: 'goal-2', label: 'Demander un feedback par semaine', done: false },
  { id: 'goal-3', label: 'Planifier un temps calme', done: false }
];

export default function ProfilePage() {
  const [profile, setProfile] = useLocalStorage<Profile>('enneapocket_profile', {
    journal: [],
    goals: DEFAULT_GOALS
  });
  const [noteInput, setNoteInput] = useState(profile.notes ?? '');
  const [journalInput, setJournalInput] = useState('');

  const type = enneagramData.types.find((item) => item.id === profile.typeId);

  const addJournal = () => {
    if (!journalInput) return;
    const next = {
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString('fr-FR'),
      text: journalInput
    };
    setProfile({ ...profile, journal: [...(profile.journal ?? []), next] });
    setJournalInput('');
  };

  const toggleGoal = (id: string) => {
    const updated = (profile.goals ?? DEFAULT_GOALS).map((goal) =>
      goal.id === id ? { ...goal, done: !goal.done } : goal
    );
    setProfile({ ...profile, goals: updated });
  };

  const removeJournal = (id: string) => {
    setProfile({ ...profile, journal: (profile.journal ?? []).filter((entry) => entry.id !== id) });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mon profil</CardTitle>
          <CardDescription>Type, ailes, instincts et notes personnelles.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge>Type {profile.typeId ?? '—'}</Badge>
            <Badge>Aile {profile.wing ?? '—'}</Badge>
            <Badge>Instinct {profile.instinct ?? '—'}</Badge>
          </div>
          {type && <p className="text-sm text-slate-500">{type.summary}</p>}
          <Separator />
          <div className="space-y-2">
            <p className="text-sm font-semibold">Notes</p>
            <Input
              placeholder="Ajouter une note"
              value={noteInput}
              onChange={(event) => setNoteInput(event.target.value)}
            />
            <Button onClick={() => setProfile({ ...profile, notes: noteInput })}>Enregistrer</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Journal</CardTitle>
          <CardDescription>Entrées locales (CRUD).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="Écrire une entrée"
            value={journalInput}
            onChange={(event) => setJournalInput(event.target.value)}
          />
          <Button onClick={addJournal}>Ajouter</Button>
          <div className="space-y-2">
            {(profile.journal ?? []).map((entry) => (
              <div key={entry.id} className="rounded-2xl border bg-white p-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500">{entry.date}</p>
                  <Button variant="ghost" onClick={() => removeJournal(entry.id)}>
                    Supprimer
                  </Button>
                </div>
                <p className="text-sm">{entry.text}</p>
              </div>
            ))}
            {!profile.journal?.length && <p className="text-sm text-slate-500">Ajoutez votre première entrée.</p>}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Growth goals</CardTitle>
          <CardDescription>Checklist et rappels.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {(profile.goals ?? DEFAULT_GOALS).map((goal) => (
            <div key={goal.id} className="flex items-center justify-between rounded-2xl border bg-white p-3">
              <p className={`text-sm ${goal.done ? 'line-through text-slate-400' : 'text-slate-700'}`}>{goal.label}</p>
              <Button variant="ghost" onClick={() => toggleGoal(goal.id)}>
                {goal.done ? 'Annuler' : 'Valider'}
              </Button>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button onClick={() => setProfile({ ...profile, goals: DEFAULT_GOALS })}>Réinitialiser</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Astuces rapides</CardTitle>
          <CardDescription>Sections pliables pour mobile.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion>
            <AccordionItem>
              <AccordionTrigger>Comment relire mes résultats ?</AccordionTrigger>
              <AccordionContent>Le type, l’aile et l’instinct sont disponibles en haut du profil.</AccordionContent>
            </AccordionItem>
            <AccordionItem>
              <AccordionTrigger>Comment utiliser le journal ?</AccordionTrigger>
              <AccordionContent>Ajoutez une entrée courte après chaque situation clé.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
