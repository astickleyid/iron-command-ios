# Native iOS Project Setup

## Overview
This repository contains an **Expo/React Native** project with the native iOS project **committed to version control**.

## What Changed
The native iOS project has been generated using:
```bash
npx expo prebuild --platform ios
```

This creates the `ios/` directory which contains:
- `IronCommand.xcodeproj` - The Xcode project
- `Podfile` - CocoaPods dependencies configuration
- Native iOS app code and configuration

## Why Commit the Native Project?
The native iOS project is committed to enable:
1. **Self-hosted iOS builds** via GitHub Actions
2. **Direct Xcode development** without requiring `expo prebuild` on every clone
3. **Custom native code modifications** when needed

## Building the App

### Prerequisites
- **macOS** with Xcode installed
- **Node.js** >= 18.0.0
- **CocoaPods** installed (`sudo gem install cocoapods`)
- **npm** >= 9.0.0

### Setup Steps
1. Clone the repository
2. Install JavaScript dependencies:
   ```bash
   npm install
   ```

3. Install iOS native dependencies:
   ```bash
   cd ios && pod install && cd ..
   ```

4. Start the Metro bundler:
   ```bash
   npm start
   ```

5. Open the workspace in Xcode:
   ```bash
   open ios/IronCommand.xcworkspace
   ```

6. Build and run from Xcode, or use:
   ```bash
   npm run ios
   ```

## Workflows

### Self-Hosted iOS Build
The `.github/workflows/self-hosted-runner.yml` workflow expects:
- A self-hosted runner with the labels: `self-hosted`, `macOS`, `ios-builder`
- This runner must have Xcode, CocoaPods, and other iOS build tools installed

### Continuous Integration
The `.github/workflows/ci.yml` workflow runs on GitHub-hosted runners and performs:
- Code linting and formatting checks
- TypeScript type checking
- Unit tests
- Security audits

## Development
For rapid development, you can still use Expo Go:
```bash
npm start
```

Then scan the QR code with the Expo Go app on your iOS device.

## Important Notes
- The `ios/Pods/` directory is **NOT** committed (ignored by .gitignore)
- The `ios/Podfile.lock` is **NOT** committed (ignored by .gitignore)
- The `ios/*.xcworkspace` user data is **NOT** committed
- Run `pod install` after every clone/pull to generate these

## Asset Requirements
The project requires these assets in the `assets/` directory:
- `icon.png` - App icon (1024x1024)
- `splash.png` - Splash screen

These have been generated as placeholders and should be replaced with proper branded assets.
