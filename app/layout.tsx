import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Anime Promo Engine',
  description: 'Production foundation for research, promo drafts, and publishing workflows.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
