'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'

interface Props {
  children: React.ReactNode
  contentType: string
  contentId: string
}

interface State {
  hasError: boolean
  error?: Error
}

export class ContentErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Here we'll add error logging once we set up monitoring
    console.error('Content error:', {
      error,
      errorInfo,
      contentType: this.props.contentType,
      contentId: this.props.contentId
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert variant="destructive" className="my-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error Loading Content</AlertTitle>
          <AlertDescription className="mt-2">
            <p>We encountered an error while loading this content. This might be due to:</p>
            <ul className="list-disc list-inside mt-2 mb-4">
              <li>Invalid content format</li>
              <li>Missing required content</li>
              <li>Temporary system issue</li>
            </ul>
            <div className="mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  this.setState({ hasError: false })
                }}
              >
                Try again
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )
    }

    return this.props.children
  }
} 