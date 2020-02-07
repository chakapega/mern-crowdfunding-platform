import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

import { setSelectedProject } from '../../store/projects/actions';

function ProjectPreview({ project, setSelectedProjectAction }) {
  const {
    imageLinks: [image],
    name,
    description
  } = project;
  const openProjectHandler = () => {
    setSelectedProjectAction(project);
  };

  return (
    <Card>
      <Card.Img variant='top' src={image} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text className='project-preview-description'>{description}</Card.Text>
        <Button variant='primary' as={NavLink} to='/project' onClick={openProjectHandler}>
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
    description: PropTypes.string.isRequired
  }).isRequired,
  setSelectedProjectAction: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  setSelectedProjectAction: selectedProject => dispatch(setSelectedProject(selectedProject))
});

export default connect(null, mapDispatchToProps)(ProjectPreview);
