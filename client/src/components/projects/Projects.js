import React from 'react';
import PropTypes from 'prop-types';
import { CardColumns } from 'react-bootstrap';

import ProjectPreview from './ProjectPreview';

export default function Projects({ projects }) {
  return (
    <CardColumns className='mt-3 ml-2 mr-2 ml-lg-5 mr-lg-5'>
      {projects.map(project => (
        <ProjectPreview key={project._id} project={project} />
      ))}
    </CardColumns>
  );
}

Projects.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired
};
