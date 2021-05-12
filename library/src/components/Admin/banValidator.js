import { banValidation } from '../../common/constants';

const validate = {
  duration: value => value >= banValidation.MIN_BAN_DURATION && value <= banValidation.MAX_BAN_DURATION,
  description: value => typeof value === 'string' && value.length >= banValidation.MIN_DESCRIPTION_LENGTH,
};

const validateInput = {
  // frontCover: '',
  duration: (value) => {
    if (!value) {
      return ` is required!`;
    }
    if (!validate.duration(value)) {
      return ` must be between ${banValidation.MIN_BAN_DURATION} and ${banValidation.MAX_BAN_DURATION} days`;
    }
    return '';
  },

  description: (value) => {
    if (!value) {
      return ` is required!`;
    }
    if (!validate.description(value)) {
      return ` must be between at least ${banValidation.MIN_DESCRIPTION_LENGTH} characters`;
    }
  },
};

export default validateInput;
