import { cookies } from 'next/headers';
import { ADMIN_EMAIL, ADMIN_PASSWORD, type AdminUser } from './admin-config';
import { supabaseAdmin } from '../utils/supabase';

// Simple password comparison (replace with bcryptjs in production)
async function comparePassword(password: string, hash: string): Promise<boolean> {
  try {
    // Try to use bcryptjs if available
    // @ts-ignore - bcryptjs may not be installed
    const bcryptModule = await import('bcryptjs').catch(() => null);
    if (bcryptModule && (bcryptModule.default || bcryptModule.compare)) {
      const bcrypt = bcryptModule.default || bcryptModule;
      return await bcrypt.compare(password, hash);
    }
  } catch (e) {
    // bcryptjs not available, use fallback
  }
  
  // Fallback: simple comparison (NOT SECURE - replace in production)
  // Check if hash looks like bcrypt hash (starts with $2a$, $2b$, etc.)
  if (hash && hash.startsWith && hash.startsWith('$2')) {
    // Looks like bcrypt hash but bcryptjs not available
    console.warn('bcryptjs not available, cannot verify password');
    return false;
  }
  
  // Simple base64 comparison for development
  return Buffer.from(password).toString('base64') === hash;
}

const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'your-secret-key-change-in-production';

export async function validateAdminCredentials(
  email: string,
  password: string
): Promise<AdminUser | null> {
  try {
    console.log('Validating credentials for:', email);
    
    // First try database
    try {
      // Check if Supabase is configured (not placeholder)
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
      if (supabaseUrl && !supabaseUrl.includes('placeholder')) {
        try {
          const { data, error } = await supabaseAdmin
            .from('staff')
            .select('id, name, email, password_hash, role, is_active')
            .eq('email', email)
            .eq('is_active', true)
            .single();

          if (!error && data && data.password_hash) {
            console.log('Found user in database');
            // Verify password
            try {
              const isValid = await comparePassword(password, data.password_hash);
              if (isValid) {
                console.log('Password verified for database user');
                return {
                  id: data.id,
                  email: data.email,
                  name: data.name,
                  role: data.role as 'super_admin' | 'admin',
                };
              } else {
                console.log('Invalid password for database user');
              }
            } catch (pwdError: any) {
              console.warn('Password comparison error:', pwdError?.message);
              // Continue to fallback
            }
          } else if (error) {
            console.log('Database query error (table might not exist):', error.message);
            // Continue to fallback
          }
        } catch (dbError: any) {
          console.warn('Database connection error:', dbError?.message);
          // Continue to fallback
        }
      } else {
        console.log('Supabase not configured, using fallback');
      }
    } catch (error: any) {
      console.warn('Database auth error:', error?.message || error);
      // Continue to fallback - don't throw
    }

    // Fallback to environment variables for development
    console.log('Checking environment credentials...');
    console.log('ADMIN_EMAIL:', ADMIN_EMAIL);
    console.log('Email match:', email === ADMIN_EMAIL);
    console.log('Password match:', password === ADMIN_PASSWORD);
    
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      console.log('Environment credentials matched');
      return {
        email,
        name: 'مدير النظام',
        role: 'super_admin',
      };
    }

    console.log('No matching credentials found');
    return null;
  } catch (error: any) {
    // Catch any unexpected errors
    console.error('Unexpected error in validateAdminCredentials:', error);
    // Return null instead of throwing
    return null;
  }
}

export async function createAdminSession(user: AdminUser): Promise<string> {
  try {
    const sessionToken = Buffer.from(
      JSON.stringify({ ...user, timestamp: Date.now() })
    ).toString('base64');

    const cookieStore = await cookies();
    cookieStore.set('admin-session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return sessionToken;
  } catch (error) {
    console.error('Error creating session:', error);
    // Return a token anyway for client-side storage
    return Buffer.from(
      JSON.stringify({ ...user, timestamp: Date.now() })
    ).toString('base64');
  }
}

export async function getAdminSession(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('admin-session')?.value;

    if (!sessionToken) return null;

    const user = JSON.parse(Buffer.from(sessionToken, 'base64').toString());
    return user;
  } catch {
    return null;
  }
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('admin-session');
}

// In-memory storage for demo (replace with database in production)
export const storageData = {
  projects: [] as any[],
  leads: [] as any[],
  agents: [] as any[],
};
