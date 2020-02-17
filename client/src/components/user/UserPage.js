import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

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

  render() {
    const {
      userData: { email, displayName, photoURL }
    } = this.props;
    const {
      projects,
      user: { paidBonuses }
    } = this.state;

    /* eslint-disable */
    return (
      <>
        <div className='user-page-top-container container'>
          <div>
            <h4>User details:</h4>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant='top' src={photoURL} />
              <ListGroup className='list-group-flush'>
                <ListGroupItem>{email}</ListGroupItem>
                <ListGroupItem>{displayName}</ListGroupItem>
              </ListGroup>
            </Card>
          </div>
          <div>
            <h4>User paid bonuses:</h4>
            <ListGroup>
              {paidBonuses &&
                paidBonuses.map((paidBonus, index) => <UserPaidBonusListItem key={index} paidBonus={paidBonus} />)}
            </ListGroup>
          </div>
        </div>
        <div className='container mt-3'>
          <h4>User projects:</h4>
          <ListGroup>
            {projects.map(project => (
              <UserProjectListItem key={project._id} project={project} />
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
    photoURL: PropTypes.string.isRequired
  }).isRequired,
  language: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  userData: state.user.userData,
  language: state.language.language
});

export default connect(mapStateToProps)(UserPage);
