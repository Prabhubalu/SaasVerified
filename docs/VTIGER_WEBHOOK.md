# Vtiger `createleads` webhook

Lead capture uses the VTAP incoming webhook configured in Vtiger (not in this repo).  
**IP and domain restrictions are set only in Vtiger API Designer → Security.**

## Remove IP and domain restrictions (Vtiger admin)

1. Log in to **saasverify.od2.vtiger.com**
2. Open **Platform → API Designer → `createleads`**
3. Open the **Security** tab (or panel)
4. **IP restrictions**
   - Delete every IP in the allowlist, or turn off “restrict to IP addresses” if shown
   - Leave the list **empty** so any server (VPS, local dev) can call the webhook
5. **Domain restrictions** (if shown)
   - Clear all allowed domains / referrer rules, or disable domain restriction
6. Confirm token is sent as **header** `Token` (matches our code)
7. Click **Save**, then **Publish** (required)
8. Copy the token from **Documentation** into production `.env`:
   ```env
   VTIGER_WEBHOOK_URL="https://saasverify.od2.vtiger.com/restapi/vtap/webhook/createleads"
   VTIGER_WEBHOOK_TOKEN="paste-from-documentation"
   ```

## Test from the VPS

```bash
cd /var/www/SaasVerified
node scripts/test-vtiger-exact-browser.mjs
```

Expect **HTTP 200**. Then:

```bash
pm2 restart saasverified
```

## This app’s request format

Same as API Designer example:

- `POST` + header `Token` + `Content-Type: application/json; charset=UTF-8`
- Body: `JSON.stringify({ lastname, email, cf_leads_websiteformsource: "Buyer", ... })`

No IP or domain checks are implemented in application code.
