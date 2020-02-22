import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, Dropdown, Modal, Button } from 'react-bootstrap';

import { interfaceTexts } from '../../shared/constants';

export default class UserListItem extends Component {
  constructor() {
    super();
    this.state = {
      isOpenModalWindow: false
    };
  }

  makeUserAdminHandler = uid => {
    const { makeUserAdmin } = this.props;

    makeUserAdmin(uid);
    this.setState({ isOpenModalWindow: false });
  };

  blockUserHandler = uid => {
    const { blockUser } = this.props;

    blockUser(uid);
  };

  closeModalWindow = () => {
    this.setState({
      isOpenModalWindow: false
    });
  };

  render() {
    const {
      user: { email, role, uid, status },
      language,
      blockUser
    } = this.props;
    const { isOpenModalWindow } = this.state;

    return (
      <>
        <ListGroup.Item className='d-flex justify-content-between align-items-center pl-1 pr-1 pt-2 pb-2'>
          <span className='user-email'>{`${email}`}</span>
          <Dropdown className='ml-2'>
            <Dropdown.Toggle disabled={role === 'admin'} variant='success' id='dropdown-basic'>
              {interfaceTexts.actions[language]}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => this.setState({ isOpenModalWindow: true })}>
                {interfaceTexts.makeAdmin[language]}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => blockUser(uid)}>
                {status === 'active' ? interfaceTexts.block[language] : interfaceTexts.unBlock[language]}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>
        {isOpenModalWindow && (
          <div className='delete-project-modal-window-container'>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>{interfaceTexts.questionAboutMakeUserAdmin[language]}</Modal.Title>
              </Modal.Header>
              <Modal.Footer>
                <Button variant='secondary' onClick={() => this.makeUserAdminHandler(uid)}>
                  {interfaceTexts.yes[language]}
                </Button>
                <Button variant='primary' onClick={this.closeModalWindow}>
                  {interfaceTexts.cancel[language]}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>
        )}
      </>
    );
  }
}

UserListItem.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired
  }).isRequired,
  language: PropTypes.string.isRequired,
  makeUserAdmin: PropTypes.func.isRequired,
  blockUser: PropTypes.func.isRequired
};
