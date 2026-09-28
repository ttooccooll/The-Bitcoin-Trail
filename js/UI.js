var BitcoinH = BitcoinH || {};

BitcoinH.UI = {};

var STAT_LABELS = {
  plebs: 'plebs', food: 'food', ostriches: 'ostriches', sats: 'sats',
  zappower: 'zappower', morale: 'morale'
};

function escapeHtml(text) {
  var div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

//show a notification in the message area
BitcoinH.UI.notify = function(message, type){
  var area = document.getElementById('updates-area');
  var entry = document.createElement('div');
  entry.className = 'update-' + type + ' new';
  entry.innerHTML = 'Block ' + Math.ceil(this.stackers.block) + ': ' + message;
  area.insertBefore(entry, area.firstChild);
  //keep the log from growing forever
  while(area.children.length > 80) area.removeChild(area.lastChild);
  area.scrollTop = 0;
};

//big message that floats over everything for a moment
BitcoinH.UI.toast = function(message, type) {
  var layer = document.getElementById('toast-layer');
  var el = document.createElement('div');
  el.className = 'toast ' + (type || '');
  el.textContent = message;
  layer.appendChild(el);
  setTimeout(function(){ el.remove(); }, 3200);
};

//floating +N / -N next to a stat
BitcoinH.UI.popStat = function(stat, delta) {
  var el = document.getElementById('stat-' + stat);
  if(!el || !delta) return;
  var pop = document.createElement('span');
  pop.className = 'pop ' + (delta > 0 ? 'up' : 'down');
  pop.textContent = (delta > 0 ? '+' : '') + Math.round(delta);
  el.parentNode.appendChild(pop);
  setTimeout(function(){ pop.remove(); }, 1200);
  el.parentNode.classList.remove('changed');
  void el.parentNode.offsetWidth;
  el.parentNode.classList.add('changed');
};

//draw the landmark ticks on the trail bar
BitcoinH.UI.buildTrail = function() {
  var marks = document.getElementById('trail-marks');
  marks.innerHTML = '';
  this.eventManager.landmarks.forEach(function(landmark) {
    var mark = document.createElement('div');
    mark.className = 'mark';
    mark.style.right = (landmark.at / BitcoinH.FINAL_ADOPTION * 100) + '%';
    mark.title = landmark.name;
    mark.dataset.at = landmark.at;
    marks.appendChild(mark);
  });
};

//refresh visual stackers stats
BitcoinH.UI.refreshStats = function() {
  var s = this.stackers;
  document.getElementById('stat-block').textContent = Math.ceil(s.block).toLocaleString();
  document.getElementById('stat-adoption').textContent = Math.floor(s.adoption) + '/' + BitcoinH.FINAL_ADOPTION;
  document.getElementById('stat-plebs').textContent = s.plebs;
  document.getElementById('stat-ostriches').textContent = s.ostriches;
  var blocksLeft = s.blocksOfFood();
  var foodEl = document.getElementById('stat-food');
  foodEl.textContent = Math.ceil(s.food) + (isFinite(blocksLeft) ? ' (' + blocksLeft + 'b)' : '');
  foodEl.classList.toggle('warn', blocksLeft < 150);
  document.getElementById('stat-sats').textContent = Math.floor(s.sats).toLocaleString();
  document.getElementById('stat-zappower').textContent = s.zappower;
  var weightEl = document.getElementById('stat-weight');
  weightEl.textContent = Math.ceil(s.weight) + '/' + s.capacity;
  weightEl.classList.toggle('warn', s.weight > s.capacity * 0.9);
  document.getElementById('stat-morale').textContent = s.moraleLabel();
  var moraleFill = document.getElementById('morale-fill');
  moraleFill.style.width = s.morale + '%';
  moraleFill.className = s.morale < 30 ? 'low' : (s.morale < 60 ? 'mid' : '');

  //update stackers position, running right to left
  var progress = Math.min(1, s.adoption / BitcoinH.FINAL_ADOPTION);
  var stackersElement = document.getElementById('stackers');
  stackersElement.style.left = 'calc(' + ((1 - progress) * 100) + '% - ' + ((1 - progress) * stackersElement.offsetWidth) + 'px)';
  //the fiat world gets its color back as adoption grows
  document.getElementById('trees-color').style.opacity = Math.min(1, progress * 1.1);
  //day and night cycle
  var night = (Math.sin(s.block / 60) + 1) / 2;
  document.getElementById('night').style.opacity = (night * 0.45).toFixed(2);
  document.getElementById('trail-fill').style.width = (progress * 100) + '%';

  var next = this.game.nextLandmark();
  document.getElementById('next-landmark').textContent = next ?
    'Next: ' + next.name + ' in ' + Math.max(0, Math.ceil(next.at - s.adoption)) : '';
  document.getElementById('era').textContent = 'Subsidy ' + this.game.subsidy() + ' sats | Halvings ' + this.game.halvings;
  document.querySelectorAll('#trail-marks .mark').forEach(function(mark) {
    mark.classList.toggle('passed', +mark.dataset.at <= s.adoption);
  });

  this.refreshControls();
};

BitcoinH.UI.refreshControls = function() {
  var s = this.stackers;
  document.getElementById('pace-btn').textContent = '< ' + s.getPace().name + ' >';
  document.getElementById('rations-btn').textContent = '< ' + s.getRations().name + ' >';
  var mineBtn = document.getElementById('mine-btn');
  var cooldown = this.game.mineCooldown();
  mineBtn.disabled = cooldown > 0 || !this.game.gameActive;
  mineBtn.textContent = cooldown > 0 ? 'Mine (' + cooldown + ')' : 'Mine a block';
  document.getElementById('pause-btn').textContent = this.game.userPaused ? 'Resume' : 'Pause';
};

/* ---------- modal panels ---------- */

BitcoinH.UI.openPanel = function(id) {
  document.getElementById('modal').classList.remove('hidden');
  document.querySelectorAll('#modal .panel').forEach(function(panel) {
    panel.classList.toggle('hidden', panel.id !== id);
  });
  BitcoinH.Sound.sfx('alert');
  var first = document.querySelector('#' + id + ' button:not([disabled])');
  if(first) first.focus({preventScroll: true});
};

BitcoinH.UI.closeModal = function() {
  document.getElementById('modal').classList.add('hidden');
  document.querySelectorAll('#modal .panel').forEach(function(panel) {
    panel.classList.add('hidden');
  });
};

BitcoinH.UI.modalOpen = function() {
  return !document.getElementById('modal').classList.contains('hidden');
};

//leave an event and get back on the trail
BitcoinH.UI.backToTrail = function() {
  this.closeModal();
  this.refreshStats();
  if(this.game.checkGameOver()) return;
  BitcoinH.Sound.music('sound-theme');
  this.game.resumeJourney();
};

//show attack
BitcoinH.UI.showAttack = function(zappower, gold, enemy) {
  //keep properties
  this.zappower = zappower;
  this.gold = gold;
  this.bribeCost = Math.round(gold * 1.5);
  document.getElementById('attack-title').textContent = enemy + ' attacks!';
  document.getElementById('attack-description').innerHTML =
    'Enemy zap resistance: <b>' + zappower + '</b><br>Your zappower: <b>' + this.stackers.zappower + '</b>' +
    '<br>Worst case casualties: <b>' + Math.max(0, Math.ceil(zappower * 2 - this.stackers.zappower)) + '</b> of ' + this.stackers.plebs + ' plebs';
  var bribe = document.getElementById('bribe');
  bribe.textContent = '2. Pay them off (' + this.bribeCost + ' sats)';
  bribe.disabled = this.stackers.sats < this.bribeCost;
  //init once
  if(!this.attackInitiated) {
    document.getElementById('fight').addEventListener('click', this.fight.bind(this));
    document.getElementById('bribe').addEventListener('click', this.bribe.bind(this));
    document.getElementById('runaway').addEventListener('click', this.runaway.bind(this));
    this.attackInitiated = true;
  }
  BitcoinH.Sound.music('sound-attack');
  BitcoinH.FX.shake();
  this.openPanel('attack');
};

//fight
BitcoinH.UI.fight = function(){
  var zappower = this.zappower;
  var gold = this.gold;
  var damage = Math.ceil(Math.max(0, zappower * 2 * Math.random() - this.stackers.zappower));
  BitcoinH.FX.bolt(document.getElementById('stats-area'), document.querySelector('#attack .enemy'));
  BitcoinH.FX.burst(document.querySelector('#attack .enemy'), '#fada5e', 40);
  BitcoinH.Sound.sfx('zap');
  //check there are survivors
  if(damage < this.stackers.plebs) {
    this.stackers.change('plebs', -damage);
    this.stackers.change('sats', gold);
    this.stackers.change('morale', 6);
    this.game.fightsWon++;
    if(damage) this.notify(damage + ' plebs were killed fighting.', 'negative');
    this.notify('You got some sweet sats for orange pilling that fool! ' + gold, 'positive');
    this.popStat('sats', gold);
    if(damage) this.popStat('plebs', -damage);
    if(this.stackers.occupation === 'educator' && Math.random() < 0.5) {
      var recruits = 1 + Math.floor(Math.random() * 3);
      this.stackers.change('plebs', recruits);
      this.notify('The enemy sees the light and ' + recruits + ' of them join your caravan!', 'positive');
    }
    if(this.game.fightsWon >= 5) BitcoinH.Achievements.unlock('orange_piller');
  }
  else {
    this.stackers.plebs = 0;
    this.game.deathCause = 'Orange pilled to death by the fiat mafia.';
  }
  this.backToTrail();
};

//pay them to go away
BitcoinH.UI.bribe = function(){
  if(this.stackers.sats < this.bribeCost) return;
  this.stackers.change('sats', -this.bribeCost);
  this.stackers.change('morale', -4);
  this.popStat('sats', -this.bribeCost);
  this.notify('You paid ' + this.bribeCost + ' sats in protection money. Feels like taxes.', 'negative');
  BitcoinH.Sound.sfx('coin');
  this.backToTrail();
};

//runing away from enemy
BitcoinH.UI.runaway = function(){
  var zappower = this.zappower;
  var damage = Math.floor(Math.max(0, zappower * Math.random()/4));
  this.game.ranAway = true;
  //check there are survivors
  if(damage < this.stackers.plebs) {
    this.stackers.change('plebs', -damage);
    this.stackers.change('morale', -5);
    this.notify(damage ? damage + ' plebs were killed running' : 'You got away clean. Nobody saw anything.', damage ? 'negative' : 'neutral');
    if(damage) this.popStat('plebs', -damage);
    BitcoinH.Sound.sfx('bad');
  }
  else {
    this.stackers.plebs = 0;
    this.game.deathCause = 'Everybody died running away.';
  }
  this.backToTrail();
};

//show shop
BitcoinH.UI.showShop = function(products, title){
  var shopDiv = document.getElementById('shop');
  //init the shop just once
  if(!this.shopInitiated) {
    //event delegation
    shopDiv.addEventListener('click', function(e){
      var target = e.target.closest('.product');
      if(target) {
        BitcoinH.UI.buyProduct({
          item: target.getAttribute('data-item'),
          qty: target.getAttribute('data-qty'),
          price: target.getAttribute('data-price')
        }, target);
      }
    });
    document.getElementById('leave-shop').addEventListener('click', function() {
      BitcoinH.UI.backToTrail();
    });
    this.shopInitiated = true;
  }
  document.getElementById('shop-title').textContent = title || 'Trading Post';
  //clear existing content
  var prodsDiv = document.getElementById('prods');
  prodsDiv.innerHTML = '';
  //show products
  products.forEach(function(product, i) {
    prodsDiv.innerHTML += '<button class="product option" data-qty="' + product.qty + '" data-item="' + product.item + '" data-price="' + product.price + '">' +
      (i + 1) + '. ' + product.qty + ' ' + product.item + ' - ' + product.price + ' sats</button>';
  });
  this.refreshShop();
  BitcoinH.Sound.music('sound-town');
  this.openPanel('shop');
};

BitcoinH.UI.refreshShop = function() {
  var sats = this.stackers.sats;
  document.getElementById('shop-sats').textContent = Math.floor(sats).toLocaleString();
  document.querySelectorAll('#prods .product').forEach(function(p) {
    p.classList.toggle('too-expensive', +p.getAttribute('data-price') > sats);
  });
};

//buy product
BitcoinH.UI.buyProduct = function(product, el) {
  //check we can afford it
  if(+product.price > this.stackers.sats) {
    this.notify('Not enough sats. Where is your proof of work!?', 'negative');
    BitcoinH.Sound.sfx('bad');
    return false;
  }
  this.stackers.sats -= +product.price;
  this.stackers[product.item] += +product.qty;
  this.notify('Bought ' + product.qty + ' x ' + product.item, 'positive');
  this.popStat(product.item, +product.qty);
  this.popStat('sats', -product.price);
  BitcoinH.Sound.sfx('coin');
  BitcoinH.FX.burst(el, '#f7931a', 12);
  //update weight
  this.stackers.updateWeight();
  //update visuals
  this.refreshStats();
  this.refreshShop();
  this.game.checkAchievements();
};

//decisions with several possible outcomes
BitcoinH.UI.showChoice = function(eventData) {
  var ui = this;
  document.getElementById('choice-title').textContent = eventData.title;
  document.getElementById('choice-text').textContent = eventData.text;
  var optionsDiv = document.getElementById('choice-options');
  optionsDiv.innerHTML = '';
  eventData.options.forEach(function(option, i) {
    var btn = document.createElement('button');
    btn.className = 'option';
    btn.textContent = (i + 1) + '. ' + option.label;
    btn.addEventListener('click', function() {
      var before = {};
      Object.keys(STAT_LABELS).forEach(function(k) { before[k] = ui.stackers[k]; });
      var result = option.outcome(ui.stackers);
      Object.keys(STAT_LABELS).forEach(function(k) { ui.popStat(k, ui.stackers[k] - before[k]); });
      ui.notify(result[0], result[1]);
      ui.toast(result[0], result[1]);
      BitcoinH.Sound.sfx(result[1] === 'negative' ? 'bad' : 'good');
      if(result[1] === 'negative') BitcoinH.FX.shake();
      if(ui.stackers.plebs <= 0) ui.game.deathCause = 'Your last pleb made a bad call at ' + eventData.title + '.';
      ui.stackers.updateWeight();
      ui.game.checkAchievements();
      ui.backToTrail();
    });
    optionsDiv.appendChild(btn);
  });
  this.openPanel('choice');
};

BitcoinH.UI.showTombstone = function(eventData) {
  var epitaphHtml = '';
  eventData.epitaph.forEach(function(line) {
    epitaphHtml += line.text + '<br>';
  });
  document.getElementById('epitaph').innerHTML = epitaphHtml;
  this.currentTombstoneLink = eventData.link;
  if(!this.tombstoneInitiated) {
    document.getElementById('payrespects').addEventListener('click', this.payrespects.bind(this));
    document.getElementById('continue').addEventListener('click', this.continue.bind(this));
    this.tombstoneInitiated = true;
  }
  this.openPanel('tombstone-wrap');
};
BitcoinH.UI.continue = function(){
  this.backToTrail();
};
BitcoinH.UI.payrespects = function(){
  BitcoinH.Achievements.unlock('respects');
  this.stackers.change('morale', 3);
  window.open(this.currentTombstoneLink);
};

//the end, one way or another
BitcoinH.UI.showGameOver = function(won, summary) {
  var s = this.stackers;
  var title = document.getElementById('gameover-title');
  title.textContent = won ? 'HYPERBITCOINIZED!' : 'GAME OVER';
  title.className = 'panel-title ' + (won ? 'win' : 'lose');
  var body = '';
  if(!won) {
    body += '<div id="tombstone" class="own"><div id="own-epitaph">Here lies<br><b>' + escapeHtml(summary.name) + '</b><br>' +
      escapeHtml(summary.occupationName) + '<br><br>' + escapeHtml(summary.cause) + '<br><br>Block ' + Math.ceil(s.block) + '</div></div>';
  } else {
    body += '<p>You achieved hyperbitcoinization. Good job. Get back to work.</p>';
  }
  body += '<table class="summary">' +
    '<tr><td>Blocks traveled</td><td>' + Math.ceil(s.block) + '</td></tr>' +
    '<tr><td>Adoption</td><td>' + Math.floor(Math.min(s.adoption, BitcoinH.FINAL_ADOPTION)) + '/' + BitcoinH.FINAL_ADOPTION + '</td></tr>' +
    '<tr><td>Surviving plebs</td><td>' + s.plebs + '</td></tr>' +
    '<tr><td>Ostriches</td><td>' + s.ostriches + '</td></tr>' +
    '<tr><td>Sats</td><td>' + Math.floor(s.sats).toLocaleString() + '</td></tr>' +
    '<tr><td>Fights won</td><td>' + this.game.fightsWon + '</td></tr>' +
    '<tr><td>Blocks mined</td><td>' + this.game.blocksMined + '</td></tr>' +
    '<tr><td>' + escapeHtml(summary.occupationName) + ' bonus</td><td>x' + summary.multiplier + '</td></tr>' +
    '<tr class="score"><td>SCORE</td><td>' + summary.score.toLocaleString() + '</td></tr>' +
    '</table>';
  if(summary.rank === 0) body += '<p class="new-high">NEW HIGH SCORE!</p>';
  document.getElementById('gameover-body').innerHTML = body;

  var newAch = BitcoinH.Achievements.newThisRun;
  document.getElementById('gameover-achievements').innerHTML = newAch.length ?
    'Unlocked: ' + newAch.map(function(k) { return '<span class="badge got">' + BitcoinH.Achievements.list[k].name + '</span>'; }).join(' ') : '';

  this.bragText = (won ? 'I reached hyperbitcoinization' : 'I died on The Bitcoin Trail') +
    ' as ' + summary.name + ' the ' + summary.occupationName + ' with a score of ' + summary.score.toLocaleString() +
    ' at block ' + Math.ceil(s.block) + '. ' + window.location.href;
  if(!this.gameoverInitiated) {
    document.getElementById('share').addEventListener('click', this.share.bind(this));
    document.getElementById('startover').addEventListener('click', function() { window.location.reload(); });
    this.gameoverInitiated = true;
  }
  this.openPanel('gameover');
};

BitcoinH.UI.share = function() {
  var btn = document.getElementById('share');
  var text = this.bragText;
  var done = function() { btn.textContent = 'Copied!'; };
  if(navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done, function() { window.prompt('Copy this:', text); });
  } else {
    window.prompt('Copy this:', text);
  }
};

/* ---------- keyboard ---------- */

document.addEventListener('keydown', function(e) {
  if(e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
  var game = BitcoinH.Game;
  var key = e.key.toLowerCase();
  if(!game.started) {
    if(key === 'enter' && e.target.tagName !== 'BUTTON') document.getElementById('start-form').requestSubmit();
    return;
  }
  //let focused buttons handle their own activation keys
  if(e.target.tagName === 'BUTTON' && (key === ' ' || key === 'enter')) return;

  //number keys pick options in whatever dialog is open
  if(BitcoinH.UI.modalOpen() && /^[1-9]$/.test(key)) {
    var panel = document.querySelector('#modal .panel:not(.hidden)');
    var btn = panel ? panel.querySelectorAll('button.option')[+key - 1] : null;
    if(btn && !btn.disabled) btn.click();
    return;
  }
  if(key === 's') { BitcoinH.Sound.toggleMute(); return; }
  if(BitcoinH.UI.modalOpen() || game.over) return;
  if(key === ' ') { e.preventDefault(); game.togglePause(); }
  else if(key === 'm') game.startMining();
  else if(key === 'p') game.cyclePace();
  else if(key === 'r') game.cycleRations();
});

/* ---------- title screen ---------- */

function showOccupationInfo() {
  var occupation = document.getElementById('occupation').value;
  var info = BitcoinH.OCCUPATION_INITIALS[occupation];
  var el = document.getElementById('occupation-info');
  if(occupation === 'altcoiner') {
    el.innerHTML = '<span class="bad">' + info.perk + '</span>';
    return;
  }
  el.innerHTML = '<div class="perk">' + info.perk + '</div>' +
    '<div class="occ-stats">' +
    'Plebs ' + info.plebs + ' &middot; Food ' + info.food + ' &middot; Ostriches ' + info.ostriches +
    '<br>Sats ' + info.sats + ' &middot; Zappower ' + info.zappower + ' &middot; Score x' + info.multiplier +
    '</div>';
}

document.addEventListener('DOMContentLoaded', () => {
    BitcoinH.Sound.init();
    BitcoinH.FX.init();
    BitcoinH.Achievements.load();
    BitcoinH.Achievements.render();
    BitcoinH.HighScores.render();
    showOccupationInfo();

    document.getElementById('occupation').addEventListener('change', showOccupationInfo);
    document.getElementById('random-nym').addEventListener('click', function() {
      var nyms = BitcoinH.RANDOM_NYMS;
      document.getElementById('player-name').value = nyms[Math.floor(Math.random() * nyms.length)];
      BitcoinH.Sound.sfx('blip');
    });
    document.getElementById('mute-btn').addEventListener('click', function() {
      BitcoinH.Sound.toggleMute();
    });

    const form = document.getElementById('start-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const playerName = document.getElementById('player-name').value.trim() || 'Satoshi Nakamoto';
        const occupation = document.getElementById('occupation').value;

        if (occupation.toLowerCase() === 'altcoiner') {
            window.location.href = 'https://www.youtube.com/watch?v=YxjY_YTksKM';
            return;
        }

        // Update player name and occupation in the top area
        document.getElementById('player-tag').textContent = playerName + " / " + BitcoinH.OCCUPATION_NAMES[occupation];

        // Hide the title screen and show main game content
        document.getElementById('title-screen').style.display = 'none';
        document.getElementById('journey').style.display = 'flex';
        document.getElementById('top').style.display = 'flex';

        BitcoinH.Sound.music('sound-theme');
        BitcoinH.Game.init(occupation, playerName);
    });
});

// Initial setup to hide the main content and show title screen
window.onload = () => {
    if(BitcoinH.Game.started) return;
    document.getElementById('journey').style.display = 'none'; // Hide game content initially
    document.getElementById('top').style.display = 'none';
    document.getElementById('title-screen').style.display = 'flex'; // Show title screen
};
