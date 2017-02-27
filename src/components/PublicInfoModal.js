import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const nationList = ['Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegowina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Indian Ocean Territory', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Congo, the Democratic Republic of the', 'Cook Islands', 'Costa Rica', "Cote d'Ivoire", 'Croatia (Hrvatska)', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands (Malvinas)', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'France Metropolitan', 'French Guiana', 'French Polynesia', 'French Southern Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard and Mc Donald Islands', 'Holy See (Vatican City State)', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran (Islamic Republic of)', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', "Korea, Democratic People's Republic of", 'Korea, Republic of', 'Kuwait', 'Kyrgyzstan', "Lao, People's Democratic Republic", 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libyan Arab Jamahiriya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia, The Former Yugoslav Republic of', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia, Federated States of', 'Moldova, Republic of', 'Monaco', 'Mongolia', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russian Federation', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia (Slovak Republic)', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia and the South Sandwich Islands', 'Spain', 'Sri Lanka', 'St. Helena', 'St. Pierre and Miquelon', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen Islands', 'Swaziland', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Taiwan, Province of China', 'Tajikistan', 'Tanzania, United Republic of', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'United States Minor Outlying Islands', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Virgin Islands (British)', 'Virgin Islands (U.S.)', 'Wallis and Futuna Islands', 'Western Sahara', 'Yemen', 'Yugoslavia', 'Zambia', 'Zimbabwe'];
const stateList = [
  'AK - Alaska',
  'AL - Alabama',
  'AR - Arkansas',
  'AS - American Samoa',
  'AZ - Arizona',
  'CA - California',
  'CO - Colorado',
  'CT - Connecticut',
  'DC - District of Columbia',
  'DE - Delaware',
  'FL - Florida',
  'GA - Georgia',
  'GU - Guam',
  'HI - Hawaii',
  'IA - Iowa',
  'ID - Idaho',
  'IL - Illinois',
  'IN - Indiana',
  'KS - Kansas',
  'KY - Kentucky',
  'LA - Louisiana',
  'MA - Massachusetts',
  'MD - Maryland',
  'ME - Maine',
  'MI - Michigan',
  'MN - Minnesota',
  'MO - Missouri',
  'MS - Mississippi',
  'MT - Montana',
  'NC - North Carolina',
  'ND - North Dakota',
  'NE - Nebraska',
  'NH - New Hampshire',
  'NJ - New Jersey',
  'NM - New Mexico',
  'NV - Nevada',
  'NY - New York',
  'OH - Ohio',
  'OK - Oklahoma',
  'OR - Oregon',
  'PA - Pennsylvania',
  'PR - Puerto Rico',
  'RI - Rhode Island',
  'SC - South Carolina',
  'SD - South Dakota',
  'TN - Tennessee',
  'TX - Texas',
  'UT - Utah',
  'VA - Virginia',
  'VI - Virgin Islands',
  'VT - Vermont',
  'WA - Washington',
  'WI - Wisconsin',
  'WV - West Virginia',
  'WY - Wyoming',
];

export default class PublicInfoModal extends Component {
  state = { open: false }


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
    this.setState({ open: false });
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
      </div>
    );
  }
}
