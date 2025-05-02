'use server';

import { createClient } from '@/utils/supabase/server'; // Adjust path if needed
import { z } from 'zod';

// Input validation schema
const AccessRequestSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  reason: z.string().min(10, 'Reason must be at least 10 characters'),
});

export async function submitAccessRequest(formData: {
  name: string;
  email: string;
  reason: string;
}) {
  const validationResult = AccessRequestSchema.safeParse(formData);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error.errors.map(e => e.message).join(', ') };
  }

  const { name, email, reason } = validationResult.data;
  const supabase = createClient();

  try {
    // Check if email already exists in requests
    const { data: existingRequest, error: checkError } = await supabase
      .from('access_requests')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116: row not found (expected if not exists)
      throw checkError;
    }
    if (existingRequest) {
      return { success: false, error: 'An access request with this email already exists.' };
    }

    // Insert new request
    const { error: insertError } = await supabase
      .from('access_requests')
      .insert({ name, email, reason, status: 'pending' });

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      // Check for unique constraint violation on email explicitly
      if (insertError.code === '23505') { // Unique violation code
        return { success: false, error: 'An access request with this email already exists.' };
      }
      throw insertError;
    }

    return { success: true };

  } catch (error) {
    console.error('Error submitting access request:', error);
    let errorMessage = 'An unexpected error occurred.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, error: errorMessage };
  }
} 