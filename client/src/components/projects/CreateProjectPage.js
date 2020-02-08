import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button, InputGroup, FormControl, Toast } from 'react-bootstrap';
import TagsInput from 'react-tagsinput';
import ImageUploader from 'react-images-upload';
import PropTypes from 'prop-types';
import { storage } from '../../firebase/firebase';

export default class CreateProjectPage extends Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let date = currentDate.getDate();
    /* eslint-disable */
    if (date < 10) date = '0' + date;
    if (month < 10) month = '0' + month;
    /* eslint-enable */
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
      isCreated: false
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

  handleSubmit = event => {
    event.preventDefault();

    const {
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
        });
      } else {
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

  onDrop = images => {
    this.setState({
      images
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
    const { minimumDate, isError, error, isCreated } = this.state;

    return (
      <>
        {isCreated ? (
          <Redirect to='/' />
        ) : (
          <Form className='container mt-3' id='create-project-form' ref={this.form} onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Project name</Form.Label>
              <Form.Control
                name='name'
                type='text'
                placeholder='Project name'
                required
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Project description</Form.Label>
              <Form.Control
                name='description'
                placeholder='Project description'
                as='textarea'
                rows='3'
                required
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control name='category' as='select' required onChange={this.handleInputChange}>
                <option>Technology</option>
                <option>Education</option>
                <option>Food</option>
                <option>Games</option>
                <option>Fashion</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Tags</Form.Label>
              <TagsInput value={this.state.tags} onChange={this.handleTagsInputChange} addOnBlur />
            </Form.Group>
            <Form.Label>Target amount of money</Form.Label>
            <InputGroup className='mb-3'>
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control name='target' type='number' required onChange={this.handleInputChange} />
            </InputGroup>
            <Form.Group>
              <Form.Label>Fundraising End Date (mm/dd/yyyy)</Form.Label>
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
                <InputGroup.Text>$ 10 Bonus</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl name='bonusTen' as='textarea' required onChange={this.handleInputChange} />
            </InputGroup>
            <InputGroup className='mb-3'>
              <InputGroup.Prepend>
                <InputGroup.Text>$ 25 Bonus</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl name='bonusTwentyFive' as='textarea' required onChange={this.handleInputChange} />
            </InputGroup>
            <InputGroup className='mb-3'>
              <InputGroup.Prepend>
                <InputGroup.Text>$ 50 Bonus</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl name='bonusFifty' as='textarea' required onChange={this.handleInputChange} />
            </InputGroup>
            <Form.Group>
              <ImageUploader withPreview onChange={this.onDrop} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Link to YouTube video</Form.Label>
              <Form.Control
                name='video'
                type='url'
                placeholder='Link to YouTube video'
                required
                onChange={this.handleInputChange}
              />
              <Form.Text className='text-muted'>
                You must insert an address to embed the video. Under your video, click on the share button, then click
                on the embed button and copy from the proposed code what is specified in src (without quotes).
              </Form.Text>
            </Form.Group>
            <Button className='mb-5' type='submit'>
              Create project
            </Button>
            {isError && (
              <Toast
                className='bootstrap-toast'
                onClose={() => this.setState({ isError: false, error: '' })}
                show={isError}
              >
                <Toast.Header>
                  <strong className='mr-auto'>Error</strong>
                </Toast.Header>
                <Toast.Body>{error}</Toast.Body>
              </Toast>
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
  }).isRequired
};
