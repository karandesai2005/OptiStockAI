import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sparkles, Package, LineChart, Tag } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
              <Sparkles className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">Login to OptiStock AI</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full" asChild>
              <Link href="/dashboard">Login</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground text-center w-full">
              <p className="font-semibold">Demo Accounts:</p>
              <p>demo1@xai.com / test123</p>
              <p>demo2@xai.com / test123</p>
              <p>demo3@xai.com / test123</p>
            </div>
          </CardFooter>
        </Card>
        <footer className="w-full mt-auto pt-6 px-6 text-center text-xs text-muted-foreground">
            <p>© 2025 OptiStock AI. All Rights Reserved.</p>
            <p>Developed by Dhairya Mehra, Karan Desai, Ruhani Rai Dhamija, & Keval Nanavati.</p>
        </footer>
      </div>
      <div className="hidden lg:flex lg:flex-1 bg-muted/40 items-center justify-center p-8">
          <div className="max-w-md text-center">
            <Sparkles className="h-16 w-16 mx-auto text-primary mb-6"/>
            <h2 className="text-3xl font-bold text-foreground">Welcome to OptiStock AI</h2>
            <p className="text-muted-foreground mt-4">
                The future of inventory management is here. Leverage the power of AI to optimize your stock, forecast demand, and make smarter pricing decisions.
            </p>
            <div className="mt-8 space-y-4 text-left">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                        <Package className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Smart Inventory Tracking</h3>
                        <p className="text-sm text-muted-foreground">Monitor stock levels in real-time and get automated alerts for low stock or overstock items.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                        <LineChart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold">AI-Powered Demand Forecasting</h3>
                        <p className="text-sm text-muted-foreground">Predict future sales trends with high accuracy to stay ahead of the curve.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                        <Tag className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Dynamic Pricing Suggestions</h3>
                        <p className="text-sm text-muted-foreground">Receive intelligent pricing recommendations to maximize revenue and clear inventory.</p>
                    </div>
                </div>
            </div>
          </div>
      </div>
    </div>
  )
}
