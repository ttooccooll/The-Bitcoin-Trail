var BitcoinH = BitcoinH || {};

// starting supplies, perk and score multiplier for each kind of bitcoiner
BitcoinH.OCCUPATION_INITIALS = {
    pleb: {
        plebs: 40,
        food: 200,
        ostriches: 9,
        sats: 200,
        zappower: 2,
        multiplier: 1.5,
        perk: 'Humble and numerous. Morale recovers faster.',
    },
    node_runner: {
        plebs: 5,
        food: 25,
        ostriches: 3,
        sats: 350,
        zappower: 30,
        multiplier: 2,
        perk: 'Don\'t trust, verify. Loses half as much zappower to force closes and outages.',
    },
    miner: {
        plebs: 10,
        food: 120,
        ostriches: 7,
        sats: 1000,
        zappower: 5,
        multiplier: 1,
        perk: 'Earns a block subsidy every block (it halves, obviously). Mining minigame pays double.',
    },
    developer: {
        plebs: 35,
        food: 80,
        ostriches: 5,
        sats: 20,
        zappower: 10,
        multiplier: 2,
        perk: 'Reviews the enemy\'s code. Enemies have 30% less zap resistance.',
    },
    educator: {
        plebs: 50,
        food: 190,
        ostriches: 9,
        sats: 240,
        zappower: 3,
        multiplier: 1.5,
        perk: 'Orange pills defeated enemies. Winning a fight can recruit new plebs.',
    },
    nomad: {
        plebs: 1,
        food: 25,
        ostriches: 2,
        sats: 540,
        zappower: 1,
        multiplier: 3,
        perk: 'Geo-arbitrage. Travels 20% faster and pays 15% less at trading posts.',
    },
    altcoiner: {
        plebs: 0,
        food: 0,
        ostriches: 0,
        sats: 0,
        zappower: 0,
        multiplier: 0,
        perk: 'Have fun staying poor.',
    }
};

BitcoinH.OCCUPATION_NAMES = {
    pleb: 'Pleb',
    node_runner: 'Node Runner',
    miner: 'Miner',
    developer: 'Developer',
    educator: 'Educator',
    nomad: 'Nomad',
    altcoiner: 'Altcoiner'
};

BitcoinH.RANDOM_NYMS = [
    'Satoshi Nakamoto', 'Hal Finney', 'Pleb McStackface', 'Laszlo', 'Hodlonaut',
    'Nostrich Rider', 'Cypherpunk Cathy', 'Ser Stacksalot', 'Timechain Tim',
    'Low Time Preference', 'Sats Sorcerer', 'Node Nana', 'Lightning Larry',
    'Cold Storage Carl', 'Orange Pill Olivia', 'Fiat Fugitive', 'Block 840000'
];
