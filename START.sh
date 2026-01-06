#!/bin/bash

echo "🚀 بدء إصلاح وتشغيل المشروع..."
echo ""

cd "$(dirname "$0")"

echo "📝 إعادة تعيين المالك..."
sudo chown -R $(whoami) .

echo "🔐 إصلاح الصلاحيات..."
chmod -R 755 .

echo "🗑️  حذف .env.local القديم..."
rm -f .env.local

echo "📄 إنشاء .env.local جديد..."
touch .env.local
chmod 644 .env.local

echo "✅ تم إصلاح الصلاحيات!"
echo ""
echo "🚀 تشغيل المشروع..."
echo ""

npm run dev



