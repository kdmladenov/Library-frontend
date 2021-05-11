import { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import './Profile.css';
import { BASE_URL, DEFAULT_AVATAR } from '../../common/constants';
import { getToken, getUser } from '../../providers/AuthContext';
import validateInput from '../Forms/userValidator';
import Loading from '../UI/Loading';
import genderEnum from '../../common/enums/gender.enum';

const Profile = ({ avatarUrl, setAvatarUrl }) => {
  const history = useHistory();
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [avatarButtonsVisible, toggleAvatarButtons] = useState(false);
  const [avatarIsDeleted, setAvatarIsDeleted] = useState(false);

  const [errors, setErrors] = useState({
    avatar: '',
    profile: '',
  });

  const [messages, setMessages] = useState({
    avatar: '',
    profile: '',
  });

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    reenteredEmail: '',
    phone: '',
    birthDate: '',
    gender: '',
  });

  const [inputErrors, setInputErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    reenteredEmail: '',
    phone: '',
    birthDate: '',
    gender: '',
  });

  const updateUser = (prop, value) => setUser({ ...user, [prop]: value });

  const handleInput = (prop, value, match) => {
    setInputErrors({ ...inputErrors, [prop]: validateInput[prop](value, match) });
    updateUser(prop, value);
    setErrors({ profile: '', avatar: '' });
    setMessages({ profile: '', avatar: '' });
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
        .then(res => {
          return res.json();
        })
        .then(res => {
          setLoading(false);
          setUser({ ...res, reenteredEmail: res.email });
        })
        .catch(() => {
          history.push('*');
        });
    }
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrors({ profile: '', avatar: '' });
    setMessages({ profile: '', avatar: '' });

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
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(() => {
        setErrors({ ...errors, profile: '' });
        setMessages({ ...messages, profile: `Data was successful updated!` });
      })
      .catch(err => {
        if (err.message.startsWith('5')) {
          history.push('/serviceUnavailable');
        }
        if (err.message === '404') {
          history.push('*');
        }
        if (err.message === '409') {
          setErrors({ ...errors, profile: 'This e-mail is already registered!' });
        }
        if (err.message === '400') {
          setErrors({ ...errors, profile: 'Emails are required or do not match!' });
        }
        setMessages({ ...messages, profile: '' });
      });

    const data = new FormData();
    const avatar = document.querySelector('input[type="file"]').files[0];
    data.append("avatar", avatar);

    if (avatar) {
      fetch(`${BASE_URL}/users/avatar`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: data,
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(res.status);
          }
          return res.json();
        })
        .then(() => {
          setErrors({ ...errors, avatar: '' });
          setMessages({ ...messages, avatar: `Avatar was successful uploaded!` });
        })
        .catch(err => {
          if (err.message === 404) {
            history.push('*');
          }
          if (err.message.startsWith('5')) {
            history.push('/serviceUnavailable');
          }
        });
    }

    if (avatarIsDeleted) {
      fetch(`${BASE_URL}/users/avatar`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(res.status);
          }
          return res.json();
        })
        .then(() => {
          setErrors({ ...errors, avatar: '' });
          setMessages({ ...messages, avatar: `Avatar was successful deleted!` });
        })
        .catch(err => {
          if (err.message === 404) {
            history.push('*');
          }
          if (err.message.startsWith('5')) {
            history.push('/serviceUnavailable');
          }
        });
    }
  };

  const changeAvatar = () => {
    inputRef.current.click();
  };

  const deleteAvatar = () => {
    setAvatarIsDeleted(true);
    setAvatarUrl(`${BASE_URL}/${DEFAULT_AVATAR}`);
    toggleAvatarButtons(false);
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
            {(errors.profile || errors.avatar) && (
              <Form.Group className="red">
                {errors.profile && <h4>{`${errors.profile}`}</h4>}
                {errors.avatar && <h4>{`${errors.avatar}`}</h4>}
              </Form.Group>
            )}
            {(messages.profile || messages.avatar) && (
              <Form.Group className="green">
                {messages.profile && <h4>{`${messages.profile}`}</h4>}
                {messages.avatar && <h4>{`${messages.avatar}`}</h4>}
              </Form.Group>
            )}
            <h3 className="mb-3">Profile</h3>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            {avatarButtonsVisible && (
              <div className="edit-avatar-buttons">
                <button type="button" onClick={changeAvatar}>Change Avatar</button>
                <button type="button" onClick={deleteAvatar}>Delete Avatar</button>
              </div>
            )}
            <input
              type="file"
              name="avatar"
              ref={inputRef}
              style={{ visibility: "hidden", display: "none" }}
              onChange={(e) => {
                setAvatarUrl(URL.createObjectURL(e.target.files[0]));
                toggleAvatarButtons(false);
              }}
            />
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
                value={user.firstName || ''}
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
                value={user.lastName || ''}
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
                value={user.phone || ''}
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
                value={user.birthDate || ''}
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
                defaultValue={user.gender || 'Select Gender'}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
              >
                <option value={user.gender} disabled>
                  {user.gender ? user.gender : 'Select Gender'}
                </option>
                {Object.keys(genderEnum).map(gender => <option key={genderEnum[gender]} value={gender}>{gender}</option>)}
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

Profile.defaultProps = {
  avatarUrl: '',
};

Profile.propTypes = {
  avatarUrl: PropTypes.string,
  setAvatarUrl: PropTypes.func.isRequired,
};

export default Profile;
