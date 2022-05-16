import ArrowDown from "./icons/ArrowDown";
import ArrowUp from "./icons/ArrowUp";

const descStatus = [true, false, undefined];
export const getNextSortStatus = (currentStatus = undefined) =>
  currentStatus === undefined ? descStatus[0] : descStatus[descStatus.indexOf(currentStatus) + 1];


export const getSortIcon = (currentStatus = undefined) => currentStatus === undefined ? '' : (currentStatus ? <ArrowUp /> : <ArrowDown />);

/**
 * this func serve for custom field that doesn't have in original data, it will generate data follow custom field
 * @param {*} data : is data array
 * @param {*} fields : is array header field 
 * @returns : new data with field has key in header field
 */

export const dataFieldFormatter = (data, fields) =>
  data.map((row, i) =>
    fields.reduce((acc, el) =>
      ({ ...acc, [el.key]: el?.queryBy?.(row) || row?.[el?.key] || '' }), {}));


/**
 * filter visible field from array field keys
 * @param {*} listFields 
 * @param {*} fieldKeys like: ['id', 'name']
 * @returns 
 */
export const getVisibleFields = (listFields, fieldKeys) => listFields.filter(fieldObj => fieldKeys.includes(fieldObj.key));


export const handleSort = (allItems, sortCriteria) => {
  const { field, isAsc } = sortCriteria;
  let items = structuredClone(allItems);

  if (typeof isAsc === 'boolean') {
    return isAsc ? items.sort((a, b) => (a[field] > b[field]) ? 1 : -1)
      : items.sort((a, b) => (a[field] > b[field]) ? -1 : 1);
  }
  return allItems;
};

export const handleItemsToDisplay = (allItems, page, pageSize) => {
  const totalItems = allItems?.length;
  return allItems.slice((page - 1) * pageSize, ((page * pageSize) <= totalItems ? (page * pageSize) : totalItems));
};

export const handleFilter = (allItems, filterCondition) => {
  if (!filterCondition.length) {
    return allItems;
  }
  const filterData = allItems.filter(ele =>
    filterCondition.find(con => {
      if (Array.isArray(con?.value)) { // select 
        return con?.value?.includes(ele[con?.key]); // is select option, the value in option must be same with value in table data
      }
      if (con?.value?.hasOwnProperty('from')) { // min - max
        return Number(ele[con.key]) >= Number(con.value.from) && Number(ele[con.key]) <= Number(con.value.to);
      }
      if (typeof con?.value === 'string') { // search
        return ele[con?.key]?.includes(con?.value);
      }
      return false;
    }));

  return filterData;
};

/**
 * 
 * @param {*} allItems 
 * @param {*} searchValue 
 * @returns Search whole field in allItems
 */
export const handleSearch = (allItems, searchValue) => {
  return allItems?.filter(row => Object.entries(row).some(entry => String(entry[1]).toLowerCase().includes(searchValue)));
};



/**
 * 
 * @param {*} data is origin data
 * @returns new data executed functions through chaining func
 * for example: dataChaining(data).onFilter(filterCriteria).onSearch(searchCriteria).valueOf();
 */

export const dataChaining = (data) => ({
  result: data,
  onSort: function (sortCriteria) {
    this.result = handleSort(this.result, sortCriteria);
    return this;
  },
  onFilter: function (filterCondition) {
    this.result = handleFilter(this.result, filterCondition);
    return this;
  },
  onSearch: function (searchValue) {
    this.result = handleSearch(this.result, searchValue);
    return this;
  },
  valueOf: function () {
    return this.result;
  }
});
