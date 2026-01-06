#!/bin/bash

echo "🔄 الحل المضمون - إعادة بناء كامل..."
echo ""

cd "$(dirname "$0")"

echo "📝 الخطوة 1: إعادة تعيين المالك..."
echo "⚠️  سيطلب منك كلمة المرور"
sudo chown -R $(whoami) .

echo ""
echo "🔐 الخطوة 2: إصلاح الصلاحيات..."
chmod -R 755 .

echo ""
echo "🗑️  الخطوة 3: حذف الملفات المؤقتة..."
rm -rf node_modules
rm -rf .next
rm -f .env.local
rm -f package-lock.json

echo ""
echo "🧹 الخطوة 4: تنظيف npm cache..."
npm cache clean --force

echo ""
echo "📦 الخطوة 5: إعادة تثبيت node_modules..."
echo "⏳ هذا قد يستغرق بضع دقائق..."
npm install

echo ""
echo "📄 الخطوة 6: إنشاء .env.local..."
touch .env.local
chmod 644 .env.local

echo ""
echo "✅ تم إعادة بناء المشروع بالكامل!"
echo ""
echo "🚀 تشغيل المشروع (بدون turbopack)..."
echo ""

npm run dev



