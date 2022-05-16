import React, { useEffect, useState } from 'react';
import {
  dataChaining,
  getNextSortStatus,
  handleSort,
  handleItemsToDisplay,
  handleFilter,
  handleSearch,
  dataFieldFormatter,
  getVisibleFields
} from './utils';

export default function TableController(params = {}) {
  const { data = [], fields, defaultSort, defaultPagination, defaultFilter } = params;
  const [visibleFields, setVisibleFields] = useState(fields?.filter(e => !e.isInvisible));
  const [tableData, setTableData] = useState(dataFieldFormatter(data, visibleFields));
  const [itemsToDisplay, setItemsToDisplay] = useState([]);
  const [pagination, setPagination] = useState(defaultPagination || { pageSize: 10, page: 1 });
  const [sortCriteria, setSortCriteria] = useState(defaultSort || { field: '', isAsc: undefined, });
  const [filterCriteria, setFilterCriteria] = useState(defaultFilter || []);
  const [searchCriteria, setSearchCriteria] = useState('');


  useEffect(() => {
    setTableData(data);
  }, [data]);

  useEffect(() => {
    setItemsToDisplay(() => handleItemsToDisplay(tableData, pagination?.page, pagination?.pageSize));
  }, [tableData, pagination]);

  useEffect(() => {
    const baseData = dataChaining(data).onFilter(filterCriteria).onSearch(searchCriteria).valueOf();
    setTableData(handleSort(baseData, sortCriteria));
  }, [sortCriteria]);

  useEffect(() => {
    const baseData = dataChaining(data).onSort(sortCriteria).onSearch(searchCriteria).valueOf();
    setTableData(handleFilter(baseData, filterCriteria));
  }, [filterCriteria]);

  useEffect(() => {
    const baseData = dataChaining(data).onFilter(filterCriteria).onSort(sortCriteria).valueOf();
    setTableData(handleSearch(baseData, searchCriteria));
  }, [searchCriteria]);


  const onSort = (currentField) => {
    const { key, isSortable } = currentField; // key is field id
    setSortCriteria({
      field: key,
      isAsc: sortCriteria?.field === key ? getNextSortStatus(sortCriteria?.isAsc) : true,
    });
  };

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
    setFilterCriteria(filterCondition);
  };

  /**
   * Search whole field in table
   */
  const onSearch = (searchValue) => {
    setSearchCriteria(searchValue);
  };

  const handlePagination = (data) => { // { pageSize, page, totalItems }
    setPagination(data);
  };

  const onSetVisibleFields = (fieldKeys) => {
    setVisibleFields(getVisibleFields(fields, fieldKeys));
  };

  const onSetTableData = (data) => {
    setTableData(dataFieldFormatter(data, visibleFields));
  };


  return ({
    sortCriteria,
    itemsToDisplay,
    tableData,
    visibleFields,
    onSearch,
    onFilter,
    onSort,
    handlePagination,
    onSetVisibleFields,
    onSetTableData
  });
}
