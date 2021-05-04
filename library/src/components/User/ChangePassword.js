import { Button, Form } from 'react-bootstrap';

const ChangePassword = () => {
  return (
    <div className="card h-100">
      <Form className="card-body change-password">
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <h3 className="mb-3">Change Password</h3>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <Form.Group controlId="FormGridCurrentPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Current Password" />
            </Form.Group>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <Form.Group controlId="FormGridEmail">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" placeholder="Enter New Password" />
            </Form.Group>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <Form.Group controlId="FormGridConfirmEmail">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm New Password" />
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

export default ChangePassword;
