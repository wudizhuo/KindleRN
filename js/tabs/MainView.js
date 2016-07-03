import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TextInput,
  TouchableHighlight,
} from 'react-native';
var Dimensions = require('Dimensions');
import {
  secondaryTextColor
} from '../common/Colors';

class MainView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
    };
  }

  _clean() {
    this.setState(
      {
        inputText: '',
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          textAlignVertical="top"
          multiline={true}
          onChangeText={(inputText) => this.setState({inputText})}
          value={this.state.inputText}
        />
        <View style={{
                        flex: 1,
                        width:Dimensions.get('window').width,
                        flexDirection:'row',
                        alignSelf: 'stretch',
                        justifyContent:'space-around',
                        }
                    }>
          <TouchableHighlight
            style={styles.touchable}
            underlayColor="#1976D2"
            onPress={this._clean.bind(this)}>
            <Text style={styles.button}>
              清除内容
            </Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.touchable}
            underlayColor="#1976D2"
            onPress={this._preview}>
            <Text style={styles.button}>
              预览内容
            </Text>
          </TouchableHighlight>
        </View>

        <TouchableHighlight
          style={styles.touchable}
          underlayColor="#1976D2"
          onPress={this._send}>
          <Text style={styles.button}>
            发送到我的kindle
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    flex: 1,
  },
  toolbar: {
    backgroundColor: '#03A9F4',
    height: 56,
  },
  textInput: {
    paddingLeft: 4,
    fontSize: 20,
    height: 220,
    borderColor: 'gray',
    borderWidth: 1,
  },
  touchable: {
    flex: 1,
    backgroundColor: '#03A9F4',
    alignSelf: 'stretch',
    margin: 2,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    color: '#FFFFFF',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});


module.exports = MainView;
