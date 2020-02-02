import React from 'react';
import { Card, Button } from 'react-bootstrap';

import cycoProjectImage from '../../assets/images/cyco-project-image.png';

export default function Project() {
  return (
    <Card className='m-3' style={{ width: '20rem' }}>
      <Card.Img variant='top' src={cycoProjectImage} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the bulk of the cards content.
        </Card.Text>
        <Button variant='primary'>Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}
