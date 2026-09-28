var BitcoinH = BitcoinH || {};
BitcoinH.Stackers = {};

BitcoinH.TRAIL_LENGTH = 2100;
BitcoinH.WAGON_FOOD_LIMIT = 2000;

BitcoinH.PACES = [
  {name: 'steady', miles: 12, health: 0},
  {name: 'strenuous', miles: 16, health: -1},
  {name: 'grueling', miles: 20, health: -2.5}
];
BitcoinH.RATIONS = [
  {name: 'filling', pounds: 3, health: 1},
  {name: 'meager', pounds: 2, health: 0},
  {name: 'bare bones', pounds: 1, health: -2}
];
BitcoinH.WEATHERS = ['very cold', 'cold', 'cool', 'warm', 'hot', 'very hot'];
BitcoinH.ILLNESSES = [
  'dysentery', 'cholera', 'typhoid fever', 'measles', 'exhaustion', 'a fever',
  'a broken arm', 'a broken leg', 'a snakebite',
  'a case of FUD', 'FOMO', 'shitcoin fever', 'leverage poisoning', 'laser-eye strain'
];
BitcoinH.PARTS = {
  drive: 'hard drive',
  pi: 'raspberry pi',
  psu: 'power supply'
};

BitcoinH.Stackers.init = function(occupation, names, month) {
  this.occupation = occupation;
  this.members = names.map(function(name) {
    return {name: name, alive: true, sick: null};
  });
  this.plebs = occupation.plebs;
  this.sats = occupation.sats;
  this.ostriches = 0;
  this.food = 0;
  this.hats = 0;
  this.zaps = 0;
  this.parts = {drive: 0, pi: 0, psu: 0};
  this.health = 80;
  this.pace = 0;
  this.rations = 0;
  this.miles = 0;
  //journey starts on the first of the chosen month, 2009
  this.date = new Date(2009, month, 1);
};

BitcoinH.Stackers.alive = function() {
  return this.members.filter(function(m) { return m.alive; });
};

BitcoinH.Stackers.leader = function() {
  return this.members[0];
};

BitcoinH.Stackers.getPace = function() {
  return BitcoinH.PACES[this.pace];
};

BitcoinH.Stackers.getRations = function() {
  return BitcoinH.RATIONS[this.rations];
};

//change a supply without going below zero, returns the actual change
BitcoinH.Stackers.change = function(stat, value) {
  var before = this[stat];
  var after = Math.max(0, before + value);
  if(stat === 'health') after = Math.min(100, after);
  if(stat === 'food') after = Math.min(BitcoinH.WAGON_FOOD_LIMIT, after);
  this[stat] = after;
  return after - before;
};

BitcoinH.Stackers.healthLabel = function() {
  if(this.health >= 70) return 'good';
  if(this.health >= 50) return 'fair';
  if(this.health >= 30) return 'poor';
  return 'very poor';
};

//the block height on a given day, ten minutes a block since January 3, 2009
BitcoinH.Stackers.blockHeight = function() {
  var genesis = new Date(2009, 0, 3);
  return Math.max(0, Math.floor((this.date - genesis) / 600000));
};

BitcoinH.Stackers.dateString = function() {
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
  return months[this.date.getMonth()] + ' ' + this.date.getDate() + ', ' + this.date.getFullYear();
};

//miles covered in one day of travel
BitcoinH.Stackers.milesPerDay = function() {
  if(this.ostriches <= 0) return 0;
  var miles = this.getPace().miles * Math.min(1, 0.5 + this.ostriches / 8);
  if(this.health < 30) miles *= 0.75;
  if(this.occupation.key === 'nomad') miles *= 1.1;
  return Math.round(miles);
};

BitcoinH.Stackers.foodPerDay = function() {
  return this.alive().length * this.getRations().pounds;
};

//temperature follows the seasons, and it is colder up in the mountains
BitcoinH.Stackers.rollWeather = function() {
  var byMonth = [0, 0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0];
  var temp = byMonth[this.date.getMonth()];
  if((this.miles > 900 && this.miles < 1300) || (this.miles > 1650 && this.miles < 1900)) temp -= 1;
  temp += Math.floor(Math.random() * 3) - 1;
  this.weather = BitcoinH.WEATHERS[Math.max(0, Math.min(5, temp))];
  return this.weather;
};

//a day passes: eat, get healthier or sicker. Returns messages worth stopping for.
BitcoinH.Stackers.passDay = function(resting) {
  var messages = [];
  var party = this.alive();
  this.date = new Date(this.date.getTime() + 86400000);
  this.rollWeather();

  //eat
  var needed = this.foodPerDay();
  var hungry = this.food < needed;
  this.food = Math.max(0, this.food - needed);

  //health drifts with pace, rations, weather and illness
  var delta = 0.5 + this.getRations().health;
  if(!resting) delta += this.getPace().health;
  else delta += 3;
  if(hungry) delta -= 8;
  if(this.weather === 'very cold' || this.weather === 'cold') {
    if(this.hats < party.length) delta -= this.weather === 'very cold' ? 3 : 1.5;
  }
  if(this.weather === 'very hot') delta -= 1;
  var sick = party.filter(function(m) { return m.sick; }).length;
  delta -= sick * 0.6;
  this.change('health', delta);

  //miners get paid every day
  if(this.occupation.key === 'miner') this.sats += 10;

  //illness comes and goes
  var chance = 0.012 + (100 - this.health) / 100 * 0.05;
  if(Math.random() < chance) {
    var healthy = party.filter(function(m) { return !m.sick; });
    if(healthy.length) {
      var victim = healthy[Math.floor(Math.random() * healthy.length)];
      var illness = BitcoinH.ILLNESSES[Math.floor(Math.random() * BitcoinH.ILLNESSES.length)];
      victim.sick = {illness: illness, days: 5 + Math.floor(Math.random() * 8)};
      messages.push(victim.name + ' has ' + illness + '.');
    }
  }
  party.forEach(function(m) {
    if(!m.sick) return;
    var deathChance = this.health < 30 ? 0.08 : (this.health < 50 ? 0.03 : 0.006);
    if(resting) deathChance /= 2;
    if(Math.random() < deathChance) {
      m.alive = false;
      messages.push(m.name + ' has died of ' + m.sick.illness + '.');
      return;
    }
    m.sick.days -= resting ? 2 : 1;
    if(m.sick.days <= 0) {
      m.sick = null;
      messages.push(m.name + ' is well again.');
    }
  }, this);

  //starvation takes the weakest
  if(hungry && this.health < 15 && Math.random() < 0.25) {
    var alive = this.alive();
    if(alive.length) {
      var starved = alive[Math.floor(Math.random() * alive.length)];
      starved.alive = false;
      messages.push(starved.name + ' has died of starvation.');
    }
  }
  if(hungry && this.food === 0 && !this.warnedHungry) {
    messages.unshift('You have run out of food.');
    this.warnedHungry = true;
  }
  if(!hungry) this.warnedHungry = false;
  return messages;
};

//someone in the party dies right now (fights, rivers, rapids)
BitcoinH.Stackers.killRandom = function() {
  var alive = this.alive();
  if(!alive.length) return null;
  var victim = alive[Math.floor(Math.random() * alive.length)];
  victim.alive = false;
  return victim;
};
