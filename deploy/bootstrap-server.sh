#!/usr/bin/env bash
# Run as root from a directory containing the scripts and deploy_key.pub.
set -euo pipefail
base=/var/www/portfolio.bo-design.info
deploy_user=portfolio-deploy
test "$(id -u)" = 0
test -L "$base/current"
test -f deploy_key.pub
if ! id "$deploy_user" >/dev/null 2>&1; then
    useradd --system --create-home --home-dir /home/portfolio-deploy --shell /bin/bash "$deploy_user"
fi
test "$(getent passwd "$deploy_user" | cut -d: -f6)" = /home/portfolio-deploy
install -d -o root -g root -m 0755 /usr/local/libexec/portfolio-deploy
install -o root -g root -m 0755 server_deploy.py /usr/local/libexec/portfolio-deploy/server_deploy.py
install -o root -g root -m 0644 validate_site.py /usr/local/libexec/portfolio-deploy/validate_site.py
chown root:root /home/portfolio-deploy
chmod 0755 /home/portfolio-deploy
install -d -o root -g root -m 0755 /home/portfolio-deploy/.ssh
printf 'restrict,command="/usr/bin/python3 /usr/local/libexec/portfolio-deploy/server_deploy.py" %s\n' \
    "$(cat deploy_key.pub)" > /home/portfolio-deploy/.ssh/authorized_keys
chown root:root /home/portfolio-deploy/.ssh/authorized_keys
chmod 0644 /home/portfolio-deploy/.ssh/authorized_keys
# Grant this user only the portfolio release directories. Existing releases,
# ACME files, Nginx, and the second project retain their current ownership.
chown "$deploy_user:$deploy_user" "$base" "$base/releases"
chmod 0755 "$base" "$base/releases"
nginx -t
echo 'Portfolio deployment user and forced SSH command installed.'
