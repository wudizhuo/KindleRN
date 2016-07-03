'use strict';
import React, {
  Component,
} from 'react';

var AppNavigator = require('./AppNavigator');

var App = React.createClass({
  render() {
    return (
      <AppNavigator/>
    );
  }
});

module.exports = App;