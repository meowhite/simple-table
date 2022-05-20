import React, { useEffect, useState } from 'react';
import { callApiFn, queryTableData } from './services/axiosConfig';
import Table from './Table';

export default function Home(props) {
  const { config, config: { fields } } = props;
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10, totalItems: 55 });

  const [sortCriteria, setSortCriteria] = useState({ field: '', isAsc: undefined, });
  const [filterCriteria, setFilterCriteria] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState('');

  useEffect(() => {
    const getData = async () => {
      const { method, api, tableAdditionInfo = {} } = config?.dataSource;
      const filterFormat = filterCriteria?.map(e => ({ ...e, field: e.key, val: e.value }));
      const params = {
        ...tableAdditionInfo,
        default_sorts: [{
          field: config?.defaultSort?.field || fields?.[0]?.key,
          asc: Boolean(config?.defaultSort?.isAsc)
        }],
        page: pagination.page,
        page_size: pagination.pageSize,
        filters: filterFormat,
        ...sortCriteria?.field && {
          sorts: [{ field: sortCriteria?.field, asc: sortCriteria?.isAsc }]?.filter(e => e.asc !== undefined)
        }

      };
      console.log('Data before sending request:', params);
      try {
        const result = await queryTableData({ method, api, params });
        setData(result?.data?.data?.items || []);
        setPagination(prev => ({
          ...prev,
          totalItems: result?.data?.data?.total_item || 0
        }));

      } catch (error) { }
    };
    getData();
  }, [pagination.page, pagination.pageSize, pagination.totalItems, sortCriteria, JSON.stringify(filterCriteria)]);

  const onChangePagination = (pageData) => {
    console.log('pageData', pageData);
    setPagination(prev => ({
      ...prev,
      ...pageData
    }));
  };

  const onSortClick = (data) => {
    console.log('sortttt', data);
    setSortCriteria(data);
  };

  const onFilterClick = (data) => {
    console.log('fffffiiilterrr', data);
    setFilterCriteria(data);
  };


  return (
    <div>
      <Table
        data={data}
        config={config}
        onSortClick={onSortClick}
        onFilterClick={onFilterClick}
        paginationOptions={{
          ...pagination,
          onChange: onChangePagination
        }}
      />
    </div>
  );
}
