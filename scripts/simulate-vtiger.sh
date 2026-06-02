#!/usr/bin/env bash
# Simulate Vtiger capture without submitting the buyer form UI.
#
# Option A — direct webhook (Node, uses .env):
#   node scripts/test-vtiger-webhook.mjs
#
# Option B — full app path (buyer API → vtiger.ts), local dev server must be running:
#   ./scripts/simulate-vtiger.sh buyer http://localhost:3000
#
# Option C — admin test route (hits same code as production sync):
#   ADMIN_TOKEN=your-token ./scripts/simulate-vtiger.sh admin http://localhost:3000

set -euo pipefail

MODE="${1:-direct}"
BASE="${2:-http://localhost:3000}"
ADMIN_TOKEN="${ADMIN_TOKEN:-}"

case "$MODE" in
  direct)
    echo "→ Direct POST to Vtiger webhook (see test-vtiger-webhook.mjs)"
    node scripts/test-vtiger-webhook.mjs
    ;;
  buyer)
    echo "→ POST $BASE/api/buyers/request"
    curl -sS -X POST "$BASE/api/buyers/request" \
      -H "Content-Type: application/json" \
      -d '{
        "fullName": "Vtiger Simulate",
        "email": "simulate-'$(date +%s)'@example.com",
        "company": "Test Co",
        "role": "Founder / CXO",
        "lookingFor": "CRM",
        "companySize": "1–10",
        "decisionTimeline": "Immediately",
        "phoneNumber": "9876543210",
        "stateName": "Karnataka",
        "cityName": "Bengaluru"
      }' | jq . 2>/dev/null || cat
    echo ""
    echo "Check dev terminal for: [Vtiger] POST ..."
    ;;
  admin)
    if [ -z "$ADMIN_TOKEN" ]; then
      echo "Set ADMIN_TOKEN (from .env) or pass: ADMIN_TOKEN=xxx $0 admin $BASE"
      exit 1
    fi
    echo "→ POST $BASE/api/admin/test-vtiger"
    curl -sS -X POST "$BASE/api/admin/test-vtiger" \
      -H "Authorization: Bearer $ADMIN_TOKEN" \
      -H "Content-Type: application/json" \
      -d '{}' | jq . 2>/dev/null || cat
    ;;
  *)
    echo "Usage: $0 {direct|buyer|admin} [base_url]"
    exit 1
    ;;
esac
