import { Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";

const SearchDropdown = ({ options, selected, onSelectedChange }) => {
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

SearchDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selected: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  onSelectedChange: PropTypes.func.isRequired,
};
export default SearchDropdown;
