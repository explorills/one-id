import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { isAuthenticated } from '@/lib/auth'
import { PoweredByExplNodes } from '@/components/PoweredByExplNodes'
import { Button } from '@/components/ui/button'
import logo from '@/assets/images/logo.png'

export function Header() {
  const location = useLocation()
  const authed = isAuthenticated()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Left: Logo + Title + Badge */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="ONE id logo" className="h-7 w-7" />
            <span className="font-semibold text-lg tracking-tight">
              ONE <span className="text-primary">id</span>
            </span>
          </Link>
          <div className="hidden sm:block">
            <PoweredByExplNodes size="sm" />
          </div>
        </div>

        {/* Right: Navigation */}
        <nav className="flex items-center gap-2">
          {authed ? (
            <Link to="/dashboard">
              <Button
                variant={location.pathname === '/dashboard' ? 'default' : 'ghost'}
                size="sm"
              >
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link to="/verify">
              <Button
                size="sm"
                className={cn(
                  'glow-accent',
                  location.pathname === '/verify' && 'glow-accent-strong'
                )}
              >
                Get Verified
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
