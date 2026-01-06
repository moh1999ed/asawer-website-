#!/bin/bash

echo "═══════════════════════════════════════════════════════"
echo "🚀 رفع المشروع إلى GitHub باستخدام Token"
echo "═══════════════════════════════════════════════════════"
echo ""

# طلب Token من المستخدم
read -sp "🔑 أدخل Personal Access Token: " TOKEN
echo ""

if [ -z "$TOKEN" ]; then
    echo "❌ لم يتم إدخال Token!"
    exit 1
fi

# إعداد remote مع Token
echo "📡 جاري إعداد الاتصال..."
git remote set-url origin https://${TOKEN}@github.com/moh1999ed/asawer-website-.git

# محاولة الرفع
echo "📤 جاري الرفع..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ تم الرفع بنجاح! 🎉"
    echo "🌐 المستودع: https://github.com/moh1999ed/asawer-website-"
    
    # إعادة تعيين remote بدون Token (للمستقبل)
    git remote set-url origin https://github.com/moh1999ed/asawer-website-.git
    echo ""
    echo "✅ تم إعادة تعيين Remote بنجاح"
else
    echo ""
    echo "❌ فشل الرفع. تحقق من:"
    echo "   1. صحة الـ Token"
    echo "   2. صلاحيات الـ Token (يجب أن يكون لديه repo)"
    echo "   3. اتصال الإنترنت"
    echo ""
    echo "💡 جرب إنشاء Token جديد من:"
    echo "   https://github.com/settings/tokens/new"
fi

