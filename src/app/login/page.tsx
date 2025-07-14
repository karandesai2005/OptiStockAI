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
import { Sparkles } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="flex-grow flex items-center justify-center w-full">
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
              <Link href="/">Login</Link>
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
      </div>
      <footer className="w-full py-4 px-6 text-center text-xs text-muted-foreground">
        <p>© 2024 OptiStock AI. All Rights Reserved.</p>
        <p>Developed by Dhairya Mehra, Karan Desai, Ruhani Rai Dhamija, & Keval Nanavati.</p>
      </footer>
    </div>
  )
}
