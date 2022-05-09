import React, { useState } from 'react'
import { getNextSortStatus } from './utils'

export default function TableController(params = {}) {
  const { data = [] } = params;
  const [tableData, setTableData] = useState(data)
  const [sortCriteria, setSortCriteria] = useState({ field: '', isAsc: undefined })

  const onSort = (currentField) => {
    const { field, isAsc } = sortCriteria
    const { key, isSortable } = currentField // key is field id
    const isSameField = field === currentField.key
    console.log('currentField', currentField)

    let items = structuredClone(data)
    if (typeof getNextSortStatus(isAsc) === 'boolean' && isSameField) {
      getNextSortStatus(isAsc)
        ? items.sort((a, b) => (a[key] > b[key]) ? 1 : -1)
        : items.sort((a, b) => (a[key] > b[key]) ? -1 : 1)
    }
    if (!isSameField) {
      items.sort((a, b) => (a[key] > b[key]) ? 1 : -1)
    }
    setSortCriteria({ field: currentField.key, isAsc: isSameField ? getNextSortStatus(isAsc) : true })
    setTableData(items)
  }





  return ({ sortCriteria, tableData, onSort })
}
