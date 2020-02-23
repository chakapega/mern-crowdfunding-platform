import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, ListGroup, Nav, Button, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { interfaceTexts } from '../../shared/constants';
import editProjectIcon from '../../assets/images/edit_project_icon.svg';
import deleteProjectIcon from '../../assets/images/delete_project_icon.svg';

export default class UserProjectListItem extends Component {
  constructor() {
    super();
    this.state = {
      isOpenModalDeleteWindow: false
    };
  }

  deleteProjectHandler = _id => {
    const { deleteProject } = this.props;

    deleteProject(_id);
    this.setState({ isOpenModalDeleteWindow: false });
  };

  closeModalDeleteWindow = () => {
    this.setState({
      isOpenModalDeleteWindow: false
    });
  };

  render() {
    const {
      language,
      project: { _id, name },
      status
    } = this.props;
    const { isOpenModalDeleteWindow } = this.state;

    return (
      <>
        <ListGroup.Item className='d-flex justify-content-between align-items-center pl-0 pr-0'>
          <Nav.Link className='text-dark navbar-brand userpage-project-link pr-0' as={NavLink} to={`/project/${_id}`}>
            {name}
          </Nav.Link>
          {status !== 'blocked' && (
            <div>
              <Button
                className='user-project-control-button mr-1'
                variant='light'
                as={NavLink}
                to={`/edit-project/${_id}`}
              >
                <Image src={editProjectIcon} style={{ width: '32px', height: '32px' }} alt='edit' />
              </Button>
              <Button
                className='user-project-control-button'
                variant='light'
                onClick={() => this.setState({ isOpenModalDeleteWindow: true })}
              >
                <Image src={deleteProjectIcon} style={{ width: '32px', height: '32px' }} alt='delete' />
              </Button>
            </div>
          )}
        </ListGroup.Item>
        {isOpenModalDeleteWindow && (
          <div className='delete-project-modal-window-container'>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>{interfaceTexts.questionAboutDeletingProject[language]}</Modal.Title>
              </Modal.Header>
              <Modal.Footer>
                <Button variant='secondary' onClick={() => this.deleteProjectHandler(_id)}>
                  {interfaceTexts.yes[language]}
                </Button>
                <Button variant='primary' onClick={this.closeModalDeleteWindow}>
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

UserProjectListItem.propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  language: PropTypes.string.isRequired,
  deleteProject: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired
};
