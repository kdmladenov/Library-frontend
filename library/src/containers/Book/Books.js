/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import server from "../../common/server";
import Loading from "../../components/UI/Loading";
import BookCard from "../../components/Books/BookCard";

const Books = (props) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    fetch(`${server.baseURL}/books`, {
      headers: { Authorization: server.headers.Authorization },
    })
      .then((response) => response.json())
      .then((result) => setBooks(result))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div>
        <Loading>
          <h1>Loading books...</h1>
        </Loading>
      </div>
    );
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  const bookCardsToShow = (
    <div className="book-list">
      {books.map((book) => {
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
      {books.length ? <ul>{bookCardsToShow}</ul> : <div>Nothing found...</div>}
    </main>
  );
};
export default Books;
