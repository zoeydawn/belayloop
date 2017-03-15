import React, { PropTypes } from 'react';
import PostCard from './PostCard';

const PostsList = (props) => {
  const { posts } = props;
  let list = '';
  if (posts) {
    const sortedPosts = Object.keys(posts).sort((a, b) => {
      return new Date(JSON.parse(posts[a].timestamp)) - new Date(JSON.parse(posts[b].timestamp));
    });
    list = sortedPosts.map(post => (
      <div key={post}>
        <br />
        <PostCard post={posts[post]} submitMessage={props.submitMessage} />
        <br />
      </div>
    ));
  }
  return (
    <div>
      {list}
    </div>
  );
};

PostsList.propTypes = {
  posts: PropTypes.object,
  submitMessage: PropTypes.func,
};

export default PostsList;
