import { Suspense } from 'react'
import AuthContent from './AuthContent'

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="container relative min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <AuthContent />
    </Suspense>
  )
} 