import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const Password = ({ fieldName }) => {
  return (
    <Form.Group controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder={`${fieldName} Password`} />
    </Form.Group>
  );
};

Password.propTypes = {
  fieldName: PropTypes.string.isRequired,
};

export default Password;
