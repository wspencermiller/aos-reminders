import { tagAs } from 'factions/metatagger'
import {
  BATTLESHOCK_PHASE,
  CHARGE_PHASE,
  COMBAT_PHASE,
  DURING_GAME,
  END_OF_CHARGE_PHASE,
  END_OF_MOVEMENT_PHASE,
  END_OF_TURN,
  HERO_PHASE,
  MOVEMENT_PHASE,
  START_OF_CHARGE_PHASE,
  START_OF_COMBAT_PHASE,
  START_OF_HERO_PHASE,
} from 'types/phases'
import rule_sources from './rule_sources'

const CommandAbilities = {
  'By My Will': {
    effects: [
      {
        name: `By My Will`,
        desc: `This is a command ability that this unit can issue at the start of the combat phase. Another friendly CHAOS unit must receive it (this unit cannot issue this command to itself). Until the end of that phase, each time a model in the receiving unit is slain, it can fight.`,
        when: [START_OF_COMBAT_PHASE],
        rule_sources: [rule_sources.BATTLETOME_SLAVES_TO_DARKNESS, rule_sources.ERRATA_DECEMBER_2021],
      },
    ],
  },
  'Bloodslick Ground': {
    effects: [
      {
        name: `Bloodslick Ground`,
        desc: `Until your next hero phase, run and charge rolls made for enemy units within 18" of this model are halved. You cannot use this command ability more than once per turn.`,
        when: [HERO_PHASE],
      },
      {
        name: `Bloodslick Ground`,
        desc: `If active, run and charge rolls made for enemy units within 18" of this model are halved.`,
        when: [MOVEMENT_PHASE, CHARGE_PHASE],
      },
    ],
  },
  'Arcane Influence': {
    effects: [
      {
        name: `Arcane Influence`,
        desc: `Pick 1 friendly SLAVES TO DARKNESS wizard wholly within 12" of this model and add 1 to its casting rolls until the end of the phase.`,
        when: [START_OF_HERO_PHASE],
      },
    ],
  },
  'Bloated Blessings': {
    effects: [
      {
        name: `Bloated Blessings`,
        desc: `Pick 1 friendly SLAVES TO DARKNESS Nurgle unit wholly within 12" of this model. Until your next hero phase, each time that unit is picked as the target for any attacks made with melee weapons, if the unmodified hit roll for any of those attacks is 6, the attacking unit suffers D3 mortal wounds after all of its attacks have been resolved. The same unit cannot benefit from this ability more than once per phase.`,
        when: [START_OF_HERO_PHASE],
        rule_sources: [rule_sources.BATTLETOME_SLAVES_TO_DARKNESS, rule_sources.ERRATA_JULY_2021],
      },
    ],
  },
  'Revel in Agony': {
    effects: [
      {
        name: `Revel in Agony`,
        desc: `Until your next hero phase, if any models from a friendly SLAVES TO DARKNESS Slaanesh unit wholly within 12" of this model are slain by an enemy melee weapon, add 1 to hits rolls for attacks made by that friendly unit. You cannot use this command ability more than once per turn.`,
        when: [START_OF_COMBAT_PHASE],
      },
    ],
  },
  'Iron-willed Overlord': {
    effects: [
      {
        name: `Iron-willed Overlord`,
        desc: `Select a friendly Chaos Warriors unit within 18". Until your next hero phase you can reroll charge rolls and battleshock tests for that unit.`,
        when: [HERO_PHASE],
      },
    ],
  },
  'The Knights of Chaos': {
    effects: [
      {
        name: `The Knights of Chaos`,
        desc: `Select a friendly unit of Chaos Knights, Chaos Chariots, or Gorebeast Chariots within 18". Until your next hero phase you can reroll charge rolls and add 1 to any hit rolls for that unit in the combat phase. The same unit cannot benefit from this more than once per turn.`,
        when: [HERO_PHASE],
      },
      {
        name: `The Knights of Chaos`,
        desc: `If active, you can reroll charge rolls for the buffed unit.`,
        when: [CHARGE_PHASE],
      },
      {
        name: `The Knights of Chaos`,
        desc: `If active, you can add 1 to the hit rolls for the buffed unit.`,
        when: [COMBAT_PHASE],
      },
    ],
  },
  'Spurred by the Gods': {
    effects: [
      {
        name: `Spurred by the Gods`,
        desc: `Pick 1 friendly mortal SLAVES TO DARKNESS unit wholly within 12". That unit may be selected to fight for a second time in this phase if it is within 3" of any enemy units. The same unit cannot benefit from this more than once per turn.`,
        when: [START_OF_COMBAT_PHASE],
      },
    ],
  },
  'Will of the Gods': {
    effects: [
      {
        name: `Will of the Gods`,
        desc: `Add 3 to charge rolls for friendly Chaos Marauders and Cultists units wholly within 12" of this model when the charge roll is made. A unit cannot benefit from this more than once per phase.`,
        when: [START_OF_CHARGE_PHASE],
      },
    ],
  },
  'Last Gasp of Glory': {
    effects: [
      {
        name: `Last Gasp of Glory`,
        desc: `Friendly Chaos Marauders and Cultists models that are slain within 12" of this model that have not yet fought in this phase can fight before being removed from play. The same unit cannot benefit from this ability more than once per turn.`,
        when: [START_OF_COMBAT_PHASE],
      },
    ],
  },
  'Pit Marshal': {
    effects: [
      {
        name: `Pit Marshal`,
        desc: `Pick 1 friendly Cultists unit wholly within 12" of a friendly model with this command ability. Do not take battleshock tests for that unit until the start of your next hero phase.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Pit Marshal`,
        desc: `If active, do not take battleshock tests for the buffed unit.`,
        when: [BATTLESHOCK_PHASE],
      },
    ],
  },
  // Ravagers
  'Rally the Tribes': {
    effects: [
      {
        name: `Rally the Tribes`,
        desc: `Pick the model that is currently your general (the same model cannot be picked more than once per battle). Summon 1 unit of 10 Chaos Marauders, 1 unit of 5 Chaos Marauder Horsemen, or 1 Cultists unit of up to 10 models to the battlefield. The summoned unit must be wholly within 6" of the edge of the battlefield and more than 9" from enemy units.`,
        when: [END_OF_MOVEMENT_PHASE],
      },
    ],
  },
  // Host of the Everchosen
  'Dark Prophecy': {
    effects: [
      {
        name: `Dark Prophecy`,
        desc: `You can use this command ability once per turn at the start of your hero phase if ARCHAON is on the battlefield. If you do so, roll a dice and keep the result hidden from your opponent beneath an opaque container, such as a cup. At the start of the next battle round, before players determine who has the first turn, you must reveal the result. On a 1-3 your opponent must take the first turn of that battle round. On a 4-6 you must take the first turn of that battle round.`,
        when: [START_OF_HERO_PHASE],
        rule_sources: [rule_sources.BATTLETOME_SLAVES_TO_DARKNESS, rule_sources.ERRATA_JULY_2021],
      },
    ],
  },
  // Knights of the Empty Throne
  'Unmatched Conquerors': {
    effects: [
      {
        name: `Unmatched Conquerors`,
        desc: `Pick 1 enemy unit controlling an objective within 12" of a friendly Knights of the Empty Throne HERO. Roll a number of dice equal to the number of models in the target. For each 3+, until the end of the battle round, the number of models in that unit counted towards the objective control is reduced by 1. A unit cannot be affected by this more than once per turn.`,
        when: [END_OF_CHARGE_PHASE],
      },
      {
        name: `Unmatched Conquerors`,
        desc: `If active, reduce the debuffed unit's total model count by the rolled value when determining control.`,
        when: [END_OF_TURN],
      },
    ],
  },
  'Failure is Not an Option': {
    effects: [
      {
        name: `Failure is Not an Option`,
        desc: `You may use this ability when a friendly Knights of the Empty Throne Varanguard unit is destroyed. Roll a D6 and on a 5+ a new Varanguard unit of 3 models is added to your army. Set this unit up wholly within 6" of the battlefield edge and more than 9" from any enemy units. You cannot use this command ability more than once per phase.`,
        when: [DURING_GAME],
      },
    ],
  },
  // IDOLATORS
  Desecrate: {
    effects: [
      {
        name: `Desecrate`,
        desc: `Pick 1 friendly IDOLATORS unit wholly within 12" of a friendly Idolator Lord and within 3" of a terrain feature. Roll a D6. If the roll is greater than the number of enemy models within 3" of ther terrain, the terrain becomes Descrated (deactivating the terrain feature's rules).`,
        when: [HERO_PHASE],
      },
    ],
  },
}

export default tagAs(CommandAbilities, 'command_ability')
