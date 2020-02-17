import React from 'react';
import { ListGroup, Button, Image } from 'react-bootstrap';

import editProjectIcon from '../../assets/images/edit_project_icon.svg';
import deleteProjectIcon from '../../assets/images/delete_project_icon.svg';

export default function UserProjectListItem({ project: { name } }) {
  return (
    <ListGroup.Item className='d-flex justify-content-between align-items-center'>
      {name}
      <div>
        <Button className='user-project-control-button mr-1' variant='light'>
          <Image src={editProjectIcon} style={{ width: '32px', height: '32px' }} alt='edit' />
        </Button>
        <Button className='user-project-control-button' variant='light'>
          <Image src={deleteProjectIcon} style={{ width: '32px', height: '32px' }} alt='edit' />
        </Button>
      </div>
    </ListGroup.Item>
  );
}
