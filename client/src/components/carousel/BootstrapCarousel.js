import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';

export default function BootstrapCarousel({ imageLinks }) {
  return (
    <Carousel>
      {imageLinks.map(imageLink => (
        <Carousel.Item key={imageLink}>
          <img className='bootstrap-carousel-image d-block mx-auto' src={imageLink} alt='project' />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

BootstrapCarousel.propTypes = {
  imageLinks: PropTypes.arrayOf(PropTypes.string).isRequired
};
