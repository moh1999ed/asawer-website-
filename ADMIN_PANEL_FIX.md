# إصلاح لوحة التحكم

## المشاكل المحتملة والحلول

### 1. إذا لم يعمل الخادم:

```bash
cd asawer-website
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
rm -rf .next
npm run dev
```

### 2. إذا ظهرت أخطاء في المتصفح:

افتح Developer Console (F12) وابحث عن الأخطاء.

### 3. الوصول إلى لوحة التحكم:

افتح المتصفح على:
```
http://localhost:3000/ar/admin/login
```

### 4. بيانات تسجيل الدخول:

- البريد: `admin@asawer.om`
- كلمة المرور: `Asawer123!@#`

### 5. إذا استمرت المشاكل:

#### أ) تحقق من أن الخادم يعمل:
```bash
curl http://localhost:3000/ar/admin/login
```

#### ب) امسح localStorage:
افتح Console في المتصفح واكتب:
```javascript
localStorage.clear()
```

#### ج) امسح الكوكيز:
افتح Console في المتصفح واكتب:
```javascript
document.cookie.split(";").forEach(c => document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"));
```

### 6. التحقق من الملفات:

تأكد من وجود:
- `src/components/AdminLayout.tsx`
- `src/app/[locale]/admin/login/page.tsx`
- `src/app/api/admin/auth/login/route.ts`
- `src/app/api/admin/auth/me/route.ts`

### 7. إذا لم تعمل المصادقة:

الكود يستخدم بيانات البيئة كبديل:
- `ADMIN_EMAIL=admin@asawer.om`
- `ADMIN_PASSWORD=Asawer123!@#`

### 8. إعادة التشغيل الكامل:

```bash
cd asawer-website
# أوقف الخادم
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

# امسح الملفات المؤقتة
rm -rf .next
rm -rf node_modules/.cache

# أعد التشغيل
npm run dev
```

## المميزات المضافة:

✅ تسجيل دخول وخروج كامل
✅ تصنيفات منظمة بشكل ممتاز
✅ حماية تلقائية للصفحات
✅ تصميم راقي ومتجاوب
✅ أيقونات وأوصاف لكل قسم

