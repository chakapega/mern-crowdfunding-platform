import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

import { interfaceTexts } from '../../shared/constants';

export default function ProjectPreview({ project, language }) {
  const {
    imageLinks: [image],
    name,
    description,
    _id
  } = project;

  return (
    <NavLink to={`/project/${_id}`} title={interfaceTexts.openProject[language]}>
      <Card>
        <Card.Img variant='top' src={image} />
        <Card.Body className='p-1'>
          <Card.Title className='text-dark'>{name}</Card.Title>
          <div className='project-preview-description text-dark'>
            <ReactMarkdown source={description} />
          </div>
        </Card.Body>
      </Card>
    </NavLink>
  );
}

ProjectPreview.propTypes = {
  project: PropTypes.shape({
    imageLinks: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
  }).isRequired,
  language: PropTypes.string.isRequired
};
