import React from 'react';
import PropTypes from 'prop-types';
import { Popover, ListGroup, Button, OverlayTrigger } from 'react-bootstrap';

export default function UserPaidBonusListItem({ paidBonus: { projectName, paymentAmount, bonusInfo } }) {
  const popover = info => (
    <Popover id='popover-basic'>
      <Popover.Content>{info}</Popover.Content>
    </Popover>
  );

  return (
    <ListGroup.Item className='d-flex justify-content-between align-items-center'>
      <span>{`${paymentAmount}$ ${projectName}`}</span>
      <OverlayTrigger trigger='focus' placement='top' overlay={popover(bonusInfo)}>
        <Button className='ml-2' variant='info'>
          Show bonus info
        </Button>
      </OverlayTrigger>
    </ListGroup.Item>
  );
}

UserPaidBonusListItem.propTypes = {
  paidBonus: PropTypes.shape({
    projectName: PropTypes.string.isRequired,
    paymentAmount: PropTypes.number.isRequired,
    bonusInfo: PropTypes.string.isRequired
  }).isRequired
};
