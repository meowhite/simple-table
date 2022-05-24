import React, { useEffect, useState } from 'react';
import { getNextSortStatus, filterOperation } from './utils';
import useTable from './TableController';
import Pagination from './Pagination';
import ArrowDown from "./icons/ArrowDown";
import ArrowUp from "./icons/ArrowUp";

export default function Table(props) {
  // config props
  const { config: { fields, tableTitle, primaryKey, defaultSort, dataSource, dataSource: { serverSide } }, data,
    // standard screen props
    paginationOptions, onSortClick, onFilterClick
  } = props;
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
  } = useTable({ data, fields, defaultSort, serverSide });

  const [searchValue, setSearchValue] = useState('');


  const onHandleSort = (currentField) => () => {
    // onSortClick?.({ field: currentField.key, isAsc: getNextSortStatus(sortCriteria?.isAsc) });
    onSortClick?.({
      field: currentField.key,
      isAsc: currentField.key === sortCriteria.field ? getNextSortStatus(sortCriteria?.isAsc) : true,
    });
    currentField?.sortable && onSort(currentField);
  };

  const onChangeSearch = (ev) => setSearchValue(ev.target.value);
  const onHandleSearch = () => onSearch(searchValue.toString());

  // const onHandleFilter = () => onFilter([{ key: 'name', value: 'as' }, { key: 'email', value: 'gmail' },])
  const onHandleFilter = () => {
    console.log('ff clcic');
    // onFilterClick?.([
    //   { key: 'host_order_state', value: '%ACT%', opt: 'like' }
    // ]);

    // onFilterClick?.(filterOperation(fields, [{ key: 'host_order_state', value: 'ACT' }]));
    // onFilterClick?.(filterOperation(fields, [{ key: 'host_order_state', value: 'ERROR' }]));
    onFilterClick?.(filterOperation(fields, [{ key: 'host_order_state', value: { from: 3, to: 5 } }]));

    onFilter([
      // { key: 'name', value: 'as' },
      // { key: '_id', value: { from: 3, to: 28 } }
      { key: 'host_order_state', value: 'AC' }, { key: 'host_order_priority', value: '0' }
    ]);

  };
  // const onHandleFilter = () => onFilter([
  //   { key: 'name', value: 'as' },
  //   { key: '_id', value: ['1', '3'] },
  // ])

  const onChangePage = (data) => {
    paginationOptions?.onChange?.(data);
    handlePagination?.(data);
  };


  const onHideField = () => {
    // const fields
    // setVisibleFields();
    onSetVisibleFields(['host_order_state', 'host_order_priority']);
  };

  // console.log('itemsToDisplay', itemsToDisplay)

  return (
    <div>
      <div>Monthly Budget</div>
      <div onClick={onHideField}>set show only 2 fields: ['host_order_state', 'host_order_priority']</div>
      <div onClick={onHandleFilter}>Filter  host_order_state with value: ACT</div>
      <input value={searchValue} onChange={onChangeSearch} />
      <button onClick={onHandleSearch}>
        Search with key: cc
      </button>
      <div className='tb-title'>{tableTitle}</div>
      <table className="fn-table">
        <thead>
          <tr>
            {visibleFields?.map(field => {
              const isCurrentField = sortCriteria?.field === field.key;
              return (
                <th
                  className={field.isMinimumWidth ? 'minimum-width' : ''}
                  onClick={onHandleSort(field)} key={field.key}>
                  <div className='cel-header'>
                    <div>
                      {field.title}
                    </div>
                    {field?.sortable &&
                      <div className='arrow-icon'>
                        <ArrowUp isActive={isCurrentField && sortCriteria.isAsc} />
                        <ArrowDown isActive={isCurrentField && typeof sortCriteria.isAsc === 'boolean' && !sortCriteria.isAsc} />
                      </div>}
                  </div>
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
          page={paginationOptions.page}
          pageSize={paginationOptions.pageSize}
          pageSizes={[10, 20, 30, 40, 50]}
          totalItems={paginationOptions.totalItems || tableData?.length}
        />
      </div>
    </div>
  );
}
