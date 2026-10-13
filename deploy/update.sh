#!/bin/sh
# Pull the latest code, rebuild, and restart. Requests may fail briefly while the build runs.
set -eu
cd "$(dirname "$0")/.."
git pull --ff-only
npm ci
npm run build
sudo systemctl restart saff
