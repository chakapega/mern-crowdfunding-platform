import React from 'react';

import cycoProjectImage from '../../assets/images/cyco-project-image.png';

export default function Project() {
  return (
    <div className='col s5'>
      <div className='card'>
        <div className='card-image'>
          <img src={cycoProjectImage} alt='cyco' />
          <span className='card-title'>Cyco project</span>
        </div>
        <div className='card-content'>
          <p>
            I am a very simple card. I am good at containing small bits of information. I am convenient because I
            require little markup to use effectively.
          </p>
        </div>
        <div className='card-action'>
          <a href='#'>This is a link</a>
        </div>
      </div>
    </div>
  );
}
