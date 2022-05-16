import React, { useEffect, useState } from 'react';
import { callApiFn } from './services/axiosConfig';
import Table from './Table';

export default function Home(props) {
  const { config } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { method, api } = config.dataSource;
      try {
        const result = await callApiFn({ method, api });
        // console.log('result', result.data);
        setData(result?.data);
        // onSetTableData(result?.data);

      } catch (error) { }
    };
    getData();
  }, []);


  return (
    <div>
      <Table data={data} config={config} />
    </div>
  );
}
