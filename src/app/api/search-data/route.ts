import { NextResponse } from 'next/server';
import { fetchSearchData } from '@/lib/content-fetchers';

export async function GET() {
  try {
    const searchData = await fetchSearchData();
    return NextResponse.json(searchData);
  } catch (error) {
    console.error('Failed to fetch search data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch search data' },
      { status: 500 }
    );
  }
}