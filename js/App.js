'use strict';
import React, {
  Component,
} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

var App = React.createClass({
  render() {
    return (
      <View style={styles.container}>

        <Text>
          Welcome to React Native!
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

module.exports = App;