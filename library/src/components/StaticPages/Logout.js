/* eslint-disable react/prop-types */
import './staticPage.css';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Logout = ({
  message1, message2, buttonText, linkTo,
}) => {
  const history = useHistory();
  return (
    <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/forms.png)` }} className="static-wrapper-outer">
      <div className="static-wrapper-inner">
        <div className="static-content">
          <p className="medium">{message1}</p>
          <p className="medium">Goodbye</p>
          <p className="small">{message2}</p>
        </div>
        <Button
          className="btn btn-dark btn-lg btn-block"
          onClick={() => history.push(linkTo)}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default Logout;
