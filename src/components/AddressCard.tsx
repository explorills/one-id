import { motion } from 'framer-motion'
import { Copy, Star, Trash2, Check } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Address } from '@/lib/types'

interface AddressCardProps {
  address: Address
  onSetMain: (address: string) => Promise<void>
  onRemove: (address: string) => Promise<void>
}

function truncateAddress(addr: string): string {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}

export function AddressCard({ address, onSetMain, onRemove }: AddressCardProps) {
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address.address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSetMain = async () => {
    setLoading(true)
    try {
      await onSetMain(address.address)
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async () => {
    setLoading(true)
    try {
      await onRemove(address.address)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ y: -2, boxShadow: '0 4px 20px oklch(0.62 0.16 55 / 0.1)' }}
      className="rounded-xl border border-border bg-card p-4 transition-all"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex flex-col min-w-0">
            <span className="font-mono text-sm font-medium truncate">
              {truncateAddress(address.address)}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-[10px] font-mono uppercase">
                {address.chain}
              </Badge>
              {address.is_main && (
                <Badge variant="default" className="text-[10px]">
                  <Star className="h-2.5 w-2.5 mr-0.5" />
                  Main
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="h-8 w-8"
            title="Copy address"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
          </Button>
          {!address.is_main && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSetMain}
              disabled={loading}
              className="h-8 w-8"
              title="Set as main"
            >
              <Star className="h-3.5 w-3.5" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRemove}
            disabled={loading}
            className="h-8 w-8 text-destructive hover:text-destructive"
            title="Remove address"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
