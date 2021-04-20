import Name from './form-components/Name';
import Password from './form-components/Password';
import RememberCredentialsCheckBox from './form-components/RememberCredentialsCheckBox';
import SubmitBtn from './form-components/SubmitBtn';

const LoginForm = () => {
  return (
    <div className="form-wrapper-outer">
      <div className="form-wrapper-inner">
        <form>
          <h3>Log in</h3>
          <Name fieldName="Username" />
          <Password />
          <RememberCredentialsCheckBox />
          <SubmitBtn btnText="Submit" />
          <div className="form-group">
            <p className="forgot-password text-right">
              Forgot Your Password
            </p>
          </div>
        </form>
      </div>
    </div>

  );
};

export default LoginForm;
