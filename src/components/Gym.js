import React, { Component, PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { connect } from 'react-redux';

import { Tabs, Tab } from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

import { listenToGym, listenToPosts, createNewPost, startConversation } from '../actions/firebaseDb';

import Posts from './Posts';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

class Gym extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
  }

  componentDidMount() {
    const { id } = this.props.params;
    this.props.listenToGym(id);
    this.props.listenToPosts(id);
  }

  handleChange = (value) => {
    this.setState({
      value,
    });
  };

  render() {
    const { currentGym, createNewPost, posts, startConversation, user } = this.props;
    // // const { belay, bio, boldering, city, country, lead, skill, state } = userDetails;
    // const { displayName, email, uid, photoURL } = this.props.user;
    // let details = {
    console.log('posts:', posts);
    let address = '';
    let city = '';
    let description = '';
    let image = '';
    let name = '';
    let offerings = '';
    let size = '';
    let state = '';
    let streetAddress = '';
    let wallHeight = '';
    let website = '';
    // }let
    if (currentGym) {
      const { boldering, top, lead } = currentGym.offering;
      // details = {
      address = currentGym.address;
      city = currentGym.city;
      description = currentGym.description;
      image = currentGym.image;
      name = currentGym.name;
      // offering = currentGym.offering;
      size = currentGym.size;
      state = currentGym.state;
      streetAddress = currentGym.streetAddress;
      wallHeight = currentGym.wallHeight;
      website = currentGym.website;
      // };
      offerings = boldering ? offerings + ' boldering,' : offerings;
      offerings = top ? offerings + ' top rope,' : offerings;
      offerings = lead ? offerings + ' lead' : offerings;
    }

    // console.log('this.props.currentGym:', this.props.currentGym);
    return (
      <div>
        <div className="profile">
          {/* <h1>Gym</h1> */}
          <div className="profileLeft">
            <img className="profileAvatar" src={image} alt={name} />
            <p>{size} square feet</p>
            <p>{wallHeight} foot walls</p>
            <p>{offerings}</p>
            <a href={website} target="_blank" rel="noopener noreferrer">Website</a>
            <br />
            <a href={`http://maps.google.com/?q=${address}`} target="_blank" rel="noopener noreferrer">Map</a>
          </div>
          <div className="profileCenter">
            <h1>{name}</h1>
            <h3>{`${city}, ${state.substring(0, 2)}`}</h3>
            <p>{description}</p>
            <br />
            <Posts
              id={this.props.params.id}
              name={name}
              city={city}
              state={state}
              createNewPost={createNewPost}
              posts={posts}
              submitMessage={startConversation}
              user={user}
            />
          </div>
          <div className="profileRight"></div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state => ({
  currentGym: state.currentGym,
  posts: state.posts,
  user: state.auth.user,
}));

const mapDispatchToProps = dispatch => ({
  listenToGym(id) {
    dispatch(listenToGym(id));
  },
  listenToPosts(id) {
    dispatch(listenToPosts(id));
  },
  createNewPost(obj) {
    dispatch(createNewPost(obj));
  },
  startConversation(receiverObj, messageObj) {
    dispatch(startConversation(receiverObj, messageObj));
  },
});

Gym.propTypes = {
  currentGym: PropTypes.object,
  user: PropTypes.object,
  createNewPost: PropTypes.func,
  posts: PropTypes.object,
  startConversation: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Gym);
