import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Bar from './Bar';
import { nationList, stateList } from '../locationList';

export default class PublicInfoModal extends Component {
  state = { open: false, snackbarOpen: false }


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

  _handleSelection = (name, val) => {
    this.setState({ [name]: val });
  }

  _onSubmit = () => {
    const { belay, bio, boldering, city, country, lead, skill, state } = this.state;
    const { userDetails } = this.props;
    const obj = {
      belay: belay || userDetails.belay,
      bio: bio || userDetails.bio,
      boldering: boldering || userDetails.boldering,
      city: city || userDetails.city,
      country: country || userDetails.country,
      lead: lead || userDetails.lead,
      skill: skill || userDetails.skill,
      state: state || userDetails.state,
    };
    this.props.submit(obj);
    this.setState({ open: false, snackbarOpen: true });
  }

  render() {
    // const { name, title, userDetails, submit } = this.props;
    const { belay, bio, boldering, city, country, lead, skill, state } = this.props.userDetails;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Save"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this._onSubmit}
      />,
    ];

    return (
      <div>
        <h6 className="pointer" onTouchTap={this.handleOpen}>Edit Profile</h6>
        <Dialog
          title={'Edit your public information'}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <AutoComplete
            name="country"
            floatingLabelText="Country"
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={nationList}
            // maxSearchResults={10}
            hintText={country}
            onNewRequest={country => this._handleSelection('country', country)}
          />
          <br />
          <AutoComplete
            name="state"
            floatingLabelText="State"
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={stateList}
            maxSearchResults={10}
            hintText={state}
            onNewRequest={state => this._handleSelection('state', state)}
          />

          <TextField
            id="text-field-default"
            name="city"
            floatingLabelText="City"
            defaultValue={city}
            onChange={this._onType}
          />
          <br />
          <TextField
            id="text-field-default"
            name="skill"
            floatingLabelText="Rope Skill Level"
            defaultValue={skill}
            onChange={this._onType}
          />
          <TextField
            id="text-field-default"
            name="boldering"
            floatingLabelText="Boldering Skill Level"
            defaultValue={boldering}
            onChange={this._onType}
          />
          <br />
          <SelectField
            floatingLabelText="Can you belay?"
            name="belay"
            value={this.state.belay || belay}
            onChange={(e, i, val) => this._handleSelection('belay', val)}
          >
            {/* <MenuItem value={null} primaryText="" /> */}
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
            {/* <MenuItem value={null} primaryText="" /> */}
            <MenuItem value="No" primaryText="No" />
            <MenuItem value="Yes" primaryText="Yes" />
          </SelectField>
          <br />
          <TextField
            // hintText="Message Field"
            name="bio"
            defaultValue={bio}
            floatingLabelText="About me:"
            multiLine={true}
            rows={2}
            onChange={this._onType}
          />
        </Dialog>
        <Bar
          open={this.state.snackbarOpen}
          text="Profile updated"
        />
      </div>
    );
  }
}
