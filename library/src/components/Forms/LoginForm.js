import './forms.css';
import { Form } from 'react-bootstrap';
import Name from './form-components/Name';
import Password from './form-components/Password';
import RememberCredentialsCheckBox from './form-components/RememberCredentialsCheckBox';
import SubmitBtn from './form-components/SubmitBtn';

const LoginForm = () => {
  return (
    <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/an_open_book.png)` }} className="form-wrapper-outer">
      <div className="form-wrapper-inner">
        <Form>
          <h3>Log in</h3>
          <Name fieldName="Username" />
          <Password fieldName="Enter" />
          <RememberCredentialsCheckBox />
          <SubmitBtn btnText="Submit" />
          <Form.Group>
            <p className="forgot-password text-right">
              Forgot Your Password
            </p>
          </Form.Group>
        </Form>
      </div>
    </div>

  );
};

export default LoginForm;
