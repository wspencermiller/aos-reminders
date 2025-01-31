import { keyPicker, tagAs } from 'factions/metatagger'
import { GenericEffects } from 'generic_rules'
import { MARK_KHORNE, MARK_NURGLE, MARK_SLAANESH, MARK_TZEENTCH, MARK_UNDIVIDED } from 'meta/alliances'
import {
  BATTLESHOCK_PHASE,
  CHARGE_PHASE,
  COMBAT_PHASE,
  DURING_GAME,
  DURING_SETUP,
  END_OF_COMBAT_PHASE,
  END_OF_SETUP,
  HERO_PHASE,
  MOVEMENT_PHASE,
  SAVES_PHASE,
  SHOOTING_PHASE,
  START_OF_BATTLESHOCK_PHASE,
  START_OF_CHARGE_PHASE,
  START_OF_COMBAT_PHASE,
  START_OF_HERO_PHASE,
  START_OF_MOVEMENT_PHASE,
  START_OF_SHOOTING_PHASE,
  WARDS_PHASE,
  WOUND_ALLOCATION_PHASE,
} from 'types/phases'
import CommandAbilities from './command_abilities'
import Prayers from './prayers'
import rule_sources from './rule_sources'
import Spells from './spells'

// Common effects used on multiple warscrolls.
const ChaosRuneshieldEffect = {
  name: `Chaos Runeshield / Rune-etched Plating / Dark Blessings`,
  desc: `Roll a D6 each time the equipped model suffers a mortal wound. On a 5+ it is negated.`,
  when: [WOUND_ALLOCATION_PHASE],
  shared: true,
}
const OracularVisionsEffects = [
  {
    name: `Oracular Visions`,
    desc: `In your hero phase, you can pick 1 friendly MORTAL SLAVES TO DARKNESS unit wholly within 12" of this unit. If you do so, add 1 to save rolls for attacks that target that unit until your next hero phase.`,
    when: [HERO_PHASE],
    rule_sources: [rule_sources.BATTLETOME_SLAVES_TO_DARKNESS, rule_sources.ERRATA_JULY_2021],
    shared: true,
  },
  {
    name: `Oracular Visions`,
    desc: `If active, add 1 to save rolls for attacks that target that unit until your next hero phase.`,
    when: [SAVES_PHASE],
    rule_sources: [rule_sources.BATTLETOME_SLAVES_TO_DARKNESS, rule_sources.ERRATA_JULY_2021],
    shared: true,
  },
]
const DaemonforgedWeaponEffect = {
  name: `Daemonbound / Soul Splitter`,
  desc: `If the unmodified hit roll for an attack made with the appropriate weapon is 6, that attack inflicts 1 mortal wound in addition to any normal damage.`,
  when: [COMBAT_PHASE],
  shared: true,
}
const FuelledByCarnageEffect = {
  name: `Fuelled by Carnage`,
  desc: `If any enemy models were slain this phase by wounds inflicted by this model's Cursed/Hexed weapon you can heal up to D3 wounds allocated to this model.`,
  when: [END_OF_COMBAT_PHASE],
  shared: true,
}
const TerritorialPredatorEffect = {
  name: `Territorial Predator`,
  desc: `You can reroll hit rolls for attacks with this model's Honed Fangs and Claws if the target is a MONSTER.`,
  when: [COMBAT_PHASE],
  shared: true,
}
const PactOfSoulAndIronEffect = {
  name: `Pact of Soul and Iron`,
  desc: `You can reroll hit rolls for attacks made by this model. In addition you can reroll wound rolls for attacks made by this model that target a Stormcast Eternal.`,
  when: [COMBAT_PHASE],
  shared: true,
}
const ChaosChariotEffects = [
  {
    name: `Don't Spare the Lash`,
    desc: `Once per battle, this unit can run and still charge later in the same turn.`,
    when: [MOVEMENT_PHASE, CHARGE_PHASE],
    shared: true,
  },
  {
    name: `Swift Death`,
    desc: `After finishing a charge move with this unit, pick 1 enemy unit within 1". Roll a number of dice equal to the charge roll. For each 5+ that enemy suffers 1 mortal wound.`,
    when: [CHARGE_PHASE],
    shared: true,
  },
]
const GorebeastChariotEffects = [
  {
    name: `Crashing Charge`,
    desc: `After this unit has finished a charge move, roll a D6 for each enemy model within 1". On a 2+ the target suffers D3 mortal wounds.`,
    when: [CHARGE_PHASE],
    shared: true,
  },
  {
    name: `Explosive Brutality`,
    desc: `If this unit makes a charge move and the unmodified roll was an 8+, add 1 to the hit and wound rolls for attacks made by this unit's Crushing Fists until your next hero phase.`,
    when: [CHARGE_PHASE, COMBAT_PHASE],
    shared: true,
  },
]
// Common unit composition effects.
const UnitLeaderEffect = {
  name: `Unit Leader`,
  desc: `Add 1 to the attacks characteristic of the unit leader's melee weapons (excluding its mount if it has one).`,
  when: [COMBAT_PHASE],
  shared: true,
}
const MusiciansEffect = {
  name: `Musicians`,
  desc: `If the unit includes any musicians, add 1 to its run and charge rolls.`,
  when: [MOVEMENT_PHASE, CHARGE_PHASE],
  shared: true,
}
const StandardBearersEffect = {
  name: `Standard Bearers`,
  desc: `Add 1 to the bravery of a friendly unit containing any standard bearers.`,
  when: [DURING_GAME],
  shared: true,
}
const IconBearersEffect = {
  name: `Icon Bearers`,
  desc: `Subtract 1 from the bravery characteristic of enemy units while they are within 6" of any friendly icon bearers.`,
  when: [DURING_GAME],
  shared: true,
}

// Marauder specific effects.
const BarbarianHordesEffect = {
  name: `Barbarian Hordes`,
  desc: `Add 1 to the hit rolls of this unit while it has at least 10 models. Improve the rend characteristic of this unit's melee weapons by 1 while it has at least 20 models.`,
  when: [COMBAT_PHASE],
  shared: true,
}
const DarkwoodShieldEffect = {
  name: `Darkwood Shield`,
  desc: `Add 1 to the save rolls for attacks that target this unit.`,
  when: [SAVES_PHASE],
  shared: true,
}

// Chariot specific effects.
const ExaltedCharioteerEffect = {
  name: `Exalted Charioteer`,
  desc: `If this unit has 2 or more models, 1 model in this unit can be an Exalted Charioteer. Add 1 to hit rolls for attacks made with that model's melee weapons (excluding those of its mount)`,
  when: [COMBAT_PHASE],
  rule_sources: [rule_sources.BATTLETOME_SLAVES_TO_DARKNESS, rule_sources.ERRATA_JULY_2021],
  shared: true,
}

// Chaos Mark Effects.
const ChaosMarkAll = {
  name: `Mark of Chaos (${MARK_KHORNE}, ${MARK_NURGLE}, ${MARK_SLAANESH}, ${MARK_TZEENTCH}, ${MARK_UNDIVIDED})`,
  desc: `This unit either has or must take any Mark of Chaos during list construction.`,
  when: [DURING_SETUP],
  shared: true,
}

const ChaosMarkGod = {
  name: `Mark of Chaos (${MARK_KHORNE}, ${MARK_NURGLE}, ${MARK_SLAANESH}, ${MARK_TZEENTCH})`,
  desc: `This unit must take any one of the following Marks of Chaos during list construction: Khorne, Nurgle, Slaanesh, or Tzeentch.`,
  when: [DURING_SETUP],
  shared: true,
}

const ChaosMarkSorcerer = {
  name: `Mark of Chaos (${MARK_NURGLE}, ${MARK_SLAANESH}, ${MARK_TZEENTCH}, ${MARK_UNDIVIDED})`,
  desc: `This unit must take any one of the following Mark of Chaos during list construction: Nurgle, Slaanesh, Tzeentch, or Undivided.`,
  when: [DURING_SETUP],
  shared: true,
}

const ChaosMarkKhorne = {
  name: `Mark of Chaos (${MARK_KHORNE})`,
  desc: `This unit must take the Khorne Mark of Chaos during list construction.`,
  when: [DURING_SETUP],
  shared: true,
}

const ChaosMarkTzeentch = {
  name: `Mark of Chaos (${MARK_TZEENTCH})`,
  desc: `This unit must take the Tzeentch Mark of Chaos during list construction.`,
  when: [DURING_SETUP],
  shared: true,
}

const Units = {
  'Archaon the Everchosen': {
    mandatory: {
      command_abilities: [keyPicker(CommandAbilities, ['By My Will'])],
    },
    effects: [
      ChaosMarkAll,
      GenericEffects.WizardTwoSpellsEffect,
      {
        name: `Warmaster`,
        desc: `If this unit is included in your army, it is treated as a general even if it is not the model picked to be the army's general. In addition, this unit can be included in a Blades of Khorne, Disciples of Tzeentch, Maggotkin of Nurgle or Hedonites of Slaanesh army. If you do so, you can still use the army's allegiance abilities even though this unit is not from the army's faction; however, this unit does not benefit from them.`,
        when: [WOUND_ALLOCATION_PHASE],
        rule_sources: [
          rule_sources.BATTLETOME_SLAVES_TO_DARKNESS,
          rule_sources.ERRATA_JULY_2021,
          rule_sources.ERRATA_DECEMBER_2021,
        ],
      },
      {
        name: `The Armour of Morkar`,
        desc: `This unit has a ward of 4+ against mortal wounds. In addition, for each unmodified ward roll of 6, you can pick 1 enemy unit within 3" to suffer 1 mortal wound that cannot be negated.`,
        when: [WARDS_PHASE],
        rule_sources: [rule_sources.BATTLETOME_SLAVES_TO_DARKNESS, rule_sources.ERRATA_DECEMBER_2021],
      },
      {
        name: `The Crown of Domination`,
        desc: `Add 2 to the Bravery characteristic of friendly CHAOS units wholly within 12" of this unit. In addition, subtract 2 from the Bravery characteristic of enemy units while they are within 12" of this unit.`,
        when: [BATTLESHOCK_PHASE],
        rule_sources: [rule_sources.BATTLETOME_SLAVES_TO_DARKNESS, rule_sources.ERRATA_DECEMBER_2021],
      },
      {
        name: `The Eye of Sheerian`,
        desc: `Once per battle, at the start of your hero phase, you can say that Archaon will use the Eye of Sheerian. If you do so, subtract 1 from hit rolls for attacks that target this unit until your next hero phase.`,
        when: [START_OF_HERO_PHASE],
        rule_sources: [rule_sources.BATTLETOME_SLAVES_TO_DARKNESS, rule_sources.ERRATA_AUGUST_2021],
      },
      {
        name: `The Everchosen`,
        desc: `Each time this unit is affected by a spell or endless spell, you can roll a dice. On a 4+, ignore the effect of that spell or that endless spell on this unit.`,
        when: [HERO_PHASE],
        rule_sources: [rule_sources.BATTLETOME_SLAVES_TO_DARKNESS, rule_sources.ERRATA_DECEMBER_2021],
      },
      {
        name: `The Slayer of Kings`,
        desc: `Each time this unit fights, if the unmodified wound roll for 2 or more attacks that target the same enemy HERO with the Slayer of Kings is 6, that HERO is slain.`,
        when: [COMBAT_PHASE],
        rule_sources: [
          rule_sources.BATTLETOME_SLAVES_TO_DARKNESS,
          rule_sources.ERRATA_JULY_2021,
          rule_sources.ERRATA_DECEMBER_2021,
        ],
      },
      {
        name: `Three-headed Titan`,
        desc: `At the start of your hero phase, you can say that Dorghar will draw upon his daemonic might. If you do so, choose 1 of the following effects:`,
        when: [START_OF_HERO_PHASE],
      },
      {
        name: `Three-headed Titan: Filth-spewer`,
        desc: `Pick 1 enemy unit within 12" of this unit and roll a dice. On a 3+, that unit suffers D3 mortal wounds.`,
        when: [START_OF_HERO_PHASE],
        rule_sources: [rule_sources.BATTLETOME_SLAVES_TO_DARKNESS, rule_sources.ERRATA_DECEMBER_2021],
      },
      {
        name: `Three-headed Titan: Skull-gorger`,
        desc: `You can heal up to D3 wounds allocated to this unit.`,
        when: [START_OF_HERO_PHASE],
        rule_sources: [rule_sources.BATTLETOME_SLAVES_TO_DARKNESS, rule_sources.ERRATA_DECEMBER_2021],
      },
      {
        name: `Three-headed Titan: Spell-eater`,
        desc: `Pick 1 endless spell within 18" of this unit; that endless spell is dispelled.`,
        when: [START_OF_HERO_PHASE],
        rule_sources: [rule_sources.BATTLETOME_SLAVES_TO_DARKNESS, rule_sources.ERRATA_DECEMBER_2021],
      },
      {
        name: `Warlord Without Equal`,
        desc: `If this unit is on the battlefield at the start of your hero phase, you receive 1 extra command point.`,
        when: [START_OF_HERO_PHASE],
        rule_sources: [rule_sources.BATTLETOME_SLAVES_TO_DARKNESS, rule_sources.ERRATA_DECEMBER_2021],
      },
    ],
  },
  'Gaunt Summoner on Disc of Tzeentch': {
    mandatory: {
      spells: [keyPicker(Spells, ['Infernal Flames'])],
    },
    effects: [
      ChaosMarkTzeentch,
      {
        name: `Book of Profane Secrets`,
        desc: `Once per battle this model can use this ability. Summon 1 unit of the following to the battlefield: 5 Horrors of Tzeentch, 10 Bloodletters, 10 Daemonettes, 10 Plaguebearers or 6 Furies. The summoned unit must be set up wholly within 9" of a this model and more than 9" from any enemy units.`,
        when: [START_OF_HERO_PHASE],
      },
      {
        name: `Hovering Disc of Tzeentch`,
        desc: `Add 2 to this model's save rolls for attacks made with melee weapons unless the attacker is a MONSTER or can fly.`,
        when: [SAVES_PHASE],
      },
      {
        name: `Warptongue Blade`,
        desc: `If the unmodified wound roll for an attack made with the Warptongue Blade is 6, the attack inflicts D6 mortal wounds on the target and the attack sequence ends.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Wizard`,
        desc: `This model is a WIZARD. Can attempt to cast 2 spells and unbind 2 spells. Knows Arcane Bolt, Mystic Shield, and Infernal Flames.`,
        when: [HERO_PHASE],
      },
    ],
  },
  Varanguard: {
    effects: [
      {
        ...GenericEffects.Elite,
        rule_sources: [rule_sources.BATTLETOME_SLAVES_TO_DARKNESS, rule_sources.ERRATA_AUGUST_2021],
      },
      ChaosMarkAll,
      DaemonforgedWeaponEffect,
      {
        name: `Favoured of the Everchosen`,
        desc: `Add 1 to hit rolls for attacks made with melee weapons by this unit if Archaon is in your army and on the battlefield.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Impaling Charge`,
        desc: `Add 1 to wound rolls and improve rend by 1 for this unit's Fellspears if it charged in the same turn.`,
        when: [CHARGE_PHASE, COMBAT_PHASE],
      },
      {
        name: `Relentless Killers`,
        desc: `Once per battle, this unit can be chosen to pile in and attack for a second time during the same combat phase if it is within 3" of any enemy units.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Warpsteel Shields`,
        desc: `You can roll a D6 if this unit is affected by a spell or endless spell. On a 5+ the effects are ignored on this unit.`,
        when: [HERO_PHASE],
      },
    ],
  },
  'Daemon Prince': {
    mandatory: {
      command_abilities: [
        keyPicker(CommandAbilities, [
          'Bloodslick Ground',
          'Arcane Influence',
          'Bloated Blessings',
          'Revel in Agony',
        ]),
      ],
    },
    effects: [
      ChaosMarkGod,
      {
        name: `Bounding Charge`,
        desc: `Add 1 to the hit rolls for this model if it charged in the same turn.`,
        when: [CHARGE_PHASE, COMBAT_PHASE],
      },
      {
        name: `Hellforged Sword`,
        desc: `If the unmodified hit roll for an attack made with a Hellforged Sword is 6, that attack inflicts 2 mortal wounds and the attack sequence ends.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Immortal Champion`,
        desc: `This model fights at the start of the combat phase. It cannot fight again in that phase unless a spell or ability allows it to fight more than once.`,
        when: [START_OF_COMBAT_PHASE],
      },
    ],
  },
  'Chaos Lord on Manticore': {
    mandatory: {
      command_abilities: [keyPicker(CommandAbilities, ['Iron-willed Overlord'])],
    },
    effects: [
      ChaosMarkAll,
      ChaosRuneshieldEffect,
      DaemonforgedWeaponEffect,
      TerritorialPredatorEffect,
      {
        name: `Chaos Lance`,
        desc: `Add 1 to the damage characteristic and improve the rend characteristic by 2 of this model's Chaos Lance if it made a charge move in the same turn.`,
        when: [CHARGE_PHASE, COMBAT_PHASE],
      },
      {
        name: `Daggerfist`,
        desc: `If this model is equipped with a Daggerfist, when this model makes an unmodified save of 6 against a melee attack the attacking unit suffers 1 mortal wound after all its attacks have resolved.`,
        when: [DURING_GAME],
      },
      {
        name: `Iron-willed Overlord`,
        desc: `If active, you can reroll charge rolls for the buffed unit.`,
        when: [CHARGE_PHASE],
      },
      {
        name: `Iron-willed Overlord`,
        desc: `If active, you can reroll battleshock tests for the buffed unit.`,
        when: [BATTLESHOCK_PHASE],
      },
    ],
  },
  'Chaos Lord on Karkadrak': {
    mandatory: {
      command_abilities: [keyPicker(CommandAbilities, ['The Knights of Chaos'])],
    },
    effects: [
      ChaosMarkAll,
      ChaosRuneshieldEffect,
      DaemonforgedWeaponEffect,
      FuelledByCarnageEffect,
      {
        name: `Brutish Rampage`,
        desc: `Roll a D6 for each enemy unit within 1" of the model after it finishes a charge move. On a 2+ the target suffers D3 mortal wounds.`,
        when: [CHARGE_PHASE],
      },
    ],
  },
  'Chaos Lord on Daemonic Mount': {
    mandatory: {
      command_abilities: [keyPicker(CommandAbilities, ['The Knights of Chaos'])],
    },
    effects: [
      ChaosMarkAll,
      ChaosRuneshieldEffect,
      FuelledByCarnageEffect,
      {
        name: `Cursed Warhammer`,
        desc: `Unmodified hit rolls of 6 with this weapon inflict 2 mortal wounds and end the attack sequence.`,
        when: [COMBAT_PHASE],
      },
    ],
  },
  'Chaos Lord': {
    mandatory: {
      command_abilities: [keyPicker(CommandAbilities, ['Spurred by the Gods'])],
    },
    effects: [ChaosMarkAll, DaemonforgedWeaponEffect],
  },
  'Chaos Sorcerer Lord on Manticore': {
    mandatory: {
      spells: [keyPicker(Spells, ['Winds of Chaos'])],
    },
    effects: [
      ChaosMarkSorcerer,
      ...OracularVisionsEffects,
      TerritorialPredatorEffect,
      {
        name: `Wizard`,
        desc: `This model is a WIZARD. Can attempt to cast 1 spell and unbind 1 spell. Knows Arcane Bolt, Mystic Shield, and Winds of Chaos.`,
        when: [HERO_PHASE],
      },
    ],
  },
  'Chaos Sorcerer Lord': {
    mandatory: {
      spells: [keyPicker(Spells, ['Daemonic Power'])],
    },
    effects: [
      ChaosMarkSorcerer,
      ...OracularVisionsEffects,
      {
        name: `Wizard`,
        desc: `This model is a WIZARD. Can attempt to cast 1 spell and unbind 1 spell. Knows Arcane Bolt, Mystic Shield, and Daemonic Power.`,
        when: [HERO_PHASE],
      },
    ],
  },
  'Exalted Hero of Chaos': {
    effects: [
      ChaosMarkAll,
      ChaosRuneshieldEffect,
      {
        name: `Glory-hungry Bladesman`,
        desc: `Add 1 to the hit rolls for this model if the target is a hero or a MONSTER.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Thrice-damned Dagger`,
        desc: `If this model slays an enemy hero or MONSTER with a melee weapon you can heal up to D3 wounds allocated to this model after all of its attacks have resolved.`,
        when: [END_OF_COMBAT_PHASE],
      },
      {
        name: `Trail of Red Ruin`,
        desc: `If this model made a charge move this turn it can fight again for a second time immeadiately after it's first activation if within 3" of an enemy unit.`,
        when: [CHARGE_PHASE, COMBAT_PHASE],
      },
    ],
  },
  'Theddra Skull-Scryer': {
    mandatory: {
      spells: [keyPicker(Spells, ['Enfeeblement'])],
    },
    effects: [
      PactOfSoulAndIronEffect,
      {
        name: `Wizard`,
        desc: `This model is a WIZARD. Can attempt to cast 1 spell and unbind 1 spell. Knows Arcane Bolt, Mystic Shield, and Enfeeblement.`,
        when: [HERO_PHASE],
      },
    ],
  },
  'Godsworn Hunt': {
    effects: [PactOfSoulAndIronEffect],
  },
  'Darkoath Warqueen': {
    mandatory: {
      command_abilities: [keyPicker(CommandAbilities, ['Will of the Gods'])],
    },
    effects: [
      {
        name: `Infernal Runeshield`,
        desc: `Each time you allocate a wound or mortal wound to this model, roll a D6. On a 6 the wound is negated and the attacking model suffers 1 mortal wound.`,
        when: [WOUND_ALLOCATION_PHASE],
      },
      {
        name: `Savage Duellist`,
        desc: `This model fights at the start of the combat phase. It cannot fight again in this phase unless an ability or spell allows it to fight more than once.`,
        when: [START_OF_COMBAT_PHASE],
      },
    ],
  },
  'Darkoath Chieftain': {
    mandatory: {
      command_abilities: [keyPicker(CommandAbilities, ['Last Gasp of Glory'])],
    },
    effects: [
      {
        name: `Berserker Charge`,
        desc: `Add 3 to the attacks characteristic of this model's Cursed Broadsword if it charged this turn.`,
        when: [CHARGE_PHASE, COMBAT_PHASE],
      },
      {
        name: `Deathblow`,
        desc: `If this model slays any enemy models in the combat phase, each enemy unit within 1" of him suffers 1 mortal wound.`,
        when: [END_OF_COMBAT_PHASE],
      },
    ],
  },
  'Sayl the Faithless': {
    mandatory: {
      spells: [keyPicker(Spells, ["Traitor's Mist"])],
    },
    effects: [
      {
        name: `Mutant Sight`,
        desc: `Once per battle, you can reroll 1 casting or unbinding roll for this model.`,
        when: [HERO_PHASE],
      },
      {
        name: `'Nightmaw, my pet, protect me!'`,
        desc: `Roll a D6 before you allocate a wound or mortal wound to this model while this model is within 3" of Nightmaw. On a 4+, that wound or mortal wound is allocated to Nightmaw instead of to this model.`,
        when: [WOUND_ALLOCATION_PHASE],
      },
      {
        name: `Schalkain's Teeth`,
        desc: `You can pick 1 enemy unit within 8" of this model and roll a D6. On a 5+, that unit suffers D3 mortal wounds.`,
        when: [HERO_PHASE],
      },
      {
        name: `Wizard`,
        desc: `This model is a WIZARD. Can attempt to cast 1 spell and unbind 1 spell. Knows Arcane Bolt, Mystic Shield, and Traitor's Mist.`,
        when: [HERO_PHASE],
      },
    ],
  },
  Nightmaw: {
    effects: [
      {
        name: `Restless Flesh`,
        desc: `You can heal 1 wound allocated to this model.`,
        when: [HERO_PHASE],
      },
      {
        name: `Shadow-kin`,
        desc: `Add 1 to save rolls for attacks made when missile weapons that target this model.`,
        when: [SAVES_PHASE],
      },
      {
        name: `Shadow-kin`,
        desc: `Roll a D6 each time you allocate a mortal wound to this model. On a 5+, that mortal wound is negated.`,
        when: [WOUND_ALLOCATION_PHASE],
      },
      {
        name: `Writhing Tentacles`,
        desc: `If you roll a double when determining the number of attacks made by this model's Razor-tipped Tentacles, add 1 to hit and wound rolls for attacks made by that model until the end of the phase.`,
        when: [COMBAT_PHASE],
      },
    ],
  },
  Slambo: {
    effects: [
      {
        name: `Legendary Killer`,
        desc: `If Slambo charges, he can pile in and attack twice in the following combat phase instead of only once. The second pile in move and attacks are made immediately after the first set of attacks is completed.`,
        when: [CHARGE_PHASE, COMBAT_PHASE],
      },
      {
        name: `Glory-seeking Axeman`,
        desc: `Add 1 to hit rolls made for Slambo if the target is a HERO or MONSTER. If Slambo kills a HERO or MONSTER, he doubles the number of attacks he makes with his Chaos Axes in the next combat phase.`,
        when: [COMBAT_PHASE],
      },
    ],
  },
  'Chaos Marauders': {
    effects: [
      ChaosMarkAll,
      UnitLeaderEffect,
      IconBearersEffect,
      MusiciansEffect,
      BarbarianHordesEffect,
      DarkwoodShieldEffect,
      {
        name: `Boundless Ferocity`,
        desc: `When you make a charge roll for this unit, change the lowest dice in that roll to a 6. If the roll is a double, change one of the dice to a 6 instead.`,
        when: [CHARGE_PHASE],
      },
    ],
  },
  'Chaos Marauder Horsemen': {
    effects: [
      ChaosMarkAll,
      UnitLeaderEffect,
      IconBearersEffect,
      MusiciansEffect,
      BarbarianHordesEffect,
      DarkwoodShieldEffect,
      {
        name: `Feigned Flight`,
        desc: `This unit can shoot and charge even if it retreated in the same turn.`,
        when: [MOVEMENT_PHASE, SHOOTING_PHASE, CHARGE_PHASE],
      },
    ],
  },
  'Chaos Chariots': {
    effects: [ChaosMarkAll, ExaltedCharioteerEffect, ...ChaosChariotEffects],
  },
  'Idolator Lord on Chaos Chariot': {
    mandatory: {
      prayers: [
        keyPicker(Prayers, [
          'Blessings of Khorne',
          'Blessings of Tzeentch',
          'Blessings of Nurgle',
          'Blessings of Slaanesh',
          'Blessings of Chaos Undivided',
        ]),
      ],
    },
    effects: [ChaosMarkAll, ExaltedCharioteerEffect, ...ChaosChariotEffects],
  },
  'Gorebeast Chariots': {
    effects: [ChaosMarkAll, ExaltedCharioteerEffect, ...GorebeastChariotEffects],
  },
  'Idolator Lord on Gorebeast Chariot': {
    mandatory: {
      prayers: [
        keyPicker(Prayers, [
          'Blessings of Khorne',
          'Blessings of Tzeentch',
          'Blessings of Nurgle',
          'Blessings of Slaanesh',
          'Blessings of Chaos Undivided',
        ]),
      ],
    },
    effects: [ChaosMarkAll, ExaltedCharioteerEffect, ...GorebeastChariotEffects],
  },
  'Chaos Warriors': {
    effects: [
      ChaosMarkAll,
      UnitLeaderEffect,
      StandardBearersEffect,
      MusiciansEffect,
      ChaosRuneshieldEffect,
      {
        name: `Legions of Chaos`,
        desc: `Add 1 to save rolls for attacks that target this unit while it has at least 10 models.`,
        when: [SAVES_PHASE],
        rule_sources: [rule_sources.BATTLETOME_SLAVES_TO_DARKNESS, rule_sources.ERRATA_JULY_2021],
      },
      {
        name: `Pair of Chaos Hand Weapons`,
        desc: `You can reroll hit rolls if equipped with a pair of Chaos Hand Weapons.`,
        when: [COMBAT_PHASE],
      },
    ],
  },
  'Chaos Chosen': {
    effects: [
      ChaosMarkAll,
      UnitLeaderEffect,
      IconBearersEffect,
      MusiciansEffect,
      DaemonforgedWeaponEffect,
      {
        name: `Slaughter-leaders`,
        desc: `If a model from this unit slays an enemy model, you can reroll failed wound rolls for other friendly Slaves to Darkness units wholly within 12" any friendly unit with this ability until your next hero phase.`,
        when: [COMBAT_PHASE],
      },
    ],
  },
  'Chaos Knights': {
    effects: [
      ChaosMarkAll,
      UnitLeaderEffect,
      StandardBearersEffect,
      MusiciansEffect,
      ChaosRuneshieldEffect,
      {
        name: `Impaling Charge`,
        desc: `Add 1 to the damage characteristic and improve the rend characteristic by 2 of this unit's Cursed Lances if it made a charge move this turn.`,
        when: [CHARGE_PHASE, COMBAT_PHASE],
      },
      {
        name: `Terrifying Champions`,
        desc: `Subtract 1 from the Bravery of any enemy units within 3" of any Chaos Knights.`,
        when: [BATTLESHOCK_PHASE],
      },
    ],
  },
  'Chaos Warshrine': {
    mandatory: {
      prayers: [keyPicker(Prayers, ['Favour of the Ruinous Powers'])],
    },
    effects: [
      ChaosMarkAll,
      {
        name: `Protection of the Dark Gods`,
        desc: `Friendly MORTAL SLAVES TO DARKNESS units that are wholly within range of this unit's Protection of the Dark Gods ability, as shown on the damage table above, have a ward of 6+`,
        when: [WARDS_PHASE],
        rule_sources: [rule_sources.BATTLETOME_SLAVES_TO_DARKNESS, rule_sources.ERRATA_JULY_2021],
      },
    ],
  },
  'Chaos Spawn': {
    effects: [
      ChaosMarkAll,
      {
        name: `Writhing Tentacles`,
        desc: `If you roll a double when determining the number of attacks made by a Chaos Spawn's Freakish Mutations, add 1 to hit and wound rolls for attacks made by that model until the end of the phase.`,
        when: [COMBAT_PHASE],
      },
    ],
  },
  'Chaos War Mammoth': {
    effects: [
      ChaosMarkGod,
      {
        name: `Crushing Fall`,
        desc: `If this model is slain, before this model is removed from play, the players must roll off. The player who wins the roll-off picks a point on the battlefield 4" from this model. Each unit within 3" of that point suffers D6 mortal wounds. This model is then removed from play.`,
        when: [WOUND_ALLOCATION_PHASE],
      },
      {
        name: `Earth-shaking charge`,
        desc: `Subtract 2 from the Bravery characteristic of enemy units while they are within 3" of this model if this model made a charge move in the same turn.`,
        when: [CHARGE_PHASE, COMBAT_PHASE, BATTLESHOCK_PHASE],
      },
      {
        name: `Goring Tusks`,
        desc: `Roll a number of dice equal to the Goring Tusks value shown on the damage table. Add 1 to each roll if the target unit is a MONSTER. For each 4+, the target unit suffers D3 mortal wounds.`,
        when: [COMBAT_PHASE],
      },
    ],
  },
  "Curs'd Ettin": {
    effects: [
      {
        name: `Cannibal Feast`,
        desc: `If any enemy models were slain by wounds inflicted by this model's attacks in that combat phase, you can heal up to D3 wounds allocated to this model.`,
        when: [END_OF_COMBAT_PHASE],
      },
      {
        name: `Gibbering Curse`,
        desc: `Roll 2D6 for each enemy unit within 3" of this model. If the roll is more than that unit's bravery characteristic, that unit suffers D3 mortal wounds.`,
        when: [START_OF_HERO_PHASE],
      },
      {
        name: `Two-headed Horror`,
        desc: `You can pick 1 enemy model that has a wounds characteristic of 2 or less and that is within 3" of this model, and roll a D6. On a 6, that model is slain.`,
        when: [START_OF_COMBAT_PHASE],
      },
    ],
  },
  Furies: {
    effects: [
      {
        name: `Sneaky Little Devils`,
        desc: `When selected for activation instead of fighting you may make a normal move and retreat. If you do so, this unit must retreat.`,
        when: [COMBAT_PHASE],
        rule_sources: [rule_sources.BATTLETOME_SLAVES_TO_DARKNESS, rule_sources.ERRATA_JULY_2021],
      },
    ],
  },
  Raptoryx: {
    effects: [
      {
        name: `Crazed Flock`,
        desc: `Add 1 to the attacks characteristic of this unit's melee weapons if it made a charge move this turn.`,
        when: [CHARGE_PHASE, COMBAT_PHASE],
      },
    ],
  },
  'Splintered Fang': {
    effects: [
      {
        name: `Trueblood`,
        desc: `Trueblood models add 1 to the attacks characteristic of their melee weapons.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Serpents`,
        desc: `Serpents models have a wounds characteristic of 2.`,
        when: [WOUND_ALLOCATION_PHASE],
      },
      {
        name: `One Cut, One Kill`,
        desc: `If the unmodified hit roll for an attack made by this unit is 6, the attack inflicts 1 mortal wound and the attack seqeunce ends.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Snake Charmer`,
        desc: `You can return 1 slain Serpents model to this unit if it includes any Serpent Callers. Set up the returning model within 1" of another model in this unit. It can only be set up within 3" of an enemy unit if this unit is already within 3" of that enemy.`,
        when: [HERO_PHASE],
      },
    ],
  },
  'Corvus Cabal': {
    effects: [
      {
        name: `Shadow Piercer`,
        desc: `Add 1 to the attacks characteristic of a Shadow Piercer's melee weapons.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Shrike Talon`,
        desc: `You can reroll 1s in charge rolls made for this unit while it includes any Shrike Talons.`,
        when: [CHARGE_PHASE],
      },
      {
        name: `Death From Above`,
        desc: `When this unit makes a move, it can pass across terrain features as though it can fly.`,
        when: [MOVEMENT_PHASE, CHARGE_PHASE, COMBAT_PHASE],
      },
    ],
  },
  'The Unmade': {
    effects: [
      {
        name: `Joyous One`,
        desc: `Add 1 to the attacks characteristic of a Joyous One's melee weapons.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Frozen in Fear`,
        desc: `Subtract 1 from the bravery characteristic of enemy units while they are within 6" of any friendly units with this ability.`,
        when: [DURING_GAME],
      },
      {
        name: `Frozen in Fear`,
        desc: `Enemy units within 3" of this unit cannot retreat.`,
        when: [MOVEMENT_PHASE],
      },
    ],
  },
  'Cypher Lords': {
    effects: [
      {
        name: `Luminate`,
        desc: `Add 1 to charge rolls for this unit while it includes any Luminates.`,
        when: [CHARGE_PHASE],
      },
      {
        name: `Shattered Gloom Globe`,
        desc: `While this unit includes any Thrallmasters, you can pick 1 enemy unit within 3" of this unit and roll a D6. On a 4+, subtract 1 from hit rolls for that unit until your next hero phase. The same unit cannot be affected by this ability more than once per turn.`,
        when: [START_OF_COMBAT_PHASE],
      },
    ],
  },
  'Iron Golems': {
    effects: [
      {
        name: `Dominar`,
        desc: `Add 1 to the Attacks characteristic of a Dominar's melee weapons.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Signifer`,
        desc: `Add 2 to the Bravery characteristic of this unit while it includes any Signifers.`,
        when: [BATTLESHOCK_PHASE],
      },
      {
        name: `Ogor Breacher`,
        desc: `Ogor Breachers have a Wounds characteristic of 3.`,
        when: [WOUND_ALLOCATION_PHASE],
      },
      {
        name: `Iron Resilience`,
        desc: `Add 1 to save rolls for attacks that target this unit if this unit has not made a normal move or been set up in the same turn.`,
        when: [SAVES_PHASE],
        rule_sources: [rule_sources.BATTLETOME_SLAVES_TO_DARKNESS, rule_sources.ERRATA_JULY_2021],
      },
    ],
  },
  'Untamed Beasts': {
    effects: [
      {
        name: `Heart-eater`,
        desc: `Add 1 to the Attacks characteristic of a Heart-eater's melee weapons.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Rocktusk Prowlers`,
        desc: `Rocktusk Prowlers have a Wounds characteristic of 2.`,
        when: [WOUND_ALLOCATION_PHASE],
      },
      {
        name: `Unleash the Beast`,
        desc: `This unit can run and still charge later in the same turn.`,
        when: [MOVEMENT_PHASE, CHARGE_PHASE],
      },
      {
        name: `Unleash the Beast`,
        desc: `After armies are set up but before the first battle round begins, this unit can move up to 6".`,
        when: [END_OF_SETUP],
      },
    ],
  },
  "Be'Lakor": {
    mandatory: {
      spells: [keyPicker(Spells, ['Enfeeble Foe'])],
    },
    effects: [
      {
        name: `Shadow Form`,
        desc: `Ignore positive and negative modifiers when making save rolls for this model.`,
        when: [SAVES_PHASE],
      },
      {
        name: `The Dark Master`,
        desc: `Once per battle, pick 1 enemy unit on the battlefield. Starting now and until your next hero phase, roll a D6 at the start of each phase. On a 3+ the target cannot move, shoot, fight, use command abilities, chant prayers, or cast/dispell/unbind spells in that phase.`,
        when: [START_OF_HERO_PHASE],
      },
      {
        name: `The Dark Master`,
        desc: `If active, roll a D6 to trigger the Dark Master effects.`,
        when: [
          START_OF_MOVEMENT_PHASE,
          START_OF_SHOOTING_PHASE,
          START_OF_CHARGE_PHASE,
          START_OF_COMBAT_PHASE,
          START_OF_BATTLESHOCK_PHASE,
        ],
      },
      {
        name: `Lord of Torment`,
        desc: `If an enemy unit within 12" fails a battleshock test, this model heals D3 wounds currently allocated to it.`,
        when: [BATTLESHOCK_PHASE],
      },
      {
        name: `Wizard`,
        desc: `This model is a WIZARD. Can attempt to cast 2 spells and attempt to unbind 2 spells. Knows Arcane Bolt, Mystic Shield, and Enfeeble Foe.`,
        when: [HERO_PHASE],
      },
    ],
  },
  'Soul Grinder': {
    effects: [
      ChaosMarkAll,
      {
        name: `Hellforged Claw`,
        desc: `If the unmodified hit roll for an attack made with a Hellforged Claw is 6, that attack inflicts D6 mortal wounds on the target and the attack sequence ends.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Implacable Advance`,
        desc: `A Soul Grinder can shoot even if it ran in the movement phase.`,
        when: [MOVEMENT_PHASE, SHOOTING_PHASE],
      },
    ],
  },
  'Mutalith Vortex Beast': {
    effects: [
      ChaosMarkTzeentch,
      {
        name: `Mutant Regeneration`,
        desc: `You can heal D3 wounds in each of your hero phases.`,
        when: [HERO_PHASE],
      },
      {
        name: `Aura of Mutation`,
        desc: `You can pick a unit within 18". Roll a D6 and consult the chart below:

        1: Hideous Disfigurements: Subtract 1 from the bravery characteristic of the unit for the rest of the battle.

        2: Troggbrains: Subtract 1 from the run rolls made for the unit for the rest of the battle.

        3: Gift of Mutations: Subtract 1" from the move characteristic of the unit for the rest of the battle.

        4: Tide of Transmogrification: The unit sufers D3 mortal wounds.

        5: Maelstrom of Change: The unit suffers D6 mortal wounds.

        6: Spawnchange: The unit suffers D6 mortal wounds. For each model that is slain as a result, you can set up a Slaves to Darkness Chaos Spawn (Tzeentch marked) within 3" of the target unit. If you do not add a Chaos spawn to your army, you can heal D3 wounds allocated to this model instead.`,
        when: [HERO_PHASE],
      },
    ],
  },
  Slaughterbrute: {
    effects: [
      ChaosMarkKhorne,
      {
        name: `Sigils of Enslavement`,
        desc: `When you set up a Slaughterbrute, you can pick 1 friendly Slaves to Darkness HERO in your army to be its master (a hero cannot be the master of more than one Slaughterbrute).`,
        when: [DURING_SETUP],
      },
      {
        name: `Sigils of Enslavement`,
        desc: `Add 1 to the hit rolls for attacks made by this model while it is wholly within 12" of its master.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Beast Unbound`,
        desc: `If this model is within 6" of an enemy unit and more than 12" from its master you must roll a D6. On a 4+ the closest other unit within 6" of this model immediately suffers D3 mortal wounds.`,
        when: [START_OF_CHARGE_PHASE],
      },
    ],
  },
  'Fomoroid Crusher': {
    effects: [
      {
        name: `Rampage`,
        desc: `After this model makes a charge move, you can pick 1 enemy unit within 1" of this model and roll a number of dice equal to the charge move. For each 6, that unit suffers 1 mortal wound.`,
        when: [CHARGE_PHASE],
      },
      {
        name: `Insurmountable Strength`,
        desc: `In your hero phase, pick 1 terrain feature within 6" of this model and roll a D6 for each other unit within 6" of that terrain feature. On a 3+, that unit suffers D3 mortal wounds.`,
        when: [HERO_PHASE],
      },
    ],
  },
  'Mindstealer Sphiranx': {
    effects: [
      {
        name: `Telepathic Dread`,
        desc: `Subtract 2 from the bravery characteristic of enemy units while they are within 12" of any friendly models with this ability.`,
        when: [DURING_GAME],
      },
      {
        name: `Dominate Mind`,
        desc: `In your hero phase, you can pick 1 enemy unit within 12" of this model and visible. You and your opponent secretly place a dice so that is shows any number, then reveal them. If the numbers equal this ability has no effect. Otherwise the enemy unit selected fights at the end of the combat phase until the next battle round. You cannot select the same unit as the target more than once in the same turn regardless of if the effect worked or not.`,
        when: [HERO_PHASE],
      },
    ],
  },
  'Ogroid Myrmidon': {
    mandatory: {
      command_abilities: [keyPicker(CommandAbilities, ['Pit Marshal'])],
    },
    effects: [
      {
        name: `Arcane Fury`,
        desc: `If the unmodified hit roll for a melee attack by this model is a 6, that attack scores 2 hits on the target instead of 1. Make a wound and save roll for each hit.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Berserk Rage`,
        desc: `You can reroll hit and wound rolls for melee attacks made by this model if any wounds or mortal wounds were allocated to this model earlier in the same phase.`,
        when: [COMBAT_PHASE],
      },
    ],
  },
  'Spire Tyrants': {
    effects: [
      {
        name: `Pit Champion / Bestigor Destroyer`,
        desc: `Add 2 to the attacks characteristic of any Pit Champion's and Bestigor Destroyer's melee weapons.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Headclaimer`,
        desc: `Add 1 to the damage characteristic of any Headclaimer's melee weapons.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Pit Fighters`,
        desc: `You can add 1 to hit rolls for attacks made by this unit if it charged in the same turn.`,
        when: [CHARGE_PHASE, COMBAT_PHASE],
      },
    ],
  },
  'Scions of the Flame': {
    effects: [
      {
        name: `Blazing Lord / Immolator`,
        desc: `Add 1 to the attacks characteristic of any Blazing Lord's or Immolator's melee weapons.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Brazen Champion`,
        desc: `This model has a wounds characteristic of 2.`,
        when: [WOUND_ALLOCATION_PHASE],
      },
      {
        name: `Inferno Priest`,
        desc: `If this model is present in the unit, you may reroll hits of 1 for the unit's Flameburst Pots.`,
        when: [SHOOTING_PHASE],
      },
      {
        name: `All Shall Burn`,
        desc: `Unmodified hits of 6 made with this unit's missile weapons score 2 hits instead of 1. Make a wound/save roll for each hit.`,
        when: [SHOOTING_PHASE],
      },
    ],
  },
  "Khagra's Ravagers": {
    effects: [
      ChaosRuneshieldEffect,
      {
        name: `Magic`,
        desc: `Zarshia Bittersoul model is a WIZARD. Can attempt to cast 1 spell and unbind 1 spell. Knows Arcane Bolt and Mystic Shield.`,
        when: [HERO_PHASE],
      },
    ],
  },
  'Centaurion Marshal': {
    effects: [
      {
        name: `Skewer, Drag and Bludgeon`,
        desc: `Each time this unit fights, make the attacks with its Mauling Spear first. Until the end of the phase, add 1 to the Attacks characteristic of its Skull Bludgeon and Varanspire Gladius for each successful hit scored by attacks made with its Mauling Spear.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Gladiator's Net`,
        desc: `At the start of each combat phase, you can pick 1 enemy unit within 1" of this unit and roll a dice. On a 6+, the strike-last effect applies to that enemy unit until the end of the phase. This ability has no effect on enemy units that are Monsters or have more than 5 models.`,
        when: [START_OF_COMBAT_PHASE],
      },
      {
        name: `Marshal of the Legions`,
        desc: `If this unit issues the Rally command (core rules, 7.2) and an Undivided Mortal unit receives it, you can return 1 slain model to the unit that receives the command for each 5+ instead of each 6.`,
        when: [START_OF_HERO_PHASE],
      },
    ],
  },
  'Chaos Legionnaires': {
    effects: [
      {
        name: `Decuriarch`,
        desc: `1 in every 8 models in this unit must be a Decuriarch. Add 1 to the Attacks characteristic of that model's melee weapons. In addition, Decuriarchs can issue commands to their own unit.`,
        when: [DURING_GAME, COMBAT_PHASE],
      },
      {
        name: `Mutandor`,
        desc: `1 in every 8 models in this unit must be a Mutandor. Add 1 to the Attacks characteristic of that model's melee weapons.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Hornhelms`,
        desc: `3 in every 8 models in this unit must be a Hornhelm. Add 1 to the Damage characteristic of those models' melee weapons.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Sow Confusion`,
        desc: `Once per turn, at the start of any phase, you can say this unit will sow confusion. If you do so, pick an enemy unit within 6" of this unit and roll a dice. On a 4+, that unit cannot issue or receive commands in that phase. You cannot pick the same unit as the target for this ability more than once in the same phase.`,
        when: [DURING_GAME],
      },
      {
        name: `Devoted of the Dark Creed`,
        desc: `Add 1 to wound rolls for attacks made by this unit while it is wholly within 12" of a friendly Be'lakor.`,
        when: [COMBAT_PHASE],
      },
    ],
  },
  'Horns of Hashut': {
    effects: [
      {
        name: `Ruinator Alpha`,
        desc: `1 in every 10 models in this unit must be a Ruinator Alpha. Add 1 to the Attacks characteristic of that model's melee weapons. In addition, Ruinator Alphas can issue commands to their own unit.`,
        when: [DURING_GAME, COMBAT_PHASE],
      },
      {
        name: `Ruinator`,
        desc: `1 in every 8 models in this unit must be a Ruinator. Add 1 to the Attacks characteristic of that model's melee weapons.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Demolisher with Flamehurler`,
        desc: `1 in every 10 models in this unit must be a Demolisher with Flamehurler. A Demolisher with Flamehurler is armed with a Flamehurler and Forge Weapons.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Torrent of Flames`,
        desc: `The Attacks characteristic of a Flamehurler is equal to the number of models in the target unit (to a maximum Attacks characteristic of 8).`,
        when: [SHOOTING_PHASE],
      },
      {
        name: `Stampede of Iron`,
        desc: `After this unit makes a charge move, you can pick 1 enemy unit within 1" of this unit and roll 1 dice for each model in this unit. For each 6, that enemy unit suffers 1 mortal wound.`,
        when: [CHARGE_PHASE],
      },
    ],
  },
}

export default tagAs(Units, 'unit')
