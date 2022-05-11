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
   * [{key: 'name', value: 'cee'},{key: 'email', value: 'hello'}, ] // search
   * or
   * [{ key: 'name', value: 'as' },{ key: '_id', value: ['1', '3'] }]  // multi or single select 
   * or
   * [{ key: 'name', value: 'as' },{ key: 'price', value: {from: 3, to: 6} }] // min - max
   */
  // https://replit.com/@hungdev/ReliableEvergreenArraylist#index.js:1:6
  const onFilter = (filterCondition) => {
    const filterData = data.filter(ele =>
      filterCondition.find(con => {
        if (Array.isArray(con?.value)) { // multi or single select 
          return con?.value?.includes(ele[con?.key]) // is select option, the value in option must be same with value in table data
        }
        if (con?.value?.hasOwnProperty('from')) { // min - max
          return Number(ele[con.key]) >= Number(con.value.from) && Number(ele[con.key]) <= Number(con.value.to)
        }
        if (typeof con?.value === 'string') { // search
          return ele[con?.key]?.includes(con?.value)
        }
        return false
      }))

    setTableData(filterData)
  }

  /**
   * Search whole field in table
   */
  const onSearch = (searchValue) => {
    const searchFields = data?.filter(row => Object.entries(row).some(entry => String(entry[1]).toLowerCase().includes(searchValue)))
    setTableData(searchValue ? searchFields : data)
  }




  return ({ sortCriteria, tableData, onSort, onSearch, onFilter })
}
