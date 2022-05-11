import logo from './logo.svg';
import './App.scss';
import { data } from './data'
import Table from './Table';


function App() {

  const config = {
    fields: [
      {
        title: 'ID',
        key: '_id',
        sortable: true
      },
      {
        title: 'Full Name',
        key: 'name',
        isTitle: true,
        sortable: true
      },
      {
        title: 'Price',
        key: 'price',
        isTitle: true,
        sortable: true
      },
      {
        title: 'Full Name with ID',
        key: 'fullNameWithID',
        isTitle: true,
        sortable: {
          sortQuery: row => `${row.name} id is: ${row._id}`,
        },
        formatter: row => <div>full name: {row?.name} {row?._id}</div>,
      },
      {
        title: 'Email Address',
        key: 'email',
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
    //   field: 'name',
    //   isAsc: true,
    // },
    items: data,
    primaryKey: '_id',
    style: {},
  }

  return (
    <div className="App">
      <Table data={data} config={config} />
    </div>
  );
}

export default App;
