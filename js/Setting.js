import React, {Component} from 'react';
import {accentColor, darkAccentColor} from './common/Colors';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TextInput,
  TouchableHighlight,
} from 'react-native';

class Setting extends Component {

  constructor(props) {
    super(props);
    try {
      const value = AsyncStorage.getItem('@MySuperStore:key');
      if (value !== null) {
        console.log(value);
      }
      this.state = {
        from_email: AsyncStorage.getItem('from_email'),
        to_email: AsyncStorage.getItem('to_email'),
      };
    } catch (error) {
      console.log(error);
    }
  }

  _save() {
    try {
      AsyncStorage.setItem('from_email', this.state.from_email);
      AsyncStorage.setItem('to_email', this.state.to_email);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          value={this.state.from_email}
          onChangeText={(input) => this.setState({from_email:input})}
        />
        <TextInput
          style={styles.textInput}
          value={this.state.to_email}
          onChangeText={(input) => this.setState({to_email:input})}
        />
        <TouchableHighlight
          style={styles.touchable}
          underlayColor={darkAccentColor}
          onPress={this._save()}>
          <Text style={styles.button}>
            保存
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    color: '#FFFFFF',
  },
  textInput: {
    paddingLeft: 4,
    fontSize: 20,
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
  },
  touchable: {
    backgroundColor: accentColor,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

module.exports = Setting;