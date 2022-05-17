import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import { data } from './data';
import { data2 } from './data2';
import Home from './Standard';
import { callApiFn } from './services/axiosConfig';

const fakeData = Array(55).fill('').map((e, i) => ({
  _id: i + 1,
  email: "minagerges123@gmail.com",
  name: "mina",
  price: Math.floor(Math.random() * (55 - 1 + 1) + 1),
  phone: "+96170345114",
  subject: "test",
  message: "ahlannn",
  date: "2021-09-17 19:10:50",
}));


function App() {

  const config = {
    dataSource: {
      api: '/api/report',
      method: 'get',
      isManual: true
    },
    fields: [
      {
        title: 'ID',
        key: 'id',
        sortable: true
      },
      // {
      //   title: 'oracle_rn',
      //   key: 'oracle_rn',
      //   sortable: true
      // },
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
        sortable: true
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
    items: data2,
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
