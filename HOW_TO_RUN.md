# How to Run the Website

## Quick Method:

```bash
cd /Users/mac/Desktop/Asawer_Project_Documentation/asawer-website
./FIX_AND_START.sh
```

## Manual Method:

1. Open Terminal
2. Navigate to the folder:
```bash
cd /Users/mac/Desktop/Asawer_Project_Documentation/asawer-website
```

3. Stop any process on port 3000:
```bash
lsof -ti:3000 | xargs kill -9
```

4. Delete .next folder:
```bash
rm -rf .next
```

5. Run the server:
```bash
npm run dev
```

6. Open browser at:
```
http://localhost:3000/ar
```

## To Verify the Website is Working:

Open:
```
http://localhost:3000/ar/test-simple
```

If you see "✅ Website is working!" it means the problem is in the homepage, not the server.

## If the Problem Persists:

1. Open Developer Console (F12)
2. Check errors in Console
3. Send me the errors
