'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Lock, Mail, Eye, EyeOff, Shield } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale as string || 'ar';

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') return;
    
    // Check if already logged in
    try {
      const storedUser = localStorage.getItem('admin-user');
      if (storedUser) {
        router.push(`/${locale}/admin/dashboard`);
      }
    } catch (e) {
      // localStorage not available
    }
  }, [router, locale]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (!email || !password) {
      setError('يرجى إدخال البريد الإلكتروني وكلمة المرور');
      setLoading(false);
      return;
    }

    try {
      // Use absolute URL to avoid locale issues
      const apiUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/api/admin/auth/login`
        : '/api/admin/auth/login';
      
      console.log('Calling API:', apiUrl);
      console.log('Email:', email);
      
      let res: Response;
      try {
        res = await fetch(apiUrl, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
      } catch (fetchError: any) {
        console.error('Fetch error:', fetchError);
        setError('لا يمكن الاتصال بالخادم. يرجى التحقق من أن الخادم يعمل على المنفذ 3000');
        setLoading(false);
        return;
      }
      
      console.log('Response status:', res.status);
      console.log('Response ok:', res.ok);

      // Get response text first
      let responseText: string = '';
      let data: any = null;
      
      try {
        responseText = await res.text();
        console.log('Response text length:', responseText.length);
        console.log('Response text preview:', responseText.substring(0, 200));
        
        if (!responseText || responseText.trim() === '') {
          throw new Error('الخادم أرسل استجابة فارغة');
        }
        
        // Try to parse as JSON
        try {
          data = JSON.parse(responseText);
          console.log('Parsed data:', data);
        } catch (parseError: any) {
          console.error('Failed to parse JSON:', parseError);
          console.error('Response was:', responseText);
          
          // Check if it's an HTML error page
          if (responseText.includes('<html') || responseText.includes('<!DOCTYPE')) {
            throw new Error('الخادم أرسل صفحة HTML بدلاً من JSON. قد يكون هناك خطأ في الـ API route');
          } else {
            throw new Error('الخادم أرسل استجابة غير صحيحة: ' + responseText.substring(0, 100));
          }
        }
      } catch (parseError: any) {
        console.error('Failed to parse response:', parseError);
        setError(parseError.message || 'حدث خطأ في استجابة الخادم. يرجى التحقق من أن الخادم يعمل');
        setLoading(false);
        return;
      }

      if (!res.ok) {
        setError(data.error || 'بيانات الدخول غير صحيحة. يرجى التحقق من البريد الإلكتروني وكلمة المرور');
        setLoading(false);
        return;
      }

      // Check if we got success response
      if (!data.success || !data.user) {
        setError('فشل تسجيل الدخول. يرجى المحاولة مرة أخرى');
        setLoading(false);
        return;
      }

      // Save user info to localStorage
      if (data.user && typeof window !== 'undefined') {
        try {
          localStorage.setItem('admin-user', JSON.stringify(data.user));
        } catch (e) {
          console.warn('Failed to save to localStorage:', e);
          // Continue anyway - session cookie should work
        }
      }

      // Small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));

      router.push(`/${locale}/admin/dashboard`);
    } catch (err: any) {
      console.error('Login error:', err);
      const errorMessage = err?.message || 'حدث خطأ في الاتصال بالخادم';
      
      // More specific error messages
      if (err?.message?.includes('fetch')) {
        setError('لا يمكن الاتصال بالخادم. يرجى التحقق من أن الخادم يعمل');
      } else if (err?.message?.includes('network')) {
        setError('مشكلة في الاتصال بالشبكة. يرجى التحقق من الاتصال بالإنترنت');
      } else {
        setError(errorMessage + '. يرجى المحاولة مرة أخرى');
      }
      
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-asawer-primary-500 via-asawer-primary-600 to-asawer-secondary-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-asawer-primary-500 to-asawer-secondary-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Shield className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-black text-gray-900 mb-2">أساور</h1>
            <p className="text-gray-600">لوحة التحكم الإدارية</p>
            <div className="mt-4 w-16 h-1 bg-gradient-to-r from-asawer-primary-500 to-asawer-secondary-500 rounded-full mx-auto"></div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-shake">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail className="absolute right-3 top-3.5 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-10 pl-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-primary-500 focus:ring-2 focus:ring-asawer-primary-500/20"
                  placeholder="admin@asawer.om"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock className="absolute right-3 top-3.5 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-10 pl-12 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-primary-500 focus:ring-2 focus:ring-asawer-primary-500/20"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 px-6 py-4 bg-gradient-to-r from-asawer-accent-500 via-asawer-accent-600 to-asawer-primary-500 text-white font-black text-lg rounded-xl hover:shadow-2xl hover:shadow-asawer-accent-500/50 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>جاري الدخول...</span>
                  </>
                ) : (
                  <>
                    <Shield size={22} className="text-white" />
                    <span className="text-xl font-black" style={{ color: '#e6f9f8' }}>تسجيل الدخول</span>
                  </>
                )}
              </span>
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <Link 
              href="/ar" 
              className="text-xs text-gray-500 hover:text-asawer-primary-500 transition-colors"
            >
              العودة إلى الموقع الرئيسي
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
