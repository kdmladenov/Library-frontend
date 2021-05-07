import { useEffect, useState, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Profile.css';
import { BASE_URL } from '../../common/constants';
import { getToken, getUser } from '../../providers/AuthContext';
import validateInput from '../Forms/userValidator';
import Loading from '../UI/Loading';

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [avatarButtonsVisible, toggleAvatarButtons] = useState(false);
  const inputRef = useRef();
  const [avatarUrl, setAvatarUrl] = useState('');
  const fd = new FormData();
  const [avatar, setAvatar] = useState(null);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    reenteredEmail: '',
    phone: '',
    birthDate: '',
    gender: '',
  });

  const updateUser = (prop, value) => setUser({ ...user, [prop]: value });

  const [inputErrors, setInputErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    reenteredEmail: '',
    phone: '',
    birthDate: '',
    gender: '',
  });

  const handleInput = (prop, value, match) => {
    setInputErrors({ ...inputErrors, [prop]: validateInput[prop](value, match) });
    updateUser(prop, value);
  };

  useEffect(() => {
    setLoading(true);
    const { userId } = getUser();
    if (user) {
      fetch(`${BASE_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then(res => res.json())
        .then(res => {
          if (res.message) {
            throw new Error(res.message);
          }

          setLoading(false);
          setUser({ ...res, reenteredEmail: res.email });
        })
        .catch(err => setError(err));
    }
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch(`${BASE_URL}/users/edit-profile`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Unsuccessful update!`);
        }
        return res.json();
      })
      .then(() => {
        setError('');
        setMessage(`Successful update!`);
      })
      .catch(err => {
        setMessage('');
        setError(err.message);
      });

    fetch(`${BASE_URL}/users/avatar`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${getToken()}` },
      body: avatar,
    })
      .then(res => res.json())
      .then(res => console.log(res));
  };

  const changeAvatar = () => {
    inputRef.current.click();
  };

  const deleteAvatar = () => {

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
      <Form className="card-body profile" onSubmit={handleFormSubmit}>
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
            <h3 className="mb-3">Profile</h3>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            {avatarButtonsVisible && (
              <div className="edit-avatar-buttons">
                <button type="button" onClick={changeAvatar}>Change Avatar</button>
                <button type="button" onClick={deleteAvatar}>Delete Avatar</button>
                <input
                  type="file"
                  name="avatar"
                  ref={inputRef}
                  style={{ visibility: "hidden", display: "none" }}
                  onChange={(e) => {
                    setAvatarUrl(URL.createObjectURL(e.target.files[0]));
                    toggleAvatarButtons(false);
                    fd.append('avatar', e.target.files[0]);
                    setAvatar(e.target.files[0]);
                    console.log(fd.getAll('avatar'));
                  }}
                />
              </div>
            )}
            <button
              className="change-avatar-button"
              type="button"
              onClick={() => toggleAvatarButtons(!avatarButtonsVisible)}
            >
              <img className="change avatar" src={`${BASE_URL}/storage/avatars/uploadAvatar.png`} alt="upload user avatar" />
              <div
                className="avatar"
                style={avatarUrl ? { backgroundImage: `url(${avatarUrl})` } : { backgroundImage: `url(${BASE_URL}/${user.avatar})` }}
              >
                avatar
              </div>
            </button>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <Form.Group controlId="FormBasicFirstName" className={inputErrors.firstName ? 'red' : ''}>
              <Form.Label>
                {`First Name ${inputErrors.firstName}`}
              </Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="Enter First Name"
                value={user.firstName}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <Form.Group controlId="FormGridLastName" className={inputErrors.lastName ? 'red' : ''}>
              <Form.Label>
                {`Last Name ${inputErrors.lastName}`}
              </Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
                value={user.lastName}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <Form.Group controlId="FormGridEmail" className={inputErrors.email ? 'red' : ''}>
              <Form.Label>
                {`Email ${inputErrors.email}`}
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter Email"
                value={user.email}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <Form.Group controlId="FormGridConfirmEmail" className={inputErrors.reenteredEmail ? 'red' : ''}>
              <Form.Label>
                {inputErrors.reenteredEmail ? `Email ${inputErrors.reenteredEmail}` : `Confirm Email`}
              </Form.Label>
              <Form.Control
                type="email"
                name="reenteredEmail"
                placeholder="Confirm Email"
                value={user.reenteredEmail}
                onChange={(e) => handleInput(e.target.name, e.target.value, user.email)}
              />
            </Form.Group>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
            <Form.Group controlId="FormGridPhone" className={inputErrors.phone ? 'red' : ''}>
              <Form.Label>
                {`Phone ${inputErrors.phone}`}
              </Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                placeholder="Enter Phone"
                value={user.phone}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
            <Form.Group controlId="FormGridBirthDate" className={inputErrors.birthDate ? 'red' : ''}>
              <Form.Label>
                {`Birth Date ${inputErrors.birthDate}`}
              </Form.Label>
              <Form.Control
                type="date"
                name="birthDate"
                placeholder="Enter Birth Date"
                value={user.birthDate}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
            <Form.Group controlId="FormGridGender" className={inputErrors.gender ? 'red' : ''}>
              <Form.Label>
                {`Gender ${inputErrors.gender}`}
              </Form.Label>
              <Form.Control
                as="select"
                placeholder="Gender"
                name="gender"
                defaultValue={user.gender}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
              >
                <option value={user.gender} disabled>
                  {user.gender ? user.gender : 'Select Gender'}
                </option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="other">other</option>
              </Form.Control>
            </Form.Group>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <Form.Group>
              <Button
                type="submit"
                className="btn btn-dark btn-lg btn-block"
              >
                Save Changes
              </Button>
            </Form.Group>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Profile;
