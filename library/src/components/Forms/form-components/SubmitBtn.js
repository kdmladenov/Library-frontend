/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';

const SubmitBtn = ({ btnText }) => {
  return (
    <div className="form-group">
      <button type="submit" className="btn btn-dark btn-lg btn-block">
        {btnText}
      </button>
    </div>
  );
};

SubmitBtn.propTypes = {
  btnText: PropTypes.string,
};
export default SubmitBtn;
