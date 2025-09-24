import type { Metadata, Viewport } from 'next'
import './globals.css'
import { LanguageProvider } from '@/components/language-provider'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import { Inter, Poppins } from 'next/font/google'
import { Suspense } from 'react'
import { AnimationProvider } from '@/components/animation-provider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'FarmSaathi - Digital Agriculture Platform',
    template: '%s | FarmSaathi',
  },
  description:
    'Empowering 146 Million Farmers Through Digital Innovation. AI-Powered Crop Advisory, Direct Market Access, and Government Schemes.',
  keywords: [
    'farming',
    'agriculture',
    'AI',
    'crop advisory',
    'farmers',
    'digital farming',
    'india',
  ],
  authors: [{ name: 'FarmSaathi Team' }],
  creator: 'FarmSaathi',
  publisher: 'FarmSaathi',
  metadataBase: new URL('https://farmsaathi.com'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://farmsaathi.com',
    title: 'FarmSaathi - Digital Agriculture Platform',
    description: 'Empowering 146 Million Farmers Through Digital Innovation',
    siteName: 'FarmSaathi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FarmSaathi - Digital Agriculture Platform',
    description: 'Empowering 146 Million Farmers Through Digital Innovation',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

// Loading component for Suspense
function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-primary animate-pulse">
          Loading FarmSaathi
        </h2>
      </div>
    </div>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(inter.variable, poppins.variable)}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body
        className={cn(
          'font-sans antialiased min-h-screen bg-background text-foreground relative',
          'selection:bg-primary/20 selection:text-primary-foreground'
        )}
      >
        <Suspense fallback={<LoadingScreen />}>
          <AnimationProvider>
            <LanguageProvider>
              <div className="relative">
                {children}
                <Toaster />
              </div>
            </LanguageProvider>
          </AnimationProvider>
        </Suspense>

        {/* Performance monitoring script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Basic performance monitoring
              if (typeof window !== 'undefined') {
                window.addEventListener('load', () => {
                  const perfData = performance.getEntriesByType('navigation')[0];
                  console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
