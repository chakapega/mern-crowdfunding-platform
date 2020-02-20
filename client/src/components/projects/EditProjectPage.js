import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, Button, InputGroup, FormControl, Toast } from 'react-bootstrap';
import TagsInput from 'react-tagsinput';
import PropTypes from 'prop-types';

import { interfaceTexts } from '../../shared/constants';
import 'react-tagsinput/react-tagsinput.css';
import { setRequestStatus } from '../../store/loader/actions';

class EditProjectPage extends Component {
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
      _id: '',
      name: '',
      description: '',
      category: '',
      tags: [],
      fundraisingEndDate: '',
      target: '',
      bonusTen: '',
      bonusTwentyFive: '',
      bonusFifty: '',
      video: '',
      minimumDate,
      isEdited: false,
      isEditedAfterNotice: false
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
          _id,
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
        } = project;

        this.setState({
          _id,
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
        });
      });
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

    const { setRequestStatusAction } = this.props;
    const {
      _id,
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

    setRequestStatusAction(true);
    fetch('/api/edit-project', {
      method: 'POST',
      body: JSON.stringify({
        _id,
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
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      this.setState({
        isEdited: true
      });
      setRequestStatusAction(false);
    });
  };

  render() {
    const { language } = this.props;
    const {
      minimumDate,
      isEdited,
      isEditedAfterNotice,
      tags,
      name,
      description,
      category,
      fundraisingEndDate,
      target,
      bonusTen,
      bonusTwentyFive,
      bonusFifty,
      video
    } = this.state;

    if (isEditedAfterNotice) {
      return <Redirect to='/' />;
    }

    return (
      <>
        {isEdited ? (
          <div className='bootstrap-toast-container'>
            <Toast onClose={() => this.setState({ isEdited: false, isEditedAfterNotice: true })} show={isEdited}>
              <Toast.Header>
                <strong className='mr-auto'>{interfaceTexts.notice[language]}</strong>
              </Toast.Header>
              <Toast.Body>{interfaceTexts.projectSuccessfullyEdited[language]}</Toast.Body>
            </Toast>
          </div>
        ) : (
          <Form className='container mt-3' ref={this.form} onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>{interfaceTexts.projectName[language]}</Form.Label>
              <Form.Control
                value={name}
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
                value={description}
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
              <Form.Control value={category} name='category' as='select' required onChange={this.handleInputChange}>
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
              <Form.Control value={target} name='target' type='number' required onChange={this.handleInputChange} />
            </InputGroup>
            <Form.Group>
              <Form.Label>{interfaceTexts.fundraisingEndDate[language]}</Form.Label>
              <Form.Control
                value={fundraisingEndDate}
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
              <FormControl value={bonusTen} name='bonusTen' as='textarea' required onChange={this.handleInputChange} />
            </InputGroup>
            <InputGroup className='mb-3'>
              <InputGroup.Prepend>
                <InputGroup.Text>{interfaceTexts.bonusTwentyFive[language]}</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                value={bonusTwentyFive}
                name='bonusTwentyFive'
                as='textarea'
                required
                onChange={this.handleInputChange}
              />
            </InputGroup>
            <InputGroup className='mb-3'>
              <InputGroup.Prepend>
                <InputGroup.Text>{interfaceTexts.bonusFifty[language]}</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                value={bonusFifty}
                name='bonusFifty'
                as='textarea'
                required
                onChange={this.handleInputChange}
              />
            </InputGroup>
            <Form.Group>
              <Form.Label>{interfaceTexts.linkToYouTubeVideo[language]}</Form.Label>
              <Form.Control
                value={video}
                name='video'
                type='url'
                placeholder={interfaceTexts.linkToYouTubeVideo[language]}
                required
                onChange={this.handleInputChange}
              />
              <Form.Text className='text-muted'>{interfaceTexts.linkToYouTubeVideoDescription[language]}</Form.Text>
            </Form.Group>
            <Button className='mb-5' type='submit' variant='secondary'>
              {interfaceTexts.editProject[language]}
            </Button>
            <Button className='mb-5 ml-3' type='button' onClick={() => this.setState({ isEditedAfterNotice: true })}>
              {interfaceTexts.cancel[language]}
            </Button>
          </Form>
        )}
      </>
    );
  }
}

EditProjectPage.propTypes = {
  match: PropTypes.shape({ params: PropTypes.object.isRequired }).isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProjectPage);
