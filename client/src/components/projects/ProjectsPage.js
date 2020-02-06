import React, { Component } from 'react';

import Projects from './Projects';

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

    return <Projects projects={projects} />;
  }
}
