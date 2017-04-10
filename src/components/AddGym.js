import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import AutoComplete from 'material-ui/AutoComplete';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
// import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';

import Bar from './Bar';
import { nationList, stateList } from '../locationList';

export default class AddGym extends Component {
  state = {
    open: false,
    snackbarOpen: false,
    nameError: '',
    addressError: '',
    cityError: '',
    stateError: '',
    websiteError: '',
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
    // console.log('this.state:', this.state);
  }

  _handleCheck = (name) => {
    if (this.state[name]) {
      this.setState({ [name]: false });
      // console.log('this.state[name]:', this.state[name]);
    } else {
      this.setState({
        [name]: true,
        snackbarOpen: false,
      });
    }
  }

  _handleSelection = (name, val) => {
    this.setState({ [name]: val });
  }

  selectType = (e, value) => {
    // console.log('value:', value);
    this.setState({ type: value });
  }

  _onSubmit = () => {
    const {
      address,
      boldering,
      city,
      description,
      image,
      lead,
      name,
      size,
      state,
      top,
      type,
      wallHeight,
      website,
      climbingSurface,
      hours,
      cost,
    } = this.state;

    if (name && address && city && state && website) {
      const obj = {
        streetAddress: address,
        address: `${address} ${city}, ${state.substring(0, 2)}`,
        city,
        description: description || '',
        image: image || '/defaulticon.png',
        name,
        size: size || '',
        state,
        wallHeight: wallHeight || '',
        climbingSurface: climbingSurface || '',
        hours: hours || '',
        cost: cost || '',
        type: type || ' ',
        website,
        offering: {
          boldering: boldering || false,
          top: top || false,
          lead: lead || false,
        },
      };

      this.props.submit(obj);
      this.setState({
        open: false,
        snackbarOpen: true,
        address: '',
        boldering: false,
        city: '',
        description: '',
        image: '',
        lead: false,
        name: '',
        size: '',
        state: '',
        top: false,
        wallHeight: '',
        website: '',
      });
    } else {
      if (!name) {
        this.setState({ nameError: "Don't leave this blank" });
      }
      if (!address) {
        this.setState({ addressError: "Don't leave this blank" });
      }
      if (!city) {
        this.setState({ cityError: "Don't leave this blank" });
      }
      if (!state) {
        this.setState({ stateError: 'Please select a state' });
      }
      if (!website) {
        this.setState({ websiteError: "Don't leave this blank" });
      }
    }
  }

  render() {
    const { nameError, addressError, cityError, stateError, websiteError } = this.state;
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onTouchTap={this._onSubmit}
      />,
    ];

    return (
      <div>
        <RaisedButton
          icon={<FontIcon className="fa fa-plus" />}
          label="Add a Gym"
          style={{ height: 36, margin: 12 }}
          onTouchTap={this.handleOpen}
        />
        <Dialog
          title={'Add a climbing gym:'}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          <TextField
            id="text-field-default"
            name="name"
            floatingLabelText="Name"
            errorText={nameError}
            onChange={this._onType}
          />

          <TextField
            id="text-field-default"
            name="address"
            errorText={addressError}
            floatingLabelText="Street Address"
            onChange={this._onType}
          />
          <br />
          <TextField
            id="text-field-default"
            name="city"
            floatingLabelText="City"
            errorText={cityError}
            onChange={this._onType}
          />
          <AutoComplete
            name="state"
            floatingLabelText="State"
            errorText={stateError}
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={stateList}
            maxSearchResults={10}
            onNewRequest={state => this._handleSelection('state', state)}
          />
          <br />
          <TextField
            id="text-field-default"
            name="image"
            floatingLabelText="Image"
            onChange={this._onType}
          />
          <TextField
            id="text-field-default"
            name="website"
            floatingLabelText="Website"
            errorText={websiteError}
            onChange={this._onType}
          />
          <div className="flexbox-container">
            <div id="radioButtonList">
              <h4>Select gym type:</h4>
              <RadioButtonGroup name="shipSpeed" onChange={this.selectType}>
                <RadioButton
                  value="Commercial Climbing Gym"
                  label="Commercial gym"
                />
                <RadioButton
                  value="School/Universtiy Gym"
                  label="School/Universtiy gym"
                />
                <RadioButton
                  value="Climbing Wall"
                  label="Climbing wall"
                />
                <RadioButton
                  value=" "
                  label="Other"
                />
              </RadioButtonGroup>
            </div>
            <div id="checkboxList">
              <h4>What climbing does this gym offer?</h4>
              <Checkbox
                label="Boldering"
                onCheck={() => { this._handleCheck('boldering'); }}
              />
              <Checkbox
                label="Top Roping"
                onCheck={() => { this._handleCheck('top'); }}
              />
              <Checkbox
                label="Lead"
                onCheck={() => { this._handleCheck('lead'); }}
              />
            </div>
          </div>

          <TextField
            id="text-field-default"
            name="size"
            floatingLabelText="Size of gym (in square feet)"
            onChange={this._onType}
          />
          <br />
          <TextField
            id="text-field-default"
            name="wallHeight"
            floatingLabelText="Height of largest wall (feet)"
            onChange={this._onType}
          />

          <TextField
            id="text-field-default"
            name="climbingSurface"
            floatingLabelText="Climbing surface area (square feet)"
            onChange={this._onType}
          />
          <TextField
            id="text-field-default"
            name="hours"
            floatingLabelText="Hours of operation"
            onChange={this._onType}
          />
          <TextField
            id="text-field-default"
            name="cost"
            floatingLabelText="Cost"
            onChange={this._onType}
          />
          <TextField
            // hintText="Message Field"
            name="description"
            floatingLabelText="Other information"
            multiLine
            rows={2}
            onChange={this._onType}
          />
        </Dialog>
        <Bar
          open={this.state.snackbarOpen}
          text="Gym Added!"
        />
      </div>
    );
  }
}

AddGym.propTypes = {
  submit: PropTypes.func,
};
