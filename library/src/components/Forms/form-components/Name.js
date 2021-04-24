import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const Name = ({ fieldName }) => {
  return (
    <Form.Group controlId="formBasicName">
      <Form.Label>{fieldName}</Form.Label>
      <Form.Control type="text" placeholder={`Enter ${fieldName}`} onChange={(e) => console.log(e.target.value)} />
    </Form.Group>
  );
};

Name.propTypes = {
  fieldName: PropTypes.string.isRequired,
};

export default Name;
