import React, {useState, useEffect} from 'react';
import { Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import ListCard from '../ListCard/ListCard';

function List({url}) {

  const [total, setTotal] = useState(0);
  const [artList, setArtList] = useState([]);
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState(1);
  const [showItems, setShowItems] = useState([]);
  const [showPages, setShowPages] = useState([]);
  const [lastPage, setLastPage] = useState(1);

  const itemPerPage = 12;

  useEffect(() => {
    const fetchData = async (url) => {
      const res = await fetch(url);
      const data = await res.json();
      setArtList(data.objectIDs);
      setTotal(data.total);
      if (data.total > 0) {
        const pageArray = [];
        for(let i = 0; i < (data.total / itemPerPage ); i++) {
          pageArray.push(i + 1);
        }
        setPages(pageArray);
        setShowItems(data.objectIDs.slice(0, itemPerPage));
        setShowPages(pageArray.slice(0, 5));
        setLastPage(pageArray.length);
      } else {
        setPages([]);
        setShowItems([]);
        setShowPages([]);
        setLastPage(1);
      }
    }
    fetchData(url)
      .catch(err => console.log(err));
  }, [url]);

  useEffect(() => {
    setShowItems(artList.slice((page - 1) * itemPerPage, page * itemPerPage));
    if (page === 1) {
      setShowPages(pages.slice(0, page + 4));
    } else if (page === 2) {
      setShowPages(pages.slice(page - 2, page + 3));
    } else if (page === lastPage - 1){
      setShowPages(pages.slice(page - 4, page + 1));
    } else if (page === lastPage) {
      setShowPages(pages.slice(page - 5));
    } else {
      setShowPages(pages.slice(page - 3, page + 2));
    }
  }, [page]);

  const handlePage = (event) => {
    if (event.target.value) {
      const newPage = Number(event.target.value);
      if (Number.isInteger(newPage)){
        setPage(newPage);
      }
    }
    event.preventDefault();
  }

  return (
    <div className='d-flex flex-column align-items-center container'>
      <strong className='align-self-end mt-3'>{total} Results</strong>
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3 py-5 m-0">
        {
          showItems.map(id => <div key={id} className="col"><ListCard objectID={id}/></div>)
        }
      </div>
      <Pagination size="lg">
        <PaginationItem disabled={page > 1 ? false : true}>
          <PaginationLink first onClick={handlePage} value={1}/>
        </PaginationItem>
        <PaginationItem disabled={page > 1 ? false : true}>
          <PaginationLink previous onClick={handlePage} value={page - 1} />
        </PaginationItem>
        {
          showPages.map(item => 
            <PaginationItem key={item} active={page == item ? true : false}>
              <PaginationLink onClick={handlePage} value={item} >
                {item}
              </PaginationLink>
            </PaginationItem>
          )
        }
        <PaginationItem disabled={page < lastPage ? false : true}>
          <PaginationLink next onClick={handlePage} value={page + 1}/>
        </PaginationItem>
        <PaginationItem disabled={page < lastPage ? false : true}>
          <PaginationLink last onClick={handlePage} value={lastPage}/>
        </PaginationItem>
      </Pagination>
    </div>
  );
}

export default List;