import { NextRequest, NextResponse } from 'next/server';
import { storageData } from '@/lib/admin-utils';
import { type Agent } from '@/lib/admin-config';

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({ agents: storageData.agents });
  } catch (error) {
    console.error('Error fetching agents:', error);
    return NextResponse.json({ error: 'خطأ في جلب الوكلاء' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const agent: Agent = await request.json();
    const newAgent = {
      ...agent,
      id: Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString(),
      active: true,
    };
    storageData.agents.push(newAgent);
    return NextResponse.json(newAgent);
  } catch (error) {
    console.error('Error creating agent:', error);
    return NextResponse.json({ error: 'خطأ في إنشاء الوكيل' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const agent: Agent & { id: string } = await request.json();
    const index = storageData.agents.findIndex((a) => a.id === agent.id);

    if (index === -1) {
      return NextResponse.json({ error: 'الوكيل غير موجود' }, { status: 404 });
    }

    storageData.agents[index] = { ...storageData.agents[index], ...agent };
    return NextResponse.json(storageData.agents[index]);
  } catch (error) {
    console.error('Error updating agent:', error);
    return NextResponse.json({ error: 'خطأ في تحديث الوكيل' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'معرّف الوكيل مطلوب' }, { status: 400 });
    }

    const index = storageData.agents.findIndex((a) => a.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'الوكيل غير موجود' }, { status: 404 });
    }

    storageData.agents.splice(index, 1);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting agent:', error);
    return NextResponse.json({ error: 'خطأ في حذف الوكيل' }, { status: 500 });
  }
}
