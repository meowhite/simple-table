import ArrowDown from "./icons/ArrowDown"
import ArrowUp from "./icons/ArrowUp"

const descStatus = [true, false, undefined]
export const getNextSortStatus = (currentStatus = undefined) =>
  currentStatus === undefined ? descStatus[0] : descStatus[descStatus.indexOf(currentStatus) + 1]


export const getSortIcon = (currentStatus = undefined) => currentStatus === undefined ? '' : (currentStatus ? <ArrowUp /> : <ArrowDown />)