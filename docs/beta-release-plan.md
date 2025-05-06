# Private Beta Release Plan - OpenQASE

This document outlines the plan for implementing a private beta access system for the OpenQASE application using Supabase and Next.js.

## Core Requirements

1.  **Restrict Access:** Only allow approved users to sign up and access the main application content.
2.  **Request Access:** Provide a mechanism for potential users to request access.
3.  **Admin Management:** Enable administrators to review requests and grant/deny access.
4.  **Clear Beta Status:** Clearly indicate the private beta status on the main landing page.

## Implementation Details

### 1. Access Request Flow

*   **Page:** Modify the existing homepage (`src/app/page.tsx`).
*   **Component:** Develop a React component (e.g., `src/components/beta/BetaRequestForm.tsx`) containing the form with fields (Name, Email, Reason for Request) and relevant UX copy explaining the private beta.
    *   Place this component section **above** the existing hero section within `src/app/page.tsx`.
*   **Submission:** Use a Next.js Server Action (`src/app/actions/betaActions.ts#submitAccessRequest`) to handle form submissions.
    *   Validate input using Zod.
    *   Check if an access request with the same email already exists in the `access_requests` table.
    *   If unique, insert the request details into the Supabase `access_requests` table with a `status` of `'pending'`.
    *   Display a success/confirmation message to the user upon submission.

### 2. Admin User Management

*   **Page:** Create a new admin page route at `/admin/user-management`. This page must be protected and only accessible to designated administrators.
*   **Component:** Develop components (`src/app/admin/user-management/page.tsx`, `UserManagementTable.tsx`) to:
    *   Fetch and display pending access requests (`status = 'pending'`) from the `access_requests` table (showing Name, Email, Reason, Request Date).
    *   Provide "Approve" and "Reject" buttons for each pending request.
*   **Server Actions (`src/app/actions/adminActions.ts`):**
    *   `fetchPendingRequests`: Retrieves requests where `status = 'pending'`. Requires admin privileges.
    *   `approveRequest`:
        1.  Calls a Supabase RPC function (`approve_beta_request`) to atomically:
            *   Update the request status to `'approved'` in `access_requests`.
            *   Insert the user's email into the `allowed_emails` table.
        2.  *(Optional: Implement sending an approval email notification).*
        3.  Revalidates the `/admin/user-management` path. Requires admin privileges.
    *   `rejectRequest`:
        1.  Updates the request status to `'rejected'` in `access_requests`.
        2.  *(Optional: Implement sending a rejection email notification).*
        3.  Revalidates the `/admin/user-management` path. Requires admin privileges.
*   **(Future Enhancement):** Display lists/sections for already approved and rejected requests/emails.

### 3. Supabase Setup

*   **Tables:**
    *   `access_requests`: Stores user requests (id, created_at, name, email, reason, status). `email` should have a unique constraint. Enable RLS.
    *   `allowed_emails`: Stores emails approved for sign-up (id, created_at, email). `email` should have a unique constraint. Enable RLS.
*   **Database Function (RPC):**
    *   Create `approve_beta_request(request_id UUID, user_email TEXT)`:
        *   SQL function executed with security definer privileges (or appropriate role).
        *   Performs an `UPDATE` on `access_requests` setting `status = 'approved'` for the given `request_id`.
        *   Performs an `INSERT` into `allowed_emails` with the `user_email`.
        *   Ensures atomicity.
*   **Sign-up Modification:**
    *   Modify the existing user sign-up logic (whether in Server Actions, API routes, or Supabase Auth UI flow modification).
    *   **Before** successfully creating the user in `auth.users` or the `profiles` table, query the `allowed_emails` table to check if the provided email exists.
    *   If the email is **not** in `allowed_emails`, prevent the sign-up process and return an error message (e.g., "This email address has not been approved for beta access.").
*   **RLS Policies:**
    *   `access_requests`: Define policies allowing admins SELECT/UPDATE, and allowing the `submitAccessRequest` action (via service key) to INSERT.
    *   `allowed_emails`: Define policies allowing admins SELECT/INSERT/DELETE, and allowing the sign-up logic (service key recommended for security) SELECT access.
*   **Admin Check:** Implement robust admin role checking within the admin server actions (`isAdmin` helper function in `adminActions.ts`). Do not rely on simple `!!user` checks. Use custom claims, roles, or a dedicated admin user table.

### 4. Site Protection (Middleware Enhancement)

*   **File:** Modify the existing `src/middleware.ts`.
*   **Logic:**
    1.  Ensure `updateSession` is correctly handling session refresh.
    2.  Retrieve the user session within the middleware.
    3.  **Keep** the existing logic for protecting **admin routes** (`/admin/**`), checking for both session and admin role.
    4.  **Add/Enhance** logic for general **protected routes** (e.g., `/paths/**`, `/case-study/**`, `/profile/**` as defined in `protectedRoutes` array):
        *   If the route is protected and the user session **does not exist**, explicitly redirect the user to the homepage (`/`) using `NextResponse.redirect(new URL('/', req.url))`.
        *   If the user **is** authenticated, allow access using `NextResponse.next()` or by returning the response from `updateSession`.
    5.  Allow unauthenticated access to public routes like `/` (homepage) and `/auth/**`.
*   **Configuration:** Verify the `config.matcher` in `middleware.ts` correctly includes all routes that need protection or session handling (including `/admin/**`, `/paths/**`, etc., but likely excluding `/`). 