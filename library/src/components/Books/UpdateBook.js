import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { BASE_URL } from '../../common/constants';
import AuthContext, { getToken, getUser } from '../../providers/AuthContext';
import BookForm from './BookForm';

const UpdateBook = () => {
  const user = getUser();
  const { isLoggedIn } = useContext(AuthContext);
  const [book, setBook] = useState({});
  const { bookId } = useParams();
  const history = useHistory();

  console.log(bookId);
  useEffect(() => {
    if (bookId) {
      fetch(`${BASE_URL}/books/${bookId}`, {
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
        .then(res => setBook({ ...res }))
        .catch(err => {
          if (err.message === 404) {
            history.push('*');
          }
          history.push('/serviceUnavailable');
        });
    }
  }, []);

  const handleFormSubmit = () => {
    console.log(book);
  };

  return (
    <BookForm
      isLoggedIn={isLoggedIn && user.role === 'admin'}
      action="update"
      frontCover={book.frontCover}
      title={book.title}
      author={book.author}
      summary={book.summary}
      datePublished={book.datePublished}
      isbn={book.isbn}
      genre={book.genre}
      ageRecommendation={book.ageRecommendation}
      language={book.language}
      pages={book.pages}
      handleFormSubmit={handleFormSubmit}
    />
  );
};

export default UpdateBook;
