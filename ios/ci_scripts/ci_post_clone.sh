#!/bin/sh
# ci_post_clone.sh — Xcode Cloud post-clone for IronCommand (React Native / bare workflow)
set -e

echo "=== [Xcode Cloud] IronCommand: setting up React Native ==="

brew install node || true
brew install cocoapods || true
export PATH="/opt/homebrew/opt/node/bin:$PATH"

cd "$CI_WORKSPACE"
npm ci || npm install

# Native iOS project is already committed — just install pods
cd ios && pod install --repo-update

echo "=== [Xcode Cloud] IronCommand: post-clone complete ==="
