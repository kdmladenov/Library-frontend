import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { bookColumnsOptions, sortDirections } from "../../common/constants";
import ColumnDropdown from '../Search/ColumnDropdown';
import './sort.css';

const Sort = () => {
  const [sortColumn, setSortColumn] = useState(bookColumnsOptions[0]);
  const [sortDirection, setSortDirection] = useState(sortDirections[0]);

  const history = useHistory();

  return (
    <div className="sort-bar">
      <ColumnDropdown
        selected={sortColumn}
        onSelectedChange={setSortColumn}
        options={bookColumnsOptions}
      />
      <ColumnDropdown
        selected={sortDirection}
        onSelectedChange={setSortDirection}
        options={sortDirections}
      />
      <button
        type="button"
        onClick={() => history.push(`/books?sort=${sortColumn.value}&order=${sortDirection.value}`)}
      >
        Sort
      </button>
    </div>
  );
};
export default Sort;
