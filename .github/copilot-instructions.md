# Pygame Tutorial Series - AI Agent Guide

## Project Overview
Educational Pygame tutorial series demonstrating 2D game development progression from basic mechanics to complete game with enemies, collision detection, and sound. Each file in `Game/` represents a standalone tutorial episode building upon previous concepts.

## Tutorial Progression Pattern
Files follow incremental learning structure (`Tutorial #3.py` → `Tutorial #10.py`):
- **#3**: Global variable approach with animation loops
- **#4**: Refactor to OOP with `player` class
- **#5**: Add projectile system with bullet list management
- **#6**: Introduce `enemy` class with path-based movement
- **#7**: Implement hitbox-based collision detection
- **#8-10**: Add health systems, scoring, sound effects, and background music

## Core Architecture Patterns

### Game Loop Structure (27 FPS standard)
```python
clock.tick(27)  # Fixed framerate across all tutorials
while run:
    # Event handling
    # Input processing (keys array)
    # Game logic updates
    # redrawGameWindow()
```

### Object-Oriented Design
- Classes use `object` base class explicitly (Python 2 style maintained for educational consistency)
- All game entities follow `__init__()` + `draw(win)` pattern
- `draw()` methods handle both rendering and hitbox updates (see Tutorial #7+)

### Animation System
- Walk animations use 9 frames (R1-R9.png, L1-L9.png) cycled at `walkCount//3`
- Enemy animations use 11 frames with same division logic
- `walkCount` resets at 27 (matching FPS) to sync animation timing
- `standing` flag determines whether to show walk cycle or static frame

### Sprite/Asset Loading
All assets loaded at module level (not in classes) for performance:
```python
walkRight = [pygame.image.load('R1.png'), ...]  # Global lists
```
Enemy class loads as class variables for shared access.

## Key Patterns & Conventions

### Hitbox Management (Tutorial #7+)
Hitboxes defined as tuples `(x_offset, y_offset, width, height)` and updated every frame in `draw()`:
```python
self.hitbox = (self.x + 17, self.y + 11, 29, 52)  # Player offsets
```
Collision uses AABB (axis-aligned bounding box) logic - see Tutorial #7 `goblin` vs `bullet` collision.

### Projectile System
- Max 5 bullets enforced: `if len(bullets) < 5`
- Bullets removed when off-screen using `bullets.pop(bullets.index(bullet))`
- Facing direction (`-1` or `1`) multiplied by velocity for left/right firing

### Jump Physics (parabolic arc)
```python
y -= (jumpCount ** 2) * 0.5 * neg  # Squared for acceleration curve
jumpCount: 10 → -10 then reset
```

### Movement Boundaries
Consistently check bounds: `x > vel` (left), `x < 500 - width - vel` (right)

## Sound Integration (Tutorial #9+)
```python
bulletSound = pygame.mixer.Sound('bullet.wav')  # Effects
pygame.mixer.music.load('music.mp3')  # Background
pygame.mixer.music.play(-1)  # Loop indefinitely
```

## Common Modifications
- Changing entity speed: Adjust `self.vel` in class `__init__`
- Adding animation frames: Update list length and modify `walkCount` threshold (27 for player, 33 for enemy)
- Adjusting hitboxes: Debug by uncommenting `pygame.draw.rect(win, (255,0,0), self.hitbox, 2)`
- Screen size: Change `pygame.display.set_mode((500,480))` + update boundary checks

## Running Tutorials
Each file is self-contained. Run with:
```bash
python3 "Game/Tutorial #X.py"
```
Requires asset files (R1-R9.png, L1-L9.png, bg.jpg, standing.png, etc.) in same directory as script.

## Educational Focus
Code prioritizes clarity over optimization - intentional design choices:
- Repetitive asset loading shows explicit resource management
- Global variables in early tutorials before OOP refactor
- Simple collision detection before advanced physics
- Inline event loops instead of abstraction
