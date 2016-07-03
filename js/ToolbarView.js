'use strict';

var React = require('react-native');
var {
  ToolbarAndroid,
  StyleSheet,
  } = React;

var ToolBarView = React.createClass({

  getInitialState: function () {
    return {
      colorProps: {
        titleColor: '#FFFFFF',
        subtitleColor: '#6a7180',
      },
    };
  },

  render: function () {
    return (
      <View/>
    );
  }
});

var styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#2196F3',
    height: 56,
  },
});

module.exports = ToolBarView;