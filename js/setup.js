'use strict';
var React = require('React');
import App from '@js/App';

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