import './staticPage.css';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Logout = () => {
  const history = useHistory();
  return (
    <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/forms.png)` }} className="static-wrapper-outer">
      <div className="static-wrapper-inner">
        <div className="static-content">
          <p className="medium">You have successfully logged out.</p>
          <p className="medium">Goodbye</p>
          <p className="small">Thank You for visiting our site. We hope to see soon again!</p>
        </div>
        <Button
          className="btn btn-dark btn-lg btn-block"
          onClick={() => history.push('/login')}
        >
          LOGIN AGAIN
        </Button>
      </div>
    </div>
  );
};

export default Logout;
