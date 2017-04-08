import React, { PropTypes } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const Auth = (props) => {
  const { googleSignIn } = props;
  return (
    <div>
      <RaisedButton
        className="logInButton"
        label="Sign In with Google"
        backgroundColor="rgb(220, 74, 56)"
        icon={<FontIcon className="fa fa-google" />}
        onTouchTap={googleSignIn}
      />
      <RaisedButton
        className="logInButton"
        label="Sign In with Facebook"
        backgroundColor="rgb(59, 89, 152)"
        icon={<FontIcon className="fa fa-facebook-f" />}
      />
      <RaisedButton
        className="logInButton"
        label="Sign In with Email"
        icon={<FontIcon className="fa fa-envelope" />}
      />
    </div>
  );
};

Auth.propTypes = {
  googleSignIn: PropTypes.func,
};

export default Auth;
