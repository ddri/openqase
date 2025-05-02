'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

// TODO: Implement proper admin role check here!
// This is a placeholder and assumes any logged-in user can fetch.
// You MUST restrict this to actual admin users.
async function isAdmin() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  // Replace with your actual admin check logic (e.g., check a custom claim, role, or specific user ID)
  // Example: return user?.user_metadata?.role === 'admin';
  return !!user; // DANGEROUS: Allows any logged-in user
}

export async function fetchPendingRequests() {
  if (!(await isAdmin())) {
    return { data: null, error: 'Unauthorized' };
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from('access_requests')
    .select('id, created_at, name, email, reason')
    .eq('status', 'pending')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching pending requests:', error);
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function approveRequest(requestId: string, email: string) {
  if (!(await isAdmin())) {
    return { success: false, error: 'Unauthorized' };
  }

  const supabase = createClient();

  try {
    // Use a transaction to ensure both operations succeed or fail together
    const { error: transactionError } = await supabase.rpc('approve_beta_request', {
      request_id: requestId,
      user_email: email
    });

    if (transactionError) {
        throw transactionError;
    }

    // Revalidate the admin page path to refresh the list
    revalidatePath('/admin/user-management');
    return { success: true };

  } catch (error) {
    console.error('Error approving request:', error);
    return { success: false, error: error instanceof Error ? error.message : 'An unexpected error occurred.' };
  }
}

export async function rejectRequest(requestId: string) {
  if (!(await isAdmin())) {
    return { success: false, error: 'Unauthorized' };
  }

  const supabase = createClient();

  try {
    const { error } = await supabase
      .from('access_requests')
      .update({ status: 'rejected' })
      .eq('id', requestId)
      .eq('status', 'pending'); // Ensure we only reject pending ones

    if (error) {
      throw error;
    }

    revalidatePath('/admin/user-management');
    return { success: true };

  } catch (error) {
    console.error('Error rejecting request:', error);
    return { success: false, error: error instanceof Error ? error.message : 'An unexpected error occurred.' };
  }
} 