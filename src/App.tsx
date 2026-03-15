import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Home } from '@/pages/Home'
import { Toaster } from 'sonner'

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-14">
        <Home />
      </main>
      <Footer />
      <Toaster theme="dark" position="top-right" richColors />
    </div>
  )
}
