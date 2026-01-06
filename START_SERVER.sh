#!/bin/bash

echo "🚀 تشغيل خادم Next.js..."

# الانتقال للمجلد
cd /Users/mac/Desktop/Asawer_Project_Documentation/asawer-website

# إيقاف أي عملية على المنفذ 3000
echo "⏹️  إيقاف العمليات السابقة..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

# حذف .next
echo "🗑️  حذف مجلد .next..."
rm -rf .next

# تشغيل الخادم
echo "✅ تشغيل الخادم..."
echo ""
echo "🌐 افتح المتصفح على: http://localhost:3000/ar"
echo ""
npm run dev



