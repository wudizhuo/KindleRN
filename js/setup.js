'use strict';
var React = require('React');
var App = require('./App');

function setup():ReactClass<{}> {

  class Root extends React.Component {
    render() {
      return (
        <App />
      );
    }
  }
  return Root;
}

module.exports = setup;