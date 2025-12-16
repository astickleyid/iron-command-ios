# Contributing to Iron Command

Thank you for your interest in contributing to Iron Command! This document provides guidelines and instructions for contributing.

## 🎯 Project Vision

Iron Command is a hybrid RTS/FPS tactical military game that seamlessly transitions between Commander View (strategy) and Field Operative View (action). All contributions should enhance either the strategic depth or the moment-to-moment combat experience.

## 🚀 Getting Started

### 1. Fork & Clone

```bash
git clone https://github.com/YOUR_USERNAME/iron-command-ios.git
cd iron-command-ios
npm install
```

### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b bugfix/issue-number-description
```

Branch naming convention:
- `feature/` - New features
- `bugfix/` - Bug fixes
- `hotfix/` - Critical production fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation updates

### 3. Make Your Changes

Follow our coding standards (see below).

### 4. Test Your Changes

```bash
npm run lint
npm run type-check
npm test
```

### 5. Commit

Use conventional commits:

```bash
git commit -m "feat: add sniper scope zoom functionality"
git commit -m "fix: resolve FPS camera clipping through terrain"
git commit -m "refactor: optimize unit pathfinding algorithm"
git commit -m "docs: update README with new build instructions"
```

Commit types:
- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code refactoring
- `perf:` - Performance improvement
- `test:` - Adding tests
- `docs:` - Documentation
- `chore:` - Maintenance tasks
- `style:` - Code style changes (formatting)

### 6. Push & Create PR

```bash
git push origin your-branch-name
```

Then create a Pull Request on GitHub.

## 📋 Code Standards

### TypeScript

- **Always use explicit types** for function parameters and returns
- **Use interfaces** for component props and data structures
- **Prefer `type`** for unions and primitives
- **Enable strict mode** in tsconfig.json

```typescript
// ✅ Good
interface UnitProps {
  id: string;
  position: [number, number, number];
  color?: string;
}

export const Unit: React.FC<UnitProps> = ({ id, position, color }) => {
  // ...
}

// ❌ Avoid
export const Unit = (props: any) => {
  // ...
}
```

### Naming Conventions

- **Components**: PascalCase (`Unit.tsx`, `CommandCenter.tsx`)
- **Utilities**: camelCase (`assetFactory.ts`, `weaponSway.ts`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_POWER`, `DEFAULT_FOV`)
- **Store Actions**: camelCase verbs (`selectUnit`, `enterFPS`)

### File Organization

```
src/
├── components/       # React components
├── systems/          # Game systems
├── store/            # State management
├── assets/           # 3D models, textures, audio
├── config/           # Configuration
└── utils/            # Helper functions
```

### Performance

All changes must maintain performance targets:
- **60 FPS** on iPhone 12+
- **< 200 draw calls** in RTS mode
- **< 100k polygons** on screen
- **< 512MB** texture memory

### Comments

- **Use JSDoc** for all exported functions
- **Comment complex logic** (physics, ballistics, pathfinding)
- **NO comments** for self-explanatory code
- **Add TODO comments** with your GitHub username

```typescript
/**
 * Calculates bullet drop for projectile weapons using simplified ballistics.
 * @param velocity - Initial muzzle velocity (m/s)
 * @param distance - Target distance (m)
 * @returns Vertical offset in world units
 */
export const calculateBulletDrop = (velocity: number, distance: number): number => {
  const gravity = 9.81;
  const time = distance / velocity;
  return 0.5 * gravity * time * time;
};
```

## 🎮 Game Design Contributions

When proposing gameplay features, consider:

1. **Which mode does it affect?** RTS, FPS, or both?
2. **What phase?** Phase 1 (core), Phase 2 (VFX), Phase 3 (advanced FPS), Phase 4 (advanced gameplay)
3. **Performance impact?** Low, medium, or high?
4. **Visual consistency?** Does it fit the "toy soldier diorama" aesthetic?
5. **Power system?** How does it behave when power is insufficient?

See [docs/GAME_DESIGN.md](./docs/GAME_DESIGN.md) for full design reference.

## 🧪 Testing Requirements

### Unit Tests

Write tests for:
- Game logic (store actions, calculations)
- Utility functions
- Complex algorithms (pathfinding, ballistics)

```typescript
describe('calculateBulletDrop', () => {
  it('should calculate correct drop for 100m at 800m/s', () => {
    const drop = calculateBulletDrop(800, 100);
    expect(drop).toBeCloseTo(0.076, 3);
  });
});
```

### Integration Tests

Test:
- RTS ↔ FPS transitions
- Resource flow
- Unit AI behavior

### Performance Tests

Benchmark:
- Rendering performance
- Physics simulation
- Pathfinding algorithms

## 📝 Pull Request Guidelines

### PR Title

Use conventional commit format:
- `feat: add vehicle turret independent rotation`
- `fix: prevent camera clipping through terrain in FPS mode`

### PR Description

Include:
1. **What** - What changes were made?
2. **Why** - Why were these changes needed?
3. **How** - How do the changes work?
4. **Testing** - How did you test this?
5. **Screenshots/Video** - Visual proof for UI/gameplay changes
6. **Breaking Changes** - Any breaking changes?
7. **Related Issues** - Link to related issues

### Checklist

Before submitting PR:
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Tests added/updated
- [ ] All tests pass
- [ ] No linter errors
- [ ] Documentation updated
- [ ] No console.log statements (use console.warn/error if needed)

## 🔍 Review Process

1. **Automated checks** run (linting, tests, build)
2. **Maintainer review** - Code quality and design
3. **Testing** - Functional testing on iOS device
4. **Approval** - Minimum 1 approval required
5. **Merge** - Squash and merge to main

## 🐛 Bug Reports

Use the bug report template. Include:
- Device and iOS version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/video
- Performance metrics (FPS, memory)

## 💡 Feature Requests

Use the feature request template. Include:
- Problem description
- Proposed solution
- Game design impact
- Visual mockups (if applicable)
- Technical considerations

## ❓ Questions?

- **Game Design**: See [docs/GAME_DESIGN.md](./docs/GAME_DESIGN.md)
- **GitHub Copilot**: See [.github/copilot-instructions.md](.github/copilot-instructions.md)
- **Setup**: See [README.md](./README.md)
- **Issues**: Open a GitHub issue with the "question" label

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

**Thank you for contributing to Iron Command! 🎖️**
