import { NextRequest, NextResponse } from 'next/server';
import { storageData } from '@/lib/admin-utils';
import { type Lead } from '@/lib/admin-config';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    let leads = storageData.leads;

    if (status) {
      leads = leads.filter((l) => l.status === status);
    }

    const total = leads.length;
    const leads_page = leads.slice((page - 1) * limit, page * limit);

    return NextResponse.json({
      leads: leads_page,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ error: 'خطأ في جلب العملاء' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const lead: Lead = await request.json();
    const newLead = {
      ...lead,
      id: Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    storageData.leads.push(newLead);
    return NextResponse.json(newLead);
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: 'خطأ في إنشاء العميل' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const lead: Lead & { id: string } = await request.json();
    const index = storageData.leads.findIndex((l) => l.id === lead.id);

    if (index === -1) {
      return NextResponse.json({ error: 'العميل غير موجود' }, { status: 404 });
    }

    storageData.leads[index] = {
      ...storageData.leads[index],
      ...lead,
      updated_at: new Date().toISOString(),
    };
    return NextResponse.json(storageData.leads[index]);
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json({ error: 'خطأ في تحديث العميل' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'معرّف العميل مطلوب' }, { status: 400 });
    }

    const index = storageData.leads.findIndex((l) => l.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'العميل غير موجود' }, { status: 404 });
    }

    storageData.leads.splice(index, 1);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json({ error: 'خطأ في حذف العميل' }, { status: 500 });
  }
}
