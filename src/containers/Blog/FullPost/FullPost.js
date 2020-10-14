import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
  // 1. constructor sets this.state.post to null and passes props to Component
  // 2. render method is called: post is null
  // 3. user clicks on a post, triggers props to change and props.id now has a value
  // 4. update lifecycle hooks run
  // 5. shouldComponentUpdate is called:
  // 6. render() is called: id has a value but post does not, loading is rendered
  // 7. componentDidUpdate runs, http request to get the post is made asynchronously
  // 8. when the server responds, state is updated with the post
  // 9. update lifecycle hooks run again because state changed
  // 10. componentShouldUpdate runs

  // first scenario, id is a number and post is null, should updated
  // second scenario, id is a number and post is a post with the same id, should update once
  // third scenario, id is a number and post is the previous post, should update
  // fourth scenario, id a number and post is the next post

  state = {
    loading: false,
    editing: false,
    post: null,
    editedPost: null,
  };

  getPost = async id => {
    if (id) {
      try {
        this.setState({ loading: true }, async () => {
          const response = await axios.get(
            `/posts/${id}`
          );
          const post = response.data;
          this.setState({ post: post, editedPost: post, loading: false });
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  handleDeletePost = async id => {
    const response = await axios.delete(
      `/posts/${id}`
    );
    console.log(response);
  };

  handleEditPost = async id => {
    console.log(id);
    const response = await axios.put(
      `/posts/${id}`,
      this.state.editedPost
    );
    this.toggleEdit();
    console.log(response);
  };

  toggleEdit = () => {
    this.setState((prevState, props) => {
      return {
        editing: !prevState.editing,
      };
    });
  };

  componentDidUpdate() {
    console.log('updated');
    if (
      !this.state.loading &&
      (!this.state.post || this.state.post.id !== this.props.id)
    ) {
      this.getPost(this.props.id);
    }
  }

  render() {
    let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
    if (this.props.id && this.state.loading) {
      post = <p style={{ textAlign: 'center' }}>Loading...</p>;
    }
    if (this.state.post && !this.state.loading) {
      post = (
        <div className='FullPost'>
          <h1>{this.state.post.title}</h1>
          <p>{this.state.post.body}</p>
          <div className='Edit'>
            <button onClick={this.toggleEdit}>Edit</button>
            <button
              onClick={() => this.handleDeletePost(this.state.post.id)}
              className='Delete'>
              Delete
            </button>
          </div>
        </div>
      );
    }
    if (this.state.editing) {
      post = (
        <div className='FullPost'>
          <input
            onChange={event =>
              this.setState({
                editedPost: {
                  ...this.state.editedPost,
                  title: event.target.value,
                },
              })
            }
            value={this.state.editedPost.title}
          />
          <textarea
            onChange={event =>
              this.setState({
                editedPost: {
                  ...this.state.editedPost,
                  body: event.target.value,
                },
              })
            }
            value={this.state.editedPost.body}
          />
          <div className='Edit'>
            <button onClick={() => this.handleEditPost(this.state.post.id)}>
              Save
            </button>
            <button
              onClick={() => this.handleDeletePost(this.state.post.id)}
              className='Delete'>
              Delete
            </button>
          </div>
        </div>
      );
    }

    return post;
  }
}

export default FullPost;
