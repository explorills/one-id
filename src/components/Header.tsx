import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { PoweredByExplNodes } from '@/components/PoweredByExplNodes'
import { Button } from '@/components/ui/button'
import logo from '@/assets/images/logo.png'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Logo + Title + Badge */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logo} alt="ONE id logo" className="h-9 w-9" />
            <span className="font-bold text-xl sm:text-2xl tracking-tight">
              ONE <span className="text-primary">id</span>
            </span>
          </Link>
          <div className="hidden sm:block">
            <PoweredByExplNodes size="sm" />
          </div>
        </div>

        {/* Right: Coming Soon CTA */}
        <nav className="flex items-center gap-2">
          <Button
            size="sm"
            className="glow-accent"
            onClick={() => toast('Coming Soon', { description: 'ONE id verification is launching soon. Stay tuned!' })}
          >
            Get Verified
          </Button>
        </nav>
      </div>
    </header>
  )
}
