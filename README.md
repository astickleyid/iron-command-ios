# IRON COMMAND

> **Hybrid RTS/FPS Tactical Military Game for iOS**  
> *"Command from Above. Fight from Below."*

## 🎮 Game Overview

**Iron Command** is a tactical strategy game featuring seamless scale transition between macro-management and micro-combat. Players establish a Forward Operating Base (FOB), extract resources, and deploy mechanized armies while having the unique ability to "possess" any unit for direct FPS control.

### Core Features
- **Battlefield Duality**: Seamlessly transition between RTS Commander View and FPS Field Operative View
- **Stylized Toy Soldier Aesthetic**: High-fidelity military diorama visual style
- **Industrial Military Theme**: Scorched desert terrain, concrete bunkers, and mechanized warfare
- **Direct Unit Control**: Possess any unit for precision aiming and tactical advantage

## 🏗️ Project Status

**Current Phase**: Phase 1 - Core Prototype  
**Platform**: iOS (React Native + Three.js via Expo)  
**Visual Style**: Tactical Triad (Tan, Olive Drab, Gunmetal Grey)

### Development Roadmap
- [x] Phase 1: Core RTS/FPS transition mechanics
- [ ] Phase 2: Animation & VFX system (kinetic combat feel)
- [ ] Phase 3: Advanced FPS mechanics (weapon systems, ADS, scopes)
- [ ] Phase 4: Vehicle control, cover system, ballistics

## 🚀 Quick Start

### Prerequisites
```bash
node >= 18.x
npm >= 9.x
Xcode >= 15.0 (for iOS builds)
CocoaPods (for iOS native dependencies)
```

### Installation
```bash
git clone https://github.com/YOUR_USERNAME/iron-command-ios.git
cd iron-command-ios
npm install

# Install iOS native dependencies
cd ios && pod install && cd ..
```

> 📝 **Note**: This repository includes the native iOS project. See [NATIVE_SETUP.md](./NATIVE_SETUP.md) for details.

### Development
```bash
# Start Expo development server
npm start

# Run on iOS simulator
npm run ios

# Run on physical iOS device
npm run ios --device
```

### Build & Deploy
```bash
# Build for TestFlight
npm run build:ios

# Submit to App Store
npm run submit:ios
```

## 📁 Project Structure

```
iron-command-ios/
├── .github/
│   ├── workflows/          # CI/CD automation
│   ├── copilot/           # GitHub Copilot instructions
│   └── ISSUE_TEMPLATE/    # Issue templates
├── src/
│   ├── components/        # React components (Units, Buildings, UI)
│   ├── game/             # Game logic & systems
│   ├── store/            # Zustand state management
│   ├── assets/           # 3D models, textures, audio
│   └── config/           # Game configuration
├── ios/                  # Native iOS project
├── docs/                 # Game design documentation
└── tests/               # Test suites
```

## 🎨 Visual Identity

### Tactical Triad Color Palette
- **Tan** (#d2b48c): Primary terrain and base color
- **Olive Drab** (#556b2f): Friendly units and foliage
- **Gunmetal Grey** (#2c3e50): Structures and heavy machinery
- **Alert Orange**: Hazards and enemy UI elements

### Typography
- **Headings**: 'Black Ops One'
- **Body**: 'Chakra Petch'

## 🛠️ Tech Stack

- **Framework**: React Native + Expo
- **3D Engine**: Three.js (@react-three/fiber)
- **State Management**: Zustand
- **Build System**: EAS (Expo Application Services)
- **CI/CD**: GitHub Actions
- **Testing**: Jest + React Native Testing Library

## 📋 Game Design

See [GAME_DESIGN.md](./docs/GAME_DESIGN.md) for the complete design document including:
- Economy & Resources (Credits, Fuel, Power)
- Building Roster (Command Center, Oil Derricks, Heavy Factory)
- Unit Roster (Rifleman, Sniper, Heavy, Light Tank)
- FPS Mechanics (ADS, Scope Rendering, Vehicle Controls)

## 🤝 Contributing

This project uses GitHub Copilot for AI-assisted development. See [.github/copilot/instructions.md](.github/copilot/instructions.md) for coding guidelines and patterns.

## 📄 License

Copyright © 2024 Iron Command. All rights reserved.

## 🎯 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow functional React patterns
- Zustand for global state, local state for UI
- Comment only complex game logic

### Performance Targets
- 60 FPS on iPhone 12 and newer
- < 3 second cold start
- < 200MB memory footprint

### Testing Requirements
- Unit tests for game logic
- Integration tests for RTS/FPS transitions
- Performance benchmarks for rendering

---

**Built with ⚙️ by the Iron Command Team**
