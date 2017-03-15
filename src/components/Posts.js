import React from 'react';
// import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import PostModal from './PostModal';
import PostList from './PostList';

const Posts = (props) => {
  const { id, name, city, state, createNewPost, posts } = props;

  return (
    <div>
      <h2>Climbing requests:</h2>
      <PostModal
        id={id}
        name={name}
        city={city}
        state={state}
        submit={createNewPost}
      />
      <PostList posts={posts} />
    </div>
  );
};

// Posts.propTypes = {
//   id: React.propTypes.string.isRequired,
//   name: React.propTypes.string.isRequired,
//   city: React.propTypes.string.isRequired,
//   state: React.propTypes.string.isRequired,
//   createNewPost: React.propTypes.func.isRequired,
// };

export default Posts;
