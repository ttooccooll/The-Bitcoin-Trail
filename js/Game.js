var BitcoinH = BitcoinH || {};

BitcoinH.DAY_MS = 550;
BitcoinH.EVENT_PROBABILITY = 0.14;
BitcoinH.ENEMY_STRENGTH = 6;

BitcoinH.STORE_ITEMS = [
  {key: 'ostriches', label: 'Ostriches', price: 100},
  {key: 'food', label: 'Food', price: 1},
  {key: 'hats', label: 'Tinfoil hats', price: 50},
  {key: 'zaps', label: 'Zaps', price: 10},
  {key: 'parts', label: 'Spare parts'}
];
BitcoinH.PART_PRICES = {drive: 50, pi: 40, psu: 30};

BitcoinH.TOP_TEN = [
  {name: 'Satoshi Nakamoto', score: 7650},
  {name: 'Hal Finney', score: 5694},
  {name: 'Wei Dai', score: 4138},
  {name: 'Nick Szabo', score: 2945},
  {name: 'Adam Back', score: 2052},
  {name: 'Len Sassaman', score: 1401},
  {name: 'Timothy May', score: 937},
  {name: 'Eric Hughes', score: 615},
  {name: 'David Chaum', score: 312},
  {name: 'A Nocoiner', score: 21}
];

var S = function() { return BitcoinH.Stackers; };
var h = escapeHtml;

BitcoinH.Game = {

  /* ---------- title and main menu ---------- */

  start: function() {
    BitcoinH.Screen.init();
    BitcoinH.Sound.init();
    document.getElementById('mute-btn').addEventListener('click', function() {
      BitcoinH.Sound.toggleMute();
      this.blur();
    });
    this.splash();
  },

  splash: function() {
    var game = this;
    BitcoinH.Screen.page(
      '<div class="splash"><img class="logo" src="images/bitcoinlogo.webp" alt=""/>' +
      '<img class="title-img" src="images/title1.png" alt="The Bitcoin Trail"/>' +
      '<div class="credits">A parody of a certain 1985 computer lab classic.<br>No ostriches were harmed in the making of this game.</div></div>',
      function() {
        BitcoinH.Sound.music('sound-theme');
        game.mainMenu();
      });
  },

  mainMenu: function() {
    var game = this;
    this.over = true;
    BitcoinH.Screen.menu({
      header: '<div class="banner"><span class="inverse">The Bitcoin Trail</span></div>',
      options: [
        {label: 'Travel the trail', fn: function() { game.chooseOccupation(); }},
        {label: 'Learn about the trail', fn: function() { game.learn(0); }},
        {label: 'See the HODL Top Ten', fn: function() { game.showTopTen(function() { game.mainMenu(); }); }},
        {label: 'Turn sound ' + (BitcoinH.Sound.muted ? 'on' : 'off'), fn: function() { BitcoinH.Sound.toggleMute(); game.mainMenu(); }},
        {label: 'End', fn: function() {
          BitcoinH.Sound.stop();
          BitcoinH.Screen.page('<p class="center">Stay humble. Stack sats.</p>', function() { game.splash(); });
        }}
      ]
    });
  },

  learn: function(i) {
    var game = this;
    var pages = [
      '<p>Try taking a journey by ostrich across 2,100 miles of fiat wasteland. Your party of five will travel from the Genesis Block to Hyperbitcoinization Valley. If you make it alive.</p>' +
      '<p>You will need a team of ostriches, food, tinfoil hats and zaps. Satoshi\'s General Store sells them all, and so do the forts along the trail. The farther west you go, the more everything costs.</p>',
      '<p>Along the way you will cross rivers of unconfirmed transactions, fend off central bankers and shit-coiners, and hunt bulls and bears for food.</p>' +
      '<p>Keep an eye on your party\'s health. A grueling pace and bare bones rations will get you there fast, or not at all. When someone gets sick, stop and rest.</p>',
      '<p>If you don\'t make it (your node catches fire, hackers steal your ostriches, or you die of dysentery) don\'t rage quit. Unlike your fiat savings, you can always try again.</p>' +
      '<p>Travelers who fall on the trail leave their graves behind. Pay your respects when you pass them.</p>'
    ];
    BitcoinH.Screen.page('<div class="banner"><span class="inverse">The Bitcoin Trail</span></div>' + pages[i], function() {
      if(i + 1 < pages.length) game.learn(i + 1);
      else game.mainMenu();
    });
  },

  /* ---------- setting out ---------- */

  chooseOccupation: function() {
    var game = this;
    var options = BitcoinH.OCCUPATIONS.map(function(occ) {
      return {label: occ.title, fn: function() {
        if(occ.key === 'altcoiner') {
          window.location.href = 'https://www.youtube.com/watch?v=YxjY_YTksKM';
          return;
        }
        game.nameParty(occ);
      }};
    });
    options.push({label: 'Find out the differences between these choices', fn: function() { game.differences(); }});
    BitcoinH.Screen.menu({
      intro: '<p>Many kinds of people made the trip to Hyperbitcoinization.</p><p>You may:</p>',
      options: options
    });
  },

  differences: function() {
    var game = this;
    var occs = BitcoinH.OCCUPATIONS.filter(function(occ) { return occ.key !== 'altcoiner'; });
    var table = '<table class="plain">' + occs.map(function(occ) {
      return '<tr><td>' + occ.name + '</td><td>' + occ.sats.toLocaleString() + ' sats</td><td>x' + occ.multiplier + '</td></tr>';
    }).join('') + '</table>';
    BitcoinH.Screen.page('<p>Traveling to Hyperbitcoinization isn\'t easy! But if you\'re a miner from Texas, you\'ll have more sats for supplies than a pleb or a nomad.</p>' +
      '<p>However, the harder you have it, the more points you deserve!</p>' + table, function() {
        BitcoinH.Screen.page(occs.map(function(occ) { return '<p>' + occ.perk + '</p>'; }).join(''), function() { game.chooseOccupation(); });
      });
  },

  nameParty: function(occ) {
    var game = this;
    var names = [];
    var defaults = BitcoinH.DEFAULT_NAMES.slice();
    var askNext = function() {
      var i = names.length;
      if(i === 5) return confirm();
      var list = '';
      if(i > 0) {
        list = '<p>What are the first names of the four other members in your party?</p><ol class="names">';
        for(var n = 0; n < 5; n++) list += '<li>' + (names[n] ? h(names[n]) : '') + '</li>';
        list += '</ol>';
      }
      BitcoinH.Screen.ask({
        header: list,
        question: i === 0 ? 'What is the first name of the wagon leader?' : (i + 1) + '.',
        maxLength: 12,
        hint: 'Type a name and press ENTER, or just press ENTER for ' + defaults[i],
        fn: function(value) {
          names.push(value || defaults[i]);
          askNext();
        }
      });
    };
    var confirm = function() {
      var list = '<ol class="names">' + names.map(function(n) { return '<li>' + h(n) + '</li>'; }).join('') + '</ol>';
      BitcoinH.Screen.yesNo('<p>Your party:</p>' + list + '<p>Are these names correct?</p>', function(yes) {
        if(yes) game.chooseMonth(occ, names);
        else {
          names = [];
          askNext();
        }
      });
    };
    askNext();
  },

  chooseMonth: function(occ, names) {
    var game = this;
    var months = ['March', 'April', 'May', 'June', 'July'];
    var options = months.map(function(m, i) {
      return {label: m, fn: function() { game.setOut(occ, names, 2 + i); }};
    });
    options.push({label: 'Ask for advice', fn: function() {
      BitcoinH.Screen.page(
        '<p>You attend a public meeting held for "folks with bitcoin fever." Opinions are divided.</p>' +
        '<p>"Leave too early and there won\'t be any grass for your ostriches."</p>' +
        '<p>"Leave too late and you\'ll freeze to death in the Halving Mountains."</p>' +
        '<p>"The smart ones leave in April or May. The smarter ones bought in 2009."</p>',
        function() { game.chooseMonth(occ, names); });
    }});
    BitcoinH.Screen.menu({
      intro: '<p>It is 2009. Your journey begins at the Genesis Block. You must decide which month to leave.</p>',
      options: options
    });
  },

  setOut: function(occ, names, month) {
    var game = this;
    this.occupation = occ;
    this.landmarkIndex = 1;
    this.over = false;
    this.fortsTalked = {};
    this.graves = this.loadGraves();
    BitcoinH.Event.stackers = BitcoinH.Stackers;
    BitcoinH.Event.usedEvents = [];
    BitcoinH.Stackers.init(occ, names, month);
    BitcoinH.Stackers.rollWeather();
    BitcoinH.Screen.page(
      '<p>Before leaving the Genesis Block you should buy equipment and supplies. You have ' + S().sats.toLocaleString() +
      ' sats, but you don\'t have to spend it all now.</p><p>You can buy whatever you need at Satoshi\'s General Store.</p>',
      function() {
        BitcoinH.Screen.page(
          '<p>Hello, I\'m Satoshi. So you\'re going to Hyperbitcoinization! I can fix you up with what you need:</p>' +
          '<ul class="dashes"><li>a team of ostriches to pull your wagon</li><li>food for the trip</li><li>tinfoil hats for the cold</li>' +
          '<li>zaps for fighting and hunting</li><li>spare parts for your node</li></ul>',
          function() {
            BitcoinH.Sound.music('sound-town');
            game.store({name: 'Satoshi\'s General Store', place: 'Genesis Block', prices: 1, genesis: true});
          });
      });
  },

  /* ---------- stores ---------- */

  price: function(base, multiplier) {
    var price = base * multiplier;
    if(this.occupation.key === 'nomad') price *= 0.85;
    return Math.max(1, Math.round(price));
  },

  store: function(where, cart) {
    var game = this;
    var s = S();
    cart = cart || {ostriches: 0, food: 0, hats: 0, zaps: 0, drive: 0, pi: 0, psu: 0};
    var p = function(base) { return game.price(base, where.prices); };
    var cost = {
      ostriches: cart.ostriches * p(100),
      food: cart.food * p(1),
      hats: cart.hats * p(50),
      zaps: cart.zaps * p(10),
      parts: cart.drive * p(BitcoinH.PART_PRICES.drive) + cart.pi * p(BitcoinH.PART_PRICES.pi) + cart.psu * p(BitcoinH.PART_PRICES.psu)
    };
    var total = cost.ostriches + cost.food + cost.hats + cost.zaps + cost.parts;
    var header = '<div class="store-head"><span class="inverse">' + h(where.name) + '</span><br>' + h(where.place) + '<br>' + s.dateString() + '</div>';
    var footer = '<div class="bill"><div>Total bill: <span>' + total.toLocaleString() + ' sats</span></div>' +
      '<div>Amount you have: <span>' + s.sats.toLocaleString() + ' sats</span></div></div>';
    var again = function() { game.store(where, cart); };
    var options = BitcoinH.STORE_ITEMS.map(function(item) {
      return {
        label: '<span class="item">' + item.label + '</span><span class="cost">' + cost[item.key].toLocaleString() + ' sats</span>',
        fn: function() { game.storeItem(where, cart, item.key, again); }
      };
    });
    BitcoinH.Screen.menu({
      header: header,
      intro: '',
      options: options,
      footer: footer,
      question: 'Which item would you like to buy?',
      escape: {label: 'Press SPACE BAR to leave store', fn: function() { game.checkout(where, cart, total); }}
    });
  },

  storeItem: function(where, cart, key, back) {
    var game = this;
    var s = S();
    var p = function(base) { return game.price(base, where.prices); };
    var party = s.alive().length;
    var ask = function(header, question, cartKey, limit) {
      BitcoinH.Screen.ask({
        header: header,
        question: question,
        number: true,
        maxLength: 4,
        value: cart[cartKey] ? String(cart[cartKey]) : '',
        fn: function(n) {
          if(limit !== undefined && n > limit) {
            BitcoinH.Screen.page('<p>' + limit.message + '</p>', function() { ask(header, question, cartKey, limit); });
            return;
          }
          cart[cartKey] = n;
          back();
        }
      });
    };
    if(key === 'ostriches') {
      var room = Math.max(0, 20 - s.ostriches);
      var limit = new Number(room);
      limit.message = 'Your wagon can\'t be pulled by more than 20 ostriches.';
      ask('<p>There\'s no wagon without ostriches. I recommend at least 4. I charge ' + p(100) + ' sats per ostrich.</p>',
        'How many ostriches do you want?', 'ostriches', limit);
    } else if(key === 'food') {
      var foodRoom = Math.max(0, BitcoinH.WAGON_FOOD_LIMIT - Math.floor(s.food));
      var foodLimit = new Number(foodRoom);
      foodLimit.message = 'Your wagon may only carry 2,000 pounds of food.';
      ask('<p>I recommend you take at least 200 pounds of food for each person in your party. I see that you have ' + party +
        ' people in all. You\'ll need steak. Mostly steak. My price is ' + p(1) + (p(1) === 1 ? ' sat' : ' sats') + ' per pound.</p>',
        'How many pounds of food do you want?', 'food', foodLimit);
    } else if(key === 'hats') {
      ask('<p>You\'ll need tinfoil hats for the cold up in the mountains, and for the FUD. I recommend at least one hat per person. Each hat costs ' + p(50) + ' sats.</p>',
        'How many tinfoil hats do you want?', 'hats');
    } else if(key === 'zaps') {
      ask('<p>I sell zaps in boxes of 20. You\'ll want them to fight off the fiat mafia and to hunt for food. Each box costs ' + p(10) + ' sats.</p>',
        'How many boxes do you want?', 'zaps');
    } else {
      var parts = '<p>It\'s a good idea to have a few spare parts for your node. Here are the prices:</p>' +
        '<table class="plain"><tr><td>hard drive</td><td>' + p(50) + ' sats</td></tr><tr><td>raspberry pi</td><td>' + p(40) +
        ' sats</td></tr><tr><td>power supply</td><td>' + p(30) + ' sats</td></tr></table>';
      BitcoinH.Screen.ask({header: parts, question: 'How many hard drives?', number: true, maxLength: 2,
        value: cart.drive ? String(cart.drive) : '', fn: function(a) {
          cart.drive = a;
          BitcoinH.Screen.ask({header: parts, question: 'How many raspberry pis?', number: true, maxLength: 2,
            value: cart.pi ? String(cart.pi) : '', fn: function(b) {
              cart.pi = b;
              BitcoinH.Screen.ask({header: parts, question: 'How many power supplies?', number: true, maxLength: 2,
                value: cart.psu ? String(cart.psu) : '', fn: function(c) {
                  cart.psu = c;
                  back();
                }});
            }});
        }});
    }
  },

  checkout: function(where, cart, total) {
    var game = this;
    var s = S();
    var back = function() { game.store(where, cart); };
    if(total > s.sats) {
      BitcoinH.Screen.page('<p>Okay, that comes to a total of ' + total.toLocaleString() + ' sats. You don\'t have that much!</p><p>Where is your proof of work?</p>', back);
      return;
    }
    if(where.genesis && s.ostriches + cart.ostriches === 0) {
      BitcoinH.Screen.page('<p>Don\'t forget, you\'ll need ostriches to pull your wagon.</p>', back);
      return;
    }
    s.sats -= total;
    s.ostriches += cart.ostriches;
    s.change('food', cart.food);
    s.hats += cart.hats;
    s.zaps += cart.zaps * 20;
    s.parts.drive += cart.drive;
    s.parts.pi += cart.pi;
    s.parts.psu += cart.psu;
    if(where.genesis) {
      BitcoinH.Screen.page('<p>Well then, you\'re ready to start. Good luck! You have a long and difficult journey ahead of you.</p>', function() {
        BitcoinH.Sound.music('sound-theme');
        game.landmarkPage(BitcoinH.Event.landmarks[0], function() { game.startTravel(); });
      });
    } else {
      if(total) BitcoinH.Sound.beep();
      this.sizeUp();
    }
  },

  /* ---------- traveling ---------- */

  nextLandmark: function() {
    return BitcoinH.Event.landmarks[this.landmarkIndex];
  },

  //the landmark we are standing at, if any
  currentLandmark: function() {
    var prev = BitcoinH.Event.landmarks[this.landmarkIndex - 1];
    return prev && prev.miles === S().miles && this.lookingAround ? prev : null;
  },

  startTravel: function() {
    var game = this;
    this.lookingAround = false;
    BitcoinH.Sound.music('sound-theme');
    BitcoinH.Travel.render();
    this.traveling = true;
    BitcoinH.Screen.handler = {
      key: function(e) { if(e.key === 'Enter' || e.key === ' ') game.stopTraveling(); },
      tap: function() { game.stopTraveling(); }
    };
    BitcoinH.Travel.update(true);
    clearTimeout(this.timer);
    this.timer = setTimeout(this.day.bind(this), BitcoinH.DAY_MS);
  },

  stopTraveling: function() {
    this.traveling = false;
    clearTimeout(this.timer);
    this.sizeUp();
  },

  day: function() {
    if(!this.traveling) return;
    var game = this;
    var s = S();
    var queue = [];
    if(s.ostriches <= 0) {
      this.traveling = false;
      BitcoinH.Travel.message('You have no ostriches to pull your wagon. You\'ll have to trade for one.', function() { game.sizeUp(); });
      return;
    }
    var before = s.miles;
    var messages = s.passDay(false);
    var next = this.nextLandmark();
    var arrived = null;
    s.miles += s.milesPerDay();
    if(s.miles >= next.miles) {
      s.miles = next.miles;
      arrived = next;
      this.landmarkIndex++;
    }
    messages.forEach(function(text) {
      queue.push(function(done) { BitcoinH.Travel.message(text, done); });
    });
    this.graves.forEach(function(grave) {
      if(grave.miles > before && grave.miles <= s.miles) {
        queue.push(function(done) { game.visitGrave(grave, done); });
      }
    });
    if(!arrived && Math.random() < BitcoinH.EVENT_PROBABILITY) {
      var ev = BitcoinH.Event.generateEvent();
      queue.push(function(done) { game.runEvent(ev, done); });
    }
    BitcoinH.Travel.update(true);

    if(!queue.length && !arrived && s.alive().length) {
      this.timer = setTimeout(this.day.bind(this), BitcoinH.DAY_MS);
      return;
    }
    this.traveling = false;
    BitcoinH.Travel.update(false);
    this.runQueue(queue, function() {
      if(!s.alive().length) return game.gameOver();
      if(arrived) return game.arrive(arrived);
      game.startTravel();
    });
  },

  runQueue: function(queue, then) {
    var game = this;
    if(!S().alive().length) return then();
    if(!queue.length) return then();
    var item = queue.shift();
    if(!document.getElementById('travel-bottom')) BitcoinH.Travel.render();
    item(function() { game.runQueue(queue, then); });
  },

  //days go by without moving (lost trail, waiting at rivers, broken parts)
  loseDays: function(n, then, resting) {
    var s = S();
    var messages = [];
    for(var i = 0; i < n && s.alive().length; i++) {
      messages = messages.concat(s.passDay(!!resting));
    }
    this.runQueue(messages.map(function(text) {
      return function(done) { BitcoinH.Travel.message(text, done); };
    }), then);
  },

  runEvent: function(ev, done) {
    var game = this;
    var s = S();
    switch(ev.type) {
      case 'TRAIL':
        var result = ev.fn(s);
        if(!result) return done();
        BitcoinH.Travel.message(result.text, function() {
          if(result.days) game.loseDays(result.days, done);
          else done();
        });
        break;
      case 'STAT-CHANGE':
        var text = BitcoinH.Event.stateChangeEvent(ev);
        if(text) BitcoinH.Travel.message(text, done);
        else done();
        break;
      case 'NEWS':
        BitcoinH.Travel.message('A passing traveler brings news: ' + ev.text, done);
        break;
      case 'ATTACK':
        this.attack(ev, done);
        break;
      case 'CHOICE':
        this.choice(ev, done);
        break;
      case 'TOMBSTONE':
        BitcoinH.Travel.message(ev.text.replace('accross', 'across') + '.', function() { game.communityTombstone(ev, done); });
        break;
      default:
        done();
    }
  },

  /* ---------- size up the situation ---------- */

  sizeUp: function() {
    var game = this;
    var s = S();
    if(!s.alive().length) return this.gameOver();
    var here = this.currentLandmark();
    var isFort = here && here.type === 'fort';
    var header = (here ? BitcoinH.Screen.placeHeader(here.name) : '<div class="place">' + s.dateString() + '</div>') +
      '<table class="plain condition"><tr><td>Weather:</td><td>' + s.weather + '</td></tr>' +
      '<tr><td>Health:</td><td>' + s.healthLabel() + '</td></tr>' +
      '<tr><td>Pace:</td><td>' + s.getPace().name + '</td></tr>' +
      '<tr><td>Rations:</td><td>' + s.getRations().name + '</td></tr></table>';
    var options = [
      {label: 'Continue on trail', fn: function() { game.startTravel(); }},
      {label: 'Check supplies', fn: function() { game.checkSupplies(); }},
      {label: 'Look at map', fn: function() { game.showMap(); }},
      {label: 'Change pace', fn: function() { game.changePace(); }},
      {label: 'Change food rations', fn: function() { game.changeRations(); }},
      {label: 'Stop to rest', fn: function() { game.rest(); }},
      {label: 'Attempt to trade', fn: function() { game.trade(); }}
    ];
    if(isFort) {
      options.push({label: 'Talk to people', fn: function() { game.talk(here); }});
      options.push({label: 'Buy supplies', fn: function() {
        BitcoinH.Sound.music('sound-town');
        game.store({name: here.name + ' Trading Post', place: here.name, prices: here.prices});
      }});
    } else {
      options.push({label: 'Hunt for food', fn: function() { game.hunt(); }});
    }
    BitcoinH.Screen.menu({header: header, options: options});
  },

  checkSupplies: function() {
    var game = this;
    var s = S();
    var rows = [
      ['ostriches', s.ostriches],
      ['tinfoil hats', s.hats],
      ['zaps', s.zaps],
      ['spare hard drives', s.parts.drive],
      ['spare raspberry pis', s.parts.pi],
      ['spare power supplies', s.parts.psu],
      ['pounds of food', Math.floor(s.food)],
      ['sats', s.sats],
      ['plebs following you', s.plebs]
    ];
    var party = s.members.map(function(m) {
      var state = !m.alive ? 'dead' : (m.sick ? m.sick.illness : 'well');
      return '<span class="' + (m.alive ? '' : 'dim') + '">' + h(m.name) + ' (' + state + ')</span>';
    }).join(', ');
    BitcoinH.Screen.page('<div class="banner"><span class="inverse">Your Supplies</span></div><table class="plain supplies">' +
      rows.map(function(r) { return '<tr><td>' + r[0] + '</td><td>' + r[1].toLocaleString() + '</td></tr>'; }).join('') +
      '</table><p class="party">' + party + '</p>', function() { game.sizeUp(); });
  },

  changePace: function() {
    var game = this;
    var s = S();
    var options = BitcoinH.PACES.map(function(pace, i) {
      return {label: 'a ' + pace.name + ' pace', fn: function() { s.pace = i; game.sizeUp(); }};
    });
    options.push({label: 'find out what these different paces mean', fn: function() {
      BitcoinH.Screen.page(
        '<p><b>steady</b> - You travel about 8 hours a day, taking frequent rests. You take care not to get too tired. HODL.</p>' +
        '<p><b>strenuous</b> - You travel about 12 hours a day, starting just after sunrise and stopping shortly before sunset. You stop to rest only when necessary.</p>' +
        '<p><b>grueling</b> - You travel about 16 hours a day. You never stop to rest. Full send. Your party gets exhausted and sick.</p>',
        function() { game.changePace(); });
    }});
    BitcoinH.Screen.menu({
      intro: '<p>Change pace (currently "' + s.getPace().name + '")</p><p>The pace at which you travel can change. Your choices are:</p>',
      options: options
    });
  },

  changeRations: function() {
    var game = this;
    var s = S();
    var descriptions = [
      'meals are large and generous. Steak, steak, and more steak.',
      'meals are small, but adequate.',
      'meals are very small; everyone stays hungry. Intermittent fasting, indefinitely.'
    ];
    var options = BitcoinH.RATIONS.map(function(r, i) {
      return {label: r.name + ' - ' + descriptions[i], fn: function() { s.rations = i; game.sizeUp(); }};
    });
    BitcoinH.Screen.menu({
      intro: '<p>Change food rations (currently "' + s.getRations().name + '")</p><p>The amount of food the people in your party eat each day can change. These amounts are:</p>',
      options: options
    });
  },

  rest: function() {
    var game = this;
    BitcoinH.Screen.ask({
      question: 'How many days would you like to rest?',
      number: true,
      maxLength: 1,
      fn: function(days) {
        if(!days) return game.sizeUp();
        var s = S();
        var messages = [];
        for(var i = 0; i < days && s.alive().length; i++) {
          messages = messages.concat(s.passDay(true));
        }
        var text = '<p>You rested for ' + days + (days === 1 ? ' day.' : ' days.') + '</p>' +
          messages.map(function(m) { return '<p>' + m + '</p>'; }).join('');
        BitcoinH.Screen.page(text, function() { game.sizeUp(); });
      }
    });
  },

  trade: function() {
    var game = this;
    var s = S();
    var ev = BitcoinH.Event;
    var offer = ev.trades[Math.floor(Math.random() * ev.trades.length)];
    var wantItem = offer.want[0];
    var wantQty = offer.want[1];
    var giveItem = offer.give[0];
    var giveQty = Math.round(offer.give[1] * (this.occupation.key === 'nomad' ? 1.25 : 1));
    var messages = s.passDay(true);
    var after = function() {
      if(messages.length) {
        BitcoinH.Screen.page(messages.map(function(m) { return '<p>' + m + '</p>'; }).join(''), function() { game.sizeUp(); });
      } else game.sizeUp();
    };
    var who = giveItem === 'fiat' ? 'a nocoiner' : 'another traveler';
    var text = '<p>You meet ' + who + ' who wants ' + ev.itemName(wantItem, wantQty) + '. ' +
      (giveItem === 'fiat' ? 'He' : 'They') + ' will give you ' + ev.itemName(giveItem, giveQty) + '.</p>';
    if(ev.have(wantItem) < wantQty) {
      BitcoinH.Screen.page(text + '<p>You don\'t have this.</p>', after);
      return;
    }
    BitcoinH.Screen.yesNo(text + '<p>Are you willing to trade?</p>', function(yes) {
      if(!yes) return after();
      ev.adjust(wantItem, -wantQty);
      ev.adjust(giveItem, giveQty);
      if(giveItem === 'fiat') {
        BitcoinH.Screen.page('<p>You now have 1,000 fiat dollars. By the time you put them in your wagon, they have lost 7% of their value.</p><p>Nobody on the trail accepts them anyway. You use them to start a campfire.</p>', after);
      } else after();
    });
  },

  talk: function(fort) {
    var game = this;
    var s = S();
    var ev = BitcoinH.Event;
    var index = this.fortsTalked[fort.name] || 0;
    var quote = ev.quotes[(BitcoinH.Event.landmarks.indexOf(fort) * 3 + index) % ev.quotes.length];
    this.fortsTalked[fort.name] = index + 1;
    var html = BitcoinH.Screen.placeHeader(fort.name) + '<p class="quote">"' + quote.text + '"</p><p class="who">- ' + quote.who + '</p>';
    if(this.occupation.key === 'educator' && index === 0) {
      var recruits = 2 + Math.floor(Math.random() * 5);
      s.change('plebs', recruits);
      html += '<p>You get to talking about sound money. ' + recruits + ' folks decide to follow you west.</p>';
    }
    BitcoinH.Screen.page(html, function() { game.sizeUp(); });
  },

  hunt: function() {
    var game = this;
    var s = S();
    if(s.zaps <= 0) {
      BitcoinH.Screen.page('<p>You don\'t have any zaps to hunt with.</p>', function() { game.sizeUp(); });
      return;
    }
    BitcoinH.Hunt.start(function(text) {
      var messages = s.passDay(true);
      var html = '<p>' + text + '</p>' + messages.map(function(m) { return '<p>' + m + '</p>'; }).join('');
      BitcoinH.Screen.page(html, function() { game.sizeUp(); });
    });
  },

  /* ---------- the map ---------- */

  showMap: function() {
    var game = this;
    var s = S();
    BitcoinH.Screen.page('<div class="banner"><span class="inverse">The Bitcoin Trail</span></div><canvas id="map" width="280" height="150"></canvas>', function() { game.sizeUp(); });
    var canvas = document.getElementById('map');
    var ctx = canvas.getContext('2d');
    var landmarks = BitcoinH.Event.landmarks;
    //the trail wanders from east (right) to west (left)
    var point = function(miles) {
      var t = miles / BitcoinH.TRAIL_LENGTH;
      return {
        x: 262 - t * 244,
        y: 80 + Math.sin(t * 9) * 28 + Math.sin(t * 23) * 6
      };
    };
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 280, 150);
    //mountains
    ctx.fillStyle = '#1f5f1f';
    [[1000, 1250], [1650, 1880]].forEach(function(range) {
      for(var m = range[0]; m < range[1]; m += 40) {
        var p = point(m);
        ctx.beginPath();
        ctx.moveTo(p.x - 6, p.y - 12);
        ctx.lineTo(p.x, p.y - 22);
        ctx.lineTo(p.x + 6, p.y - 12);
        ctx.fill();
      }
    });
    //rivers
    ctx.fillStyle = '#2a5fd8';
    landmarks.forEach(function(lm) {
      if(lm.type !== 'river') return;
      var p = point(lm.miles);
      for(var y = 20; y < 140; y++) ctx.fillRect(p.x + Math.sin(y / 9) * 4, y, 2, 1);
    });
    //the trail, solid where you have been
    for(var m = 0; m <= BitcoinH.TRAIL_LENGTH; m += 6) {
      var p = point(m);
      ctx.fillStyle = m <= s.miles ? '#33ff33' : '#1a661a';
      if(m <= s.miles || (m / 6) % 2 === 0) ctx.fillRect(Math.round(p.x), Math.round(p.y), 2, 2);
    }
    ctx.font = '7px monospace';
    landmarks.forEach(function(lm, i) {
      var p = point(lm.miles);
      var visited = lm.miles <= s.miles;
      ctx.fillStyle = visited ? '#33ff33' : '#1a661a';
      ctx.fillRect(Math.round(p.x) - 1, Math.round(p.y) - 1, 4, 4);
      if(visited || i === game.landmarkIndex) {
        ctx.fillStyle = visited ? '#33ff33' : '#1f991f';
        ctx.fillText(lm.name.replace(/^the /, ''), Math.max(1, Math.min(p.x - 20, 230)), p.y + (i % 2 ? 14 : -6));
      }
    });
    var here = point(s.miles);
    ctx.strokeStyle = '#f7931a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(here.x + 1, here.y + 1, 5, 0, Math.PI * 2);
    ctx.stroke();
  },

  /* ---------- landmarks ---------- */

  landmarkPage: function(lm, next, text) {
    var s = S();
    text = text || lm.text || '';
    if(lm.health) {
      s.change('health', lm.health);
    }
    BitcoinH.Screen.page(BitcoinH.Screen.placeHeader(lm.name.replace(/^the /, 'The ')) + '<p>' + text + '</p>', next);
  },

  arrive: function(lm) {
    var game = this;
    var s = S();
    BitcoinH.Sound.beep();
    if(lm.type === 'end') return this.victory();
    if(lm.type === 'river') return this.river(lm);
    if(lm.type === 'wallstreet') return this.wallStreet(lm);
    var name = lm.name.replace(/^the /, 'The ');
    if(lm.choice) {
      this.lookingAround = true;
      this.landmarkPage(lm, function() {
        game.choice(lm.choice, function() { game.sizeUp(); });
      });
      return;
    }
    BitcoinH.Screen.yesNo('<p>You are now at ' + h(lm.name) + '.</p><p>Would you like to look around?</p>', function(yes) {
      if(!yes) return game.startTravel();
      game.lookingAround = true;
      if(lm.type === 'fort') BitcoinH.Sound.music('sound-town');
      game.landmarkPage(lm, function() { game.sizeUp(); });
    });
  },

  choice: function(ev, done) {
    var game = this;
    var s = S();
    var options = ev.options.map(function(option) {
      return {label: option.label, fn: function() {
        var result = option.outcome(s);
        BitcoinH.Screen.page('<p>' + result + '</p>', function() {
          if(s.shortcut) {
            var nextLm = game.nextLandmark();
            s.miles = Math.min(nextLm.miles - 1, s.miles + s.shortcut);
            s.shortcut = 0;
          }
          if(s.lostDays) {
            var days = s.lostDays;
            s.lostDays = 0;
            BitcoinH.Travel.render();
            game.loseDays(days, done);
          } else done();
        });
      }};
    });
    BitcoinH.Screen.menu({
      header: '<div class="banner"><span class="inverse">' + h(ev.title) + '</span></div>',
      intro: '<p>' + ev.text + '</p>' + (/You may:$/.test(ev.text) ? '' : '<p>You may:</p>'),
      options: options
    });
  },

  /* ---------- rivers ---------- */

  river: function(lm) {
    var game = this;
    var s = S();
    this.lookingAround = false;
    var width = Math.round(lm.width * (0.85 + Math.random() * 0.3));
    var depth = Math.round(lm.depth * (0.7 + Math.random() * 0.6) * 10) / 10;
    var name = lm.name.replace(/^the /, 'The ');
    var menu = function() {
      var options = [
        {label: 'attempt to ford the river', fn: function() { game.cross(lm, 'ford', depth); }},
        {label: 'caulk the wagon and float it across', fn: function() { game.cross(lm, 'caulk', depth); }}
      ];
      if(lm.ferry) {
        options.push({label: 'take a ferry across (' + lm.ferry + ' sat priority fee)', fn: function() { game.cross(lm, 'ferry', depth); }});
      } else {
        options.push({label: 'hire a node runner to guide you (' + lm.guide + ' tinfoil hats)', fn: function() { game.cross(lm, 'guide', depth); }});
      }
      options.push({label: 'wait to see if conditions improve', fn: function() {
        var messages = s.passDay(true);
        depth = Math.max(0.8, Math.round(depth * (0.75 + Math.random() * 0.15) * 10) / 10);
        var text = '<p>You camp near the river for a day. The mempool clears a little.</p>' + messages.map(function(m) { return '<p>' + m + '</p>'; }).join('');
        if(!s.alive().length) return game.gameOver();
        BitcoinH.Screen.page(text, menu);
      }});
      options.push({label: 'get more information', fn: function() {
        BitcoinH.Screen.page(
          '<p>To <b>ford</b> a river means to pull your wagon across a shallow part of it. Like broadcasting at 1 sat/vB, it works fine when the mempool is shallow. Anything deeper than 3 vMB and you risk swamping your wagon.</p>' +
          '<p>To <b>caulk</b> the wagon means to seal it and float it across, bumping your fee with RBF as needed. It usually works, but a pinned wagon can capsize.</p>' +
          '<p>' + (lm.ferry ? 'A <b>ferry</b> costs a priority fee, but it is the safest way across.' : 'A <b>node runner</b> knows every shallow spot in this river. They will guide you across for a few tinfoil hats.') + '</p>',
          menu);
      }});
      BitcoinH.Screen.menu({
        header: BitcoinH.Screen.placeHeader(name) +
          '<table class="plain condition"><tr><td>Weather:</td><td>' + s.weather + '</td></tr>' +
          '<tr><td>River width:</td><td>' + width + ' feet</td></tr>' +
          '<tr><td>Mempool depth:</td><td>' + depth + ' vMB</td></tr></table>',
        options: options
      });
    };
    BitcoinH.Screen.page(BitcoinH.Screen.placeHeader(name) +
      '<p>You must cross the river in order to continue. The river at this point is currently ' + width +
      ' feet across, and ' + depth + ' vMB of unconfirmed transactions deep in the middle.</p>', menu);
  },

  cross: function(lm, method, depth) {
    var game = this;
    var s = S();
    var failChance = 0;
    var intro = '';
    if(method === 'ford') {
      failChance = depth < 2.5 ? 0 : Math.min(0.9, (depth - 2.5) * 0.3);
      if(depth >= 2.5 && depth < 3 && Math.random() < 0.5) {
        return this.afterCrossing('Your wagon got stuck in the mud and it took a day to get it out. But you made it across.', 1);
      }
    } else if(method === 'caulk') {
      failChance = depth < 2 ? 0.3 : 0.12;
    } else if(method === 'ferry') {
      if(s.sats < lm.ferry) {
        BitcoinH.Screen.page('<p>You don\'t have enough sats to pay the priority fee.</p>', function() { game.river(lm); });
        return;
      }
      s.sats -= lm.ferry;
      failChance = 0.02;
      intro = 'The ferry operator confirms your crossing in the next block. ';
    } else if(method === 'guide') {
      if(s.hats < lm.guide) {
        BitcoinH.Screen.page('<p>You don\'t have enough tinfoil hats to pay the guide.</p>', function() { game.river(lm); });
        return;
      }
      s.hats -= lm.guide;
      failChance = 0.03;
      intro = 'The node runner leads you across the shallow spots. ';
    }
    if(Math.random() >= failChance) {
      return this.afterCrossing(intro + 'You made it across ' + h(lm.name) + '.', method === 'ferry' ? 2 : 1);
    }
    //capsized
    var lost = [];
    var food = Math.abs(s.change('food', -Math.floor(s.food * (0.2 + Math.random() * 0.25))));
    if(food) lost.push(food + ' pounds of food');
    var zaps = Math.abs(s.change('zaps', -Math.floor(s.zaps * (0.2 + Math.random() * 0.3))));
    if(zaps) lost.push(zaps + ' zaps');
    if(s.hats > 1 && Math.random() < 0.5) lost.push(Math.abs(s.change('hats', -1)) + ' tinfoil hat');
    if(s.ostriches > 1 && Math.random() < 0.4) lost.push(Math.abs(s.change('ostriches', -1)) + ' ostrich');
    var text = (method === 'caulk' ? 'Your wagon got pinned in the mempool and tipped over while floating.' : 'The wagon tipped over while fording the river.') +
      (lost.length ? '<br><br>You lost: ' + lost.join(', ') + '.' : '');
    if(Math.random() < 0.35) {
      var victim = s.killRandom();
      if(victim) text += '<br><br>' + h(victim.name) + ' drowned.';
    }
    this.afterCrossing(text, 1);
  },

  afterCrossing: function(text, days) {
    var game = this;
    BitcoinH.Travel.render();
    BitcoinH.Travel.message(text, function() {
      game.loseDays(days, function() {
        if(!S().alive().length) return game.gameOver();
        game.startTravel();
      });
    });
  },

  /* ---------- fights ---------- */

  attack: function(ev, done) {
    var game = this;
    var s = S();
    var enemy = ev.text.replace(' is attacking you', '');
    var strength = Math.round(BitcoinH.ENEMY_STRENGTH * (0.7 + Math.random() * 0.6) * (1 + 1.5 * s.miles / BitcoinH.TRAIL_LENGTH));
    if(this.occupation.key === 'developer') strength = Math.round(strength * 0.7);
    var reward = Math.round((60 + Math.random() * 100) * (1 + s.miles / BitcoinH.TRAIL_LENGTH));
    var bribe = Math.round(reward * 1.5);
    var power = Math.min(s.zaps, 200) / 20 + s.plebs / 10;
    BitcoinH.Sound.music('sound-attack');
    var finish = function(text) {
      BitcoinH.Screen.page('<p>' + text + '</p>', function() {
        BitcoinH.Sound.music('sound-theme');
        done();
      });
    };
    //casualties come from your followers first, then your party
    var casualties = function(n) {
      var text = '';
      var plebs = Math.min(n, s.plebs);
      if(plebs) {
        s.plebs -= plebs;
        text += plebs + (plebs === 1 ? ' pleb was' : ' plebs were') + ' orange pilled to death. ';
      }
      if(n > plebs) {
        var victim = s.killRandom();
        if(victim) text += h(victim.name) + ' was killed in the fight. ';
      }
      return text;
    };
    BitcoinH.Screen.menu({
      header: '<div class="banner"><span class="inverse">' + h(enemy) + ' is attacking you!</span></div>' +
        '<div class="attack"><img class="enemy" src="images/angry.jpeg" alt=""/><table class="plain condition">' +
        '<tr><td>Enemy zap resistance:</td><td>' + strength + '</td></tr>' +
        '<tr><td>Your zaps:</td><td>' + s.zaps + '</td></tr>' +
        '<tr><td>Plebs with you:</td><td>' + s.plebs + '</td></tr></table></div>',
      options: [
        {label: 'Orange pill that fool with sweet zaps!', fn: function() {
          var used = Math.min(s.zaps, 10 + Math.floor(Math.random() * 20));
          s.zaps -= used;
          var damage = Math.round(Math.max(0, strength * 2 * Math.random() - power));
          var text = 'You fire ' + used + ' zaps. ';
          if(damage > strength) {
            text += casualties(damage) + 'You were driven off.';
          } else {
            text += damage ? casualties(damage) : 'Nobody was hurt. ';
            s.sats += reward;
            text += 'You got some sweet sats for orange pilling that fool! ' + reward + ' sats.';
            if(game.occupation.key === 'educator' && Math.random() < 0.5) {
              var recruits = 1 + Math.floor(Math.random() * 3);
              s.plebs += recruits;
              text += ' ' + recruits + ' of them see the light and join your caravan.';
            }
          }
          finish(text);
        }},
        {label: 'Pay them off (' + bribe + ' sats)', fn: function() {
          if(s.sats < bribe) {
            finish('You don\'t have enough sats. They take what you have: ' + s.sats + ' sats. Feels like taxes.');
            s.sats = 0;
            return;
          }
          s.sats -= bribe;
          finish('You paid ' + bribe + ' sats in protection money. Feels like taxes.');
        }},
        {label: 'Run away', fn: function() {
          var damage = Math.floor(Math.max(0, strength * Math.random() / 4));
          finish(damage ? casualties(damage) + 'But you got away.' : 'You got away clean. Nobody saw anything.');
        }}
      ]
    });
  },

  /* ---------- tombstones ---------- */

  communityTombstone: function(ev, done) {
    var html = ev.epitaph.map(function(line) { return line.text; }).join('<br>');
    BitcoinH.Screen.menu({
      header: BitcoinH.Tombstone(html),
      intro: '',
      options: [
        {label: 'Pay your respects', fn: function() {
          window.open(ev.link, '_blank');
          done();
        }},
        {label: 'Leave to traverse the fiat wasteland.', fn: done}
      ]
    });
  },

  loadGraves: function() {
    try {
      return JSON.parse(localStorage.getItem('bt-graves')) || [];
    } catch (e) {
      return [];
    }
  },

  saveGrave: function(grave) {
    var graves = this.loadGraves();
    graves.push(grave);
    try {
      localStorage.setItem('bt-graves', JSON.stringify(graves.slice(-12)));
    } catch (e) {}
  },

  visitGrave: function(grave, done) {
    BitcoinH.Travel.message('You find the grave of ' + h(grave.name) + '.', function() {
      BitcoinH.Screen.page(BitcoinH.Tombstone('Here lies<br>' + h(grave.name) + '<br><br>' + h(grave.epitaph || '') +
        '<br><br><span class="small">' + h(grave.date) + '</span>'), done);
    });
  },

  gameOver: function() {
    var game = this;
    var s = S();
    this.over = true;
    this.traveling = false;
    clearTimeout(this.timer);
    BitcoinH.Sound.stop();
    BitcoinH.Sound.dirge();
    var leader = s.leader().name;
    BitcoinH.Screen.page('<p class="center">Everyone in your party has died.</p><p class="center">You lose...your cowboy hat!</p>', function() {
      BitcoinH.Screen.yesNo(BitcoinH.Tombstone('Here lies<br>' + h(leader)) + '<p>Would you like to write an epitaph?</p>', function(yes) {
        var bury = function(epitaph) {
          game.saveGrave({name: leader, epitaph: epitaph, miles: s.miles, date: s.dateString()});
          BitcoinH.Screen.page(BitcoinH.Tombstone('Here lies<br>' + h(leader) + '<br><br>' + h(epitaph)) +
            '<p class="center small">Future travelers will pass your grave at mile ' + s.miles + '.</p>', function() {
              BitcoinH.Sound.music('sound-theme');
              game.mainMenu();
            });
        };
        if(!yes) return bury('');
        BitcoinH.Screen.ask({
          header: BitcoinH.Tombstone('Here lies<br>' + h(leader)),
          question: 'Epitaph:',
          maxLength: 40,
          fn: bury
        });
      });
    });
  },

  /* ---------- the end of the trail ---------- */

  wallStreet: function(lm) {
    var game = this;
    var s = S();
    this.lookingAround = false;
    var text = lm.text;
    if(s.goxClaim) {
      s.sats += s.goxClaim;
      text += '<br><br>The Mt. Gox trustee finally pays out your claim: ' + s.goxClaim + ' sats. Only took forever.';
      s.goxClaim = 0;
    }
    this.landmarkPage(lm, function() { game.wallStreetMenu(); }, text);
  },

  wallStreetMenu: function() {
    var game = this;
    var s = S();
    var toll = this.price(400, 1);
    BitcoinH.Screen.menu({
      header: BitcoinH.Screen.placeHeader('Wall Street'),
      intro: '<p>The trail divides here. You may:</p>',
      options: [
        {label: 'float down the Lightning Rapids', fn: function() {
          BitcoinH.Screen.page('<p>You build a raft out of old ETF prospectuses and push off into the rapids. Steer clear of the rocks, or they will force close you.</p>', function() {
            BitcoinH.Raft.start(function(losses) {
              s.miles = BitcoinH.TRAIL_LENGTH;
              game.landmarkIndex = BitcoinH.Event.landmarks.length;
              if(!s.alive().length) return game.gameOver();
              var html = '<p>You made it down the Lightning Rapids!</p>' + (losses.length ? '<p>On the way down:</p><p>' + losses.join('<br>') + '</p>' : '<p>Not a scratch. Incredible.</p>');
              BitcoinH.Screen.page(html, function() { game.victory(); });
            });
          });
        }},
        {label: 'take the Layer 1 Toll Road (' + toll + ' sats)', fn: function() {
          if(s.sats < toll) {
            BitcoinH.Screen.page('<p>You don\'t have enough sats for the toll.</p>', function() { game.wallStreetMenu(); });
            return;
          }
          s.sats -= toll;
          BitcoinH.Screen.page('<p>You pay the toll. The Layer 1 Toll Road is slow, but it has never gone down.</p>', function() { game.startTravel(); });
        }}
      ]
    });
  },

  victory: function() {
    var game = this;
    var s = S();
    this.over = true;
    this.traveling = false;
    clearTimeout(this.timer);
    BitcoinH.Sound.stop();
    BitcoinH.Sound.fanfare();
    var health = s.healthLabel();
    var perPerson = {'good': 500, 'fair': 400, 'poor': 300, 'very poor': 200}[health];
    var alive = s.alive().length;
    var partsCount = s.parts.drive + s.parts.pi + s.parts.psu;
    var rows = [
      [alive + ' ' + (alive === 1 ? 'person' : 'people') + ' in ' + health + ' health', alive * perPerson],
      ['1 wagon', 50],
      [s.ostriches + ' ostriches', s.ostriches * 4],
      [partsCount + ' spare parts', partsCount * 2],
      [s.hats + ' tinfoil hats', s.hats * 2],
      [s.zaps + ' zaps', Math.floor(s.zaps / 50)],
      [Math.floor(s.food) + ' pounds of food', Math.floor(s.food / 25)],
      [s.sats.toLocaleString() + ' sats', Math.floor(s.sats / 50)],
      [s.plebs + ' plebs', s.plebs * 5]
    ];
    var total = rows.reduce(function(sum, r) { return sum + r[1]; }, 0);
    var final = Math.round(total * this.occupation.multiplier);
    BitcoinH.Screen.page(BitcoinH.Screen.placeHeader('Hyperbitcoinization Valley') +
      '<p>Congratulations! You have made it to Hyperbitcoinization! Let\'s see how many points you have received.</p>', function() {
        BitcoinH.Screen.page('<div class="banner"><span class="inverse">Points for arriving</span></div><table class="plain points">' +
          rows.map(function(r) { return '<tr><td>' + r[0] + '</td><td>' + r[1].toLocaleString() + '</td></tr>'; }).join('') +
          '<tr class="total"><td>Total</td><td>' + total.toLocaleString() + '</td></tr></table>', function() {
            BitcoinH.Screen.page('<p>For going as a ' + game.occupation.name + ', your points are multiplied by ' + game.occupation.multiplier + '.</p>' +
              '<p class="big">Your final score is ' + final.toLocaleString() + '.</p><p>Good job. Get back to work.</p>', function() {
                game.addTopTen(s.leader().name, final);
                BitcoinH.Sound.music('sound-theme');
                game.showTopTen(function() { game.mainMenu(); });
              });
          });
      });
  },

  /* ---------- the HODL top ten ---------- */

  loadTopTen: function() {
    try {
      return JSON.parse(localStorage.getItem('bt-topten')) || BitcoinH.TOP_TEN.slice();
    } catch (e) {
      return BitcoinH.TOP_TEN.slice();
    }
  },

  addTopTen: function(name, score) {
    var list = this.loadTopTen();
    list.push({name: name, score: score, you: true});
    list.sort(function(a, b) { return b.score - a.score; });
    list = list.slice(0, 10).map(function(e) { return {name: e.name, score: e.score}; });
    try {
      localStorage.setItem('bt-topten', JSON.stringify(list));
    } catch (e) {}
  },

  rating: function(score) {
    if(score >= 5000) return 'Trail guide';
    if(score >= 2000) return 'Adventurer';
    return 'Greenhorn';
  },

  showTopTen: function(next) {
    var game = this;
    var list = this.loadTopTen();
    BitcoinH.Screen.page('<div class="banner"><span class="inverse">The HODL Top Ten</span></div>' +
      '<table class="plain topten"><tr class="dim"><td>Name</td><td>Points</td><td>Rating</td></tr>' +
      list.map(function(e) {
        return '<tr><td>' + h(e.name) + '</td><td>' + e.score.toLocaleString() + '</td><td>' + game.rating(e.score) + '</td></tr>';
      }).join('') + '</table>', next);
  }
};

document.addEventListener('DOMContentLoaded', function() {
  BitcoinH.Game.start();
});
