#!/bin/bash
echo "=== Локальный middleware ==="
grep -n "profile.html\|isHome\|BLOK" ~/insta-panel/functions/_middleware.js

echo ""
echo "=== Последний коммит ==="
cd ~/insta-panel
git log --oneline -3

echo ""
echo "=== Статус ==="
git status -s

echo ""
echo "=== Последний деплой ==="
npx wrangler pages deployment list --project-name=insta-panel 2>&1 | head -8
