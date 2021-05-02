import './staticPage.css';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
  const history = useHistory();

  return (
    <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/forbidden.jpg)` }} className="static-wrapper-outer">
      <div className="static-wrapper-inner">
        <div className="static-content">
          <p className="medium">Sorry, But the Page is Forbidden</p>
          <p className="large">403 ERROR</p>
          <p className="small">You do not have access to this page or resource for some reason.</p>
        </div>
        <Button
          type="submit"
          className="btn btn-dark btn-lg btn-block"
          onChange={() => history.push('/home')}
        >
          GO TO HOME PAGE
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
