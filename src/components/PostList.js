import React, { PropTypes } from 'react';
import PostCard from './PostCard';

const PostsList = (props) => {
  const { posts, submitMessage, joinPost, user } = props;
  let list = '';
  const currentTime = new Date();
  // console.log('user:', user);
  if (posts) {
    const sortedPosts = Object.keys(posts).sort((a, b) => {
      // console.log(':', new Date(JSON.parse(posts[a].timestamp)));
      return new Date(JSON.parse(posts[a].timestamp)) - new Date(JSON.parse(posts[b].timestamp));
    });
    list = sortedPosts.map((post) => {
      // console.log('posts[post].timestamp:', posts[post].timestamp);
      if (new Date(JSON.parse(posts[post].timestamp)) - currentTime > 0) {
        return (
          <div key={post}>
            <br />
            <PostCard post={posts[post]} submitMessage={submitMessage} joinPost={joinPost} user={user} />
            <br />
          </div>
        );
      }
      return '';
    });
  }
  return (
    <div>
      {list}
    </div>
  );
};

PostsList.propTypes = {
  posts: PropTypes.object,
  user: PropTypes.object,
  submitMessage: PropTypes.func,
};

export default PostsList;
