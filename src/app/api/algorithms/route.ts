import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('algorithms')
      .select('*')
      .eq('published', true)
      .order('name');

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch algorithms' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Algorithms API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 