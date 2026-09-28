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
      value: -100,
      text: 'You just found out that much of your "food" bought from big ag was full of high fructose corn syrup. Pounds of food lost: '
    },
    {
      type: 'STAT-CHANGE',
      notification: 'negative',
      stat: 'sats',
      value: -500,
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
      stat: 'zaps',
      value: -100,
      text: 'FORCE CLOSE! Zaps lost: '
    },
    {
      type: 'STAT-CHANGE',
      notification: 'positive',
      stat: 'food',
      value: 5,
      text: 'Just for fun, you eat zee bugs. Pounds of food added: '
    },
    {
      type: 'STAT-CHANGE',
      notification: 'positive',
      stat: 'food',
      value: 200,
      text: 'Bumper harvest! Pounds of food added: '
    },
    {
      type: 'STAT-CHANGE',
      notification: 'negative',
      stat: 'food',
      value: -200,
      text: 'Food seized by the government. Good thing they cannot take your bitcoin. Pounds of food lost: '
    },
    {
      type: 'STAT-CHANGE',
      notification: 'positive',
      stat: 'food',
      value: 250,
      text: 'You start your own homestead. Pounds of food added: '
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
      stat: 'zaps',
      value: 100,
      text: 'Batch opened a ton of lightning channels. New zaps: '
    },
    {
      type: 'STAT-CHANGE',
      notification: 'negative',
      stat: 'zaps',
      value: -25,
      text: 'Power outage! Node offline! Zaps lost: '
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
      type: 'NEWS',
      notification: 'neutral',
      text: 'Bitcoin has died for the 474th time. Nobody told the nodes.'
    },
    {
      type: 'CHOICE',
      title: 'Giveaway!',
      text: 'A verified-looking "Satoshi" offers to double any sats you send him.',
      options: [
        {label: 'Send it', outcome: function(s) {
          var lost = s.change('sats', -Math.floor(s.sats / 2));
          s.change('health', -5);
          return 'It was a scam. Obviously. You lost ' + Math.abs(lost) + ' sats and some dignity.';
        }},
        {label: 'Block and report', outcome: function(s) {
          return 'Your plebs nod approvingly.';
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
            return 'Two hours and one whiteboard later, the whole family joins. 3 new plebs.';
          }
          s.change('health', -5);
          return 'He brings up "boiling the oceans." You lose the will to live.';
        }},
        {label: 'Talk about the weather', outcome: function(s) {
          s.change('food', 40);
          return 'Peace at the table. You take home 40 pounds of leftovers.';
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
            s.shortcut = 60;
            return 'Against all odds you made it through. You saved 60 miles.';
          }
          var plebs = s.change('plebs', -Math.ceil(s.plebs * 0.2));
          var sats = s.change('sats', -Math.floor(s.sats * 0.3));
          return 'Rug pulled in the canyon. Lost ' + Math.abs(plebs) + ' plebs and ' + Math.abs(sats) + ' sats.';
        }},
        {label: 'Stay on the trail', outcome: function(s) {
          return 'Stay humble, stack sats.';
        }}
      ]
    },
    {
      type: 'CHOICE',
      title: 'Lost Seed Phrase',
      text: 'You find a seed phrase scribbled on a napkin at a campsite.',
      options: [
        {label: 'Track down the owner', outcome: function(s) {
          s.change('food', -20);
          s.change('plebs', 4);
          return 'The grateful owner and friends join your caravan. 4 new plebs.';
        }},
        {label: 'Eat the napkin', outcome: function(s) {
          s.change('food', 1);
          return 'Delicious. Security through digestion.';
        }}
      ]
    },
    {
      type: 'CHOICE',
      title: 'Firmware Update',
      text: 'Your hardware wallet says a firmware update is available.',
      options: [
        {label: 'Verify the signature, then update', outcome: function(s) {
          return 'Signature checks out. You feel like a real cypherpunk.';
        }},
        {label: 'Click "update" in the email link', outcome: function(s) {
          var lost = s.change('sats', -Math.floor(s.sats * 0.4));
          return 'That was not the manufacturer. Phished for ' + Math.abs(lost) + ' sats.';
        }},
        {label: 'Skip it', outcome: function(s) {
          return 'If it ain\'t broke. Nothing happens.';
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
            return 'It follows you. You have a new ostrich.';
          }
          s.change('health', -6);
          return 'It kicks. Ostriches kick hard.';
        }},
        {label: 'Keep moving', outcome: function(s) {
          return 'Your plebs feel bad about it.';
        }}
      ]
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
  ],

  //the classic misfortunes of the trail, these can happen again and again
  trailEvents: [
    function(s) {
      var days = 1 + Math.floor(Math.random() * 3);
      return {text: 'Lost connection to peers. Lose ' + days + (days > 1 ? ' days.' : ' day.'), days: days};
    },
    function(s) {
      return {text: 'Heavy FUD. Lose 1 day.', days: 1};
    },
    function(s) {
      if(s.weather === 'cold' || s.weather === 'very cold') {
        return {text: 'Blizzard. Lose 2 days.', days: 2};
      }
      return {text: 'Severe thunderstorm. Lose 1 day.', days: 1};
    },
    function(s) {
      var keys = Object.keys(BitcoinH.PARTS);
      var key = keys[Math.floor(Math.random() * keys.length)];
      var part = BitcoinH.PARTS[key];
      var repairChance = s.occupation.key === 'node_runner' ? 0.8 : 0.3;
      if(Math.random() < repairChance) {
        return {text: 'Your node\'s ' + part + ' broke. You were able to repair it.'};
      }
      if(s.parts[key] > 0) {
        s.parts[key]--;
        return {text: 'Your node\'s ' + part + ' broke. You replaced it with your spare.'};
      }
      return {text: 'Your node\'s ' + part + ' broke and you have no spare. You lose 3 days waiting for a new one to ship.', days: 3};
    },
    function(s) {
      var roll = Math.random();
      var lost;
      if(roll < 0.3 && s.sats > 0) {
        lost = Math.abs(s.change('sats', -Math.min(s.sats, 100 + Math.floor(Math.random() * 300))));
        return {text: 'A hacker comes during the night and steals ' + lost + ' sats. Should have used cold storage.'};
      }
      if(roll < 0.6 && s.food > 0) {
        lost = Math.abs(s.change('food', -(50 + Math.floor(Math.random() * 100))));
        return {text: 'A thief comes during the night and steals ' + lost + ' pounds of food.'};
      }
      if(roll < 0.8 && s.hats > 0) {
        lost = Math.abs(s.change('hats', -1));
        return {text: 'A thief comes during the night and steals ' + lost + ' tinfoil hat.'};
      }
      if(s.zaps > 0) {
        lost = Math.abs(s.change('zaps', -Math.min(s.zaps, 20 + Math.floor(Math.random() * 40))));
        return {text: 'A thief comes during the night and steals ' + lost + ' zaps.'};
      }
      return null;
    },
    function(s) {
      if(s.ostriches <= 0) return null;
      if(Math.random() < 0.5) {
        s.change('ostriches', -1);
        return {text: 'One of your ostriches has died.'};
      }
      return {text: 'One of your ostriches is injured. It limps along.'};
    },
    function(s) {
      var found = s.change('food', 20 + Math.floor(Math.random() * 30));
      return found ? {text: 'Find wild steak. You gather ' + found + ' pounds of it.'} : null;
    },
    function(s) {
      var roll = Math.random();
      if(roll < 0.4) {
        s.parts.psu++;
        return {text: 'You find an abandoned wagon full of old mining rigs. You salvage a spare power supply.'};
      }
      if(roll < 0.7) {
        var zaps = s.change('zaps', 40);
        return {text: 'You find an abandoned wagon. Inside you find ' + zaps + ' zaps.'};
      }
      s.change('hats', 2);
      return {text: 'You find an abandoned wagon. Inside you find 2 tinfoil hats.'};
    },
    function(s) {
      s.change('health', -8);
      return {text: 'Bad water.'};
    },
    function(s) {
      s.change('health', -4);
      return {text: 'Very little water.'};
    },
    function(s) {
      if(s.ostriches > 1 && Math.random() < 0.3) {
        s.change('ostriches', -1);
        return {text: 'No grass for the ostriches. One of them wanders off looking for some.'};
      }
      return {text: 'No grass for the ostriches.'};
    },
    function(s) {
      var healthy = s.alive().filter(function(m) { return !m.sick; });
      if(!healthy.length) return null;
      var victim = healthy[Math.floor(Math.random() * healthy.length)];
      victim.sick = {illness: 'a snakebite', days: 6};
      return {text: victim.name + ' was bitten by a snake.'};
    }
  ],

  //the trail, from east to west
  landmarks: [
    {miles: 0, name: 'Genesis Block', type: 'town',
      text: 'The Times 03/Jan/2009. Chancellor on brink of second bailout for banks. Your journey begins here.'},
    {miles: 102, name: 'the Mempool River', type: 'river', width: 620, depth: 3.2, ferry: 25},
    {miles: 185, name: 'Pizza Day', type: 'landmark',
      text: 'On May 22, 2010, Laszlo paid 10,000 bitcoin for two pizzas. You can still smell them from here.',
      choice: {
        title: 'Pizza Day',
        text: 'A hungry pleb offers you two pizzas. The price? Half your sats.',
        options: [
          {label: 'Buy the pizzas', outcome: function(s) {
            s.change('sats', -Math.floor(s.sats / 2));
            s.change('food', 60);
            s.change('health', 10);
            return 'Most expensive pizza in history. Worth it. 60 pounds of food added.';
          }},
          {label: 'HODL', outcome: function(s) {
            return 'You stay hungry, but your future self thanks you.';
          }}
        ]
      }},
    {miles: 304, name: 'Fort Bitcoin Beach', type: 'fort', prices: 1.25,
      text: 'The surf is up in El Zonte, and the merchants take lightning.'},
    {miles: 554, name: 'Mt. Gox', type: 'landmark',
      text: 'The biggest exchange on the trail towers over the plains. Many travelers leave their coins here.',
      choice: {
        title: 'Mt. Gox',
        text: 'Mt. Gox offers to hold your sats for safekeeping on the rest of the trail.',
        options: [
          {label: 'Deposit your sats', outcome: function(s) {
            var lost = s.change('sats', -s.sats);
            s.goxClaim = Math.floor(Math.abs(lost) * 0.25);
            return 'Withdrawals are "temporarily paused." Forever. You lost ' + Math.abs(lost) + ' sats. Maybe the trustee pays out someday...';
          }},
          {label: 'Not your keys, not your coins', outcome: function(s) {
            return 'You keep your keys. Smart.';
          }}
        ]
      }},
    {miles: 640, name: 'Fort Riga', type: 'fort', prices: 1.5,
      text: 'Honey badgers roam the streets. The conference hall doubles as a trading post.'},
    {miles: 830, name: 'Satoshi\'s Last Email', type: 'landmark',
      text: 'In April 2011, Satoshi wrote that he had "moved on to other things." Travelers have carved their nyms into the rock here ever since.'},
    {miles: 932, name: 'the Blocksize Wars', type: 'landmark',
      text: 'The trail divides here. The Big Blockers promise a faster road with bigger wagons.',
      choice: {
        title: 'The trail divides',
        text: 'The trail divides here. You may:',
        options: [
          {label: 'take the Big Block shortcut', outcome: function(s) {
            var lost = s.change('plebs', -Math.ceil(s.plebs * 0.3));
            s.lostDays = 5;
            return 'The shortcut dead-ends in the Bcash swamp. ' + Math.abs(lost) + ' plebs stay behind to fork off. You lose 5 days finding your way back.';
          }},
          {label: 'head for the SegWit Pass', outcome: function(s) {
            s.change('zaps', 80);
            s.change('health', 10);
            return 'The users win. SegWit activates and unlocks lightning. You gain 80 zaps.';
          }}
        ]
      }},
    {miles: 1057, name: 'Fort Lugano', type: 'fort', prices: 1.75,
      text: 'Plan B has come to Lugano. You can pay for almost anything here with sats.'},
    {miles: 1151, name: 'Laser Eyes Springs', type: 'landmark', health: 10,
      text: 'The spring water glows a faint red. Everyone who drinks it feels bullish.'},
    {miles: 1288, name: 'Fort Bitcoin Park', type: 'fort', prices: 2,
      text: 'A friendly outpost in Nashville. There is always a meetup going on.'},
    {miles: 1470, name: 'the Lightning River', type: 'river', width: 1000, depth: 5.4, guide: 3},
    {miles: 1543, name: 'Fort Bitcoin Commons', type: 'fort', prices: 2.25,
      text: 'Yee-haw! The last fort before the Halving Mountains.'},
    {miles: 1700, name: 'the Halving Mountains', type: 'landmark',
      text: 'Every 210,000 blocks the trail gets twice as steep. Bundle up.'},
    {miles: 1830, name: 'Wall Street', type: 'wallstreet',
      text: 'Spot ETFs were approved here. The suits want your coins. The main trail ends at the Lightning Rapids.'},
    {miles: 2100, name: 'Hyperbitcoinization Valley', type: 'end'}
  ],

  //talk to people at the forts
  quotes: [
    {who: 'Satoshi Nakamoto, in a 2009 forum post', text: 'The root problem with conventional currency is all the trust that\'s required to make it work.'},
    {who: 'Satoshi Nakamoto, in a 2009 email', text: 'It might make sense just to get some in case it catches on.'},
    {who: 'Satoshi Nakamoto, in 2010', text: 'If you don\'t believe it or don\'t get it, I don\'t have the time to try to convince you, sorry.'},
    {who: 'Hal Finney, January 2009', text: 'Running bitcoin'},
    {who: 'A grizzled node runner', text: 'Don\'t trust. Verify. And don\'t ford a river deeper than three vMB.'},
    {who: 'A woman selling tinfoil hats', text: 'It gets mighty cold up in the Halving Mountains. You\'ll want a hat for every head in your party.'},
    {who: 'A pleb with empty pockets', text: 'I left my coins on Mt. Gox. Now I just keep walking.'},
    {who: 'An old miner', text: 'Hunting is good out here. The bulls are big, but you can only carry 100 pounds back to the wagon.'},
    {who: 'A trader', text: 'Prices go up the farther west you go. Buy your food early.'},
    {who: 'A young girl', text: 'My ma says sats are like steak. You can never have too much.'},
    {who: 'A scout', text: 'Up at the Blocksize Wars the trail divides. Only one way gets you through.'},
    {who: 'A tired educator', text: 'Keep your party on filling rations. Sick folks don\'t last long on bare bones.'},
    {who: 'A raft builder', text: 'The Lightning Rapids will force close anyone who isn\'t paying attention.'}
  ],

  //someone on the trail wants to swap
  trades: [
    {want: ['ostriches', 1], give: ['food', 200]},
    {want: ['food', 100], give: ['hats', 2]},
    {want: ['hats', 2], give: ['ostriches', 1]},
    {want: ['zaps', 40], give: ['drive', 1]},
    {want: ['sats', 200], give: ['food', 150]},
    {want: ['food', 150], give: ['zaps', 60]},
    {want: ['pi', 1], give: ['sats', 250]},
    {want: ['zaps', 60], give: ['psu', 1]},
    {want: ['ostriches', 1], give: ['sats', 300]},
    {want: ['sats', 300], give: ['fiat', 1000]}
  ],

  itemName: function(item, qty) {
    var names = {
      ostriches: qty === 1 ? 'ostrich' : 'ostriches',
      food: 'pounds of food',
      hats: qty === 1 ? 'tinfoil hat' : 'tinfoil hats',
      zaps: 'zaps',
      sats: 'sats',
      drive: 'spare hard drive',
      pi: 'spare raspberry pi',
      psu: 'spare power supply',
      fiat: 'fiat dollars'
    };
    return qty.toLocaleString() + ' ' + names[item];
  },

  have: function(item) {
    var s = this.stackers;
    if(BitcoinH.PARTS[item]) return s.parts[item];
    if(item === 'fiat') return 0;
    return s[item];
  },

  adjust: function(item, qty) {
    var s = this.stackers;
    if(item === 'fiat') return;
    if(BitcoinH.PARTS[item]) s.parts[item] += qty;
    else s.change(item, qty);
  },

  //pick a random event, never repeating one until they have all been used
  generateEvent: function() {
    var roll = Math.random();
    if(roll < 0.45) {
      var trail = this.trailEvents[Math.floor(Math.random() * this.trailEvents.length)];
      return {type: 'TRAIL', fn: trail};
    }
    var unusedEvents = this.eventTypes.filter(event => !this.usedEvents.includes(event));
    if(unusedEvents.length === 0) {
      this.usedEvents = [];
      unusedEvents = this.eventTypes;
    }
    var eventData = unusedEvents[Math.floor(Math.random() * unusedEvents.length)];
    this.usedEvents.push(eventData);
    return eventData;
  },

  //apply a stat change event, returns the message or null if nothing happened
  stateChangeEvent: function(eventData) {
    var value = eventData.value;
    var s = this.stackers;
    //node runners verify, so they lose less
    if(eventData.stat === 'zaps' && value < 0 && s.occupation.key === 'node_runner') {
      value = Math.ceil(value / 2);
    }
    var actual = s.change(eventData.stat, value);
    if(actual === 0) return null;
    return eventData.text + Math.abs(actual);
  }
};
