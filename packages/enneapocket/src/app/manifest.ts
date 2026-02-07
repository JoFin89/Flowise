import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'EnnéaPocket',
    short_name: 'EnnéaPocket',
    description: 'PWA mobile-first pour l’ennéagramme.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F8FAFC',
    theme_color: '#4F46E5',
    icons: [
      {
        src: '/illustrations/type-1.svg',
        sizes: '192x192',
        type: 'image/svg+xml'
      }
    ]
  };
}
