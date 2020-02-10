import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, ProgressBar, ButtonGroup, Button, Container, Popover, OverlayTrigger } from 'react-bootstrap';
import BootstrapCarousel from '../carousel/BootstrapCarousel';

import Comments from '../comments/Comments';

export default class Project extends Component {
  constructor() {
    super();
    this.state = {
      imageLinks: [],
      name: '',
      description: '',
      category: '',
      // tags: '',
      fundraisingEndDate: '',
      target: '',
      bonusTen: '',
      bonusTwentyFive: '',
      bonusFifty: '',
      video: ''
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    fetch(`/api/project/${id}`)
      .then(response => response.json())
      .then(project => {
        const {
          imageLinks,
          name,
          description,
          category,
          // tags,
          fundraisingEndDate,
          target,
          bonusTen,
          bonusTwentyFive,
          bonusFifty,
          video
        } = project;

        this.setState({
          imageLinks,
          name,
          description,
          category,
          // tags,
          fundraisingEndDate,
          target,
          bonusTen,
          bonusTwentyFive,
          bonusFifty,
          video
        });
      });
  }

  render() {
    const {
      name,
      description,
      category,
      fundraisingEndDate,
      target,
      bonusTen,
      bonusTwentyFive,
      bonusFifty,
      video,
      imageLinks = []
    } = this.state;
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const popover = bonus => (
      <Popover id='popover-basic'>
        <Popover.Content>{bonus}</Popover.Content>
      </Popover>
    );

    return (
      <>
        <Card className='project-container mb-5'>
          <Card.Body className='p-1 p-sm-3'>
            <Card.Title className='project-name'>{name}</Card.Title>
            <div className='project-container_first'>
              <div className='project-video-container embed-responsive embed-responsive-16by9'>
                <iframe className='embed-responsive-item' src={video} title='project-video-frame' />
              </div>
              <div className='crowdfunding-details'>
                <ProgressBar className='mt-3' animated now={30} label={`${30}%`} />
                <Card.Title className='m-4'>{`$${target}`}</Card.Title>
                <Card.Text>{`Category: ${category}`}</Card.Text>
                <Card.Text>{`Date of completion of fundraising: ${fundraisingEndDate}`}</Card.Text>
                <div className='payment-buttons-container'>
                  <ButtonGroup className='payment-buttons-bootstrap-group'>
                    <Button className='payment-button' variant='outline-success' size='md'>
                      10$
                    </Button>
                    <OverlayTrigger trigger='focus' placement='top' overlay={popover(bonusTen)}>
                      <Button variant='success'>Show bonus info</Button>
                    </OverlayTrigger>
                  </ButtonGroup>
                  <ButtonGroup>
                    <Button className='payment-button' variant='outline-success' size='md'>
                      25$
                    </Button>
                    <OverlayTrigger trigger='focus' placement='top' overlay={popover(bonusTwentyFive)}>
                      <Button variant='success'>Show bonus info</Button>
                    </OverlayTrigger>
                  </ButtonGroup>
                  <ButtonGroup>
                    <Button className='payment-button' variant='outline-success' size='md'>
                      50$
                    </Button>
                    <OverlayTrigger trigger='focus' placement='top' overlay={popover(bonusFifty)}>
                      <Button variant='success'>Show bonus info</Button>
                    </OverlayTrigger>
                  </ButtonGroup>
                </div>
              </div>
            </div>
            <Card.Text className='container mt-5 mb-5 p-1'>{description}</Card.Text>
            <Container>
              <BootstrapCarousel imageLinks={imageLinks} />
            </Container>
          </Card.Body>
        </Card>
        <Comments id={id} />
      </>
    );
  }
}

Project.propTypes = {
  match: PropTypes.shape({ params: PropTypes.object.isRequired }).isRequired
};
