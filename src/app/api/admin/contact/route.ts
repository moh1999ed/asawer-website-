import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabaseAdmin
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching contact messages:', error);
      return NextResponse.json({ messages: [] });
    }

    return NextResponse.json({ messages: data || [] });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json({ messages: [] });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const message = await request.json();
    const { id, status } = message;

    if (!id) {
      return NextResponse.json(
        { error: 'معرّف الرسالة مطلوب' },
        { status: 400 }
      );
    }

    const updateData: any = { status };
    if (status === 'replied') {
      updateData.replied_at = new Date().toISOString();
    }

    const { data, error } = await supabaseAdmin
      .from('contact_messages')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating message:', error);
      return NextResponse.json(
        { error: 'خطأ في تحديث الرسالة' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json(
      { error: 'خطأ في تحديث الرسالة' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'معرّف الرسالة مطلوب' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('contact_messages')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting message:', error);
      return NextResponse.json(
        { error: 'خطأ في حذف الرسالة' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json(
      { error: 'خطأ في حذف الرسالة' },
      { status: 500 }
    );
  }
}

