import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';

import { interfaceTexts } from '../../shared/constants';
import FoundProjectListItem from './FoundProjectListItem';

function SearchingResults({ foundProjects, language }) {
  return (
    <div className='container mt-3'>
      <h4>{interfaceTexts.searchingResults[language]}</h4>
      <ListGroup>
        {foundProjects.map(project => (
          <FoundProjectListItem key={project._id} project={project} />
        ))}
      </ListGroup>
    </div>
  );
}

SearchingResults.propTypes = {
  foundProjects: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
  language: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  foundProjects: state.search.foundProjects,
  language: state.language.language
});

export default connect(mapStateToProps)(SearchingResults);
