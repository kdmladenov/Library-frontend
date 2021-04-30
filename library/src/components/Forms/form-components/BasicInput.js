import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const BasicInput = ({
  text, name, type, value, onChange,
}) => {
  return (
    <Form.Group controlId="formBasicInput">
      <Form.Label>{text}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        placeholder={`Enter ${text}`}
        value={value}
        onChange={(e) => onChange(e)}
      />
    </Form.Group>
  );
};

BasicInput.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.element.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default BasicInput;
