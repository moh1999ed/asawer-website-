import { NextResponse } from 'next/server';
import { checkAndReassignTimedOutLeads } from '@/lib/lead-distribution';

// This endpoint should be called periodically (e.g., every minute via cron job)
export async function GET() {
  try {
    await checkAndReassignTimedOutLeads();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error checking timeout:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

