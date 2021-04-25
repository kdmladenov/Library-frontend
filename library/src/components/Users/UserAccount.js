import './UserAccount.css';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const UserAccount = ({ children }) => {
  return (
    <div className="outer" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/user-account.jpg)` }}>
      <div className="container">
        <div className="row gutters">
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
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
                      <Button className="btn btn-dark btn-lg btn-block">
                        View Profile
                      </Button>
                    </Form.Group>
                    <Form.Group>
                      <Button className="btn btn-dark btn-lg btn-block">
                        Edit Profile
                      </Button>
                    </Form.Group>
                    <Form.Group>
                      <Button className="btn btn-dark btn-lg btn-block">
                        Change Password
                      </Button>
                    </Form.Group>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">

            {children}

          </div>
        </div>
      </div>
    </div>
  );
};

UserAccount.propTypes = {
  children: PropTypes.func.isRequired,
};

export default UserAccount;
