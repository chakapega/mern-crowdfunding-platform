import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, FormControl, Button } from 'react-bootstrap';

import { setSearchingResults } from '../../store/search/actions';
import { interfaceTexts } from '../../shared/constants';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      showResults: false
    };
  }

  handleInputChange = event => {
    const {
      target: { value }
    } = event;

    this.setState({
      searchText: value
    });
  };

  search = event => {
    event.preventDefault();
    const { searchText } = this.state;
    const { setSearchingResultsAction } = this.props;

    this.setState({
      showResults: true
    });
    setTimeout(() => {
      this.setState({
        showResults: false
      });
    }, 0);
    fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify({
        searchText
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        const { projects } = response;

        setSearchingResultsAction(projects);
      });
  };

  render() {
    const { language } = this.props;
    const { showResults } = this.state;

    return (
      <div className='ml-auto'>
        <Form className='d-flex' onSubmit={this.search}>
          <FormControl
            type='text'
            placeholder={interfaceTexts.search[language]}
            required
            onChange={this.handleInputChange}
          />
          <Button className='ml-1' variant='outline-success' type='submit'>
            {interfaceTexts.search[language]}
          </Button>
        </Form>
        {showResults && <Redirect to='/search' />}
      </div>
    );
  }
}

Search.propTypes = {
  setSearchingResultsAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  language: state.language.language
});
const mapDispatchToProps = dispatch => ({
  setSearchingResultsAction: searchingResults => dispatch(setSearchingResults(searchingResults))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
