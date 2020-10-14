import React from 'react';

import './Post.css';

const Post = ({ title, author, onClick }) => (
    <article onClick={onClick} className="Post">
        <h1>{title}</h1>
        <div className="Info">
            <div className="Author">{author}</div>
        </div>
    </article>
);

export default Post;