#!/bin/bash
KV_ID="18495b9c73b14ed4b0d8365fd0a2e64e"
MY_IP=$(curl -s ifconfig.me)

echo "[*] My IP: $MY_IP"
echo "[*] Deleting from KV..."

npx wrangler kv key delete "$MY_IP" \
  --namespace-id="$KV_ID" \
  --remote 2>&1

echo ""
echo "[*] Remaining keys:"
npx wrangler kv key list \
  --namespace-id="$KV_ID" \
  --remote 2>&1

echo ""
echo "[*] Done"
