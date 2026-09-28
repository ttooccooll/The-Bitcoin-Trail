var BitcoinH = BitcoinH || {};

//the Oregon Trail had hunting, we have proof of work
BitcoinH.Minigame = {
  ATTEMPTS: 3,

  start: function() {
    this.attempts = this.ATTEMPTS;
    this.found = 0;
    this.pos = 0;
    this.dir = 1;
    this.locked = false;
    //difficulty adjusts upward with every block found this journey
    this.targetWidth = Math.max(6, 16 - BitcoinH.Game.blocksMined * 2);
    this.speed = 1.4 + BitcoinH.Game.blocksMined * 0.2;
    this.targetStart = 10 + Math.random() * (80 - this.targetWidth);
    var target = document.getElementById('mg-target');
    target.style.left = this.targetStart + '%';
    target.style.width = this.targetWidth + '%';
    this.status('Attempts left: ' + this.attempts);
    if(!this.initiated) {
      document.getElementById('mg-hash').addEventListener('click', this.hash.bind(this));
      document.addEventListener('keydown', function(e) {
        if(e.key === ' ' && BitcoinH.Minigame.active) {
          e.preventDefault();
          BitcoinH.Minigame.hash();
        }
      });
      this.initiated = true;
    }
    document.getElementById('mg-hash').textContent = 'HASH!';
    this.active = true;
    BitcoinH.UI.openPanel('minigame');
    this.tick();
  },

  status: function(text) {
    document.getElementById('mg-status').textContent = text;
  },

  tick: function() {
    if(!this.active) return;
    if(!this.locked) {
      this.pos += this.dir * this.speed;
      if(this.pos >= 100) { this.pos = 100; this.dir = -1; }
      if(this.pos <= 0) { this.pos = 0; this.dir = 1; }
      document.getElementById('mg-cursor').style.left = this.pos + '%';
    }
    requestAnimationFrame(this.tick.bind(this));
  },

  hash: function() {
    if(!this.active) return;
    if(this.attempts <= 0) {
      this.finish();
      return;
    }
    if(this.locked) return;
    this.locked = true;
    this.attempts--;
    var hit = this.pos >= this.targetStart && this.pos <= this.targetStart + this.targetWidth;
    var bar = document.getElementById('mg-bar');
    if(hit) {
      this.found++;
      var reward = BitcoinH.Game.blockReward();
      BitcoinH.Game.stackers.change('sats', reward);
      BitcoinH.Game.blocksMined++;
      BitcoinH.UI.popStat('sats', reward);
      BitcoinH.UI.notify('You found a block! Reward and fees: ' + reward + ' sats.', 'positive');
      BitcoinH.Sound.sfx('coin');
      BitcoinH.FX.burst(bar, '#f7931a', 40);
      BitcoinH.Achievements.unlock('solo_miner');
      if(BitcoinH.Game.blocksMined >= 5) BitcoinH.Achievements.unlock('pool_operator');
      this.status('BLOCK FOUND! +' + reward + ' sats. Attempts left: ' + this.attempts);
    } else {
      BitcoinH.Sound.sfx('bad');
      this.status('Hash above target. Attempts left: ' + this.attempts);
    }
    bar.classList.add(hit ? 'hit' : 'miss');
    setTimeout(function() {
      bar.classList.remove('hit', 'miss');
      this.locked = false;
      if(this.attempts <= 0) {
        this.status((this.found ? 'Found ' + this.found + ' block(s). ' : 'No luck. The hashrate gods frown upon you. ') + 'Back to the trail.');
        document.getElementById('mg-hash').textContent = 'Back to the trail';
        this.locked = true;
      }
    }.bind(this), 500);
  },

  finish: function() {
    this.active = false;
    //mining takes time and your plebs get hungry
    var s = BitcoinH.Game.stackers;
    for(var i = 0; i < 15; i++) s.consumeFood();
    s.block += 15;
    BitcoinH.UI.backToTrail();
  }
};
