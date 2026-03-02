import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { config } from '@/lib/wagmi'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Home } from '@/pages/Home'
import { Verify } from '@/pages/Verify'
import { Dashboard } from '@/pages/Dashboard'
import { Toaster } from 'sonner'

const queryClient = new QueryClient()

export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme({
          accentColor: 'oklch(0.62 0.24 295)',
          accentColorForeground: 'white',
          borderRadius: 'medium',
          fontStack: 'system',
        })}>
          <BrowserRouter>
            <div className="min-h-screen bg-background text-foreground flex flex-col">
              <Header />
              <main className="flex-1 pt-16 pb-14">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/verify" element={<Verify />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
              </main>
              <Footer />
              <Toaster theme="dark" position="top-right" richColors />
            </div>
          </BrowserRouter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
