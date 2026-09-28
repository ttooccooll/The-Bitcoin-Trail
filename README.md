# The Bitcoin Trail

A parody of a certain 1985 computer lab classic. Lead your party of five from the Genesis Block across 2,100 miles of fiat wasteland to Hyperbitcoinization Valley, or die of dysentery trying.

Open `index.html` in a browser (or serve the folder with any static file server) and play. No build step, no dependencies.

## On the trail

- **Pick who you are.** A miner from Texas has plenty of sats. A nomad from El Salvador has almost none, but earns triple points.
- **Name your party.** Then watch them come down with dysentery, cholera, FOMO and shitcoin fever.
- **Shop at Satoshi's General Store.** Buy ostriches, food, tinfoil hats, zaps and spare node parts. The farther west you go, the more the forts charge.
- **Press ENTER to size up the situation.** Check supplies, look at the map, change pace and rations, rest, trade or hunt.
- **Cross rivers of unconfirmed transactions.** Ford them, caulk the wagon and float across, or pay the ferry's priority fee. Watch the mempool depth.
- **Hunt bulls and bears.** You can only carry 100 pounds back to the wagon.
- **Stop at the landmarks and forts.** Pizza Day, Mt. Gox, Satoshi's Last Email, the Blocksize Wars, Bitcoin Beach, Riga, Lugano and more.
- **Survive the fiat mafia.** Orange pill them, pay them off, or run.
- **At Wall Street, pick your finish.** Raft down the Lightning Rapids, or pay for the Layer 1 Toll Road.
- **Make it, and see your points.** Survivors, supplies and sats all count, and you land on the HODL Top Ten.
- **Die, and write your epitaph.** Future travelers will find your grave on the trail.

## Controls

Type the number of your choice and press ENTER, or tap it. SPACE BAR continues. When hunting, use the arrows or mouse to aim and SPACE or a tap to shoot. On the rapids, steer with the arrows or hold either side of the screen.

## Code map

- `js/Bitcoiners.js`: occupations and default party names
- `js/Stackers.js`: your party, supplies, health, illness, weather and the calendar
- `js/Event.js`: trail events, tombstones, landmarks, fort talk and trades
- `js/UI.js`: the green screen: menus, prompts, the travel screen and tombstones
- `js/Game.js`: the whole journey, from the title screen to the Top Ten
- `js/Hunt.js`: the hunting minigame and the pixel sprites
- `js/Raft.js`: the Lightning Rapids
- `js/Sound.js`: the music and the one-bit speaker beeps
- `js/OneSat.js`: live block height, fee and price ticker from mempool.space
