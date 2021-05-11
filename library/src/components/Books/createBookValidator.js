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
  pages: (value) => typeof value === 'undefined' || (bookInput.NUMBERS_ONLY_REGEX.test(value) && value >= bookInput.MIN_PAGES_COUNT && value <= bookInput.MAX_PAGES_COUNT),
};

const validateInput = {
  // frontCover: '',
  title: (value) => {
    if (!value) {
      return ` is required!`;
    }
    if (!validate.title(value)) {
      return ` must be between ${bookInput.MIN_TITLE_LENGTH} and ${bookInput.MAX_TITLE_LENGTH} characters`;
    }
    return '';
  },
  author: (value) => {
    if (!value) {
      return ` is required!`;
    }
    if (!validate.author(value)) {
      return ` must be between ${bookInput.MIN_AUTHOR_LENGTH} and ${bookInput.MAX_AUTHOR_LENGTH} characters`;
    }
    return '';
  },
  isbn: (value) => {
    if (!value) {
      return ` is required!`;
    }
    if (!validate.isbn(value)) {
      return ' must number in range 3 to 10 digits';
    }
    return '';
  },
  summary: (value) => {
    if (!validate.summary(value)) {
      return 'must be valid text';
    }
    return '';
  },
  datePublished: (value) => {
    if (!validate.datePublished(value)) {
      return ' must be later than 1900 year';
    }
    return '';
  },
  genre: (value) => {
    if (!validate.genre(value)) {
      return ' must be valid';
    }
    return '';
  },
  ageRecommendation: (value) => {
    if (!validate.ageRecommendation(value)) {
      return ' must be valid';
    }
    return '';
  },
  language: (value) => {
    if (!validate.language(value)) {
      return ' must be valid';
    }
    return '';
  },
  pages: (value) => {
    if (!validate.pages(value)) {
      return ` must be number in range ${bookInput.MIN_PAGES_COUNT} and ${bookInput.MAX_PAGES_COUNT}`;
    }
    return '';
  },
};

export default validateInput;
