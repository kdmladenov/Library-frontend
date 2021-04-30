import { userInput } from '../../common/constants';

export default {
  username: value => typeof value === 'string' && value.length >= userInput.MIN_USERNAME_LENGTH && value.length <= userInput.MAX_USERNAME_LENGTH,
  password: {
    length: value => typeof value === 'string' && value.length >= userInput.MIN_PASSWORD_LENGTH && value.length <= userInput.MAX_PASSWORD_LENGTH,
    upperCase: value => (/[A-Z]/.test(value)),
    lowerCase: value => (/[a-z]/.test(value)),
    digit: value => (/[\d]/.test(value)),
  },
  firstName: value => typeof value === 'undefined' || (typeof value === 'string' && value.length >= userInput.MIN_FIRSTNAME_LENGTH && value.length <= userInput.MAX_FIRSTNAME_LENGTH),
  lastName: value => typeof value === 'undefined' || (typeof value === 'string' && value.length >= userInput.MIN_LASTNAME_LENGTH && value.length <= userInput.MAX_LASTNAME_LENGTH),
  // gender: value => typeof value === 'undefined' || Object.keys(gender).includes(value),
  birthDate: value => typeof value === 'undefined' || (new Date(value).toString() !== 'Invalid Date' && typeof value === 'string' && value.length > 0),
  email: value => typeof value === 'string' && value.length <= userInput.MAX_EMAIL_LENGTH && value.match(userInput.EMAIL_REGEX),
  phone: value => typeof value === 'undefined' || (typeof value === 'string' && value.match(userInput.PHONE_REGEX)),
};
