import React, { useState, useEffect } from "react";
import server from "../../constants/server";
// import BookDetails from "./BookDetails";
// import booksData from "../../data/booksData";
import Loading from "../UI/Loading";
import BookCard from "./BookCard";

import BookCardDetailed from "./BookCardDetailed";

const BookDetailedView = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    fetch(`${server.baseURL}/books`, {
      method: "GET",
      headers: {
        Authorization: server.headers.Authorization,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          throw new Error(result.message);
        }
        setBooks(result);
      })
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
    return (
      <div>
        <Loading>
          <h1>error...</h1>
        </Loading>
      </div>
    );
  }

  const singleBook = (bookId) => {
    const filtered = books.filter((b) => b.bookId === bookId);
    setBooks(filtered);
  };

  // const allBooks = () => {
  //   setBooks(booksData);
  // };

  const bookCardDetailedToShow = books.map((book) => {
    return books.length === 1 ? (
      <BookCardDetailed
        key={book.bookId}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...book}
      />
    ) : (
      <BookCard
        key={book.bookId}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...book}
        singleBook={() => singleBook(book.bookId)}
      />
    );
  });

  return (
    <div>
      <div className="book-card-detailed-view">{bookCardDetailedToShow}</div>
    </div>
  );
};
export default BookDetailedView;
