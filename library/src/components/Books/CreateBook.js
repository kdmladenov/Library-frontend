/* eslint-disable no-nested-ternary */
// import './BookCardDetailed.css';
import './CreateBook.css';
import React, { useRef, useState } from "react";
import { Button, Form } from 'react-bootstrap';
import { BASE_URL } from "../../common/constants";
import validateInput from './createBookValidator';
import bookGenreEnum from '../../common/enums/book-genre.enum';
import bookLanguageEnum from '../../common/enums/book-language.enum';
import bookAgeRecommendationEnum from '../../common/enums/book-age-recommendation.enum';

const CreateBook = () => {
  const inputRef = useRef();
  const [errors, setErrors] = useState(null);
  const [messages, setMessages] = useState(null);
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

  const handleInput = (prop, value, match) => {
    setInputErrors({ ...inputErrors, [prop]: validateInput[prop](value, match) });
    updateBook(prop, value);
    setErrors({ book: '', cover: '' });
    setMessages({ book: '', cover: '' });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  console.log(errors);
  console.log(messages);

  return (
    <Form className="create-book-form" onSubmit={handleFormSubmit}>
      <img
        src={`${BASE_URL}/${book.frontCover}`}
        id="book-detail-card-image"
        alt="front cover"
      />
      <input
        type="file"
        name="cover"
        ref={inputRef}
        style={{ visibility: "hidden", display: "none" }}
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
          type="number"
          name="isbn"
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
          placeholder="Genre"
          name="genre"
          defaultValue={book.genre || 'Select Genre'}
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        >
          {/* <option value={book.genre} disabled>
                  {user.gender ? user.gender : 'Select Gender'}
                </option> */}
          {Object.keys(bookGenreEnum).map(genre => <option key={bookGenreEnum[genre]} value={genre}>{genre}</option>)}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="pages" className={inputErrors.pages ? 'red' : ''}>
        <Form.Label>
          {`Pages ${inputErrors.pages}`}
        </Form.Label>
        <Form.Control
          type="number"
          name="pages"
          value={book.pages}
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="genre" className={inputErrors.language ? 'red' : ''}>
        <Form.Label>
          {`Language ${inputErrors.language}`}
        </Form.Label>
        <Form.Control
          as="select"
          placeholder="Language"
          name="language"
          defaultValue={book.language || 'Select Language'}
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        >
          {/* <option value={book.language} disabled>
                  {book.language ? book.language : 'Select Language'}
                </option> */}
          {Object.keys(bookLanguageEnum).map(language => <option key={bookLanguageEnum[language]} value={language}>{language}</option>)}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="genre" className={inputErrors.ageRecommendation ? 'red' : ''}>
        <Form.Label>
          {`Age Recommendation ${inputErrors.ageRecommendation}`}
        </Form.Label>
        <Form.Control
          as="select"
          placeholder="Age Recommendation"
          name="ageRecommendation"
          defaultValue={book.ageRecommendation || 'Age Recommendation'}
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        >
          {/* <option value={book.ageRecommendation} disabled>
                  {book.ageRecommendation ? book.ageRecommendation : 'Age Recommendation'}
                </option> */}
          {Object.keys(bookAgeRecommendationEnum).map(ageRecommendation => <option key={bookAgeRecommendationEnum[ageRecommendation]} value={ageRecommendation}>{ageRecommendation}</option>)}
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
          rows={3}
          value={book.summary}
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="createBtn" id="create">
        <Button
          type="submit"
          className="btn btn-dark btn-lg btn-block"
        >
          Create Book
        </Button>
      </Form.Group>
    </Form>
  );
};

export default CreateBook;
