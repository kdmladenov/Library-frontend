export const userInput = {
  MIN_USERNAME_LENGTH: 2,
  MAX_USERNAME_LENGTH: 20,
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 20,
  MIN_FIRSTNAME_LENGTH: 2,
  MAX_FIRSTNAME_LENGTH: 20,
  MIN_LASTNAME_LENGTH: 2,
  MAX_LASTNAME_LENGTH: 20,
  MIN_EMAIL_LENGTH: 4,
  MAX_EMAIL_LENGTH: 50,
  EMAIL_REGEX: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
  // need further validation of the phone - regex!!!
  PHONE_REGEX: /^\(?(0[0-9]{3})\)?[-\s]?([0-9]{3})[-\s]?([0-9]{3})$/,
  PASSWORD_REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/, // letters, numbers and at least 1 uppercase
};

export const BASE_URL = "http://localhost:5555";

export const bookColumnsOptions = [
  {
    label: "Title",
    value: "title",
  },
  {
    label: "Book ID",
    value: "bookId",
  },
  {
    label: "Author",
    value: "author",
  },
  {
    label: "Date of Publishing",
    value: "datePublished",
  },
  {
    label: "ISBN",
    value: "isbn",
  },
  {
    label: "Borrowed Until",
    value: "borrowedUntil",
  },
  {
    label: "Genre",
    value: "genre",
  },
  {
    label: "Age Recommendation",
    value: "ageRecommendation",
  },
  {
    label: "Language",
    value: "language",
  },
  {
    label: "Pages",
    value: "pages",
  },
  {
    label: "Summary",
    value: "summary",
  },
  {
    label: "Is the book borrowed",
    value: "isBorrowed",
  },
  {
    label: "Is the book deleted",
    value: "isDeleted",
  },
  {
    label: "Number of reviews",
    value: "reviewCount",
  },
  {
    label: "Book Rating",
    value: "bookRating",
  },
];

export const readingPoints = {
  RETURN_ON_TIME: 5,
  RETURN_LATE_MULTIPLIER: -0.2,
  POST_REVIEW: 15,
  GET_BANNED_MULTIPLIER: -0.2,
  WELCOME: 15,
};

export const sortDirections = [
  {
    label: "Asc",
    value: "asc",
  },
  {
    label: "Desc",
    value: "desc",
  },
];

export const totalBooksNumber = 11;
