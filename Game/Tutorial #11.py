import pygame
pygame.init()

win = pygame.display.set_mode((500,480))
pygame.display.set_caption("Enhanced Game - Tutorial #11")

walkRight = [pygame.image.load('R1.png'), pygame.image.load('R2.png'), pygame.image.load('R3.png'), pygame.image.load('R4.png'), pygame.image.load('R5.png'), pygame.image.load('R6.png'), pygame.image.load('R7.png'), pygame.image.load('R8.png'), pygame.image.load('R9.png')]
walkLeft = [pygame.image.load('L1.png'), pygame.image.load('L2.png'), pygame.image.load('L3.png'), pygame.image.load('L4.png'), pygame.image.load('L5.png'), pygame.image.load('L6.png'), pygame.image.load('L7.png'), pygame.image.load('L8.png'), pygame.image.load('L9.png')]
bg = pygame.image.load('bg.jpg')
char = pygame.image.load('standing.png')

clock = pygame.time.Clock()

bulletSound = pygame.mixer.Sound('bullet.wav')
hitSound = pygame.mixer.Sound('hit.wav')
music = pygame.mixer.music.load('music.mp3')
pygame.mixer.music.play(-1)

score = 0
level = 1
lives = 3
paused = False

class player(object):
    def __init__(self,x,y,width,height):
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        self.vel = 5
        self.isJump = False
        self.left = False
        self.right = False
        self.walkCount = 0
        self.jumpCount = 10
        self.standing = True
        self.hitbox = (self.x + 17, self.y + 11, 29, 52)

    def draw(self, win):
        if self.walkCount + 1 >= 27:
            self.walkCount = 0

        if not(self.standing):
            if self.left:
                win.blit(walkLeft[self.walkCount//3], (self.x,self.y))
                self.walkCount += 1
            elif self.right:
                win.blit(walkRight[self.walkCount//3], (self.x,self.y))
                self.walkCount +=1
        else:
            if self.right:
                win.blit(walkRight[0], (self.x, self.y))
            else:
                win.blit(walkLeft[0], (self.x, self.y))
        self.hitbox = (self.x + 17, self.y + 11, 29, 52)

    def hit(self):
        global lives
        lives -= 1
        self.isJump = False
        self.jumpCount = 10
        self.x = 100
        self.y = 410
        self.walkCount = 0
        font1 = pygame.font.SysFont('comicsans', 100)
        text = font1.render('-1 Life', 1, (255,0,0))
        win.blit(text, (250 - (text.get_width()/2),200))
        pygame.display.update()
        i = 0
        while i < 150:
            pygame.time.delay(10)
            i += 1
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    i = 151
                    pygame.quit()

class projectile(object):
    def __init__(self,x,y,radius,color,facing):
        self.x = x
        self.y = y
        self.radius = radius
        self.color = color
        self.facing = facing
        self.vel = 8 * facing

    def draw(self,win):
        pygame.draw.circle(win, self.color, (self.x,self.y), self.radius)

class enemy(object):
    walkRight = [pygame.image.load('R1E.png'), pygame.image.load('R2E.png'), pygame.image.load('R3E.png'), pygame.image.load('R4E.png'), pygame.image.load('R5E.png'), pygame.image.load('R6E.png'), pygame.image.load('R7E.png'), pygame.image.load('R8E.png'), pygame.image.load('R9E.png'), pygame.image.load('R10E.png'), pygame.image.load('R11E.png')]
    walkLeft = [pygame.image.load('L1E.png'), pygame.image.load('L2E.png'), pygame.image.load('L3E.png'), pygame.image.load('L4E.png'), pygame.image.load('L5E.png'), pygame.image.load('L6E.png'), pygame.image.load('L7E.png'), pygame.image.load('L8E.png'), pygame.image.load('L9E.png'), pygame.image.load('L10E.png'), pygame.image.load('L11E.png')]

    def __init__(self, x, y, width, height, end):
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        self.end = end
        self.path = [self.x, self.end]
        self.walkCount = 0
        self.vel = 3
        self.hitbox = (self.x + 17, self.y + 2, 31, 57)
        self.health = 10
        self.visible = True

    def draw(self,win):
        self.move()
        if self.visible:
            if self.walkCount + 1 >= 33:
                self.walkCount = 0

            if self.vel > 0:
                win.blit(self.walkRight[self.walkCount //3], (self.x, self.y))
                self.walkCount += 1
            else:
                win.blit(self.walkLeft[self.walkCount //3], (self.x, self.y))
                self.walkCount += 1

            pygame.draw.rect(win, (255,0,0), (self.hitbox[0], self.hitbox[1] - 20, 50, 10))
            pygame.draw.rect(win, (0,128,0), (self.hitbox[0], self.hitbox[1] - 20, 50 - (5 * (10 - self.health)), 10))
            self.hitbox = (self.x + 17, self.y + 2, 31, 57)

    def move(self):
        if self.vel > 0:
            if self.x + self.vel < self.path[1]:
                self.x += self.vel
            else:
                self.vel = self.vel * -1
                self.walkCount = 0
        else:
            if self.x - self.vel > self.path[0]:
                self.x += self.vel
            else:
                self.vel = self.vel * -1
                self.walkCount = 0

    def hit(self):
        if self.health > 0:
            self.health -= 1
        else:
            self.visible = False

def createEnemies(level):
    """Create enemies based on level"""
    enemies = []
    enemy_count = min(level + 1, 5)  # Max 5 enemies
    spacing = 400 // enemy_count
    for i in range(enemy_count):
        start_x = 50 + (i * spacing)
        end_x = min(start_x + 150, 450)
        enemies.append(enemy(start_x, 410, 64, 64, end_x))
    return enemies

def redrawGameWindow():
    win.blit(bg, (0,0))
    
    # Draw UI
    font = pygame.font.SysFont('comicsans', 30, True)
    score_text = font.render(f'Score: {score}', 1, (255,255,255))
    level_text = font.render(f'Level: {level}', 1, (255,255,255))
    lives_text = font.render(f'Lives: {lives}', 1, (255,255,255))
    
    win.blit(score_text, (10, 10))
    win.blit(level_text, (200, 10))
    win.blit(lives_text, (350, 10))
    
    # Draw game objects
    man.draw(win)
    for goblin in goblins:
        goblin.draw(win)
    for bullet in bullets:
        bullet.draw(win)
    
    # Draw pause overlay
    if paused:
        pause_font = pygame.font.SysFont('comicsans', 80)
        pause_text = pause_font.render('PAUSED', 1, (255,255,0))
        win.blit(pause_text, (250 - (pause_text.get_width()/2), 200))
    
    pygame.display.update()

def gameOver():
    """Display game over screen"""
    font1 = pygame.font.SysFont('comicsans', 100)
    font2 = pygame.font.SysFont('comicsans', 40)
    text1 = font1.render('GAME OVER', 1, (255,0,0))
    text2 = font2.render(f'Final Score: {score}', 1, (255,255,255))
    text3 = font2.render(f'Level Reached: {level}', 1, (255,255,255))
    
    win.blit(text1, (250 - (text1.get_width()/2), 150))
    win.blit(text2, (250 - (text2.get_width()/2), 270))
    win.blit(text3, (250 - (text3.get_width()/2), 320))
    pygame.display.update()
    
    pygame.time.delay(3000)

def nextLevel():
    """Advance to next level"""
    global level, goblins
    level += 1
    goblins = createEnemies(level)
    
    font1 = pygame.font.SysFont('comicsans', 80)
    text = font1.render(f'Level {level}!', 1, (0,255,0))
    win.blit(text, (250 - (text.get_width()/2), 200))
    pygame.display.update()
    pygame.time.delay(1500)

# Initialize game
font = pygame.font.SysFont('comicsans', 30, True)
man = player(200, 410, 64, 64)
goblins = createEnemies(level)
shootLoop = 0
bullets = []
run = True

# Main game loop
while run:
    clock.tick(27)

    if lives <= 0:
        gameOver()
        run = False
        continue

    # Check if level complete
    if all(not goblin.visible for goblin in goblins):
        nextLevel()

    if shootLoop > 0:
        shootLoop += 1
    if shootLoop > 3:
        shootLoop = 0
    
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            run = False
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_p:
                paused = not paused

    if not paused:
        # Check player-enemy collision
        for goblin in goblins:
            if goblin.visible:
                if man.hitbox[1] < goblin.hitbox[1] + goblin.hitbox[3] and man.hitbox[1] + man.hitbox[3] > goblin.hitbox[1]:
                    if man.hitbox[0] + man.hitbox[2] > goblin.hitbox[0] and man.hitbox[0] < goblin.hitbox[0] + goblin.hitbox[2]:
                        man.hit()
        
        # Check bullet-enemy collision
        for bullet in bullets:
            for goblin in goblins:
                if goblin.visible:
                    if bullet.y - bullet.radius < goblin.hitbox[1] + goblin.hitbox[3] and bullet.y + bullet.radius > goblin.hitbox[1]:
                        if bullet.x + bullet.radius > goblin.hitbox[0] and bullet.x - bullet.radius < goblin.hitbox[0] + goblin.hitbox[2]:
                            hitSound.play()
                            goblin.hit()
                            if not goblin.visible:
                                score += 10
                            bullets.pop(bullets.index(bullet))
                            break
                    
            if bullet.x < 500 and bullet.x > 0:
                bullet.x += bullet.vel
            else:
                bullets.pop(bullets.index(bullet))

        keys = pygame.key.get_pressed()

        if keys[pygame.K_SPACE] and shootLoop == 0:
            bulletSound.play()
            if man.left:
                facing = -1
            else:
                facing = 1
                
            if len(bullets) < 5:
                bullets.append(projectile(round(man.x + man.width //2), round(man.y + man.height//2), 6, (0,0,0), facing))

            shootLoop = 1

        if keys[pygame.K_LEFT] and man.x > man.vel:
            man.x -= man.vel
            man.left = True
            man.right = False
            man.standing = False
        elif keys[pygame.K_RIGHT] and man.x < 500 - man.width - man.vel:
            man.x += man.vel
            man.right = True
            man.left = False
            man.standing = False
        else:
            man.standing = True
            man.walkCount = 0
            
        if not(man.isJump):
            if keys[pygame.K_UP]:
                man.isJump = True
                man.right = False
                man.left = False
                man.walkCount = 0
        else:
            if man.jumpCount >= -10:
                neg = 1
                if man.jumpCount < 0:
                    neg = -1
                man.y -= (man.jumpCount ** 2) * 0.5 * neg
                man.jumpCount -= 1
            else:
                man.isJump = False
                man.jumpCount = 10
            
    redrawGameWindow()

pygame.quit()
