import React, { useEffect, useState } from 'react'
import { getNextSortStatus, handleSort, handleItemsToDisplay, handleFilter, handleSearch } from './utils'

export default function TableController(params = {}) {
  const { data = [], defaultSort, defaultPagination, defaultFilter } = params;
  const [tableData, setTableData] = useState(data)
  const [itemsToDisplay, setItemsToDisplay] = useState([]);
  const [pagination, setPagination] = useState(defaultPagination || { pageSize: 10, page: 1 })
  const [sortCriteria, setSortCriteria] = useState(defaultSort || { field: '', isAsc: undefined, prevData: tableData })
  const [filterCriteria, setFilterCriteria] = useState(defaultFilter || [])
  const [searchCriteria, setSearchCriteria] = useState({ value: '', prevData: tableData })

  useEffect(() => {
    setItemsToDisplay(() => handleItemsToDisplay(tableData, pagination?.page, pagination?.pageSize))
  }, [tableData, pagination])

  useEffect(() => {
    if (!sortCriteria.field) return;
    setTableData(allItems => handleSort(allItems, sortCriteria))
  }, [sortCriteria])

  useEffect(() => {
    if (!filterCriteria?.length) return;
    setTableData(allItems => handleFilter(allItems, filterCriteria))
  }, [filterCriteria])

  useEffect(() => {
    // if (!searchCriteria) return;
    setTableData(allItems => handleSearch(allItems, searchCriteria.value))
  }, [searchCriteria])


  const onSort = (currentField) => {
    const { key, isSortable } = currentField // key is field id
    setSortCriteria(prev => ({
      field: key,
      isAsc: sortCriteria?.field === key ? getNextSortStatus(sortCriteria?.isAsc) : true,
      prevData: prev?.isAsc === undefined ? tableData : prev.prevData // save default data before itself changed
    }))
  }

  /**
   * filterCondition:
   * [{key: 'name', value: 'cee'},{key: 'email', value: 'hello'}, ] // search
   * or
   * [{ key: 'name', value: 'as' },{ key: '_id', value: ['1', '3'] }]  // select 
   * or
   * [{ key: 'name', value: 'as' },{ key: 'price', value: {from: 3, to: 6} }] // min - max
   */
  // https://replit.com/@hungdev/ReliableEvergreenArraylist#index.js:1:6
  const onFilter = (filterCondition) => {
    setFilterCriteria(filterCondition)
  }

  /**
   * Search whole field in table
   */
  const onSearch = (searchValue) => {
    // setTableData(searchValue ? handleSearch(tableData, searchValue) : data)
    setSearchCriteria({ value: searchValue })
  }

  const handlePagination = (data) => { // { pageSize, page, totalItems }
    setPagination(data)
  }



  return ({ setTableData, sortCriteria, itemsToDisplay, tableData, onSearch, onFilter, onSort, handlePagination })
}
