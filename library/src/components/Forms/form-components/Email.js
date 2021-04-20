const Email = () => {
  return (
    <user className="form-group">
      <label htmlFor="email">
        Email
        <input
          id="email"
          type="email"
          className="form-control"
          placeholder="Enter email"
        />
      </label>
    </user>
  );
};

export default Email;
