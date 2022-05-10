import React, { useEffect, useState } from 'react'
import { getNextSortStatus } from './utils'

export default function TableController(params = {}) {
  const { data = [], defaultSort } = params;
  const [tableData, setTableData] = useState(data)
  const [sortCriteria, setSortCriteria] = useState(defaultSort || { field: '', isAsc: undefined })

  // handle default sort
  useEffect(() => {
    defaultSort && onSort((defaultSort && { key: defaultSort?.field, isAsc: defaultSort?.isAsc }) || { field: '', isAsc: undefined })
  }, [defaultSort])

  const onSort = (currentField) => {
    const { field, isAsc } = sortCriteria
    const { key, isSortable } = currentField // key is field id
    const isSameField = field === currentField.key

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
