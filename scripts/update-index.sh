#!/bin/bash

INDEX_FILE="index.html"
TMP_FILE="${INDEX_FILE}.tmp"
UPDATED=false

# 最新コミットで変更されたファイル一覧を取得
CHANGED_FILES=$(git diff-tree --no-commit-id --name-only -r HEAD)

TIMESTAMP=$(date +%s)
MODIFIED=false

cp "$INDEX_FILE" "$TMP_FILE"

if echo "$CHANGED_FILES" | grep -q 'style\.css'; then
  echo "style.scssが更新されたためindex.htmlの時刻を書き換えます"
  sed -i -E "s|(style\.css\?v=)[0-9]+|\1${TIMESTAMP}|" "$TMP_FILE"
  MODIFIED=true
fi

if echo "$CHANGED_FILES" | grep -q 'dark-theme\.css'; then
  echo "dark-theme.scssが更新されたためindex.htmlの時刻を書き換えます"
  sed -i -E "s|(dark-theme.css\?v=)[0-9]+|\1${TIMESTAMP}|" "$TMP_FILE"
  MODIFIED=true
fi

if echo "$CHANGED_FILES" | grep -q 'script\.js'; then
  echo "script.jsが更新されたためindex.htmlの時刻を書き換えます"
  sed -i -E "s|(script\.js\?v=)[0-9]+|\1${TIMESTAMP}|" "$TMP_FILE"
  MODIFIED=true
fi

# ファイルに変更があれば上書きして add
if [ "$MODIFIED" = true ]; then
  mv "$TMP_FILE" "$INDEX_FILE"
  git add "$INDEX_FILE"
  echo "updated index.html"
else
  rm "$TMP_FILE"
  echo "no change"
fi