var BitcoinH = BitcoinH || {};

BitcoinH.WEIGHT_PER_OSTRICH = 20;
BitcoinH.WEIGHT_PER_PERSON = 1;
BitcoinH.FOOD_WEIGHT = 0.5;
BitcoinH.ZAPPOWER_WEIGHT = 4;
BitcoinH.GAME_SPEED = 80;
BitcoinH.BLOCK_PER_STEP = 1;
BitcoinH.FOOD_PER_PERSON = 0.014;
BitcoinH.FULL_SPEED = 5;
BitcoinH.SLOW_SPEED = 3;
BitcoinH.FINAL_ADOPTION = 10000;
BitcoinH.EVENT_PROBABILITY = 0.05;
BitcoinH.ENEMY_ZAPPOWER_AVG = 5;
BitcoinH.ENEMY_GOLD_AVG = 50;
BitcoinH.Game = {};

BitcoinH.Game.init = function(){
  var occupation = document.getElementById("occupation").value;
  let initialValues = BitcoinH.OCCUPATION_INITIALS[occupation]
  this.ui = BitcoinH.UI;
  this.eventManager = BitcoinH.Event;
  this.stackers = BitcoinH.Stackers;
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
  this.stackers.ui = this.ui;
  this.stackers.eventManager = this.eventManager;
  this.ui.game = this;
  this.ui.stackers = this.stackers;
  this.ui.eventManager = this.eventManager;
  this.eventManager.game = this;
  this.eventManager.stackers = this.stackers;
  this.eventManager.ui = this.ui;
  this.startJourney();
};
//start the journey and time starts running
BitcoinH.Game.startJourney = function() {
  this.gameActive = true;
  this.previousTime = null;
  this.ui.notify('Chancellor on brink of second bailout for banks!', 'negative');
  this.ui.notify('Rush to hyperbitcoinization before the national debt falls on you.', 'neutral');
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
  
  //use "bind" to refer to the context "this" inside of the step method
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
    this.ui.notify('Your stackers starved to death. You lose...your cowboy hat!', 'negative');
    this.gameActive = false;
    var gameoverDiv = document.getElementById('gameover');
    gameoverDiv.classList.remove('hidden');
    return;
  };
  //update weight
  this.stackers.updateWeight();
  //update progress
  this.stackers.updateAdoption();
  //show stats
  this.ui.refreshStats();
  //check if everyone died
  if(this.stackers.crew <= 0) {
    this.stackers.crew = 0;
    this.ui.notify('Everybody Died!!! You lose...your cowboy hat!', 'negative');
    this.gameActive = false;
    var gameoverDiv = document.getElementById('gameover');
    gameoverDiv.classList.remove('hidden');
    return;
  }
  //check win game
  if(this.stackers.adoption >= BitcoinH.FINAL_ADOPTION) {
    this.ui.notify('You achieved hyperbitcoinization. Good job. Get back to work.', 'positive');
    this.gameActive = false;
    var gameoverDiv = document.getElementById('gameover');
    gameoverDiv.classList.remove('hidden');
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