'use strict';

var React = require('React');
var Platform = require('Platform');
var StyleSheet = require('StyleSheet');
var Navigator = require('Navigator');
var TabsView = require('./tabs/TabsView');
var PreviewView = require('./PreviewView');

var AppNavigator = React.createClass({

  render: function () {
    return (
      <Navigator
        ref="navigator"
        style={styles.container}
        configureScene={(route) => {
          if (Platform.OS === 'android') {
            return Navigator.SceneConfigs.FloatFromBottomAndroid;
          }
        }}
        initialRoute={{}}
        renderScene={this.renderScene}
      />
    );
  },

  renderScene: function (route, navigator) {
    if (route.preview) {
      return (
        <PreviewView
          navigator={navigator}
        />
      );
    }
    return <TabsView navigator={navigator}/>;
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

module.exports = AppNavigator;
