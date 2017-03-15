import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Bar from './Bar';

const todaysDate = new Date();

export default class PostModal extends Component {
  state = {
    open: false,
    date: null,
    message: '',
    climbType: null,
    snackbarOpen: false,
  };

  handleOpen = () => {
    this.setState({ open: true, snackbarOpen: false });
  }

  handleClose = () => {
    this.setState({ open: false, snackbarOpen: false });
  }

  _onType = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value, snackbarOpen: false });
  }

  _handleDateChange = (e, date) => {
    // console.log('date:', date);
    this.setState({ date, snackbarOpen: false });
  }

  _handleSelection = (val) => {
    this.setState({ climbType: val, snackbarOpen: false });
  }

  _submit = () => {
    const { date, message, climbType } = this.state;
    const { id, name, city, state, submit } = this.props;
    const obj = {
      timestamp: JSON.stringify(date),
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
    submit(obj);
    this.setState({
      open: false,
      date: null,
      message: '',
      climbType: null,
      snackbarOpen: true,
    });
  }

  render() {
    const { date, climbType, snackbarOpen } = this.state;
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
            <MenuItem value="Top Rope" primaryText="Top Rope" />
            <MenuItem value="Lead" primaryText="Lead" />
            <MenuItem value="Bolder" primaryText="Bolder" />
          </SelectField>
          <DatePicker
            hintText="Select date"
            minDate={todaysDate}
            // defaultDate={todaysDate}
            onChange={this._handleDateChange}
            value={date}
            firstDayOfWeek={0}
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
        <Bar
          open={snackbarOpen}
          text="Post successfull!"
        />
      </div>
    );
  }
}
