#!/bin/sh
# ci_post_clone.sh — Xcode Cloud post-clone for IronCommand (React Native / Expo)
set -e

echo "=== [Xcode Cloud] IronCommand: setting up React Native ==="

brew install node || true
brew install cocoapods || true
export PATH="/opt/homebrew/opt/node/bin:$PATH"

cd "$CI_WORKSPACE"
npm ci || npm install

# Expo prebuild generates the native iOS project if using managed workflow
if [ -f "app.json" ] || [ -f "app.config.js" ]; then
  npx expo prebuild --platform ios --no-install || true
fi

# Install CocoaPods
cd ios && pod install --repo-update

echo "=== [Xcode Cloud] IronCommand: post-clone complete ==="
