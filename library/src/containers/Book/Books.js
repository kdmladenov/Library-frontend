/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
// import Loading from "../../components/UI/Loading";
// import { Form } from 'react-bootstrap';
import BookCard from "../../components/Books/BookCard";
import useHttp from "../../hooks/useHttp";
import { BASE_URL } from "../../common/constants";
// import Paging from "../../components/Paging/Paging";
// import Sort from "../../components/Sort/Sort";
import "../../components/Books/books.css";

const Books = (props) => {
  const { search: query } = props.location;
  const { data, error } = useHttp( // removed loading to fix sort
    `${BASE_URL}/books${query}`,
    "GET",
    [],
  );

  // if (loading) {
  //   return <Loading />;
  // }

  if (error) {
    return <h1>{error}</h1>;
  }

  const bookCardsToShow = (
    <div className="book-list">
      {data.map((book) => {
        return (
          <BookCard
            key={book.bookId}
            {...book}
            goToDetails={() => props.history.push(`/books/${book.bookId}`)}
          />
        );
      })}
    </div>
  );

  return (
    <main>
      {/* <dir id="sort-books">
        <Sort />
      </dir> */}
      {data.length ? <ul>{bookCardsToShow}</ul> : <h2> No books are found... </h2>}
      {/* <div id="paging-books">
        <Paging />
      </div> */}

    </main>
  );
};
export default Books;
