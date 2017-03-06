import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TextInput,
  TouchableHighlight,
} from 'react-native';
var Dimensions = require('Dimensions');
import { Actions } from 'react-native-router-flux';

class MainView extends React.Component {
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

  _preview() {
    Actions.PreviewView({url: this.state.inputText});
  }

  _send() {
    AsyncStorage.getItem("from_email").then((value) => {
      this.setState({from_email: value});
      if (value == null) {
        this.goToSetting();
        return;
      }
    }).done();
    AsyncStorage.getItem("receive_email").then((value) => {
      this.setState({receive_email: value});
      if (value == null) {
        this.goToSetting();
        return;
      }
    }).done();

    this.setState({
      isLoading: true,
    });

    var post_data = {
      url: this.state.inputText,
      from_email: this.state.from_email,
      to_email: this.state.receive_email
    }

    var reqUrl = BASE_URL + "send/url";

    fetch(reqUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post_data)
    }).then((response) => response.json())
      .then((responseText) => {
        console.log(responseText);
        if (responseText.status != 0) {
          ToastAndroid.show(responseText.msg, ToastAndroid.SHORT);
        } else {
          ToastAndroid.show("发送成功", ToastAndroid.SHORT);
        }
        this.setState({
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
        });
      });

  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          title="Kindle助手"
        />
        <TextInput
          style={styles.textInput}
          textAlignVertical="top"
          multiline={true}
          onChangeText={(inputText) => this.setState({inputText})}
          value={this.state.inputText}
        />
        <View style={{
                        width:Dimensions.get('window').width,
                        flexDirection:'row',
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
          width:Dimensions.get('window').width,
          marginTop:8,
        }}>
          <TouchableHighlight
            style={styles.touchable}
            onPress={this._send.bind(this)}>
            <Text style={styles.button}>
              发送到我的kindle
            </Text>
          </TouchableHighlight>
        </View>
        <View style={{
          flex:1,
        }}></View>
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
