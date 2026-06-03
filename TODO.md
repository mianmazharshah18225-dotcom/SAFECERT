- [x] Inspect contact form UI and API endpoint
- [x] Identify current mail sending mechanism (nodemailer SMTP) and failure points
- [ ] Update `app/api/contact/route.ts` to harden SMTP handling (parse port, validate env vars, surface nodemailer errors)
- [ ] Ensure endpoint always returns `{ success, error }` so UI shows correct message
- [ ] Run `npm run build` and basic curl test for `/api/contact`

