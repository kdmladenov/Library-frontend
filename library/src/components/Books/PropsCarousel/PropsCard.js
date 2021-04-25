import React from "react";
import PropTypes from "prop-types";
import "../books.css";

const PropsCard = ({
  id,
  title,
  icon,
  // eslint-disable-next-line react/prop-types
  property,
}) => {
  return (
    <div className="props-card" id={id}>
      <div id="prop-card-title">{title}</div>
      <img src={icon} id="prop-card-icon" alt="icon" />
      <div id="prop-card-property">{property}</div>
    </div>
  );
};

PropsCard.propTypes = {
  id: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default PropsCard;
