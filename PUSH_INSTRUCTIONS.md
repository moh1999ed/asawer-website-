# 🚀 How to Push Project to GitHub

## Easy Method (Recommended):

### 1. Run the script:
```bash
cd /Users/mac/Desktop/Asawer_Project_Documentation/asawer-website
./push-with-token.sh
```

### 2. When prompted for Token:
- Paste the Token you created from GitHub
- Press Enter
- It will push automatically!

---

## Manual Method:

### If you have a Token:

```bash
cd /Users/mac/Desktop/Asawer_Project_Documentation/asawer-website

# Replace YOUR_TOKEN with your actual Token
git remote set-url origin https://YOUR_TOKEN@github.com/moh1999ed/asawer-website-.git

# Push the code
git push -u origin main

# After pushing, reset Remote (for future)
git remote set-url origin https://github.com/moh1999ed/asawer-website-.git
```

---

## Alternative Method (Using Token directly):

```bash
cd /Users/mac/Desktop/Asawer_Project_Documentation/asawer-website

# Replace YOUR_TOKEN with your actual Token
git push https://YOUR_TOKEN@github.com/moh1999ed/asawer-website-.git main
```

---

## Important Notes:

1. ✅ Make sure the Token has `repo` permissions (full)
2. ✅ Don't share the Token with anyone
3. ✅ The Token usually starts with `ghp_`
4. ✅ When copying the Token, make sure there are no extra spaces

---

## If the Problem Persists:

1. Check Token validity:
   - Go to: https://github.com/settings/tokens
   - Make sure there's an active Token

2. Create a new Token:
   - https://github.com/settings/tokens/new
   - Select: repo (Full control)

3. Make sure you have internet connection
