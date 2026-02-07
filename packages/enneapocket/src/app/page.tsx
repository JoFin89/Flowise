import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { featuresData, enneagramData } from '@/lib/data';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4">
        {featuresData.sections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href={section.cta.href}>
                <Button>{section.cta.label}</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </section>

      <Separator />

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Bibliothèque des types</CardTitle>
            <CardDescription>Synthèse rapide des 9 types avec illustrations locales.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {enneagramData.types.map((type) => (
              <div key={type.id} className="rounded-2xl bg-white p-3 text-center shadow-sm">
                <img src={type.illustration} alt={type.name} className="mb-2 h-20 w-full rounded-xl object-cover" />
                <p className="text-sm font-semibold">{type.name}</p>
                <p className="text-xs text-slate-500">{type.summary}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
