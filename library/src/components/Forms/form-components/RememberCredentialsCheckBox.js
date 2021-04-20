import { Form } from 'react-bootstrap';

const RememberCredentialsCheckBox = () => {
  return (
    <Form.Group controlId="formBasicCheckbox">
      <Form.Check type="checkbox" label="Remember me" />
    </Form.Group>
  );
};

export default RememberCredentialsCheckBox;
