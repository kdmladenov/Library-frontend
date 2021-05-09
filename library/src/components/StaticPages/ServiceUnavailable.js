import './staticPage.css';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const ServiceUnavailable = () => {
  const history = useHistory();

  return (
    <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/ServiceUnavailable.jpeg)` }} className="static-wrapper-outer">
      <div className="static-wrapper-inner">
        <div className="static-content">
          <p className="medium">Service is Temporary Unavailable</p>
          <p className="large">503 ERROR</p>
          <p className="small">
            Sorry, we are offline right now to make our site even better.
            Please, come back later and check what we have been up to.
          </p>
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

export default ServiceUnavailable;
