import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import io from 'socket.io-client';

import Comment from './Comment';

class Comments extends Component {
  constructor() {
    super();
    this.form = React.createRef();
    this.commentList = React.createRef();
    this.socket = io.connect('http://localhost:5000');
    this.state = {
      comments: [],
      commentText: ''
    };
  }

  componentDidMount() {
    const { id: projectId } = this.props;

    this.socket.emit('project id', projectId);
    this.socket.on('comments', comments => {
      this.setState({
        comments
      });
    });
  }

  componentDidUpdate() {
    this.commentList.current.scrollTop = this.commentList.current.scrollHeight;
  }

  getTimeStamp() {
    const currentDate = new Date();
    const [, , dayOfTheMonth, year, time] = currentDate.toString().split(' ');
    const month = currentDate.getMonth() + 1;

    return `${dayOfTheMonth}/${month}/${year} ${time}`;
  }

  handleInputChange = event => {
    const {
      target: { value }
    } = event;

    this.setState({
      commentText: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { commentText } = this.state;
    const {
      id: projectId,
      userData: { uid, email, displayName, photoURL }
    } = this.props;
    const timeStamp = this.getTimeStamp();

    this.socket.emit('comments', {
      uid,
      email,
      displayName,
      photoURL,
      commentText,
      projectId,
      timeStamp
    });
    this.form.current.reset();
  };

  render() {
    const { comments } = this.state;
    const {
      userData: { uid }
    } = this.props;

    return (
      <Container>
        <div className='row mt-5'>
          <div className='col-12 pt-4'>
            <ul className='comment-list p-0' ref={this.commentList}>
              {comments.map(comment => (
                <Comment key={comment._id} comment={comment} />
              ))}
            </ul>
            <Form ref={this.form} onSubmit={this.handleSubmit}>
              <InputGroup className='mb-3'>
                <FormControl
                  as='textarea'
                  rows='3'
                  required
                  maxLength='400'
                  placeholder={uid ? 'Write a comment ...' : 'Sign in to post a comment'}
                  onChange={this.handleInputChange}
                  disabled={!uid}
                />
                <InputGroup.Append>
                  <Button type='submit' disabled={!uid}>
                    Send
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
          </div>
        </div>
      </Container>
    );
  }
}

Comments.propTypes = {
  userData: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired
  }).isRequired,
  id: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  userData: state.user.userData
});

export default connect(mapStateToProps)(Comments);
