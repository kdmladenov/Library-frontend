/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import './Books.css';
import { Form, Button } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import Sort from '../../components/Sort/Sort';
import Paging from "../../components/Paging/Paging";
import BookCard from '../../components/Books/BookCard';
import useHttp from '../../hooks/useHttp';
import { BASE_URL } from '../../common/constants';
import { getUser } from '../../providers/AuthContext';

const Books = () => {
  const user = getUser();
  const history = useHistory();
  const { search: query } = useLocation();
  const { data, setLocalData, error } = useHttp( // removed loading to fix sort
    `${BASE_URL}/books${query}`,
    "GET",
    [],
  );

  // if (loading) {
  //   return <Loading />;
  // }

  if (error === '404') {
    history.push('*');
  } else if (error) {
    history.push('/serviceUnavailable');
  }

  const bookCardsToShow = (
    <div className="book-list">
      {data.map((book) => {
        return (
          <BookCard
            key={book.bookId}
            {...book}
            adminButtonsAreVisible={user.role === 'admin'}
            updateBooks={setLocalData}
            books={data}
            goToDetails={() => history.push(`/books/${book.bookId}`)}
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
            <Sort resource="/books" />
          </Form>
          {user.role === 'admin' && <Button className="create-book-btn btn-success" onClick={() => history.push('/books/create')}>Create Book</Button>}
        </div>
        {data.length ? <ul>{bookCardsToShow}</ul> : <h2> No books are found... </h2>}
        <div id="paging-books">
          <Paging resource="/books" />
        </div>
      </div>
    </div>
  );
};

export default Books;
