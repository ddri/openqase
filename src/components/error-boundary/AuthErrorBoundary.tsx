'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class AuthErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Here we'll add error logging once we set up monitoring
    console.error('Auth error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert variant="destructive" className="my-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Authentication Error</AlertTitle>
          <AlertDescription className="mt-2">
            <p>We encountered an error during authentication. This might be due to:</p>
            <ul className="list-disc list-inside mt-2 mb-4">
              <li>Network connectivity issues</li>
              <li>Invalid credentials</li>
              <li>Session expiration</li>
              <li>Server unavailability</li>
            </ul>
            <div className="mt-4 space-x-4">
              <Button
                variant="outline"
                onClick={() => {
                  this.setState({ hasError: false })
                }}
              >
                Try again
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  window.location.href = '/auth'
                }}
              >
                Back to login
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )
    }

    return this.props.children
  }
} 