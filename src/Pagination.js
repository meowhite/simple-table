import React, { useEffect, useState } from 'react';
import ArrowLeft from './icons/ArrowLeft';
import ArrowRight from './icons/ArrowRight';


export default function Pagination(props) {
  const { page, pageSize, pageSizes, totalItems, onChange } = props;
  const [curPageSize, setCurPageSize] = useState(pageSize);
  const [curPage, setCurPage] = useState(page);
  const totalPageNumber = Math.ceil(totalItems / curPageSize);
  const pageListArray = Array(totalPageNumber).fill('').map((e, i) => i + 1);

  useEffect(() => {
    onChange?.({ page: curPage, pageSize: curPageSize, totalItems });
  }, [curPageSize, curPage]);

  const onChangePage = (type) => () => {
    if (type === 'prev') {
      curPage >= 2 && setCurPage(pageNumber => pageNumber - 1);
    }
    if (type === 'next') {
      curPage < totalPageNumber && setCurPage(pageNumber => pageNumber + 1);
    }
  };

  const onChangePageSize = (ev) => {
    setCurPageSize(Number(ev.target.value));
  };

  const onChangePageNumber = (ev) => {
    setCurPage(Number(ev.target.value));
  };

  return (
    <div className='pagination'>
      <div className='left'>
        <span>Items per page:</span>
        <select name="pageSizes" value={curPageSize} onChange={onChangePageSize} className='page-number'>
          {pageSizes?.map(e => <option className='select-value' key={e} value={e}>{e}</option>)}
        </select>
        <div>
          {(curPage - 1) * curPageSize + 1} - {(curPage * curPageSize) <= totalItems ? (curPage * curPageSize) : totalItems} of {totalItems} items
        </div>
      </div>

      <div className='right'>
        <select name="pageNumber" value={curPage} onChange={onChangePageNumber} className='page-number'>
          {pageListArray?.map(pageNum => <option key={pageNum} value={pageNum}>{pageNum}</option>)}
        </select>
        <span>of {totalPageNumber} pages</span>
        <div className='pag-arrow-left' onClick={onChangePage('prev')}><ArrowLeft /></div>
        <div className='pag-arrow-right' onClick={onChangePage('next')}><ArrowRight /></div>
      </div>
    </div >
  );
}
