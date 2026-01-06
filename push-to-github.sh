#!/bin/bash

echo "🚀 رفع المشروع إلى GitHub..."
echo ""

# التحقق من وجود remote
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ Remote غير موجود. يتم إضافته..."
    git remote add origin https://github.com/moh1999ed/asawer-website-.git
fi

# التحقق من حالة Git
echo "📋 حالة Git:"
git status --short

echo ""
echo "📤 جاري الرفع إلى GitHub..."
echo ""
echo "⚠️  سيطلب منك إدخال:"
echo "   Username: moh1999ed"
echo "   Password: Personal Access Token (ليس كلمة المرور العادية)"
echo ""
echo "💡 إذا لم يكن لديك Token، أنشئه من:"
echo "   https://github.com/settings/tokens/new"
echo "   اختر الصلاحيات: repo (كامل)"
echo ""

# محاولة الرفع
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ تم الرفع بنجاح!"
    echo "🌐 المستودع: https://github.com/moh1999ed/asawer-website-"
else
    echo ""
    echo "❌ فشل الرفع. تأكد من:"
    echo "   1. وجود Personal Access Token"
    echo "   2. صحة بيانات الاعتماد"
    echo "   3. اتصال الإنترنت"
fi

