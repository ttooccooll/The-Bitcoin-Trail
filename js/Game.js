var BitcoinH = BitcoinH || {};

BitcoinH.WEIGHT_PER_OSTRICH = 20;
BitcoinH.WEIGHT_PER_PERSON = 1;
BitcoinH.FOOD_WEIGHT = 0.5;
BitcoinH.ZAPPOWER_WEIGHT = 4;
BitcoinH.GAME_SPEED = 80;
BitcoinH.BLOCK_PER_STEP = 1;
BitcoinH.FOOD_PER_PERSON = 0.009;
BitcoinH.FULL_SPEED = 5;
BitcoinH.SLOW_SPEED = 3;
BitcoinH.FINAL_ADOPTION = 10000;
BitcoinH.EVENT_PROBABILITY = 0.05;
BitcoinH.ENEMY_ZAPPOWER_AVG = 5;
BitcoinH.ENEMY_GOLD_AVG = 50;
BitcoinH.HALVING_INTERVAL = 420;
BitcoinH.INITIAL_SUBSIDY = 16;
BitcoinH.MINE_COOLDOWN = 200;
BitcoinH.Game = {};

BitcoinH.Game.init = function(occupation, playerName){
  occupation = occupation || document.getElementById("occupation").value;
  let initialValues = BitcoinH.OCCUPATION_INITIALS[occupation]
  this.ui = BitcoinH.UI;
  this.eventManager = BitcoinH.Event;
  this.stackers = BitcoinH.Stackers;
  this.playerName = playerName || 'Satoshi Nakamoto';
  this.occupation = occupation;
  if (initialValues) {
    this.stackers.init({
      block: 1,
      plebs: initialValues.plebs,
      food: initialValues.food,
      ostriches: initialValues.ostriches,
      sats: initialValues.sats,
      zappower: initialValues.zappower,
      adoption: 0,
    });
  };
  this.stackers.occupation = occupation;
  this.stackers.ui = this.ui;
  this.stackers.eventManager = this.eventManager;
  this.ui.game = this;
  this.ui.stackers = this.stackers;
  this.ui.eventManager = this.eventManager;
  this.eventManager.game = this;
  this.eventManager.stackers = this.stackers;
  this.eventManager.ui = this.ui;

  this.started = true;
  this.over = false;
  this.userPaused = false;
  this.halvings = 0;
  this.landmarkIndex = 1;
  this.fightsWon = 0;
  this.blocksMined = 0;
  this.lastMined = -BitcoinH.MINE_COOLDOWN;
  this.ranAway = false;
  this.subsidyAccum = 0;
  this.deathCause = '';

  this.bindControls();
  this.ui.buildTrail();
  this.stackers.updateWeight();
  BitcoinH.Achievements.unlock('first_steps');
  this.startJourney();
};

BitcoinH.Game.bindControls = function() {
  var game = this;
  var bind = function(id, fn) {
    document.getElementById(id).addEventListener('click', function() {
      fn.call(game);
      this.blur();
    });
  };
  bind('pace-btn', this.cyclePace);
  bind('rations-btn', this.cycleRations);
  bind('mine-btn', this.startMining);
  bind('pause-btn', this.togglePause);
};

//start the journey and time starts running
BitcoinH.Game.startJourney = function() {
  this.gameActive = true;
  this.previousTime = null;
  this.ui.notify('Chancellor on brink of second bailout for banks!', 'negative');
  this.ui.notify('Rush to hyperbitcoinization before the national debt falls on you.', 'neutral');
  this.ui.toast('Block 1: The journey begins');
  this.ui.refreshStats();
  this.loop = 1;
  this.step(undefined, this.loop);
};
//game loop
BitcoinH.Game.step = function(timestamp, loop) {
  //only one game loop may run at a time
  if(!this.gameActive || loop !== this.loop) return;
  //starting, setup the previous time for the first time
  if(!this.previousTime){
    this.previousTime = timestamp || performance.now();
  }
  //time difference
  var progress = (timestamp || this.previousTime) - this.previousTime;
  //game update
  if(progress >= BitcoinH.GAME_SPEED) {
    this.previousTime = timestamp;
    this.updateGame();
  }

  //use "bind" to refer to the context "this" inside of the step method
  if(this.gameActive) window.requestAnimationFrame(function(t) { this.step(t, loop); }.bind(this));
};
//update game stats
BitcoinH.Game.updateGame = function() {
  var s = this.stackers;
  //block update
  s.block += BitcoinH.BLOCK_PER_STEP;
  //food consumption
  s.consumeFood();
  s.updateMorale();
  this.checkHalving();
  this.minerIncome();
  this.paceRisk();
  this.desertion();

  //update weight
  s.updateWeight();
  //update progress
  s.updateAdoption();
  //show stats
  this.ui.refreshStats();
  this.checkAchievements();

  if(this.checkGameOver()) return;
  if(this.checkLandmark()) return;

  //random events
  if(Math.random() <= BitcoinH.EVENT_PROBABILITY) {
    this.eventManager.generateEvent();
  }
};

//returns true when the journey has ended
BitcoinH.Game.checkGameOver = function() {
  var s = this.stackers;
  if(this.over) return true;
  //game over no food
  if(s.food <= 0) {
    this.ui.notify('Your stackers starved to death. You lose...your cowboy hat!', 'negative');
    this.end(false, 'Starved to death. Should have packed more steak.');
    BitcoinH.Achievements.unlock('starved');
    return true;
  }
  //check if everyone died
  if(s.plebs <= 0) {
    s.plebs = 0;
    this.ui.notify('Everybody Died!!! You lose...your cowboy hat!', 'negative');
    this.end(false, this.deathCause || 'Everybody died. Rugged by the fiat wasteland.');
    return true;
  }
  //check win game
  if(s.adoption >= BitcoinH.FINAL_ADOPTION) {
    this.ui.notify('You achieved hyperbitcoinization. Good job. Get back to work.', 'positive');
    this.end(true);
    return true;
  }
  return false;
};

BitcoinH.Game.end = function(won, cause) {
  var s = this.stackers;
  this.over = true;
  this.gameActive = false;
  var info = BitcoinH.OCCUPATION_INITIALS[this.occupation];
  var score;
  if(won) {
    score = s.plebs * 10 + s.ostriches * 50 + Math.floor(s.food) + Math.floor(s.sats) +
      s.zappower * 20 + Math.round(s.morale) * 5 + Math.max(0, 3000 - Math.ceil(s.block)) * 2;
    BitcoinH.Achievements.unlock('hyperbitcoinization');
    if(s.pace === 2) BitcoinH.Achievements.unlock('full_send');
    if(!this.ranAway) BitcoinH.Achievements.unlock('diamond_hands');
    if(this.occupation === 'nomad') BitcoinH.Achievements.unlock('lone_wolf');
  } else {
    score = Math.floor(Math.min(s.adoption, BitcoinH.FINAL_ADOPTION) / 10);
  }
  score = Math.round(score * info.multiplier);
  var summary = {
    name: this.playerName,
    occupationName: BitcoinH.OCCUPATION_NAMES[this.occupation],
    multiplier: info.multiplier,
    cause: cause || '',
    score: score
  };
  summary.rank = BitcoinH.HighScores.add({name: this.playerName, score: score, won: won});
  this.ui.refreshStats();
  document.getElementById('journey').classList.add(won ? 'won' : 'lost');
  if(BitcoinH.Sound.current) BitcoinH.Sound.current.pause();
  if(won) {
    BitcoinH.Sound.sfx('win');
    BitcoinH.FX.confetti(200);
    document.getElementById('trees-color').style.opacity = 1;
  } else {
    BitcoinH.Sound.sfx('lose');
    BitcoinH.FX.shake();
  }
  var ui = this.ui;
  setTimeout(function() { ui.showGameOver(won, summary); }, won ? 1200 : 800);
};

/* ---------- trail mechanics ---------- */

BitcoinH.Game.subsidy = function() {
  return Math.floor(BitcoinH.INITIAL_SUBSIDY / Math.pow(2, this.halvings));
};

//reward for finding a block in the minigame
BitcoinH.Game.blockReward = function() {
  var reward = Math.max(1, this.subsidy()) * 20 + Math.floor(Math.random() * 60);
  if(this.occupation === 'miner') reward *= 2;
  return reward;
};

BitcoinH.Game.checkHalving = function() {
  var halvings = Math.floor(this.stackers.block / BitcoinH.HALVING_INTERVAL);
  if(halvings <= this.halvings) return;
  this.halvings = halvings;
  var s = this.stackers;
  var bonus = Math.round(s.sats * 0.1);
  s.change('sats', bonus);
  s.change('morale', 10);
  this.ui.notify('HALVING #' + halvings + '! Block subsidy drops to ' + this.subsidy() + ' sats. Number go up: +' + bonus + ' sats, morale +10', 'positive');
  this.ui.toast('HALVING #' + halvings + '!', 'positive');
  this.ui.popStat('sats', bonus);
  BitcoinH.Sound.sfx('halving');
  BitcoinH.FX.flash('rgba(247,147,26,0.35)');
  if(halvings >= 3) BitcoinH.Achievements.unlock('halvening');
};

//miners get paid every block
BitcoinH.Game.minerIncome = function() {
  if(this.occupation !== 'miner') return;
  this.subsidyAccum += this.subsidy() / 8;
  if(this.subsidyAccum >= 1) {
    var earned = Math.floor(this.subsidyAccum);
    this.subsidyAccum -= earned;
    this.stackers.change('sats', earned);
  }
};

//going too fast can hurt
BitcoinH.Game.paceRisk = function() {
  var s = this.stackers;
  if(Math.random() < s.getPace().risk && s.plebs > 1) {
    s.change('plebs', -1);
    this.ui.notify('A pleb collapsed from exhaustion. Full send has a price.', 'negative');
    this.ui.popStat('plebs', -1);
    BitcoinH.Sound.sfx('bad');
  }
};

//miserable plebs rage quit to shitcoins
BitcoinH.Game.desertion = function() {
  var s = this.stackers;
  if(s.morale < 15 && s.plebs > 1 && Math.random() < 0.02) {
    var lost = Math.abs(s.change('plebs', -Math.ceil(s.plebs * 0.1)));
    this.ui.notify(lost + ' plebs rage quit to go gamble on memecoins. Morale is too low!', 'negative');
    this.ui.popStat('plebs', -lost);
    BitcoinH.FX.shake();
  }
};

BitcoinH.Game.nextLandmark = function() {
  return this.eventManager.landmarks[this.landmarkIndex];
};

//returns true if a landmark paused the journey
BitcoinH.Game.checkLandmark = function() {
  var landmark = this.nextLandmark();
  if(!landmark || this.stackers.adoption < landmark.at) return false;
  this.landmarkIndex++;
  if(landmark.at >= BitcoinH.FINAL_ADOPTION) return false;
  this.ui.toast('Landmark: ' + landmark.name, 'neutral');
  this.showLandmarkFlag(landmark.name);
  BitcoinH.Sound.sfx('halving');
  if(landmark.type === 'CHOICE') {
    this.pauseJourney();
    this.ui.notify('You have reached ' + landmark.name + '.', 'neutral');
    this.ui.showChoice(landmark);
    return true;
  }
  if(landmark.type === 'SHOP') {
    this.pauseJourney();
    this.ui.notify(landmark.text, 'neutral');
    this.eventManager.shopEvent(landmark, landmark.name);
    return true;
  }
  this.ui.notify(landmark.name + ': ' + landmark.text, 'neutral');
  if(landmark.morale) this.stackers.change('morale', landmark.morale);
  //the Mt. Gox trustee finally pays out
  if(landmark.name === 'Wall Street' && this.stackers.goxClaim) {
    this.stackers.change('sats', this.stackers.goxClaim);
    this.ui.notify('The Mt. Gox trustee finally pays out ' + this.stackers.goxClaim + ' sats. Only took forever.', 'positive');
    this.ui.popStat('sats', this.stackers.goxClaim);
    this.stackers.goxClaim = 0;
  }
  return false;
};

BitcoinH.Game.showLandmarkFlag = function(name) {
  var flag = document.getElementById('landmark-flag');
  flag.textContent = name;
  flag.classList.remove('show');
  void flag.offsetWidth;
  flag.classList.add('show');
};

BitcoinH.Game.checkAchievements = function() {
  var s = this.stackers;
  if(s.sats >= 5000) BitcoinH.Achievements.unlock('whale');
  if(s.ostriches >= 20) BitcoinH.Achievements.unlock('rancher');
};

/* ---------- player controls ---------- */

BitcoinH.Game.cyclePace = function() {
  if(this.over) return;
  this.stackers.pace = (this.stackers.pace + 1) % BitcoinH.PACES.length;
  this.ui.notify('Pace set to ' + this.stackers.getPace().name + '.', 'neutral');
  BitcoinH.Sound.sfx('blip');
  this.ui.refreshControls();
};

BitcoinH.Game.cycleRations = function() {
  if(this.over) return;
  this.stackers.rations = (this.stackers.rations + 1) % BitcoinH.RATIONS.length;
  this.ui.notify('Rations set to ' + this.stackers.getRations().name + '.', 'neutral');
  BitcoinH.Sound.sfx('blip');
  this.ui.refreshStats();
};

BitcoinH.Game.mineCooldown = function() {
  return Math.max(0, Math.ceil(this.lastMined + BitcoinH.MINE_COOLDOWN - this.stackers.block));
};

BitcoinH.Game.startMining = function() {
  if(this.over || !this.gameActive || this.mineCooldown() > 0) return;
  this.lastMined = this.stackers.block;
  this.pauseJourney();
  this.ui.notify('You fire up the ASICs and start hashing.', 'neutral');
  BitcoinH.Minigame.start();
};

BitcoinH.Game.togglePause = function() {
  if(this.over || this.ui.modalOpen()) return;
  this.userPaused = !this.userPaused;
  document.getElementById('pause-banner').classList.toggle('hidden', !this.userPaused);
  document.getElementById('journey').classList.toggle('paused', this.userPaused);
  if(this.userPaused) this.pauseJourney();
  else this.resumeJourney();
  this.ui.refreshControls();
};

//pause the journey
BitcoinH.Game.pauseJourney = function() {
  this.gameActive = false;
  document.getElementById('journey').classList.add('stopped');
  if(this.ui.refreshControls) this.ui.refreshControls();
};
//resume the journey
BitcoinH.Game.resumeJourney = function() {
  if(this.over || this.userPaused || this.gameActive) return;
  this.gameActive = true;
  this.previousTime = null;
  document.getElementById('journey').classList.remove('stopped');
  this.ui.refreshControls();
  this.loop++;
  this.step(undefined, this.loop);
};
