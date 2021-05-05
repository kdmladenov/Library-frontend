import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { bookColumnsOptions, sortDirections } from "../../common/constants";
import DropDown from '../UI/DropDown';
import './sort.css';

const Sort = () => {
  const [sortColumn, setSortColumn] = useState(bookColumnsOptions[0]);
  const [sortDirection, setSortDirection] = useState(sortDirections[0]);

  const history = useHistory();

  useEffect(() => {
    history.push(`/books?sort=${sortColumn.value}&order=${sortDirection.value}`);
  }, [sortColumn, sortDirection]);

  return (
    <div className="sort-bar">
      <DropDown
        selected={sortColumn}
        onSelectedChange={setSortColumn}
        options={bookColumnsOptions}
      />
      <DropDown
        selected={sortDirection}
        onSelectedChange={setSortDirection}
        options={sortDirections}
      />
    </div>
  );
};
export default Sort;
