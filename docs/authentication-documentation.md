# OpenQASE Authentication System Documentation

This document outlines the authentication system used in OpenQASE, including its components, flow, and implementation details.

## Overview

OpenQASE uses Supabase Authentication with Next.js middleware for a secure, session-based authentication system. The system includes:
- Protected route handling
- Friendly authentication gates
- Session management
- Redirect handling
- Client-side auth state management

## Components

### 1. Middleware (`src/middleware.ts`)
- Handles session validation and routing
- Manages auth callbacks
- Prevents authenticated users from accessing auth pages
- Configuration for protected routes:
  ```typescript
  const protectedRoutes = [
    '/paths',
    '/case-study',
    '/quantum-stack',
    '/profile'
  ]
  ```

### 2. AuthGate Component (`src/components/auth/AuthGate.tsx`)
- Client-side component for protected content
- Shows friendly warning messages for unauthenticated users
- Customizable titles and descriptions
- Handles the display of sign-in/sign-up options
- Example usage:
  ```typescript
  <AuthGate
    title="Access Learning Path Content"
    description="Sign in to access detailed learning paths and resources."
  >
    {/* Protected content */}
  </AuthGate>
  ```

### 3. Auth Page (`src/app/auth/page.tsx`)
- Handles authentication UI
- Uses Supabase Auth UI components
- Manages sign-in, sign-up, and password reset
- Handles redirect after successful authentication

## Authentication Flow

1. **Unauthenticated Access Attempt**
   - User tries to access protected route
   - AuthGate component checks authentication status
   - If unauthenticated, shows friendly warning with sign-in options
   - Original URL is preserved for post-auth redirect

2. **Authentication Process**
   - User clicks sign-in/sign-up
   - Redirected to auth page with `redirectTo` parameter
   - After successful auth, redirected back to original URL

3. **Session Management**
   - Sessions handled by Supabase
   - Middleware refreshes expired sessions
   - Client-side auth state managed through Supabase hooks

## Protected Routes

The following routes require authentication:
- `/paths/*` - Learning paths and content
- `/case-study/*` - Case studies
- `/quantum-stack/*` - Quantum stack documentation
- `/profile` - User profile

## Implementation Examples

### Protecting a Route
```typescript
// In page component
export default function ProtectedPage() {
  return (
    <AuthGate
      title="Protected Content"
      description="Sign in to access this content"
    >
      {/* Protected content */}
    </AuthGate>
  );
}
```

### Layout-Level Protection
```typescript
// In layout component
export default function ProtectedLayout({ children }) {
  return (
    <AuthGate
      title="Access Content"
      description="Authentication required"
    >
      {children}
    </AuthGate>
  );
}
```

## Custom Warning Messages

Different sections use customized warning messages:
- Learning Paths: "Start Your Quantum Journey"
- Case Studies: "Unlock Real-World Quantum Applications"
- Quantum Stack: "Explore the Quantum Technology Stack"
- Individual Paths: "Access Learning Path Content"

## Security Considerations

1. **Session Management**
   - Sessions handled securely by Supabase
   - Automatic session refresh
   - Secure cookie handling

2. **Protected Routes**
   - Server-side protection via middleware
   - Client-side protection via AuthGate
   - Double-layer security approach

3. **Redirect Handling**
   - Safe URL handling
   - Preserved user intent
   - Protected against open redirects

## Development Guidelines

1. **Adding New Protected Routes**
   - Add route to `protectedRoutes` array in middleware
   - Wrap component with `AuthGate`
   - Add appropriate warning messages

2. **Customizing Auth Gates**
   - Use descriptive titles and messages
   - Keep descriptions concise and clear
   - Maintain consistent tone across gates

3. **Testing Auth Flow**
   - Test both authenticated and unauthenticated states
   - Verify redirect handling
   - Check warning message display
   - Validate session management

## Troubleshooting

Common issues and solutions:

1. **Infinite Redirect Loops**
   - Check middleware conditions
   - Verify auth state management
   - Check route protection configuration

2. **Missing Auth Gates**
   - Ensure `AuthGate` component is properly imported
   - Verify component hierarchy
   - Check for proper props

3. **Session Issues**
   - Clear browser cookies
   - Check Supabase configuration
   - Verify environment variables

## Environment Setup

Required environment variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js Middleware Documentation](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Auth UI Components](https://ui.supabase.com/components/auth) 