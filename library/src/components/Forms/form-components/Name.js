import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const Name = ({ fieldName }) => {
  const placeholderValue = `Enter ${fieldName}`;
  return (
    <Form.Group>
      <Form.Label>{fieldName}</Form.Label>
      <Form.Control type="text" placeholder={placeholderValue} />
    </Form.Group>
  );
};

Name.propTypes = {
  fieldName: PropTypes.string.isRequired,
};

export default Name;
