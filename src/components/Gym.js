import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { List, ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';

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
    let map = '';
    let name = '';
    let offerings = '';
    let size = '';
    let state = '';
    let type = '';
    let wallHeight = '';
    let website = '#';
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
      type = currentGym.type ? currentGym.type : '';
      map = (<a
        href={`http://maps.google.com/?q=${address}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${currentGym.address}&zoom=14&size=640x400&markers=color:green%7Clabel:${name[0]}%7C${currentGym.address}&key=AIzaSyB-J112rvVfjpxkZQjxrHShja_t0dbYaX0`} className="map" alt="" />
      </a>);

      offerings = boldering ? `${offerings} boldering,` : offerings;
      offerings = top ? `${offerings} top rope,` : offerings;
      offerings = lead ? `${offerings} lead,` : offerings;
    }

    return (
      <div>
        <div className="profile">
          {/* <h1>Gym</h1> */}
          <div className="profileLeft">
            <img className="profileAvatar" src={image} alt={name} />
            <br />

            <List>
              <ListItem
                disabled
                primaryText="Size:"
                secondaryText={size}
                leftIcon={<FontIcon className="fa fa-bar-chart" />}
              />
              <ListItem
                disabled
                primaryText="Wall height:"
                secondaryText={wallHeight}
                leftIcon={<FontIcon className="fa fa-line-chart" />}
              />
              <ListItem
                disabled
                primaryText="Climbing surface:"
                secondaryText={climbingSurface}
                leftIcon={<FontIcon className="fa fa-area-chart" />}
              />
              <ListItem
                disabled
                primaryText="Hours:"
                secondaryText={hours}
                secondaryTextLines={2}
                leftIcon={<FontIcon className="fa fa-clock-o" />}
              />
              <ListItem
                disabled
                primaryText="Cost:"
                secondaryText={cost}
                secondaryTextLines={2}
                leftIcon={<FontIcon className="fa fa-usd" />}
              />
              <ListItem
                disabled
                primaryText="Climbing:"
                secondaryText={offerings}
                leftIcon={<FontIcon className="fa fa-building-o" />}
              />
            </List>

            <br />
          </div>
          <div className="profileCenter">
            <h1>{name}</h1>
            <h4>{type}</h4>
            <h3>{`${city}, ${state.substring(0, 2)}`}</h3>
            <p>{description}</p>
            <a className="externalLink" href={website} target="_blank" rel="noopener noreferrer"><FontIcon className="fa fa-link" /> Website</a>
            <br />
            <br />
            {map}
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
