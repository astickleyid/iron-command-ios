# Iron Command - Setup & Next Steps

## ✅ Repository Created Successfully!

Your Iron Command iOS game repository is now fully set up with:

### 📦 What's Included

#### ✅ Core Game Files
- **Phase 1 Prototype**: RTS/FPS dual-mode mechanics
- **State Management**: Zustand store with game modes
- **3D Components**: Unit component with possession system
- **Camera System**: Orbit controls (RTS) and pointer lock (FPS)
- **Styling**: Military tactical color palette

#### ✅ GitHub Automation
- **CI/CD Workflows**: Automated testing, linting, building
- **iOS Build Pipeline**: TestFlight deployment workflow
- **Self-Hosted Runner**: Configuration for Mac-based builds
- **Release Management**: Automated changelog and releases
- **Code Quality**: ESLint, Prettier, TypeScript checks

#### ✅ Developer Tools
- **GitHub Copilot Instructions**: AI coding guidelines
- **Issue Templates**: Bug reports, features, performance
- **Contributing Guide**: Detailed contribution workflow
- **Documentation**: Game design doc, runner setup guide

#### ✅ Configuration
- TypeScript with strict mode
- ESLint + Prettier
- Git hooks ready
- Environment setup

## 🚀 Next Steps

### 1. Push to GitHub

```bash
cd /Users/austinstickley/iron-command-ios

# Create GitHub repository (if not done)
gh repo create iron-command-ios --public --source=. --remote=origin

# Or add existing remote
git remote add origin https://github.com/YOUR_USERNAME/iron-command-ios.git

# Push code
git push -u origin main
```

### 2. Configure GitHub Secrets

Go to: `Settings → Secrets and variables → Actions`

Add these required secrets for iOS builds:
- `BUILD_CERTIFICATE_BASE64`
- `P12_PASSWORD`
- `KEYCHAIN_PASSWORD`
- `PROVISIONING_PROFILE_BASE64`
- `EXPORT_OPTIONS_PLIST`
- `APP_STORE_CONNECT_API_KEY_ID`
- `APP_STORE_CONNECT_API_ISSUER_ID`
- `APP_STORE_CONNECT_API_KEY_CONTENT`

See `docs/RUNNER_SETUP.md` for detailed instructions.

### 3. Install Dependencies

```bash
npm install
```

### 4. Set Up iOS Development

```bash
# Install CocoaPods dependencies
cd ios
pod install
cd ..

# Run on simulator
npm run ios
```

### 5. Enable GitHub Actions

1. Go to your repo → `Actions` tab
2. Enable workflows
3. Workflows will run on next push

### 6. Set Up Self-Hosted Runner (Optional)

For faster builds on your own Mac:

```bash
# Follow the detailed guide
cat docs/RUNNER_SETUP.md
```

## 🎮 Development Workflow

### Daily Development

```bash
# Start development
npm start

# Run on iOS
npm run ios

# Run tests
npm test

# Lint code
npm run lint:fix
```

### Before Committing

```bash
npm run lint
npm run type-check
npm test
```

### Creating Features

```bash
git checkout -b feature/your-feature
# Make changes
git add .
git commit -m "feat: your feature description"
git push origin feature/your-feature
# Create PR on GitHub
```

## 📁 File Structure Overview

```
iron-command-ios/
├── src/
│   ├── App.tsx                 # Main app component
│   ├── components/
│   │   ├── Unit.tsx            # Possessable unit
│   │   └── GameController.tsx  # Camera controller
│   ├── store/
│   │   └── gameStore.ts        # Game state
│   └── config/
│       └── constants.ts        # Colors, settings
├── .github/
│   ├── workflows/              # CI/CD pipelines
│   └── copilot-instructions.md # AI guidelines
├── docs/
│   ├── GAME_DESIGN.md          # Game design doc
│   └── RUNNER_SETUP.md         # Runner guide
└── [config files]
```

## 🔧 Common Tasks

### Add a New Unit Type

1. Update `src/config/constants.ts` with unit specs
2. Create component in `src/components/units/`
3. Add to game state if needed
4. Write tests

### Add New Building

1. Create building component
2. Add to building roster in constants
3. Implement resource generation logic
4. Test in RTS mode

### Implement FPS Weapon

1. Create weapon system in `src/systems/weapons/`
2. Add ADS (Aim Down Sights) logic
3. Implement recoil patterns
4. Add to Unit component

## 📚 Key Documentation

- **Game Design**: `docs/GAME_DESIGN.md`
- **Quick Reference**: `QUICK_REFERENCE.md`
- **Contributing**: `CONTRIBUTING.md`
- **README**: `README.md`

## 🎯 Phase 1 Goals (Current)

- [x] RTS/FPS camera transition
- [x] Unit selection and possession
- [x] Basic military styling
- [ ] WASD movement in FPS mode
- [ ] Raycasting for shooting
- [ ] Basic AI pathfinding
- [ ] Resource system

## 📈 Next Phases

**Phase 2**: Animation & VFX
- Particle effects (explosions, impacts)
- Tracers and projectiles
- Sound effects planning

**Phase 3**: Advanced FPS
- Weapon sway and bob
- ADS and scope rendering
- Recoil system
- HUD system

**Phase 4**: Advanced Gameplay
- Vehicle controls
- Cover system
- Ballistics physics
- AI improvements

## 🆘 Need Help?

- **Issues**: Create a GitHub issue
- **Questions**: Use GitHub Discussions
- **Copilot**: Check `.github/copilot-instructions.md`
- **Examples**: See source code in `src/`

## 🎖️ Ready to Code!

Your repository is production-ready with:
- ✅ Full CI/CD automation
- ✅ iOS deployment pipeline
- ✅ GitHub Copilot integration
- ✅ Comprehensive documentation
- ✅ Phase 1 prototype code

**Start developing now:**

```bash
npm start
```

Happy coding, Commander! 🎮⚔️
