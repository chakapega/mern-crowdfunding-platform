import React, { Component } from 'react';
import { Form, Tabs, Tab, Button } from 'react-bootstrap';

export default class CreateProjectPage extends Component {
  render() {
    return (
      <Form className='container mt-3' id='create-project-form'>
        <Tabs>
          <Tab className='m-1' eventKey='description' title='Description'>
            <Form.Group>
              <Form.Label>Project name</Form.Label>
              <Form.Control type='text' placeholder='Project name' />
            </Form.Group>
            <Form.Group>
              <Form.Label>Project description</Form.Label>
              <Form.Control as='textarea' rows='3' />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control as='select'>
                <option>Technology</option>
                <option>Education</option>
                <option>Food</option>
                <option>Games</option>
                <option>Fashion</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Tags</Form.Label>
              <Form.Control type='text' placeholder='Tags...' />
              <Form.Text className='text-muted'>Enter tags separated by commas</Form.Text>
            </Form.Group>
          </Tab>
          <Tab className='m-1' eventKey='media' title='Media'>
            fdsfs
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
