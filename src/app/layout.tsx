import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: 'OptiStock AI',
  description: 'AI-Driven Inventory Optimization Dashboard',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex-grow">{children}</div>
          <footer className="w-full border-t bg-background">
            <div className="container flex flex-col items-center justify-center gap-1 h-24 text-center">
                <p className="text-sm text-muted-foreground">© 2025 OptiStock AI. All Rights Reserved.</p>
                <p className="text-xs text-muted-foreground">
                    Developed by Dhairya Mehra, Karan Desai, Ruhani Rai Dhamija, & Keval Nanavati.
                </p>
            </div>
          </footer>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
