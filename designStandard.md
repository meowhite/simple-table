```
import { TableV2 } from '@fortna/ui-components/table';

export function ProductScreen() {
	const columns = [
		{
			field: 'id',
			isVisible: false,
		},
		{
			title: '',
			field: '',
			type: 'selection'
		},
		{
			title: 'Full Name',
			field: 'name',
			type: 'custom',
			classes: 'text-ellipsis text-bold text-left',
			sortable: {
				field: 'first_name'
			},
			filter: {
				enable: true,
				type: 'text', // selection, between, date, datetime, daterange, custom
				// component: InputFilter, // SelectionFilter, BetweenFilter, DateFilter, DateTimeFilter, DateRangeFilter, CustomFilter
			},
			component: ({value, row}) => {
				return <div>{row.first_name} {row.last_name}</div>
			}
		},
		{
			title: 'Personality',
			field: 'personality',
			type: 'custom',
			filter: {
				// component: <SelectionFilter api={'/be-get-all-personality'} idField={'id'} displayField={'value'} />
				// component: <SelectionFilter data={this.personalityList} idField={'id'} displayField={'value'} />
				enable: true,
				type: 'selection',
				idField: 'id',
				displayField: 'value',
				// api: '/personalities',
				filterList: [
					{id: 1, value: 'Aggressive'},
					{id: 2, value: 'Cautious'},
					{id: 3, value: 'Dependable'},
					{id: 4, value: 'Talkative'},
				]
			}
			component: ({value, row}) => {
				return <div>{value} {row?.id == 0 ? 'Not existed' : 'OK'}</div>
			}
		},
		{
			title: 'DoB',
			field: 'date_of_birth',
			type: 'date',
			sortable: true,
			filter: {
				
			}
		},
		{
			title: 'Status',
			field: 'status',
			type: 'string',
			component: ({value, row}) => {
				return <div>{value} {row?.id == 0 ? 'Not existed' : 'OK'}</div>
			}
		},
		{
			title: 'Actions',
			field: '',
			type: 'action',
			actions: [
				{
					type: 'edit',
					component: ({row}) => {
						return <EditComponent api={'/edit?id=' + row.id} set />
					}
				},
				{
					type: 'delete'
				}
			]
		}
	];

	return (
		<FortnaTable config={
			datasource: {
				api: '/fetching-table-data-api'
			},
			serverSide: false,
			searchable: {
				enable: true
				// api: '/search?'
			},
			functionalities: [
				{
					type: 'search',
					// api: 'fetching-table-data-api?q=<base64>'
				},
				{
					type: 'add',
					component: ({props}) => {
						<AddComponent ...props />
					}
				}
			]
			columns,
		} />
	)
}
```