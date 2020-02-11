import React from 'react';

export default function Comment({ comment }) {
  const { uid, email, displayName, photoURL, commentText, projectId, timeStamp } = comment;
  return (
    <li className='comment-container row mb-3'>
      <div className='user-avatar-container col-md-2 col-sm-2 col-3'>
        <img className='user-avatar rounded-circle' src={photoURL} alt='avatar' />
      </div>
      <div className='comment-text col-md-9 col-sm-9 col-9 h-100'>
        <div className='comment-info pl-1 pr-1'>
          <span>{displayName}</span>
          <time className='ml-3'>{timeStamp}</time>
        </div>
        <p className='mb-0 mt-1'>{commentText}</p>
      </div>
    </li>
  );
}
