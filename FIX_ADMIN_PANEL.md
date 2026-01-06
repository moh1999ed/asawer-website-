# إصلاح لوحة التحكم

## المشاكل المحتملة والحلول

### 1. مشكلة bcryptjs

إذا ظهرت أخطاء متعلقة بـ `bcryptjs`:

**الحل:**
```bash
cd asawer-website
npm install bcryptjs
npm install --save-dev @types/bcryptjs
```

أو استخدم الكود المحدث الذي يحتوي على fallback في حالة عدم توفر bcryptjs.

### 2. مشكلة قاعدة البيانات

إذا لم تكن الجداول موجودة:

1. افتح Supabase Dashboard
2. اذهب إلى SQL Editor
3. قم بتشغيل ملف `src/lib/database-schema-extended.sql`

### 3. مشكلة الصلاحيات

إذا ظهرت أخطاء EPERM:

```bash
# تأكد من الصلاحيات
chmod -R 755 asawer-website
```

### 4. تشغيل الخادم

```bash
cd asawer-website
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
rm -rf .next
npm run dev
```

### 5. التحقق من المتغيرات البيئية

تأكد من وجود ملف `.env.local` مع:

```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

### 6. إذا استمرت المشاكل

استخدم بيانات البيئة للدخول:
- البريد: `admin@asawer.om`
- كلمة المرور: `Asawer123!@#`

