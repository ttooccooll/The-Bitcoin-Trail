var BitcoinH = BitcoinH || {};
BitcoinH.Stackers = {};

BitcoinH.PACES = [
  {name: 'Stroll',    speed: 0.75, morale: 0.02,  risk: 0},
  {name: 'Stack',     speed: 1,    morale: 0,     risk: 0},
  {name: 'Full Send', speed: 1.5,  morale: -0.06, risk: 0.004}
];
BitcoinH.RATIONS = [
  {name: 'Carnivore', food: 1.5, morale: 0.05},
  {name: 'Normal',    food: 1,   morale: 0},
  {name: 'Fasting',   food: 0.5, morale: -0.07}
];

BitcoinH.Stackers.init = function(stats){
  this.block = stats.block;
  this.adoption = stats.adoption;
  this.plebs = stats.plebs;
  this.food = stats.food;
  this.ostriches = stats.ostriches;
  this.sats = stats.sats;
  this.zappower = stats.zappower;
  this.morale = 70;
  this.pace = 1;
  this.rations = 1;
  this.weight = 0;
  this.capacity = 0;
};

BitcoinH.Stackers.getPace = function() {
  return BitcoinH.PACES[this.pace];
};

BitcoinH.Stackers.getRations = function() {
  return BitcoinH.RATIONS[this.rations];
};

//change a stat without going below zero, returns the actual change
BitcoinH.Stackers.change = function(stat, value) {
  var before = this[stat];
  this[stat] = Math.max(0, before + value);
  if(stat === 'morale') this.morale = Math.min(100, this.morale);
  return this[stat] - before;
};

//update weight and capacity
BitcoinH.Stackers.updateWeight = function(){
  let droppedFood = 0;
  let droppedLightningChannels = 0;
  //how much can the Stackers carry
  this.capacity = this.ostriches * BitcoinH.WEIGHT_PER_OSTRICH + this.plebs * BitcoinH.WEIGHT_PER_PERSON;
  //how much weight do we currently have
  this.weight = this.food * BitcoinH.FOOD_WEIGHT + this.zappower * BitcoinH.ZAPPOWER_WEIGHT;
  //drop things behind if it's too much weight
  //assume lightning channels get dropped before food
  while(this.zappower && this.capacity <= this.weight) {
    this.zappower--;
    this.weight -= BitcoinH.ZAPPOWER_WEIGHT;
    droppedLightningChannels++;
  }
  if(droppedLightningChannels) {
    this.ui.notify('Force closure of '+droppedLightningChannels+' lightning channels due to a lack of plebs or ostriches to operate them.', 'negative');
  }
  while(this.food >= 1 && this.capacity <= this.weight) {
    this.food--;
    this.weight -= BitcoinH.FOOD_WEIGHT;
    droppedFood++;
  }
  if(droppedFood) {
    this.ui.notify('Left '+droppedFood+' food provisions behind due to a lack of plebs or ostriches to carry them.', 'negative');
  }
};

//how fast are we going this block
BitcoinH.Stackers.speed = function() {
  //the closer to capacity, the slower
  let diff = this.capacity - this.weight;
  let speed = BitcoinH.SLOW_SPEED + (this.capacity ? diff/this.capacity : 0) * BitcoinH.FULL_SPEED;
  speed *= this.getPace().speed;
  //happy plebs walk faster
  speed *= 0.8 + this.morale / 250;
  if(this.occupation === 'nomad') speed *= 1.2;
  return Math.max(0.5, speed);
};

BitcoinH.Stackers.updateAdoption = function() {
  this.adoption += this.speed();
};

//food consumption
BitcoinH.Stackers.consumeFood = function() {
  this.food -= this.plebs * BitcoinH.FOOD_PER_PERSON * this.getRations().food;
  if(this.food < 0) {
    this.food = 0;
  }
};

//morale drifts with pace, rations and hunger
BitcoinH.Stackers.updateMorale = function() {
  var delta = this.getPace().morale + this.getRations().morale;
  if(this.occupation === 'pleb' && delta < 0.05) delta += 0.02;
  if(this.food < this.plebs * 2) delta -= 0.1;
  //morale slowly returns towards neutral
  if(this.morale < 50) delta += 0.01;
  this.morale = Math.max(0, Math.min(100, this.morale + delta));
};

//roughly how many blocks until the food runs out
BitcoinH.Stackers.blocksOfFood = function() {
  var perBlock = this.plebs * BitcoinH.FOOD_PER_PERSON * this.getRations().food;
  return perBlock ? Math.floor(this.food / perBlock) : Infinity;
};

BitcoinH.Stackers.moraleLabel = function() {
  if(this.morale >= 80) return 'Laser eyes';
  if(this.morale >= 60) return 'HODLing';
  if(this.morale >= 40) return 'Meh';
  if(this.morale >= 20) return 'Paper hands';
  return 'NGMI';
};
