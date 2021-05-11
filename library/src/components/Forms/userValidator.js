import { userInput } from '../../common/constants';
import genderEnum from '../../common/enums/gender.enum';

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
  gender: value => typeof value === 'undefined' || Object.keys(genderEnum).includes(value),
  birthDate: value => typeof value === 'undefined' || (new Date(value).toString() !== 'Invalid Date' && typeof value === 'string' && value.length > 0),
  email: value => typeof value === 'string' && value.length <= userInput.MAX_EMAIL_LENGTH && value.match(userInput.EMAIL_REGEX),
  reenteredEmail: (value, match) => value === match,
  phone: value => typeof value === 'undefined' || (typeof value === 'string' && value.match(userInput.PHONE_REGEX)),
};

const validateInput = {
  username: value => {
    if (!value) {
      return ` is required!`;
    }
    if (!validate.username(value)) {
      return ` must be between ${userInput.MIN_USERNAME_LENGTH} and ${userInput.MAX_USERNAME_LENGTH} characters`;
    }
    return '';
  },

  email: value => {
    if (!value) {
      return ` is required!`;
    }
    if (!validate.email(value)) {
      return ` must be valid`;
    }
    return '';
  },

  reenteredEmail: (value, match) => {
    if (!value) {
      return ` is required!`;
    }
    if (!validate.reenteredEmail(value, match)) {
      return ` does not match`;
    }
    return '';
  },

  password: value => {
    if (!value) {
      return ` is required!`;
    }
    if (!validate.password.length(value)) {
      return `must be between ${userInput.MIN_PASSWORD_LENGTH} and ${userInput.MAX_PASSWORD_LENGTH} characters`;
    }
    if (!validate.password.lowerCase(value)) {
      return ' must include a lowercase letter';
    }
    if (!validate.password.upperCase(value)) {
      return ' must include an uppercase letter';
    }
    if (!validate.password.digit(value)) {
      return ' must include a digit';
    }
    return '';
  },

  reenteredPassword: (value, match) => {
    if (!value) {
      return ` is required!`;
    }
    if (!validate.reenteredPassword(value, match)) {
      return ` does not match`;
    }
    return '';
  },

  currentPassword: value => {
    if (!value) {
      return ` is required!`;
    }
    if (!validate.password.length(value)) {
      return `must be between ${userInput.MIN_PASSWORD_LENGTH} and ${userInput.MAX_PASSWORD_LENGTH} characters`;
    }
    if (!validate.password.lowerCase(value)) {
      return ' must include a lowercase letter';
    }
    if (!validate.password.upperCase(value)) {
      return ' must include an uppercase letter';
    }
    if (!validate.password.digit(value)) {
      return ' must include a digit';
    }
    return '';
  },

  firstName: value => {
    if (!validate.firstName(value)) {
      return ` must be between ${userInput.MIN_FIRSTNAME_LENGTH} and ${userInput.MAX_FIRSTNAME_LENGTH} characters`;
    }
    return '';
  },

  lastName: value => {
    if (!validate.lastName(value)) {
      return ` must be between ${userInput.MIN_LASTNAME_LENGTH} and ${userInput.MAX_LASTNAME_LENGTH} characters`;
    }
    return '';
  },

  phone: value => {
    if (!validate.phone(value)) {
      return ` must be valid`;
    }
    return '';
  },

  birthDate: value => {
    if (!validate.birthDate(value)) {
      return ` must be valid date`;
    }
    return '';
  },

  gender: value => {
    if (!validate.gender(value)) {
      return ` could be 'male', 'female' or 'other'`;
    }
    return '';
  },
};

export default validateInput;
