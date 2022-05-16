import React, { useEffect, useState } from 'react';
import { getSortIcon, dataFieldFormatter } from './utils';
import useTable from './TableController';
import Pagination from './Pagination';
import { callApiFn } from './services/axiosConfig';

export default function Table(props) {
  const { config: { fields, primaryKey, defaultSort, dataSource }, data } = props;
  // const [visibleFields, setVisibleFields] = useState(fields?.filter(e => !e.isInvisible));
  // const formatData = dataFieldFormatter(data, visibleFields);
  // const [data, setData] = useState([]);
  const {
    visibleFields,
    sortCriteria,
    itemsToDisplay,
    tableData,
    onSort,
    onSearch,
    onFilter,
    handlePagination,
    onSetVisibleFields,
    onSetTableData
  } = useTable({ data, fields, defaultSort });

  const [searchValue, setSearchValue] = useState('');


  // useEffect(() => {
  //   const getData = async () => {
  //     const { method, api } = dataSource;
  //     try {
  //       const result = await callApiFn({ method, api });
  //       console.log('result', result.data);
  //       // setData(result?.data);
  //       onSetTableData(result?.data);

  //     } catch (error) { }
  //   };
  //   getData();
  // }, []);







  const onHandleSort = (currentField) => () => currentField?.sortable && onSort(currentField);

  const onChangeSearch = (ev) => setSearchValue(ev.target.value);
  const onHandleSearch = () => onSearch(searchValue.toString());

  // const onHandleFilter = () => onFilter([{ key: 'name', value: 'as' }, { key: 'email', value: 'gmail' },])
  const onHandleFilter = () => onFilter([
    { key: 'name', value: 'as' },
    { key: '_id', value: { from: 3, to: 28 } }
  ]);
  // const onHandleFilter = () => onFilter([
  //   { key: 'name', value: 'as' },
  //   { key: '_id', value: ['1', '3'] },
  // ])

  const onChangePage = (data) => {
    handlePagination(data);
  };


  const onHideField = () => {
    // const fields
    // setVisibleFields();
    onSetVisibleFields(['_id', 'name']);
  };

  // console.log('itemsToDisplay', itemsToDisplay)

  return (
    <div>
      <div>Monthly Budget</div>
      <div onClick={onHideField}>set show only 2 fields: ['_id', 'name']</div>
      <div onClick={onHandleFilter}>Filter email: get id from 3 to 28</div>
      <input value={searchValue} onChange={onChangeSearch} />
      <button onClick={onHandleSearch}>
        Search with key: cc
      </button>
      <table className="fn-table">
        <thead>
          <tr>
            {visibleFields?.map(field => {
              return (
                <th onClick={onHandleSort(field)} key={field.key}>
                  {field.title}
                  <span className='arrow-icon'>
                    {field?.sortable && sortCriteria?.field === field.key && getSortIcon(sortCriteria.isAsc)}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {itemsToDisplay?.map(row => {
            return (
              <tr key={row[primaryKey]}>
                {visibleFields?.map((field, index) => {
                  const key = `${index}-${itemsToDisplay[field]}`;
                  return field?.formatter
                    ? <td key={key}>{field.formatter(row)}</td>
                    : <td key={key}>{row[field.key]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <Pagination
          onChange={onChangePage}
          page={1}
          pageSize={10}
          pageSizes={[5, 10, 20, 30, 40, 50]}
          totalItems={tableData?.length}
        />
      </div>
    </div>
  );
}
