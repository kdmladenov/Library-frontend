import { Form } from 'react-bootstrap';

const Email = () => {
  return (
    <Form.Group controlId="formBasicEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="Enter Email" />
    </Form.Group>
  );
};

export default Email;
