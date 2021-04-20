/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';

const Name = ({ fieldName }) => {
  const placeholderValue = `Enter ${fieldName}`;
  return (
    <div className="form-group">
      <label htmlFor="name">
        {fieldName}
        <input
          id="name"
          type="input"
          className="form-control"
          placeholder={placeholderValue}
        />
      </label>
    </div>
  );
};

Name.propTypes = {
  fieldName: PropTypes.string,
};

export default Name;
