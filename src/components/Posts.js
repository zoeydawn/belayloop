import React from 'react';
// import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import PostModal from './PostModal';

const Posts = (props) => {
  const { id, name, city, state } = props;

  return (
    <div>
      <h2>Climbing requests:</h2>
      <PostModal
        id={id}
        name={name}
        city={city}
        state={state}
      />
    </div>
  );
};

export default Posts;
