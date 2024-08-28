var BitcoinH = BitcoinH || {};
//constants
BitcoinH.WEIGHT_PER_OX = 20;
BitcoinH.WEIGHT_PER_PERSON = 2;
BitcoinH.FOOD_WEIGHT = 0.6;
BitcoinH.ZAPPOWER_WEIGHT = 5;
BitcoinH.GAME_SPEED = 800;
BitcoinH.BLOCK_PER_STEP = 0.2;
BitcoinH.FOOD_PER_PERSON = 0.02;
BitcoinH.FULL_SPEED = 5;
BitcoinH.SLOW_SPEED = 3;
BitcoinH.FINAL_DISTANCE = 1000;
BitcoinH.EVENT_PROBABILITY = 0.15;
BitcoinH.ENEMY_ZAPPOWER_AVG = 5;
BitcoinH.ENEMY_GOLD_AVG = 50;
BitcoinH.Game = {};
//initiate the game
BitcoinH.Game.init = function(){
  //reference ui
  this.ui = BitcoinH.UI;
  //reference event manager
  this.eventManager = BitcoinH.Event;
  //setup stackers
  this.stackers = BitcoinH.Stackers;
  this.stackers.init({
    block: 1,
    distance: 0,
    crew: 30,
    food: 80,
    oxen: 2,
    sats: 300,
    zappower: 1,
  });
  //pass references
  this.stackers.ui = this.ui;
  this.stackers.eventManager = this.eventManager;
  this.ui.game = this;
  this.ui.stackers = this.stackers;
  this.ui.eventManager = this.eventManager;
  this.eventManager.game = this;
  this.eventManager.stackers = this.stackers;
  this.eventManager.ui = this.ui;
  //begin adventure!
  this.startJourney();
};
//start the journey and time starts running
BitcoinH.Game.startJourney = function() {
  this.gameActive = true;
  this.previousTime = null;
  this.ui.notify('Chancellor on brink of second bailout for banks! Rush to hyperbitcoinization before the national debt falls on you.', 'positive');
  this.step();
};
//game loop
BitcoinH.Game.step = function(timestamp) {
  //starting, setup the previous time for the first time
  if(!this.previousTime){
    this.previousTime = timestamp;
    this.updateGame();
  }
  //time difference
  var progress = timestamp - this.previousTime;
  //game update
  if(progress >= BitcoinH.GAME_SPEED) {
    this.previousTime = timestamp;
    this.updateGame();
  }
  
  //we use "bind" so that we can refer to the context "this" inside of the step method
  if(this.gameActive) window.requestAnimationFrame(this.step.bind(this));
};
//update game stats
BitcoinH.Game.updateGame = function() {
  //block update
  this.stackers.block += BitcoinH.BLOCK_PER_STEP;
  //food consumption
  this.stackers.consumeFood();
  
  //game over no food
  if(this.stackers.food === 0) {
    this.ui.notify('Your stackers starved to death', 'negative');
    this.gameActive = false;
    return;
  }
  //update weight
  this.stackers.updateWeight();
  //update progress
  this.stackers.updateDistance();
  //show stats
  this.ui.refreshStats();
  //check if everyone died
  if(this.stackers.crew <= 0) {
    this.stackers.crew = 0;
    this.ui.notify('Everybody Died!!! You lose...your cowboy hat!', 'negative');
    this.gameActive = false;
    return;
  }
  //check win game
  if(this.stackers.distance >= BitcoinH.FINAL_DISTANCE) {
    this.ui.notify('You have returned home!', 'positive');
    this.gameActive = false;
    return;
  }
  //random events
  if(Math.random() <= BitcoinH.EVENT_PROBABILITY) {
    this.eventManager.generateEvent();
  }
  
};
//pause the journey
BitcoinH.Game.pauseJourney = function() {
  this.gameActive = false;
};
//resume the journey
BitcoinH.Game.resumeJourney = function() {
  this.gameActive = true;
  this.step();
};
//init game
BitcoinH.Game.init();