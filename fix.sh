#!/bin/bash
set -e
cd ~/insta-panel

echo "=== 1. Удаляю middleware ==="
rm -rf functions
rm -f wrangler.toml
echo "OK"

echo ""
echo "=== 2. Проверяю файлы ==="
ls -la index.html profile.html js/splash.js js/session_kicked.js

echo ""
echo "=== 3. Проверяю, что index.html — splash ==="
head -3 index.html
grep -c "continueBtn" index.html

echo ""
echo "=== 4. Проверяю, что splash.js ведёт на profile.html ==="
grep -c "profile.html" js/splash.js

echo ""
echo "=== 5. Проверяю, что session_kicked.js подключён в profile.html ==="
grep -c "session_kicked" profile.html

echo ""
echo "=== 6. Git status ==="
git status -s

echo ""
echo "=== 7. Git add + commit + push ==="
git add -A
git commit -m "remove middleware, clean deploy" || echo "nothing to commit"
git push

echo ""
echo "=== 8. Форсирую redeploy через wrangler ==="
npx wrangler pages deploy . --project-name=insta-panel --commit-dirty=true

echo ""
echo "[+] DONE. Жди 1-2 минуты, потом открой:"
echo "    https://insta-panel.pages.dev"
