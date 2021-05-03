import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { BASE_URL } from '../../common/constants';
import { getToken, getUser } from '../../providers/AuthContext';
import {
  validateEmail, validateFirstName, validateLastName, validatePhone, validateReenteredEmail, validateBirthDate, validateGender,
} from '../Forms/userValidator';

const Profile = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    reenteredEmail: '',
    phone: '',
    birthDate: '',
    gender: '',
  });

  const [error, setError] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [reenteredEmailError, setReenteredEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [birthDateError, setBirthDateError] = useState('');
  const [genderError, setGenderError] = useState('');

  const handleFirstNameInput = (value) => {
    validateFirstName(value, setFirstNameError);
    setUser({ ...user, firstName: value });
  };

  const handleLastNameInput = (value) => {
    validateLastName(value, setLastNameError);
    setUser({ ...user, lastName: value });
  };

  const handleEmailInput = (value) => {
    validateEmail(value, setEmailError);
    setUser({ ...user, email: value });
  };

  const handleReenteredEmailInput = (value) => {
    validateReenteredEmail(value, user.email, setReenteredEmailError);
    setUser({ ...user, reenteredEmail: value });
  };

  const handlePhoneInput = (value) => {
    validatePhone(value, setPhoneError);
    setUser({ ...user, phone: value });
  };

  const handleBirthDateInput = (value) => {
    validateBirthDate(value, setBirthDateError);
    setUser({ ...user, birthDate: value });
  };

  const handleGenderInput = (value) => {
    validateGender(value, setGenderError);
    setUser({ ...user, gender: value });
  };
  useEffect(() => {
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

          setUser({ ...res, reenteredEmail: res.email });
        })
        .catch(e => setError(e));
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
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          throw new Error(res.message);
        }
      });
  };

  return (
    <div className="card h-100">
      <Form className="card-body profile" onSubmit={handleFormSubmit}>
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <h3 className="mb-3">Profile</h3>
            {error && (
              <Form.Group className="red">
                <p>{`Update Failed: ${error}`}</p>
              </Form.Group>
            )}
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <Form.Group controlId="FormBasicFirstName" className={firstNameError ? 'red' : ''}>
              <Form.Label>
                {`First Name ${firstNameError}`}
              </Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="Enter First Name"
                value={user.firstName}
                onChange={(e) => handleFirstNameInput(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <Form.Group controlId="FormGridLastName" className={lastNameError ? 'red' : ''}>
              <Form.Label>
                {`Last Name ${lastNameError}`}
              </Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
                value={user.lastName}
                onChange={(e) => handleLastNameInput(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <Form.Group controlId="FormGridEmail" className={emailError ? 'red' : ''}>
              <Form.Label>
                {`Email ${emailError}`}
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter Email"
                value={user.email}
                onChange={(e) => handleEmailInput(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <Form.Group controlId="FormGridConfirmEmail" className={reenteredEmailError ? 'red' : ''}>
              <Form.Label>
                {reenteredEmailError ? `Email ${reenteredEmailError}` : `Confirm Email`}
              </Form.Label>
              <Form.Control
                type="email"
                name="reenteredEmail"
                placeholder="Confirm Email"
                value={user.reenteredEmail}
                onChange={(e) => handleReenteredEmailInput(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
            <Form.Group controlId="FormGridPhone" className={phoneError ? 'red' : ''}>
              <Form.Label>
                {`Phone ${phoneError}`}
              </Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                placeholder="Enter Phone"
                value={user.phone}
                onChange={(e) => handlePhoneInput(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
            <Form.Group controlId="FormGridBirthDate" className={birthDateError ? 'red' : ''}>
              <Form.Label>
                {`Birth Date ${birthDateError}`}
              </Form.Label>
              <Form.Control
                type="date"
                name="birthDate"
                placeholder="Enter Birth Date"
                value={user.birthDate}
                onChange={(e) => handleBirthDateInput(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
            <Form.Group controlId="FormGridGender" className={genderError ? 'red' : ''}>
              <Form.Label>
                {`Gender ${birthDateError}`}
              </Form.Label>
              <Form.Control
                as="select"
                placeholder="Gender"
                name="gender"
                defaultValue={user.gender}
                onChange={(e) => handleGenderInput(e.target.value)}
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
