import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const UserAccountNavigation = ({ setContent }) => {
  return (
    <div className="card-body">
      <div className="account-settings">
        <div className="user-profile">
          <div className="user-avatar">
            <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Maxwell Admin" />
          </div>
          <h4 className="user-name">Username</h4>
        </div>
        <div className="about">
          <Form.Group>
            <Button
              className="btn btn-dark btn-lg btn-block"
              onClick={() => setContent('timeline')}
            >
              View Profile
            </Button>
          </Form.Group>
          <Form.Group>
            <Button
              className="btn btn-dark btn-lg btn-block"
              onClick={() => setContent('editProfile')}
            >
              Edit Profile
            </Button>
          </Form.Group>
          <Form.Group>
            <Button
              className="btn btn-dark btn-lg btn-block"
              onClick={() => setContent('changePassword')}
            >
              Change Password
            </Button>
          </Form.Group>
        </div>
      </div>
    </div>
  );
};

UserAccountNavigation.propTypes = {
  setContent: PropTypes.func.isRequired,
};
export default UserAccountNavigation;
