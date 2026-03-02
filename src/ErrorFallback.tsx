import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (import.meta.env.DEV) throw error

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-destructive">ONE id encountered a runtime error</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Something unexpected happened. The error details are shown below.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-sm text-muted-foreground mb-2">Error Details:</h3>
          <pre className="text-xs text-destructive bg-muted/50 p-3 rounded border overflow-auto max-h-32 font-mono">
            {error.message}
          </pre>
        </div>

        <Button onClick={resetErrorBoundary} className="w-full" variant="outline">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    </div>
  )
}
