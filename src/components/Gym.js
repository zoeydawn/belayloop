import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { listenToGym, listenToPosts, createNewPost, joinPost, startConversation } from '../actions/firebaseDb';

import Posts from './Posts';

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
    const { currentGym, createNewPost, posts, joinPost, startConversation, user } = this.props;

    // console.log('posts:', posts);
    let address = '';
    let city = '';
    let climbingSurface = '';
    let cost = '';
    let description = '';
    let hours = '';
    let image = '';
    let name = '';
    let offerings = '';
    let size = '';
    let state = '';
    let wallHeight = '';
    let website = '';
    if (currentGym) {
      const { boldering, top, lead } = currentGym.offering;
      // console.log('currentGym:', currentGym);
      address = currentGym.address;
      city = currentGym.city;
      climbingSurface = currentGym.climbingSurface ? `${currentGym.climbingSurface} square feet` : 'unknown';
      cost = currentGym.cost ? currentGym.cost : 'unknown';
      description = currentGym.description;
      hours = currentGym.hours ? currentGym.hours : 'unknown';
      image = currentGym.image;
      name = currentGym.name;
      size = currentGym.size ? `${currentGym.size} square feet` : 'unknown';
      state = currentGym.state;
      wallHeight = currentGym.wallHeight ? `${currentGym.wallHeight} feet` : 'unknown';
      website = currentGym.website;

      offerings = boldering ? `${offerings} boldering,` : offerings;
      offerings = top ? `${offerings} top,` : offerings;
      offerings = lead ? `${offerings} lead,` : offerings;
    }

    return (
      <div>
        <div className="profile">
          {/* <h1>Gym</h1> */}
          <div className="profileLeft">
            <img className="profileAvatar" src={image} alt={name} />
            <p>Size: {size}</p>
            <p>Wall height: {wallHeight}</p>
            <p>Climbing surface: {climbingSurface}</p>
            <p>Cost: {cost}</p>
            <p>Hours: {hours}</p>
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
              joinPost={joinPost}
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
  joinPost(receiverObj, messageObj) {
    dispatch(joinPost(receiverObj, messageObj));
  },
  startConversation(receiverObj, messageObj) {
    dispatch(startConversation(receiverObj, messageObj));
  },
});

Gym.propTypes = {
  params: PropTypes.object,
  currentGym: PropTypes.object,
  user: PropTypes.object,
  createNewPost: PropTypes.func,
  posts: PropTypes.object,
  startConversation: PropTypes.func,
  joinPost: PropTypes.func,
  listenToPosts: PropTypes.func,
  listenToGym: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Gym);
