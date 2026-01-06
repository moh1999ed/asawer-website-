'use client';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-asawer-primary-500 to-asawer-secondary-500 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">✅ المشروع يعمل!</h1>
        <p className="text-2xl">إذا رأيت هذه الصفحة، المشروع يعمل بشكل صحيح</p>
        <a href="/ar" className="mt-8 inline-block px-8 py-4 bg-white text-asawer-primary-500 rounded-lg font-bold hover:scale-105 transition-transform">
          العودة للصفحة الرئيسية
        </a>
      </div>
    </div>
  );
}



