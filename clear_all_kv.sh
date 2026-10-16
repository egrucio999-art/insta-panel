#!/bin/bash
KV_ID="18495b9c73b14ed4b0d8365fd0a2e64e"

echo "=== Все ключи ==="
KEYS=$(npx wrangler kv key list \
  --namespace-id="$KV_ID" \
  --remote 2>/dev/null | jq -r '.[].name' 2>/dev/null)

if [ -z "$KEYS" ]; then
  echo "(empty)"
  exit 0
fi

echo "$KEYS"
echo ""
echo "=== Удаляю всё ==="

for KEY in $KEYS; do
  echo "Удаляю: $KEY"
  npx wrangler kv key delete "$KEY" \
    --namespace-id="$KV_ID" \
    --remote 2>&1 | tail -1
done

echo ""
echo "=== После очистки ==="
npx wrangler kv key list \
  --namespace-id="$KV_ID" \
  --remote 2>&1
