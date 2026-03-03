# ONE id

Biometric identity service for the [EXPL.ONE](https://expl.one) ecosystem. ONE id allows users to verify their identity once through client-side facial recognition and associate it with one or more wallet addresses. The resulting credential is reusable across all applications in the ONE ecosystem.

The project is currently in pre-release. The landing page is deployed with verification disabled.

## Overview

ONE id addresses a common problem in decentralized applications: proving that a user is a unique human without relying on centralized identity providers. It combines browser-based biometric enrollment with on-chain wallet signature verification to produce a single reusable identity.

### Verification flow

1. **Biometric enrollment** — The client captures a facial scan using the device camera. A mathematical descriptor (128-dimensional float vector) is generated entirely in the browser using [face-api.js](https://github.com/justadudewhohacks/face-api.js). No raw image or video data is transmitted.

2. **Wallet association** — The user connects one or more EVM-compatible wallets (Ethereum, Polygon, Arbitrum, Optimism, Base) via [RainbowKit](https://www.rainbowkit.com/) and signs a verification message. The signature cryptographically binds the wallet address to the biometric descriptor.

3. **Unified access** — The verified identity propagates across ONE ecosystem applications. A single enrollment grants access everywhere.

### Privacy model

- All facial recognition runs client-side in the browser.
- Only an encrypted mathematical descriptor is stored server-side.
- No face images, video frames, or raw biometric data are retained or transmitted.
- The descriptor is not reversible to a facial image.

## Tech stack

| Layer | Technology |
|---|---|
| Runtime | [Bun](https://bun.sh) |
| Framework | [React 19](https://react.dev) |
| Language | TypeScript 5.7 |
| Build | [Vite 7](https://vite.dev) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| UI components | [shadcn/ui](https://ui.shadcn.com) (Radix primitives + CVA) |
| Wallet integration | [wagmi](https://wagmi.sh) + [viem](https://viem.sh) + [RainbowKit](https://www.rainbowkit.com) |
| Biometrics | [face-api.js](https://github.com/justadudewhohacks/face-api.js) (TensorFlow.js-based) |
| Animation | [Framer Motion](https://www.framer.com/motion) |

## Project structure

```
src/
  components/
    Header.tsx            Navigation bar
    Footer.tsx            Footer with ecosystem links
    FaceScanner.tsx       Biometric capture and descriptor generation
    WalletManager.tsx     Wallet connection and signature handling
    AddressCard.tsx       Wallet address display
    PoweredByExplNodes.tsx  Shared ecosystem branding component
    ui/                   shadcn/ui primitives (Button, Dialog, etc.)
  pages/
    Home.tsx              Landing page (single-page layout)
  lib/
    api.ts                Backend API client
    auth.ts               Authentication utilities
    biometrics.ts         Face descriptor processing
    wagmi.ts              Wallet configuration (chains, transports)
    types.ts              Shared type definitions
    utils.ts              General utilities (cn, etc.)
  assets/
    images/               Logo and static assets
```

## Development

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Production build
bun run build

# Preview production build
bun run preview

# Type checking
bun run type-check
```

The dev server runs on `http://localhost:5173` by default.

## Ecosystem

ONE id is one of several applications in the EXPL.ONE ecosystem. Related resources:

- [expl.one](https://expl.one) — Main platform
- [docs.expl.one](https://docs.expl.one) — Documentation
- [node.expl.one](https://node.expl.one) — EXPL Nodes infrastructure
- [github.com/explorills](https://github.com/explorills) — Source repositories

### Shared modules

This project includes submodules that are shared across the ecosystem:

- `z-0-one-backend/` — Backend services (runs on a centralized EC2 instance)
- `z-1-user-commands/` — Reusable development commands and process documentation
- `z-2-user-components/` — Shared UI components

## Status

Pre-release. The landing page is live with verification disabled. Backend integration, biometric enrollment, and wallet association are implemented but not yet publicly accessible.

## License

Proprietary. All rights reserved by EXPL.ONE.
