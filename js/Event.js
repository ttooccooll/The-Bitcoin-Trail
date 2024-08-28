var BitcoinH = BitcoinH || {};

BitcoinH.Event = {};

BitcoinH.Event.eventTypes = [
    {
      type: 'STAT-CHANGE',
      notification: 'negative',
      stat: 'plebs',
      value: -3,
      text: 'Food intoxication. Casualties: '
    },
    {
        type: 'STAT-CHANGE',
        notification: 'negative',
        stat: 'plebs',
        value: -7,
        text: 'Many plebs die of dysentery. Casualties: '
    },
    {
      type: 'STAT-CHANGE',
      notification: 'negative',
      stat: 'plebs',
      value: -4,
      text: 'Covid outbreak. Casualties: '
    },
    {
      type: 'STAT-CHANGE',
      notification: 'negative',
      stat: 'food',
      value: -10,
      text: 'Worm infestation. Food lost: '
    },
    {
      type: 'STAT-CHANGE',
      notification: 'negative',
      stat: 'sats',
      value: -100,
      text: 'Rug Pull! Get those sats in self-custody next time! Sats lost: '
    },
    {
      type: 'STAT-CHANGE',
      notification: 'negative',
      stat: 'ostriches',
      value: -1,
      text: 'Ostrich flu outbreak. Casualties: '
    },
    {
        type: 'STAT-CHANGE',
        notification: 'positive',
        stat: 'zappower',
        value: -10,
        text: 'FORCE CLOSE! Zappower lost: '
      },
    {
      type: 'STAT-CHANGE',
      notification: 'positive',
      stat: 'food',
      value: 20,
      text: 'Found wild berries. Food added: '
    },
    {
      type: 'STAT-CHANGE',
      notification: 'positive',
      stat: 'food',
      value: -20,
      text: 'Food seized by the government. Good thing they cannot take your bitcoin. Food lost: '
    },
    {
      type: 'STAT-CHANGE',
      notification: 'positive',
      stat: 'ostriches',
      value: 1,
      text: 'Found wild nostriches. New ostriches: '
    },
    {
        type: 'STAT-CHANGE',
        notification: 'positive',
        stat: 'zappower',
        value: 10,
        text: 'Batch opened a top of lightning channels. New zappower: '
      },
    {
        type: 'SHOP',
        notification: 'neutral',
        text: 'You have arrived at Bitcoin Beach! Pick up some supplies while you can.',
        products: [
            {item: 'food', qty: 20, price: 50},
            {item: 'ostriches', qty: 1, price: 200},
            {item: 'zappower', qty: 2, price: 50},
            {item: 'plebs', qty: 5, price: 80}
        ]
        },
        {
        type: 'SHOP',
        notification: 'neutral',
        text: 'You made it to Bitcoin Park! Pick up some lightning channels while you are here.',
        products: [
            {item: 'food', qty: 30, price: 50},
            {item: 'ostriches', qty: 1, price: 200},
            {item: 'zappower', qty: 2, price: 20},
            {item: 'plebs', qty: 10, price: 80}
        ]
        },
        {
        type: 'SHOP',
        notification: 'neutral',
        text: 'You made it to the Bitcoin Commons. Yee-haw! Pick up some gear.',
        products: [
            {item: 'food', qty: 20, price: 60},
            {item: 'ostriches', qty: 1, price: 300},
            {item: 'zappower', qty: 2, price: 80},
            {item: 'plebs', qty: 5, price: 60}
        ]
        },
    {
        type: 'ATTACK',
        notification: 'negative',
        text: 'Shit-coiners are attacking you'
      },
      {
        type: 'ATTACK',
        notification: 'negative',
        text: 'Elizabeth Warren is attacking you'
      },
      {
        type: 'ATTACK',
        notification: 'negative',
        text: 'CSW is attacking you'
      }
  ];
  
  BitcoinH.Event.generateEvent = function(){
    //pick random one
    var eventIndex = Math.floor(Math.random() * this.eventTypes.length);
    var eventData = this.eventTypes[eventIndex];
  
    //events that consist in updating a stat
    if(eventData.type == 'STAT-CHANGE') {
      this.stateChangeEvent(eventData);
    }

      //shops
    else if(eventData.type == 'SHOP') {
        //pause game
        this.game.pauseJourney();
        //notify user
        this.ui.notify(eventData.text, eventData.notification);
        //prepare event
        this.shopEvent(eventData);
    }

      //attacks
    else if(eventData.type == 'ATTACK') {
        //pause game
        this.game.pauseJourney();

        //notify user
        this.ui.notify(eventData.text, eventData.notification);

        //prepare event
        this.attackEvent(eventData);
    }
  };
  
  BitcoinH.Event.stateChangeEvent = function(eventData) {
    //can't have negative quantities
    if(eventData.value + this.stackers[eventData.stat] >= 0) {
      this.stackers[eventData.stat] += eventData.value;
      this.ui.notify(eventData.text + Math.abs(eventData.value), eventData.notification);
    }
  };

  BitcoinH.Event.shopEvent = function(eventData) {
    //number of products for sale
    var numProds = Math.ceil(Math.random() * 4);
    //product list
    var products = [];
    var j, priceFactor;
    for(var i = 0; i < numProds; i++) {
      //random product
      j = Math.floor(Math.random() * eventData.products.length);
      //multiply price by random factor +-30%
      priceFactor = 0.7 + 0.6 * Math.random();
      products.push({
        item: eventData.products[j].item,
        qty: eventData.products[j].qty,
        price: Math.round(eventData.products[j].price * priceFactor)
      });
    }
    this.ui.showShop(products);
  };

  //prepare an attack event
  BitcoinH.Event.attackEvent = function(eventData){
    var zappower = Math.round((0.7 + 0.6 * Math.random()) * BitcoinH.ENEMY_ZAPPOWER_AVG);
    var gold = Math.round((0.7 + 0.6 * Math.random()) * BitcoinH.ENEMY_GOLD_AVG);
  
    this.ui.showAttack(zappower, gold);
  };