'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Bell,
  Home,
  LineChart,
  Package,
  Package2,
  Settings,
  ShoppingCart,
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
import PlaceholderPage from '@/components/dashboard/placeholder-page'
import { initialAlerts } from '@/lib/data'

export default function Dashboard() {
  const [activeView, setActiveView] = useState('Overview')
  const navItems = [
    { name: 'Overview', icon: Home },
    { name: 'Inventory', icon: Package },
    { name: 'Analytics', icon: LineChart },
    { name: 'Pricing', icon: Tag },
    { name: 'Alerts', icon: Bell, badge: initialAlerts.length },
    { name: 'Settings', icon: Settings },
  ]

  const renderContent = () => {
    switch (activeView) {
      case 'Overview':
        return <OverviewPage />
      case 'Inventory':
        return <PlaceholderPage title="Inventory Management" />
      case 'Analytics':
        return <PlaceholderPage title="Data Analytics" />
      case 'Pricing':
        return <PlaceholderPage title="Dynamic Pricing" />
      case 'Alerts':
        return <PlaceholderPage title="System Alerts" />
      case 'Settings':
        return <PlaceholderPage title="User Settings" />
      default:
        return <OverviewPage />
    }
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6 text-primary" />
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
                  {item.badge && (
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      {item.badge}
                    </Badge>
                  )}
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
                <Package2 className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6 text-primary" />
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
                    {item.badge && (
                      <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
             <h1 className="text-lg font-semibold md:text-2xl text-foreground/80">AI Inventory Optimization Dashboard</h1>
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
                <Link href="/login">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-background">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
