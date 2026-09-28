var BitcoinH = BitcoinH || {};

BitcoinH.Event = {
  usedEvents: [],

  eventTypes: [
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
      notification: 'positive',
      stat: 'plebs',
      value: 20,
      text: 'NGU! Oh no, now everyone wants to be a bitcoiner. New plebs: '
    },
    {
      type: 'STAT-CHANGE',
      notification: 'negative',
      stat: 'plebs',
      value: -5,
      text: 'BTC/USD price crash! Oh no, we just shook out the traders. Plebs lost: '
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
      notification: 'positive',
      stat: 'food',
      value: 40,
      text: 'Bumper harvest! Food added: '
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
          text: 'You have arrived at Bitcoin Island! Pick up some supplies while you can.',
          products: [
              {item: 'food', qty: 30, price: 90},
              {item: 'ostriches', qty: 2, price: 300},
              {item: 'zappower', qty: 2, price: 70},
              {item: 'plebs', qty: 5, price: 100}
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
            {item: 'ostriches', qty: 2, price: 300},
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
        text: 'The World Bank is attacking you'
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
      },
      {
        type: 'NEWS',
        notification: 'neutral',
        text: 'Cowboy credits reach all time high on coin market cap.'
      },
      {
        type: 'TOMBSTONE',
        notification: 'neutral',
        text: 'You have come accross the tombstone of <a href="https://stacker.news/OneOneSeven" target="_blank">@OneOneSeven</a>',
        epitaph: [
          {text: 'Here lies <a href="https://stacker.news/OneOneSeven" target="_blank">@OneOneSeven</a></br>'},
          {text: 'Loving territory founder of <a href="https://stacker.news/~charts_and_numbers" target="_blank">charts_and_numbers</a> and <a href="https://stacker.news/~aliens_and_UFOs" target="_blank">aliens_and_UFOs</a></br>'},
          {text: '"I’ll see you in another life brother"'}
        ],
        link: 'https://stacker.news/OneOneSeven',
        linkText: '@OneOneSeven'
      },
      {
        type: 'TOMBSTONE',
        notification: 'neutral',
        text: 'You have come accross the tombstone of <a href="https://stacker.news/grayruby" target="_blank">@grayruby</a>',
        epitaph: [
          {text: 'Here lies <a href="https://stacker.news/grayruby" target="_blank">@grayruby</a></br>'},
          {text: 'Loving territory founder of <a href="https://stacker.news/~Stacker_Sports" target="_blank">Stacker_Sports</a></br>'},
        ],
        link: 'https://stacker.news/grayruby',
        linkText: '@grayruby'
      },
      {
        type: 'TOMBSTONE',
        notification: 'neutral',
        text: 'You have come accross the tombstone of <a href="https://stacker.news/siggy47" target="_blank">@siggy47</a>',
        epitaph: [
          {text: 'Here lies <a href="https://stacker.news/siggy47" target="_blank">@siggy47</a></br>'},
          {text: 'Loving territory founder of <a href="https://stacker.news/~BooksAndArticles" target="_blank">BooksAndArticles</a>, <a href="https://stacker.news/~bitcoin_beginners" target="_blank">bitcoin_beginners</a>, <a href="https://stacker.news/~Politics_And_Law" target="_blank">Politics_And_Law</a>, and <a href="https://stacker.news/~Animal_World" target="_blank">Animal_World</a></br>'},
          {text: 'Siggy47 loved his dogs and his cats,'},
          {text: 'He wrote about freedom, he wrote about sats,'},
          {text: 'A family man, he`d oft share a little,'},
          {text: 'Collaborating with Darth Coin, his skin thick, not brittle,'},
          {text: 'He studied law and the Grateful Dead,'},
          {text: 'But when pushed to share much, he`d say, "Nice try fed."'},
        ],
        link: 'https://stacker.news/siggy47',
        linkText: '@siggy47'
      },
      {
        type: 'TOMBSTONE',
        notification: 'neutral',
        text: 'You have come accross the tombstone of <a href="https://stacker.news/jasonb" target="_blank">@jasonb</a>',
        epitaph: [
          {text: 'Here lies <a href="https://stacker.news/jasonb" target="_blank">@jasonb</a></br>'},
          {text: 'Hey, I am not at all above shilling from beyond the grave.</br>'},
          {text: '"You too can have a tombstone for the low, low price of 1000 sats. Enquire with me at my profile on stacker.news."'}
        ],
        link: 'https://stacker.news/jasonb',
        linkText: '@jasonb'
      },
      {
        type: 'TOMBSTONE',
        notification: 'neutral',
        text: 'You have come accross the tombstone of <a href="https://stacker.news/~Stacker_Sports" target="_blank">@Stacker_Sports</a>',
        epitaph: [
          {text: 'Here lies <a href="https://stacker.news/~Stacker_Sports" target="_blank">@Stacker_Sports</a></br>'},
        ],
        link: 'https://stacker.news/~Stacker_Sports',
        linkText: '@Stacker_Sports'
      },
      {
        type: 'TOMBSTONE',
        notification: 'neutral',
        text: 'You have come accross the tombstone of <a href="https://stacker.news/nerd2ninja" target="_blank">@nerd2ninja</a>',
        epitaph: [
          {text: 'Here lies <a href="https://stacker.news/nerd2ninja" target="_blank">@nerd2ninja</a></br>'},
          {text: 'For the crime of writing guides to aid criminals and terrorists worldwide operate and use unregistered money transmitting services; sentenced to prison</br>'},
          {text: 'Served life in prison for contempt of court refusing to give up seed phrase</br>'},
          {text: 'Bitcoin was in a timelocked multi-signature wallet. The new owners of the Bitcoin are unknown and at large</br>'},
          {text: 'Famous last words:'},
          {text: '"It matters not how strait the gate,'},
          {text: 'How charged with punishments the scroll,'},
          {text: 'I am the master of my fate,'},
          {text: 'I am the captain of my soul."'}
        ],
        link: 'https://stacker.news/nerd2ninja',
        linkText: '@nerd2ninja'
      },
          {
        type: 'STAT-CHANGE',
        notification: 'positive',
        stat: 'sats',
        value: 150,
        text: 'A stranger zapped your note about ostrich husbandry. Sats received: '
      },
      {
        type: 'STAT-CHANGE',
        notification: 'positive',
        stat: 'morale',
        value: 15,
        text: 'Someone at the campfire plays "HODL Me Closer, Tiny Dancer." Morale boost: '
      },
      {
        type: 'STAT-CHANGE',
        notification: 'negative',
        stat: 'morale',
        value: -15,
        text: 'A pleb reads the comments section on a mainstream news site. Morale lost: '
      },
      {
        type: 'STAT-CHANGE',
        notification: 'negative',
        stat: 'ostriches',
        value: -2,
        text: 'Your ostriches wandered off to join a DAO. Ostriches lost: '
      },
      {
        type: 'STAT-CHANGE',
        notification: 'positive',
        stat: 'plebs',
        value: 6,
        text: 'A local meetup joins your caravan. New plebs: '
      },
      {
        type: 'NEWS',
        notification: 'neutral',
        text: 'A central bank announces a "temporary" 3% inflation target. For the 40th year in a row.'
      },
      {
        type: 'NEWS',
        notification: 'neutral',
        text: 'Bitcoin has died for the 474th time. Nobody told the nodes.'
      },
      {
        type: 'NEWS',
        notification: 'neutral',
        text: 'A new layer 2 promises to fix everything. It is a database.'
      },
      {
        type: 'CHOICE',
        title: 'Mempool Congestion',
        text: 'Your transaction is stuck in a clogged mempool. A river of unconfirmed transactions blocks the trail.',
        options: [
          {label: 'Pay the high fee (60 sats)', outcome: function(s) {
            if(s.sats < 60) {
              s.change('food', -15);
              return ['Not enough sats. You wait anyway and eat 15 food.', 'negative'];
            }
            s.change('sats', -60);
            return ['Confirmed in the next block. Smooth sailing. -60 sats', 'positive'];
          }},
          {label: 'Wait it out (costs food)', outcome: function(s) {
            s.change('food', -25);
            return ['The mempool clears eventually. You ate 25 food while waiting.', 'neutral'];
          }},
          {label: 'Ford it with RBF (gamble)', outcome: function(s) {
            if(Math.random() < 0.55) {
              return ['Replace-by-fee for the win! You crossed for free.', 'positive'];
            }
            var lost = s.change('ostriches', -1);
            s.change('food', -20);
            return ['Your tx got pinned. ' + Math.abs(lost) + ' ostrich and 20 food were swept away.', 'negative'];
          }}
        ]
      },
      {
        type: 'CHOICE',
        title: 'Giveaway!',
        text: 'A verified-looking "Satoshi" offers to double any sats you send him.',
        options: [
          {label: 'Send it', outcome: function(s) {
            var lost = s.change('sats', -Math.floor(s.sats / 2));
            s.change('morale', -10);
            BitcoinH.Achievements.unlock('rekt');
            return ['It was a scam. Obviously. You lost ' + Math.abs(lost) + ' sats and some dignity.', 'negative'];
          }},
          {label: 'Block and report', outcome: function(s) {
            s.change('morale', 5);
            return ['Your plebs nod approvingly. Morale +5', 'positive'];
          }}
        ]
      },
      {
        type: 'CHOICE',
        title: 'Thanksgiving Dinner',
        text: 'Your no-coiner uncle asks, "So what is this bitcoin thing anyway?"',
        options: [
          {label: 'Orange pill him', outcome: function(s) {
            if(Math.random() < 0.6) {
              s.change('plebs', 3);
              return ['Two hours and one whiteboard later, the whole family joins. +3 plebs', 'positive'];
            }
            s.change('morale', -8);
            return ['He brings up "boiling the oceans." You lose the will to live. Morale -8', 'negative'];
          }},
          {label: 'Talk about the weather', outcome: function(s) {
            s.change('food', 20);
            return ['Peace at the table. You take home 20 food in leftovers.', 'positive'];
          }}
        ]
      },
      {
        type: 'CHOICE',
        title: 'Shitcoin Canyon',
        text: 'A shady guide offers a shortcut through Shitcoin Canyon. "100x faster, trust me bro."',
        options: [
          {label: 'Take the shortcut', outcome: function(s) {
            if(Math.random() < 0.4) {
              s.adoption += 400;
              return ['Against all odds you made it through. +400 adoption.', 'positive'];
            }
            var plebs = s.change('plebs', -Math.ceil(s.plebs * 0.2));
            var sats = s.change('sats', -Math.floor(s.sats * 0.3));
            return ['Rug pulled in the canyon. Lost ' + Math.abs(plebs) + ' plebs and ' + Math.abs(sats) + ' sats.', 'negative'];
          }},
          {label: 'Stay on the trail', outcome: function(s) {
            s.change('morale', 3);
            BitcoinH.Achievements.unlock('stay_humble');
            return ['Stay humble, stack sats. Morale +3', 'positive'];
          }}
        ]
      },
      {
        type: 'CHOICE',
        title: 'Lost Seed Phrase',
        text: 'You find a seed phrase scribbled on a napkin at a campsite.',
        options: [
          {label: 'Track down the owner', outcome: function(s) {
            s.change('food', -10);
            s.change('plebs', 4);
            s.change('morale', 8);
            return ['The grateful owner and friends join your caravan. +4 plebs, morale +8, -10 food', 'positive'];
          }},
          {label: 'Eat the napkin', outcome: function(s) {
            s.change('food', 1);
            return ['Delicious. Security through digestion. +1 food', 'neutral'];
          }}
        ]
      },
      {
        type: 'CHOICE',
        title: 'Firmware Update',
        text: 'Your hardware wallet says a firmware update is available.',
        options: [
          {label: 'Verify the signature, then update', outcome: function(s) {
            s.change('morale', 4);
            return ['Signature checks out. You feel like a real cypherpunk. Morale +4', 'positive'];
          }},
          {label: 'Click "update" in the email link', outcome: function(s) {
            var lost = s.change('sats', -Math.floor(s.sats * 0.4));
            return ['That was not the manufacturer. Phished for ' + Math.abs(lost) + ' sats.', 'negative'];
          }},
          {label: 'Skip it', outcome: function(s) {
            return ['If it ain\'t broke. Nothing happens.', 'neutral'];
          }}
        ]
      },
      {
        type: 'CHOICE',
        title: 'Stranded Ostrich',
        text: 'A wild ostrich is stuck in a barbed wire fence put up by the Fiat Ranch.',
        options: [
          {label: 'Cut it free', outcome: function(s) {
            if(Math.random() < 0.7) {
              s.change('ostriches', 1);
              return ['It follows you home. +1 ostrich', 'positive'];
            }
            var hurt = s.change('plebs', -1);
            return ['It kicks. Ostriches kick hard. ' + Math.abs(hurt) + ' pleb lost.', 'negative'];
          }},
          {label: 'Keep moving', outcome: function(s) {
            s.change('morale', -3);
            return ['Your plebs feel bad about it. Morale -3', 'neutral'];
          }}
        ]
      },
    ],

    //milestones along the trail, reached in order as adoption grows
    landmarks: [
      {at: 0, name: 'Genesis Block', text: 'The Times 03/Jan/2009. Your journey begins.'},
      {
        at: 900,
        name: 'Pizza Day',
        type: 'CHOICE',
        title: 'Pizza Day',
        text: 'A hungry Laszlo offers two pizzas. The price? Half your stack.',
        options: [
          {label: 'Buy the pizzas', outcome: function(s) {
            s.change('sats', -Math.floor(s.sats / 2));
            s.change('food', 80);
            s.change('morale', 10);
            BitcoinH.Achievements.unlock('pizza');
            return ['Most expensive pizza in history. Worth it. +80 food, morale +10', 'positive'];
          }},
          {label: 'HODL', outcome: function(s) {
            s.change('morale', -5);
            return ['You stay hungry, but your future self thanks you. Morale -5', 'neutral'];
          }}
        ]
      },
      {
        at: 1900,
        name: 'Mt. Gox',
        type: 'CHOICE',
        title: 'Mt. Gox',
        text: 'The biggest exchange around offers to hold your sats for safe keeping on the rest of the trail.',
        options: [
          {label: 'Deposit sats on the exchange', outcome: function(s) {
            var lost = s.change('sats', -s.sats);
            s.goxClaim = Math.floor(Math.abs(lost) * 0.25);
            return ['Withdrawals are "temporarily paused." Forever. Lost ' + Math.abs(lost) + ' sats. Maybe the trustee pays out someday...', 'negative'];
          }},
          {label: 'Not your keys, not your coins', outcome: function(s) {
            s.change('morale', 8);
            BitcoinH.Achievements.unlock('self_custody');
            return ['You keep your keys. Smart. Morale +8', 'positive'];
          }}
        ]
      },
      {
        at: 3100,
        name: 'Blocksize Wars',
        type: 'CHOICE',
        title: 'The Blocksize Wars',
        text: 'The caravan splits into factions. The Big Blockers promise faster travel with bigger wagons.',
        options: [
          {label: 'Bigger blocks! Fork it!', outcome: function(s) {
            var lost = s.change('plebs', -Math.ceil(s.plebs * 0.3));
            s.change('morale', -15);
            return ['Your fork dies in obscurity. ' + Math.abs(lost) + ' plebs wander off to Bcash.', 'negative'];
          }},
          {label: 'Run a UASF node', outcome: function(s) {
            s.change('zappower', 8);
            s.change('morale', 15);
            BitcoinH.Achievements.unlock('small_blocker');
            return ['The users win. SegWit activates and unlocks lightning. +8 zappower, morale +15', 'positive'];
          }}
        ]
      },
      {
        at: 4300,
        name: 'Bitcoin Beach',
        type: 'SHOP',
        text: 'You reach Bitcoin Beach in El Zonte. The surf is up and the merchants take lightning.',
        products: [
          {item: 'food', qty: 30, price: 60},
          {item: 'ostriches', qty: 1, price: 180},
          {item: 'zappower', qty: 3, price: 50},
          {item: 'plebs', qty: 5, price: 70}
        ]
      },
      {at: 5600, name: 'Legal Tender', text: 'A nation adopts bitcoin as legal tender. The IMF faints. Morale +10', morale: 10},
      {at: 6900, name: 'Wall Street', text: 'Spot ETFs approved. The suits arrive, demanding paper bitcoin. You keep yours in cold storage.'},
      {
        at: 8100,
        name: 'Lugano',
        type: 'SHOP',
        text: 'Plan B has come to Lugano. The last trading post before the final stretch.',
        products: [
          {item: 'food', qty: 40, price: 120},
          {item: 'ostriches', qty: 2, price: 400},
          {item: 'zappower', qty: 4, price: 120},
          {item: 'plebs', qty: 10, price: 160}
        ]
      },
      {at: 9300, name: 'Nation-State FOMO', text: 'Central banks start stacking. The final attacks will be the fiercest.'},
      {at: 10000, name: 'Hyperbitcoinization', text: ''}
    ],

    generateEvent: function(){
      var unusedEvents = this.eventTypes.filter(event => !this.usedEvents.includes(event));
      if (unusedEvents.length === 0) {
        this.usedEvents = [];
        unusedEvents = this.eventTypes;
      }
      var eventIndex = Math.floor(Math.random() * unusedEvents.length);
      var eventData = unusedEvents[eventIndex];
      this.usedEvents.push(eventData);
      this.handleEvent(eventData);
    },

    handleEvent: function(eventData) {
      switch(eventData.type) {
        case 'STAT-CHANGE':
          this.stateChangeEvent(eventData);
          break;
        case 'SHOP':
          this.game.pauseJourney();
          this.ui.notify(eventData.text, eventData.notification || 'neutral');
          this.shopEvent(eventData);
          break;
        case 'ATTACK':
          this.game.pauseJourney();
          this.ui.notify(eventData.text, eventData.notification);
          this.attackEvent(eventData);
          break;
        case 'NEWS':
          this.ui.notify(eventData.text, eventData.notification);
          break;
        case 'TOMBSTONE':
          this.game.pauseJourney();
          this.ui.notify(eventData.text, eventData.notification);
          this.tombstoneEvent(eventData);
          break;
        case 'CHOICE':
          this.game.pauseJourney();
          this.ui.notify(eventData.title + '!', 'neutral');
          this.ui.showChoice(eventData);
          break;
        default:
          console.warn('Unknown event type:', eventData.type);
      }
    },

    stateChangeEvent: function(eventData) {
      var value = eventData.value;
      //node runners verify, so they lose less zappower
      if(eventData.stat === 'zappower' && value < 0 && this.stackers.occupation === 'node_runner') {
        value = Math.ceil(value / 2);
      }
      //random misfortune never wipes out the whole caravan on its own
      if(eventData.stat === 'plebs' && value < 0) {
        value = Math.max(value, 1 - this.stackers.plebs);
      }
      var actual = this.stackers.change(eventData.stat, value);
      if(actual !== 0) {
        this.ui.notify(eventData.text + Math.abs(actual), eventData.notification);
        this.ui.popStat(eventData.stat, actual);
        BitcoinH.Sound.sfx(actual > 0 ? 'good' : 'bad');
        if(actual < 0) BitcoinH.FX.shake();
      }
    },

    shopEvent: function(eventData, title) {
      var discount = this.stackers.occupation === 'nomad' ? 0.85 : 1;
      var products = eventData.products.map(function(product) {
        var priceFactor = 0.7 + 0.6 * Math.random();
        return {
          item: product.item,
          qty: product.qty,
          price: Math.max(1, Math.round(product.price * priceFactor * discount))
        };
      });
      title = title || (eventData.text.match(/(?:at|to|reach) (?:the )?([A-Z][\w. ]+?)[!.]/) || [])[1];
      this.ui.showShop(products, title);
    },

    attackEvent: function(eventData){
      //enemies get nastier the closer we get to hyperbitcoinization
      var difficulty = 1 + 2 * this.stackers.adoption / BitcoinH.FINAL_ADOPTION;
      var zappower = Math.round((0.7 + 0.6 * Math.random()) * BitcoinH.ENEMY_ZAPPOWER_AVG * difficulty);
      if(this.stackers.occupation === 'developer') zappower = Math.round(zappower * 0.7);
      var gold = Math.round((0.7 + 0.6 * Math.random()) * BitcoinH.ENEMY_GOLD_AVG * difficulty);
      var enemy = eventData.text.replace(' is attacking you', '');
      this.ui.showAttack(zappower, gold, enemy);
    },

    tombstoneEvent: function(eventData){
      var linkHtml = '<a href="' + eventData.link + '" target="_blank">' + eventData.linkText + '</a>';
      this.ui.showTombstone(eventData, linkHtml);
    }
  };
