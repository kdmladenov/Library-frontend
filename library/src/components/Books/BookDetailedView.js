import React, { useState } from "react";
// import BookDetails from "./BookDetails";
import booksData from "../../data/booksData";

import BookCardDetailed from "./BookCardDetailed";

const BookDetailedView = () => {
  const [books, setBooks] = useState(booksData);

  const singleBook = (bookId) => {
    const filtered = books.filter((b) => b.bookId === bookId);
    setBooks(filtered);
  };

  // const allBooks = () => {
  //   setBooks(booksData);
  // };

  const bookCardDetailedToShow = books.map((book) => {
    return (
      <BookCardDetailed
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
