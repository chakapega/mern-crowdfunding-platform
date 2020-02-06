import React from 'react';
import PropTypes from 'prop-types';

import ProjectPreview from './ProjectPreview';

export default function Projects({ projects }) {
  return (
    <>
      {projects.map(project => (
        <ProjectPreview key={project._id} project={project} />
      ))}
    </>
  );
}

Projects.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired
};
