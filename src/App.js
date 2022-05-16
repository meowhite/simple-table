import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import { data } from './data';
import { data2 } from './data2';
import Home from './Home';
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
  const [data, setData] = useState([]);


  const config = {
    dataSource: {
      api: '/store',
      method: 'get'
    },
    fields: [
      {
        title: 'ID',
        key: 'id',
        sortable: true
      },
      {
        title: 'Title',
        key: 'title',
        sortable: true
      },
      {
        title: 'Category',
        key: 'category',
        isTitle: true,
        sortable: true
      },
      {
        title: 'Description',
        key: 'description',
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
        title: 'Price',
        key: 'price',
        sortable: true,
        isTagline: true,
      },
      {
        title: 'Date created',
        key: 'date',
        formatter: value => (new Date(Number('2021-09-16 22:18:31'))).toDateString(),
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
