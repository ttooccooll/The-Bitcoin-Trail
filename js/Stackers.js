var BitcoinH = BitcoinH || {};
BitcoinH.Stackers = {};
BitcoinH.Stackers.init = function(stats){
  this.block = stats.block;
  this.distance = stats.distance;
  this.crew = stats.crew;
  this.food = stats.food;
  this.oxen = stats.oxen;
  this.sats = stats.sats;
  this.zappower = stats.zappower;
};
//update weight and capacity
BitcoinH.Stackers.updateWeight = function(){
  let droppedFood = 0;
  let droppedLightningChannels = 0;
  //how much can the Stackers carry
  this.capacity = this.oxen * BitcoinH.WEIGHT_PER_OX + this.crew * BitcoinH.WEIGHT_PER_PERSON;
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
    this.ui.notify('Force closure of '+droppedLightningChannels+' lightning channels', 'negative');
  }
  while(this.food && this.capacity <= this.weight) {
    this.food--;
    this.weight -= BitcoinH.FOOD_WEIGHT;
    droppedFood++;
  }
  if(droppedFood) {
    this.ui.notify('Left '+droppedFood+' food provisions behind', 'negative');
  }
};
//update covered distance
BitcoinH.Stackers.updateDistance = function() {
  //the closer to capacity, the slower
  let diff = this.capacity - this.weight;
  let speed = BitcoinH.SLOW_SPEED + diff/this.capacity * BitcoinH.FULL_SPEED;
  this.distance += speed;
};
//food consumption
BitcoinH.Stackers.consumeFood = function() {
  this.food -= this.crew * BitcoinH.FOOD_PER_PERSON;
  if(this.food < 0) {
    this.food = 0;
  }
};