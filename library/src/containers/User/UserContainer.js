import './UserContainer.css';
import PropTypes from 'prop-types';
import UserNavigation from '../../components/User/UserNavigation';

const UserContainer = ({ children }) => {
  return (
    <div className="outer" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/user-account.jpg)` }}>
      <div className="container">
        <div className="row gutters">
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <UserNavigation />
              {/* <div>Avatar</div> */}
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

UserContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  // setContent: PropTypes.func.isRequired,
};

export default UserContainer;
