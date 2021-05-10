import { Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";

const DropDown = ({ options, selected, onSelectedChange }) => {
  const renderedOptions = options.map((option) => {
    return (
      <Dropdown.Item
        key={option.value}
        onClick={() => onSelectedChange(option)}
      >
        {option.label}
      </Dropdown.Item>
    );
  });

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selected.label}
        </Dropdown.Toggle>

        <Dropdown.Menu>{renderedOptions}</Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
DropDown.propTypes = {
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }),
    ),
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
      }),
    ),
  ]).isRequired,
  // options: PropTypes.oneOfType([
  //   PropTypes.arrayOf(PropTypes.object),
  //   PropTypes.func,
  // ]).isRequired,
  selected: PropTypes.oneOfType([
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
    PropTypes.shape({
      label: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
    }),
  ]).isRequired,
  onSelectedChange: PropTypes.func.isRequired,
};
export default DropDown;
