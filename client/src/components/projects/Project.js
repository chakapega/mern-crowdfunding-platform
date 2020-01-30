import React from 'react';

import cycoProjectImage from '../../assets/images/cyco-project-image.png';

export default function Project() {
  return (
    <div className='card col-sm' style={{ maxWidth: '26rem' }}>
      <img className='card-img-top' src={cycoProjectImage} alt='cyco' />
      <div className='card-body'>
        <h5 className='card-title'>Cyco project</h5>
        <p className='card-text'>
          Some quick example text to build on the card title and make up the bulk of the card&apos;s content.
        </p>
        <a href='/project' className='btn btn-primary'>
          Open project
        </a>
      </div>
    </div>
  );
}
