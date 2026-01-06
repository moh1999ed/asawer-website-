import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin/admin-utils';

export async function GET(request: NextRequest) {
  try {
    const user = await getAdminSession();

    if (!user) {
      return NextResponse.json(
        { error: 'غير مصرح' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error getting user:', error);
    return NextResponse.json(
      { error: 'خطأ في جلب معلومات المستخدم' },
      { status: 500 }
    );
  }
}

