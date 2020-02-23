import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Nav, Image } from 'react-bootstrap';

function UserDetails({ userData: { uid, photoURL, displayName, status } }) {
  return (
    <Nav.Link className='position-relative' as={NavLink} to={`/user/${uid}`}>
      <Image
        src={photoURL}
        width='30'
        height='30'
        className='d-inline-block align-top mr-2 rounded-circle'
        alt='user'
      />
      {displayName}
      {status === 'blocked' && <span className='user-details-status'>blocked</span>}
    </Nav.Link>
  );
}

UserDetails.propTypes = {
  userData: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  userData: state.user.userData
});

export default connect(mapStateToProps)(UserDetails);
