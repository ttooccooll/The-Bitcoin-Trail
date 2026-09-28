var BitcoinH = BitcoinH || {};

// who you can be, what you start with and how many points you deserve
BitcoinH.OCCUPATIONS = [
    {
        key: 'miner',
        title: 'Be a miner from Texas',
        name: 'miner',
        sats: 8000,
        plebs: 10,
        multiplier: 1,
        perk: 'Miners collect a block subsidy every day on the trail.'
    },
    {
        key: 'pleb',
        title: 'Be a pleb from Ohio',
        name: 'pleb',
        sats: 4000,
        plebs: 40,
        multiplier: 1.5,
        perk: 'Plebs travel with the biggest crowd of followers.'
    },
    {
        key: 'educator',
        title: 'Be an educator from Nashville',
        name: 'educator',
        sats: 4000,
        plebs: 50,
        multiplier: 1.5,
        perk: 'Educators orange pill the folks they talk to, and sometimes the folks they fight.'
    },
    {
        key: 'node_runner',
        title: 'Be a node runner from Riga',
        name: 'node runner',
        sats: 3000,
        plebs: 5,
        multiplier: 2,
        perk: 'Node runners can usually repair broken node parts.'
    },
    {
        key: 'developer',
        title: 'Be a developer from a basement',
        name: 'developer',
        sats: 2500,
        plebs: 35,
        multiplier: 2,
        perk: 'Developers review the enemy\'s code, so enemies are weaker.'
    },
    {
        key: 'nomad',
        title: 'Be a nomad from El Salvador',
        name: 'nomad',
        sats: 2000,
        plebs: 1,
        multiplier: 3,
        perk: 'Nomads travel light and fast, and pay less at the forts.'
    },
    {
        key: 'altcoiner',
        title: 'Be an altcoiner',
        name: 'altcoiner',
        sats: 0,
        plebs: 0,
        multiplier: 0,
        perk: ''
    }
];

BitcoinH.DEFAULT_NAMES = ['Satoshi', 'Hal', 'Nick', 'Adam', 'Wei', 'Len', 'Gavin', 'Laszlo', 'Amir', 'Mike', 'Greg', 'Pieter', 'Luke', 'Jameson', 'Lyn', 'Elizabeth'];
