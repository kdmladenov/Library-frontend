// Service is Temporary Unavailable

// 503 ERROR
// Sorry, we're offline right now to make our site even better.
// Please, come back later and check what we've been up to.
import './errorPage.css';
import { Button } from 'react-bootstrap';

const ServiceUnavailable = () => {
  const navigateToHome = () => {
    // navigate to Home Page
  };

  return (
    <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/ServiceUnavailable.jpeg)` }} className="error-wrapper-outer">
      <div className="error-wrapper-inner">
        <div className="error-content">
          <p className="medium">Service is Temporary Unavailable</p>
          <p className="large">503 ERROR</p>
          <p className="small">
            Sorry, we are offline right now to make our site even better.
            Please, come back later and check what we have been up to.
          </p>
        </div>
        <Button
          type="submit"
          className="btn btn-dark btn-lg btn-block"
          onChange={() => navigateToHome()}
        >
          GO TO HOME PAGE
        </Button>
      </div>
    </div>

  );
};

export default ServiceUnavailable;
