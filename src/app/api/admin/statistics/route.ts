import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabaseAdmin
      .from('statistics')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching statistics:', error);
      return NextResponse.json({ statistics: [] });
    }

    return NextResponse.json({ statistics: data || [] });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return NextResponse.json({ statistics: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const stat = await request.json();
    const { key, value, unit, label_ar, label_en, icon, display_order, is_active } = stat;

    if (!key || value === undefined) {
      return NextResponse.json(
        { error: 'المفتاح والقيمة مطلوبان' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('statistics')
      .insert({
        key,
        value,
        unit: unit || '',
        label_ar: label_ar || '',
        label_en: label_en || '',
        icon: icon || '📊',
        display_order: display_order || 0,
        is_active: is_active !== undefined ? is_active : true,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating statistic:', error);
      return NextResponse.json(
        { error: 'خطأ في إنشاء الإحصائية' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating statistic:', error);
    return NextResponse.json(
      { error: 'خطأ في إنشاء الإحصائية' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const stat = await request.json();
    const { id, value, unit, label_ar, label_en, icon, display_order, is_active } = stat;

    if (!id) {
      return NextResponse.json(
        { error: 'معرّف الإحصائية مطلوب' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (value !== undefined) updateData.value = value;
    if (unit !== undefined) updateData.unit = unit;
    if (label_ar !== undefined) updateData.label_ar = label_ar;
    if (label_en !== undefined) updateData.label_en = label_en;
    if (icon !== undefined) updateData.icon = icon;
    if (display_order !== undefined) updateData.display_order = display_order;
    if (is_active !== undefined) updateData.is_active = is_active;

    const { data, error } = await supabaseAdmin
      .from('statistics')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating statistic:', error);
      return NextResponse.json(
        { error: 'خطأ في تحديث الإحصائية' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating statistic:', error);
    return NextResponse.json(
      { error: 'خطأ في تحديث الإحصائية' },
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
        { error: 'معرّف الإحصائية مطلوب' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('statistics')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting statistic:', error);
      return NextResponse.json(
        { error: 'خطأ في حذف الإحصائية' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting statistic:', error);
    return NextResponse.json(
      { error: 'خطأ في حذف الإحصائية' },
      { status: 500 }
    );
  }
}

