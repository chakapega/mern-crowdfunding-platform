import React from 'react';

export default function Comment() {
  return (
    <li className='comment-container row mb-3'>
      <div className='user-avatar-container col-md-2 col-sm-2 col-3'>
        <img className='user-avatar rounded-circle' src='http://nicesnippets.com/demo/man01.png' alt='avatar' />
      </div>
      <div className='comment-text col-md-9 col-sm-9 col-9 h-100'>
        <div className='comment-info pl-1 pr-1'>
          <span>Jacks David</span>
          <time className='ml-3'>1 hours ago</time>
        </div>
        <p className='mb-0 mt-1'>
          Thank you for visiting all the way from New York.Thank you for visiting all the way from New York.Thank you
          for visiting all the way from New York.Thank you for visiting all the way from New York.Thank you for visiting
          all the way from New York.Thank you for visiting all the way from New York.Thank you for visiting all the way
          from New York.Thank you for visiting all the way from New York.Thank you for visiting all the way from New
          York.Thank you for visiting all the way from New York.
        </p>
      </div>
    </li>
  );
}
