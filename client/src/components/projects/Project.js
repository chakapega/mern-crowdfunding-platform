import React, { Component } from 'react';
import { Card, ProgressBar, Button, Container } from 'react-bootstrap';
import BootstrapCarousel from '../carousel/BootstrapCarousel';

export default class Project extends Component {
  render() {
    const imageLinks = [
      'https://firebasestorage.googleapis.com/v0/b/crowdfunding-platform-5d2f5.appspot.com/o/images%2F1365-620x348.jpg?alt=media&token=a0b9a3f7-3312-492f-adb1-1176fd04f9d1',
      'https://firebasestorage.googleapis.com/v0/b/crowdfunding-platform-5d2f5.appspot.com/o/images%2F807ecb1e4f67cf2f3c901a76014426ce_original.jpg?alt=media&token=ca1f69d0-07de-4e39-bd2a-d5b84e53a9ff',
      'https://firebasestorage.googleapis.com/v0/b/crowdfunding-platform-5d2f5.appspot.com/o/images%2FScreenshot_5.png?alt=media&token=63394dde-b84a-4200-9d35-4376029cfc46'
    ];

    return (
      <Card className='project-container mb-5'>
        <Card.Body className='p-1 p-sm-3'>
          <Card.Title className='project-name'>Desert in the City - Hardcover Book</Card.Title>
          <div className='project-container_first'>
            <div className='project-video-container embed-responsive embed-responsive-16by9'>
              <iframe
                className='embed-responsive-item'
                src='https://www.youtube.com/embed/zpOULjyy-n8?rel=0'
                title='project-video-frame'
              />
            </div>
            <div className='crowdfunding-details'>
              <ProgressBar className='mt-3' animated now={30} label={`${30}%`} />
              <Card.Title className='m-4'>$3000</Card.Title>
              <Card.Text>Date of completion of fundraising 2020-10-10</Card.Text>
              <div className='payment-buttons-container'>
                <Button className='payment-button' variant='outline-success' size='lg'>
                  10$
                </Button>
                <Button className='payment-button' variant='outline-success' size='lg'>
                  25$
                </Button>
                <Button className='payment-button' variant='outline-success' size='lg'>
                  50$
                </Button>
              </div>
            </div>
          </div>
          <Card.Text className='container mt-5 mb-5 p-1'>
            Desert in the City is a photography project where a deserted city is shot during a holiday season. The
            project has now 4 cities after Desert in Paris (Christmas 2014), London (Christmas 2015), New York
            (Thanksgiving 2016) and Rome (Christmas 2016). This kickstarter aims at financing the Hardcover photobook
            with every single picture of the project - 100+ pages with more than 120 pictures of deserted cities, and an
            exhibition in Paris in november. More than two years ago I was looking for a way to create a series of
            pictures that would make a beautiful portrait of a city. I thought of photos of New York I had done just
            before Irene hurricane back in 2011. Streets were totally empty during the curfew and I had the chance to
            wander in an empty Manhattan.
          </Card.Text>
          <Container>
            <BootstrapCarousel imageLinks={imageLinks} />
          </Container>
        </Card.Body>
      </Card>
    );
  }
}
