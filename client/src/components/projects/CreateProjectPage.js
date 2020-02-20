import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, Button, InputGroup, FormControl, Toast } from 'react-bootstrap';
import TagsInput from 'react-tagsinput';
import ImageUploader from 'react-images-upload';
import PropTypes from 'prop-types';
import { storage } from '../../firebase/firebase';

import { interfaceTexts } from '../../shared/constants';
import 'react-tagsinput/react-tagsinput.css';
import { setRequestStatus } from '../../store/loader/actions';

class CreateProjectPage extends Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let date = currentDate.getDate();
    if (date < 10) date = `0${date}`;
    if (month < 10) month = `0${month}`;
    const minimumDate = `${year}-${month}-${date}`;
    this.state = {
      name: '',
      description: '',
      category: 'Technology',
      tags: [],
      fundraisingEndDate: '',
      target: '',
      bonusTen: '',
      bonusTwentyFive: '',
      bonusFifty: '',
      video: '',
      images: [],
      minimumDate,
      isError: false,
      error: '',
      isCreated: false,
      isCreatedAfterNotice: false
    };
  }

  handleInputChange = event => {
    const {
      target: { value, name }
    } = event;

    this.setState({
      [name]: value
    });
  };

  handleTagsInputChange = tags => {
    this.setState({ tags });
  };

  handleImageUploaderChange = images => {
    this.setState({
      images
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const {
      setRequestStatusAction,
      userData: { uid, email }
    } = this.props;
    const {
      name,
      description,
      category,
      tags,
      fundraisingEndDate,
      target,
      bonusTen,
      bonusTwentyFive,
      bonusFifty,
      video
    } = this.state;
    const fundsRaised = 0;

    setRequestStatusAction(true);
    this.uploadImagesToStorage().then(imageLinks => {
      if (imageLinks.length) {
        fetch('/api/create-project', {
          method: 'POST',
          body: JSON.stringify({
            uid,
            email,
            name,
            description,
            category,
            tags,
            fundraisingEndDate,
            target,
            bonusTen,
            bonusTwentyFive,
            bonusFifty,
            fundsRaised,
            video,
            imageLinks
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(() => {
          this.setState({
            isCreated: true
          });
          setRequestStatusAction(false);
        });
      } else {
        setRequestStatusAction(false);
        this.setState({
          isError: true,
          error: 'You must upload at least one image for your project'
        });
      }
    });
  };

  uploadImageToStoragePromise = async image => {
    return new Promise(resolve => {
      const storageRef = storage.ref(`images/${image.name}`);
      const uploadTask = storageRef.put(image);

      uploadTask.on(
        'state_changed',
        function progress() {},
        function error() {},
        function complete() {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  async uploadImagesToStorage() {
    const imageLinks = [];
    const { images } = this.state;

    /* eslint-disable */
    for (const image of images) {
      const imageUrl = await this.uploadImageToStoragePromise(image);

      imageLinks.push(imageUrl);
    }
    /* eslint-enable */

    return imageLinks;
  }

  render() {
    const { language } = this.props;
    const { minimumDate, isError, error, isCreated, isCreatedAfterNotice, tags } = this.state;

    if (isCreatedAfterNotice) {
      return <Redirect to='/' />;
    }

    return (
      <>
        {isCreated ? (
          <div className='bootstrap-toast-container'>
            <Toast onClose={() => this.setState({ isCreated: false, isCreatedAfterNotice: true })} show={isCreated}>
              <Toast.Header>
                <strong className='mr-auto'>{interfaceTexts.notice[language]}</strong>
              </Toast.Header>
              <Toast.Body>{interfaceTexts.projectSuccessfullyCreated[language]}</Toast.Body>
            </Toast>
          </div>
        ) : (
          <Form className='container mt-3' ref={this.form} onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>{interfaceTexts.projectName[language]}</Form.Label>
              <Form.Control
                name='name'
                type='text'
                placeholder={interfaceTexts.projectName[language]}
                required
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>{interfaceTexts.projectDescription[language]}</Form.Label>
              <Form.Control
                name='description'
                placeholder={interfaceTexts.projectDescription[language]}
                as='textarea'
                rows='3'
                required
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>{interfaceTexts.category[language]}</Form.Label>
              <Form.Control name='category' as='select' required onChange={this.handleInputChange}>
                <option>{interfaceTexts.technology[language]}</option>
                <option>{interfaceTexts.education[language]}</option>
                <option>{interfaceTexts.food[language]}</option>
                <option>{interfaceTexts.games[language]}</option>
                <option>{interfaceTexts.fashion[language]}</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>{interfaceTexts.tags[language]}</Form.Label>
              <TagsInput value={tags} onChange={this.handleTagsInputChange} addOnBlur />
            </Form.Group>
            <Form.Label>{interfaceTexts.targetAmountOfMoney[language]}</Form.Label>
            <InputGroup className='mb-3'>
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control name='target' type='number' required onChange={this.handleInputChange} />
            </InputGroup>
            <Form.Group>
              <Form.Label>{interfaceTexts.fundraisingEndDate[language]}</Form.Label>
              <Form.Control
                name='fundraisingEndDate'
                type='date'
                min={minimumDate}
                required
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <InputGroup className='mb-3'>
              <InputGroup.Prepend>
                <InputGroup.Text>{interfaceTexts.bonusTen[language]}</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl name='bonusTen' as='textarea' required onChange={this.handleInputChange} />
            </InputGroup>
            <InputGroup className='mb-3'>
              <InputGroup.Prepend>
                <InputGroup.Text>{interfaceTexts.bonusTwentyFive[language]}</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl name='bonusTwentyFive' as='textarea' required onChange={this.handleInputChange} />
            </InputGroup>
            <InputGroup className='mb-3'>
              <InputGroup.Prepend>
                <InputGroup.Text>{interfaceTexts.bonusFifty[language]}</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl name='bonusFifty' as='textarea' required onChange={this.handleInputChange} />
            </InputGroup>
            <Form.Group>
              <ImageUploader withPreview onChange={this.handleImageUploaderChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>{interfaceTexts.linkToYouTubeVideo[language]}</Form.Label>
              <Form.Control
                name='video'
                type='url'
                placeholder={interfaceTexts.linkToYouTubeVideo[language]}
                required
                onChange={this.handleInputChange}
              />
              <Form.Text className='text-muted'>{interfaceTexts.linkToYouTubeVideoDescription[language]}</Form.Text>
            </Form.Group>
            <Button className='mb-5' type='submit'>
              {interfaceTexts.createProject[language]}
            </Button>
            {isError && (
              <div className='bootstrap-toast-container'>
                <Toast onClose={() => this.setState({ isError: false, error: '' })} show={isError}>
                  <Toast.Header>
                    <strong className='mr-auto'>{interfaceTexts.error[language]}</strong>
                  </Toast.Header>
                  <Toast.Body>{error}</Toast.Body>
                </Toast>
              </div>
            )}
          </Form>
        )}
      </>
    );
  }
}

CreateProjectPage.propTypes = {
  userData: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired,
  setRequestStatusAction: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  userData: state.user.userData,
  language: state.language.language
});
const mapDispatchToProps = dispatch => ({
  setRequestStatusAction: requestStatus => dispatch(setRequestStatus(requestStatus))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectPage);
