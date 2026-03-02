import { getSessionToken, setSessionToken } from '@/lib/auth'
import type { Identity, Address, Session, VerifyResult } from '@/lib/types'

function getApiBaseUrl(): string {
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname.includes('github.dev'))) {
    return 'http://localhost:3005'
  }
  return 'https://api-id.expl.one'
}

class ApiClient {
  private baseUrl: string

  constructor() {
    this.baseUrl = getApiBaseUrl()
  }

  private getHeaders(): HeadersInit {
    const h: HeadersInit = { 'Content-Type': 'application/json' }
    const token = getSessionToken()
    if (token) h['Authorization'] = `Bearer ${token}`
    return h
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: { ...this.getHeaders(), ...options.headers },
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.error || `Request failed: ${res.status}`)
    }
    return data as T
  }

  async register(descriptor: number[]): Promise<{ identity: Identity; session: Session }> {
    const data = await this.request<{ identity: Identity; session: Session }>('/api/v1/identity/register', {
      method: 'POST',
      body: JSON.stringify({ descriptor }),
    })
    if (data.session?.token) {
      setSessionToken(data.session.token)
    }
    return data
  }

  async getMe(): Promise<{ identity: Identity; addresses: Address[] }> {
    return this.request<{ identity: Identity; addresses: Address[] }>('/api/v1/identity/me')
  }

  async addAddress(address: string, chain: string, signature: string, message: string): Promise<Address> {
    return this.request<Address>('/api/v1/identity/addresses', {
      method: 'POST',
      body: JSON.stringify({ address, chain, signature, message }),
    })
  }

  async setMainAddress(address: string): Promise<{ addresses: Address[] }> {
    return this.request<{ addresses: Address[] }>(`/api/v1/identity/addresses/${address}/main`, {
      method: 'PUT',
    })
  }

  async removeAddress(address: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/api/v1/identity/addresses/${address}`, {
      method: 'DELETE',
    })
  }

  async verifyAddress(address: string): Promise<VerifyResult> {
    return this.request<VerifyResult>(`/api/v1/verify/${address}`)
  }
}

export const api = new ApiClient()
