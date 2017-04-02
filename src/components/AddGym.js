import React, { Component, PropTypes } from 'react';
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

export default class AddGym extends Component {
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
      wallHeight,
      website,
      climbingSurface,
      hours,
      cost,
    } = this.state;
    // const { userDetails } = this.props;
    // const fullAddress = `${address} ${city} ${state.substring(0, 2)}`
    const obj = {
      streetAddress: address || '',
      address: `${address} ${city}, ${state.substring(0, 2)}`,
      city: city || '',
      description: description || '',
      image: image || '',
      name: name || '',
      size: size || '',
      state: state || '',
      wallHeight: wallHeight || '',
      climbingSurface: climbingSurface || '',
      hours: hours || '',
      cost: cost || '',
      website: website || '',
      offering: {
        boldering: boldering || false,
        top: top || false,
        lead: lead || false,
      },
    };
    console.log('this.state:', this.state);
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
    console.log('obj:', obj);
  }

  render() {
    // const { name, title, userDetails, submit } = this.props;
    let belay, bio, boldering, city, country, lead, skill, state = '';
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
        >
          <TextField
            id="text-field-default"
            name="name"
            floatingLabelText="Name"
            onChange={this._onType}
          />
          <br />
          <TextField
            id="text-field-default"
            name="address"
            floatingLabelText="Street Address"
            onChange={this._onType}
          />
          <br />
          <TextField
            id="text-field-default"
            name="city"
            floatingLabelText="City"
            onChange={this._onType}
          />
          <AutoComplete
            name="state"
            floatingLabelText="State"
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={stateList}
            maxSearchResults={10}
            hintText={state}
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
            onChange={this._onType}
          />
          <br />
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
          <br />
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
