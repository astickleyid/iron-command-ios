# Iron Command - Quick Reference

## 🚀 Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on physical device
npm run ios --device

# Linting & Type Checking
npm run lint              # Run ESLint
npm run lint:fix          # Auto-fix linting issues
npm run type-check        # TypeScript compilation check
npm run format            # Format code with Prettier
npm run format:check      # Check formatting

# Testing
npm test                  # Run all tests
npm run test:watch        # Watch mode
npm run test:unit         # Unit tests only
npm run test:integration  # Integration tests only
npm run test:performance  # Performance benchmarks

# Building
npm run build:ios         # Build for TestFlight (production)
npm run build:ios:preview # Build preview
npm run submit:ios        # Submit to App Store

# Analysis
npm run analyze:bundle    # Analyze bundle size
```

## 📂 Project Structure

```
iron-command-ios/
├── .github/
│   ├── workflows/              # CI/CD pipelines
│   │   ├── ci.yml             # Continuous Integration
│   │   ├── ios-build.yml      # iOS build & TestFlight
│   │   ├── self-hosted-runner.yml  # Self-hosted Mac builds
│   │   └── release.yml        # Release management
│   ├── copilot-instructions.md # AI coding guidelines
│   └── ISSUE_TEMPLATE/         # Issue templates
├── src/
│   ├── components/             # React components
│   │   ├── Unit.tsx           # Possessable unit component
│   │   └── GameController.tsx # Camera & input controller
│   ├── store/
│   │   └── gameStore.ts       # Zustand state management
│   ├── config/
│   │   └── constants.ts       # Game constants & colors
│   ├── systems/               # Game systems (future)
│   ├── assets/                # 3D models, textures, audio
│   └── utils/                 # Helper functions
├── docs/
│   ├── GAME_DESIGN.md         # Complete game design doc
│   └── RUNNER_SETUP.md        # Self-hosted runner guide
├── ios/                       # Native iOS project
└── tests/                     # Test suites
```

## 🎨 Color Palette (Tactical Triad)

```typescript
import { COLORS } from './src/config/constants';

COLORS.TAN           // #d2b48c - Terrain, selection
COLORS.OLIVE_DRAB    // #556b2f - Friendly units
COLORS.GUNMETAL_GREY // #2c3e50 - Structures, weapons
COLORS.ALERT_ORANGE  // #ff4500 - Hazards, enemies
COLORS.COLD_BLUE     // #b0c4de - Ambient light
COLORS.WARM_SUN      // #ffd700 - Directional light
```

## 🎮 Game Modes

### RTS Mode (Commander View)
- High-angle orbit camera
- Select and command units
- Build structures
- Manage resources

### FPS Mode (Field Operative View)
- First-person perspective
- Direct unit control
- Enhanced accuracy
- Manual aiming

**Toggle**: Click unit → "POSSESS UNIT" button  
**Exit**: Press `ESC`

## 🔧 Configuration Files

### `.eslintrc.js`
- TypeScript + React linting
- No unused vars (warn)
- No console.log (warn)
- Max depth: 3 levels
- Complexity: 10

### `.prettierrc`
- Single quotes
- 2 space indentation
- 100 character line width
- Trailing commas (ES5)

### `tsconfig.json`
- Strict mode enabled
- Target: ES2021
- Module: ESNext
- JSX: react-native

## 🚢 Deployment

### GitHub Actions (Automated)

**On Push to `main`**:
1. Lint & type check
2. Run tests
3. Build iOS app
4. Upload to TestFlight
5. Create release notes

**On Tag `v*.*.*`**:
1. Full release build
2. Generate changelog
3. Upload IPA to GitHub Releases
4. Deploy to App Store

### Manual Deployment

```bash
# Build locally
cd ios
fastlane beta

# Or use EAS
npm run build:ios
npm run submit:ios
```

## 🔐 Required Secrets

Add these to GitHub → Settings → Secrets:

```
BUILD_CERTIFICATE_BASE64
P12_PASSWORD
KEYCHAIN_PASSWORD
PROVISIONING_PROFILE_BASE64
EXPORT_OPTIONS_PLIST
APP_STORE_CONNECT_API_KEY_ID
APP_STORE_CONNECT_API_ISSUER_ID
APP_STORE_CONNECT_API_KEY_CONTENT
MATCH_PASSWORD
FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD
FASTLANE_SESSION
CODECOV_TOKEN (optional)
SNYK_TOKEN (optional)
SLACK_WEBHOOK (optional)
DISCORD_WEBHOOK (optional)
```

## 🎯 Performance Targets

- **Frame Rate**: 60 FPS (iPhone 12+)
- **Draw Calls**: < 200 (RTS mode)
- **Polygons**: < 100k on screen
- **Memory**: < 512MB textures
- **Cold Start**: < 3 seconds
- **Footprint**: < 200MB RAM

## 📝 Git Workflow

### Branch Naming
- `feature/weapon-system`
- `bugfix/camera-clipping`
- `hotfix/critical-crash`
- `refactor/pathfinding`
- `docs/api-documentation`

### Commit Messages
```bash
feat: add sniper scope zoom
fix: resolve terrain clipping
refactor: optimize unit AI
perf: improve render batching
test: add ballistics tests
docs: update README
chore: bump dependencies
```

## 🧪 Testing

### Unit Tests
```typescript
describe('gameStore', () => {
  it('should enter FPS mode', () => {
    const { enterFPS, mode } = useGameStore.getState();
    enterFPS();
    expect(mode).toBe('FPS');
  });
});
```

### Integration Tests
- RTS ↔ FPS transitions
- Resource flow
- AI pathfinding

### Performance Tests
```bash
npm run test:performance
```

## 🐛 Debugging

### iOS Simulator
```bash
# View logs
xcrun simctl spawn booted log stream --predicate 'processImagePath endswith "IronCommand"'

# Reset simulator
xcrun simctl erase all
```

### React Native Debugger
```bash
# Enable remote debugging
Press `d` in Metro bundler
Select "Debug"
```

### Xcode Instruments
1. Open Xcode
2. Product → Profile
3. Choose Instruments template
4. Analyze performance

## 📚 Resources

- **Three.js Docs**: https://threejs.org/docs/
- **React Three Fiber**: https://docs.pmnd.rs/react-three-fiber
- **Zustand**: https://docs.pmnd.rs/zustand
- **Expo**: https://docs.expo.dev/
- **Fastlane**: https://docs.fastlane.tools/

## 🆘 Troubleshooting

### Build Fails
```bash
# Clean and rebuild
cd ios
pod deintegrate
pod install
```

### Metro Bundler Issues
```bash
# Clear cache
npm start -- --reset-cache
```

### Type Errors
```bash
# Regenerate types
npm run type-check
```

## 🤝 Contributing

1. Fork the repo
2. Create feature branch
3. Make changes
4. Run tests
5. Create PR

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/iron-command-ios/issues)
- **Discussions**: [GitHub Discussions](https://github.com/YOUR_USERNAME/iron-command-ios/discussions)
- **Documentation**: [docs/](./docs/)

---

**Version**: 0.1.0 (Phase 1 Prototype)  
**Last Updated**: December 2024
