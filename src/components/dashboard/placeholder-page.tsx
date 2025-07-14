import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>
            This feature is currently under development.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Please check back later for updates. We are working hard to bring you this functionality.
          </p>
          <div data-ai-hint="data charts" className="mt-6">
            <img src="https://placehold.co/400x250.png" alt="Coming Soon" className="mx-auto rounded-lg" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
