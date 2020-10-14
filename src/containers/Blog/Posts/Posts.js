import React, { Component } from 'react';

import axios from '../../../axios';

import Post from '../../../components/Post/Post';
import './Posts.css';

export default class Posts extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    console.log('componentdidmount');
    try {
      const response = await axios.get('/posts');
      const posts = response.data.slice(0, 4);
      const updatedPosts = posts.map(post => ({
        ...post,
        author: 'Ross',
      }));
      this.setState({ posts: updatedPosts });
    } catch (error) {
      console.log(error);
    }
  }

  handleClick = id => {
    console.log('clicked');
    if (!this.state.selectedPostId || id !== this.state.selectedPostId) {
      // const post = this.state.posts.find((post) => (post.id === id))
      this.setState({ selectedPostId: id });
    }
  };
  render() {
    const posts = this.state.posts.map(post => (
      <Post
        onClick={() => this.handleClick(post.id)}
        key={post.title}
        title={post.title}
        author={post.author}
      />
    ));
    return <section className='Posts'>{posts}</section>;
  }
}
