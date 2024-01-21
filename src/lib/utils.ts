import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { theme } from 'antd'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getThemeToken() {
  const { token } = theme.useToken()
  return token
}
