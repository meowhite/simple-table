import React, { useEffect, useState } from 'react';
import './App.scss';
import Home from './Standard';

function App() {

  const config = {
    dataSource: {
      api: '/api/report',
      method: 'get',
      isManual: true,
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
        title: 'oracle_rn',
        key: 'oracle_rn',
        isTitle: true,
        isMinimumWidth: true, // minimum width
        sortable: true,
        filterable: {
          // opt: 'like'  // 'operation' 'like', 'range'
          opt: 'range'  // 'operation' 'like', 'range'
        }
      },
      {
        title: 'host_order_type',
        key: 'host_order_type',
        isTitle: true,
        sortable: true
      },
      {
        title: 'host_order_state',
        key: 'host_order_state',
        isTitle: true,
        sortable: true,
        filterable: {
          // opt: 'like'  // 'operation' 'like', 'range'
          opt: 'operation'  // 'operation' 'like', 'range'
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
        title: 'host_order_priority',
        key: 'host_order_priority',
        isMinimumWidth: true, // minimum width
        sortable: true,
        isTagline: true,
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
