#!/bin/bash
URL="https://insta-panel.pages.dev"

echo "=== 1. Главная (первый визит) ==="
curl -s -o /dev/null -w "HTTP: %{http_code}\n" "$URL/"

echo ""
echo "=== 2. profile.html (не должно блокироваться) ==="
curl -s -o /dev/null -w "HTTP: %{http_code}\n" "$URL/profile.html"

echo ""
echo "=== 3. Главная (второй визит) ==="
curl -s -o /dev/null -w "HTTP: %{http_code}\n" "$URL/"

echo ""
echo "=== 4. Тело профиля ==="
curl -s "$URL/profile.html" | head -5
