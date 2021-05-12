import './CreateBook.css';
import React, { useRef, useState } from "react";
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { BASE_URL } from "../../common/constants";
import validateInput from './createBookValidator';
import bookGenreEnum from '../../common/enums/book-genre.enum';
import bookLanguageEnum from '../../common/enums/book-language.enum';
import bookAgeRecommendationEnum from '../../common/enums/book-age-recommendation.enum';

const BookForm = ({ handleFormSubmit, book, setBook }) => {
  const inputRef = useRef();
  const [bookCoverUrl, setBookCoverUrl] = useState('');

  const [errors, setErrors] = useState({
    book: '',
    cover: '',
  });

  const [messages, setMessages] = useState({
    book: '',
    cover: '',
  });

  const [inputErrors, setInputErrors] = useState({
    frontCover: '',
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

  const updateBook = (prop, value) => setBook({ ...book, [prop]: value });

  const handleInput = (prop, value) => {
    setInputErrors({ ...inputErrors, [prop]: validateInput[prop](value) });
    updateBook(prop, value);
  };

  const changeCover = () => {
    inputRef.current.click();
  };

  return (
    <Form className="create-book-form" onSubmit={(event) => handleFormSubmit(event, errors, setErrors, messages, setMessages, inputErrors, setInputErrors, book.title, book.author, book.isbn, book)}>
      <div id="outcomeInfo">
        {(errors.book || errors.cover) && (
          <div id="errors" className="red">
            {errors.book && <h4 className="red">{`${errors.book}`}</h4>}
            {errors.cover && <h4 className="red">{`${errors.cover}`}</h4>}
          </div>
        )}
        {(messages.book || messages.cover) && (
          <div id="messages" className="green">
            {messages.book && <h4 className="green">{`${messages.book}`}</h4>}
            {messages.cover && <h4 className="green">{`${messages.cover}`}</h4>}
          </div>
        )}
      </div>
      <button id="bookCoverBtn" type="button" onClick={changeCover}>
        <img
          src={bookCoverUrl || `${BASE_URL}/${book.frontCover}`}
          id="book-detail-card-image"
          alt="front cover"
        />
        <img className="upload-book-cover" src={`${BASE_URL}/storage/icons/uploadCover.png`} alt="upload book cover" />
      </button>
      <input
        type="file"
        name="cover"
        ref={inputRef}
        style={{ visibility: "hidden", display: "none" }}
        onChange={(e) => {
          setBookCoverUrl(URL.createObjectURL(e.target.files[0]));
        }}
      />
      <Form.Group controlId="title" className={inputErrors.title ? 'red' : ''}>
        <Form.Label>
          {`Title ${inputErrors.title}`}
        </Form.Label>
        <Form.Control
          type="text"
          name="title"
          placeholder="Enter Title"
          value={book.title}
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="author" className={inputErrors.author ? 'red' : ''}>
        <Form.Label>
          {`Author ${inputErrors.author}`}
        </Form.Label>
        <Form.Control
          type="text"
          name="author"
          placeholder="Enter Author"
          value={book.author}
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="isbn" className={inputErrors.isbn ? 'red' : ''}>
        <Form.Label>
          {`ISBN ${inputErrors.isbn}`}
        </Form.Label>
        <Form.Control
          type="text"
          name="isbn"
          placeholder="Enter ISBN"
          value={book.isbn}
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="datePublished" className={inputErrors.datePublished ? 'red' : ''}>
        <Form.Label>
          {`Publishing Date ${inputErrors.datePublished}`}
        </Form.Label>
        <Form.Control
          type="date"
          name="datePublished"
          value={book.datePublished}
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="genre" className={inputErrors.genre ? 'red' : ''}>
        <Form.Label>
          {`Genre ${inputErrors.genre}`}
        </Form.Label>
        <Form.Control
          as="select"
          name="genre"
          defaultValue={book.genre || 'Select Genre'}
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        >
          <option value={book.genre || 'Select Genre'} disabled>
            {book.genre || 'Select Genre'}
          </option>
          {Object.keys(bookGenreEnum).map(g => <option key={bookGenreEnum[g]} value={g}>{g}</option>)}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="pages" className={inputErrors.pages ? 'red' : ''}>
        <Form.Label>
          {`Pages ${inputErrors.pages}`}
        </Form.Label>
        <Form.Control
          type="number"
          name="pages"
          placeholder="Enter Pages"
          value={book.pages}
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="language" className={inputErrors.language ? 'red' : ''}>
        <Form.Label>
          {`Language ${inputErrors.language}`}
        </Form.Label>
        <Form.Control
          as="select"
          name="language"
          defaultValue={book.language || 'Select Language'}
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        >
          <option value={book.language || 'Select Language'} disabled>
            {book.language || 'Select Language'}
          </option>
          {Object.keys(bookLanguageEnum).map(lang => <option key={bookLanguageEnum[lang]} value={lang}>{lang}</option>)}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="ageRecommendation" className={inputErrors.ageRecommendation ? 'red' : ''}>
        <Form.Label>
          {`Age Recommendation ${inputErrors.ageRecommendation}`}
        </Form.Label>
        <Form.Control
          as="select"
          name="ageRecommendation"
          defaultValue={book.ageRecommendation || 'Age Recommendation'}
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        >
          <option value={book.ageRecommendation || 'Age Recommendation'} disabled>
            {book.ageRecommendation || 'Age Recommendation'}
          </option>
          {Object.keys(bookAgeRecommendationEnum).map(ar => <option key={bookAgeRecommendationEnum[ar]} value={ar}>{ar}</option>)}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="summaryInput" id="summary" className={inputErrors.summary ? 'red' : ''}>
        <Form.Label>
          {`Summary ${inputErrors.summary}`}
        </Form.Label>
        <Form.Control
          type="text"
          name="summary"
          as="textarea"
          rows={6}
          value={book.summary}
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="createBtn" id="create">
        <Button
          type="submit"
          className="btn btn-dark btn-lg btn-block"
          disabled={(!book.title || !book.author || !book.isbn) || !Object.values(inputErrors).every(err => err === '')}
        >
          Create Book
        </Button>
      </Form.Group>
    </Form>
  );
};

BookForm.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
  book: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
  setBook: PropTypes.func.isRequired,
};

export default BookForm;
