import React, { useState } from 'react'
import { getNextSortStatus } from './utils'
import SVGArrowDown from './icons/SVGArrowDown';
import SVGArrowUp from './icons/SVGArrowUp';
import SVGChevronLeft from './icons/SVGChevronLeft';
import SVGChevronRight from './icons/SVGChevronRight';
// isSortedDesc
export default function Table(props) {
  const { config: { fields, primaryKey }, data } = props;
  const [dataTable, setDataTable] = useState(data)
  const [sortCriteria, setSortCriteria] = useState({ sortField: '', isAscending: false });

  const onSort = (field) => (event) => {
    const { key, isSortable } = field
    const { isAscending, sortField } = sortCriteria
    let items = structuredClone(data)
    console.log('items', items)
    if (typeof isAscending === 'boolean') {
      items.sort((a, b) => (a[key] > b[key]) && isAscending ? 1 : -1)
    }
    // console.log('ne', getNextSortStatus(isAscending))
    setSortCriteria({
      sortField: typeof getNextSortStatus(isAscending) === 'boolean' ? key : '',
      isAscending: getNextSortStatus(isAscending)
    })
    setDataTable(items)

  }
  console.log('sortCriteria?.sortField', sortCriteria?.sortField)
  return (
    <div>
      <div>Monthly Budget</div>
      <table className="fn-table">
        <thead>
          <tr>
            {fields?.map(field => {
              return (
                <th key={field.key} onClick={field?.isSortable && onSort(field)}>
                  {field.title}
                  {sortCriteria?.sortField === field.key && sortCriteria.isAscending
                    ? <SVGArrowUp /> : (sortCriteria?.sortField === '')
                      ? '' : <SVGArrowDown />}
                </th>
              )
            })}
          </tr>
        </thead>

        <tbody>
          {dataTable?.map(row => {
            return (
              <tr key={row[primaryKey]}>
                {fields?.map((field, index) => {
                  const key = `${index}-${data[field]}`;
                  return field?.formatter
                    ? <td key={key}>{field.formatter(data[field.key])}</td>
                    : <td key={key}>{row[field.key]}</td>;
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
