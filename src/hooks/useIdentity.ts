import { useState, useEffect, useCallback } from 'react'
import { api } from '@/lib/api'
import { setSessionToken, clearSession, isAuthenticated } from '@/lib/auth'
import type { Identity, Address } from '@/lib/types'

export function useIdentity() {
  const [identity, setIdentity] = useState<Identity | null>(null)
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(isAuthenticated())

  const fetchIdentity = useCallback(async () => {
    if (!isAuthenticated()) {
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      const data = await api.getMe()
      setIdentity(data.identity)
      setAddresses(data.addresses)
      setAuthenticated(true)
    } catch {
      clearSession()
      setIdentity(null)
      setAddresses([])
      setAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchIdentity()
  }, [fetchIdentity])

  const register = useCallback(async (descriptor: number[]) => {
    const data = await api.register(descriptor)
    if (data.session?.token) {
      setSessionToken(data.session.token)
    }
    setIdentity(data.identity)
    setAuthenticated(true)
    return data
  }, [])

  const addAddress = useCallback(async (address: string, chain: string, signature: string, message: string) => {
    const newAddr = await api.addAddress(address, chain, signature, message)
    setAddresses(prev => [...prev, newAddr])
    return newAddr
  }, [])

  const removeAddress = useCallback(async (address: string) => {
    await api.removeAddress(address)
    setAddresses(prev => prev.filter(a => a.address !== address))
  }, [])

  const setMainAddress = useCallback(async (address: string) => {
    await api.setMainAddress(address)
    setAddresses(prev =>
      prev.map(a => ({ ...a, is_main: a.address === address }))
    )
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setIdentity(null)
    setAddresses([])
    setAuthenticated(false)
  }, [])

  const refresh = useCallback(() => {
    return fetchIdentity()
  }, [fetchIdentity])

  return {
    identity,
    addresses,
    loading,
    authenticated,
    register,
    addAddress,
    removeAddress,
    setMainAddress,
    logout,
    refresh,
  }
}
