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

  /**
   * filterCondition:
   * [{key: 'name', value: 'cee'},{key: 'email', value: 'hello'}, ]
   */
  // https://replit.com/@hungdev/ReliableEvergreenArraylist#index.js:1:6
  const onFilter = (filterCondition) => {
    const filterData = data.filter(ele => filterCondition.find(con => ele[con?.key]?.includes(con?.value)))
    setTableData(filterData)
  }

  /**
   * Search all field in table
   */
  const onSearch = (searchValue) => {
    const searchFields = data?.filter(row => Object.entries(row).some(entry => String(entry[1]).toLowerCase().includes(searchValue)))
    setTableData(searchValue ? searchFields : data)
  }




  return ({ sortCriteria, tableData, onSort, onSearch, onFilter })
}
