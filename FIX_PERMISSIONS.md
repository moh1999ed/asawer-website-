# 🔧 حل مشكلة الصلاحيات

## المشكلة:
```
Error: EPERM: operation not permitted
```

هذه مشكلة في صلاحيات النظام، وليست في الكود.

---

## ✅ الحلول:

### الحل 1: إصلاح صلاحيات الملفات

افتح Terminal واكتب:

```bash
cd /Users/mac/Desktop/Asawer_Project_Documentation/asawer-website

# إصلاح صلاحيات المجلد
chmod -R 755 .

# إصلاح صلاحيات node_modules
chmod -R 755 node_modules

# إصلاح صلاحيات .next (إن وجد)
chmod -R 755 .next 2>/dev/null || true
```

### الحل 2: إعادة تثبيت node_modules

```bash
cd /Users/mac/Desktop/Asawer_Project_Documentation/asawer-website

# حذف node_modules وإعادة التثبيت
rm -rf node_modules
npm install
```

### الحل 3: استخدام sudo (إذا لزم الأمر)

```bash
cd /Users/mac/Desktop/Asawer_Project_Documentation/asawer-website

# إصلاح الصلاحيات
sudo chmod -R 755 .

# إعادة تثبيت
sudo npm install
```

### الحل 4: إنشاء .env.local (إذا كان مفقوداً)

```bash
cd /Users/mac/Desktop/Asawer_Project_Documentation/asawer-website

# إنشاء ملف .env.local
touch .env.local

# إضافة المحتوى الأساسي (اختياري)
cat > .env.local << EOF
# Supabase Configuration (أضف القيم الخاصة بك)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Admin Credentials
ADMIN_EMAIL=admin@asawer.com
ADMIN_PASSWORD=your_password
EOF
```

---

## 🚀 بعد إصلاح الصلاحيات:

### 1. تأكد من تثبيت GSAP:
```bash
npm install gsap
```

### 2. شغل المشروع:
```bash
npm run dev
```

### 3. افتح المتصفح:
- العربية: http://localhost:3000/ar
- English: http://localhost:3000/en

---

## 🔍 التحقق من الصلاحيات:

```bash
# التحقق من صلاحيات المجلد
ls -la /Users/mac/Desktop/Asawer_Project_Documentation/asawer-website

# التحقق من صلاحيات node_modules
ls -la node_modules | head -5
```

---

## ⚠️ ملاحظات مهمة:

1. **لا تستخدم sudo** إلا إذا كان ضرورياً
2. **تأكد من أنك المالك** للملفات:
   ```bash
   sudo chown -R $(whoami) .
   ```

3. **إذا استمرت المشكلة**، جرب:
   ```bash
   # إعادة تعيين الصلاحيات بالكامل
   sudo chown -R $(whoami) .
   chmod -R 755 .
   ```

---

## 📞 إذا استمرت المشكلة:

1. تأكد من أنك تستخدم Terminal عادي (ليس root)
2. جرب إعادة تشغيل Terminal
3. تأكد من أن Node.js و npm مثبتين بشكل صحيح:
   ```bash
   node --version
   npm --version
   ```

---

**بعد إصلاح الصلاحيات، المشروع سيعمل بشكل طبيعي!** ✅



