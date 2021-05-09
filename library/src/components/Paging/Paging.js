import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { totalBooksNumber } from '../../common/constants';
// import DropDown from "../UI/DropDown";

const rangePageSize = [...Array(11)].map((_, i) => {
  return {
    label: i + 5,
    value: i + 5,
  };
});

const rangePageNumber = [
  ...Array(Math.ceil(totalBooksNumber / rangePageSize[0].value)),
].map((_, i) => i + 1);

const Paging = () => {
  const [pageNumber, setPageNumber] = useState(rangePageNumber[0]);
  // const [pageSize, setPageSize] = useState(rangePageSize[5].value);

  const history = useHistory();

  const endpoint = history.location.search.slice(1).split('&');
  const sort = endpoint.find(i => i.startsWith("sort=")) ? `${endpoint.find(i => i.startsWith("sort="))}&` : "";
  const order = endpoint.find(i => i.startsWith("order=")) ? `${endpoint.find(i => i.startsWith("order="))}&` : "";
  const search = endpoint.find(i => i.startsWith("search=")) ? `${endpoint.find(i => i.startsWith("search="))}&` : "";
  const searchBy = endpoint.find(i => i.startsWith("searchBy=")) ? `${endpoint.find(i => i.startsWith("searchBy="))}&` : "";

  // useEffect(() => {
  //   history.push(`/books?page=${pageNumber.value}&pageSize=${pageSize.value}`);
  // }, [pageNumber, pageSize]);

  // useEffect(() => {
  //   rangePageNumber = [
  //     ...Array(Math.ceil(totalBooksNumber / pageSize)),
  //   ].map((_, i) => i + 1);
  // }, [pageSize]);

  const PageLink = rangePageNumber.map((number) => {
    return (
      <li key={number} className="page-item">
        <button
          type="button"
          className="page-link"
          onClick={() => {
            history.push(
              `/books?${sort}${order}${search}${searchBy}page=${number}&pageSize=${rangePageSize[0].value}`,
            );
            setPageNumber(number);
          }}
        >
          {number}
        </button>
      </li>
    );
  });
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button
              type="button"
              className="page-link"
              onClick={() => {
                history.push(
                  pageNumber > 1
                    ? `/books?page=${pageNumber - 1}&pageSize=${rangePageSize[0].value}`
                    : `/books?page=1&pageSize=${rangePageSize[0].value}`,
                );
                setPageNumber(Math.max(pageNumber - 1, 1));
              }}
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </button>
          </li>
          {PageLink}
          <li className="page-item">
            <button
              type="button"
              className="page-link"
              onClick={() => {
                history.push(
                  pageNumber < rangePageNumber.length
                    ? `/books?page=${pageNumber + 1}&pageSize=${rangePageSize[0].value}`
                    : `/books?page=${rangePageNumber.length}&pageSize=${rangePageSize[0].value}`,
                );
                setPageNumber(Math.min(pageNumber + 1, rangePageNumber.length));
              }}
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </nav>
      {/* <DropDown
        selected={pageSize}
        onSelectedChange={setPageSize}
        options={rangePageSize}
      /> */}
    </div>
  );
};
export default Paging;
