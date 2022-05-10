import ArrowDown from "./icons/ArrowDown"
import ArrowUp from "./icons/ArrowUp"

const descStatus = [true, false, undefined]
export const getNextSortStatus = (currentStatus = undefined) =>
  currentStatus === undefined ? descStatus[0] : descStatus[descStatus.indexOf(currentStatus) + 1]


export const getSortIcon = (currentStatus = undefined) => currentStatus === undefined ? '' : (currentStatus ? <ArrowUp /> : <ArrowDown />)

/**
 * 
 * @param {*} data : is data array
 * @param {*} fields : is array header field 
 * @returns : new data with field has key in header field
 */

export const dataFormatter = (data, fields) =>
  data.map((row, i) =>
    fields.reduce((acc, el) =>
      ({ ...acc, [el.key]: el?.customSearch?.(row) || row?.[el?.key] || '' }), {}))
