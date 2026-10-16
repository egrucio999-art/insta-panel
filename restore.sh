#!/bin/bash
set -e
cd ~/insta-panel

echo "[*] 1. Удаляю middleware"
rm -f functions/_middleware.js
rmdir functions 2>/dev/null || true

echo "[*] 2. Удаляю wrangler.toml"
rm -f wrangler.toml

echo "[*] 3. Проверяю index.html (splash)"
if [ ! -f index.html ]; then
  echo "[!] index.html не найден!"
  exit 1
fi
echo "index.html: $(wc -c < index.html) байт"

echo "[*] 4. Проверяю profile.html"
if [ ! -f profile.html ]; then
  echo "[!] profile.html не найден!"
  exit 1
fi
echo "profile.html: $(wc -c < profile.html) байт"

echo "[*] 5. Проверяю splash.js"
if [ ! -f js/splash.js ]; then
  echo "[!] js/splash.js не найден!"
  exit 1
fi
echo "splash.js: $(wc -c < js/splash.js) байт"

echo "[*] 6. Проверяю session_kicked.js"
if [ ! -f js/session_kicked.js ]; then
  echo "[!] js/session_kicked.js не найден!"
  exit 1
fi
echo "session_kicked.js: $(wc -c < js/session_kicked.js) байт"

echo "[*] 7. Проверяю, что splash.js ведёт на profile.html"
grep -n "profile.html" js/splash.js || echo "[!] splash.js НЕ ведёт на profile.html"

echo "[*] 8. Проверяю, что session_kicked.js подключён в profile.html"
grep -n "session_kicked" profile.html || echo "[!] session_kicked.js НЕ подключён в profile.html"

echo ""
echo "[+] Готово. Сейчас git push."
echo ""

git add -A
git commit -m "remove middleware, restore original" || echo "nothing to commit"
git push

echo ""
echo "[+] Pushed. Жди 1-2 минуты, потом открой:"
echo "    https://insta-panel.pages.dev"
