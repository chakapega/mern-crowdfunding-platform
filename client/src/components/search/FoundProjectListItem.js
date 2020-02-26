import React from 'react';
import { ListGroup, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function FoundProjectListItem({ project: { _id, name } }) {
  return (
    <ListGroup.Item className='d-flex justify-content-between align-items-center pl-0 pr-0'>
      <Nav.Link className='text-dark navbar-brand pr-0 overflow-auto' as={NavLink} to={`/project/${_id}`}>
        {name}
      </Nav.Link>
    </ListGroup.Item>
  );
}

FoundProjectListItem.propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};
