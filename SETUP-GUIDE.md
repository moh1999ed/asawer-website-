# دليل الإعداد الكامل - موقع أساور

## الخطوة 1: تثبيت المتطلبات

```bash
cd asawer-website
npm install
```

## الخطوة 2: إعداد Supabase

### 2.1 إنشاء مشروع Supabase

1. اذهب إلى [supabase.com](https://supabase.com)
2. أنشئ حساب جديد أو سجّل الدخول
3. اضغط "New Project"
4. املأ البيانات:
   - **Name:** asawer-website
   - **Database Password:** اختر كلمة مرور قوية
   - **Region:** اختر الأقرب لك

### 2.2 إعداد قاعدة البيانات

1. بعد إنشاء المشروع، اذهب إلى **SQL Editor**
2. انسخ محتوى ملف `src/lib/database-schema.sql`
3. الصقه في SQL Editor واضغط **Run**

### 2.3 إضافة الموظفين

في SQL Editor، نفذ:

```sql
INSERT INTO agents (name, email, phone, whatsapp_link, is_active) VALUES
('أحمد محمد', 'ahmed@asawer.om', '96891234567', 'https://wa.me/96891234567', true),
('فاطمة علي', 'fatima@asawer.om', '96891234568', 'https://wa.me/96891234568', true),
('محمد خالد', 'mohammed@asawer.om', '96891234569', 'https://wa.me/96891234569', true),
('سارة أحمد', 'sara@asawer.om', '96891234570', 'https://wa.me/96891234570', true),
('علي حسن', 'ali@asawer.om', '96891234571', 'https://wa.me/96891234571', true),
('نورا سالم', 'nora@asawer.om', '96891234572', 'https://wa.me/96891234572', true),
('خالد يوسف', 'khalid@asawer.om', '96891234573', 'https://wa.me/96891234573', true);
```

### 2.4 الحصول على المفاتيح

1. اذهب إلى **Settings** → **API**
2. انسخ:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

## الخطوة 3: إعداد Google Maps

1. اذهب إلى [Google Cloud Console](https://console.cloud.google.com)
2. أنشئ مشروع جديد أو اختر مشروع موجود
3. فعّل **Maps JavaScript API**
4. اذهب إلى **Credentials** → **Create Credentials** → **API Key**
5. انسخ المفتاح → `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

## الخطوة 4: إعداد ملف البيئة

1. انسخ `env.example` إلى `.env.local`:

```bash
cp env.example .env.local
```

2. املأ القيم:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSy...
WHATSAPP_PHONE_NUMBER=96893994710
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## الخطوة 5: تشغيل المشروع

```bash
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000)

## الخطوة 6: إضافة بيانات تجريبية (اختياري)

في SQL Editor:

```sql
-- إضافة مشروع تجريبي
INSERT INTO projects (
  name_ar, name_en, description_ar, description_en,
  location_ar, location_en, latitude, longitude,
  project_type, status, units_count, delivery_date
) VALUES (
  'مشروع الخوير السكني',
  'Khuwair Residential Project',
  'مجمع سكني عصري',
  'Modern residential complex',
  'الخوير، مسقط',
  'Khuwair, Muscat',
  23.6145,
  58.5453,
  'residential',
  'completed',
  120,
  '2024-12-31'
);
```

## الخطوة 7: اختبار نظام التوزيع

1. اذهب إلى صفحة أي مشروع
2. املأ نموذج "تسجيل اهتمام"
3. تحقق من Supabase → جدول `leads` → يجب أن يظهر العميل الجديد
4. تحقق من `assigned_to` → يجب أن يكون موظفاً عشوائياً

## الخطوة 8: إعداد Cron Job (للإنتاج)

### على Vercel:

المشروع جاهز! ملف `vercel.json` يحتوي على إعدادات Cron Job.

### على خادم آخر:

استخدم cron:

```bash
* * * * * curl https://your-domain.com/api/leads/check-timeout
```

## استكشاف الأخطاء

### خطأ في Supabase:
- تأكد من أن المفاتيح صحيحة
- تأكد من أن الجداول موجودة
- تحقق من Row Level Security (RLS)

### خطأ في Google Maps:
- تأكد من تفعيل Maps JavaScript API
- تحقق من أن المفتاح صحيح
- تأكد من إضافة Domain في Google Console

### خطأ في التوزيع:
- تحقق من وجود موظفين نشطين في جدول `agents`
- تأكد من أن `is_active = true`

## الدعم

للمساعدة:
- **البريد:** info@asawer.om
- **الهاتف:** 93994710 - 8009008

---

**حظاً موفقاً! 🚀**

