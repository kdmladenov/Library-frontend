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
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    fetch(`${BASE_URL}/books/${params.id}`, {
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
        if (err.message === 404) {
          history.push('*');
        }
        history.push('/serviceUnavailable');
      });
  }, [params.bookId]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(book);
  };

  return (
    <BookForm
      action="update"
      handleFormSubmit={handleFormSubmit}
      book={book}
      setBook={setBook}
    />
  );
};

export default UpdateBook;
