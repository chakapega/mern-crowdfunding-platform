import React, { Component } from 'react';
import { CardColumns } from 'react-bootstrap';

import ProjectPreview from './ProjectPreview';

export default class ProjectsPage extends Component {
  constructor() {
    super();
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    fetch('/api/projects')
      .then(response => response.json())
      .then(projects => {
        this.setState({
          projects
        });
      });
  }

  render() {
    const { projects } = this.state;

    return (
      <CardColumns className='mt-3 ml-2 mr-2 ml-lg-5 mr-lg-5'>
        {projects.map(project => (
          <ProjectPreview key={project._id} project={project} />
        ))}
      </CardColumns>
    );
  }
}
