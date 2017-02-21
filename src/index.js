import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import CustomRouter from './components/CustomRouter';
import store from './store';

injectTapEventPlugin();

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <CustomRouter />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
