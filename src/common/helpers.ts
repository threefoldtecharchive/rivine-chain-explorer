import { PRECISION } from "./config";
import {
  BlockstakeOutputInfo, CoinOutputInfo, ConditionType,
  UnlockhashCondition, AtomicSwapCondition, TimelockCondition, Condition, MultisignatureCondition
} from 'rivine-ts-types';

export function toLocalDecimalNotation(x: number) {
  if (!x) return;
  return x.toLocaleString(navigator.language, {
    maximumFractionDigits: PRECISION
  });
}

export function formatReadableDate(time: number) {
  const blockDate = new Date(time * 1000);
  const day = blockDate.getDate();
  const month = blockDate.toLocaleString("default", { month: "long" });
  const year = blockDate.getFullYear();
  const hours = blockDate.getHours();
  const tempMinutes = blockDate.getMinutes();
  const minutes = tempMinutes < 10 ? `0${tempMinutes}` : tempMinutes;

  return `${hours}:${minutes}, ${month} ${day}, ${year}`;
}

export function formatReadableDateForCharts(time: number) {
  const blockDate = new Date(time * 1000);
  return blockDate;
}

export function getUnlockhashFromCondition (condition: Condition): string {
  switch (condition.getConditionType()) {
    case ConditionType.NilCondition:
      return "";
    case ConditionType.UnlockhashCondition:
      const uhCondition = condition as UnlockhashCondition
      return uhCondition.unlockhash;
    case ConditionType.AtomicSwapCondition:
      const atCondition = condition as AtomicSwapCondition
      return atCondition.receiver;
    case ConditionType.TimelockCondition:
      const tmCondition = condition as TimelockCondition
      return getUnlockhashFromCondition(tmCondition)
    case ConditionType.MultisignatureCondition:
      const msCondition = condition as MultisignatureCondition
      return msCondition.unlockhashes.join(',');
    default:
      return "";
  }
}

export function getUnlockHash (outputInfo: BlockstakeOutputInfo | CoinOutputInfo): string {
  if (outputInfo.output.isBlockCreatorReward) {
    if (outputInfo.output.unlockhash) {
      return outputInfo.output.unlockhash
    }
  } else {
    if (outputInfo.output.condition) {
      return getUnlockhashFromCondition(outputInfo.output.condition);
    }
  }
  return ""
}