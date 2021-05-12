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

  const handleFormSubmit = (event, errors, setErrors, messages, setMessages, inputErrors, setInputErrors, title, author, isbn, bookData) => {
    event.preventDefault();

    if (!title) {
      setInputErrors({ ...inputErrors, title: ' is required' });
    }
    if (!author) {
      setInputErrors({ ...inputErrors, author: ' is required' });
    }
    if (!isbn) {
      setInputErrors({ ...inputErrors, isbn: ' is required' });
    }
    setErrors({ book: '', cover: '' });
    setMessages({ book: '', cover: '' });
    const data = new FormData();
    const cover = document.querySelector('input[type="file"]').files[0];
    data.append("cover", cover);

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
            })
            .catch(err => {
              if (err.message === '404') {
                history.push('*');
              }
              if (err.message.startsWith('5')) {
                history.push('/serviceUnavailable');
              }
            });
        }
      })
      .catch(err => {
        if (err.message.startsWith('5')) {
          history.push('/serviceUnavailable');
        }
        if (err.message === '404') {
          history.push('*');
        }
        if (err.message === '409') {
          setErrors({ ...errors, book: 'A book with same title or isbn already exists.' });
        }
      });
  };

  return (
    <BookForm
      action="create"
      handleFormSubmit={handleFormSubmit}
      book={book}
      setBook={setBook}
    />
  );
};

export default CreateBook;
