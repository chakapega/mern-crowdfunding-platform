import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, ProgressBar, ButtonGroup, Button, Container, Popover, OverlayTrigger } from 'react-bootstrap';
import BootstrapCarousel from '../carousel/BootstrapCarousel';

import Comments from '../comments/Comments';
import { setRequestStatus } from '../../store/loader/actions';

class Project extends Component {
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
          fundsRaised,
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
          fundsRaised,
          video
        });
      });
  }

  pay = paymentAmount => {
    const {
      match: {
        params: { id }
      },
      setRequestStatusAction
    } = this.props;

    setRequestStatusAction(true);
    fetch('/api/project-pay', {
      method: 'POST',
      body: JSON.stringify({
        id,
        paymentAmount
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        setTimeout(() => {
          this.setState({
            fundsRaised: response.fundsRaised
          });
          setRequestStatusAction(false);
        }, 3000);
      });
  };

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
      fundsRaised,
      video,
      imageLinks = []
    } = this.state;
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const fundsRaisedPercent = (100 / target) * fundsRaised;
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
                <ProgressBar className='mt-3' animated now={fundsRaisedPercent} />
                <Card.Title className='m-4'>{`Collected ${fundsRaised} of ${target} $`}</Card.Title>
                <Card.Text>{`Category: ${category}`}</Card.Text>
                <Card.Text>{`Date of completion of fundraising: ${fundraisingEndDate}`}</Card.Text>
                <div className='payment-buttons-container'>
                  <ButtonGroup className='payment-buttons-bootstrap-group'>
                    <Button className='payment-button' variant='outline-success' size='md' onClick={() => this.pay(10)}>
                      10$
                    </Button>
                    <OverlayTrigger trigger='focus' placement='top' overlay={popover(bonusTen)}>
                      <Button variant='success'>Show bonus info</Button>
                    </OverlayTrigger>
                  </ButtonGroup>
                  <ButtonGroup>
                    <Button className='payment-button' variant='outline-success' size='md' onClick={() => this.pay(25)}>
                      25$
                    </Button>
                    <OverlayTrigger trigger='focus' placement='top' overlay={popover(bonusTwentyFive)}>
                      <Button variant='success'>Show bonus info</Button>
                    </OverlayTrigger>
                  </ButtonGroup>
                  <ButtonGroup>
                    <Button className='payment-button' variant='outline-success' size='md' onClick={() => this.pay(50)}>
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
  match: PropTypes.shape({ params: PropTypes.object.isRequired }).isRequired,
  setRequestStatusAction: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  setRequestStatusAction: requestStatus => dispatch(setRequestStatus(requestStatus))
});

export default connect(null, mapDispatchToProps)(Project);
