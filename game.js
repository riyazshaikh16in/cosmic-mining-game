// ===========================
// GAME STATE
// ===========================
let gameState = {
    // CRYSTALS (Main Currency)
    crystals: 0,
    totalCrystals: 0,
    crystalsPerClick: 1,
    crystalsPerSecond: 0,
    
    // ENERGY (Secondary Resource)
    energy: 0,
    totalEnergy: 0,
    energyPerSecond: 0.05,
    maxEnergy: 100,
    
    // GEMS (Rare Resource)
    gems: 0,
    totalGems: 0,
    gemsPerClick: 0,
    gemChance: 0.03,
    
    totalClicks: 0,
    
    // Time tracking
    lastSaveTime: Date.now(),
    totalPlayTime: 0,
    sessionStartTime: Date.now(),
    
    // Statistics
    stats: {
        totalCrystalsEarned: 0,
        totalCrystalsSpent: 0,
        totalEnergyEarned: 0,
        totalEnergySpent: 0,
        totalGemsEarned: 0,
        totalGemsSpent: 0,
        totalClicks: 0,
        totalUpgradesPurchased: 0,
        highestCPS: 0,
        highestClickPower: 0,
        gameStartTime: Date.now(),
        offlineEarningsTotal: 0,
        manualSaves: 0,
        totalResets: 0
    },
    
    // NEW: Hall of Fame System
    hallOfFame: {
        // Personal Best Runs (top 5 sessions)
        topRuns: [],
        currentRun: {
            startTime: Date.now(),
            crystalsEarned: 0,
            clicksThisRun: 0,
            upgradesBought: 0
        },
        
        // Speed Records
        speedRecords: {
            reach100Crystals: null,      // Time in seconds
            reach1000Crystals: null,
            reach10000Crystals: null,
            reach100000Crystals: null,
            reach1000000Crystals: null,
            firstUpgrade: null,
            tier2Unlock: null,
            tier3Unlock: null,
            tier4Unlock: null,
            tier5Unlock: null
        },
        
        // Achievements Unlocked
        achievements: {},
        
        // Prestige System
        prestigeLevel: 0,
        prestigePoints: 0,
        lifetimePrestigePoints: 0,
        
        // Challenge Progress
        dailyChallenge: {
            date: null,
            completed: false,
            progress: 0
        }
    },

    upgrades: {
        // ===== TIER 1: EARLY GAME (Minutes 0-15) =====
        autoMiner: {
            name: "🤖 Auto-Miner",
            description: "Mines 0.5 crystals automatically",
            cost: 15,
            costMultiplier: 1.15,
            owned: 0,
            cps: 0.5,
            type: 'cps',
            tier: 1
        },
        betterPickaxe: {
            name: "⛏️ Better Pickaxe",
            description: "Increase crystals per click by 1",
            cost: 10,
            costMultiplier: 1.2,
            owned: 0,
            clickBonus: 1,
            type: 'click',
            tier: 1
        },
        crystalScanner: {
            name: "📡 Crystal Scanner",
            description: "Locate more crystals (+2 CPS)",
            cost: 50,
            costMultiplier: 1.15,
            owned: 0,
            cps: 2,
            type: 'cps',
            tier: 1,
            unlockCondition: { type: 'totalCrystals', value: 30 }
        },
        reinforcedGloves: {
            name: "🧤 Reinforced Gloves",
            description: "Stronger clicks (+2 per click)",
            cost: 100,
            costMultiplier: 1.25,
            owned: 0,
            clickBonus: 2,
            type: 'click',
            tier: 1,
            unlockCondition: { type: 'totalCrystals', value: 80 }
        },
        
        // ===== TIER 2: EARLY-MID GAME (Minutes 15-45) =====
        miningDrone: {
            name: "🚁 Mining Drone",
            description: "Autonomous mining (+5 CPS)",
            cost: 500,
            costMultiplier: 1.15,
            owned: 0,
            cps: 5,
            type: 'cps',
            tier: 2,
            unlockCondition: { type: 'totalCrystals', value: 300 }
        },
        quantumPickaxe: {
            name: "⚡ Quantum Pickaxe",
            description: "Quantum-powered clicking (+5 per click)",
            cost: 750,
            costMultiplier: 1.25,
            owned: 0,
            clickBonus: 5,
            type: 'click',
            tier: 2,
            unlockCondition: { type: 'totalCrystals', value: 500 }
        },
        laserDrill: {
            name: "🔴 Laser Drill",
            description: "Precision laser mining (+15 CPS)",
            cost: 2000,
            costMultiplier: 1.18,
            owned: 0,
            cps: 15,
            type: 'cps',
            tier: 2,
            unlockCondition: { type: 'totalCrystals', value: 1500 }
        },
        magneticExtractor: {
            name: "🧲 Magnetic Extractor",
            description: "Pull crystals from distance (+25 CPS)",
            cost: 5000,
            costMultiplier: 1.2,
            owned: 0,
            cps: 25,
            type: 'cps',
            tier: 2,
            unlockCondition: { type: 'totalCrystals', value: 4000 }
        },
        powerfulSwing: {
            name: "💪 Powerful Swing",
            description: "Enhanced click strength (+10 per click)",
            cost: 8000,
            costMultiplier: 1.3,
            owned: 0,
            clickBonus: 10,
            type: 'click',
            tier: 2,
            unlockCondition: { type: 'totalCrystals', value: 6000 }
        },
        
        // ===== TIER 3: MID GAME (Hours 1-3) =====
        nanoBot: {
            name: "🦠 Nano-Bot Swarm",
            description: "Microscopic mining army (+50 CPS)",
            cost: 20000,
            costMultiplier: 1.2,
            owned: 0,
            cps: 50,
            type: 'cps',
            tier: 3,
            unlockCondition: { type: 'totalCrystals', value: 15000 }
        },
        cosmicHammer: {
            name: "🔨 Cosmic Hammer",
            description: "Shatters asteroids (+25 per click)",
            cost: 30000,
            costMultiplier: 1.3,
            owned: 0,
            clickBonus: 25,
            type: 'click',
            tier: 3,
            unlockCondition: { type: 'totalCrystals', value: 25000 }
        },
        asteroidStation: {
            name: "🛰️ Asteroid Station",
            description: "Orbiting mining platform (+150 CPS)",
            cost: 100000,
            costMultiplier: 1.2,
            owned: 0,
            cps: 150,
            type: 'cps',
            tier: 3,
            unlockCondition: { type: 'totalCrystals', value: 75000 }
        },
        plasmaBeam: {
            name: "🌟 Plasma Beam",
            description: "Superheated mining beam (+300 CPS)",
            cost: 250000,
            costMultiplier: 1.18,
            owned: 0,
            cps: 300,
            type: 'cps',
            tier: 3,
            unlockCondition: { type: 'totalCrystals', value: 200000 }
        },
        titaniumGauntlet: {
            name: "🦾 Titanium Gauntlet",
            description: "Crushing grip strength (+50 per click)",
            cost: 150000,
            costMultiplier: 1.35,
            owned: 0,
            clickBonus: 50,
            type: 'click',
            tier: 3,
            unlockCondition: { type: 'totalCrystals', value: 120000 }
        },
        miningColony: {
            name: "🏭 Mining Colony",
            description: "Entire outpost dedicated to mining (+500 CPS)",
            cost: 500000,
            costMultiplier: 1.2,
            owned: 0,
            cps: 500,
            type: 'cps',
            tier: 3,
            unlockCondition: { type: 'totalCrystals', value: 400000 }
        },
        
        // ===== TIER 4: LATE-MID GAME (Hours 3-8) =====
        blackHoleExtractor: {
            name: "🌑 Black Hole Extractor",
            description: "Harnesses gravity for mining (+1000 CPS)",
            cost: 1500000,
            costMultiplier: 1.25,
            owned: 0,
            cps: 1000,
            type: 'cps',
            tier: 4,
            unlockCondition: { type: 'totalCrystals', value: 1000000 }
        },
        neutronCrusher: {
            name: "💥 Neutron Crusher",
            description: "Atomic-level destruction (+150 per click)",
            cost: 2000000,
            costMultiplier: 1.35,
            owned: 0,
            clickBonus: 150,
            type: 'click',
            tier: 4,
            unlockCondition: { type: 'totalCrystals', value: 1500000 }
        },
        quantumMiningRig: {
            name: "🌌 Quantum Mining Rig",
            description: "Mines across dimensions (+2500 CPS)",
            cost: 5000000,
            costMultiplier: 1.22,
            owned: 0,
            cps: 2500,
            type: 'cps',
            tier: 4,
            unlockCondition: { type: 'totalCrystals', value: 3500000 }
        },
        antimatterDrill: {
            name: "⚛️ Antimatter Drill",
            description: "Annihilates asteroids (+5000 CPS)",
            cost: 15000000,
            costMultiplier: 1.2,
            owned: 0,
            cps: 5000,
            type: 'cps',
            tier: 4,
            unlockCondition: { type: 'totalCrystals', value: 10000000 }
        },
        gravitonGlove: {
            name: "🌀 Graviton Glove",
            description: "Manipulate space-time with clicks (+300 per click)",
            cost: 10000000,
            costMultiplier: 1.4,
            owned: 0,
            clickBonus: 300,
            type: 'click',
            tier: 4,
            unlockCondition: { type: 'totalCrystals', value: 8000000 }
        },
        dimensionalMine: {
            name: "🔷 Dimensional Mine",
            description: "Mine from parallel universes (+10000 CPS)",
            cost: 50000000,
            costMultiplier: 1.25,
            owned: 0,
            cps: 10000,
            type: 'cps',
            tier: 4,
            unlockCondition: { type: 'totalCrystals', value: 35000000 }
        },
        
        // ===== TIER 5: LATE GAME (Hours 8-20) =====
        starForge: {
            name: "⭐ Star Forge",
            description: "Forge crystals from starlight (+25000 CPS)",
            cost: 150000000,
            costMultiplier: 1.2,
            owned: 0,
            cps: 25000,
            type: 'cps',
            tier: 5,
            unlockCondition: { type: 'totalCrystals', value: 100000000 }
        },
        galaxyBreaker: {
            name: "🌠 Galaxy Breaker",
            description: "Click with the force of stars (+750 per click)",
            cost: 200000000,
            costMultiplier: 1.4,
            owned: 0,
            clickBonus: 750,
            type: 'click',
            tier: 5,
            unlockCondition: { type: 'totalCrystals', value: 150000000 }
        },
        universalMiner: {
            name: "🪐 Universal Miner",
            description: "Mines the fabric of space-time (+50000 CPS)",
            cost: 500000000,
            costMultiplier: 1.25,
            owned: 0,
            cps: 50000,
            type: 'cps',
            tier: 5,
            unlockCondition: { type: 'totalCrystals', value: 350000000 }
        },
        nebulaHarvester: {
            name: "☁️ Nebula Harvester",
            description: "Extract crystals from nebulae (+100000 CPS)",
            cost: 1500000000,
            costMultiplier: 1.22,
            owned: 0,
            cps: 100000,
            type: 'cps',
            tier: 5,
            unlockCondition: { type: 'totalCrystals', value: 1000000000 }
        },
        cosmicFist: {
            name: "👊 Cosmic Fist",
            description: "Punch through reality itself (+1500 per click)",
            cost: 2000000000,
            costMultiplier: 1.45,
            owned: 0,
            clickBonus: 1500,
            type: 'click',
            tier: 5,
            unlockCondition: { type: 'totalCrystals', value: 1500000000 }
        },
        
        // ===== TIER 6: ENDGAME (Hours 20-50) =====
        realityBender: {
            name: "🌈 Reality Bender",
            description: "Bend reality to create crystals (+250000 CPS)",
            cost: 10000000000,
            costMultiplier: 1.2,
            owned: 0,
            cps: 250000,
            type: 'cps',
            tier: 6,
            unlockCondition: { type: 'totalCrystals', value: 7000000000 }
        },
        timeDilator: {
            name: "⏰ Time Dilator",
            description: "Speed up time for mining (+500000 CPS)",
            cost: 30000000000,
            costMultiplier: 1.22,
            owned: 0,
            cps: 500000,
            type: 'cps',
            tier: 6,
            unlockCondition: { type: 'totalCrystals', value: 20000000000 }
        },
        infinityGauntlet: {
            name: "♾️ Infinity Gauntlet",
            description: "Infinite power in your clicks (+3000 per click)",
            cost: 50000000000,
            costMultiplier: 1.5,
            owned: 0,
            clickBonus: 3000,
            type: 'click',
            tier: 6,
            unlockCondition: { type: 'totalCrystals', value: 35000000000 }
        },
        multiversalNetwork: {
            name: "🕸️ Multiversal Network",
            description: "Mine across infinite realities (+1000000 CPS)",
            cost: 100000000000,
            costMultiplier: 1.25,
            owned: 0,
            cps: 1000000,
            type: 'cps',
            tier: 6,
            unlockCondition: { type: 'totalCrystals', value: 75000000000 }
        },
        
        // ===== TIER 7: TRUE ENDGAME (Hours 50-100+) =====
        godMode: {
            name: "👁️ God Mode",
            description: "Transcend mortality (+2500000 CPS)",
            cost: 500000000000,
            costMultiplier: 1.2,
            owned: 0,
            cps: 2500000,
            type: 'cps',
            tier: 7,
            unlockCondition: { type: 'totalCrystals', value: 350000000000 }
        },
        omnipotentClick: {
            name: "✨ Omnipotent Click",
            description: "One click to rule them all (+7500 per click)",
            cost: 1000000000000,
            costMultiplier: 1.55,
            owned: 0,
            clickBonus: 7500,
            type: 'click',
            tier: 7,
            unlockCondition: { type: 'totalCrystals', value: 750000000000 }
        },
        
        // ===== ENERGY UPGRADES =====
        solarPanel: {
            name: "☀️ Solar Panel",
            description: "Generate energy from stars (+0.5 energy/sec)",
            cost: 0,
            energyCost: 50,
            costMultiplier: 1.15,
            owned: 0,
            energyBonus: 0.5,
            type: 'energy',
            tier: 2,
            unlockCondition: { type: 'totalCrystals', value: 2000 }
        },
        fusionReactor: {
            name: "⚛️ Fusion Reactor",
            description: "Massive energy production (+2 energy/sec)",
            cost: 10000,
            energyCost: 200,
            costMultiplier: 1.2,
            owned: 0,
            energyBonus: 2,
            type: 'energy',
            tier: 3,
            unlockCondition: { type: 'totalEnergy', value: 200 }
        },
        energyAmplifier: {
            name: "🔋 Energy Amplifier",
            description: "Boost crystal production by 10%",
            cost: 50000,
            energyCost: 500,
            costMultiplier: 1.25,
            owned: 0,
            cpsMultiplier: 1.1,
            type: 'multiplier',
            tier: 3,
            unlockCondition: { type: 'totalEnergy', value: 1000 }
        },
        darkEnergyCore: {
            name: "🌌 Dark Energy Core",
            description: "Harness dark energy (+5 energy/sec)",
            cost: 500000,
            energyCost: 2000,
            costMultiplier: 1.2,
            owned: 0,
            energyBonus: 5,
            type: 'energy',
            tier: 4,
            unlockCondition: { type: 'totalEnergy', value: 5000 }
        },
        
        // ===== GEM UPGRADES =====
        luckyCharm: {
            name: "🍀 Lucky Charm",
            description: "Increases rare gem find chance (+2%)",
            cost: 5000,
            gemCost: 5,
            costMultiplier: 1.3,
            owned: 0,
            gemChanceBonus: 0.02,
            type: 'gemChance',
            tier: 2,
            unlockCondition: { type: 'totalGems', value: 5 }
        },
        gemPolisher: {
            name: "✨ Gem Polisher",
            description: "Get more rare gems per find (+1 gem)",
            cost: 25000,
            gemCost: 20,
            costMultiplier: 1.35,
            owned: 0,
            gemsPerClickBonus: 1,
            type: 'gemBonus',
            tier: 3,
            unlockCondition: { type: 'totalGems', value: 25 }
        },
        cosmicGemstone: {
            name: "🔮 Cosmic Gemstone",
            description: "Multiply ALL production by 5%",
            cost: 250000,
            gemCost: 100,
            costMultiplier: 1.5,
            owned: 0,
            globalMultiplier: 1.05,
            type: 'globalMultiplier',
            tier: 4,
            unlockCondition: { type: 'totalGems', value: 100 }
        },
        gemMagnet: {
            name: "🧲 Gem Magnet",
            description: "Attract more gems (+5% find chance)",
            cost: 1000000,
            gemCost: 500,
            costMultiplier: 1.4,
            owned: 0,
            gemChanceBonus: 0.05,
            type: 'gemChance',
            tier: 5,
            unlockCondition: { type: 'totalGems', value: 500 }
        },
        
        // ===== CONVERTERS & SPECIAL =====
        crystalToEnergy: {
            name: "🔄 Crystal Reactor",
            description: "Convert 1000 crystals/sec to 1 energy/sec",
            cost: 100000,
            costMultiplier: 1.2,
            owned: 0,
            conversionRate: { from: 'crystals', to: 'energy', ratio: 1000 },
            type: 'converter',
            tier: 4,
            unlockCondition: { type: 'cps', value: 5000 }
        },
        energyBooster: {
            name: "⚡ Energy Booster",
            description: "Spend energy to boost crystal clicks (+100 per click)",
            cost: 75000,
            energyCost: 1000,
            costMultiplier: 1.25,
            owned: 0,
            clickBonus: 100,
            energyCostPerClick: 1,
            type: 'energyClick',
            tier: 4,
            unlockCondition: { type: 'totalEnergy', value: 3000 }
        }
    }
};

// ===========================
// ACHIEVEMENT DEFINITIONS
// ===========================

const ACHIEVEMENTS = {
    // Clicking Achievements
    firstClick: {
        id: 'firstClick',
        name: 'First Steps',
        description: 'Click the asteroid for the first time',
        icon: '👆',
        condition: () => gameState.stats.totalClicks >= 1,
        tier: 'bronze'
    },
    click100: {
        id: 'click100',
        name: 'Click Enthusiast',
        description: 'Click 100 times',
        icon: '👆',
        condition: () => gameState.stats.totalClicks >= 100,
        tier: 'bronze'
    },
    click1000: {
        id: 'click1000',
        name: 'Click Master',
        description: 'Click 1,000 times',
        icon: '🖱️',
        condition: () => gameState.stats.totalClicks >= 1000,
        tier: 'silver'
    },
    click10000: {
        id: 'click10000',
        name: 'Click Legend',
        description: 'Click 10,000 times',
        icon: '⚡',
        condition: () => gameState.stats.totalClicks >= 10000,
        tier: 'gold'
    },
    
    // Crystal Milestones
    crystals100: {
        id: 'crystals100',
        name: 'First Fortune',
        description: 'Earn 100 total crystals',
        icon: '💎',
        condition: () => gameState.stats.totalCrystalsEarned >= 100,
        tier: 'bronze'
    },
    crystals10k: {
        id: 'crystals10k',
        name: 'Crystal Collector',
        description: 'Earn 10,000 total crystals',
        icon: '💎',
        condition: () => gameState.stats.totalCrystalsEarned >= 10000,
        tier: 'silver'
    },
    crystals1m: {
        id: 'crystals1m',
        name: 'Millionaire',
        description: 'Earn 1,000,000 total crystals',
        icon: '💰',
        condition: () => gameState.stats.totalCrystalsEarned >= 1000000,
        tier: 'gold'
    },
    crystals1b: {
        id: 'crystals1b',
        name: 'Billionaire',
        description: 'Earn 1,000,000,000 total crystals',
        icon: '🏆',
        condition: () => gameState.stats.totalCrystalsEarned >= 1000000000,
        tier: 'platinum'
    },
    
    // Production Achievements
    cps100: {
        id: 'cps100',
        name: 'Automation Begins',
        description: 'Reach 100 crystals per second',
        icon: '⚙️',
        condition: () => gameState.crystalsPerSecond >= 100,
        tier: 'bronze'
    },
    cps10k: {
        id: 'cps10k',
        name: 'Industrial Revolution',
        description: 'Reach 10,000 crystals per second',
        icon: '🏭',
        condition: () => gameState.crystalsPerSecond >= 10000,
        tier: 'silver'
    },
    cps1m: {
        id: 'cps1m',
        name: 'Mega Factory',
        description: 'Reach 1,000,000 crystals per second',
        icon: '🌟',
        condition: () => gameState.crystalsPerSecond >= 1000000,
        tier: 'gold'
    },
    
    // Upgrade Achievements
    firstUpgrade: {
        id: 'firstUpgrade',
        name: 'Getting Started',
        description: 'Purchase your first upgrade',
        icon: '🛒',
        condition: () => gameState.stats.totalUpgradesPurchased >= 1,
        tier: 'bronze'
    },
    upgrades50: {
        id: 'upgrades50',
        name: 'Big Spender',
        description: 'Purchase 50 upgrades',
        icon: '💸',
        condition: () => gameState.stats.totalUpgradesPurchased >= 50,
        tier: 'silver'
    },
    upgrades500: {
        id: 'upgrades500',
        name: 'Upgrade Tycoon',
        description: 'Purchase 500 upgrades',
        icon: '👑',
        condition: () => gameState.stats.totalUpgradesPurchased >= 500,
        tier: 'gold'
    },
    
    // Gem Achievements
    firstGem: {
        id: 'firstGem',
        name: 'Lucky Find',
        description: 'Find your first rare gem',
        icon: '💠',
        condition: () => gameState.stats.totalGemsEarned >= 1,
        tier: 'bronze'
    },
    gems100: {
        id: 'gems100',
        name: 'Gem Hunter',
        description: 'Find 100 rare gems',
        icon: '💠',
        condition: () => gameState.stats.totalGemsEarned >= 100,
        tier: 'silver'
    },
    gems1000: {
        id: 'gems1000',
        name: 'Gem Master',
        description: 'Find 1,000 rare gems',
        icon: '💎',
        condition: () => gameState.stats.totalGemsEarned >= 1000,
        tier: 'gold'
    },
    
    // Time Achievements
    playtime1hour: {
        id: 'playtime1hour',
        name: 'Dedicated Miner',
        description: 'Play for 1 hour total',
        icon: '⏰',
        condition: () => gameState.totalPlayTime >= 3600,
        tier: 'bronze'
    },
    playtime10hours: {
        id: 'playtime10hours',
        name: 'Committed Miner',
        description: 'Play for 10 hours total',
        icon: '⏰',
        condition: () => gameState.totalPlayTime >= 36000,
        tier: 'silver'
    },
    playtime100hours: {
        id: 'playtime100hours',
        name: 'Mining Legend',
        description: 'Play for 100 hours total',
        icon: '👑',
        condition: () => gameState.totalPlayTime >= 360000,
        tier: 'gold'
    },
    
    // Tier Unlocks
    tier2Unlocked: {
        id: 'tier2Unlocked',
        name: 'Tier 2 Pioneer',
        description: 'Unlock Tier 2 upgrades',
        icon: '🔓',
        condition: () => {
            for (let key in gameState.upgrades) {
                if (gameState.upgrades[key].tier === 2 && gameState.upgrades[key].unlocked) {
                    return true;
                }
            }
            return false;
        },
        tier: 'bronze'
    },
    tier3Unlocked: {
        id: 'tier3Unlocked',
        name: 'Tier 3 Pioneer',
        description: 'Unlock Tier 3 upgrades',
        icon: '🔓',
        condition: () => {
            for (let key in gameState.upgrades) {
                if (gameState.upgrades[key].tier === 3 && gameState.upgrades[key].unlocked) {
                    return true;
                }
            }
            return false;
        },
        tier: 'silver'
    },
    tier4Unlocked: {
        id: 'tier4Unlocked',
        name: 'Tier 4 Pioneer',
        description: 'Unlock Tier 4 upgrades',
        icon: '🔓',
        condition: () => {
            for (let key in gameState.upgrades) {
                if (gameState.upgrades[key].tier === 4 && gameState.upgrades[key].unlocked) {
                    return true;
                }
            }
            return false;
        },
        tier: 'gold'
    },
    tier5Unlocked: {
        id: 'tier5Unlocked',
        name: 'Tier 5 Pioneer',
        description: 'Unlock Tier 5 upgrades',
        icon: '🏆',
        condition: () => {
            for (let key in gameState.upgrades) {
                if (gameState.upgrades[key].tier === 5 && gameState.upgrades[key].unlocked) {
                    return true;
                }
            }
            return false;
        },
        tier: 'platinum'
    },
    
    // Combo Achievements
    combo10: {
        id: 'combo10',
        name: 'Combo Starter',
        description: 'Reach a 10x click combo',
        icon: '🔥',
        condition: () => false, // Checked manually in combo system
        tier: 'bronze'
    },
    combo50: {
        id: 'combo50',
        name: 'Combo Expert',
        description: 'Reach a 50x click combo',
        icon: '🔥',
        condition: () => false,
        tier: 'silver'
    },
    combo100: {
        id: 'combo100',
        name: 'Combo Master',
        description: 'Reach a 100x click combo',
        icon: '💥',
        condition: () => false,
        tier: 'gold'
    },
    
    // Special Achievements
    energyMaxed: {
        id: 'energyMaxed',
        name: 'Fully Charged',
        description: 'Fill your energy bar completely',
        icon: '⚡',
        condition: () => gameState.energy >= gameState.maxEnergy,
        tier: 'bronze'
    },
    noClickChallenge: {
        id: 'noClickChallenge',
        name: 'Idle Master',
        description: 'Earn 10,000 crystals with CPS > 100 and fewer than 10 manual clicks',
        icon: '😴',
        condition: () => gameState.stats.totalCrystalsEarned >= 10000 && 
                         gameState.crystalsPerSecond >= 100 && 
                         gameState.hallOfFame.currentRun.clicksThisRun < 10,
        tier: 'gold'
    },
    speedDemon: {
        id: 'speedDemon',
        name: 'Speed Demon',
        description: 'Reach 1,000 crystals in under 5 minutes',
        icon: '⚡',
        condition: () => false, // Checked via speed records
        tier: 'gold'
    },
    allTiersUnlocked: {
        id: 'allTiersUnlocked',
        name: 'Complete Collection',
        description: 'Unlock all tier upgrades',
        icon: '🎖️',
        condition: () => {
            for (let tier = 1; tier <= 7; tier++) {
                let hasTier = false;
                for (let key in gameState.upgrades) {
                    if (gameState.upgrades[key].tier === tier && gameState.upgrades[key].unlocked) {
                        hasTier = true;
                        break;
                    }
                }
                if (!hasTier && tier <= 5) return false; // At least tier 1-5
            }
            return true;
        },
        tier: 'platinum'
    }
};


// ===========================
// INITIALIZATION
// ===========================
window.onload = function() {
    loadGame();
    loadSoundPreference();
    initializeUpgrades();
    startGameLoop();
    startCrystalRain();
    
    // Event Listeners
    document.getElementById('asteroid').addEventListener('click', onAsteroidClick);
    document.getElementById('saveBtn').addEventListener('click', saveGame);
    document.getElementById('resetBtn').addEventListener('click', resetGame);
    
    // NEW: Sound initialization button
    const initSoundBtn = document.getElementById('initSoundBtn');
    if (initSoundBtn) {
        initSoundBtn.addEventListener('click', function() {
            console.log('User clicked init sound button');
            initSounds();
            
            // Hide the notice
            const notice = document.getElementById('soundInitNotice');
            if (notice) {
                notice.classList.add('hidden');
            }
            
            // Play welcome sound
            setTimeout(() => {
                soundUpgradeUnlock();
            }, 100);
        });
    }
};

// ===========================
// CORE GAME FUNCTIONS
// ===========================

function onAsteroidClick(event) {
    // Initialize sounds on first click
    if (!soundsInitialized) {
        console.log('First click - initializing sounds...');
        initSounds();
    }
    
    // Add crystals
    gameState.crystals += gameState.crystalsPerClick;
    gameState.totalCrystals += gameState.crystalsPerClick;
    gameState.totalClicks++;
    gameState.stats.totalClicks++;
    gameState.stats.totalCrystalsEarned += gameState.crystalsPerClick;
    gameState.hallOfFame.currentRun.crystalsEarned += gameState.crystalsPerClick; // NEW
    gameState.hallOfFame.currentRun.clicksThisRun++; // NEW
    
    // Gem chance
    const gemRoll = Math.random();
    if (gemRoll < gameState.gemChance) {
        const gemsFound = 1 + gameState.gemsPerClick;
        gameState.gems += gemsFound;
        gameState.totalGems += gemsFound;
        gameState.stats.totalGemsEarned += gemsFound;
        createFloatingNumber(event.clientX, event.clientY - 30, `+${gemsFound} 💠`, 'gem');
        soundGemFound();
    }
    
    // Visual feedback
    createFloatingNumber(event.clientX, event.clientY, gameState.crystalsPerClick, 'crystal');
    
    // Visual Polish Effects
    createParticleExplosion(event.clientX, event.clientY, 8);
    addAsteroidShake();
    updateCombo();
    
    // Play click sound
    soundClick();
    
    // Screen shake for big combos
    if (clickCombo > 10 && clickCombo % 5 === 0) {
        screenShake();
        soundScreenShake();
    }
    
    updateDisplay();
}

function createFloatingNumber(x, y, amount, type = 'crystal') {
    const floatingNum = document.createElement('div');
    floatingNum.className = 'floating-number';
    
    // Different colors for different resources
    if (type === 'gem') {
        floatingNum.style.color = '#00ffff';
        floatingNum.style.textShadow = '0 0 10px rgba(0, 255, 255, 0.8)';
        floatingNum.textContent = amount;
    } else if (type === 'energy') {
        floatingNum.style.color = '#ffd700';
        floatingNum.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.8)';
        floatingNum.textContent = `+${formatNumber(amount)} ⚡`;
    } else {
        floatingNum.textContent = `+${formatNumber(amount)}`;
    }
    
    // Position relative to viewport
    floatingNum.style.left = x + 'px';
    floatingNum.style.top = y + 'px';
    
    document.getElementById('floatingNumbers').appendChild(floatingNum);
    
    // Remove after animation
    setTimeout(() => {
        floatingNum.remove();
    }, 1000);
}

// ===========================
// VISUAL EFFECTS SYSTEM
// ===========================

// Combo System
let clickCombo = 0;
let comboTimer = null;
const COMBO_TIMEOUT = 1000; // 1 second between clicks to maintain combo

function onAsteroidClick(event) {
    // Existing crystal logic...
    gameState.crystals += gameState.crystalsPerClick;
    gameState.totalCrystals += gameState.crystalsPerClick;
    gameState.totalClicks++;
    gameState.stats.totalClicks++;
    gameState.stats.totalCrystalsEarned += gameState.crystalsPerClick;
    
    // Gem chance
    const gemRoll = Math.random();
    if (gemRoll < gameState.gemChance) {
        const gemsFound = 1 + gameState.gemsPerClick;
        gameState.gems += gemsFound;
        gameState.totalGems += gemsFound;
        gameState.stats.totalGemsEarned += gemsFound;
        createFloatingNumber(event.clientX, event.clientY - 30, `+${gemsFound} 💠`, 'gem');
    }
    
    // Visual feedback
    createFloatingNumber(event.clientX, event.clientY, gameState.crystalsPerClick, 'crystal');
    
    // NEW: Visual Polish Effects
    createParticleExplosion(event.clientX, event.clientY, 8);
    addAsteroidShake();
    updateCombo();
    
    // Screen shake for big combos
    if (clickCombo > 10 && clickCombo % 5 === 0) {
        screenShake();
    }
    
    updateDisplay();
}

function createParticleExplosion(x, y, count) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random direction
        const angle = (Math.PI * 2 * i) / count;
        const velocity = 50 + Math.random() * 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}

function addAsteroidShake() {
    const asteroid = document.getElementById('asteroid');
    asteroid.classList.add('clicking');
    setTimeout(() => {
        asteroid.classList.remove('clicking');
    }, 300);
}

function updateCombo() {
    clickCombo++;
    
    // Clear existing timer
    if (comboTimer) {
        clearTimeout(comboTimer);
    }
    
    // Show combo indicator for milestones
    if (clickCombo === 5 || clickCombo === 10 || clickCombo === 25 || clickCombo === 50 || clickCombo === 100) {
        showComboIndicator(clickCombo);
    }
    
    // Reset combo after timeout
    comboTimer = setTimeout(() => {
        clickCombo = 0;
    }, COMBO_TIMEOUT);
}

function showComboIndicator(combo) {
    const indicator = document.createElement('div');
    indicator.className = 'combo-indicator';
    indicator.textContent = `${combo}x COMBO!`;
    
    const miningArea = document.querySelector('.mining-area');
    miningArea.appendChild(indicator);
    
    soundCombo(combo);
    checkComboAchievement(combo); // NEW
    
    setTimeout(() => indicator.remove(), 500);
}

function screenShake() {
    const container = document.querySelector('.game-container');
    container.classList.add('shake');
    setTimeout(() => {
        container.classList.remove('shake');
    }, 500);
}

// Crystal Rain Effect (for passive income visualization)
function createCrystalRain() {
    if (gameState.crystalsPerSecond < 10) return; // Only show if significant CPS
    
    const rain = document.createElement('div');
    rain.className = 'crystal-rain';
    
    // Random horizontal position
    rain.style.left = Math.random() * window.innerWidth + 'px';
    rain.style.top = '0px';
    
    document.body.appendChild(rain);
    
    setTimeout(() => rain.remove(), 2000);
}

// Trigger crystal rain periodically
let rainInterval = null;
function startCrystalRain() {
    if (rainInterval) return;
    
    rainInterval = setInterval(() => {
        if (gameState.crystalsPerSecond >= 10) {
            const rainCount = Math.min(Math.floor(gameState.crystalsPerSecond / 100), 5);
            for (let i = 0; i < rainCount; i++) {
                setTimeout(() => createCrystalRain(), i * 200);
            }
        }
    }, 3000);
}

// Stat Value Pulse Animation
function pulseStatValue(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add('increasing');
        setTimeout(() => {
            element.classList.remove('increasing');
        }, 300);
    }
}

// Enhanced Buy Upgrade with Flash Effect
function buyUpgrade(upgradeKey) {
    const upgrade = gameState.upgrades[upgradeKey];
    
    if (!canAffordUpgrade(upgrade)) {
        soundError();
        return;
    }
    
    // Deduct costs
    if (upgrade.cost) {
        gameState.crystals -= upgrade.cost;
        gameState.stats.totalCrystalsSpent += upgrade.cost;
    }
    if (upgrade.energyCost) {
        gameState.energy -= upgrade.energyCost;
        gameState.stats.totalEnergySpent += upgrade.energyCost;
    }
    if (upgrade.gemCost) {
        gameState.gems -= upgrade.gemCost;
        gameState.stats.totalGemsSpent += upgrade.gemCost;
    }
    
    upgrade.owned++;
    gameState.stats.totalUpgradesPurchased++;
    gameState.hallOfFame.currentRun.upgradesBought++; // NEW
    
    applyUpgradeEffect(upgradeKey, upgrade);
    
    // Increase costs
    if (upgrade.cost) {
        upgrade.cost = Math.ceil(upgrade.cost * upgrade.costMultiplier);
    }
    if (upgrade.energyCost) {
        upgrade.energyCost = Math.ceil(upgrade.energyCost * upgrade.costMultiplier);
    }
    if (upgrade.gemCost) {
        upgrade.gemCost = Math.ceil(upgrade.gemCost * upgrade.costMultiplier);
    }
    
    // Visual feedback
    const card = document.getElementById(`upgrade-${upgradeKey}`);
    if (card) {
        card.classList.add('purchased');
        setTimeout(() => {
            card.classList.remove('purchased');
        }, 500);
    }
    
    // Pulse the affected stat
    if (upgrade.type === 'cps' || upgrade.type === 'multiplier') {
        pulseStatValue('crystalsPerSecond');
    } else if (upgrade.type === 'click') {
        pulseStatValue('crystalsPerClick');
    } else if (upgrade.type === 'energy') {
        pulseStatValue('energyPerSecond');
    }
    
    soundUpgradePurchase();
    
    updateDisplay();
    saveGame();
}

// ===========================
// MOBILE TOUCH OPTIMIZATIONS
// ===========================

// Detect if device is mobile
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Reduce particles on mobile for performance
const particleCount = isMobile ? 4 : 8;

// Update createParticleExplosion to use mobile-aware count
function createParticleExplosion(x, y, count = particleCount) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const angle = (Math.PI * 2 * i) / count;
        const velocity = 50 + Math.random() * 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}

// Prevent scroll when touching game elements
if (isMobile) {
    document.addEventListener('touchmove', function(e) {
        if (e.target.closest('.asteroid') || 
            e.target.closest('.buy-btn') || 
            e.target.closest('.action-btn')) {
            e.preventDefault();
        }
    }, { passive: false });
}

// Add haptic feedback on mobile (if supported)
function vibrate(duration = 10) {
    if (isMobile && navigator.vibrate) {
        navigator.vibrate(duration);
    }
}

// Update onAsteroidClick to include vibration
function onAsteroidClick(event) {
    // Initialize sounds on first click
    if (!soundsInitialized) {
        console.log('First click - initializing sounds...');
        initSounds();
    }
    
    // Add haptic feedback on mobile
    vibrate(10);
    
    // Add crystals
    gameState.crystals += gameState.crystalsPerClick;
    gameState.totalCrystals += gameState.crystalsPerClick;
    gameState.totalClicks++;
    gameState.stats.totalClicks++;
    gameState.stats.totalCrystalsEarned += gameState.crystalsPerClick;
    gameState.hallOfFame.currentRun.crystalsEarned += gameState.crystalsPerClick;
    gameState.hallOfFame.currentRun.clicksThisRun++;
    
    // Gem chance
    const gemRoll = Math.random();
    if (gemRoll < gameState.gemChance) {
        const gemsFound = 1 + gameState.gemsPerClick;
        gameState.gems += gemsFound;
        gameState.totalGems += gemsFound;
        gameState.stats.totalGemsEarned += gemsFound;
        createFloatingNumber(event.clientX || event.touches[0].clientX, 
                            event.clientY || event.touches[0].clientY - 30, 
                            `+${gemsFound} 💠`, 'gem');
        soundGemFound();
        vibrate(20); // Stronger vibration for gem
    }
    
    // Visual feedback
    createFloatingNumber(event.clientX || event.touches[0].clientX, 
                        event.clientY || event.touches[0].clientY, 
                        gameState.crystalsPerClick, 'crystal');
    
    // Visual Polish Effects
    createParticleExplosion(event.clientX || event.touches[0].clientX, 
                           event.clientY || event.touches[0].clientY);
    addAsteroidShake();
    updateCombo();
    
    // Play click sound
    soundClick();
    
    // Screen shake for big combos
    if (clickCombo > 10 && clickCombo % 5 === 0) {
        screenShake();
        soundScreenShake();
        vibrate(30); // Vibrate on combo milestone
    }
    
    updateDisplay();
}

// Reduce crystal rain frequency on mobile
function startCrystalRain() {
    if (rainInterval) return;
    
    const rainDelay = isMobile ? 5000 : 3000; // Longer delay on mobile
    
    rainInterval = setInterval(() => {
        if (gameState.crystalsPerSecond >= 10) {
            const rainCount = isMobile ? 
                Math.min(Math.floor(gameState.crystalsPerSecond / 200), 2) : 
                Math.min(Math.floor(gameState.crystalsPerSecond / 100), 5);
            
            for (let i = 0; i < rainCount; i++) {
                setTimeout(() => createCrystalRain(), i * 200);
            }
        }
    }, rainDelay);
}

// Add touch support for asteroid
document.addEventListener('DOMContentLoaded', function() {
    const asteroid = document.getElementById('asteroid');
    if (asteroid && isMobile) {
        // Prevent default touch behavior
        asteroid.addEventListener('touchstart', function(e) {
            e.preventDefault();
            onAsteroidClick(e.touches[0]);
        }, { passive: false });
    }
});

// Log mobile detection
console.log('Device type:', isMobile ? 'Mobile' : 'Desktop');


// ===========================
// SOUND SYSTEM (FIXED FOR MACOS)
// ===========================

let audioContext = null;
let soundsEnabled = true;
let soundsInitialized = false;

// Initialize Audio Context (must be done after user interaction)
function initSounds() {
    if (soundsInitialized) return;
    
    try {
        // Create audio context
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();
        
        // Resume context if suspended (common on Safari/macOS)
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        
        soundsInitialized = true;
        console.log('✅ Sound system initialized successfully');
        
        // Play test sound
        playSound(800, 0.1, 'sine', 0.1);
        
    } catch (e) {
        console.error('❌ Web Audio API not supported:', e);
        soundsEnabled = false;
    }
}

// Generic sound generator
function playSound(frequency, duration, type = 'sine', volume = 0.1) {
    if (!soundsEnabled || !audioContext) {
        console.log('Sound disabled or not initialized');
        return;
    }
    
    try {
        // Resume context if suspended
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
        
        console.log(`🔊 Playing sound: ${frequency}Hz for ${duration}s`);
    } catch (e) {
        console.error('Sound playback error:', e);
    }
}

// Advanced sound with frequency sweep
function playSweepSound(startFreq, endFreq, duration, type = 'sine', volume = 0.1) {
    if (!soundsEnabled || !audioContext) return;
    
    try {
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(startFreq, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(endFreq, audioContext.currentTime + duration);
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
        console.error('Sweep sound error:', e);
    }
}

// Chord sound (multiple frequencies)
function playChord(frequencies, duration, type = 'sine', volume = 0.05) {
    if (!soundsEnabled || !audioContext) return;
    
    frequencies.forEach(freq => {
        playSound(freq, duration, type, volume);
    });
}

// White noise burst
function playNoise(duration, volume = 0.05) {
    if (!soundsEnabled || !audioContext) return;
    
    try {
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        
        const bufferSize = audioContext.sampleRate * duration;
        const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const output = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        
        const whiteNoise = audioContext.createBufferSource();
        whiteNoise.buffer = buffer;
        
        const gainNode = audioContext.createGain();
        whiteNoise.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        whiteNoise.start(audioContext.currentTime);
        whiteNoise.stop(audioContext.currentTime + duration);
    } catch (e) {
        console.error('Noise sound error:', e);
    }
}

// ===========================
// SPECIFIC SOUND EFFECTS
// ===========================

function soundClick() {
    const basePitch = 600;
    const comboPitch = Math.min(clickCombo * 20, 400);
    playSound(basePitch + comboPitch, 0.05, 'sine', 0.15);
}

function soundGemFound() {
    playSweepSound(800, 1600, 0.3, 'sine', 0.2);
    setTimeout(() => playSound(1200, 0.1, 'sine', 0.15), 100);
}

function soundUpgradePurchase() {
    playSound(400, 0.15, 'triangle', 0.15);
    setTimeout(() => playSound(500, 0.15, 'triangle', 0.15), 80);
    setTimeout(() => playSound(600, 0.2, 'triangle', 0.15), 160);
}

function soundUpgradeUnlock() {
    playChord([400, 500, 600], 0.3, 'triangle', 0.12);
    setTimeout(() => {
        playChord([500, 625, 750], 0.3, 'triangle', 0.12);
    }, 150);
    setTimeout(() => {
        playChord([600, 750, 900], 0.5, 'sine', 0.1);
    }, 300);
}

function soundCombo(comboCount) {
    if (comboCount === 5) {
        playSweepSound(400, 600, 0.2, 'square', 0.15);
    } else if (comboCount === 10) {
        playSweepSound(500, 800, 0.25, 'square', 0.18);
        playNoise(0.1, 0.05);
    } else if (comboCount === 25) {
        playSweepSound(600, 1000, 0.3, 'sawtooth', 0.2);
        playNoise(0.15, 0.08);
    } else if (comboCount === 50) {
        playChord([600, 800, 1000], 0.4, 'sawtooth', 0.15);
        playNoise(0.2, 0.1);
    } else if (comboCount === 100) {
        playChord([400, 600, 800, 1000], 0.5, 'sawtooth', 0.18);
        setTimeout(() => playChord([500, 750, 1000, 1250], 0.5, 'sine', 0.15), 200);
        playNoise(0.3, 0.12);
    }
}

function soundScreenShake() {
    playSound(80, 0.3, 'sawtooth', 0.2);
    playNoise(0.2, 0.08);
}

function soundSave() {
    playSound(800, 0.1, 'sine', 0.1);
    setTimeout(() => playSound(1000, 0.15, 'sine', 0.08), 80);
}

function soundError() {
    playSound(200, 0.2, 'sawtooth', 0.18);
}

function soundTierUnlock(tier) {
    const baseTone = 400 + (tier * 100);
    playChord([baseTone, baseTone * 1.25, baseTone * 1.5], 0.5, 'triangle', 0.15);
    setTimeout(() => {
        playSweepSound(baseTone, baseTone * 2, 0.6, 'sine', 0.12);
    }, 200);
    playNoise(0.3, 0.06);
}

function soundPassiveIncome() {
    playSound(1200, 0.1, 'sine', 0.03);
}

function soundEnergyFull() {
    playSweepSound(600, 1000, 0.3, 'triangle', 0.12);
}

function soundStatMilestone() {
    playChord([500, 625, 750, 875], 0.4, 'sine', 0.12);
}

// ===========================
// SOUND TOGGLE FUNCTION
// ===========================

function toggleSound() {
    soundsEnabled = !soundsEnabled;
    
    // Initialize sounds if enabling for first time
    if (soundsEnabled && !soundsInitialized) {
        initSounds();
    }
    
    // Visual feedback
    const btn = document.getElementById('soundToggle');
    if (btn) {
        btn.textContent = soundsEnabled ? '🔊 Sound On' : '🔇 Sound Off';
        btn.style.background = soundsEnabled ? 'rgba(0, 255, 136, 0.2)' : 'rgba(255, 100, 100, 0.2)';
    }
    
    // Save preference
    localStorage.setItem('soundEnabled', soundsEnabled);
    
    // Play confirmation sound if enabling
    if (soundsEnabled) {
        setTimeout(() => {
            playSound(1000, 0.2, 'sine', 0.15);
            console.log('🔊 Sound enabled');
        }, 100);
    } else {
        console.log('🔇 Sound disabled');
    }
}

// Load sound preference
function loadSoundPreference() {
    const saved = localStorage.getItem('soundEnabled');
    if (saved !== null) {
        soundsEnabled = saved === 'true';
    }
    
    // Update button if it exists
    const btn = document.getElementById('soundToggle');
    if (btn) {
        btn.textContent = soundsEnabled ? '🔊 Sound On' : '🔇 Sound Off';
        btn.style.background = soundsEnabled ? 'rgba(0, 255, 136, 0.2)' : 'rgba(255, 100, 100, 0.2)';
    }
    
    console.log(`Sound preference loaded: ${soundsEnabled ? 'ON' : 'OFF'}`);
}

// Manual test function (call from console)
function testSound() {
    console.log('Testing sound system...');
    if (!soundsInitialized) {
        console.log('Initializing sounds...');
        initSounds();
    }
    console.log('Playing test beep...');
    playSound(800, 0.5, 'sine', 0.2);
    setTimeout(() => {
        console.log('Playing test sweep...');
        playSweepSound(400, 800, 0.5, 'sine', 0.2);
    }, 600);
}

// ===========================
// ACHIEVEMENT SYSTEM
// ===========================

function checkAchievements() {
    let newAchievements = [];
    
    for (let achievementId in ACHIEVEMENTS) {
        const achievement = ACHIEVEMENTS[achievementId];
        
        // Skip if already unlocked
        if (gameState.hallOfFame.achievements[achievementId]) {
            continue;
        }
        
        // Check condition
        if (achievement.condition()) {
            // Unlock achievement
            gameState.hallOfFame.achievements[achievementId] = {
                unlockedAt: Date.now(),
                tier: achievement.tier
            };
            
            newAchievements.push(achievement);
            
            // Award prestige points based on tier
            const prestigePoints = {
                'bronze': 1,
                'silver': 3,
                'gold': 10,
                'platinum': 25
            };
            
            const points = prestigePoints[achievement.tier] || 1;
            gameState.hallOfFame.prestigePoints += points;
            gameState.hallOfFame.lifetimePrestigePoints += points;
        }
    }
    
    // Show notifications for new achievements
    if (newAchievements.length > 0) {
        newAchievements.forEach((achievement, index) => {
            setTimeout(() => {
                showAchievementUnlock(achievement);
            }, index * 500);
        });
    }
}

function showAchievementUnlock(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    
    const tierColors = {
        'bronze': '#cd7f32',
        'silver': '#c0c0c0',
        'gold': '#ffd700',
        'platinum': '#e5e4e2'
    };
    
    notification.style.borderColor = tierColors[achievement.tier];
    
    notification.innerHTML = `
        <div class="achievement-icon">${achievement.icon}</div>
        <div class="achievement-details">
            <div class="achievement-title">ACHIEVEMENT UNLOCKED!</div>
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-description">${achievement.description}</div>
            <div class="achievement-tier">${achievement.tier.toUpperCase()}</div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Play sound
    soundStatMilestone();
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

// Check for combo achievements
function checkComboAchievement(combo) {
    if (combo === 10 && !gameState.hallOfFame.achievements.combo10) {
        gameState.hallOfFame.achievements.combo10 = {
            unlockedAt: Date.now(),
            tier: 'bronze'
        };
        gameState.hallOfFame.prestigePoints += 1;
        gameState.hallOfFame.lifetimePrestigePoints += 1;
        showAchievementUnlock(ACHIEVEMENTS.combo10);
    }
    
    if (combo === 50 && !gameState.hallOfFame.achievements.combo50) {
        gameState.hallOfFame.achievements.combo50 = {
            unlockedAt: Date.now(),
            tier: 'silver'
        };
        gameState.hallOfFame.prestigePoints += 3;
        gameState.hallOfFame.lifetimePrestigePoints += 3;
        showAchievementUnlock(ACHIEVEMENTS.combo50);
    }
    
    if (combo === 100 && !gameState.hallOfFame.achievements.combo100) {
        gameState.hallOfFame.achievements.combo100 = {
            unlockedAt: Date.now(),
            tier: 'gold'
        };
        gameState.hallOfFame.prestigePoints += 10;
        gameState.hallOfFame.lifetimePrestigePoints += 10;
        showAchievementUnlock(ACHIEVEMENTS.combo100);
    }
}

// ===========================
// SPEED RECORDS
// ===========================

function checkSpeedRecords() {
    const currentRunTime = (Date.now() - gameState.hallOfFame.currentRun.startTime) / 1000;
    
    // Check crystal milestones
    const milestones = {
        reach100Crystals: 100,
        reach1000Crystals: 1000,
        reach10000Crystals: 10000,
        reach100000Crystals: 100000,
        reach1000000Crystals: 1000000
    };
    
    for (let recordKey in milestones) {
        const threshold = milestones[recordKey];
        
        if (gameState.hallOfFame.currentRun.crystalsEarned >= threshold) {
            const currentRecord = gameState.hallOfFame.speedRecords[recordKey];
            
            if (currentRecord === null || currentRunTime < currentRecord) {
                gameState.hallOfFame.speedRecords[recordKey] = currentRunTime;
                showSpeedRecordNotification(recordKey, currentRunTime);
                
                // Check for speed demon achievement
                if (recordKey === 'reach1000Crystals' && currentRunTime < 300 && !gameState.hallOfFame.achievements.speedDemon) {
                    gameState.hallOfFame.achievements.speedDemon = {
                        unlockedAt: Date.now(),
                        tier: 'gold'
                    };
                    gameState.hallOfFame.prestigePoints += 10;
                    gameState.hallOfFame.lifetimePrestigePoints += 10;
                    showAchievementUnlock(ACHIEVEMENTS.speedDemon);
                }
            }
        }
    }
}

function showSpeedRecordNotification(recordKey, time) {
    const notification = document.createElement('div');
    notification.className = 'speed-record-notification';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const timeStr = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
    
    const recordNames = {
        reach100Crystals: '100 Crystals',
        reach1000Crystals: '1,000 Crystals',
        reach10000Crystals: '10,000 Crystals',
        reach100000Crystals: '100,000 Crystals',
        reach1000000Crystals: '1,000,000 Crystals'
    };
    
    notification.innerHTML = `
        <div class="record-icon">⚡</div>
        <div class="record-text">
            <div class="record-title">SPEED RECORD!</div>
            <div class="record-milestone">${recordNames[recordKey]}</div>
            <div class="record-time">${timeStr}</div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    
    soundUpgradeUnlock();
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

// ===========================
// PERSONAL BEST RUNS
// ===========================

function saveCurrentRun() {
    const run = {
        timestamp: Date.now(),
        duration: (Date.now() - gameState.hallOfFame.currentRun.startTime) / 1000,
        crystalsEarned: gameState.hallOfFame.currentRun.crystalsEarned,
        clicks: gameState.hallOfFame.currentRun.clicksThisRun,
        upgradesBought: gameState.hallOfFame.currentRun.upgradesBought,
        finalCPS: gameState.crystalsPerSecond,
        finalClickPower: gameState.crystalsPerClick
    };
    
    gameState.hallOfFame.topRuns.push(run);
    
    // Sort by crystals earned (descending)
    gameState.hallOfFame.topRuns.sort((a, b) => b.crystalsEarned - a.crystalsEarned);
    
    // Keep only top 10
    gameState.hallOfFame.topRuns = gameState.hallOfFame.topRuns.slice(0, 10);
}

function startNewRun() {
    // Save previous run if it had progress
    if (gameState.hallOfFame.currentRun.crystalsEarned > 0) {
        saveCurrentRun();
    }
    
    // Reset current run
    gameState.hallOfFame.currentRun = {
        startTime: Date.now(),
        crystalsEarned: 0,
        clicksThisRun: 0,
        upgradesBought: 0
    };
}


// ===========================
// HALL OF FAME UI FUNCTIONS
// ===========================

function toggleHallOfFame() {
    const hallPage = document.getElementById('hallOfFamePage');
    const isVisible = hallPage.classList.contains('show');
    
    if (isVisible) {
        hallPage.classList.remove('show');
    } else {
        updateHallOfFameDisplay();
        hallPage.classList.add('show');
    }
}

function switchHallTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.hall-tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active from all buttons
    document.querySelectorAll('.hall-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(`tab-${tabName}`).classList.add('active');
    
    // Activate button
    event.target.classList.add('active');
    
    // Update content
    updateHallOfFameDisplay();
}

function updateHallOfFameDisplay() {
    updateAchievementsDisplay();
    updateSpeedRecordsDisplay();
    updateBestRunsDisplay();
    updatePrestigeDisplay();
}

function updateAchievementsDisplay() {
    const grid = document.getElementById('achievementsGrid');
    grid.innerHTML = '';
    
    // Count unlocked achievements
    let unlockedCount = 0;
    let totalCount = Object.keys(ACHIEVEMENTS).length;
    
    for (let achievementId in ACHIEVEMENTS) {
        const achievement = ACHIEVEMENTS[achievementId];
        const isUnlocked = gameState.hallOfFame.achievements[achievementId];
        
        if (isUnlocked) unlockedCount++;
        
        const card = document.createElement('div');
        card.className = `achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`;
        
        card.innerHTML = `
            <div class="achievement-card-icon">${achievement.icon}</div>
            <div class="achievement-card-name">${achievement.name}</div>
            <div class="achievement-card-description">${achievement.description}</div>
            <div class="achievement-card-tier tier-${achievement.tier}">${achievement.tier}</div>
        `;
        
        grid.appendChild(card);
    }
    
    // Update summary
    document.getElementById('prestigePoints').textContent = gameState.hallOfFame.prestigePoints;
    document.getElementById('achievementCount').textContent = `${unlockedCount} / ${totalCount}`;
}

function updateSpeedRecordsDisplay() {
    const list = document.getElementById('speedRecordsList');
    list.innerHTML = '';
    
    const recordNames = {
        reach100Crystals: '⚡ Reach 100 Crystals',
        reach1000Crystals: '⚡ Reach 1,000 Crystals',
        reach10000Crystals: '⚡ Reach 10,000 Crystals',
        reach100000Crystals: '⚡ Reach 100,000 Crystals',
        reach1000000Crystals: '⚡ Reach 1,000,000 Crystals'
    };
    
    for (let recordKey in recordNames) {
        const recordTime = gameState.hallOfFame.speedRecords[recordKey];
        
        const item = document.createElement('div');
        item.className = `record-item ${recordTime !== null ? 'completed' : ''}`;
        
        let timeDisplay = 'Not achieved yet';
        if (recordTime !== null) {
            const minutes = Math.floor(recordTime / 60);
            const seconds = Math.floor(recordTime % 60);
            timeDisplay = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
        }
        
        item.innerHTML = `
            <div class="record-name">${recordNames[recordKey]}</div>
            <div class="${recordTime !== null ? 'record-value' : 'record-pending'}">${timeDisplay}</div>
        `;
        
        list.appendChild(item);
    }
}

function updateBestRunsDisplay() {
    // Update current run
    const runDuration = (Date.now() - gameState.hallOfFame.currentRun.startTime) / 1000;
    const hours = Math.floor(runDuration / 3600);
    const minutes = Math.floor((runDuration % 3600) / 60);
    const seconds = Math.floor(runDuration % 60);
    
    let durationStr = '';
    if (hours > 0) durationStr += `${hours}h `;
    if (minutes > 0) durationStr += `${minutes}m `;
    durationStr += `${seconds}s`;
    
    document.getElementById('currentRunDuration').textContent = durationStr;
    document.getElementById('currentRunCrystals').textContent = formatNumber(gameState.hallOfFame.currentRun.crystalsEarned);
    document.getElementById('currentRunClicks').textContent = gameState.hallOfFame.currentRun.clicksThisRun;
    document.getElementById('currentRunUpgrades').textContent = gameState.hallOfFame.currentRun.upgradesBought;
    
    // Update top runs list
    const list = document.getElementById('topRunsList');
    list.innerHTML = '';
    
    if (gameState.hallOfFame.topRuns.length === 0) {
        list.innerHTML = '<p style="text-align: center; opacity: 0.7;">No completed runs yet. Keep playing!</p>';
        return;
    }
    
    gameState.hallOfFame.topRuns.forEach((run, index) => {
        const item = document.createElement('div');
        item.className = `run-item rank-${index + 1}`;
        
        const runMinutes = Math.floor(run.duration / 60);
        const runSeconds = Math.floor(run.duration % 60);
        const runDurationStr = runMinutes > 0 ? `${runMinutes}m ${runSeconds}s` : `${runSeconds}s`;
        
        const date = new Date(run.timestamp);
        const dateStr = date.toLocaleDateString();
        
        item.innerHTML = `
            <div class="run-header">
                <div class="run-rank">#${index + 1}</div>
                <div class="run-crystals">💎 ${formatNumber(run.crystalsEarned)}</div>
            </div>
            <div class="run-details">
                <div>Duration: ${runDurationStr}</div>
                <div>Clicks: ${run.clicks}</div>
                <div>Upgrades: ${run.upgradesBought}</div>
                <div>Final CPS: ${formatNumber(run.finalCPS)}</div>
                <div>Click Power: ${formatNumber(run.finalClickPower)}</div>
                <div>Date: ${dateStr}</div>
            </div>
        `;
        
        list.appendChild(item);
    });
}

function updatePrestigeDisplay() {
    document.getElementById('currentPrestigeLevel').textContent = gameState.hallOfFame.prestigeLevel;
    document.getElementById('availablePrestigePoints').textContent = gameState.hallOfFame.prestigePoints;
    document.getElementById('lifetimePrestigePoints').textContent = gameState.hallOfFame.lifetimePrestigePoints;
    
    // Check prestige requirements
    const canPrestige = checkPrestigeRequirements();
    const btn = document.getElementById('prestigeBtn');
    btn.disabled = !canPrestige;
    
    // Update bonuses list
    updatePrestigeBonusesList();
}

function checkPrestigeRequirements() {
    const req1 = gameState.stats.totalCrystalsEarned >= 1000000;
    const req2 = Object.keys(gameState.hallOfFame.achievements).length >= 10;
    let req3 = false;
    
    for (let key in gameState.upgrades) {
        if (gameState.upgrades[key].tier >= 3 && gameState.upgrades[key].unlocked) {
            req3 = true;
            break;
        }
    }
    
    // Update UI
    const req3Element = document.getElementById('prestigeReq3');
    if (req3Element) {
        req3Element.textContent = req3 ? '✅ Reach Tier 3' : '❌ Reach Tier 3';
    }
    
    return req1 && req2 && req3;
}

function updatePrestigeBonusesList() {
    const list = document.getElementById('prestigeBonusesList');
    
    if (gameState.hallOfFame.prestigeLevel === 0) {
        list.innerHTML = '<p class="no-bonuses">No prestige bonuses yet. Prestige to gain permanent upgrades!</p>';
        return;
    }
    
    // Calculate bonuses
    const clickBonus = gameState.hallOfFame.prestigeLevel * 10;
    const cpsBonus = gameState.hallOfFame.prestigeLevel * 5;
    const costReduction = Math.min(gameState.hallOfFame.prestigeLevel * 2, 50);
    
    list.innerHTML = `
        <div style="display: grid; gap: 10px;">
            <div style="padding: 10px; background: rgba(0,255,136,0.1); border-radius: 5px;">
                ⚡ +${clickBonus}% Click Power
            </div>
            <div style="padding: 10px; background: rgba(0,255,136,0.1); border-radius: 5px;">
                🏭 +${cpsBonus}% Production Speed
            </div>
            <div style="padding: 10px; background: rgba(0,255,136,0.1); border-radius: 5px;">
                💰 -${costReduction}% Upgrade Costs
            </div>
            <div style="padding: 10px; background: rgba(0,255,136,0.1); border-radius: 5px;">
                💠 +${gameState.hallOfFame.prestigeLevel * 2}% Gem Find Chance
            </div>
        </div>
    `;
}

function performPrestige() {
    if (!checkPrestigeRequirements()) {
        soundError();
        alert('You do not meet the prestige requirements yet!');
        return;
    }
    
    const confirmText = `Are you sure you want to prestige?\n\nYou will:\n✅ Gain +1 Prestige Level\n✅ Keep all achievements\n✅ Gain permanent bonuses\n\n❌ Reset all crystals, upgrades, and progress`;
    
    if (!confirm(confirmText)) {
        return;
    }
    
    // Save current run
    saveCurrentRun();
    
    // Increase prestige level
    gameState.hallOfFame.prestigeLevel++;
    
    // Reset game but keep Hall of Fame
    const hallOfFameBackup = { ...gameState.hallOfFame };
    
    // Reset everything else
    gameState.crystals = 0;
    gameState.totalCrystals = 0;
    gameState.crystalsPerClick = 1;
    gameState.crystalsPerSecond = 0;
    gameState.energy = 0;
    gameState.totalEnergy = 0;
    gameState.energyPerSecond = 0.1;
    gameState.gems = 0;
    gameState.totalGems = 0;
    gameState.gemsPerClick = 0;
    gameState.totalClicks = 0;
    
    // Reset upgrades
    for (let key in gameState.upgrades) {
        gameState.upgrades[key].owned = 0;
        gameState.upgrades[key].unlocked = !gameState.upgrades[key].unlockCondition;
        // Reset costs to original (you'll need to store original costs)
    }
    
    // Restore Hall of Fame
    gameState.hallOfFame = hallOfFameBackup;
    
    // Start new run
    startNewRun();
    
    // Apply prestige bonuses
    applyPrestigeBonuses();
    
    // Show success
    soundUpgradeUnlock();
    alert(`🎉 PRESTIGE ${gameState.hallOfFame.prestigeLevel} ACHIEVED!\n\nYour bonuses are now active!`);
    
    // Refresh displays
    initializeUpgrades();
    updateDisplay();
    toggleHallOfFame();
    
    saveGame();
}

function applyPrestigeBonuses() {
    const level = gameState.hallOfFame.prestigeLevel;
    
    // Apply click bonus
    gameState.crystalsPerClick *= (1 + (level * 0.1));
    
    // Apply CPS bonus (will apply when upgrades are bought)
    // Cost reduction applies during purchase
}


// ===========================
// UPGRADE SYSTEM
// ===========================

function initializeUpgrades() {
    const container = document.getElementById('upgradesContainer');
    container.innerHTML = '';
    
    // Group upgrades by tier
    const tiers = {
        1: [],
        2: [],
        3: [],
        4: [],
        5: []
    };
    
    for (let key in gameState.upgrades) {
        const upgrade = gameState.upgrades[key];
        const tier = upgrade.tier || 1;
        
        // Only show if unlocked
        if (isUpgradeUnlocked(upgrade)) {
            tiers[tier].push({ key, upgrade });
        }
    }
    
    // Create upgrade cards for each tier
    for (let tier = 1; tier <= 5; tier++) {
        if (tiers[tier].length > 0) {
            // Add tier header
            const tierHeader = document.createElement('div');
            tierHeader.className = 'tier-header';
            tierHeader.innerHTML = `
                <div class="tier-badge">TIER ${tier}</div>
                <div class="tier-line"></div>
            `;
            container.appendChild(tierHeader);
            
            // Add upgrade cards for this tier
            tiers[tier].forEach(({ key, upgrade }) => {
                const upgradeCard = createUpgradeCard(key, upgrade);
                container.appendChild(upgradeCard);
            });
        }
    }
}

function createUpgradeCard(key, upgrade) {
    const card = document.createElement('div');
    card.className = 'upgrade-card';
    card.id = `upgrade-${key}`;
    card.setAttribute('data-tier', upgrade.tier || 1);
    
    card.innerHTML = `
        <div class="upgrade-info">
            <div class="upgrade-name">${upgrade.name}</div>
            <div class="upgrade-description">${upgrade.description}</div>
            <div class="upgrade-owned">Owned: <span id="${key}-owned">${upgrade.owned}</span></div>
        </div>
        <div class="upgrade-buy">
            <div class="upgrade-cost" id="${key}-cost"></div>
            <button class="buy-btn" onclick="buyUpgrade('${key}')">BUY</button>
        </div>
    `;
    
    return card;
}

function buyUpgrade(upgradeKey) {
    const upgrade = gameState.upgrades[upgradeKey];
    
    // Check if can afford
    if (!canAffordUpgrade(upgrade)) {
        return;
    }
    
    // Deduct costs
    if (upgrade.cost) {
        gameState.crystals -= upgrade.cost;
        gameState.stats.totalCrystalsSpent += upgrade.cost;
    }
    if (upgrade.energyCost) {
        gameState.energy -= upgrade.energyCost;
        gameState.stats.totalEnergySpent += upgrade.energyCost;
    }
    if (upgrade.gemCost) {
        gameState.gems -= upgrade.gemCost;
        gameState.stats.totalGemsSpent += upgrade.gemCost;
    }
    
    // Increase owned count
    upgrade.owned++;
    gameState.stats.totalUpgradesPurchased++;
    
    // Apply upgrade effects
    applyUpgradeEffect(upgradeKey, upgrade);
    
    // Increase cost for next purchase
    if (upgrade.cost) {
        upgrade.cost = Math.ceil(upgrade.cost * upgrade.costMultiplier);
    }
    if (upgrade.energyCost) {
        upgrade.energyCost = Math.ceil(upgrade.energyCost * upgrade.costMultiplier);
    }
    if (upgrade.gemCost) {
        upgrade.gemCost = Math.ceil(upgrade.gemCost * upgrade.costMultiplier);
    }
    
    // Update display
    updateDisplay();
    
    // Save game
    saveGame();
}

function applyUpgradeEffect(key, upgrade) {
    switch(upgrade.type) {
        case 'cps':
            gameState.crystalsPerSecond += upgrade.cps;
            break;
        case 'click':
            gameState.crystalsPerClick += upgrade.clickBonus;
            break;
        case 'energy':
            gameState.energyPerSecond += upgrade.energyBonus;
            break;
        case 'gemChance':
            gameState.gemChance += upgrade.gemChanceBonus;
            break;
        case 'gemBonus':
            gameState.gemsPerClick += upgrade.gemsPerClickBonus;
            break;
        case 'multiplier':
            recalculateCPS();
            break;
        case 'globalMultiplier':
            recalculateCPS();
            recalculateClickPower();
            break;
    }
    
    // Track highest stats
    if (gameState.crystalsPerSecond > gameState.stats.highestCPS) {
        gameState.stats.highestCPS = gameState.crystalsPerSecond;
    }
    if (gameState.crystalsPerClick > gameState.stats.highestClickPower) {
        gameState.stats.highestClickPower = gameState.crystalsPerClick;
    }
}

function canAffordUpgrade(upgrade) {
    let canAfford = true;
    
    // Check crystal cost
    if (upgrade.cost && gameState.crystals < upgrade.cost) {
        canAfford = false;
    }
    
    // Check energy cost
    if (upgrade.energyCost && gameState.energy < upgrade.energyCost) {
        canAfford = false;
    }
    
    // Check gem cost
    if (upgrade.gemCost && gameState.gems < upgrade.gemCost) {
        canAfford = false;
    }
    
    return canAfford;
}

function updateUpgradeCost(key, upgrade) {
    const costElement = document.getElementById(`${key}-cost`);
    if (!costElement) return;
    
    let costHTML = '';
    
    // Crystal cost
    if (upgrade.cost && upgrade.cost > 0) {
        const canAffordCrystals = gameState.crystals >= upgrade.cost;
        const costClass = canAffordCrystals ? '' : 'cost-insufficient';
        costHTML += `<div class="cost-item ${costClass}">💎 ${formatNumber(upgrade.cost)}</div>`;
    }
    
    // Energy cost
    if (upgrade.energyCost) {
        const canAffordEnergy = gameState.energy >= upgrade.energyCost;
        const costClass = canAffordEnergy ? 'cost-energy' : 'cost-energy cost-insufficient';
        costHTML += `<div class="cost-item ${costClass}">⚡ ${formatNumber(upgrade.energyCost)}</div>`;
    }
    
    // Gem cost
    if (upgrade.gemCost) {
        const canAffordGems = gameState.gems >= upgrade.gemCost;
        const costClass = canAffordGems ? 'cost-gem' : 'cost-gem cost-insufficient';
        costHTML += `<div class="cost-item ${costClass}">💠 ${formatNumber(upgrade.gemCost)}</div>`;
    }
    
    costElement.innerHTML = costHTML;
}

function recalculateCPS() {
    let base = 0;
    let multiplier = 1;
    
    // Calculate base CPS from upgrades
    for (let key in gameState.upgrades) {
        const upgrade = gameState.upgrades[key];
        if (upgrade.type === 'cps') {
            base += upgrade.cps * upgrade.owned;
        }
        if (upgrade.type === 'multiplier') {
            multiplier *= Math.pow(upgrade.cpsMultiplier, upgrade.owned);
        }
        if (upgrade.type === 'globalMultiplier') {
            multiplier *= Math.pow(upgrade.globalMultiplier, upgrade.owned);
        }
    }
    
    gameState.crystalsPerSecond = base * multiplier;
}

function recalculateClickPower() {
    let base = 1;
    let multiplier = 1;
    
    // Calculate base click power
    for (let key in gameState.upgrades) {
        const upgrade = gameState.upgrades[key];
        if (upgrade.type === 'click') {
            base += upgrade.clickBonus * upgrade.owned;
        }
        if (upgrade.type === 'globalMultiplier') {
            multiplier *= Math.pow(upgrade.globalMultiplier, upgrade.owned);
        }
    }
    
    gameState.crystalsPerClick = base * multiplier;
}

function recalculateEnergy() {
    let base = 0.1;
    
    for (let key in gameState.upgrades) {
        const upgrade = gameState.upgrades[key];
        if (upgrade.type === 'energy' && upgrade.energyBonus) {
            base += upgrade.energyBonus * upgrade.owned;
        }
    }
    
    gameState.energyPerSecond = base;
}

function calculateCPS() {
    recalculateCPS();
}

function calculateClickPower() {
    recalculateClickPower();
}

// ===========================
// UNLOCK SYSTEM
// ===========================

function checkUnlocks() {
    for (let key in gameState.upgrades) {
        const upgrade = gameState.upgrades[key];
        
        // Skip if no unlock condition (always available)
        if (!upgrade.unlockCondition) {
            continue;
        }
        
        // Skip if already unlocked
        if (upgrade.unlocked) {
            continue;
        }
        
        // Check unlock condition using helper
        if (checkUnlockCondition(upgrade.unlockCondition)) {
            upgrade.unlocked = true;
            showUnlockNotification(upgrade.name);
            initializeUpgrades();
        }
    }
}

function checkUnlockCondition(condition) {
    switch(condition.type) {
        case 'crystals':
            return gameState.crystals >= condition.value;
        case 'totalCrystals':
            return gameState.totalCrystals >= condition.value;
        case 'cps':
            return gameState.crystalsPerSecond >= condition.value;
        case 'clicks':
            return gameState.stats.totalClicks >= condition.value;
        case 'upgrades':
            return gameState.stats.totalUpgradesPurchased >= condition.value;
        case 'totalEnergy':
            return gameState.totalEnergy >= condition.value;
        case 'totalGems':
            return gameState.totalGems >= condition.value;
        default:
            return false;
    }
}

function showUnlockNotification(upgradeName) {
    const notification = document.createElement('div');
    notification.className = 'unlock-notification';
    notification.innerHTML = `
        <div class="unlock-icon">🔓</div>
        <div class="unlock-text">
            <strong>NEW UPGRADE UNLOCKED!</strong>
            <div>${upgradeName}</div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    soundUpgradeUnlock(); // NEW: Play unlock sound
    
    // Hide and remove after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 4000);
}

function isUpgradeUnlocked(upgrade) {
    // If no unlock condition, it's always available
    if (!upgrade.unlockCondition) {
        return true;
    }
    
    // Check if explicitly unlocked
    return upgrade.unlocked === true;
}

// ===========================
// GAME LOOP
// ===========================

let lastTime = Date.now();

function startGameLoop() {
    gameLoop();
}

function gameLoop() {
    const currentTime = Date.now();
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    
    // Track play time
    gameState.totalPlayTime += deltaTime;
    
    // Add passive crystal income
    if (gameState.crystalsPerSecond > 0) {
        const earned = gameState.crystalsPerSecond * deltaTime;
        gameState.crystals += earned;
        gameState.totalCrystals += earned;
        gameState.stats.totalCrystalsEarned += earned;
        gameState.hallOfFame.currentRun.crystalsEarned += earned; // NEW
        
        if (gameState.crystalsPerSecond > gameState.stats.highestCPS) {
            gameState.stats.highestCPS = gameState.crystalsPerSecond;
        }
        
        if (Math.random() < 0.01 && gameState.crystalsPerSecond > 100) {
            soundPassiveIncome();
        }
    }
    
    // Add passive energy income
    if (gameState.energyPerSecond > 0) {
        const oldEnergy = gameState.energy;
        const energyEarned = gameState.energyPerSecond * deltaTime;
        gameState.energy = Math.min(gameState.energy + energyEarned, gameState.maxEnergy);
        gameState.totalEnergy += energyEarned;
        gameState.stats.totalEnergyEarned += energyEarned;
        
        if (oldEnergy < gameState.maxEnergy && gameState.energy >= gameState.maxEnergy) {
            soundEnergyFull();
        }
    }
    
    // Check for unlocks
    checkUnlocks();
    
    // NEW: Check achievements every second
    if (Math.floor(currentTime / 1000) !== Math.floor(lastTime / 1000)) {
        checkAchievements();
        checkSpeedRecords();
    }
    
    // Update display
    updateDisplay();
    
    // Continue loop
    requestAnimationFrame(gameLoop);
}

// ===========================
// UI UPDATE
// ===========================

function updateDisplay() {
    // Update crystal stats
    document.getElementById('crystals').textContent = formatNumber(gameState.crystals);
    document.getElementById('crystalsPerSecond').textContent = formatNumber(gameState.crystalsPerSecond);
    document.getElementById('crystalsPerClick').textContent = formatNumber(gameState.crystalsPerClick);
    
    // Update energy stats
    document.getElementById('energy').textContent = formatNumber(gameState.energy);
    document.getElementById('maxEnergy').textContent = formatNumber(gameState.maxEnergy);
    document.getElementById('energyPerSecond').textContent = formatNumber(gameState.energyPerSecond);
    
    // Update gem stats
    document.getElementById('gems').textContent = formatNumber(gameState.gems);
    
    // Update upgrades
    for (let key in gameState.upgrades) {
        const upgrade = gameState.upgrades[key];
        
        // Update owned count
        const ownedElement = document.getElementById(`${key}-owned`);
        if (ownedElement) {
            ownedElement.textContent = upgrade.owned;
        }
        
        // Update cost display
        updateUpgradeCost(key, upgrade);
        
        // Enable/disable buy button
        const upgradeCard = document.getElementById(`upgrade-${key}`);
        if (upgradeCard) {
            const buyBtn = upgradeCard.querySelector('.buy-btn');
            const canAfford = canAffordUpgrade(upgrade);
            buyBtn.disabled = !canAfford;
        }
    }
}

// ===========================
// HELPER FUNCTIONS
// ===========================

function formatNumber(num) {
    // Handle NaN or undefined
    if (num === undefined || num === null || isNaN(num)) {
        return '0';
    }
    
    if (num < 1000) {
        return Math.floor(num).toString();
    } else if (num < 1000000) {
        return (num / 1000).toFixed(1) + 'K';
    } else if (num < 1000000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else {
        return (num / 1000000000).toFixed(1) + 'B';
    }
}

// ===========================
// SAVE/LOAD SYSTEM
// ===========================

function saveGame() {
    // Update last save time
    gameState.lastSaveTime = Date.now();
    
    // Track manual saves (when button is clicked)
    if (event && event.type === 'click') {
        gameState.stats.manualSaves++;
    }
    
    localStorage.setItem('cosmicMiningGame', JSON.stringify(gameState));
    showSaveNotification();
}

function showSaveNotification() {
    const notification = document.getElementById('saveNotification');
    
    // Show notification
    notification.classList.add('show');
    
    soundSave(); // NEW: Play save sound
    
    // Hide after 2 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

function loadGame() {
    const saved = localStorage.getItem('cosmicMiningGame');
    if (saved) {
        const loadedState = JSON.parse(saved);
        
        // Calculate offline earnings
        const now = Date.now();
        const timeDiff = (now - (loadedState.lastSaveTime || now)) / 1000;
        
        // Apply loaded state
        gameState = loadedState;
        
        // Initialize missing resource properties (for old saves)
        if (gameState.energy === undefined) gameState.energy = 0;
        if (gameState.totalEnergy === undefined) gameState.totalEnergy = 0;
        if (gameState.energyPerSecond === undefined) gameState.energyPerSecond = 0.1;
        if (gameState.maxEnergy === undefined) gameState.maxEnergy = 100;
        if (gameState.gems === undefined) gameState.gems = 0;
        if (gameState.totalGems === undefined) gameState.totalGems = 0;
        if (gameState.gemsPerClick === undefined) gameState.gemsPerClick = 0;
        if (gameState.gemChance === undefined) gameState.gemChance = 0.03;
        
        // Initialize unlock status for all upgrades
        for (let key in gameState.upgrades) {
            const upgrade = gameState.upgrades[key];
            if (upgrade.unlocked === undefined) {
                if (!upgrade.unlockCondition) {
                    upgrade.unlocked = true;
                } else {
                    upgrade.unlocked = checkUnlockCondition(upgrade.unlockCondition);
                }
            }
        }
        
        // Initialize stats if missing
        if (!gameState.stats) {
            gameState.stats = {
                totalCrystalsEarned: gameState.totalCrystals || 0,
                totalCrystalsSpent: 0,
                totalEnergyEarned: 0,
                totalEnergySpent: 0,
                totalGemsEarned: 0,
                totalGemsSpent: 0,
                totalClicks: gameState.totalClicks || 0,
                totalUpgradesPurchased: 0,
                highestCPS: gameState.crystalsPerSecond || 0,
                highestClickPower: gameState.crystalsPerClick || 1,
                gameStartTime: Date.now(),
                offlineEarningsTotal: 0,
                manualSaves: 0,
                totalResets: 0
            };
        }
        
        // Ensure energy/gem stats exist
        if (gameState.stats.totalEnergyEarned === undefined) gameState.stats.totalEnergyEarned = 0;
        if (gameState.stats.totalEnergySpent === undefined) gameState.stats.totalEnergySpent = 0;
        if (gameState.stats.totalGemsEarned === undefined) gameState.stats.totalGemsEarned = 0;
        if (gameState.stats.totalGemsSpent === undefined) gameState.stats.totalGemsSpent = 0;
        
        // NEW: Initialize Hall of Fame if missing
        if (!gameState.hallOfFame) {
            gameState.hallOfFame = {
                topRuns: [],
                currentRun: {
                    startTime: Date.now(),
                    crystalsEarned: 0,
                    clicksThisRun: 0,
                    upgradesBought: 0
                },
                speedRecords: {
                    reach100Crystals: null,
                    reach1000Crystals: null,
                    reach10000Crystals: null,
                    reach100000Crystals: null,
                    reach1000000Crystals: null,
                    firstUpgrade: null,
                    tier2Unlock: null,
                    tier3Unlock: null,
                    tier4Unlock: null,
                    tier5Unlock: null
                },
                achievements: {},
                prestigeLevel: 0,
                prestigePoints: 0,
                lifetimePrestigePoints: 0,
                dailyChallenge: {
                    date: null,
                    completed: false,
                    progress: 0
                }
            };
        }
        
        // Ensure all Hall of Fame sub-objects exist
        if (!gameState.hallOfFame.topRuns) gameState.hallOfFame.topRuns = [];
        if (!gameState.hallOfFame.currentRun) {
            gameState.hallOfFame.currentRun = {
                startTime: Date.now(),
                crystalsEarned: 0,
                clicksThisRun: 0,
                upgradesBought: 0
            };
        }
        if (!gameState.hallOfFame.speedRecords) {
            gameState.hallOfFame.speedRecords = {
                reach100Crystals: null,
                reach1000Crystals: null,
                reach10000Crystals: null,
                reach100000Crystals: null,
                reach1000000Crystals: null,
                firstUpgrade: null,
                tier2Unlock: null,
                tier3Unlock: null,
                tier4Unlock: null,
                tier5Unlock: null
            };
        }
        if (!gameState.hallOfFame.achievements) gameState.hallOfFame.achievements = {};
        if (gameState.hallOfFame.prestigeLevel === undefined) gameState.hallOfFame.prestigeLevel = 0;
        if (gameState.hallOfFame.prestigePoints === undefined) gameState.hallOfFame.prestigePoints = 0;
        if (gameState.hallOfFame.lifetimePrestigePoints === undefined) gameState.hallOfFame.lifetimePrestigePoints = 0;
        
        // Reset current run start time (don't carry over from previous session)
        gameState.hallOfFame.currentRun.startTime = Date.now();
        
        // Reset session start time
        gameState.sessionStartTime = Date.now();
        
        calculateCPS();
        calculateClickPower();
        recalculateEnergy();
        
        // Offline earnings logic
        if (timeDiff >= 10 && gameState.crystalsPerSecond > 0) {
            const cappedTime = Math.min(timeDiff, 43200); // 12 hours
            const offlineEarnings = gameState.crystalsPerSecond * cappedTime;
            
            gameState.crystals += offlineEarnings;
            gameState.totalCrystals += offlineEarnings;
            gameState.stats.offlineEarningsTotal += offlineEarnings;
            gameState.stats.totalCrystalsEarned += offlineEarnings;
            
            // Also add to current run
            if (gameState.hallOfFame && gameState.hallOfFame.currentRun) {
                gameState.hallOfFame.currentRun.crystalsEarned += offlineEarnings;
            }
            
            showOfflineEarnings(offlineEarnings, cappedTime);
        }
        
        console.log('Game loaded!');
        console.log('Hall of Fame status:', gameState.hallOfFame);
    } else {
        // NEW GAME: Initialize all upgrades unlock status
        for (let key in gameState.upgrades) {
            const upgrade = gameState.upgrades[key];
            if (!upgrade.unlockCondition) {
                upgrade.unlocked = true;
            } else {
                upgrade.unlocked = false;
            }
        }
        
        // NEW GAME: Start first run
        if (gameState.hallOfFame && gameState.hallOfFame.currentRun) {
            gameState.hallOfFame.currentRun.startTime = Date.now();
        }
        
        console.log('New game started!');
    }
}

function showOfflineEarnings(earnings, timeAway) {
    const hours = Math.floor(timeAway / 3600);
    const minutes = Math.floor((timeAway % 3600) / 60);
    
    let timeText = '';
    if (hours > 0) {
        timeText = `${hours}h ${minutes}m`;
    } else {
        timeText = `${minutes}m`;
    }
    
    const modal = document.getElementById('offlineModal');
    const earningsDisplay = document.getElementById('offlineEarnings');
    const timeDisplay = document.getElementById('offlineTime');
    
    earningsDisplay.textContent = formatNumber(earnings);
    timeDisplay.textContent = timeText;
    
    modal.classList.add('show');
}

function closeOfflineModal() {
    const modal = document.getElementById('offlineModal');
    modal.classList.remove('show');
}

function resetGame() {
    if (confirm('Are you sure you want to reset? All progress will be lost!')) {
        localStorage.removeItem('cosmicMiningGame');
        location.reload();
    }
}

// ===========================
// STATISTICS PAGE
// ===========================

function toggleStatsPage() {
    const statsPage = document.getElementById('statsPage');
    const isVisible = statsPage.classList.contains('show');
    
    if (isVisible) {
        statsPage.classList.remove('show');
    } else {
        updateStatsDisplay();
        statsPage.classList.add('show');
    }
}

function updateStatsDisplay() {
    // Calculate session time
    const sessionTime = (Date.now() - gameState.sessionStartTime) / 1000;
    
    // Calculate total game time
    const totalGameTime = ((Date.now() - gameState.stats.gameStartTime) / 1000) + gameState.totalPlayTime;
    
    // Update all stat displays
    document.getElementById('stat-totalCrystalsEarned').textContent = formatNumber(gameState.stats.totalCrystalsEarned);
    document.getElementById('stat-totalCrystalsSpent').textContent = formatNumber(gameState.stats.totalCrystalsSpent);
    document.getElementById('stat-currentCrystals').textContent = formatNumber(gameState.crystals);
    document.getElementById('stat-totalClicks').textContent = formatNumber(gameState.stats.totalClicks);
    document.getElementById('stat-totalUpgrades').textContent = gameState.stats.totalUpgradesPurchased;
    document.getElementById('stat-highestCPS').textContent = formatNumber(gameState.stats.highestCPS);
    document.getElementById('stat-highestClickPower').textContent = formatNumber(gameState.stats.highestClickPower);
    document.getElementById('stat-currentCPS').textContent = formatNumber(gameState.crystalsPerSecond);
    document.getElementById('stat-currentClickPower').textContent = formatNumber(gameState.crystalsPerClick);
    document.getElementById('stat-offlineEarnings').textContent = formatNumber(gameState.stats.offlineEarningsTotal);
    document.getElementById('stat-sessionTime').textContent = formatTime(sessionTime);
    document.getElementById('stat-totalPlayTime').textContent = formatTime(totalGameTime);
    document.getElementById('stat-manualSaves').textContent = gameState.stats.manualSaves;
    
    // Calculate efficiency
    const clickEfficiency = gameState.stats.totalClicks > 0 ? 
        (gameState.stats.totalCrystalsEarned / gameState.stats.totalClicks).toFixed(2) : 0;
    document.getElementById('stat-clickEfficiency').textContent = clickEfficiency;
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
        return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
        return `${minutes}m ${secs}s`;
    } else {
        return `${secs}s`;
    }
}


// Auto-save every 30 seconds
setInterval(saveGame, 30000);