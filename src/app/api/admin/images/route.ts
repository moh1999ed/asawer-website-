import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabaseAdmin
      .from('images')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching images:', error);
      return NextResponse.json({ images: [] });
    }

    return NextResponse.json({ images: data || [] });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ images: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const image = await request.json();
    const { name, url, alt_text_ar, alt_text_en, category, project_id, is_featured, display_order } = image;

    if (!name || !url || !category) {
      return NextResponse.json(
        { error: 'الاسم والرابط والفئة مطلوبة' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('images')
      .insert({
        name,
        url,
        alt_text_ar: alt_text_ar || '',
        alt_text_en: alt_text_en || '',
        category,
        project_id: project_id || null,
        is_featured: is_featured || false,
        display_order: display_order || 0,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating image:', error);
      return NextResponse.json(
        { error: 'خطأ في إنشاء الصورة' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating image:', error);
    return NextResponse.json(
      { error: 'خطأ في إنشاء الصورة' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const image = await request.json();
    const { id, name, url, alt_text_ar, alt_text_en, category, project_id, is_featured, display_order } = image;

    if (!id) {
      return NextResponse.json(
        { error: 'معرّف الصورة مطلوب' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (url !== undefined) updateData.url = url;
    if (alt_text_ar !== undefined) updateData.alt_text_ar = alt_text_ar;
    if (alt_text_en !== undefined) updateData.alt_text_en = alt_text_en;
    if (category !== undefined) updateData.category = category;
    if (project_id !== undefined) updateData.project_id = project_id || null;
    if (is_featured !== undefined) updateData.is_featured = is_featured;
    if (display_order !== undefined) updateData.display_order = display_order;

    const { data, error } = await supabaseAdmin
      .from('images')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating image:', error);
      return NextResponse.json(
        { error: 'خطأ في تحديث الصورة' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating image:', error);
    return NextResponse.json(
      { error: 'خطأ في تحديث الصورة' },
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
        { error: 'معرّف الصورة مطلوب' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('images')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting image:', error);
      return NextResponse.json(
        { error: 'خطأ في حذف الصورة' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: 'خطأ في حذف الصورة' },
      { status: 500 }
    );
  }
}

