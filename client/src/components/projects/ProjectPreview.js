import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

export default function ProjectPreview({ project }) {
  const {
    imageLinks: [image],
    name,
    description,
    _id
  } = project;

  return (
    <Card>
      <Card.Img variant='top' src={image} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text className='project-preview-description'>{description}</Card.Text>
        <Button variant='primary' as={NavLink} to={`/project/${_id}`}>
          Open project
        </Button>
      </Card.Body>
    </Card>
  );
}

ProjectPreview.propTypes = {
  project: PropTypes.shape({
    imageLinks: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
  }).isRequired
};
