import React from 'react';
// import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
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
        <PostCard post={posts[post]} />
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

// PostsList.propTypes = {
//   id: React.propTypes.string.isRequired,
//   name: React.propTypes.string.isRequired,
//   city: React.propTypes.string.isRequired,
//   state: React.propTypes.string.isRequired,
//   createNewPost: React.propTypes.func.isRequired,
// };

export default PostsList;
