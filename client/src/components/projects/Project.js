import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, ProgressBar, ButtonGroup, Button, Container, Popover, OverlayTrigger, Toast } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import Rating from 'react-rating';
import BootstrapCarousel from '../carousel/BootstrapCarousel';

import { interfaceTexts } from '../../shared/constants';
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
      fundraisingEndDate: '',
      target: '',
      bonusTen: '',
      bonusTwentyFive: '',
      bonusFifty: '',
      video: '',
      ratings: [],
      isPayment: false
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
          fundraisingEndDate,
          target,
          bonusTen,
          bonusTwentyFive,
          bonusFifty,
          fundsRaised,
          video,
          ratings
        } = project;

        this.setState({
          imageLinks,
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
          ratings
        });
      });
  }

  pay = (paymentAmount, bonusInfo) => {
    const {
      match: {
        params: { id }
      },
      setRequestStatusAction,
      userData: { uid }
    } = this.props;

    setRequestStatusAction(true);
    fetch('/api/project-pay', {
      method: 'POST',
      body: JSON.stringify({
        id,
        paymentAmount,
        bonusInfo,
        uid
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        setTimeout(() => {
          this.setState({
            fundsRaised: response.fundsRaised,
            isPayment: true
          });
          setRequestStatusAction(false);
        }, 3000);
      });
  };

  handleRatingChange = value => {
    const {
      match: {
        params: { id }
      },
      userData: { uid }
    } = this.props;

    fetch('/api/project-change-rating', {
      method: 'POST',
      body: JSON.stringify({
        id,
        uid,
        value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({ ratings: response.ratings });
      });
  };

  calculateAverageRating = ratings => {
    if (ratings.length) {
      let sumOfAllRatings = 0;

      ratings.forEach(rating => {
        sumOfAllRatings += rating.value;
      });

      return sumOfAllRatings / ratings.length;
    }

    return 0;
  };

  getUserRating = ratings => {
    const {
      userData: { uid }
    } = this.props;
    let userRating = 0;

    ratings.forEach(rating => {
      if (rating.uid === uid) {
        userRating = rating.value;
      }
    });

    return userRating;
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
      imageLinks,
      ratings,
      isPayment
    } = this.state;
    const {
      language,
      match: {
        params: { id }
      },
      userData: { uid, status }
    } = this.props;
    const fundsRaisedPercent = (100 / target) * fundsRaised;
    const popover = bonus => (
      <Popover id='popover-basic'>
        <Popover.Content>{bonus}</Popover.Content>
      </Popover>
    );
    const averageRating = this.calculateAverageRating(ratings);
    const userRating = this.getUserRating(ratings);

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
                <Card.Title className='m-4'>
                  {language === 'en'
                    ? `Collected ${fundsRaised} of ${target} $`
                    : `Собрано ${fundsRaised} из ${target} $`}
                </Card.Title>
                <Card.Text>{`${interfaceTexts.category[language]}: ${category}`}</Card.Text>
                <Card.Text>{`${interfaceTexts.dateOfCompletionOfFundraising[language]}: ${fundraisingEndDate}`}</Card.Text>
                <div className='d-flex'>
                  <Rating
                    readonly={!uid || status === 'blocked'}
                    initialRating={userRating}
                    onChange={this.handleRatingChange}
                  />
                  <span className='ml-3 mt-1'>{`${interfaceTexts.averageRating[language]} ${averageRating}`}</span>
                </div>
                <div className='payment-buttons-container'>
                  <ButtonGroup className='payment-buttons-bootstrap-group'>
                    <Button
                      disabled={!uid || status === 'blocked'}
                      className='payment-button'
                      variant='outline-success'
                      size='md'
                      onClick={() => this.pay(10, bonusTen)}
                    >
                      10$
                    </Button>
                    <OverlayTrigger trigger='focus' placement='top' overlay={popover(bonusTen)}>
                      <Button variant='success'>{interfaceTexts.showBonusInfo[language]}</Button>
                    </OverlayTrigger>
                  </ButtonGroup>
                  <ButtonGroup>
                    <Button
                      disabled={!uid || status === 'blocked'}
                      className='payment-button'
                      variant='outline-success'
                      size='md'
                      onClick={() => this.pay(25, bonusTwentyFive)}
                    >
                      25$
                    </Button>
                    <OverlayTrigger trigger='focus' placement='top' overlay={popover(bonusTwentyFive)}>
                      <Button variant='success'>{interfaceTexts.showBonusInfo[language]}</Button>
                    </OverlayTrigger>
                  </ButtonGroup>
                  <ButtonGroup>
                    <Button
                      disabled={!uid || status === 'blocked'}
                      className='payment-button'
                      variant='outline-success'
                      size='md'
                      onClick={() => this.pay(50, bonusFifty)}
                    >
                      50$
                    </Button>
                    <OverlayTrigger trigger='focus' placement='top' overlay={popover(bonusFifty)}>
                      <Button variant='success'>{interfaceTexts.showBonusInfo[language]}</Button>
                    </OverlayTrigger>
                  </ButtonGroup>
                </div>
              </div>
            </div>
            <div className='container mt-5 mb-5 p-1'>
              <ReactMarkdown source={description} />
            </div>
            <Container>
              <BootstrapCarousel imageLinks={imageLinks} />
            </Container>
          </Card.Body>
        </Card>
        <Comments id={id} />
        {isPayment && (
          <div className='bootstrap-toast-container'>
            <Toast onClose={() => this.setState({ isPayment: false })} show={isPayment}>
              <Toast.Header>
                <strong className='mr-auto'>{interfaceTexts.notice[language]}</strong>
              </Toast.Header>
              <Toast.Body>{interfaceTexts.paymentCompletedSuccessfully[language]}</Toast.Body>
            </Toast>
          </div>
        )}
      </>
    );
  }
}

Project.propTypes = {
  match: PropTypes.shape({ params: PropTypes.object.isRequired }).isRequired,
  setRequestStatusAction: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  userData: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  language: state.language.language,
  userData: state.user.userData
});
const mapDispatchToProps = dispatch => ({
  setRequestStatusAction: requestStatus => dispatch(setRequestStatus(requestStatus))
});

export default connect(mapStateToProps, mapDispatchToProps)(Project);
