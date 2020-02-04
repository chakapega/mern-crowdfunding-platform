import React, { Component } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import ImageUploader from 'react-images-upload';

export default class CreateProjectPage extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let date = currentDate.getDate();
    if (date < 10) date += '0';
    if (month < 10) month += '0';
    const minimumDate = `${year}-${month}-${date}`;
    this.state = {
      name: '',
      description: '',
      category: 'Technology',
      tags: '',
      images: [],
      video: '',
      fundraisingEndDate: '',
      target: '',
      bonusTen: '',
      bonusTwentyFive: '',
      bonusFifty: '',
      minimumDate
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

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
  };

  onDrop = images => {
    this.setState({
      images
    });
  };

  render() {
    const { minimumDate } = this.state;

    return (
      <Form className='container mt-3' id='create-project-form' onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label>Project name</Form.Label>
          <Form.Control name='name' type='text' placeholder='Project name' onChange={this.handleInputChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Project description</Form.Label>
          <Form.Control name='description' as='textarea' rows='3' onChange={this.handleInputChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control name='category' as='select' onChange={this.handleInputChange}>
            <option>Technology</option>
            <option>Education</option>
            <option>Food</option>
            <option>Games</option>
            <option>Fashion</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Tags</Form.Label>
          <Form.Control name='tags' type='text' placeholder='Tags...' onChange={this.handleInputChange} />
          <Form.Text className='text-muted'>Enter tags separated by commas</Form.Text>
        </Form.Group>
        <Form.Label>Target amount of money</Form.Label>
        <InputGroup className='mb-3'>
          <InputGroup.Prepend>
            <InputGroup.Text>$</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control name='target' type='number' onChange={this.handleInputChange} />
        </InputGroup>
        <Form.Group>
          <Form.Label>Fundraising End Date (mm/dd/yyyy)</Form.Label>
          <Form.Control name='fundraisingEndDate' type='date' min={minimumDate} onChange={this.handleInputChange} />
        </Form.Group>
        <InputGroup className='mb-3'>
          <InputGroup.Prepend>
            <InputGroup.Text>$ 10 Bonus</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl name='bonusTen' as='textarea' onChange={this.handleInputChange} />
        </InputGroup>
        <InputGroup className='mb-3'>
          <InputGroup.Prepend>
            <InputGroup.Text>$ 25 Bonus</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl name='bonusTwentyFive' as='textarea' onChange={this.handleInputChange} />
        </InputGroup>
        <InputGroup className='mb-3'>
          <InputGroup.Prepend>
            <InputGroup.Text>$ 50 Bonus</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl name='bonusFifty' as='textarea' onChange={this.handleInputChange} />
        </InputGroup>
        <Form.Group>
          <ImageUploader onChange={this.onDrop} withPreview />
        </Form.Group>
        <Form.Group>
          <Form.Label>Link to YouTube video</Form.Label>
          <Form.Control name='video' type='url' placeholder='Link to YouTube video' onChange={this.handleInputChange} />
          <Form.Text className='text-muted'>Example: https://www.youtube.com/...</Form.Text>
        </Form.Group>
        <Button className='mb-5' type='submit'>
          Create project
        </Button>
      </Form>
    );
  }
}
