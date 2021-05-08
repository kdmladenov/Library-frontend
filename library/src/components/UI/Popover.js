import { Popover } from 'react-bootstrap';

const popover = (title, content) => {
  <Popover id="popover-basic">
    <Popover.Title as="h3">{ title }</Popover.Title>
    <Popover.Content>
      {content}
    </Popover.Content>
  </Popover>;
};

export default popover;
