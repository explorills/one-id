import { OneIdProvider, EcosystemNavbar, EcosystemFooter } from '@explorills/one-ecosystem-ui'
import { getOneIdApiUrl, getLootUrl, getNotificationUrl } from '@/lib/utils'
import { Home } from '@/pages/Home'
import { Toaster } from 'sonner'
import logo from '@/assets/images/logo.png'

const REOWN_PROJECT_ID = '1fe344d4623291d85ad7369cbc6d9ec8'

export default function App() {
  return (
    <OneIdProvider
      apiUrl={getOneIdApiUrl()}
      projectId={REOWN_PROJECT_ID}
      profilePath="/profile"
      platformColor="oklch(0.62 0.16 55)"
      notificationUrl={getNotificationUrl()}
      lootUrl={getLootUrl()}
    >
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <EcosystemNavbar
          logo={logo}
          projectName="id"
          themeColor="oklch(0.62 0.16 55)"
          currentDomain="id.expl.one"
        />
        <main className="flex-1 pt-24 pb-14">
          <Home />
        </main>
        <EcosystemFooter themeColor="oklch(0.62 0.16 55)" />
        <Toaster theme="dark" position="top-right" richColors />
      </div>
    </OneIdProvider>
  )
}
