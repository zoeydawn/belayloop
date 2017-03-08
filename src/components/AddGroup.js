import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import AutoComplete from 'material-ui/AutoComplete';
// import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';

import Bar from './Bar';
import { nationList, stateList } from '../locationList';

export default class AddGroup extends Component {
  state = {
    open: false,
    snackbarOpen: false,
  }

  handleOpen = () => {
    this.setState({
      open: true,
      snackbarOpen: false,
    });
  }

  handleClose = () => {
    this.setState({
      open: false,
      snackbarOpen: false,
    });
  }

  _onType = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
      snackbarOpen: false,
    });
  }

  // _handleCheck = (name) => {
  //   if (this.state[name]) {
  //     this.setState({ [name]: false });
  //   } else {
  //     this.setState({
  //       [name]: true,
  //       snackbarOpen: false,
  //     });
  //   }
  // }
  //
  // _handleSelection = (name, val) => {
  //   this.setState({ [name]: val });
  // }

  _onSubmit = () => {
    const { name, description } = this.state;

    if (name && description) {
      const obj = {
        name,
        description,
      };
      this.props.submit(obj);
      this.setState({
        name: '',
        description: '',
        open: false,
        snackbarOpen: true,
      });
    }
  }

  render() {
    let belay, bio, boldering, city, country, lead, skill, state = '';
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this._onSubmit}
      />,
    ];

    return (
      <div>
        <RaisedButton
          icon={<FontIcon className="fa fa-plus" />}
          label="Greate Group"
          style={{ height: 36, margin: 12 }}
          onTouchTap={this.handleOpen}
        />
        <Dialog
          title={'Create a group:'}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            id="text-field-default"
            name="name"
            floatingLabelText="Name"
            onChange={this._onType}
          />
          <br />
          <TextField
            name="description"
            floatingLabelText="Description"
            multiLine={true}
            rows={2}
            onChange={this._onType}
          />
        </Dialog>
        <Bar
          open={this.state.snackbarOpen}
          text="Group Created!"
        />
      </div>
    );
  }
}
