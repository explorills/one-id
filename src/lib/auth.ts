const SESSION_KEY = 'one_id_session'

export function getSessionToken(): string | null {
  return localStorage.getItem(SESSION_KEY)
}

export function setSessionToken(token: string): void {
  localStorage.setItem(SESSION_KEY, token)
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY)
}

export function isAuthenticated(): boolean {
  return !!getSessionToken()
}
