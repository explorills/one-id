import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

export function getOneIdApiUrl(): string {
  const host = window.location.hostname
  if (host.includes("localhost") || host.includes("127.0.0.1")) return "http://localhost:3010"
  if (host.startsWith("staging2-all-access")) return "https://api-dev-id.expl.one"
  return "https://api-id.expl.one"
}
