# كيفية تشغيل الموقع

## الطريقة السريعة:

```bash
cd /Users/mac/Desktop/Asawer_Project_Documentation/asawer-website
./FIX_AND_START.sh
```

## الطريقة اليدوية:

1. افتح Terminal
2. اذهب للمجلد:
```bash
cd /Users/mac/Desktop/Asawer_Project_Documentation/asawer-website
```

3. أوقف أي عملية على المنفذ 3000:
```bash
lsof -ti:3000 | xargs kill -9
```

4. احذف مجلد .next:
```bash
rm -rf .next
```

5. شغّل الخادم:
```bash
npm run dev
```

6. افتح المتصفح على:
```
http://localhost:3000/ar
```

## للتحقق من أن الموقع يعمل:

افتح:
```
http://localhost:3000/ar/test-simple
```

إذا رأيت "✅ الموقع يعمل!" يعني أن المشكلة في الصفحة الرئيسية وليس في الخادم.

## إذا استمرت المشكلة:

1. افتح Developer Console (F12)
2. افحص الأخطاء في Console
3. أرسل لي الأخطاء



