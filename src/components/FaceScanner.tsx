import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { loadModels, detectFace, getDescriptorArray } from '@/lib/biometrics'
import { Button } from '@/components/ui/button'
import { X, Camera, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

type ScannerState = 'loading-models' | 'requesting-camera' | 'scanning' | 'detected' | 'error'

interface FaceScannerProps {
  onDescriptorCaptured: (descriptor: number[]) => void
  onClose: () => void
}

export function FaceScanner({ onDescriptorCaptured, onClose }: FaceScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [state, setState] = useState<ScannerState>('loading-models')
  const [consecutiveDetections, setConsecutiveDetections] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')

  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function init() {
      try {
        await loadModels()
        if (cancelled) return
        setState('requesting-camera')

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: 640, height: 480 },
        })
        if (cancelled) {
          stream.getTracks().forEach(track => track.stop())
          return
        }

        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play()
        }
        setState('scanning')
      } catch (err) {
        if (!cancelled) {
          setState('error')
          setErrorMessage(err instanceof Error ? err.message : 'Failed to initialize camera')
        }
      }
    }

    init()
    return () => {
      cancelled = true
      cleanup()
    }
  }, [cleanup])

  useEffect(() => {
    if (state !== 'scanning') return

    let detectionCount = 0

    intervalRef.current = setInterval(async () => {
      if (!videoRef.current) return

      const detection = await detectFace(videoRef.current)
      if (detection) {
        detectionCount++
        setConsecutiveDetections(detectionCount)

        if (detectionCount >= 3) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          setState('detected')
          const descriptor = getDescriptorArray(detection)
          cleanup()
          onDescriptorCaptured(descriptor)
        }
      } else {
        detectionCount = 0
        setConsecutiveDetections(0)
      }
    }, 200)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [state, cleanup, onDescriptorCaptured])

  const stateConfig = {
    'loading-models': { icon: Loader2, label: 'Loading face detection models...', color: 'text-muted-foreground' },
    'requesting-camera': { icon: Camera, label: 'Requesting camera access...', color: 'text-muted-foreground' },
    'scanning': { icon: Camera, label: 'Look at the camera...', color: 'text-primary' },
    'detected': { icon: CheckCircle2, label: 'Face detected!', color: 'text-green-500' },
    'error': { icon: AlertCircle, label: errorMessage, color: 'text-destructive' },
  }

  const current = stateConfig[state]
  const Icon = current.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-lg mx-4">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => { cleanup(); onClose() }}
          className="absolute -top-12 right-0 text-white hover:text-primary z-10"
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Scanner container */}
        <div className="relative rounded-2xl overflow-hidden bg-card border border-border">
          {/* Video feed */}
          <div className="relative aspect-[4/3] bg-black">
            <video
              ref={videoRef}
              className="w-full h-full object-cover mirror"
              style={{ transform: 'scaleX(-1)' }}
              playsInline
              muted
            />

            {/* Scanning overlay */}
            <AnimatePresence>
              {state === 'scanning' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {/* Scan ring */}
                  <div className="relative w-56 h-56">
                    <div
                      className="absolute inset-0 rounded-full border-4 border-transparent animate-scan-rotate"
                      style={{
                        borderImage: 'conic-gradient(oklch(0.62 0.24 295), transparent 60%) 1',
                        borderRadius: '50%',
                      }}
                    />
                    <div
                      className="absolute inset-2 rounded-full border-2 border-primary/30 animate-pulse-ring"
                    />
                    {/* Detection progress dots */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 flex gap-2">
                      {[0, 1, 2].map(i => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            consecutiveDetections > i
                              ? 'bg-primary scale-125 shadow-[0_0_8px_oklch(0.62_0.24_295/0.8)]'
                              : 'bg-muted-foreground/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading/error overlay */}
            {(state === 'loading-models' || state === 'requesting-camera' || state === 'error') && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                <div className="text-center">
                  <Icon className={`h-10 w-10 mx-auto mb-3 ${current.color} ${state !== 'error' ? 'animate-spin' : ''}`} />
                  <p className={`text-sm ${current.color}`}>{current.label}</p>
                </div>
              </div>
            )}

            {/* Success overlay */}
            <AnimatePresence>
              {state === 'detected' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/60"
                >
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.1 }}
                    >
                      <CheckCircle2 className="h-16 w-16 mx-auto mb-3 text-green-500" />
                    </motion.div>
                    <p className="text-green-500 font-medium">Face detected!</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Status bar */}
          <div className="p-4 flex items-center justify-between border-t border-border">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                state === 'scanning' ? 'bg-primary animate-pulse' :
                state === 'detected' ? 'bg-green-500' :
                state === 'error' ? 'bg-destructive' :
                'bg-muted-foreground animate-pulse'
              }`} />
              <span className="text-sm text-muted-foreground">
                {state === 'scanning' ? 'Scanning...' :
                 state === 'detected' ? 'Complete' :
                 state === 'error' ? 'Error' :
                 'Initializing...'}
              </span>
            </div>
            {state === 'error' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
