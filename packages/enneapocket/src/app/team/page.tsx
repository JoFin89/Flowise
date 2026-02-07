'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { enneagramData } from '@/lib/data';
import { useLocalStorage } from '@/lib/storage';

interface Member {
  id: string;
  name: string;
  role: string;
  type: number;
  wing: number;
  instincts: string;
  stress: string;
}

export default function TeamPage() {
  const [members, setMembers] = useLocalStorage<Member[]>('enneapocket_team', []);
  const [premium, setPremium] = useState(false);
  const [form, setForm] = useState<Omit<Member, 'id'>>({
    name: '',
    role: '',
    type: 1,
    wing: 2,
    instincts: 'sp',
    stress: 'Bas'
  });

  const addMember = () => {
    if (!form.name) return;
    setMembers([...members, { ...form, id: crypto.randomUUID() }]);
    setForm({ ...form, name: '', role: '' });
  };

  const templates = enneagramData.teamTemplates.byType[String(form.type)];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mode équipe</CardTitle>
          <CardDescription>Ajoutez des membres et générez des synergies/tensions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge>{premium ? 'Premium actif' : 'Premium mock'}</Badge>
            <Button variant="ghost" onClick={() => setPremium((prev) => !prev)}>
              {premium ? 'Désactiver' : 'Activer'}
            </Button>
          </div>
          <div className="space-y-2">
            <Input placeholder="Nom" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
            <Input placeholder="Rôle" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} />
            <div className="flex flex-wrap gap-2">
              {enneagramData.types.map((type) => (
                <Button
                  key={type.id}
                  variant={form.type === type.id ? 'secondary' : 'ghost'}
                  onClick={() => setForm({ ...form, type: type.id, wing: type.wings[0] })}
                >
                  Type {type.id}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {enneagramData.instincts.map((instinct) => (
                <Button
                  key={instinct.id}
                  variant={form.instincts === instinct.id ? 'secondary' : 'ghost'}
                  onClick={() => setForm({ ...form, instincts: instinct.id })}
                >
                  {instinct.id}
                </Button>
              ))}
            </div>
            <Button onClick={addMember}>Ajouter le membre</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Synergies & tensions</CardTitle>
          <CardDescription>Basé sur les templates par type.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {templates ? (
            <>
              <div>
                <Badge>Synergies</Badge>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                  {templates.synergies.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <Badge>Tensions</Badge>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                  {templates.tensions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <Badge>Recommandations</Badge>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                  {templates.recommendations.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <p className="text-sm text-slate-500">Sélectionnez un type pour afficher les templates.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Membres</CardTitle>
          <CardDescription>Liste locale (mock) de l’équipe.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {members.map((member) => (
            <div key={member.id} className="rounded-2xl border bg-white p-3">
              <p className="text-sm font-semibold">{member.name}</p>
              <p className="text-xs text-slate-500">{member.role}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <Badge>Type {member.type}</Badge>
                <Badge>Aile {member.wing}</Badge>
                <Badge>Instinct {member.instincts}</Badge>
                <Badge>Stress {member.stress}</Badge>
              </div>
            </div>
          ))}
          {!members.length && <p className="text-sm text-slate-500">Ajoutez un premier membre.</p>}
        </CardContent>
      </Card>
    </div>
  );
}
