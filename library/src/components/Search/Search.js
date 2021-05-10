import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { BASE_URL, bookColumnsOptions } from "../../common/constants";
import DropDown from "../UI/DropDown";
import "./search.css";

const Search = () => {
  const [searchColumn, setSearchColumn] = useState(bookColumnsOptions[0]);
  const [term, setTerm] = useState("");
  const history = useHistory();

  const endpoint = history.location.search.slice(1).split("&");
  const page = endpoint.find((i) => i.startsWith("page="))
    ? `${endpoint.find((i) => i.startsWith("page="))}&`
    : "";
  const pageSize = endpoint.find((i) => i.startsWith("pageSize="))
    ? `${endpoint.find((i) => i.startsWith("pageSize="))}&`
    : "";
  const sort = endpoint.find((i) => i.startsWith("sort="))
    ? `${endpoint.find((i) => i.startsWith("sort="))}&`
    : "";
  const order = endpoint.find((i) => i.startsWith("order="))
    ? `${endpoint.find((i) => i.startsWith("order="))}&`
    : "";

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      history.push(
        `/books?${sort}${order}${page}${pageSize}search=${term}&searchBy=${searchColumn.value}`,
      );
    }
  };
  return (
    <div className="search-bar">
      <DropDown
        id="search-dropdown"
        selected={searchColumn}
        onSelectedChange={setSearchColumn}
        options={bookColumnsOptions}
      />
      <input
        type="text"
        id="search-input"
        value={term}
        placeholder="Search a book"
        onKeyUp={(e) => handleKeyPress(e)}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button
        id="search-btn"
        type="button"
        onClick={() => history.push(`/books?${sort}${order}${page}${pageSize}search=${term}&searchBy=${searchColumn.value}`)}
      >
        <img src={`${BASE_URL}/storage/icons/search-icon.png`} alt="search" />
      </button>
    </div>
  );
};
export default Search;
