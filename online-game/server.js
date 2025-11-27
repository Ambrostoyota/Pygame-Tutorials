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

const rooms = {};
let nextRoomId = 1;

const GAME_WIDTH = 500;
const GAME_HEIGHT = 480;
const ENEMY_RESPAWN_TIME = 5000;

function getRoom(roomId) {
  if (!rooms[roomId]) {
    rooms[roomId] = {
      id: roomId,
      name: `Room ${roomId}`,
      players: {},
      enemies: {},
      bullets: {},
      nextEnemyId: 0,
      nextBulletId: 0,
      maxPlayers: 8,
      created: Date.now()
    };
  }
  return rooms[roomId];
}

function getRoomList() {
  return Object.keys(rooms).map(id => ({
    id,
    name: rooms[id].name,
    playerCount: Object.keys(rooms[id].players).length,
    maxPlayers: rooms[id].maxPlayers
  }));
}

getRoom('lobby');
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log(`Player connected: ${socket.id}`);
  
  let currentRoom = 'lobby';
  socket.join(currentRoom);

  const room = getRoom(currentRoom);
  room.players[socket.id] = {
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
    username: `Player${Object.keys(room.players).length + 1}`,
    roomId: currentRoom
  };

  socket.emit('init', {
    playerId: socket.id,
    roomId: currentRoom,
    players: room.players,
    enemies: room.enemies,
    bullets: room.bullets,
    rooms: getRoomList()
  });

  socket.to(currentRoom).emit('playerJoined', room.players[socket.id]);
  io.emit('roomListUpdate', getRoomList());

  socket.on('createRoom', (roomName) => {
    const roomId = `room_${nextRoomId++}`;
    const newRoom = getRoom(roomId);
    newRoom.name = roomName || `Room ${nextRoomId}`;
    socket.emit('roomCreated', { roomId, name: newRoom.name });
    io.emit('roomListUpdate', getRoomList());
  });

  socket.on('joinRoom', (roomId) => {
    const oldRoom = getRoom(currentRoom);
    const newRoom = getRoom(roomId);
    
    if (Object.keys(newRoom.players).length >= newRoom.maxPlayers) {
      socket.emit('roomFull', roomId);
      return;
    }
    
    if (oldRoom.players[socket.id]) {
      const username = oldRoom.players[socket.id].username;
      delete oldRoom.players[socket.id];
      socket.to(currentRoom).emit('playerLeft', socket.id);
      socket.leave(currentRoom);
      
      currentRoom = roomId;
      socket.join(currentRoom);
      
      newRoom.players[socket.id] = {
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
        username: username,
        roomId: currentRoom
      };
      
      socket.emit('roomJoined', {
        roomId: currentRoom,
        players: newRoom.players,
        enemies: newRoom.enemies,
        bullets: newRoom.bullets
      });
      
      socket.to(currentRoom).emit('playerJoined', newRoom.players[socket.id]);
      io.emit('roomListUpdate', getRoomList());
    }
  });

  socket.on('playerMove', (data) => {
    const room = getRoom(currentRoom);
    if (room.players[socket.id]) {
      room.players[socket.id].x = data.x;
      room.players[socket.id].y = data.y;
      room.players[socket.id].left = data.left;
      room.players[socket.id].right = data.right;
      room.players[socket.id].isJump = data.isJump;
      socket.to(currentRoom).emit('playerMoved', { id: socket.id, ...data });
    }
  });

  socket.on('shoot', (data) => {
    const room = getRoom(currentRoom);
    const bulletId = `bullet_${socket.id}_${room.nextBulletId++}`;
    room.bullets[bulletId] = {
      id: bulletId,
      x: data.x,
      y: data.y,
      facing: data.facing,
      vel: 8,
      ownerId: socket.id
    };
    io.to(currentRoom).emit('bulletCreated', room.bullets[bulletId]);
  });

  socket.on('bulletHitEnemy', (data) => {
    const room = getRoom(currentRoom);
    if (room.enemies[data.enemyId]) {
      room.enemies[data.enemyId].health -= 1;
      
      if (room.enemies[data.enemyId].health <= 0) {
        delete room.enemies[data.enemyId];
        if (room.players[socket.id]) {
          room.players[socket.id].score += 10;
        }
        io.to(currentRoom).emit('enemyKilled', { enemyId: data.enemyId, killerId: socket.id });
      } else {
        io.to(currentRoom).emit('enemyHit', { enemyId: data.enemyId, health: room.enemies[data.enemyId].health });
      }
    }

    if (room.bullets[data.bulletId]) {
      delete room.bullets[data.bulletId];
      io.to(currentRoom).emit('bulletRemoved', data.bulletId);
    }
  });

  socket.on('playerHitByEnemy', (data) => {
    const room = getRoom(currentRoom);
    if (room.players[socket.id]) {
      room.players[socket.id].health -= 10;
      
      if (room.players[socket.id].health <= 0) {
        room.players[socket.id].health = 0;
        io.to(currentRoom).emit('playerDied', socket.id);
        
        setTimeout(() => {
          if (room.players[socket.id]) {
            room.players[socket.id].health = 100;
            room.players[socket.id].x = 200;
            room.players[socket.id].y = 410;
            io.to(currentRoom).emit('playerRespawned', room.players[socket.id]);
          }
        }, 3000);
      } else {
        io.to(currentRoom).emit('playerHit', { id: socket.id, health: room.players[socket.id].health });
      }
    }
  });

  socket.on('disconnect', () => {
    console.log(`Player disconnected: ${socket.id}`);
    const room = getRoom(currentRoom);
    delete room.players[socket.id];
    io.to(currentRoom).emit('playerLeft', socket.id);
    io.emit('roomListUpdate', getRoomList());
  });
});

function spawnEnemy(room) {
  const enemyId = `enemy_${room.nextEnemyId++}`;
  const startX = Math.random() * 400 + 50;
  
  room.enemies[enemyId] = {
    id: enemyId,
    x: startX,
    y: 410,
    width: 64,
    height: 64,
    vel: 3,
    health: 10,
    path: [startX, Math.min(startX + 150, 450)]
  };

  io.to(room.id).emit('enemySpawned', room.enemies[enemyId]);
}

setInterval(() => {
  Object.values(rooms).forEach(room => {
    Object.values(room.enemies).forEach(enemy => {
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

    Object.values(room.bullets).forEach(bullet => {
      bullet.x += bullet.vel * bullet.facing;
      
      if (bullet.x < 0 || bullet.x > GAME_WIDTH) {
        delete room.bullets[bullet.id];
        io.to(room.id).emit('bulletRemoved', bullet.id);
      }
    });

    if (Object.keys(room.players).length > 0) {
      io.to(room.id).emit('enemiesUpdate', room.enemies);
      io.to(room.id).emit('bulletsUpdate', room.bullets);
    }
  });
}, 1000 / 27);

setInterval(() => {
  Object.values(rooms).forEach(room => {
    if (Object.keys(room.enemies).length < 3 && Object.keys(room.players).length > 0) {
      spawnEnemy(room);
    }
  });
}, ENEMY_RESPAWN_TIME);

for (let i = 0; i < 2; i++) {
  spawnEnemy(getRoom('lobby'));
}

server.listen(PORT, () => {
  console.log(`🎮 Game server running on port ${PORT}`);
  console.log(`📱 Open http://localhost:${PORT} on any device`);
  console.log(`🏠 Default lobby created`);
});
