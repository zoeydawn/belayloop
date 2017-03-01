import React from 'react';
import Snackbar from 'material-ui/Snackbar';

const Bar = (props) => {
  const { open, text } = props;

  return (
    <Snackbar
      open={open}
      message={text}
      autoHideDuration={4000}
    />
  );
};

export default Bar;
