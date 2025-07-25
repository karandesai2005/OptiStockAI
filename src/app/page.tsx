import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, BarChart, Package, Sparkles, Tag } from 'lucide-react'

// Note: The Image import is no longer used and can be removed if you wish.
// import Image from 'next/image' 

export default function LandingPage() {
  return (
    <div className="flex min-h-[calc(100vh-theme(spacing.24))] w-full flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <Link href="#" className="mr-6 flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block">OptiStock AI</span>
          </Link>
          <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
            {/* Future nav links can go here */}
          </nav>
          <div className="flex items-center justify-end space-x-2">
            <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
                <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        {/* MODIFIED: The 'container' class is now on the <section> tag for consistency. */}
        <section className="container space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          {/* MODIFIED: The 'container' class was removed from this div. */}
          <div className="flex flex-col items-center gap-6 text-center">
            <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
              AI-Driven Inventory Optimization
            </h1>
            <p className="max-w-[48rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Transform your inventory management with advanced AI forecasting, real-time stock monitoring, and intelligent pricing recommendations. Reduce stockouts, optimize revenue, and streamline operations.
            </p>
            <div className="space-x-4">
              <Button size="lg" asChild>
                  <Link href="/signup">
                  Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                  <Link href="#">Watch Demo</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section (Structure is correct, no changes needed) */}
        <section className="container space-y-6 py-8 md:py-12 lg:py-24">
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-4">
                <div className="flex flex-col items-center justify-center rounded-lg bg-muted/50 p-8 text-center">
                    <p className="text-4xl font-bold text-primary">87%</p>
                    <p className="text-sm font-medium text-muted-foreground">Forecast Accuracy</p>
                </div>
                 <div className="flex flex-col items-center justify-center rounded-lg bg-muted/50 p-8 text-center">
                    <p className="text-4xl font-bold text-primary">45%</p>
                    <p className="text-sm font-medium text-muted-foreground">Stockout Reduction</p>
                </div>
                 <div className="flex flex-col items-center justify-center rounded-lg bg-muted/50 p-8 text-center">
                    <p className="text-4xl font-bold text-primary">23%</p>
                    <p className="text-sm font-medium text-muted-foreground">Revenue Increase</p>
                </div>
                 <div className="flex flex-col items-center justify-center rounded-lg bg-muted/50 p-8 text-center">
                    <p className="text-4xl font-bold text-primary">60%</p>
                    <p className="text-sm font-medium text-muted-foreground">Time Saved</p>
                </div>
            </div>
        </section>
        
        {/* Features Section (Structure is correct, no changes needed) */}
        <section className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
              Powerful Features for Modern Inventory Management
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Our comprehensive platform combines cutting-edge AI technology with intuitive design to deliver unparalleled inventory optimization capabilities.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-1 md:max-w-[64rem] md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[220px] flex-col justify-between rounded-md p-6">
                    <Package className="h-12 w-12 text-primary" />
                    <div className="space-y-2">
                        <h3 className="font-bold">Smart Inventory Tracking</h3>
                        <p className="text-sm text-muted-foreground">Monitor stock levels in real-time and get automated alerts for low stock or overstock items.</p>
                    </div>
                </div>
            </div>
             <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[220px] flex-col justify-between rounded-md p-6">
                    <BarChart className="h-12 w-12 text-primary" />
                    <div className="space-y-2">
                        <h3 className="font-bold">AI-Powered Demand Forecasting</h3>
                        <p className="text-sm text-muted-foreground">Predict future sales trends with high accuracy to stay ahead of the curve.</p>
                    </div>
                </div>
            </div>
             <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[220px] flex-col justify-between rounded-md p-6">
                    <Tag className="h-12 w-12 text-primary" />
                    <div className="space-y-2">
                        <h3 className="font-bold">Dynamic Pricing Suggestions</h3>
                        <p className="text-sm text-muted-foreground">Receive intelligent pricing recommendations to maximize revenue and clear inventory.</p>
                    </div>
                </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}