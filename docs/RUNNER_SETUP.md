# Self-Hosted Runner Setup Guide

This guide helps you set up a self-hosted macOS runner for building Iron Command iOS apps.

## Prerequisites

- **macOS**: 13.0 (Ventura) or later
- **Xcode**: 15.0 or later
- **Storage**: At least 50GB free space
- **RAM**: 16GB minimum (32GB recommended)
- **Network**: Stable internet connection

## Installation Steps

### 1. Install Required Software

```bash
# Install Homebrew (if not already installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js via Homebrew
brew install node@20

# Install Ruby (for CocoaPods and Fastlane)
brew install ruby@3.2

# Install CocoaPods
sudo gem install cocoapods

# Install Fastlane
sudo gem install fastlane

# Install xcbeautify (for prettier build logs)
brew install xcbeautify
```

### 2. Install Xcode and Command Line Tools

```bash
# Install Xcode from App Store, then:
xcode-select --install

# Accept Xcode license
sudo xcodebuild -license accept

# Install required simulators
xcodebuild -downloadPlatform iOS
```

### 3. Configure GitHub Runner

```bash
# Create a directory for the runner
mkdir -p ~/actions-runner && cd ~/actions-runner

# Download the latest runner package
curl -o actions-runner-osx-arm64-2.311.0.tar.gz -L \
  https://github.com/actions/runner/releases/download/v2.311.0/actions-runner-osx-arm64-2.311.0.tar.gz

# Extract the installer
tar xzf ./actions-runner-osx-arm64-2.311.0.tar.gz

# Configure the runner
# Get your token from: https://github.com/YOUR_ORG/iron-command-ios/settings/actions/runners/new
./config.sh --url https://github.com/YOUR_ORG/iron-command-ios \
  --token YOUR_REGISTRATION_TOKEN \
  --labels macOS,ios-builder,self-hosted

# Install as a service (runs on startup)
./svc.sh install
./svc.sh start
```

### 4. Configure Code Signing

```bash
# Create a keychain for CI builds
security create-keychain -p "YOUR_KEYCHAIN_PASSWORD" ci.keychain
security set-keychain-settings -lut 21600 ci.keychain
security unlock-keychain -p "YOUR_KEYCHAIN_PASSWORD" ci.keychain

# Import your Apple Distribution certificate
security import /path/to/certificate.p12 \
  -P "YOUR_P12_PASSWORD" \
  -A \
  -t cert \
  -f pkcs12 \
  -k ci.keychain

# Set the default keychain
security list-keychain -d user -s ci.keychain login.keychain
```

### 5. Set Up Environment Variables

Create a `.env` file in the runner directory:

```bash
# ~/actions-runner/.env
export FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD="your-app-specific-password"
export MATCH_PASSWORD="your-match-password"
export FASTLANE_SESSION="your-fastlane-session"
```

### 6. Configure Fastlane Match

```bash
cd ~/iron-command-ios

# Initialize match (do this once)
fastlane match init

# Download certificates
fastlane match appstore
fastlane match development
```

## GitHub Secrets Configuration

Add these secrets to your GitHub repository:
Settings → Secrets and variables → Actions

### Required Secrets

1. **BUILD_CERTIFICATE_BASE64**
   ```bash
   base64 -i certificate.p12 | pbcopy
   ```

2. **P12_PASSWORD**
   - Your certificate password

3. **KEYCHAIN_PASSWORD**
   - CI keychain password (from step 4)

4. **PROVISIONING_PROFILE_BASE64**
   ```bash
   base64 -i profile.mobileprovision | pbcopy
   ```

5. **EXPORT_OPTIONS_PLIST**
   ```bash
   base64 -i ExportOptions.plist | pbcopy
   ```

6. **APP_STORE_CONNECT_API_KEY_ID**
   - From App Store Connect → Users and Access → Keys

7. **APP_STORE_CONNECT_API_ISSUER_ID**
   - From App Store Connect → Users and Access → Keys

8. **APP_STORE_CONNECT_API_KEY_CONTENT**
   ```bash
   base64 -i AuthKey_XXXXXXXXXX.p8 | pbcopy
   ```

9. **MATCH_PASSWORD**
   - Password for Fastlane Match

10. **FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD**
    - Generate from appleid.apple.com

11. **FASTLANE_SESSION**
    ```bash
    fastlane spaceauth -u your@email.com
    ```

## Maintenance

### Update Runner

```bash
cd ~/actions-runner
./svc.sh stop
./svc.sh uninstall
# Download new version and repeat installation
```

### Monitor Runner

```bash
# Check runner status
./svc.sh status

# View runner logs
tail -f ~/actions-runner/_diag/Runner_*.log
```

### Clean Build Artifacts

```bash
# Add to crontab for daily cleanup
0 2 * * * rm -rf ~/Library/Developer/Xcode/DerivedData/*
```

## Troubleshooting

### Runner Not Starting

```bash
# Check logs
cat ~/actions-runner/_diag/Runner_*.log

# Restart service
./svc.sh stop
./svc.sh start
```

### Code Signing Issues

```bash
# Verify certificates
security find-identity -v -p codesigning

# Unlock keychain
security unlock-keychain -p "PASSWORD" ci.keychain
```

### Disk Space Issues

```bash
# Clean Xcode derived data
rm -rf ~/Library/Developer/Xcode/DerivedData/*

# Clean npm cache
npm cache clean --force

# Clean CocoaPods cache
pod cache clean --all
```

## Security Best Practices

1. **Isolate the runner**: Use a dedicated Mac if possible
2. **Restrict access**: Limit who can trigger workflows
3. **Rotate secrets**: Regularly update certificates and API keys
4. **Monitor usage**: Review runner logs regularly
5. **Enable FileVault**: Encrypt the disk
6. **Auto-update**: Keep macOS and Xcode up to date

## Performance Optimization

```bash
# Increase file descriptor limit
ulimit -n 10240

# Disable Spotlight indexing for build directories
sudo mdutil -i off ~/Library/Developer/Xcode/DerivedData
```

## Labels for Workflows

When configuring the runner, use these labels:
- `self-hosted`
- `macOS`
- `ios-builder`
- `ARM64` (for M1/M2/M3 Macs)

These match the workflow configuration in `.github/workflows/self-hosted-runner.yml`.

---

**Need Help?** Open an issue or contact the DevOps team.
