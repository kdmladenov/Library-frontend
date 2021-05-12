import './CreateBook.css';
import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { BASE_URL } from "../../common/constants";
import { getToken } from '../../providers/AuthContext';
import BookForm from './BookForm';

const CreateBook = () => {
  const [book, setBook] = useState({
    frontCover: 'storage/covers/default.png',
    title: '',
    author: '',
    summary: '',
    datePublished: '',
    isbn: '',
    genre: '',
    ageRecommendation: '',
    language: '',
    pages: '',
  });
  const history = useHistory();

  const makeRequest = (bookData, messages, setMessages, errors, setErrors, cover, data) => {
    fetch(`${BASE_URL}/books`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((res) => {
        setMessages({ ...messages, book: 'Book was successfully created!' });
        if (cover) {
          fetch(`${BASE_URL}/books/${res.bookId}/cover`, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
            body: data,
          })
            .then(resCover => {
              if (!resCover.ok) {
                throw new Error(resCover.status);
              }
              return resCover.json();
            })
            .then(() => {
              setMessages({ cover: `Book cover was successful uploaded!`, book: "Book was successfully created!" });
            });
        }
      })
      .catch(err => {
        if (err.message === '404') {
          history.push('*');
        } else if (err.message === '409') {
          setErrors({ ...errors, book: 'A book with same title or isbn already exists.' });
        } else history.push('/serviceUnavailable');
      });
  };

  return (
    <BookForm
      formType="create"
      makeRequest={makeRequest}
      book={book}
      setBook={setBook}
    />
  );
};

export default CreateBook;
