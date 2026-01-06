#!/bin/bash

echo "🔄 إعادة بناء المشروع بالكامل..."
echo ""

cd "$(dirname "$0")"

echo "📝 الخطوة 1: إعادة تعيين المالك..."
sudo chown -R $(whoami) .

echo "🔐 الخطوة 2: إصلاح الصلاحيات..."
chmod -R 755 .

echo "🗑️  الخطوة 3: حذف الملفات المؤقتة..."
rm -rf node_modules
rm -rf .next
rm -f .env.local
rm -f package-lock.json

echo "📦 الخطوة 4: إعادة تثبيت node_modules..."
npm cache clean --force
npm install

echo "📄 الخطوة 5: إنشاء .env.local..."
touch .env.local
chmod 644 .env.local

echo "✅ تم إعادة بناء المشروع!"
echo ""
echo "🚀 تشغيل المشروع..."
echo ""

npm run dev



