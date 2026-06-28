#!/usr/bin/env bash
# Render each HTML canvas to a pixel-exact PNG via headless Chrome.
set -e
CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
SRC="C:/projects/acs/saga-bulk-reporter/brand/_src"
FB="C:/projects/acs/saga-bulk-reporter/brand/facebook"
LOGO="C:/projects/acs/saga-bulk-reporter/brand/logo"
IMG="C:/projects/acs/saga-bulk-reporter/images"

shot () { # name  w  h  outpath  [transparent]
  local name="$1" w="$2" h="$3" out="$4" tp="$5"
  local bg=""
  [ "$tp" = "tp" ] && bg="--default-background-color=00000000"
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    $bg --window-size="$w,$h" --screenshot="$out" "file:///$SRC/$name" >/dev/null 2>&1
  echo "rendered $out"
}

shot profile.html          1024 1024 "$FB/profile.png"
shot cover.html            1640 624  "$FB/cover.png"
shot og.html               1200 630  "$FB/og-image.png"
shot post-announcement.html 1080 1080 "$FB/post-announcement.png"
shot post-feature.html     1080 1080 "$FB/post-feature.png"
shot logo-mark.html        1024 1024 "$LOGO/logo-mark.png" tp
shot logo-mark-white.html  1024 1024 "$LOGO/logo-mark-white.png" tp
cp "$FB/og-image.png" "$IMG/og-image.png"
echo "all rendered"
