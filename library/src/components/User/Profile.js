import { Button, Form } from 'react-bootstrap';

const Profile = () => {
  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <h3 className="mb-3">Profile</h3>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <Form.Group controlId="FormBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter First Name" />
            </Form.Group>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <Form.Group controlId="FormGridLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Last Name" />
            </Form.Group>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <Form.Group controlId="FormGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" />
            </Form.Group>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <Form.Group controlId="FormGridConfirmEmail">
              <Form.Label>Confirm Email</Form.Label>
              <Form.Control type="email" placeholder="Confirm Email" />
            </Form.Group>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
            <Form.Group controlId="FormGridPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="tel" placeholder="Enter Phone" />
            </Form.Group>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
            <Form.Group controlId="FormGridBirthDate">
              <Form.Label>Birth Date</Form.Label>
              <Form.Control type="date" placeholder="Enter Birth Date" />
            </Form.Group>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
            <Form.Group controlId="FormGridGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control as="select" placeholder="Gender">
                <option value="" disabled selected>Gender</option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="other">other</option>
              </Form.Control>
            </Form.Group>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <Button
              type="submit"
              className="btn btn-dark btn-lg btn-block"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
