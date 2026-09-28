# The Bitcoin Trail

An Oregon Trail parody. Lead your caravan of plebs and ostriches from the fiat wasteland to hyperbitcoinization, or lose your cowboy hat trying.

Open `index.html` in a browser (or serve the folder with any static file server) and play. No build step, no dependencies.

## How to play

- **Pick a kind of bitcoiner.** Each one has different starting supplies, a perk and a score multiplier. The harder the start, the bigger the multiplier.
- **Set your pace.** Stroll, Stack or Full Send. Going faster costs morale, and sometimes costs plebs.
- **Set your rations.** Carnivore, Normal or Fasting. More food means happier plebs, and happy plebs walk faster. When morale collapses, plebs rage quit to go gamble on memecoins.
- **Mine a block.** This is the game's version of hunting: land the nonce under the difficulty target to earn the block reward. The subsidy halves every halving, and the difficulty rises with every block you find.
- **Reach the landmarks.** Pizza Day, Mt. Gox, the Blocksize Wars, Bitcoin Beach, Lugano and more. Each one brings a decision, a trading post or some news.
- **Survive what the trail throws at you.** Attacks from the fiat mafia (fight, pay them off or run), mempool congestion, giveaway scams, tombstones of fallen stackers and plenty of other decisions.

Your score depends on who and what made it to the end, how fast you got there, and your occupation multiplier. The top five scores and 18 achievements are saved in your browser.

## Controls

| Key | Action |
| --- | --- |
| Space | Pause / resume (or hash, during mining) |
| M | Mine a block |
| P | Change pace |
| R | Change rations |
| S | Toggle sound |
| 1-9 | Pick an option in any dialog |

## Code map

- `js/Bitcoiners.js`: occupations, perks and random nyms
- `js/Stackers.js`: the caravan's stats, pace, rations, weight and morale
- `js/Event.js`: random events, decisions, tombstones and landmarks
- `js/Game.js`: game loop, halvings, landmarks, scoring and controls
- `js/UI.js`: rendering, dialogs, shop, fights and the game over screen
- `js/Minigame.js`: the proof-of-work minigame
- `js/Achievements.js`: achievements and high scores
- `js/Sound.js`: music tracks and synthesized sound effects
- `js/FX.js`: screen shake, lightning, sparks and coin confetti
- `js/OneSat.js`: live block height, fee and price ticker from mempool.space
