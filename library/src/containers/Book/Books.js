/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import './Books.css';
import { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Sort from '../../components/Sort/Sort';
import Paging from "../../components/Paging/Paging";
import BookCard from '../../components/Books/BookCard';
import useHttp from '../../hooks/useHttp';
import { BASE_URL } from '../../common/constants';
import AuthContext from '../../providers/AuthContext';

const Books = (props) => {
  const { isLoggedIn } = useContext(AuthContext);
  const history = useHistory();
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
    <div className="books-container-outer">
      <div className="books-container-inner">
        <div className="books-container-header">
          <Form className="sorting">
            <div>Sorting Options</div>
            <Sort />
          </Form>
          {isLoggedIn && <Button className="create-book-btn btn-success" onClick={() => history.push('/home')}>Create Book</Button>}
        </div>
        {data.length ? <ul>{bookCardsToShow}</ul> : <h2> No books are found... </h2>}
        <div id="paging-books">
          <Paging />
        </div>
      </div>
    </div>
  );
};
export default Books;
