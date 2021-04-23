import './errorPage.css';
import { Button } from 'react-bootstrap';

const NotFound = () => {
  const navigateToHome = () => {
    // navigate to Home Page
  };

  return (
    <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/forbidden.jpg)` }} className="error-wrapper-outer">
      <div className="error-wrapper-inner">
        <div className="error-content">
          <p className="medium">Sorry, But the Page is Forbidden</p>
          <p className="large">403 ERROR</p>
          <p className="small">You do not have access to this page or resource for some reason.</p>
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

export default NotFound;
