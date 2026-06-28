#!/usr/bin/env bash
# Render the three ad creatives to 1080×1080 PNGs via headless Chrome.
set -e
CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
SRC="C:/projects/acs/saga-bulk-reporter/brand/_src"
ADS="C:/projects/acs/saga-bulk-reporter/brand/ads"
mkdir -p "$ADS"

shot () { # name outname
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --window-size=1080,1080 --screenshot="$ADS/$2" "file:///$SRC/$1" >/dev/null 2>&1
  echo "rendered $ADS/$2"
}

shot ad-inchidere.html   ad-inchidere.png
shot ad-sinteza.html     ad-sinteza.png
shot ad-salarizare.html  ad-salarizare.png
echo "ads rendered"
