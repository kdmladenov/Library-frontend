import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const Password = ({ fieldName }) => {
  const placeholderValue = `${fieldName} Password`;
  return (
    <Form.Group controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder={placeholderValue} />
    </Form.Group>
  );
};

Password.propTypes = {
  fieldName: PropTypes.string.isRequired,
};

export default Password;
