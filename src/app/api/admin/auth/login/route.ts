import { NextRequest, NextResponse } from 'next/server';

// Simple test route first
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Simple validation - use environment variables directly
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@asawer.om';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Asawer123!@#';

    if (!email || !password) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني وكلمة المرور مطلوبة' },
        { status: 400 }
      );
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      return NextResponse.json({
        success: true,
        user: {
          email: ADMIN_EMAIL,
          name: 'مدير النظام',
          role: 'super_admin',
        },
      });
    }

    return NextResponse.json(
      { error: 'بيانات دخول غير صحيحة' },
      { status: 401 }
    );
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في تسجيل الدخول' },
      { status: 500 }
    );
  }
}
