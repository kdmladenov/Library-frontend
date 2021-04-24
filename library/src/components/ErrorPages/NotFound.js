import './errorPage.css';
import { Button } from 'react-bootstrap';

const NotFound = () => {
  const navigateToHome = () => {
    // navigate to Home Page
  };

  return (
    <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/error-page.jpg)` }} className="error-wrapper-outer">
      <div className="error-wrapper-inner">
        <div className="error-content">
          <p className="medium">Sorry, But the Page Was not Found</p>
          <p className="large">404 ERROR</p>
          <p className="small">You may have mistyped the address or the page may have moved.</p>
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
