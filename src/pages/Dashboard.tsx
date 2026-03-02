import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Wallet, LogOut, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AddressCard } from '@/components/AddressCard'
import { WalletManager } from '@/components/WalletManager'
import { useIdentity } from '@/hooks/useIdentity'

export function Dashboard() {
  const navigate = useNavigate()
  const {
    identity,
    addresses,
    loading,
    authenticated,
    removeAddress,
    setMainAddress,
    logout,
    refresh,
  } = useIdentity()

  useEffect(() => {
    if (!loading && !authenticated) {
      navigate('/verify')
    }
  }, [loading, authenticated, navigate])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    )
  }

  if (!identity) return null

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Identity Status Card */}
        <Card className="glow-accent">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Identity Status
              </CardTitle>
              <Badge variant="default">
                Verified
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Identity ID</span>
                <span className="font-mono text-xs">{identity.id.slice(0, 12)}...</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span>{new Date(identity.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Linked Wallets</span>
                <span>{addresses.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Connected Wallets */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Wallet className="h-5 w-5 text-primary" />
                Connected Wallets
              </CardTitle>
              <span className="text-xs text-muted-foreground">
                {addresses.length} wallet{addresses.length !== 1 ? 's' : ''}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <AnimatePresence mode="popLayout">
              {addresses.map(addr => (
                <AddressCard
                  key={addr.id}
                  address={addr}
                  onSetMain={setMainAddress}
                  onRemove={removeAddress}
                />
              ))}
            </AnimatePresence>

            {addresses.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No wallets connected yet. Connect one below.
              </p>
            )}

            {/* Connect Wallet Button */}
            <div className="pt-3 border-t border-border">
              <WalletManager onAddressAdded={refresh} />
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-muted-foreground hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
