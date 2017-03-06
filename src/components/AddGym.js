import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import AutoComplete from 'material-ui/AutoComplete';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
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
    console.log('this.state:', this.state);
  }

  _handleCheck = (name) => {
    if (this.state[name]) {
      this.setState({ [name]: false });
      console.log('this.state[name]:', this.state[name]);
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
    } = this.state;
    // const { userDetails } = this.props;
    const obj = {
      address: address || '',
      city: city || '',
      description: description || '',
      image: image || '',
      name: name || '',
      size: size || '',
      state: state || '',
      wallHeight: wallHeight || '',
      website: website || '',
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
    // console.log('this.state:', this.state);
  }

  render() {
    // const { name, title, userDetails, submit } = this.props;
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
          {/* <AutoComplete
            name="country"
            floatingLabelText="Country"
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={nationList}
            // maxSearchResults={10}
            hintText={country}
            onNewRequest={country => this._handleSelection('country', country)}
            />
          <br /> */}
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
          <TextField
            id="text-field-default"
            name="wallHeight"
            floatingLabelText="Height of largest wall"
            onChange={this._onType}
          />
          <br />
          <h4>What does this gym offer?</h4>
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
          {/* <SelectField
            floatingLabelText="Can you belay?"
            name="belay"
            value={this.state.belay || belay}
            onChange={(e, i, val) => this._handleSelection('belay', val)}
          >
            <MenuItem value="No" primaryText="No" />
            <MenuItem value="Yes" primaryText="Yes" />
          </SelectField>
          <br />
          <SelectField
            floatingLabelText="Can you lead?"
            name="lead"
            value={this.state.lead || lead}
            onChange={(e, i, val) => this._handleSelection('lead', val)}
          >
            <MenuItem value="No" primaryText="No" />
            <MenuItem value="Yes" primaryText="Yes" />
          </SelectField>
          <br /> */}
          <TextField
            // hintText="Message Field"
            name="description"
            floatingLabelText="Short Description"
            multiLine={true}
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
