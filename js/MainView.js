import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  AsyncStorage,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import axios from 'axios';

var Dimensions = require('Dimensions');
import {Actions} from 'react-native-router-flux';
import {BASE_URL, ERROR_CODE_FROM_EMAIL, ERROR_CODE_TO_EMAIL, ERROR_CODE_INVALID_URL} from './common/Constants';

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      isLoading: false,
    };
  }

  _clean() {
    this.setState(
      {
        inputText: '',
      });
  }

  _preview() {
    if (!this._checkAndAlert()) {
      return;
    }
    Actions.PreviewView({url: this.state.inputText});
  }

  _checkAndAlert() {
    if (!this.state.inputText || 0 === this.state.inputText) {
      Alert.alert(
        '',
        '请输入要推送的网址',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false}
      );
      return false;
    }
    return true;
  }

  _goToSetting() {
    Actions.Setting();
  }

  async _send() {
    if (!this._checkAndAlert()) {
      return;
    }

    try {
      var from_email = await AsyncStorage.getItem("from_email");
      console.log('from_email---'+from_email);
      this.setState({from_email: from_email});
      if (from_email == null) {
        this._goToSetting();
        return;
      }

      var to_email = await AsyncStorage.getItem("to_email")
      console.log('to_email---'+to_email);
      this.setState({to_email: to_email});
      if (to_email == null) {
        this._goToSetting();
        return;
      }
    } catch (error) {
      console.log('error---' + error);
    }

    this.setState({
      isLoading: true,
    });

    var post_data = {
      url: this.state.inputText,
      from_email: this.state.from_email,
      to_email: this.state.to_email
    }

    var reqUrl = BASE_URL + "send";

    axios.post(reqUrl, post_data)
      .then((response) => {
        this.setState({
          isLoading: false,
        });

        Alert.alert(
          '',
          "发送成功",
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: true}
        );

      })
      .catch((res) => {
        console.log(res);
        this.setState({
          isLoading: false,
        });

        Alert.alert(
          '发送失败',
          '' + res.response.data.error,
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: true}
        );
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={[styles.container, styles.center]}>
          <Text
            style={{
              marginTop: 20
            }}
          >发送中....</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            textAlignVertical="top"
            multiline={true}
            autoCorrect={false}
            placeholder="请输入要推送的网址"
            autoCapitalize="none"
            onChangeText={(input) => this.setState({inputText: input})}
            value={this.state.inputText}
          />
          <View style={{
            width: Dimensions.get('window').width,
            flexDirection: 'row',
            height: 50,
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
              onPress={this._preview.bind(this)}>
              <Text style={styles.button}>
                预览内容
              </Text>
            </TouchableHighlight>
          </View>
          <View style={{
            height: 55,
            width: Dimensions.get('window').width,
            marginTop: 8,
          }}>
            <TouchableHighlight
              style={styles.touchable}
              underlayColor="#1976D2"
              onPress={this._send.bind(this)}>
              <Text style={styles.button}>
                发送到我的kindle
              </Text>
            </TouchableHighlight>
          </View>
          <View style={{
            flex: 1,
          }}></View>
        </View>
      );
    }
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
