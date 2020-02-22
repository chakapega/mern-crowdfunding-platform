import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, Dropdown } from 'react-bootstrap';

import { interfaceTexts } from '../../shared/constants';

export default function UserListItem({ user: { email, status, role }, language }) {
  return (
    <ListGroup.Item className='d-flex justify-content-between align-items-center pl-1 pr-1 pt-2 pb-2'>
      <span className='user-email'>{`${email}`}</span>
      <Dropdown className='ml-2'>
        <Dropdown.Toggle disabled={role === 'admin'} variant='success' id='dropdown-basic'>
          {interfaceTexts.actions[language]}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>{interfaceTexts.makeAdmin[language]}</Dropdown.Item>
          <Dropdown.Item>
            {status === 'active' ? interfaceTexts.block[language] : interfaceTexts.unBlock[language]}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </ListGroup.Item>
  );
}

UserListItem.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired
  }).isRequired,
  language: PropTypes.string.isRequired
};
