import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { BASE_URL } from '../../common/constants';
import { getToken } from '../../providers/AuthContext';
import BookForm from './BookForm';

const UpdateBook = () => {
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
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetch(`${BASE_URL}/books/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(res => {
        setBook({ ...res });
      })
      .catch(err => {
        if (err.message === '404') {
          history.push('*');
        }
        history.push('/serviceUnavailable');
      });
  }, []);

  const makeRequest = (bookData, messages, setMessages, errors, setErrors, cover, data) => {
    fetch(`${BASE_URL}/books/${id}`, {
      method: "PUT",
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
        setMessages({ ...messages, book: 'Book was successfully updated!' });
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
              setMessages({ cover: `Book cover was successful uploaded!`, book: "Book was successfully updated!" });
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
      formType="update"
      makeRequest={makeRequest}
      book={book}
      setBook={setBook}
    />
  );
};

export default UpdateBook;
