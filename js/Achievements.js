var BitcoinH = BitcoinH || {};

//achievements persist across runs in localStorage
BitcoinH.Achievements = {
  list: {
    first_steps:   {name: 'Tick Tock Next Block', desc: 'Start your first journey.'},
    hyperbitcoinization: {name: 'Hyperbitcoinized', desc: 'Reach the end of the trail.'},
    full_send:     {name: 'Full Send', desc: 'Win at Full Send pace.'},
    diamond_hands: {name: 'Diamond Hands', desc: 'Win without ever running away.'},
    whale:         {name: 'Whale Alert', desc: 'Hold 5,000 sats at once.'},
    rancher:       {name: 'Ostrich Rancher', desc: 'Own 20 ostriches.'},
    solo_miner:    {name: 'Solo Miner', desc: 'Find a block in the mining minigame.'},
    pool_operator: {name: 'Pool Operator', desc: 'Find 5 blocks in one journey.'},
    orange_piller: {name: 'Orange Piller', desc: 'Win 5 fights in one journey.'},
    pizza:         {name: 'Pizza Day', desc: 'Buy the pizzas.'},
    self_custody:  {name: 'Not Your Keys', desc: 'Refuse to deposit on Mt. Gox.'},
    small_blocker: {name: 'Small Blocker', desc: 'Win the Blocksize Wars.'},
    stay_humble:   {name: 'Stay Humble', desc: 'Skip the shortcut through Shitcoin Canyon.'},
    rekt:          {name: 'Rekt', desc: 'Fall for a giveaway scam.'},
    respects:      {name: 'F', desc: 'Pay your respects at a tombstone.'},
    halvening:     {name: 'Halvening', desc: 'Survive 3 halvings.'},
    starved:       {name: 'Intermittent Forever', desc: 'Starve to death.'},
    lone_wolf:     {name: 'Lone Wolf', desc: 'Win as a Nomad.'}
  },
  unlocked: {},
  newThisRun: [],

  load: function() {
    try {
      this.unlocked = JSON.parse(localStorage.getItem('bt-achievements')) || {};
    } catch (e) {
      this.unlocked = {};
    }
  },

  save: function() {
    try {
      localStorage.setItem('bt-achievements', JSON.stringify(this.unlocked));
    } catch (e) {}
  },

  unlock: function(key) {
    if(!this.list[key] || this.unlocked[key]) return;
    this.unlocked[key] = true;
    this.newThisRun.push(key);
    this.save();
    //the game over screen lists them, so no toast there
    if(BitcoinH.UI && BitcoinH.UI.toast && !BitcoinH.Game.over) {
      BitcoinH.UI.toast('Achievement unlocked: ' + this.list[key].name);
      BitcoinH.Sound.sfx('coin');
    }
  },

  count: function() {
    return Object.keys(this.unlocked).filter(function(k) { return this.list[k]; }, this).length;
  },

  render: function() {
    var el = document.getElementById('achievement-list');
    if(!el) return;
    var html = '';
    Object.keys(this.list).forEach(function(key) {
      var a = this.list[key];
      var got = this.unlocked[key];
      html += '<span class="badge' + (got ? ' got' : '') + '" title="' + a.desc + '">' + (got ? a.name : '???') + '</span>';
    }, this);
    el.innerHTML = html;
    document.getElementById('ach-count').textContent = this.count() + '/' + Object.keys(this.list).length;
  }
};

//top scores, also in localStorage
BitcoinH.HighScores = {
  load: function() {
    try {
      return JSON.parse(localStorage.getItem('bt-highscores')) || [];
    } catch (e) {
      return [];
    }
  },

  add: function(entry) {
    var scores = this.load();
    scores.push(entry);
    scores.sort(function(a, b) { return b.score - a.score; });
    scores = scores.slice(0, 5);
    try {
      localStorage.setItem('bt-highscores', JSON.stringify(scores));
    } catch (e) {}
    return scores.indexOf(entry);
  },

  render: function() {
    var el = document.getElementById('high-scores');
    if(!el) return;
    var scores = this.load();
    if(!scores.length) {
      el.innerHTML = '<li class="empty">No legends yet. Be the first.</li>';
      return;
    }
    el.innerHTML = scores.map(function(s) {
      var name = document.createElement('span');
      name.textContent = s.name;
      return '<li><span class="hs-name">' + name.innerHTML + (s.won ? ' ₿' : '') + '</span><span class="hs-score">' + s.score.toLocaleString() + '</span></li>';
    }).join('');
  }
};
