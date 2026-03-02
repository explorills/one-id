import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { ScanFace, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react'
import { FaceScanner } from '@/components/FaceScanner'
import { Button } from '@/components/ui/button'
import { useIdentity } from '@/hooks/useIdentity'

type VerifyStep = 'intro' | 'scanning' | 'registering' | 'success'

export function Verify() {
  const navigate = useNavigate()
  const { register, authenticated } = useIdentity()
  const [step, setStep] = useState<VerifyStep>(authenticated ? 'success' : 'intro')

  const handleDescriptorCaptured = useCallback(async (descriptor: number[]) => {
    setStep('registering')
    try {
      await register(descriptor)
      setStep('success')
      toast.success('Identity verified successfully!')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Registration failed'
      toast.error(msg)
      setStep('intro')
    }
  }, [register])

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      <AnimatePresence mode="wait">
        {/* Step: Intro */}
        {step === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md mx-auto text-center"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6 glow-accent">
              <ScanFace className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-3">
              Verify Your Identity
            </h1>
            <p className="text-muted-foreground mb-8">
              We'll use your camera to create a unique biometric identity.
              Your face is processed entirely in your browser — no images are ever uploaded.
            </p>
            <Button
              size="lg"
              onClick={() => setStep('scanning')}
              className="glow-accent-strong"
            >
              <ScanFace className="h-5 w-5" />
              Start Face Scan
            </Button>
          </motion.div>
        )}

        {/* Step: Scanning */}
        {step === 'scanning' && (
          <FaceScanner
            onDescriptorCaptured={handleDescriptorCaptured}
            onClose={() => setStep('intro')}
          />
        )}

        {/* Step: Registering */}
        {step === 'registering' && (
          <motion.div
            key="registering"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-md mx-auto text-center"
          >
            <Loader2 className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
            <h2 className="text-xl font-semibold mb-2">Registering Identity</h2>
            <p className="text-sm text-muted-foreground">
              Creating your unique biometric identity...
            </p>
          </motion.div>
        )}

        {/* Step: Success */}
        {step === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
            >
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-2">Identity Verified!</h2>
            <p className="text-muted-foreground mb-8">
              Your biometric identity has been created. Now connect your wallets to complete setup.
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/dashboard')}
              className="glow-accent-strong"
            >
              Go to Dashboard
              <ArrowRight className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
