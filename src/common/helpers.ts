import { PRECISION } from './config'

export function toLocalDecimalNotation (x:number) {
  return x.toLocaleString(navigator.language, {maximumFractionDigits: PRECISION})
}

export function formatReadableDate (time:number) {
  const blockDate =  new Date(time * 1000)
  const day = blockDate.getDate()
  const month = blockDate.toLocaleString('default', { month: 'long' });
  const year = blockDate.getFullYear()
  const hours = blockDate.getHours()
  const tempMinutes = blockDate.getMinutes()
  const minutes = (tempMinutes < 10) ? `0${tempMinutes}` : tempMinutes

  return `${hours}:${minutes}, ${month} ${day}, ${year}`
}