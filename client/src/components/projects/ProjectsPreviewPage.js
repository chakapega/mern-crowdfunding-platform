import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { CardColumns, Card } from 'react-bootstrap';
import { TagCloud } from 'react-tagcloud';

import ProjectPreview from './ProjectPreview';

class ProjectsPage extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      isRedirect: false,
      redirectUrl: '',
      tags: []
    };
  }

  componentDidMount() {
    fetch('/api/tags')
      .then(response => response.json())
      .then(tags => {
        this.setState({
          tags
        });
      });
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
    const { isRedirect, redirectUrl, projects, tags } = this.state;

    return (
      <>
        {isRedirect && <Redirect to={`/project/${redirectUrl}`} />}
        <CardColumns className='mt-3 ml-2 mr-2 ml-lg-5 mr-lg-5'>
          {tags.length ? (
            <Card>
              <TagCloud
                minSize={12}
                maxSize={35}
                tags={tags}
                onClick={tag => this.setState({ isRedirect: true, redirectUrl: tag.projectId })}
              />
            </Card>
          ) : null}
          {projects.map(project => (
            <ProjectPreview key={project._id} project={project} language={language} />
          ))}
        </CardColumns>
      </>
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
