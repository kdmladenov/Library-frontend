import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { BASE_URL } from '../../common/constants';
import { getToken } from '../../providers/AuthContext';
import validateInput from './banValidator';
// import Loading from '../UI/Loading';

const BanUser = () => {
  const history = useHistory();
  const { userId } = useParams();
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [banData, setData] = useState({
    description: '',
    duration: '',
  });

  const [inputErrors, setInputErrors] = useState({
    description: '',
    duration: '',
  });

  const updateBanData = (prop, value) => setData({ ...banData, [prop]: value });

  const handleInput = (prop, value, match) => {
    setInputErrors({ ...inputErrors, [prop]: validateInput[prop](value, match) });
    updateBanData(prop, value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // setLoading(true);
    console.log(userId);
    fetch(`${BASE_URL}/users/${userId}/ban`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(banData),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(res => {
        console.log(inputErrors);
        setError('');
        setMessage(res.message);
        // setLoading(false);
      })
      .catch(err => {
        if (err.message === '400') {
          setMessage('');
          setError(`Unsuccessful attempt!`);
        } else if (err.message === '404') {
          history.push('*');
        } else history.push('/serviceUnavailable');
      });
  };

  const liftBan = () => {

  };

  // if (loading) {
  //   return (
  //     <div>
  //       <Loading>
  //         <h1>Loading...</h1>
  //       </Loading>
  //     </div>
  //   );
  // }

  console.log(!banData.description || !banData.duration || !(Object.values(inputErrors).some(e => e !== '')));

  return (
    <div className="card h-100">
      <Form className="card-body change-password" onSubmit={handleFormSubmit}>
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            {error && (
              <Form.Group className="red">
                <h4>{`${error}`}</h4>
              </Form.Group>
            )}
            {message && (
              <Form.Group className="green">
                <h4>{`${message}`}</h4>
              </Form.Group>
            )}
            <h3 className="mb-3">Ban User</h3>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <Form.Group controlId="FormGridCurrentPassword" className={inputErrors.duration ? 'red' : ''}>
              <Form.Label>
                {`Ban Duration ${inputErrors.duration}`}
              </Form.Label>
              <Form.Control
                type="number"
                name="duration"
                placeholder="Enter Ban Duration"
                value={banData.duration}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
              />
            </Form.Group>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <Form.Group controlId="FormGridConfirmNewPassword" className={inputErrors.description ? 'red' : ''}>
              <Form.Label>
                {`Ban Description ${inputErrors.description}`}
              </Form.Label>
              <Form.Control
                type="text"
                name="description"
                as="textarea"
                rows={6}
                value={banData.description}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
              />
            </Form.Group>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <Form.Group>
              <Button
                type="submit"
                className="btn btn-dark btn-lg btn-block"
                disabled={!banData.description || !banData.duration || !(Object.values(inputErrors).some(e => e !== ''))}
              >
                Ban User
              </Button>
            </Form.Group>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <Form.Group>
              <Button
                type="button"
                className="btn btn-dark btn-lg btn-block"
                onClick={liftBan}
              >
                Lift Ban
              </Button>
            </Form.Group>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default BanUser;
