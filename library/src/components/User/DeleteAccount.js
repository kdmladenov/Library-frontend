import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { BASE_URL } from '../../common/constants';
import { getToken } from '../../providers/AuthContext';
import Loading from '../UI/Loading';

const DeleteAccount = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(`${BASE_URL}/users/delete-profile`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Unsuccessful attempt!`);
        }
        return res.json();
      })
      .then(() => {
        localStorage.removeItem('token');
        history.push('/unregister');
      })
      .catch(err => {
        if (err.message.startsWith('5')) {
          history.push('/serviceUnavailable');
        }
        if (err.message === '404') {
          history.push('*');
        }
      });
  };

  if (loading) {
    return (
      <div>
        <Loading>
          <h1>Loading...</h1>
        </Loading>
      </div>
    );
  }

  return (
    <div className="card h-100">
      <Form className="card-body change-password" onSubmit={handleFormSubmit}>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <h1>Delete Your Account</h1>
          <br />
          <h4>We are sorry to see you go!</h4>
          <br />
          <p>Are you absolutely sure that You want to delete Your account. Please note that there is no option to restore the account nor it&apos;s data ones it is deleted. If You click the button Your account will be permanently deleted! </p>
        </div>
        <br />
        <br />
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <Form.Group>
            <Button
              type="submit"
              className="btn btn-dark btn-lg btn-block"
            >
              DELETE ACCOUNT
            </Button>
          </Form.Group>
        </div>
      </Form>
    </div>
  );
};

export default DeleteAccount;
