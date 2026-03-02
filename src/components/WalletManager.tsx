import { useEffect, useState } from 'react'
import { useAccount, useSignMessage, useDisconnect } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { toast } from 'sonner'
import { api } from '@/lib/api'
import { isAuthenticated } from '@/lib/auth'

interface WalletManagerProps {
  onAddressAdded: () => void
}

export function WalletManager({ onAddressAdded }: WalletManagerProps) {
  const { address, chain, isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { disconnect } = useDisconnect()
  const [linking, setLinking] = useState(false)
  const [linked, setLinked] = useState(false)

  useEffect(() => {
    if (!isConnected || !address || !isAuthenticated() || linking || linked) return

    const linkWallet = async () => {
      setLinking(true)
      try {
        const timestamp = new Date().toISOString()
        const message = `ONE id verification: Link wallet ${address} to identity. Timestamp: ${timestamp}`
        const signature = await signMessageAsync({ message })
        const chainName = chain?.name?.toLowerCase() || 'ethereum'
        await api.addAddress(address, chainName, signature, message)
        toast.success('Wallet linked successfully!')
        setLinked(true)
        onAddressAdded()
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to link wallet'
        if (!msg.includes('User rejected')) {
          toast.error(msg)
        }
        disconnect()
      } finally {
        setLinking(false)
      }
    }

    linkWallet()
  }, [isConnected, address, chain, signMessageAsync, disconnect, linking, linked, onAddressAdded])

  // Reset linked state when disconnected
  useEffect(() => {
    if (!isConnected) {
      setLinked(false)
    }
  }, [isConnected])

  return (
    <div className="flex flex-col items-center gap-3">
      <ConnectButton
        showBalance={false}
        chainStatus="icon"
        accountStatus="address"
      />
      {linking && (
        <p className="text-xs text-muted-foreground animate-pulse">
          Please sign the message in your wallet...
        </p>
      )}
    </div>
  )
}
