import { camelCase, startCase } from 'lodash'
import { TTurnAction } from 'types/data'

export const titleCase = (val: string): string => startCase(camelCase(val))

export const stripPunctuation = (text: string): string => text.replace(/[.,/#!$%^&*;:{}=\-‑–—_`'"~()]/g, '')

export const generateUUID = () => {
  return [...Array(10)].map(i => (~~(Math.random() * 36)).toString(36)).join('')
}

export const hashCode = (str: string): string => {
  let hash = 0
  if (str.length === 0) return 'none'
  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return `${hash}`
}

export const getActionTitle = ({
  artifact,
  battalion,
  command_ability,
  command_trait,
  condition,
  endless_spell,
  grand_strategy,
  incarnate,
  monstrous_rampage,
  mount_trait,
  name,
  prayer,
  scenery,
  spell,
  triumph,
}: TTurnAction): string => {
  const joinedCond = condition.filter(x => x !== name).join(', ')
  const suffix = name === joinedCond || joinedCond === `` ? `` : `: ${joinedCond}`
  if (artifact) return `Artifact${suffix}`
  if (battalion) return `Battalion${suffix}`
  if (command_ability) return `Command Ability${suffix}`
  if (command_trait) return `Command Trait${suffix}`
  if (endless_spell) return `Endless Spell${suffix}`
  if (grand_strategy) return `Grand Strategy${suffix}`
  if (incarnate) return `Incarnate${suffix}`
  if (monstrous_rampage) return `Monstrous Rampage${suffix}`
  if (mount_trait) return `Mount Trait${suffix}`
  if (prayer) return `Prayer${suffix}`
  if (scenery) return `Scenery${suffix}`
  if (spell) return `Spell${suffix}`
  if (triumph) return `Triumph${suffix}`
  return joinedCond
}
