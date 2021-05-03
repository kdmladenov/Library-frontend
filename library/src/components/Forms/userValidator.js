import { userInput } from '../../common/constants';

const validate = {
  username: value => typeof value === 'string' && value.length >= userInput.MIN_USERNAME_LENGTH && value.length <= userInput.MAX_USERNAME_LENGTH,
  password: {
    length: value => typeof value === 'string' && value.length >= userInput.MIN_PASSWORD_LENGTH && value.length <= userInput.MAX_PASSWORD_LENGTH,
    upperCase: value => (/[A-Z]/.test(value)),
    lowerCase: value => (/[a-z]/.test(value)),
    digit: value => (/[\d]/.test(value)),
  },
  reenteredPassword: (value, match) => value === match,
  firstName: value => typeof value === 'undefined' || (typeof value === 'string' && value.length >= userInput.MIN_FIRSTNAME_LENGTH && value.length <= userInput.MAX_FIRSTNAME_LENGTH),
  lastName: value => typeof value === 'undefined' || (typeof value === 'string' && value.length >= userInput.MIN_LASTNAME_LENGTH && value.length <= userInput.MAX_LASTNAME_LENGTH),
  gender: value => typeof value === 'undefined' || Object.keys({ male: 'male', female: 2, other: 3 }).includes(value),
  birthDate: value => typeof value === 'undefined' || (new Date(value).toString() !== 'Invalid Date' && typeof value === 'string' && value.length > 0),
  email: value => typeof value === 'string' && value.length <= userInput.MAX_EMAIL_LENGTH && value.match(userInput.EMAIL_REGEX),
  reenteredEmail: (value, match) => value === match,
  phone: value => typeof value === 'undefined' || (typeof value === 'string' && value.match(userInput.PHONE_REGEX)),
};

export const validateUsername = (value, setError) => {
  if (!value) {
    setError(` is required!`);
  } else if (!validate.username(value)) {
    setError(` must be between ${userInput.MIN_USERNAME_LENGTH} and ${userInput.MAX_USERNAME_LENGTH} characters`);
  } else {
    setError('');
  }
};

export const validateEmail = (value, setError) => {
  if (!value) {
    setError(` is required!`);
  } else if (!validate.email(value)) {
    setError(` must be valid`);
  } else {
    setError('');
  }
};

export const validateReenteredEmail = (value, match, setError) => {
  if (!value) {
    setError(` is required!`);
  } else if (!validate.reenteredEmail(value, match)) {
    setError(` does not match`);
  } else {
    setError('');
  }
};

export const validatePassword = (value, setError) => {
  if (!value) {
    setError(` is required!`);
  } else if (!validate.password.length(value)) {
    setError(`must be between ${userInput.MIN_PASSWORD_LENGTH} and ${userInput.MAX_PASSWORD_LENGTH} characters`);
  } else if (!validate.password.lowerCase(value)) {
    setError(' must include a lowercase letter');
  } else if (!validate.password.upperCase(value)) {
    setError(' must include an uppercase letter');
  } else if (!validate.password.digit(value)) {
    setError(' must include a digit');
  } else {
    setError('');
  }
};

export const validateReenteredPassword = (value, match, setError) => {
  if (!value) {
    setError(` is required!`);
  } else if (!validate.reenteredPassword(value, match)) {
    setError(` does not match`);
  } else {
    setError('');
  }
};

export const validateFirstName = (value, setError) => {
  if (validate.firstName(value)) {
    setError('');
  } else {
    setError(` must be between ${userInput.MIN_FIRSTNAME_LENGTH} and ${userInput.MAX_FIRSTNAME_LENGTH} characters`);
  }
};

export const validateLastName = (value, setError) => {
  if (validate.lastName(value)) {
    setError('');
  } else {
    setError(` must be between ${userInput.MIN_LASTNAME_LENGTH} and ${userInput.MAX_LASTNAME_LENGTH} characters`);
  }
};

export const validatePhone = (value, setError) => {
  if (validate.phone(value)) {
    setError('');
  } else {
    setError(` must be valid`);
  }
};

export const validateBirthDate = (value, setError) => {
  if (validate.birthDate(value)) {
    setError('');
  } else {
    setError(` must be valid`);
  }
};

export const validateGender = (value, setError) => {
  if (validate.gender(value)) {
    setError('');
  } else {
    setError(` could be 'male', 'female' or 'other'`);
  }
};
