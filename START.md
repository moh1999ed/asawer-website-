# كيفية تشغيل الموقع

## الطريقة السريعة:

1. افتح Terminal
2. اكتب:
```bash
cd /Users/mac/asawer-real-estate-evaluation/asawer-website
npm run dev
```

3. انتظر حتى ترى:
```
✓ Ready in X seconds
○ Local: http://localhost:3000
```

4. افتح المتصفح على:
- **http://localhost:3000/ar** (للعربية)
- **http://localhost:3000/en** (للإنجليزية)

## إذا لم يعمل:

### 1. تأكد من تثبيت الحزم:
```bash
cd /Users/mac/asawer-real-estate-evaluation/asawer-website
npm install
```

### 2. احذف مجلد .next وأعد البناء:
```bash
rm -rf .next
npm run dev
```

### 3. تحقق من المنفذ 3000:
```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```

## المشاكل الشائعة:

### خطأ: "Port 3000 is already in use"
```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```

### خطأ: "Module not found"
```bash
rm -rf node_modules .next
npm install
npm run dev
```

### خطأ: "Supabase"
لا تقلق - الموقع يعمل بدون Supabase. فقط افتح المتصفح.

---

**ملاحظة:** إذا استمرت المشكلة، أرسل رسالة الخطأ الكاملة.

