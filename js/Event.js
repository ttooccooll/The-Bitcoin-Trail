var BitcoinH = BitcoinH || {};

BitcoinH.Event = {};

BitcoinH.Event.eventTypes = [

      {
        type: 'TOMBSTONE',
        notification: 'neutral',
        text: 'You have come accross the tombstone of <a href="https://stacker.news/OneOneSeven" target="_blank">@OneOneSeven</a>',
        epitaph: [
          {text: 'Here lies <a href="https://stacker.news/OneOneSeven" target="_blank">@OneOneSeven</a></br>'},
          {text: 'Loving territory founder of <a href="https://stacker.news/~charts_and_numbers" target="_blank">charts_and_numbers</a> and <a href="https://stacker.news/~aliens_and_UFOs" target="_blank">aliens_and_UFOs</a></br>'},
          {text: '"I’ll see you in another life brother"'}
        ]
      },
  ];
  
  BitcoinH.Event.generateEvent = function(){
    var eventIndex = Math.floor(Math.random() * this.eventTypes.length);
    var eventData = this.eventTypes[eventIndex];
    if(eventData.type == 'STAT-CHANGE') {
      this.stateChangeEvent(eventData);
    }
    else if(eventData.type == 'SHOP') {
        this.game.pauseJourney();
        this.ui.notify(eventData.text, eventData.notification);
        this.shopEvent(eventData);
    }
    else if(eventData.type == 'ATTACK') {
        this.game.pauseJourney();
        this.ui.notify(eventData.text, eventData.notification);
        this.attackEvent(eventData);
    }
    else if(eventData.type == 'NEWS') {
        this.ui.notify(eventData.text, eventData.notification);
    }
    else if(eventData.type == 'TOMBSTONE') {
      this.game.pauseJourney();
      this.ui.notify(eventData.text, eventData.notification);
      this.tombstoneEvent(eventData);
  }
  };
  
  BitcoinH.Event.stateChangeEvent = function(eventData) {
    if(eventData.value + this.stackers[eventData.stat] >= 0) {
      this.stackers[eventData.stat] += eventData.value;
      this.ui.notify(eventData.text + Math.abs(eventData.value), eventData.notification);
    }
  };

  BitcoinH.Event.shopEvent = function(eventData) {
    var products = eventData.products.map(function(product) {
      var priceFactor = 0.7 + 0.6 * Math.random();
      return {
        item: product.item,
        qty: product.qty,
        price: Math.round(product.price * priceFactor)
      };
    });
    this.ui.showShop(products);
  };

  BitcoinH.Event.attackEvent = function(eventData){
    var zappower = Math.round((0.7 + 0.6 * Math.random()) * BitcoinH.ENEMY_ZAPPOWER_AVG);
    var gold = Math.round((0.7 + 0.6 * Math.random()) * BitcoinH.ENEMY_GOLD_AVG);
    this.ui.showAttack(zappower, gold);
  };

  BitcoinH.Event.tombstoneEvent = function(eventData){
    this.ui.showTombstone(eventData);
  };