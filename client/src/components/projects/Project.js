import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, ProgressBar, Button, Container } from 'react-bootstrap';
import BootstrapCarousel from '../carousel/BootstrapCarousel';

class Project extends Component {
  render() {
    const {
      selectedProject: {
        name,
        description,
        category,
        tags,
        fundraisingEndDate,
        target,
        bonusTen,
        bonusTwentyFive,
        bonusFifty,
        video,
        imageLinks = []
      }
    } = this.props;

    return (
      <>
        {name ? (
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
                  <Card.Text>
                    Date of completion of fundraising
                    {fundraisingEndDate}
                  </Card.Text>
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
              <Card.Text className='container mt-5 mb-5 p-1'>{description}</Card.Text>
              <Container>
                <BootstrapCarousel imageLinks={imageLinks} />
              </Container>
            </Card.Body>
          </Card>
        ) : (
          <Redirect to='/' />
        )}
      </>
    );
  }
}

Project.propTypes = {
  selectedProject: PropTypes.shape({
    imageLinks: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    fundraisingEndDate: PropTypes.string.isRequired,
    target: PropTypes.string.isRequired,
    bonusTen: PropTypes.string.isRequired,
    bonusTwentyFive: PropTypes.string.isRequired,
    bonusFifty: PropTypes.string.isRequired,
    video: PropTypes.string.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  selectedProject: state.projects.selectedProject
});

export default connect(mapStateToProps)(Project);
