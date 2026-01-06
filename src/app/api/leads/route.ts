import { NextRequest, NextResponse } from 'next/server';
import { createLeadAndAssign } from '@/lib/lead-distribution';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, project_id, source } = body;

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      );
    }

    // Create lead and assign to agent
    const result = await createLeadAndAssign({
      name,
      email,
      phone,
      message,
      project_id,
      source: source || 'website',
    });

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to create lead' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      leadId: result.leadId,
      agentId: result.agentId,
      timeoutAt: result.timeoutAt,
    });
  } catch (error) {
    console.error('Error in leads API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

