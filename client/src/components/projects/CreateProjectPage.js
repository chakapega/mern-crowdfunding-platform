import React, { Component } from 'react';
import { Form, Tabs, Tab, Button } from 'react-bootstrap';
import ImageUploader from 'react-images-upload';

export default class CreateProjectPage extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      name: '',
      description: '',
      category: 'Technology',
      tags: '',
      images: []
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
    return (
      <Form className='container mt-3' id='create-project-form' onSubmit={this.handleSubmit}>
        <Tabs>
          <Tab className='m-1' eventKey='description' title='Description'>
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
          </Tab>
          <Tab className='m-1' eventKey='media' title='Media'>
            <Form.Group>
              <ImageUploader onChange={this.onDrop} withPreview />
            </Form.Group>
          </Tab>
          <Tab className='m-1' eventKey='crowdfunding details' title='Crowdfunding details'>
            fdsfsdf
          </Tab>
        </Tabs>
        <Button type='submit'>Create project</Button>
      </Form>
    );
  }
}
