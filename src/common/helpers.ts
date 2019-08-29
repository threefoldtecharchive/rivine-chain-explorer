import { PRECISION } from './config'

export function toLocalDecimalNotation (x:number) {
  return x.toLocaleString(navigator.language, {maximumFractionDigits: PRECISION})
}