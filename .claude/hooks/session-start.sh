#!/bin/bash
# SessionStart hook: install dev dependencies so linters work in the session.
set -euo pipefail

# Only run in Claude Code on the web (remote) environment.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-.}"

# Install dev dependencies (eslint, stylelint, htmlhint).
# Idempotent and benefits from container caching after first run.
npm install --no-audit --no-fund
