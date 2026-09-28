var BitcoinH = BitcoinH || {};

//pixel sprites, one letter per pixel
BitcoinH.SPRITES = {
  bull: [
    '...........w..w.',
    '...........bbbb.',
    '.bbbbbbbbbbbbkbb',
    'bbbbbbbbbbbbbbbp',
    'bbbbbbbbbbbbbb..',
    '.bbbbbbbbbbbb...',
    '.bb.bb....bb.bb.',
    '.bb.bb....bb.bb.',
    '.kk.kk....kk.kk.'
  ],
  bear: [
    '..........dd..',
    '.........dddd.',
    '..ddddddddddkd',
    '.ddddddddddddd',
    'dddddddddddd..',
    'dddddddddddd..',
    '.dd.dd..dd.dd.',
    '.dd.dd..dd.dd.'
  ],
  rabbit: [
    '....ww',
    '...ww.',
    '.wwww.',
    'wwwww.',
    '.w..w.'
  ],
  hunter: [
    '..kkk..',
    '..ppp..',
    '..ppp..',
    '.ooooo.',
    'ooooooo',
    'o.ooo.o',
    'p.ooo.p',
    '..bbb..',
    '..b.b..',
    '..b.b..',
    '.kk.kk.'
  ],
  raft: [
    'bbbbbbbbbb',
    'b.b.b.b.bb',
    'bbbbbbbbbb',
    'b.b.b.b.bb',
    'bbbbbbbbbb'
  ]
};

BitcoinH.PALETTE = {
  b: '#9a5b2a', d: '#4a2a14', k: '#111111', w: '#f2f2f2', p: '#e8a0a0',
  o: '#f7931a', g: '#7a7a7a', y: '#f0e040', r: '#d83030'
};

BitcoinH.drawSprite = function(ctx, sprite, x, y, flip, tint) {
  var rows = BitcoinH.SPRITES[sprite];
  for(var r = 0; r < rows.length; r++) {
    var row = rows[r];
    for(var c = 0; c < row.length; c++) {
      var ch = row[c];
      if(ch === '.') continue;
      ctx.fillStyle = tint || BitcoinH.PALETTE[ch];
      var px = flip ? row.length - 1 - c : c;
      ctx.fillRect(Math.round(x) + px, Math.round(y) + r, 1, 1);
    }
  }
};

BitcoinH.spriteSize = function(sprite) {
  var rows = BitcoinH.SPRITES[sprite];
  return {w: rows[0].length, h: rows.length};
};

//hunting, the way the Oregon Trail did it, except the prey is bulls and bears
BitcoinH.Hunt = {
  W: 168,
  H: 108,
  TIME: 30,
  ANIMALS: {
    bull: {pounds: 450, speed: 0.35, plural: 'bulls'},
    bear: {pounds: 200, speed: 0.5, plural: 'bears'},
    rabbit: {pounds: 2, speed: 1.1, plural: 'rabbits'}
  },
  DIRS: [[1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1]],

  start: function(done) {
    var s = BitcoinH.Stackers;
    this.done = done;
    this.animals = [];
    this.bullets = [];
    this.dir = 2;
    this.shotsFired = 0;
    this.killed = {bull: 0, bear: 0, rabbit: 0};
    this.pounds = 0;
    this.frames = 0;
    this.over = false;
    this.hunter = {x: this.W / 2 - 3, y: this.H / 2 - 5};
    //scenery for this patch of prairie
    this.scenery = [];
    for(var i = 0; i < 7; i++) {
      this.scenery.push({type: Math.random() < 0.6 ? 'tree' : 'rock', x: 10 + Math.random() * (this.W - 20), y: 10 + Math.random() * (this.H - 20)});
    }
    BitcoinH.Screen.show(
      '<div class="hunt"><canvas id="hunt-canvas" width="' + this.W + '" height="' + this.H + '"></canvas>' +
      '<div class="hunt-hud"><span id="hunt-zaps"></span><span id="hunt-time"></span></div>' +
      '<div class="press hunt-help">' + (BitcoinH.Screen.touch ? 'Tap where you want to shoot.' : 'Arrows or mouse to aim. SPACE or click to shoot. ENTER to stop.') + '</div></div>', {
        key: this.key.bind(this)
      });
    this.canvas = document.getElementById('hunt-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.addEventListener('mousemove', this.aimAt.bind(this));
    this.canvas.addEventListener('pointerdown', this.pointer.bind(this));
    this.started = performance.now();
    requestAnimationFrame(this.frame.bind(this));
  },

  toCanvas: function(e) {
    var rect = this.canvas.getBoundingClientRect();
    return {x: (e.clientX - rect.left) / rect.width * this.W, y: (e.clientY - rect.top) / rect.height * this.H};
  },

  //point the gun toward a spot, snapped to eight directions
  aimAt: function(e) {
    var p = this.toCanvas(e);
    var dx = p.x - (this.hunter.x + 3);
    var dy = p.y - (this.hunter.y + 5);
    var angle = Math.atan2(-dy, dx);
    this.dir = (Math.round(angle / (Math.PI / 4)) + 8) % 8;
  },

  pointer: function(e) {
    e.preventDefault();
    this.aimAt(e);
    this.shoot();
  },

  key: function(e) {
    if(this.over) return;
    if(e.key === 'ArrowLeft') this.dir = (this.dir + 1) % 8;
    else if(e.key === 'ArrowRight') this.dir = (this.dir + 7) % 8;
    else if(e.key === 'ArrowUp') this.dir = 2;
    else if(e.key === 'ArrowDown') this.dir = 6;
    else if(e.key === ' ') this.shoot();
    else if(e.key === 'Enter' || e.key === 'Escape') this.finish();
  },

  shoot: function() {
    var s = BitcoinH.Stackers;
    if(this.over || s.zaps <= 0) return;
    s.zaps--;
    this.shotsFired++;
    var d = this.DIRS[this.dir];
    this.bullets.push({x: this.hunter.x + 3, y: this.hunter.y + 5, dx: d[0] * 3, dy: -d[1] * 3});
    BitcoinH.Sound.shot();
  },

  spawn: function() {
    var r = Math.random();
    var type = r < 0.3 ? 'bull' : (r < 0.6 ? 'bear' : 'rabbit');
    var size = BitcoinH.spriteSize(type);
    var fromLeft = Math.random() < 0.5;
    var spec = this.ANIMALS[type];
    this.animals.push({
      type: type,
      x: fromLeft ? -size.w : this.W,
      y: 5 + Math.random() * (this.H - size.h - 10),
      vx: (fromLeft ? 1 : -1) * spec.speed * (0.8 + Math.random() * 0.4),
      vy: (Math.random() - 0.5) * spec.speed * 0.4,
      w: size.w,
      h: size.h,
      dead: false
    });
  },

  frame: function() {
    if(this.over) return;
    var elapsed = (performance.now() - this.started) / 1000;
    var left = Math.max(0, Math.ceil(this.TIME - elapsed));
    this.frames++;
    if(this.frames % 70 === 1 && this.animals.filter(function(a) { return !a.dead; }).length < 5) this.spawn();

    //move everything
    this.animals.forEach(function(a) {
      if(a.dead) return;
      a.x += a.vx;
      a.y += a.vy;
      if(a.y < 2 || a.y > this.H - a.h - 2) a.vy = -a.vy;
    }, this);
    this.animals = this.animals.filter(function(a) { return a.dead || (a.x > -30 && a.x < this.W + 30); }, this);
    this.bullets.forEach(function(b) {
      b.x += b.dx;
      b.y += b.dy;
      this.animals.forEach(function(a) {
        if(a.dead || b.hit) return;
        if(b.x >= a.x && b.x <= a.x + a.w && b.y >= a.y && b.y <= a.y + a.h) {
          a.dead = true;
          b.hit = true;
          this.killed[a.type]++;
          this.pounds += this.ANIMALS[a.type].pounds;
          BitcoinH.Sound.beep();
        }
      }, this);
    }, this);
    this.bullets = this.bullets.filter(function(b) { return !b.hit && b.x > 0 && b.x < this.W && b.y > 0 && b.y < this.H; }, this);

    this.draw();
    document.getElementById('hunt-zaps').textContent = 'Zaps: ' + BitcoinH.Stackers.zaps;
    document.getElementById('hunt-time').textContent = 'Time: ' + left;

    if(left <= 0 || (BitcoinH.Stackers.zaps <= 0 && !this.bullets.length)) {
      this.finish();
      return;
    }
    requestAnimationFrame(this.frame.bind(this));
  },

  draw: function() {
    var ctx = this.ctx;
    ctx.fillStyle = '#3f9a2c';
    ctx.fillRect(0, 0, this.W, this.H);
    //grass tufts
    ctx.fillStyle = '#2f7a20';
    for(var i = 0; i < 40; i++) {
      ctx.fillRect((i * 53) % this.W, (i * 37) % this.H, 2, 1);
    }
    this.scenery.forEach(function(item) {
      if(item.type === 'tree') {
        ctx.fillStyle = '#1d4f14';
        for(var r = 0; r < 8; r++) ctx.fillRect(item.x - r / 2, item.y + r, r + 1, 1);
        ctx.fillStyle = '#4a2a14';
        ctx.fillRect(item.x, item.y + 8, 1, 3);
      } else {
        ctx.fillStyle = '#8a8a8a';
        ctx.fillRect(item.x, item.y, 5, 3);
        ctx.fillRect(item.x + 1, item.y - 1, 3, 1);
      }
    });
    this.animals.forEach(function(a) {
      BitcoinH.drawSprite(ctx, a.type, a.x, a.y, a.vx < 0, a.dead ? '#5a1010' : null);
    });
    BitcoinH.drawSprite(ctx, 'hunter', this.hunter.x, this.hunter.y);
    //the gun
    var d = this.DIRS[this.dir];
    ctx.fillStyle = '#dddddd';
    for(var g = 2; g < 7; g++) {
      ctx.fillRect(Math.round(this.hunter.x + 3 + d[0] * g), Math.round(this.hunter.y + 5 - d[1] * g), 1, 1);
    }
    ctx.fillStyle = '#ffffff';
    this.bullets.forEach(function(b) { ctx.fillRect(Math.round(b.x), Math.round(b.y), 1, 1); });
  },

  finish: function() {
    if(this.over) return;
    this.over = true;
    var s = BitcoinH.Stackers;
    var room = BitcoinH.WAGON_FOOD_LIMIT - s.food;
    var carried = Math.min(this.pounds, 100, Math.max(0, room));
    s.change('food', carried);
    var shot = [];
    Object.keys(this.killed).forEach(function(type) {
      var n = this.killed[type];
      if(n) shot.push(n + ' ' + (n === 1 ? type : this.ANIMALS[type].plural));
    }, this);
    var text;
    if(!this.pounds) {
      text = 'You were unable to shoot any food.';
    } else {
      text = 'From this area you shot ' + shot.join(' and ') + ', ' + this.pounds.toLocaleString() + ' pounds of meat.';
      if(this.pounds > carried) {
        text += '<br><br>However, you were only able to carry ' + carried + ' pounds back to the wagon.';
      }
    }
    this.done(text);
  }
};
