var BitcoinH = BitcoinH || {};

//the last stretch: float down the Lightning Rapids, dodging the rocks
BitcoinH.Raft = {
  W: 120,
  H: 150,
  LENGTH: 2400,

  start: function(done) {
    this.done = done;
    this.x = this.W / 2 - 5;
    this.y = this.H - 18;
    this.travelled = 0;
    this.speed = 1;
    this.rocks = [];
    this.losses = [];
    this.hurt = 0;
    this.over = false;
    this.steer = 0;
    this.keys = {};
    BitcoinH.Screen.show(
      '<div class="raft"><canvas id="raft-canvas" width="' + this.W + '" height="' + this.H + '"></canvas>' +
      '<div class="hunt-hud"><span id="raft-miles"></span></div>' +
      '<div class="press hunt-help">' + (BitcoinH.Screen.touch ? 'Hold the left or right side to steer around the rocks.' : 'LEFT and RIGHT arrows to steer around the rocks.') + '</div></div>', {
        key: this.key.bind(this)
      });
    this.canvas = document.getElementById('raft-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.upListener = this.keyUp.bind(this);
    document.addEventListener('keyup', this.upListener);
    var raft = this;
    var press = function(e) {
      e.preventDefault();
      var rect = raft.canvas.getBoundingClientRect();
      raft.steer = e.clientX - rect.left < rect.width / 2 ? -1 : 1;
    };
    this.canvas.addEventListener('pointerdown', press);
    this.canvas.addEventListener('pointermove', function(e) { if(e.buttons) press(e); });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(function(type) {
      raft.canvas.addEventListener(type, function() { raft.steer = 0; });
    });
    requestAnimationFrame(this.frame.bind(this));
  },

  key: function(e) {
    this.keys[e.key] = true;
  },

  keyUp: function(e) {
    this.keys[e.key] = false;
  },

  //the banks wander back and forth
  banks: function(y) {
    var t = (this.travelled - y) / 40;
    var center = this.W / 2 + Math.sin(t) * 18 + Math.sin(t / 2.7) * 10;
    return {left: center - 42, right: center + 42};
  },

  frame: function() {
    if(this.over) return;
    this.travelled += this.speed;
    this.speed = Math.min(2.2, 1 + this.travelled / 1500);
    var dir = this.steer || ((this.keys.ArrowRight ? 1 : 0) - (this.keys.ArrowLeft ? 1 : 0));
    this.x += dir * 1.4;
    var bank = this.banks(this.y);
    if(this.x < bank.left + 2) this.x = bank.left + 2;
    if(this.x > bank.right - 12) this.x = bank.right - 12;

    if(Math.random() < 0.035 * this.speed) {
      var top = this.banks(0);
      this.rocks.push({x: top.left + 4 + Math.random() * (top.right - top.left - 12), y: -6, w: 5 + Math.floor(Math.random() * 5)});
    }
    this.rocks.forEach(function(r) { r.y += this.speed; }, this);
    this.rocks = this.rocks.filter(function(r) { return r.y < this.H + 10; }, this);

    if(this.hurt > 0) this.hurt--;
    else {
      this.rocks.forEach(function(r) {
        if(r.hit) return;
        if(r.x < this.x + 10 && r.x + r.w > this.x && r.y < this.y + 5 && r.y + 4 > this.y) {
          r.hit = true;
          this.crash();
        }
      }, this);
    }

    this.draw();
    var milesLeft = Math.max(0, Math.ceil((this.LENGTH - this.travelled) / this.LENGTH * 270));
    document.getElementById('raft-miles').textContent = 'Miles to go: ' + milesLeft;
    if(this.travelled >= this.LENGTH || !BitcoinH.Stackers.alive().length) {
      this.finish();
      return;
    }
    requestAnimationFrame(this.frame.bind(this));
  },

  //hitting a rock costs you something
  crash: function() {
    var s = BitcoinH.Stackers;
    this.hurt = 60;
    BitcoinH.Sound.buzz();
    var roll = Math.random();
    if(roll < 0.2 && s.alive().length) {
      var victim = s.killRandom();
      this.losses.push(victim.name + ' drowned.');
    } else if(roll < 0.55 && s.food > 0) {
      this.losses.push('Lost ' + Math.abs(s.change('food', -(40 + Math.floor(Math.random() * 60)))) + ' pounds of food.');
    } else if(roll < 0.75 && s.zaps > 0) {
      this.losses.push('Lost ' + Math.abs(s.change('zaps', -Math.min(s.zaps, 20 + Math.floor(Math.random() * 40)))) + ' zaps.');
    } else if(roll < 0.9 && s.hats > 0) {
      this.losses.push('Lost ' + Math.abs(s.change('hats', -1)) + ' tinfoil hat.');
    } else {
      this.losses.push('Force closed on a rock. Everyone is soaked.');
      s.change('health', -5);
    }
  },

  draw: function() {
    var ctx = this.ctx;
    ctx.fillStyle = '#2f7a20';
    ctx.fillRect(0, 0, this.W, this.H);
    for(var y = 0; y < this.H; y++) {
      var bank = this.banks(y);
      ctx.fillStyle = '#1c4fb8';
      ctx.fillRect(Math.round(bank.left), y, Math.round(bank.right - bank.left), 1);
      //whitewater
      if((y + Math.floor(this.travelled)) % 9 === 0) {
        ctx.fillStyle = '#9fc4ff';
        ctx.fillRect(Math.round(bank.left + ((y * 17 + Math.floor(this.travelled / 3)) % 70)), y, 3, 1);
      }
    }
    this.rocks.forEach(function(r) {
      ctx.fillStyle = '#8a8a8a';
      ctx.fillRect(Math.round(r.x), Math.round(r.y), r.w, 4);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(Math.round(r.x) - 1, Math.round(r.y) - 1, r.w + 2, 1);
    });
    if(this.hurt % 10 < 6) {
      BitcoinH.drawSprite(ctx, 'raft', this.x, this.y);
      ctx.fillStyle = '#f7931a';
      ctx.fillRect(Math.round(this.x) + 3, Math.round(this.y) - 3, 2, 3);
      ctx.fillStyle = '#7a3fc0';
      ctx.fillRect(Math.round(this.x) + 6, Math.round(this.y) - 2, 2, 2);
    }
  },

  finish: function() {
    this.over = true;
    document.removeEventListener('keyup', this.upListener);
    this.done(this.losses);
  }
};
