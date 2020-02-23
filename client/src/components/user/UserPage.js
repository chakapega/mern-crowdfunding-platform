import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

import { interfaceTexts } from '../../shared/constants';
import UserProjectListItem from './UserProjectListItem';
import UserPaidBonusListItem from './UserPaidBonusListItem';

class UserPage extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      projects: []
    };
  }

  componentDidMount() {
    const {
      userData: { uid }
    } = this.props;

    fetch(`/api/user/${uid}`)
      .then(response => response.json())
      .then(user => {
        this.setState({
          user
        });
      });
    fetch(`/api/projects/user/${uid}`)
      .then(response => response.json())
      .then(projects => {
        this.setState({
          projects
        });
      });
  }

  deleteProject = _id => {
    const {
      userData: { uid }
    } = this.props;

    fetch('/api/delete-project', {
      method: 'POST',
      body: JSON.stringify({
        _id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      fetch(`/api/projects/user/${uid}`)
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
    const {
      projects,
      user: { paidBonuses }
    } = this.state;

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
          <div className='mt-1'>
            <h4>{interfaceTexts.bonusesPaidByUser[language]}</h4>
            <ListGroup className='paid-bonuses-list'>
              {paidBonuses &&
                paidBonuses.map((paidBonus, index) => (
                  <UserPaidBonusListItem key={index} paidBonus={paidBonus} language={language} />
                ))}
            </ListGroup>
          </div>
        </div>
        <div className='container mt-3'>
          <h4>{interfaceTexts.userProjects[language]}</h4>
          <ListGroup>
            {projects.map(project => (
              <UserProjectListItem
                key={project._id}
                project={project}
                language={language}
                deleteProject={this.deleteProject}
                status={status}
              />
            ))}
          </ListGroup>
        </div>
      </>
    );
  }
}

UserPage.propTypes = {
  userData: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired
  }).isRequired,
  language: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  userData: state.user.userData,
  language: state.language.language
});

export default connect(mapStateToProps)(UserPage);
