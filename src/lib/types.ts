export interface Identity {
  id: string
  created_at: string
  updated_at: string
}

export interface Address {
  id: string
  identity_id: string
  address: string
  chain: string
  is_main: boolean
  added_at: string
}

export interface Session {
  token: string
  expires_at: string
}

export interface VerifyResult {
  verified: boolean
  identity_id?: string
  is_main?: boolean
  chain?: string
  verified_at?: string
}
