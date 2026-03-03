import { Link } from 'react-router-dom'
import { PoweredByExplNodes } from '@/components/PoweredByExplNodes'
import logo from '@/assets/images/logo.png'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-[11px]">
          <Link to="/">
            <img
              src={logo}
              alt="ONE id"
              className="w-[58px] h-[58px] sm:w-[66px] sm:h-[66px] object-contain"
              width="66"
              height="66"
              loading="eager"
            />
          </Link>
          <div className="flex flex-col gap-2">
            <Link to="/" className="text-[24px] sm:text-[26px] font-bold tracking-tight leading-none">
              ONE <span className="text-primary">id</span>
            </Link>
            <PoweredByExplNodes size="sm" />
          </div>
        </div>
      </div>
    </header>
  )
}
