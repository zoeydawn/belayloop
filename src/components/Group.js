import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { connect } from 'react-redux';

import { Tabs, Tab } from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

import { listenToGroup } from '../actions/firebaseDb';
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
  };

  render() {
    const { currentGroup } = this.props;
    let name = '';
    let description = '';

    if (currentGroup) {
      name = currentGroup.name;
      description = currentGroup.description;
    }
    return (
      <div>
        <div className="profile">
          {/* <h1>Gym</h1> */}
          <div className="profileLeft">
          </div>
          <div className="profileCenter">
            <h1>{name}</h1>
            <p>{description}</p>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Group);
