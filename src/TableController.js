import React, { useEffect, useState } from 'react'
import { getNextSortStatus } from './utils'

export default function TableController(params = {}) {
  const { data = [], defaultSort } = params;
  const [tableData, setTableData] = useState(data)
  const [sortCriteria, setSortCriteria] = useState(defaultSort || { field: '', isAsc: undefined })

  console.log('tableData', tableData)

  // handle default sort
  useEffect(() => {
    if (!defaultSort?.field) return;
    onSort((defaultSort?.field && { key: defaultSort?.field, isAsc: defaultSort?.isAsc }) || { key: '', isAsc: undefined })
  }, [defaultSort])

  const onSort = (currentField) => {
    const { field, isAsc } = sortCriteria
    const { key, isSortable } = currentField // key is field id
    const isSameField = field === key

    let items = structuredClone(data)
    if (typeof getNextSortStatus(isAsc) === 'boolean' && isSameField) {
      getNextSortStatus(isAsc)
        ? items.sort((a, b) => (a[key] > b[key]) ? 1 : -1)
        : items.sort((a, b) => (a[key] > b[key]) ? -1 : 1)
    }
    if (!isSameField) {
      items.sort((a, b) => (a[key] > b[key]) ? 1 : -1)
    }
    setSortCriteria({ field: key, isAsc: isSameField ? getNextSortStatus(isAsc) : true })
    setTableData(items)
  }

  const onFilter = () => {
    // const filterFields = tableData?.filter(row => )
  }

  const onSearch = (searchValue) => {
    const searchFields = data?.filter(row => Object.entries(row).some(entry => String(entry[1]).toLowerCase().includes(searchValue)))
    setTableData(searchValue ? searchFields : data)
  }




  return ({ sortCriteria, tableData, onSort, onSearch })
}
