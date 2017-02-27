import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';

export default class EditInfo extends Component {
  state = { open: false }


  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  _onType = (e) => {
    const { value, name } = e.target;
    this.setState({ value });
  }

  _onSubmit = () => {
    this.props.submit({
      [this.props.name]: this.state.value,
    });
    this.setState({ open: false });
  }

  render() {
    const { name, title, defaultVal, submit } = this.props;
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
        {/* <RaisedButton label="Dialog" onTouchTap={this.handleOpen} /> */}
        {/* <FlatButton icon={<FontIcon className="fa fa-edit" />} onTouchTap={this.handleOpen} /> */}
        <h6 className="pointer" onTouchTap={this.handleOpen}>[Edit]</h6>
        <Dialog
          title={`Edit ${title}:`}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {/* The actions in this window were passed in as an array of React objects. */}
          <TextField
            id="text-field-default"
            name={name}
            defaultValue={defaultVal}
            onChange={this._onType}
          />
        </Dialog>
      </div>
    );
  }
}
