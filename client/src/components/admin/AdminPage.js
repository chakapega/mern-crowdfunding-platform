import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

import { interfaceTexts } from '../../shared/constants';
import UserProjectListItem from '../user/UserProjectListItem';

class AdminPage extends Component {
  constructor() {
    super();
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    fetch(`/api/projects`)
      .then(response => response.json())
      .then(projects => {
        this.setState({
          projects
        });
      });
  }

  deleteProject = _id => {
    fetch('/api/delete-project', {
      method: 'POST',
      body: JSON.stringify({
        _id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      fetch(`/api/projects`)
        .then(response => response.json())
        .then(projects => {
          this.setState({
            projects
          });
        });
    });
  };

  render() {
    const {
      language,
      userData: { email, displayName, photoURL, role, status }
    } = this.props;
    const { projects } = this.state;

    return (
      <>
        <div className='user-page-top-container container'>
          <div className='mt-1'>
            <h4>{interfaceTexts.userDetails[language]}</h4>
            <Card className='mx-auto' style={{ width: '18rem' }}>
              <Card.Img variant='top' src={photoURL} />
              <ListGroup className='list-group-flush'>
                <ListGroupItem>{email}</ListGroupItem>
                <ListGroupItem>{displayName}</ListGroupItem>
                <ListGroupItem>{`${interfaceTexts.role[language]} ${role}`}</ListGroupItem>
                <ListGroupItem>{`${interfaceTexts.status[language]} ${status}`}</ListGroupItem>
              </ListGroup>
            </Card>
          </div>
        </div>
        <div className='container mt-3'>
          <h4>{interfaceTexts.projects[language]}</h4>
          <ListGroup>
            {projects.map(project => (
              <UserProjectListItem
                key={project._id}
                project={project}
                language={language}
                deleteProject={this.deleteProject}
              />
            ))}
          </ListGroup>
        </div>
      </>
    );
  }
}

AdminPage.propTypes = {
  userData: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
  }).isRequired,
  language: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  userData: state.user.userData,
  language: state.language.language
});

export default connect(mapStateToProps)(AdminPage);
