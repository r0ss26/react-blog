import React from 'react';
import { withRouter } from 'react-router-dom'
import './Post.css';

const Post = (props) => {
  console.log(props)
  return (
    <article onClick={props.onClick} className='Post'>
      <h1>{props.title}</h1>
      <div className='Info'>
        <div className='Author'>{props.author}</div>
      </div>
    </article>
  );
};

export default withRouter(Post);