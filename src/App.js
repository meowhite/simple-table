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
        isSortable: true,
      },
      {
        title: 'Full Name',
        key: 'name',
        isSortable: true,
        isTitle: true,
      },
      {
        title: 'Full Name with ID',
        key: 'fullNameWithID',
        isSortable: true,
        isTitle: true,
        customSearch: row => `${row.name} id is: ${row._id}`,
        formatter: row => <div>full name: {row?.name} {row?._id}</div>,
      },
      {
        title: 'Email Address',
        key: 'email',
        isSortable: true,
        isTagline: true,
      },
      {
        title: 'Date created',
        key: 'date',
        formatter: value => (new Date(Number('2021-09-16 22:18:31'))).toDateString(),
      }
    ],
    defaultSort: {
      field: 'name',
      type: 'asc',
    },
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
