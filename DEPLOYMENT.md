# Portfolio production deployment

URL: https://portfolio.bo-design.info/

SSH: `ssh root@46.225.53.242`

The website is static. Only `site/` is published; no build or application service is needed. The repository is https://github.com/Geokerzman/Portfolio-Onofrei; its production branch is `master`. GitHub Actions uploads releases over SSH. The server does not pull from GitHub and needs no GitHub Deploy key.

## Server paths

- Releases: `/var/www/portfolio.bo-design.info/releases/`
- Active release: `/var/www/portfolio.bo-design.info/current` (symlink)
- ACME webroot: `/var/www/portfolio.bo-design.info/acme/`
- Site configuration: `/etc/nginx/sites-available/portfolio.bo-design.info`, symlinked in `sites-enabled`
- Anonymized log format: `/etc/nginx/conf.d/portfolio-privacy.conf`
- Access logs: `/var/log/portfolio/access.log`; daily rotation with seven-day maximum age, configured in `/etc/logrotate.d/portfolio`
- Site error logs are disabled to avoid retaining client IP addresses.
- Certificate: `/etc/letsencrypt/live/portfolio.bo-design.info/`; Certbot webroot renewal uses the existing renewal timer.
- Certificate deployment hook: `/etc/letsencrypt/renewal-hooks/deploy/portfolio-reload-nginx`, from `deploy/renew-hook.sh`, validates and reloads Nginx after this certificate renews.
- Initial deployment backup and checksums: `/root/portfolio-deploy-backups/`

Configuration templates are in `deploy/`. The existing `bo-design.info` configuration and document root are managed separately and must be preserved.

## GitHub Actions CI/CD

Workflow: `.github/workflows/portfolio.yml`.

- Pull requests to `master`: validate local HTML/CSS/translated JS asset references, check JavaScript syntax, and test deployment safeguards. No server access or secrets are used.
- Push to `master`: run the same checks, then publish `site/` to production. Manual runs are available under Actions → Portfolio CI/CD → Run workflow (select `master`).
- Production deployments are serialized; an active deployment is not cancelled by a newer push.
- The GitHub environment is `portfolio-production`; it records the deployment URL and status.

Required repository secret: `PORTFOLIO_DEPLOY_SSH_KEY` (the dedicated **private** Ed25519 key). This is an Actions secret, not a Deploy key. Repository settings: https://github.com/Geokerzman/Portfolio-Onofrei/settings/secrets/actions . No additional variables are required.

The initial local key is in the ignored, mode-0700 `.deploy-secrets/` directory. Its fingerprint is `SHA256:NZ3g+o6VCm7JbbQ91PHKb2WRmRXNA86PkVv2vsUDqv8`. Do not commit the private key. For replacement, generate a new dedicated key, replace the public key in `/home/portfolio-deploy/.ssh/authorized_keys` (preserving the forced-command restrictions), then update the GitHub secret.

Server configuration:

- User: `portfolio-deploy`, with no sudo access. It owns only the portfolio base and release directories; existing release files and ACME files retain their ownership.
- Root-owned SSH authorization permits only `deploy <sha>-<run>-<attempt>` and `rollback <release>`. Shell access, port forwarding, agent forwarding, and PTYs are disabled for this key.
- Root-owned command: `/usr/local/libexec/portfolio-deploy/server_deploy.py`, with `validate_site.py` alongside it. Changes to these files require installation by an administrator; ordinary content deployments never replace them.
- `deploy/known_hosts` pins the server's verified Ed25519 host key. A server rebuild requires verifying and updating this public key.
- Uploads go to a new staging directory. The command rejects traversal paths, links, special files, hidden entries, duplicate entries, more than 10,000 entries, and unpacked content over 256 MiB. It validates references before switching `current` atomically.
- HTTPS checks compare the served pages, CSS, JavaScript, a font, an image, and both CV PDFs against the release. A failure restores the previous symlink. No Nginx reload is needed for content updates.
- Five CI releases are retained. The current release and original `20261001T184218Z` deployment are preserved.

The second site (`bo-design.info`, `/var/www/bo-design`, repository checkout `/root/bo-design`) is managed separately. This pipeline has no permission to write its files, Nginx configuration, or certificates.

To reproduce the initial server installation, copy `deploy/server_deploy.py`, `deploy/validate_site.py`, `deploy/bootstrap-server.sh`, and the dedicated public key named `deploy_key.pub` into a root-only temporary directory on the server, then run `bash bootstrap-server.sh` there as root. The script is specific to the existing portfolio paths and replaces only this deployment user's authorized key.

For configuration updates, run `nginx -t` before `systemctl reload nginx`. Reloading preserves existing connections.

## Rollback

The simplest rollback is to revert the content commit in GitHub and push to `master`; CI/CD publishes a new verified release.

An administrator can list releases with `ssh root@46.225.53.242 'ls -lt /var/www/portfolio.bo-design.info/releases'`. To activate an existing CI release using the dedicated key from this checkout:

```bash
ssh -T -i .deploy-secrets/portfolio_actions_ed25519 \
  -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes \
  -o UserKnownHostsFile=deploy/known_hosts \
  portfolio-deploy@46.225.53.242 'rollback FULL_SHA-RUN_ID-ATTEMPT'
```

This runs the same HTTPS verification and restores the preceding release if verification fails. For the original timestamped release, an administrator can create `current.next` pointing to it and run `mv -Tf current.next current` in the site's base directory.

## Validation

Use `curl -I https://portfolio.bo-design.info/`, `curl -I http://portfolio.bo-design.info/` (301 to HTTPS), `nginx -t`, and `certbot renew --dry-run --cert-name portfolio.bo-design.info`.

Local CI checks:

```bash
python3 deploy/validate_site.py site
find site -type f -name '*.js' -exec node --check '{}' \;
python3 -m unittest discover -s deploy/tests -v
```
