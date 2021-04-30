import { Button, Form } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserNavigation = () => {
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
              // onClick={() => setContent('timeline')}
            >
              <Link to="/user/timeline">Timeline</Link>
            </Button>
          </Form.Group>
          <Form.Group>
            <Button
              className="btn btn-dark btn-lg btn-block"
              // onClick={() => setContent('profile')}
            >
              <Link to="/user/profile">Profile</Link>
            </Button>
          </Form.Group>
          <Form.Group>
            <Button
              className="btn btn-dark btn-lg btn-block"
              // onClick={() => setContent('changePassword')}
            >
              <Link to="/user/changePassword">Change Password</Link>
            </Button>
          </Form.Group>
        </div>
      </div>
    </div>
  );
};

// UserNavigation.propTypes = {
//   setContent: PropTypes.func.isRequired,
// };
export default UserNavigation;
