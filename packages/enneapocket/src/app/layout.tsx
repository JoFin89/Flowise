import type { Metadata } from 'next';
import './globals.css';
import { ScrollArea } from '@/components/ui/scroll-area';
import { featuresData } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'EnnéaPocket',
  description: 'PWA mobile-first pour l’ennéagramme.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-slate-50">
          <header className="sticky top-0 z-10 bg-slate-50/90 p-4 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-400">{featuresData.appName}</p>
                <h1 className="text-xl font-semibold text-slate-900">{featuresData.tagline}</h1>
              </div>
              <Badge>PWA</Badge>
            </div>
            <ScrollArea className="mt-3">
              <nav className="flex gap-2">
                {featuresData.navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </ScrollArea>
          </header>
          <main className="flex-1 space-y-6 p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
