import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Background3D } from '@/components/background-3d'
import { BackToTop } from '@/components/back-to-top'
import { ToastProvider } from '@/components/toast'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ishimwe Rene — Developer Portfolio',
  description: 'The personal developer portfolio of Ishimwe Rene.',
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/icon.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#08090B' },
    { media: '(prefers-color-scheme: light)', color: '#F7F8FA' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('theme');
                var preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
                var theme = t || preferred;
                document.documentElement.classList.add(theme === 'light' ? 'light' : 'dark');
                document.documentElement.style.colorScheme = theme;
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <Background3D />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <ToastProvider>
            {children}
          </ToastProvider>
        </div>
        <BackToTop />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
