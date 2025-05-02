import { Suspense } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserManagementTable } from './UserManagementTable'; // We'll create this next
import { fetchPendingRequests } from '@/app/actions/adminActions'; // We'll create this next
import { Skeleton } from '@/components/ui/skeleton';

async function RequestList() {
  // Fetch data directly in the Server Component
  const { data: requests, error } = await fetchPendingRequests();

  if (error) {
    return <p className="text-destructive">Error loading requests: {error}</p>;
  }

  if (!requests || requests.length === 0) {
    return <p className="text-muted-foreground">No pending access requests.</p>;
  }

  // Ensure requests is not null before passing
  return <UserManagementTable requests={requests} />;
}

export default function UserManagementPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">User Access Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Pending Access Requests</CardTitle>
          <CardDescription>
            Review and approve or reject requests for beta access.
          </CardDescription>
        </CardHeader>
        <div className="p-6">
          <Suspense fallback={<Skeleton className="h-40 w-full" />}>
            <RequestList />
          </Suspense>
        </div>
      </Card>

      {/* TODO: Add section for already approved/rejected users? */}
    </div>
  );
} 