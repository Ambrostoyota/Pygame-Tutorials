// 游戏数据配置 - 120小时体量内容系统
const GAME_DATA = {
  // 职业系统
  classes: {
    warrior: {
      name: '战士',
      icon: '⚔️',
      stats: { str: 10, agi: 5, int: 3, vit: 8 },
      skills: [
        { id: 1, name: '重击', level: 1, damage: 150, cooldown: 3, desc: '强力的物理攻击' },
        { id: 2, name: '旋风斩', level: 5, damage: 200, cooldown: 5, aoe: true, desc: '范围攻击周围敌人' },
        { id: 3, name: '战吼', level: 10, buff: 'atk+30%', duration: 10, desc: '提升攻击力' },
        { id: 4, name: '破甲', level: 15, debuff: 'def-50%', duration: 8, desc: '降低敌人防御' },
        { id: 5, name: '致命一击', level: 20, damage: 300, crit: 50, desc: '高暴击率攻击' },
        { id: 6, name: '不屈意志', level: 25, passive: 'surviveLethal', desc: '致命伤害时保留1点生命' },
        { id: 7, name: '狂暴', level: 30, buff: 'atk+50%,def-30%', duration: 15, desc: '牺牲防御换取攻击' },
        { id: 8, name: '泰坦之怒', level: 35, damage: 500, stun: 2, desc: '巨大伤害并眩晕敌人' },
        { id: 9, name: '铁壁', level: 40, buff: 'def+100%', duration: 5, desc: '极大提升防御' },
        { id: 10, name: '终结', level: 50, damage: 1000, execute: '30%hp', desc: '斩杀低血量敌人' }
      ]
    },
    mage: {
      name: '法师',
      icon: '🔮',
      stats: { str: 3, agi: 5, int: 10, vit: 4 },
      skills: [
        { id: 11, name: '火球术', level: 1, damage: 120, element: 'fire', desc: '发射火球攻击' },
        { id: 12, name: '冰霜新星', level: 5, damage: 150, aoe: true, slow: 50, desc: '范围减速' },
        { id: 13, name: '奥术飞弹', level: 10, damage: 180, hits: 3, desc: '连续攻击' },
        { id: 14, name: '闪现', level: 15, teleport: 200, cooldown: 10, desc: '瞬间移动' },
        { id: 15, name: '烈焰风暴', level: 20, damage: 250, aoe: true, dot: 50, desc: '持续燃烧伤害' },
        { id: 16, name: '法力护盾', level: 25, shield: 500, duration: 10, desc: '吸收伤害护盾' },
        { id: 17, name: '时间扭曲', level: 30, slow: 80, duration: 5, desc: '大幅减速敌人' },
        { id: 18, name: '流星雨', level: 35, damage: 400, aoe: true, desc: '召唤流星攻击' },
        { id: 19, name: '奥术爆发', level: 40, damage: 600, cooldown: 30, desc: '超强单体爆发' },
        { id: 20, name: '时空裂隙', level: 50, damage: 800, stun: 3, aoe: true, desc: '终极范围控制技' }
      ]
    },
    archer: {
      name: '射手',
      icon: '🏹',
      stats: { str: 6, agi: 10, int: 4, vit: 5 },
      skills: [
        { id: 21, name: '快速射击', level: 1, damage: 100, attacks: 2, desc: '连续射击' },
        { id: 22, name: '穿透箭', level: 5, damage: 150, pierce: true, desc: '穿透敌人' },
        { id: 23, name: '多重箭', level: 10, damage: 130, targets: 3, desc: '攻击多个目标' },
        { id: 24, name: '陷阱', level: 15, damage: 200, trap: true, desc: '设置陷阱' },
        { id: 25, name: '鹰眼', level: 20, buff: 'crit+30%', duration: 15, desc: '提升暴击' },
        { id: 26, name: '后跃', level: 25, dash: -150, cooldown: 8, desc: '向后跳跃' },
        { id: 27, name: '箭雨', level: 30, damage: 180, aoe: true, hits: 5, desc: '范围持续攻击' },
        { id: 28, name: '猎人印记', level: 35, debuff: 'vuln+50%', duration: 10, desc: '标记易伤' },
        { id: 29, name: '致命射击', level: 40, damage: 500, crit: 100, desc: '必定暴击' },
        { id: 30, name: '屠龙箭', level: 50, damage: 1200, charge: 3, desc: '蓄力强力一击' }
      ]
    },
    assassin: {
      name: '刺客',
      icon: '🗡️',
      stats: { str: 7, agi: 10, int: 5, vit: 4 },
      skills: [
        { id: 31, name: '背刺', level: 1, damage: 180, backstab: 2, desc: '背后攻击加倍' },
        { id: 32, name: '潜行', level: 5, stealth: true, duration: 10, desc: '进入隐身' },
        { id: 33, name: '毒刃', level: 10, damage: 120, dot: 100, duration: 5, desc: '持续中毒伤害' },
        { id: 34, name: '影舞', level: 15, dash: 200, invulnerable: 1, desc: '无敌冲刺' },
        { id: 35, name: '连击', level: 20, damage: 150, combo: 3, desc: '连续攻击' },
        { id: 36, name: '烟雾弹', level: 25, blind: true, duration: 3, desc: '致盲敌人' },
        { id: 37, name: '暗影步', level: 30, teleport: 300, cooldown: 12, desc: '传送到敌人身后' },
        { id: 38, name: '割裂', level: 35, damage: 200, bleed: 150, desc: '流血伤害' },
        { id: 39, name: '暗影分身', level: 40, clone: true, duration: 10, desc: '召唤分身' },
        { id: 40, name: '暗杀', level: 50, damage: 2000, stealth: true, desc: '隐身状态秒杀' }
      ]
    },
    paladin: {
      name: '圣骑士',
      icon: '🛡️',
      stats: { str: 8, agi: 4, int: 6, vit: 10 },
      skills: [
        { id: 41, name: '圣光术', level: 1, heal: 150, desc: '治疗自己或队友' },
        { id: 42, name: '圣盾术', level: 5, invulnerable: 3, cooldown: 30, desc: '短暂无敌' },
        { id: 43, name: '审判', level: 10, damage: 200, holy: true, desc: '神圣伤害' },
        { id: 44, name: '祝福', level: 15, buff: 'all+20%', duration: 20, desc: '全属性提升' },
        { id: 45, name: '嘲讽', level: 20, taunt: true, duration: 5, desc: '强制敌人攻击' },
        { id: 46, name: '献身', level: 25, sacrifice: true, protect: 'team', desc: '保护队友' },
        { id: 47, name: '圣光闪现', level: 30, damage: 300, aoe: true, stun: 2, desc: '范围眩晕' },
        { id: 48, name: '正义之怒', level: 35, damage: 400, buff: 'atk+40%', desc: '攻防兼备' },
        { id: 49, name: '复活', level: 40, resurrect: true, cooldown: 600, desc: '复活队友' },
        { id: 50, name: '神圣裁决', level: 50, damage: 1500, aoe: true, heal: 500, desc: '终极技能' }
      ]
    }
  },

  // 装备系统
  equipment: {
    weapons: [
      // 普通武器
      { id: 1, name: '新手剑', rarity: 'common', atk: 10, level: 1, class: 'warrior' },
      { id: 2, name: '新手法杖', rarity: 'common', matk: 12, level: 1, class: 'mage' },
      { id: 3, name: '新手弓', rarity: 'common', atk: 11, level: 1, class: 'archer' },
      { id: 4, name: '新手匕首', rarity: 'common', atk: 9, crit: 5, level: 1, class: 'assassin' },
      { id: 5, name: '新手锤', rarity: 'common', atk: 13, level: 1, class: 'paladin' },
      // 稀有武器
      { id: 11, name: '烈焰之剑', rarity: 'rare', atk: 50, element: 'fire', level: 20, class: 'warrior' },
      { id: 12, name: '寒冰法杖', rarity: 'rare', matk: 55, element: 'ice', level: 20, class: 'mage' },
      { id: 13, name: '疾风之弓', rarity: 'rare', atk: 48, agi: 10, level: 20, class: 'archer' },
      { id: 14, name: '暗影双刃', rarity: 'rare', atk: 45, crit: 15, level: 20, class: 'assassin' },
      { id: 15, name: '圣光之锤', rarity: 'rare', atk: 52, holy: true, level: 20, class: 'paladin' },
      // 史诗武器
      { id: 21, name: '屠龙者', rarity: 'epic', atk: 120, str: 25, level: 40, class: 'warrior', effect: 'dragonSlayer' },
      { id: 22, name: '永恒奥秘', rarity: 'epic', matk: 130, int: 30, level: 40, class: 'mage', effect: 'manaRegen+50%' },
      { id: 23, name: '风神之弓', rarity: 'epic', atk: 115, agi: 28, level: 40, class: 'archer', effect: 'windWalk' },
      { id: 24, name: '夜影', rarity: 'epic', atk: 110, crit: 30, level: 40, class: 'assassin', effect: 'shadowStep' },
      { id: 25, name: '救赎', rarity: 'epic', atk: 125, vit: 35, level: 40, class: 'paladin', effect: 'autoRevive' },
      // 传说武器
      { id: 31, name: '天下第一剑', rarity: 'legendary', atk: 250, allStats: 50, level: 60, class: 'warrior', effect: 'godSlayer' },
      { id: 32, name: '创世法典', rarity: 'legendary', matk: 270, int: 70, level: 60, class: 'mage', effect: 'timeMaster' },
      { id: 33, name: '日月神弓', rarity: 'legendary', atk: 240, agi: 65, level: 60, class: 'archer', effect: 'sunMoonArrow' },
      { id: 34, name: '弑神之刃', rarity: 'legendary', atk: 235, crit: 60, level: 60, class: 'assassin', effect: 'instantKill' },
      { id: 35, name: '永恒誓约', rarity: 'legendary', atk: 260, vit: 80, level: 60, class: 'paladin', effect: 'immortal' }
    ],
    armor: [
      { id: 101, name: '新手护甲', rarity: 'common', def: 5, level: 1 },
      { id: 102, name: '铁甲', rarity: 'rare', def: 25, vit: 5, level: 20 },
      { id: 103, name: '龙鳞甲', rarity: 'epic', def: 60, vit: 20, level: 40 },
      { id: 104, name: '神圣战甲', rarity: 'legendary', def: 150, vit: 50, allStats: 30, level: 60 }
    ],
    accessories: [
      { id: 201, name: '力量戒指', rarity: 'rare', str: 10, level: 15 },
      { id: 202, name: '敏捷项链', rarity: 'rare', agi: 10, level: 15 },
      { id: 203, name: '智慧耳环', rarity: 'epic', int: 25, level: 35 },
      { id: 204, name: '生命护符', rarity: 'epic', vit: 25, hp: 500, level: 35 },
      { id: 205, name: '龙之心', rarity: 'legendary', allStats: 40, hp: 1000, mp: 1000, level: 55 }
    ]
  },

  // 任务系统
  quests: {
    main: [
      { id: 1, chapter: 1, name: '新手村的危机', desc: '击败10只哥布林', rewards: { exp: 100, gold: 50 }, next: 2 },
      { id: 2, chapter: 1, name: '寻找失踪的村民', desc: '前往暗黑森林调查', rewards: { exp: 200, gold: 100 }, next: 3 },
      { id: 3, chapter: 1, name: '黑暗的真相', desc: '击败哥布林首领', rewards: { exp: 500, gold: 200, item: 11 }, next: 4 },
      { id: 4, chapter: 2, name: '启程', desc: '前往王都', rewards: { exp: 300, gold: 150 }, next: 5 },
      { id: 5, chapter: 2, name: '王都的阴谋', desc: '调查可疑人物', rewards: { exp: 600, gold: 300 }, next: 6 }
      // ... 50个章节，每章10+任务
    ],
    daily: [
      { id: 1001, name: '每日清剿', desc: '击败20只怪物', rewards: { exp: 500, gold: 200 }, reset: 'daily' },
      { id: 1002, name: '材料收集', desc: '收集10个特殊材料', rewards: { exp: 400, gold: 150 }, reset: 'daily' },
      { id: 1003, name: '副本挑战', desc: '完成任意副本1次', rewards: { exp: 800, gold: 400 }, reset: 'daily' },
      { id: 1004, name: '竞技场战斗', desc: '参与3场PVP', rewards: { exp: 600, honor: 100 }, reset: 'daily' },
      { id: 1005, name: '公会贡献', desc: '为公会捐献资源', rewards: { exp: 300, guild: 50 }, reset: 'daily' }
    ],
    side: [
      { id: 2001, name: '铁匠的烦恼', desc: '收集10个铁矿石', rewards: { exp: 200, gold: 100 } },
      { id: 2002, name: '失落的戒指', desc: '找到祖传戒指', rewards: { exp: 300, item: 201 } },
      { id: 2003, name: '神秘的信件', desc: '送信给城镇守卫', rewards: { exp: 150, gold: 80 } }
      // ... 200+支线任务
    ]
  },

  // 成就系统
  achievements: [
    { id: 1, name: '初出茅庐', desc: '达到10级', points: 10, rewards: { title: '新手冒险者' } },
    { id: 2, name: '百战老兵', desc: '击败1000只怪物', points: 50, rewards: { title: '屠戮者', gold: 10000 } },
    { id: 3, name: '财富积累', desc: '拥有100000金币', points: 30, rewards: { title: '富翁' } },
    { id: 4, name: '装备大师', desc: '装备全身史诗装备', points: 100, rewards: { title: '史诗猎人', item: 104 } },
    { id: 5, name: '副本征服者', desc: '完成所有副本', points: 200, rewards: { title: '副本之王', mount: 15 } },
    { id: 6, name: 'PVP传奇', desc: '竞技场达到传奇段位', points: 300, rewards: { title: '传奇斗士', pet: 25 } },
    { id: 7, name: '收藏家', desc: '获得所有宠物', points: 500, rewards: { title: '驯兽大师', mount: 30 } }
    // ... 500+成就
  ],

  // 地图系统
  maps: [
    { id: 1, name: '新手村', level: '1-10', monsters: ['哥布林', '史莱姆'], boss: '哥布林首领' },
    { id: 2, name: '暗黑森林', level: '10-20', monsters: ['森林狼', '暗影蜘蛛'], boss: '森林守护者' },
    { id: 3, name: '荒芜沙漠', level: '20-30', monsters: ['沙漠蝎', '流沙怪'], boss: '沙漠霸主' },
    { id: 4, name: '雪山', level: '30-40', monsters: ['冰霜巨人', '雪狼'], boss: '冰龙' },
    { id: 5, name: '火山', level: '40-50', monsters: ['熔岩元素', '火焰恶魔'], boss: '炎魔之王' },
    { id: 6, name: '深渊', level: '50-60', monsters: ['深渊恶魔', '虚空行者'], boss: '深渊领主' },
    { id: 7, name: '天空之城', level: '60-70', monsters: ['雷霆巨鹰', '风暴元素'], boss: '天空霸主' },
    { id: 8, name: '海底神殿', level: '70-80', monsters: ['海妖', '深海巨兽'], boss: '海神' },
    { id: 9, name: '龙之峡谷', level: '80-90', monsters: ['幼龙', '龙人战士'], boss: '远古巨龙' },
    { id: 10, name: '神之领域', level: '90-100', monsters: ['堕落天使', '神之使徒'], boss: '神王' }
  ],

  // 副本系统
  dungeons: [
    { id: 1, name: '哥布林巢穴', difficulty: 'normal', level: 10, players: '1-5', bosses: 1, rewards: { exp: 1000, gold: 500 } },
    { id: 2, name: '哥布林巢穴', difficulty: 'heroic', level: 15, players: '3-5', bosses: 2, rewards: { exp: 2000, gold: 1000, rare: true } },
    { id: 3, name: '哥布林巢穴', difficulty: 'epic', level: 20, players: '5', bosses: 3, rewards: { exp: 5000, gold: 3000, epic: true } },
    { id: 11, name: '暗影要塞', difficulty: 'normal', level: 30, players: '1-5', bosses: 2, rewards: { exp: 3000, gold: 1500 } },
    { id: 12, name: '暗影要塞', difficulty: 'heroic', level: 35, players: '3-5', bosses: 3, rewards: { exp: 6000, gold: 3000, rare: true } },
    { id: 13, name: '暗影要塞', difficulty: 'epic', level: 40, players: '5', bosses: 4, rewards: { exp: 12000, gold: 6000, epic: true } },
    { id: 21, name: '龙之巢穴', difficulty: 'epic', level: 60, players: '10', bosses: 5, rewards: { exp: 50000, gold: 25000, legendary: true } }
    // ... 50+副本
  ],

  // 宠物系统
  pets: [
    { id: 1, name: '小火龙', rarity: 'common', skill: '火球', stats: { atk: 5 } },
    { id: 2, name: '冰霜狼', rarity: 'rare', skill: '冰冻', stats: { atk: 10, def: 5 } },
    { id: 3, name: '雷鸣鹰', rarity: 'epic', skill: '闪电链', stats: { atk: 25, agi: 15 } },
    { id: 4, name: '幼龙', rarity: 'legendary', skill: '龙息', stats: { atk: 50, allStats: 20 } },
    { id: 5, name: '凤凰', rarity: 'legendary', skill: '涅槃', stats: { atk: 60, resurrect: true } }
    // ... 50+宠物
  ],

  // 坐骑系统
  mounts: [
    { id: 1, name: '普通马', rarity: 'common', speed: 50 },
    { id: 2, name: '战马', rarity: 'rare', speed: 80, combat: true },
    { id: 3, name: '独角兽', rarity: 'epic', speed: 120, fly: false },
    { id: 4, name: '飞龙', rarity: 'legendary', speed: 200, fly: true },
    { id: 5, name: '凤凰', rarity: 'legendary', speed: 250, fly: true, effect: '飞行中免疫伤害' }
    // ... 30+坐骑
  ],

  // 生活技能
  professions: {
    mining: { name: '采矿', maxLevel: 500, items: ['铜矿', '铁矿', '金矿', '秘银', '精金'] },
    blacksmith: { name: '锻造', maxLevel: 500, crafts: ['武器', '护甲', '工具'] },
    alchemy: { name: '炼金', maxLevel: 500, crafts: ['生命药水', '法力药水', '强化药剂'] },
    cooking: { name: '烹饪', maxLevel: 500, crafts: ['食物', 'BUFF料理'] },
    enchanting: { name: '附魔', maxLevel: 500, crafts: ['武器附魔', '护甲附魔'] },
    jewelcrafting: { name: '珠宝加工', maxLevel: 500, crafts: ['宝石', '饰品'] }
  },

  // PVP系统
  pvp: {
    arenas: [
      { id: 1, name: '角斗场', mode: '1v1', rewards: { honor: 100, rating: 10 } },
      { id: 2, name: '团队竞技', mode: '3v3', rewards: { honor: 300, rating: 30 } },
      { id: 3, name: '战场', mode: '5v5', rewards: { honor: 500, rating: 50 } }
    ],
    ranks: [
      { tier: 'bronze', rating: 0, rewards: { title: '青铜斗士' } },
      { tier: 'silver', rating: 1000, rewards: { title: '白银斗士', mount: 2 } },
      { tier: 'gold', rating: 1500, rewards: { title: '黄金斗士', pet: 3 } },
      { tier: 'platinum', rating: 2000, rewards: { title: '铂金斗士', item: 103 } },
      { tier: 'diamond', rating: 2500, rewards: { title: '钻石斗士', item: 104 } },
      { tier: 'master', rating: 3000, rewards: { title: '大师斗士', mount: 4 } },
      { tier: 'legend', rating: 3500, rewards: { title: '传奇斗士', mount: 5, item: 35 } }
    ]
  },

  // 公会系统
  guild: {
    levels: Array.from({length: 20}, (_, i) => ({
      level: i + 1,
      members: (i + 1) * 10,
      skills: Math.floor((i + 1) / 5) + 1,
      benefits: `所有成员属性+${(i + 1) * 2}%`
    })),
    skills: [
      { id: 1, name: '公会祝福', effect: '全属性+5%', cost: 1000 },
      { id: 2, name: '经验加成', effect: '经验获取+20%', cost: 2000 },
      { id: 3, name: '金币加成', effect: '金币获取+20%', cost: 2000 },
      { id: 4, name: '公会商店', effect: '开启特殊商店', cost: 5000 },
      { id: 5, name: '公会副本', effect: '开启公会副本', cost: 10000 }
    ]
  },

  // 社交系统
  social: {
    friendsList: {
      maxFriends: 100,
      categories: ['在线好友', '离线好友', '黑名单', '最近联系'],
      features: ['私聊', '组队邀请', '传送到好友', '赠送礼物', '查看装备']
    },
    chatChannels: [
      { id: 'world', name: '世界频道', color: '#FFD700', cooldown: 10 },
      { id: 'guild', name: '公会频道', color: '#00FF00', cooldown: 0 },
      { id: 'team', name: '组队频道', color: '#00BFFF', cooldown: 0 },
      { id: 'private', name: '私聊频道', color: '#FF69B4', cooldown: 0 },
      { id: 'trade', name: '交易频道', color: '#FFA500', cooldown: 30 },
      { id: 'recruit', name: '招募频道', color: '#9370DB', cooldown: 60 }
    ],
    emotions: ['😊', '😂', '😭', '😡', '❤️', '👍', '👎', '🎉', '⚔️', '🛡️', '💰', '🏆'],
    voiceChat: {
      enabled: true,
      channels: ['公会语音', '组队语音', '好友语音']
    }
  },

  // 邮件系统
  mail: {
    maxInbox: 100,
    maxSaved: 50,
    types: [
      { type: 'system', name: '系统邮件', icon: '📧', canReply: false },
      { type: 'player', name: '玩家邮件', icon: '✉️', canReply: true },
      { type: 'auction', name: '拍卖行', icon: '💰', canReply: false },
      { type: 'guild', name: '公会邮件', icon: '🏰', canReply: true },
      { type: 'reward', name: '奖励邮件', icon: '🎁', canReply: false }
    ],
    features: ['附件物品', '附件金币', '批量删除', '一键领取', '标记为已读']
  },

  // 交易系统
  trading: {
    auctionHouse: {
      categories: ['武器', '护甲', '饰品', '消耗品', '材料', '宠物', '坐骑', '配方', '其他'],
      rarities: ['全部', '普通', '稀有', '史诗', '传说'],
      sortOptions: ['价格升序', '价格降序', '时间最新', '时间最旧', '剩余时间'],
      fees: { listingFee: 0.05, successFee: 0.10, duration: [12, 24, 48] },
      features: ['竞价', '一口价', '收藏关注', '历史记录', '推荐商品']
    },
    marketplace: {
      stalls: { maxStalls: 1000, playerStallCost: 10000, duration: 24, maxItems: 20 },
      features: ['搜索商品', '店铺装饰', '店铺公告', '交易记录', '信誉系统']
    },
    directTrade: {
      maxGold: 999999999,
      maxItems: 8,
      features: ['交易锁定', '交易确认', '交易历史', '交易保护'],
      safetyTips: ['检查物品', '确认金额', '防止诈骗', '不信任链接']
    }
  },

  // 剧情系统
  story: {
    mainStory: [
      {
        chapter: 1, title: '命运的开端',
        acts: [
          { id: 1, name: '新手村的晨曦', duration: 15, cutscene: true },
          { id: 2, name: '第一次冒险', duration: 30, cutscene: false },
          { id: 3, name: '暗影来袭', duration: 45, cutscene: true },
          { id: 4, name: '导师的教诲', duration: 20, cutscene: false },
          { id: 5, name: '初次试炼', duration: 60, cutscene: true }
        ],
        totalTime: 170
      },
      {
        chapter: 2, title: '暗黑森林的秘密',
        acts: [
          { id: 6, name: '森林深处', duration: 40, cutscene: true },
          { id: 7, name: '精灵的请求', duration: 35, cutscene: false },
          { id: 8, name: '古老遗迹', duration: 50, cutscene: true },
          { id: 9, name: '邪恶的阴谋', duration: 45, cutscene: true },
          { id: 10, name: '守护者之战', duration: 90, cutscene: true }
        ],
        totalTime: 260
      },
      {
        chapter: 3, title: '沙漠中的迷失',
        acts: [
          { id: 11, name: '荒芜之地', duration: 30, cutscene: true },
          { id: 12, name: '沙漠商队', duration: 25, cutscene: false },
          { id: 13, name: '古墓探险', duration: 70, cutscene: true },
          { id: 14, name: '法老的诅咒', duration: 55, cutscene: true },
          { id: 15, name: '真相揭晓', duration: 40, cutscene: false }
        ],
        totalTime: 220
      }
      // 共50章，每章4-6小时，总计约200小时主线内容
    ],
    npcs: [
      { id: 1, name: '村长艾伦', role: '新手村长', dialogues: 25, voiceLines: true },
      { id: 2, name: '铁匠莫林', role: '武器商人', dialogues: 30, voiceLines: true },
      { id: 3, name: '法师艾莉娅', role: '魔法导师', dialogues: 40, voiceLines: true },
      { id: 4, name: '游侠卡尔', role: '任务NPC', dialogues: 35, voiceLines: true },
      { id: 5, name: '暗影刺客', role: '反派角色', dialogues: 20, voiceLines: true }
      // 共300+ NPC，每个NPC 20-50条对话
    ],
    cutscenes: [
      { id: 1, name: '开场动画', duration: 180, quality: '4K', type: 'intro' },
      { id: 2, name: '暗影降临', duration: 120, quality: '4K', type: 'plot' },
      { id: 3, name: '精灵森林', duration: 90, quality: '4K', type: 'plot' },
      { id: 4, name: '古墓觉醒', duration: 150, quality: '4K', type: 'plot' },
      { id: 5, name: '龙的苏醒', duration: 200, quality: '4K', type: 'boss' },
      { id: 6, name: '最终决战', duration: 300, quality: '4K', type: 'finale' }
      // 共100+过场动画
    ],
    choices: [
      {
        id: 1, scene: '村长的请求', question: '你愿意帮助村民们吗？',
        options: [
          { text: '我愿意帮助', alignment: 'good', reward: 'exp', consequence: 'villageAlliance' },
          { text: '我需要报酬', alignment: 'neutral', reward: 'gold', consequence: 'mercenaryPath' },
          { text: '这不关我的事', alignment: 'evil', reward: 'item', consequence: 'darkPath' }
        ]
      },
      {
        id: 2, scene: '精灵的考验', question: '你会如何对待被困的精灵？',
        options: [
          { text: '立即释放', alignment: 'good', consequence: 'elfFriend' },
          { text: '要求交换条件', alignment: 'neutral', consequence: 'negotiator' },
          { text: '留作人质', alignment: 'evil', consequence: 'elfEnemy' }
        ]
      }
      // 共200+剧情选择点
    ],
    endings: [
      { id: 1, name: '光明之路', requirement: 'good', unlocks: '光明骑士称号' },
      { id: 2, name: '中立之道', requirement: 'neutral', unlocks: '自由战士称号' },
      { id: 3, name: '暗影降临', requirement: 'evil', unlocks: '暗黑领主称号' },
      { id: 4, name: '完美结局', requirement: 'all', unlocks: '传奇英雄称号' },
      { id: 5, name: '隐藏结局', requirement: 'secret', unlocks: '命运主宰称号' }
    ]
  }
};

// 导出给主游戏使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GAME_DATA;
}
