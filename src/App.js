import React, { useEffect, useState } from 'react';
import './App.scss';
import Home from './Standard';

function App() {

  const config = {
    tableTitle: 'Host Order',
    dataSource: {
      api: '/api/report',
      method: 'get',
      serverSide: true,
      tableAdditionInfo: {
        "tbl": "host_order",
        "meta": {
          "tbl": "host_order_av",
          "src_col": "id",
          "dst_col": "id"
        },
      }
    },
    fields: [
      {
        title: 'ID',
        key: 'id',
        sortable: true
      },
      {
        title: 'Host Order Type',
        key: 'host_order_type',
        sortable: true
      },
      {
        title: 'Host Order State',
        key: 'host_order_state',
        sortable: true,
        filterable: {
          opt: 'like'  // 'operation' 'like', 'range'
          // opt: 'operation'  // 'operation' 'like', 'range'
        }
      },
      // {
      //   title: 'Full Name with ID',
      //   key: 'fullNameWithID',
      //   isTitle: true,
      //   queryBy: row => `${row.name} id is: ${row.price}`,
      //   sortable: {
      //     // sortQuery: row => `${row.name} id is: ${row.price}`,
      //   },
      //   formatter: row => <div>full name: {row?.name} {row?.price}</div>,
      // },
      {
        title: 'Host Order Priority',
        key: 'host_order_priority',
        isMinimumWidth: true, // minimum width
        sortable: true,
      },
      {
        title: 'host_order_number',
        key: 'host_order_number',
        // formatter: value => (new Date(Number('2021-09-16 22:18:31'))).toDateString(),
        isInvisible: true
      }
    ],
    // defaultSort: {
    //   field: 'price',
    //   isAsc: true,
    // },
    primaryKey: 'id',
    style: {},
  };


  return (
    <div className="App">
      <Home config={config} />
    </div>
  );
}

export default App;
