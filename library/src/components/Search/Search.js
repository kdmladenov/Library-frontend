import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { bookColumnsOptions } from "../../common/constants";
import DropDown from "../UI/DropDown";
import "./search.css";

const Search = () => {
  const [searchColumn, setSearchColumn] = useState(bookColumnsOptions[0]);
  const [term, setTerm] = useState("");
  const history = useHistory();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      history.push(`/books?search=${term}&searchBy=${searchColumn.value}`);
    }
  };
  return (
    <div className="search-bar">
      <DropDown
        selected={searchColumn}
        onSelectedChange={setSearchColumn}
        options={bookColumnsOptions}
      />
      <input
        type="text"
        value={term}
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
