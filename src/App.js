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
      },
      {
        title: 'Full Name',
        key: 'name',
        isSortable: true,
        isTitle: true,
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
        formatter: value => (new Date(Number(value))).toDateString(),
        isMetadata: true,
      },
    ],
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
