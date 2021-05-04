import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { bookColumnsOptions } from "../../common/constants";
import SearchDropdown from "./SearchDropdown";
import "./search.css";

const Search = () => {
  const [searchColumn, setSearchColumn] = useState(bookColumnsOptions[0]);
  const [term, setTerm] = useState("");
  const history = useHistory();
  // to Fix form default
  const handleKeyPress = (e) => {
    // e.preventDefault();
    if (e.key === "Enter") {
      history.push(`/books?search=${term}&searchBy=${searchColumn.value}`);
    }
  };
  return (
    <div className="search-bar">
      <SearchDropdown
        selected={searchColumn}
        onSelectedChange={setSearchColumn}
        options={bookColumnsOptions}
      />
      <input
        type="text"
        value={term}
        // onSubmit={e => { e.preventDefault(); }}
        onKeyUp={(e) => handleKeyPress(e)}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button
        type="button"
        onClick={() => history.push(`/books?search=${term}&searchBy=${searchColumn.value}`)}
      >
        Search
      </button>
    </div>
  );
};
export default Search;
