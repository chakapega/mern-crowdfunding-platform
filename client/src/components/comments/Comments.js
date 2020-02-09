import React from 'react';
import { Container, Button, InputGroup, FormControl } from 'react-bootstrap';

import Comment from './Comment';

export default function Comments() {
  return (
    <Container>
      <div className='row mt-5'>
        <div className='col-12 pt-4'>
          <ul className='p-0'>
            <Comment />
          </ul>
          <InputGroup className='mb-3'>
            <FormControl maxLength='300' placeholder='Write a comment ...' />
            <InputGroup.Append>
              <Button variant='outline-primary'>Send</Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </div>
    </Container>
  );
}
