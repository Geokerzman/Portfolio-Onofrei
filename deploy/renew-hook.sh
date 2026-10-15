#!/bin/sh
set -eu
if [ "${RENEWED_LINEAGE:-}" = /etc/letsencrypt/live/portfolio.bo-design.info ]; then
    /usr/sbin/nginx -t
    /usr/bin/systemctl reload nginx
fi
