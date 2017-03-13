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
import {Actions} from 'react-native-router-flux';

class Setting extends Component {

  constructor(props) {
    super(props);
    this.state = {
      from_email: '',
      to_email: ''
    };

    AsyncStorage.getItem("from_email").then((value) => {
      if (value != null) {
        this.setState({from_email: value});
      }
    }).done();
    AsyncStorage.getItem("to_email").then((value) => {
      if (value != null) {
        this.setState({to_email: value});
      }
    }).done();

  }

  _save() {
    try {
      AsyncStorage.setItem('from_email', this.state.from_email);
      AsyncStorage.setItem('to_email', this.state.to_email);
    } catch (error) {
      console.log(error);
    }
    Actions.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="请填入Kindle认可的邮箱"
          style={styles.textInput}
          value={this.state.from_email}
          onChangeText={(input) => this.setState({from_email:input})}
        />
        <TextInput
          placeholder="Kindle账户邮箱"
          style={styles.textInput}
          value={this.state.to_email}
          onChangeText={(input) => this.setState({to_email:input})}
        />
        <TouchableHighlight
          style={styles.touchable}
          underlayColor={darkAccentColor}
          onPress={()=>this._save()}>
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
    marginTop: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  touchable: {
    marginTop: 10,
    backgroundColor: accentColor,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

module.exports = Setting;