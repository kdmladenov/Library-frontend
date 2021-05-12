import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import { sortOptions, sortDirections } from "../../common/constants";
import DropDown from '../UI/DropDown';
import './sort.css';

const Sort = ({ resource }) => {
  const [sortColumn, setSortColumn] = useState(sortOptions[0]);
  const [sortDirection, setSortDirection] = useState(sortDirections[0]);

  const history = useHistory();

  const endpoint = history.location.search.slice(1).split('&');
  const search = endpoint.find(i => i.startsWith("search=")) ? `${endpoint.find(i => i.startsWith("search="))}&` : "";
  const searchBy = endpoint.find(i => i.startsWith("searchBy=")) ? `${endpoint.find(i => i.startsWith("searchBy="))}&` : "";
  const page = endpoint.find(i => i.startsWith("page=")) ? `${endpoint.find(i => i.startsWith("page="))}&` : "";
  const pageSize = endpoint.find(i => i.startsWith("pageSize=")) ? `${endpoint.find(i => i.startsWith("pageSize="))}&` : "";

  useEffect(() => {
    history.push(`${resource}?${search}${searchBy}${page}${pageSize}sort=${sortColumn.value}&order=${sortDirection.value}`);
  }, [sortColumn, sortDirection]);

  return (
    <div className="sort-bar">
      <DropDown
        selected={sortColumn}
        onSelectedChange={setSortColumn}
        options={sortOptions}
        dropDownToggleId="dropdown-basic-sort-option"
      />
      <DropDown
        selected={sortDirection}
        onSelectedChange={setSortDirection}
        options={sortDirections}
        dropDownToggleId="dropdown-basic-sort-value"
      />
    </div>
  );
};

Sort.propTypes = {
  resource: PropTypes.string.isRequired,
};
export default Sort;
