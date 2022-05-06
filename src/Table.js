import React from 'react'

export default function Table(props) {
  const { config: { fields, primaryKey }, data } = props;
  return (
    <div>
      <div>Monthly Budget</div>
      <table className="fn-table">
        <thead>
          <tr>
            {fields?.map(e => <th key={e.key}>{e.title}</th>)}
          </tr>
        </thead>

        <tbody>
          {data?.map(row => {
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
