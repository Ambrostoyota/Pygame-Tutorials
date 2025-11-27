const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;

// Game state
const players = {};
const enemies = {};
const bullets = {};
let nextEnemyId = 0;
let nextBulletId = 0;

// Game constants
const GAME_WIDTH = 500;
const GAME_HEIGHT = 480;
const ENEMY_RESPAWN_TIME = 5000;

// Serve static files
app.use(express.static('public'));

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`Player connected: ${socket.id}`);

  // Initialize new player
  players[socket.id] = {
    id: socket.id,
    x: 200,
    y: 410,
    width: 64,
    height: 64,
    vel: 5,
    left: false,
    right: false,
    isJump: false,
    jumpCount: 10,
    health: 100,
    score: 0,
    username: `Player${Object.keys(players).length}`
  };

  // Send current game state to new player
  socket.emit('init', {
    playerId: socket.id,
    players: players,
    enemies: enemies,
    bullets: bullets
  });

  // Broadcast new player to all other players
  socket.broadcast.emit('playerJoined', players[socket.id]);

  // Handle player movement
  socket.on('playerMove', (data) => {
    if (players[socket.id]) {
      players[socket.id].x = data.x;
      players[socket.id].y = data.y;
      players[socket.id].left = data.left;
      players[socket.id].right = data.right;
      players[socket.id].isJump = data.isJump;
      
      // Broadcast to all other players
      socket.broadcast.emit('playerMoved', {
        id: socket.id,
        ...data
      });
    }
  });

  // Handle shooting
  socket.on('shoot', (data) => {
    const bulletId = `bullet_${socket.id}_${nextBulletId++}`;
    bullets[bulletId] = {
      id: bulletId,
      x: data.x,
      y: data.y,
      facing: data.facing,
      vel: 8,
      ownerId: socket.id
    };

    // Broadcast to all players
    io.emit('bulletCreated', bullets[bulletId]);
  });

  // Handle bullet hit enemy
  socket.on('bulletHitEnemy', (data) => {
    if (enemies[data.enemyId]) {
      enemies[data.enemyId].health -= 1;
      
      if (enemies[data.enemyId].health <= 0) {
        delete enemies[data.enemyId];
        if (players[socket.id]) {
          players[socket.id].score += 10;
        }
        io.emit('enemyKilled', { enemyId: data.enemyId, killerId: socket.id });
      } else {
        io.emit('enemyHit', { enemyId: data.enemyId, health: enemies[data.enemyId].health });
      }
    }

    // Remove bullet
    if (bullets[data.bulletId]) {
      delete bullets[data.bulletId];
      io.emit('bulletRemoved', data.bulletId);
    }
  });

  // Handle player hit by enemy
  socket.on('playerHitByEnemy', (data) => {
    if (players[socket.id]) {
      players[socket.id].health -= 10;
      
      if (players[socket.id].health <= 0) {
        players[socket.id].health = 0;
        io.emit('playerDied', socket.id);
        
        // Respawn after 3 seconds
        setTimeout(() => {
          if (players[socket.id]) {
            players[socket.id].health = 100;
            players[socket.id].x = 200;
            players[socket.id].y = 410;
            io.emit('playerRespawned', players[socket.id]);
          }
        }, 3000);
      } else {
        io.emit('playerHit', { id: socket.id, health: players[socket.id].health });
      }
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`Player disconnected: ${socket.id}`);
    delete players[socket.id];
    io.emit('playerLeft', socket.id);
  });
});

// Spawn enemies periodically
function spawnEnemy() {
  const enemyId = `enemy_${nextEnemyId++}`;
  const startX = Math.random() * 400 + 50;
  
  enemies[enemyId] = {
    id: enemyId,
    x: startX,
    y: 410,
    width: 64,
    height: 64,
    vel: 3,
    health: 10,
    path: [startX, Math.min(startX + 150, 450)]
  };

  io.emit('enemySpawned', enemies[enemyId]);
}

// Game loop - update enemies
setInterval(() => {
  // Move enemies
  Object.values(enemies).forEach(enemy => {
    if (enemy.vel > 0) {
      if (enemy.x + enemy.vel < enemy.path[1]) {
        enemy.x += enemy.vel;
      } else {
        enemy.vel = -enemy.vel;
      }
    } else {
      if (enemy.x + enemy.vel > enemy.path[0]) {
        enemy.x += enemy.vel;
      } else {
        enemy.vel = -enemy.vel;
      }
    }
  });

  // Move bullets
  Object.values(bullets).forEach(bullet => {
    bullet.x += bullet.vel * bullet.facing;
    
    // Remove bullets off screen
    if (bullet.x < 0 || bullet.x > GAME_WIDTH) {
      delete bullets[bullet.id];
      io.emit('bulletRemoved', bullet.id);
    }
  });

  // Broadcast enemy positions
  io.emit('enemiesUpdate', enemies);
  io.emit('bulletsUpdate', bullets);
}, 1000 / 27); // 27 FPS like original game

// Spawn enemies every 5 seconds if less than 3
setInterval(() => {
  if (Object.keys(enemies).length < 3) {
    spawnEnemy();
  }
}, ENEMY_RESPAWN_TIME);

// Start initial enemies
for (let i = 0; i < 2; i++) {
  spawnEnemy();
}

server.listen(PORT, () => {
  console.log(`🎮 Game server running on port ${PORT}`);
  console.log(`📱 Open http://localhost:${PORT} on any device`);
});
