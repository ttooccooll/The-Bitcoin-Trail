var BitcoinH = BitcoinH || {};

BitcoinH.Event = {};

BitcoinH.Event.eventTypes = [
    {
      type: 'STAT-CHANGE',
      notification: 'negative',
      stat: 'plebs',
      value: -5,
      text: 'You ate food with pesticides on it. Casualties: '
    },
    {
      type: 'STAT-CHANGE',
      notification: 'negative',
      stat: 'plebs',
      value: -13,
      text: 'Many plebs die of dysentery. Hey, it is an Oregon Train parody. What do you want?! Casualties: '
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
      stat: 'plebs',
      value: 50,
      text: 'NGU! Oh no, now everyone wants to be a bitcoiner. New plebs: '
    },
    {
      type: 'STAT-CHANGE',
      notification: 'negative',
      stat: 'food',
      value: -20,
      text: 'You just found out that much of your "food" bought from big ag was full of high fructose corn syrup. Food lost: '
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
      stat: 'ostriches',
      value: 2,
      text: 'You spun up a new relay. New nostriches: '
    },
    {
      type: 'STAT-CHANGE',
      notification: 'negative',
      stat: 'zappower',
      value: -20,
      text: 'FORCE CLOSE! Zappower lost: '
    },
    {
      type: 'STAT-CHANGE',
      notification: 'positive',
      stat: 'food',
      value: 1,
      text: 'Just for fun, you eat zee bugs. Food added: '
    },
    {
      type: 'STAT-CHANGE',
      notification: 'negative',
      stat: 'food',
      value: -40,
      text: 'Food seized by the government. Good thing they cannot take your bitcoin. Food lost: '
    },
    {
      type: 'STAT-CHANGE',
      notification: 'positive',
      stat: 'food',
      value: 50,
      text: 'You start your own homestead. Food added: '
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
        value: 20,
        text: 'Batch opened a ton of lightning channels. New zappower: '
      },
      {
        type: 'STAT-CHANGE',
        notification: 'negative',
        stat: 'zappower',
        value: -5,
        text: 'Power outage! Node offline! Zappower lost: '
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
          text: 'You have arrived at Lugano! Pick up some supplies while you can.',
          products: [
              {item: 'food', qty: 40, price: 150},
              {item: 'ostriches', qty: 2, price: 450},
              {item: 'zappower', qty: 4, price: 150},
              {item: 'plebs', qty: 10, price: 180}
          ]
          },
          {
            type: 'SHOP',
            notification: 'neutral',
            text: 'You have arrived at Riga! Pick up some supplies while you can.',
            products: [
                {item: 'food', qty: 10, price: 50},
                {item: 'ostriches', qty: 1, price: 225},
                {item: 'zappower', qty: 2, price: 75},
                {item: 'plebs', qty: 5, price: 90}
            ]
            },
        {
          type: 'SHOP',
          notification: 'neutral',
          text: 'You have arrived at Bitcoin Jungle! Pick up some supplies while you can.',
          products: [
              {item: 'food', qty: 30, price: 50},
              {item: 'ostriches', qty: 2, price: 200},
              {item: 'zappower', qty: 2, price: 30},
              {item: 'plebs', qty: 5, price: 90}
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
        text: 'A shit-coiner is attacking you'
      },
      {
        type: 'ATTACK',
        notification: 'negative',
        text: 'Elizabeth Warren is attacking you'
      },
      {
        type: 'ATTACK',
        notification: 'negative',
        text: 'Craig Wright is attacking you'
      },
      {
        type: 'ATTACK',
        notification: 'negative',
        text: 'Jamie Diamond is attacking you'
      },
      {
        type: 'ATTACK',
        notification: 'negative',
        text: 'Jerome Powell is attacking you'
      },
      {
        type: 'ATTACK',
        notification: 'negative',
        text: 'The IMF is attacking you'
      },
      {
        type: 'ATTACK',
        notification: 'negative',
        text: 'Janet Yellen is attacking you'
      },
      {
        type: 'NEWS',
        notification: 'neutral',
        text: 'JP Morgan Bank fails.'
      },
      {
        type: 'NEWS',
        notification: 'neutral',
        text: 'The Bank of New York Mellon fails.'
      },
      {
        type: 'NEWS',
        notification: 'neutral',
        text: 'New York Community Bank fails.'
      },
      {
        type: 'NEWS',
        notification: 'neutral',
        text: 'Fifth Third Bank fails.'
      },
      {
        type: 'NEWS',
        notification: 'neutral',
        text: 'Huntington Bank fails.'
      },
      {
        type: 'NEWS',
        notification: 'neutral',
        text: 'Wells Fargo Bank fails.'
      },
      {
        type: 'NEWS',
        notification: 'neutral',
        text: 'Argentina recognizes bitcoin as legal tender.'
      },
      {
        type: 'NEWS',
        notification: 'neutral',
        text: 'Mexico recognizes bitcoin as legal tender.'
      },
      {
        type: 'NEWS',
        notification: 'neutral',
        text: 'Microstrategy bought more bitcoin. Blah blah blah'
      },
      {
        type: 'NEWS',
        notification: 'neutral',
        text: 'Switzerland recognizes bitcoin as legal tender.'
      },
      {
        type: 'NEWS',
        notification: 'neutral',
        text: 'Bhutan recognizes bitcoin as legal tender.'
      },
      {
        type: 'NEWS',
        notification: 'neutral',
        text: 'Singapore recognizes bitcoin as legal tender.'
      },
      {
        type: 'NEWS',
        notification: 'neutral',
        text: 'Bank of America fails.'
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
    else if(eventData.type == 'NEWS') {
        //notify user
        this.ui.notify(eventData.text, eventData.notification);
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