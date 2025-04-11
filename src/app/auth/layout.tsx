import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication - OpenQASE',
  description: 'Sign in or create an account to access OpenQASE features.',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 