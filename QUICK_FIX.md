# إصلاح سريع للوحة التحكم

## إذا لم يعمل الموقع:

### 1. تثبيت الحزم المطلوبة:
```bash
cd asawer-website
npm install bcryptjs
npm install --save-dev @types/bcryptjs
```

### 2. إعادة تشغيل الخادم:
```bash
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
rm -rf .next
npm run dev
```

### 3. الوصول للوحة التحكم:
افتح المتصفح على:
```
http://localhost:3000/ar/admin/login
```

### 4. بيانات الدخول:
- البريد: `admin@asawer.om`
- كلمة المرور: `Asawer123!@#`

### 5. إذا استمرت المشاكل:

#### أ) تحقق من قاعدة البيانات:
- تأكد من تشغيل ملف `database-schema-extended.sql` في Supabase

#### ب) تحقق من المتغيرات البيئية:
تأكد من وجود `.env.local` مع:
```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

#### ج) استخدم بيانات البيئة:
إذا لم تعمل قاعدة البيانات، استخدم بيانات البيئة للدخول (تم إصلاحها في الكود)

### 6. الصفحات المتاحة:
- `/ar/admin/dashboard` - لوحة التحكم
- `/ar/admin/projects` - المشاريع
- `/ar/admin/project-leads` - طلبات العملاء
- `/ar/admin/leads` - العملاء
- `/ar/admin/agents` - الوكلاء
- `/ar/admin/content` - المحتوى
- `/ar/admin/images` - الصور
- `/ar/admin/statistics` - الإحصائيات
- `/ar/admin/staff` - الموظفين
- `/ar/admin/contact` - التواصل العام

## ملاحظة:
جميع الروابط تم إصلاحها لاستخدام locale بشكل صحيح.

