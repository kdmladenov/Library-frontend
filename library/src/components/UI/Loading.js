import React from "react";
import PropTypes from "prop-types";

const Loading = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};

Loading.propTypes = {
  children: PropTypes.element.isRequired,
};
export default Loading;
