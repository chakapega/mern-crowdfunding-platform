import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavDropdown } from 'react-bootstrap';

import { setLanguage } from '../../store/languageSwitch/actions';
import { interfaceTexts, english, russian } from '../../shared/constants';

function LanguageSwitch({ language, setLanguageAction }) {
  const changeLanguage = selectedLanguage => {
    if (language !== selectedLanguage) setLanguageAction(selectedLanguage);
  };

  return (
    <NavDropdown title={interfaceTexts.language[language]} id='basic-nav-dropdown'>
      <NavDropdown.Item onClick={() => changeLanguage('en')}>{english}</NavDropdown.Item>
      <NavDropdown.Item onClick={() => changeLanguage('ru')}>{russian}</NavDropdown.Item>
    </NavDropdown>
  );
}

LanguageSwitch.propTypes = {
  setLanguageAction: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  language: state.language.language
});
const mapDispatchToProps = dispatch => ({
  setLanguageAction: language => dispatch(setLanguage(language))
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSwitch);
