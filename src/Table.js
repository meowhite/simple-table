import React, { useState } from 'react'
import { getSortIcon, dataFieldFormatter } from './utils'
import useTable from './TableController'

export default function Table(props) {
  const { config: { fields, primaryKey, defaultSort }, data } = props;
  const visibleFields = fields?.filter(e => !e.isInvisible)
  const formatData = dataFieldFormatter(data, visibleFields)
  const { sortCriteria, tableData, onSort, onSearch, onFilter } = useTable({ data: formatData, defaultSort })

  const [searchValue, setSearchValue] = useState('')

  const onHandleSort = (currentField) => () => currentField?.sortable && onSort(currentField)

  const onChangeSearch = (ev) => setSearchValue(ev.target.value)
  const onHandleSearch = () => onSearch(searchValue.toString())

  // const onHandleFilter = () => onFilter([{ key: 'name', value: 'as' }, { key: 'email', value: 'ce' },])
  const onHandleFilter = () => onFilter([
    { key: 'name', value: 'as' },
    { key: 'price', value: { from: 3, to: 6 } }
  ])
  // const onHandleFilter = () => onFilter([
  //   { key: 'name', value: 'as' },
  //   { key: '_id', value: ['1', '3'] },
  // ])

  return (
    <div>
      <div>Monthly Budget</div>
      <div onClick={onHandleFilter}>Filter email: ce and name: as</div>
      <input value={searchValue} onChange={onChangeSearch} />
      <button onClick={onHandleSearch}>
        Search
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
              )
            })}
          </tr>
        </thead>

        <tbody>
          {tableData?.map(row => {
            return (
              <tr key={row[primaryKey]}>
                {visibleFields?.map((field, index) => {
                  const key = `${index}-${tableData[field]}`;
                  return field?.formatter
                    ? <td key={key}>{field.formatter(row)}</td>
                    : <td key={key}>{row[field.key]}</td>;
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div>

      </div>
    </div>
  )
}
