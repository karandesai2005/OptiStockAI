'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Bell,
  Home,
  LineChart,
  Package,
  Settings,
  ShoppingCart,
  Sparkles,
  Tag,
  Users,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/theme-toggle'

import OverviewPage from '@/components/dashboard/overview-page'
import InventoryPage from '@/components/dashboard/inventory-page'
import AnalyticsPage from '@/components/dashboard/analytics-page'
import PricingPage from '@/components/dashboard/pricing-page'
import AlertsPage from '@/components/dashboard/alerts-page'
import SettingsPage from '@/components/dashboard/settings-page'
import { getProducts } from '@/lib/data'
import { getAlerts } from '@/lib/data-helpers'
import type { Product, Alert } from '@/lib/data'

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setAlerts(getAlerts(fetchedProducts));
      setLoading(false);
    }
    loadData();
  }, []);


  const [activeView, setActiveView] = useState('Overview')
  const navItems = [
    { name: 'Overview', icon: Home },
    { name: 'Inventory', icon: Package },
    { name: 'Analytics', icon: LineChart },
    { name: 'Pricing', icon: Tag },
    { name: 'Alerts', icon: Bell, badge: alerts.length },
    { name: 'Settings', icon: Settings },
  ]

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-full">
            <p>Loading your dashboard...</p>
        </div>
      )
    }
    switch (activeView) {
      case 'Overview':
        return <OverviewPage products={products} setProducts={setProducts} alerts={alerts} setAlerts={setAlerts} />
      case 'Inventory':
        return <InventoryPage products={products} />
      case 'Analytics':
        return <AnalyticsPage />
      case 'Pricing':
        return <PricingPage products={products} />
      case 'Alerts':
        return <AlertsPage alerts={alerts} />
      case 'Settings':
        return <SettingsPage />
      default:
        return <OverviewPage products={products} setProducts={setProducts} alerts={alerts} setAlerts={setAlerts} />
    }
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="">OptiStock AI</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveView(item.name)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                    activeView === item.name ? 'bg-muted text-primary' : ''
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                  {item.badge && item.badge > 0 ? (
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      {item.badge}
                    </Badge>
                  ) : null}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Sparkles className="h-6 w-6 text-primary" />
                  <span className="sr-only">OptiStock AI</span>
                </Link>
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActiveView(item.name)
                      // Close sheet on mobile
                      const closeButton = document.querySelector('[data-radix-dialog-close]') as HTMLElement;
                      closeButton?.click();
                    }}
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                      activeView === item.name ? 'bg-muted text-foreground' : ''
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                    {item.badge && item.badge > 0 ? (
                      <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                        {item.badge}
                      </Badge>
                    ) : null}
                  </button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
             <h1 className="text-lg font-semibold md:text-2xl text-foreground/80">{activeView}</h1>
          </div>
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Users className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-background">
          {renderContent()}
        </main>
        <footer className="border-t bg-muted/40 py-4 px-6 text-center text-xs text-muted-foreground">
          <p>© 2025 OptiStock AI. All Rights Reserved.</p>
          <p>Developed by Dhairya Mehra, Karan Desai, Ruhani Rai Dhamija, & Keval Nanavati.</p>
        </footer>
      </div>
    </div>
  )
}
