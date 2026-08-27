import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://zeyad-salama-portfolio.afnaai-5664.chatgpt.site'),
  title: 'Zeyad Salama — Full-Stack Software Engineer',
  description:
    'Portfolio of Zeyad Salama, a software engineer building reliable backend systems and polished web experiences with Django, React, and Next.js.',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/assets/code.png',
  },
  openGraph: {
    title: 'Zeyad Salama — Full-Stack Software Engineer',
    description: 'Backend depth. Frontend polish. Explore selected software engineering work by Zeyad Salama.',
    url: '/',
    siteName: 'Zeyad Salama — Portfolio',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Zeyad Salama — Backend depth. Frontend polish.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zeyad Salama — Full-Stack Software Engineer',
    description: 'Backend depth. Frontend polish. Explore selected software engineering work by Zeyad Salama.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
