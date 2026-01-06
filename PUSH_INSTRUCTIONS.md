# 🚀 طريقة رفع المشروع إلى GitHub

## الطريقة السهلة (موصى بها):

### 1. شغّل السكريبت:
```bash
cd /Users/mac/Desktop/Asawer_Project_Documentation/asawer-website
./push-with-token.sh
```

### 2. عندما يطلب منك Token:
- الصق الـ Token الذي أنشأته من GitHub
- اضغط Enter
- سيتم الرفع تلقائياً!

---

## الطريقة اليدوية:

### إذا كان لديك Token:

```bash
cd /Users/mac/Desktop/Asawer_Project_Documentation/asawer-website

# استبدل YOUR_TOKEN بالـ Token الفعلي
git remote set-url origin https://YOUR_TOKEN@github.com/moh1999ed/asawer-website-.git

# ارفع الكود
git push -u origin main

# بعد الرفع، أعد تعيين Remote (للمستقبل)
git remote set-url origin https://github.com/moh1999ed/asawer-website-.git
```

---

## الطريقة البديلة (استخدام Token مباشرة):

```bash
cd /Users/mac/Desktop/Asawer_Project_Documentation/asawer-website

# استبدل YOUR_TOKEN بالـ Token الفعلي
git push https://YOUR_TOKEN@github.com/moh1999ed/asawer-website-.git main
```

---

## ملاحظات مهمة:

1. ✅ تأكد من أن الـ Token لديه صلاحيات `repo` (كامل)
2. ✅ لا تشارك الـ Token مع أحد
3. ✅ الـ Token يبدأ بـ `ghp_` عادة
4. ✅ عند نسخ الـ Token، تأكد من عدم نسخ مسافات إضافية

---

## إذا استمرت المشكلة:

1. تحقق من صحة الـ Token:
   - اذهب إلى: https://github.com/settings/tokens
   - تأكد من وجود Token نشط

2. أنشئ Token جديد:
   - https://github.com/settings/tokens/new
   - اختر: repo (Full control)

3. تأكد من الاتصال بالإنترنت

