import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { connect } from 'react-redux';

import { Tabs, Tab } from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';

import { listenToGroup, joinGroup } from '../actions/firebaseDb';
// import { startListeningToUser, updateUserInfo } from '../actions/firebaseDb';
// import EditInfo from './EditInfo';
// import PublicInfoModal from './PublicInfoModal';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

class Group extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     value: 'a',
  //   };
  // }

  componentDidMount() {
    this.props.listenToGroup(this.props.params.id);
  }

  handleChange = (value) => {
    this.setState({
      value,
    });
  }

  join = () => {
    const { currentGroup, joinGroup } = this.props;
    const { name, description } = currentGroup;
    // console.log('currentGroup:', currentGroup);
    const obj = {
      name,
      description,
      id: this.props.params.id,
    };
    joinGroup(obj);
  }

  render() {
    const { currentGroup, joinGroup } = this.props;
    let name = '';
    let description = '';

    if (currentGroup) {
      name = currentGroup.name;
      description = currentGroup.description;
      console.log('currentGroup:', currentGroup);
    }
    return (
      <div>
        <div className="profile">
          <h2>Members</h2>
          <div className="profileLeft">
          </div>
          <div className="profileCenter">
            <h1>{name}</h1>
            <p>{description}</p>
            <RaisedButton
              icon={<FontIcon className="fa fa-user-plus" />}
              label="Join"
              style={{ height: 36 }}
              onTouchTap={this.join}
            />
          </div>
          <div className="profileRight"></div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state => ({
  currentGroup: state.currentGroup,
}));

const mapDispatchToProps = dispatch => ({
  listenToGroup(id) {
    dispatch(listenToGroup(id));
  },
  joinGroup(obj) {
    dispatch(joinGroup(obj));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Group);
