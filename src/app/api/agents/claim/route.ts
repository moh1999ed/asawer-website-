import { NextRequest, NextResponse } from 'next/server';
import { claimLead } from '@/lib/utils/lead-distribution';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { leadId, agentId } = body;

    if (!leadId || !agentId) {
      return NextResponse.json(
        { error: 'leadId and agentId are required' },
        { status: 400 }
      );
    }

    const success = await claimLead(leadId, agentId);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to claim lead' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error claiming lead:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

