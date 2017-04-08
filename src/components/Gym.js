import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { List, ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import { Tabs, Tab } from 'material-ui/Tabs';

import {
  listenToGym,
  listenToPosts,
  createNewPost,
  joinPost,
  startConversation,
  startForumConversation,
  listenToGymDetails,
} from '../actions/firebaseDb';

import Posts from './Posts';
import StartDiscussion from './StartDiscussion';
import GroupDiscussions from './GroupDiscussions';

class Gym extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'b',
    };
  }

  componentDidMount() {
    const { id } = this.props.params;
    this.props.listenToGym(id);
    this.props.listenToPosts(id);
    this.props.listenToGymDetails(id);
  }

  handleChange = (value) => {
    this.setState({
      value,
    });
  };

  render() {
    const {
      currentGym,
      createNewPost,
      posts,
      joinPost,
      startConversation,
      user,
      startForumConversation,
      details,
    } = this.props;

    console.log('details:', details);
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
    let discussions;
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

    if (details) {
      discussions = details.discussions;
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
            <div className="staticMapContainer">
              {map}
            </div>
            <br />

            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
            >
              <Tab label="Climbing Requests" value="a" style={{ backgroundColor: '#dd6912' }}>
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
              </Tab>
              <Tab label="Forums" value="b" style={{ backgroundColor: '#dd6912' }}>
                <div>
                  <h1>Forums</h1>
                  <StartDiscussion submit={startForumConversation} groupId={this.props.params.id} />
                  <GroupDiscussions discussions={discussions} groupId={this.props.params.id} />
                </div>
              </Tab>
            </Tabs>

          </div>
          <div className="profileRight" />
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state => ({
  currentGym: state.currentGym,
  posts: state.posts,
  user: state.auth.user,
  details: state.gymDetails,
}));

const mapDispatchToProps = dispatch => ({
  listenToGym(id) {
    dispatch(listenToGym(id));
  },
  listenToPosts(id) {
    dispatch(listenToPosts(id));
  },
  listenToGymDetails(id) {
    dispatch(listenToGymDetails(id));
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
  startForumConversation(gymId, messageObj) {
    dispatch(startForumConversation(gymId, messageObj));
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
  startForumConversation: PropTypes.func,
  listenToGymDetails: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Gym);
