Demo here:

https://simple-table-omega.vercel.app/

backend query form: https://scm.wcs.fortna.com/FortnaWES/wes-dataservice/blob/main/DEFAULT_REPORT_PROCESSOR.md

```
{
	"schema": "schema",
	"tbl": "table_name",
	"meta": {
		"tbl": "table_name_av",
		"src_col": "col_of_table",
		"dst_col": "col_of_table_av"
	},
	"sorts": [{
		"field": "field",
		"asc": true
	}],
	"filters": [{
		"opt": "operation",
		"field": "field",
		"val": "value",
		"type": "data-type"
	}],
	/**
	 * Default_sorts is required if backend is run with Oracle database and sorts is empty.
	 * For the remaining database, sorts and default_sorts can be empty at same time. 
	 */
	"default_sorts": [{
		"field": "field",
		"asc": true
	}],
	"page": 1,
	"page_size": 10
}
```