import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Simple password hashing (replace with bcryptjs in production)
async function hashPassword(password: string): Promise<string> {
  // For now, use a simple hash. In production, use bcryptjs
  try {
    const bcrypt = await import('bcryptjs');
    return await bcrypt.hash(password, 10);
  } catch {
    // Fallback: simple encoding (NOT SECURE - replace in production)
    return Buffer.from(password).toString('base64');
  }
}

async function comparePassword(password: string, hash: string): Promise<boolean> {
  try {
    const bcrypt = await import('bcryptjs');
    return await bcrypt.compare(password, hash);
  } catch {
    // Fallback: simple comparison (NOT SECURE - replace in production)
    return Buffer.from(password).toString('base64') === hash;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabaseAdmin
      .from('staff')
      .select('id, name, email, role, is_active, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching staff:', error);
      return NextResponse.json({ staff: [] });
    }

    return NextResponse.json({ staff: data || [] });
  } catch (error) {
    console.error('Error fetching staff:', error);
    return NextResponse.json({ staff: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const staff = await request.json();
    const { name, email, password, role, is_active } = staff;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'الاسم والبريد الإلكتروني وكلمة المرور مطلوبة' },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    const { data, error } = await supabaseAdmin
      .from('staff')
      .insert({
        name,
        email,
        password_hash: passwordHash,
        role: role || 'admin',
        is_active: is_active !== undefined ? is_active : true,
      })
      .select('id, name, email, role, is_active, created_at')
      .single();

    if (error) {
      console.error('Error creating staff:', error);
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'البريد الإلكتروني مستخدم بالفعل' },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: 'خطأ في إنشاء الموظف' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating staff:', error);
    return NextResponse.json(
      { error: 'خطأ في إنشاء الموظف' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const staff = await request.json();
    const { id, name, password, role, is_active } = staff;

    if (!id) {
      return NextResponse.json(
        { error: 'معرّف الموظف مطلوب' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (role !== undefined) updateData.role = role;
    if (is_active !== undefined) updateData.is_active = is_active;
    
    // Only update password if provided
    if (password) {
      updateData.password_hash = await hashPassword(password);
    }

    const { data, error } = await supabaseAdmin
      .from('staff')
      .update(updateData)
      .eq('id', id)
      .select('id, name, email, role, is_active, created_at')
      .single();

    if (error) {
      console.error('Error updating staff:', error);
      return NextResponse.json(
        { error: 'خطأ في تحديث الموظف' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating staff:', error);
    return NextResponse.json(
      { error: 'خطأ في تحديث الموظف' },
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
        { error: 'معرّف الموظف مطلوب' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('staff')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting staff:', error);
      return NextResponse.json(
        { error: 'خطأ في حذف الموظف' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting staff:', error);
    return NextResponse.json(
      { error: 'خطأ في حذف الموظف' },
      { status: 500 }
    );
  }
}

