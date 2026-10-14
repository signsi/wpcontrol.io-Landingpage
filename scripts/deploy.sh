#!/bin/sh
# Website auf das Live-Hosting bringen: bauen, Live-Stand sichern, abgleichen,
# prüfen.
#
#   npm run deploy               bauen und hochladen
#   npm run deploy -- --dry-run  nur zeigen, was sich ändern würde
#
# Zugang steht in .env.deploy (nicht im Git), siehe .env.deploy.example.
set -eu

cd "$(dirname "$0")/.."

DRY_RUN=0
[ "${1:-}" = "--dry-run" ] && DRY_RUN=1

if [ ! -f .env.deploy ]; then
  echo "Fehlt: .env.deploy. Vorlage kopieren und ausfüllen:" >&2
  echo "  cp .env.deploy.example .env.deploy" >&2
  exit 1
fi
# shellcheck disable=SC1091
. ./.env.deploy
: "${DEPLOY_HOST:?DEPLOY_HOST fehlt in .env.deploy}"
: "${DEPLOY_PATH:?DEPLOY_PATH fehlt in .env.deploy}"
DEPLOY_PORT="${DEPLOY_PORT:-22}"
DEPLOY_URL="${DEPLOY_URL:-https://wporbit.ch}"
KEEP_BACKUPS="${KEEP_BACKUPS:-10}"
SSH="ssh -p $DEPLOY_PORT -o BatchMode=yes -o ConnectTimeout=15"

if [ -n "$(git status --porcelain -- src public index.html)" ]; then
  echo "Hinweis: Es gibt nicht committete Änderungen in src/, public/ oder index.html." >&2
fi

echo "› Bauen"
BUILD_LOG=$(mktemp)
if ! npm run build >"$BUILD_LOG" 2>&1; then
  cat "$BUILD_LOG" >&2
  rm -f "$BUILD_LOG"
  echo "Abbruch: Der Build ist fehlgeschlagen, nichts wurde hochgeladen." >&2
  exit 1
fi
rm -f "$BUILD_LOG"

# Nie einen halben oder leeren Build mit --delete hochladen.
for f in dist/index.html dist/.htaccess dist/404.html; do
  [ -s "$f" ] || { echo "Abbruch: $f fehlt, der Build ist unvollständig." >&2; exit 1; }
done

RSYNC_OPTS="-a --delete --checksum --exclude=.vite --itemize-changes"

if [ "$DRY_RUN" -eq 1 ]; then
  echo "› Probelauf (nichts wird geändert)"
  rsync $RSYNC_OPTS -n -e "$SSH" dist/ "$DEPLOY_HOST:$DEPLOY_PATH/" | grep -E '^(\*deleting|<f)' || echo "  keine Änderungen"
  exit 0
fi

echo "› Live-Stand sichern"
STAMP=$(date +%Y%m%d-%H%M%S)
NAME=$(basename "$DEPLOY_PATH")
$SSH "$DEPLOY_HOST" "mkdir -p ~/backups \
  && tar czf ~/backups/$NAME-$STAMP.tar.gz -C \"\$(dirname $DEPLOY_PATH)\" $NAME \
  && ls -1t ~/backups/$NAME-*.tar.gz | tail -n +$((KEEP_BACKUPS + 1)) | xargs -r rm -f"
echo "  ~/backups/$NAME-$STAMP.tar.gz (die letzten $KEEP_BACKUPS bleiben)"

echo "› Hochladen"
LOG=$(mktemp)
rsync $RSYNC_OPTS -e "$SSH" dist/ "$DEPLOY_HOST:$DEPLOY_PATH/" >"$LOG"
echo "  $(grep -c '^<f' "$LOG" || true) Dateien übertragen, $(grep -c '^\*deleting' "$LOG" || true) gelöscht"
rm -f "$LOG"

echo "› Prüfen"
# Mit Browser-Kennung: das Hosting weist Anfragen ohne ab.
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 15_0) AppleWebKit/537.36 Chrome/141.0 Safari/537.36'
FAILED=0
for path in / /cloud /preise /kontakt /anleitungen /blog /datenschutz; do
  code=$(curl -s -o /dev/null -A "$UA" -w '%{http_code}' "$DEPLOY_URL$path")
  if [ "$code" = "200" ]; then
    printf '  ok   %s\n' "$path"
  else
    printf '  FEHLER %s → %s\n' "$path" "$code"
    FAILED=1
  fi
done

if [ "$FAILED" -ne 0 ]; then
  echo "Nicht alle Seiten antworten. Zurück auf den letzten Stand:" >&2
  echo "  $SSH $DEPLOY_HOST 'tar xzf ~/backups/$NAME-$STAMP.tar.gz -C \"\$(dirname $DEPLOY_PATH)\"'" >&2
  exit 1
fi
echo "✓ Live: $DEPLOY_URL"
