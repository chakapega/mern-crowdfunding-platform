import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CardColumns } from 'react-bootstrap';

import ProjectPreview from './ProjectPreview';

class ProjectsPage extends Component {
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
    const { language } = this.props;
    const { projects } = this.state;

    return (
      <CardColumns className='mt-3 ml-2 mr-2 ml-lg-5 mr-lg-5'>
        {projects.map(project => (
          <ProjectPreview key={project._id} project={project} language={language} />
        ))}
      </CardColumns>
    );
  }
}

ProjectsPage.propTypes = {
  language: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  language: state.language.language
});

export default connect(mapStateToProps)(ProjectsPage);
