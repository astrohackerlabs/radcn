export type ToastType = 'default' | 'success' | 'info' | 'warning' | 'error' | 'loading'

export interface ToastPayload {
  actionLabel?: string
  actionUrl?: string
  description?: string
  dismissible?: boolean
  duration?: number
  id?: string
  title?: string
  type?: ToastType
}

export const RADCN_TOAST_EVENT = 'radcn-toast'

export function createToastEvent(payload: ToastPayload) {
  return new CustomEvent<ToastPayload>(RADCN_TOAST_EVENT, {
    bubbles: true,
    detail: payload,
  })
}

export function toast(payload: ToastPayload) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(createToastEvent(payload))
}
