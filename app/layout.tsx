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

const defaultSiteUrl = 'https://zeyad-salama-portfolio.afnaai-5664.chatgpt.site';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const pageUrl = `${basePath}/`;
const publicAsset = (path: string) => `${basePath}${path}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Zeyad Salama — Backend Software Engineer',
  description:
    'Portfolio of Zeyad Salama, a backend software engineer building secure, transaction-heavy products with Python, Django, Django REST Framework, and PostgreSQL.',
  alternates: {
    canonical: pageUrl,
  },
  icons: {
    icon: publicAsset('/assets/code.png'),
  },
  openGraph: {
    title: 'Zeyad Salama — Backend Software Engineer',
    description: 'Backend depth. Product thinking. Explore selected software engineering work by Zeyad Salama.',
    url: pageUrl,
    siteName: 'Zeyad Salama — Portfolio',
    type: 'website',
    images: [
      {
        url: publicAsset('/og.png'),
        width: 1200,
        height: 630,
        alt: 'Zeyad Salama — Backend depth. Frontend polish.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zeyad Salama — Backend Software Engineer',
    description: 'Backend depth. Product thinking. Explore selected software engineering work by Zeyad Salama.',
    images: [publicAsset('/og.png')],
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
