#!/bin/sh
# Runs the reminder worker once; cron calls this every minute.
# The secret goes to curl on stdin so it never appears in the process list.
set -eu
cd "$(dirname "$0")/.."
secret=${CRON_SECRET:-$(sed -n 's/^CRON_SECRET=//p' .env.local)}
printf 'header = "Authorization: Bearer %s"\n' "$secret" |
  curl -fsS -m 55 --config - "http://127.0.0.1:${SAFF_PORT:-3000}/api/jobs/reminders" >/dev/null
