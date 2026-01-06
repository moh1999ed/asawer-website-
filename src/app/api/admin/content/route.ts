import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabaseAdmin
      .from('content')
      .select('*')
      .order('section', { ascending: true })
      .order('key', { ascending: true });

    if (error) {
      console.error('Error fetching content:', error);
      // Fallback to empty array if table doesn't exist yet
      return NextResponse.json({ contents: [] });
    }

    return NextResponse.json({ contents: data || [] });
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json({ contents: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const content = await request.json();
    const { key, value_ar, value_en, content_type, section } = content;

    if (!key || !section) {
      return NextResponse.json(
        { error: 'المفتاح والقسم مطلوبان' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('content')
      .insert({
        key,
        value_ar: value_ar || '',
        value_en: value_en || '',
        content_type: content_type || 'text',
        section,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating content:', error);
      return NextResponse.json(
        { error: 'خطأ في إنشاء المحتوى' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating content:', error);
    return NextResponse.json(
      { error: 'خطأ في إنشاء المحتوى' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const content = await request.json();
    const { id, value_ar, value_en, content_type, section } = content;

    if (!id) {
      return NextResponse.json(
        { error: 'معرّف المحتوى مطلوب' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (value_ar !== undefined) updateData.value_ar = value_ar;
    if (value_en !== undefined) updateData.value_en = value_en;
    if (content_type !== undefined) updateData.content_type = content_type;
    if (section !== undefined) updateData.section = section;

    const { data, error } = await supabaseAdmin
      .from('content')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating content:', error);
      return NextResponse.json(
        { error: 'خطأ في تحديث المحتوى' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { error: 'خطأ في تحديث المحتوى' },
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
        { error: 'معرّف المحتوى مطلوب' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('content')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting content:', error);
      return NextResponse.json(
        { error: 'خطأ في حذف المحتوى' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting content:', error);
    return NextResponse.json(
      { error: 'خطأ في حذف المحتوى' },
      { status: 500 }
    );
  }
}

