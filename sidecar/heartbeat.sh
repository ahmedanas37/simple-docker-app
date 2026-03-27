#!/bin/sh

set -eu

shared_dir="/shared"
interval="${INTERVAL_SECONDS:-5}"
sidecar_name="${SIDECAR_NAME:-heartbeat-sidecar}"
sidecar_status="${SIDECAR_STATUS:-Running}"
heartbeat_count=0

mkdir -p "$shared_dir"

while true
do
  heartbeat_count=$((heartbeat_count + 1))
  timestamp="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"

  cat > "${shared_dir}/status.json" <<EOF
{
  "name": "${sidecar_name}",
  "status": "${sidecar_status}",
  "heartbeatCount": ${heartbeat_count},
  "updatedAt": "${timestamp}",
  "message": "Heartbeat written by the sidecar into the shared volume."
}
EOF

  printf '[%s] %s heartbeat %s\n' \
    "$timestamp" \
    "$sidecar_name" \
    "$heartbeat_count" >> "${shared_dir}/heartbeat.log"

  sleep "$interval"
done
