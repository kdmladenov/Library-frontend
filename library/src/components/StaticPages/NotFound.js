import './staticPage.css';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
  const history = useHistory();
  return (
    <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/error-page.jpg)` }} className="static-wrapper-outer">
      <div className="static-wrapper-inner">
        <div className="static-content">
          <p className="medium">Sorry, But the Page Was not Found</p>
          <p className="large">404 ERROR</p>
          <p className="small">You may have mistyped the address or the page may have moved.</p>
        </div>
        <Button
          type="button"
          className="btn btn-dark btn-lg btn-block"
          onClick={() => history.push('/home')}
        >
          GO TO HOME PAGE
        </Button>
      </div>
    </div>

  );
};

export default NotFound;
