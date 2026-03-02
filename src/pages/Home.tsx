import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ScanFace, Wallet, ShieldCheck, Lock, Eye, Fingerprint } from 'lucide-react'
import { Button } from '@/components/ui/button'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' },
  }),
}

export function Home() {
  const navigate = useNavigate()

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          {/* Animated face scan illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-8 flex justify-center"
          >
            <div className="relative w-32 h-32">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse-ring" />
              {/* Middle ring */}
              <div className="absolute inset-3 rounded-full border-2 border-primary/40 animate-scan-rotate" />
              {/* Inner ring with icon */}
              <div className="absolute inset-6 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center glow-accent">
                <Fingerprint className="h-12 w-12 text-primary" />
              </div>
              {/* Glow dot */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_oklch(0.62_0.24_295)] animate-float" />
            </div>
          </motion.div>

          <motion.h1
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4"
          >
            ONE <span className="text-primary">id</span>
          </motion.h1>

          <motion.p
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-8"
          >
            Your biometric identity for the ONE ecosystem
          </motion.p>

          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <Button
              size="lg"
              onClick={() => navigate('/verify')}
              className="glow-accent-strong text-base px-8 py-6"
            >
              <ScanFace className="h-5 w-5" />
              Get Verified
            </Button>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold text-center mb-12"
          >
            How It Works
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: ScanFace,
                step: '1',
                title: 'Scan Face',
                description: 'Look at your camera for a few seconds. Our in-browser AI detects and creates a unique mathematical descriptor of your face.',
              },
              {
                icon: Wallet,
                step: '2',
                title: 'Connect Wallet',
                description: 'Link your crypto wallets by signing a verification message. Support for Ethereum, Polygon, Arbitrum, Optimism, and Base.',
              },
              {
                icon: ShieldCheck,
                step: '3',
                title: 'Verified Everywhere',
                description: 'Your single biometric identity works across all ONE ecosystem dApps. One face, one identity, unlimited access.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative text-center p-6 rounded-xl border border-border bg-card/50 hover:bg-card transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Privacy First
            </h2>
            <p className="text-muted-foreground mb-8">
              Your biometrics never leave your device. Face processing happens entirely in your browser
              using face-api.js. Only an encrypted mathematical descriptor is stored on our servers
              — never your actual face image or video.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {[
                { icon: Eye, text: 'In-browser face processing' },
                { icon: Lock, text: 'Encrypted descriptor storage' },
                { icon: ShieldCheck, text: 'No face images stored' },
                { icon: Fingerprint, text: 'Sybil-resistant verification' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border"
                >
                  <item.icon className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
