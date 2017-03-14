import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import moment from 'moment';

const todaysDate = new Date();

export default class PostModal extends Component {
  state = {
    open: false,
    date: null,
    message: '',
    climbType: null,
  };

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  _onType = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  }

  _handleDateChange = (e, date) => {
    // console.log('date:', date);
    this.setState({ date });
  }

  _handleSelection = (val) => {
    this.setState({ climbType: val });
  }

  _submit = () => {
    const { date, message, climbType } = this.state;
    const { id, name, city, state } = this.props;
    const obj = {
      date,
      message,
      climbType,
      gym: {
        name,
        id,
        city,
        state,
      },
    };
    console.log('obj:', obj);
  }

  render() {
    const { date, climbType } = this.state;
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
        onTouchTap={this._submit}
      />,
    ];
    // console.log('todaysDate:', todaysDate);

    return (
      <div>
        <RaisedButton label="Post Climbing Request" onTouchTap={this.handleOpen} />
        <Dialog
          title="Post climbing request and find climbers!"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <SelectField
            floatingLabelText="I am looking to..."
            // name="belay"
            value={climbType}
            onChange={(e, i, val) => this._handleSelection(val)}
          >
            {/* <MenuItem value={null} primaryText="" /> */}
            <MenuItem value="Top" primaryText="Top Rope" />
            <MenuItem value="Lead" primaryText="Lead" />
            <MenuItem value="Bolder" primaryText="Bolder" />
          </SelectField>
          <DatePicker
            hintText="Select date"
            minDate={todaysDate}
            // defaultDate={todaysDate}
            onChange={this._handleDateChange}
            value={date}
          />
          <TimePicker
            hintText="Select time"
            onChange={this._handleDateChange}
            value={date}
            disabled={!date}
          />
          <TextField
            id="text-field-default"
            name="message"
            floatingLabelText="Add message"
            defaultValue=""
            onChange={this._onType}
          />
        </Dialog>
      </div>
    );
  }
}
