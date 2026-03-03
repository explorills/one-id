import { Link } from 'react-router-dom'
import { PoweredByExplNodes } from '@/components/PoweredByExplNodes'
import logo from '@/assets/images/logo.png'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        {/* Left: Logo + Title + Badge */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logo} alt="ONE id" className="w-14 h-14 sm:w-16 sm:h-16 object-contain" />
            <span className="text-[24px] sm:text-[26px] font-bold tracking-tight">
              ONE <span className="text-primary">id</span>
            </span>
          </Link>
          <div className="hidden sm:block">
            <PoweredByExplNodes size="sm" />
          </div>
        </div>
      </div>
    </header>
  )
}
