import bookGenre from '../../common/enums/book-genre.enum';
import bookLanguage from '../../common/enums/book-language.enum';
import bookAgeRecommendation from '../../common/enums/book-age-recommendation.enum';
import { bookInput } from '../../common/constants';

const validate = {
  // frontCover: '',
  title: (value) => typeof value === 'string' && value.length >= bookInput.MIN_TITLE_LENGTH && value.length <= bookInput.MAX_TITLE_LENGTH,
  author: (value) => typeof value === 'string' && value.length >= bookInput.MIN_AUTHOR_LENGTH && value.length <= bookInput.MAX_AUTHOR_LENGTH,
  isbn: (value) => typeof value === 'string' && bookInput.ISBN_REGEX.test(value),
  summary: (value) => typeof value === 'undefined' || typeof value === 'string',
  datePublished: (value) => typeof value === 'undefined' || (typeof value === 'string' && !(new Date(value).toString()).includes('Invalid') && new Date(value) > new Date(bookInput.MIN_DATE_PUBLISHED)),
  genre: (value) => typeof value === 'undefined' || Object.keys(bookGenre).includes(value),
  ageRecommendation: (value) => typeof value === 'undefined' || Object.keys(bookAgeRecommendation).includes(value),
  language: (value) => typeof value === 'undefined' || Object.keys(bookLanguage).includes(value),
  pages: (value) => typeof value === 'undefined' || typeof value === 'number',
};

const validateInput = {
  // frontCover: '',
  title: (value) => {
    if (!value) {
      return ` is required!`;
    }
    if (!validate.title(value)) {
      return '';
    }
    return '';
  },
  author: (value) => {
    if (!value) {
      return ` is required!`;
    }
    if (!validate.title(value)) {
      return '';
    }
    return '';
  },
  isbn: (value) => {
    if (!value) {
      return ` is required!`;
    }
    if (!validate.title(value)) {
      return '';
    }
    return '';
  },
  summary: (value) => {
    if (!validate.title(value)) {
      return '';
    }
    return '';
  },
  datePublished: (value) => {
    if (!validate.title(value)) {
      return '';
    }
    return '';
  },
  genre: (value) => {
    if (!validate.title(value)) {
      return '';
    }
    return '';
  },
  ageRecommendation: (value) => {
    if (!validate.title(value)) {
      return '';
    }
    return '';
  },
  language: (value) => {
    if (!validate.title(value)) {
      return '';
    }
    return '';
  },
  pages: (value) => {
    if (!validate.title(value)) {
      return '';
    }
    return '';
  },
};

export default validateInput;
