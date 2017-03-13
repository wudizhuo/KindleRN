import React, {Component} from 'react';
import axios from 'axios';

import {
  View,
  Text,
  Alert,
  StyleSheet,
  WebView,
} from 'react-native';

import {BASE_URL} from './common/Constants';
import {Actions} from 'react-native-router-flux';

var html = '<!DOCTYPE html><html><head></head><body>加载中。。。</body></html>';

class PreviewView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: this.props.url,
      status: 'No Page Loaded',
      backButtonEnabled: false,
      forwardButtonEnabled: false,
      loading: true,
      scalesPageToFit: true,
      content: html
    };
  }

  componentDidMount() {
    var reqUrl = BASE_URL + "preview";
    this.setState({
      isLoading: true,
      content: html
    });

    var post_data = {
      url: this.state.url,
    };

    axios.post(reqUrl, post_data)
      .then((response) => {
        this.setState({
          isLoading: false,
          content: response.data.content,
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          content: error.response.data.error,
        });

        Alert.alert(
          '预览失败',
          '' + error.response.data.error,
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: true}
        );
        Actions.pop();
      });
  }

  onShouldStartLoadWithRequest(event) {
    // Implement any custom loading logic here, don't forget to return!
    return true;
  }

  render() {
    return (
      <View style={styles.container}>
        {this._contentView()}
      </View>
    );
  }

  _contentView() {
    return (
      <WebView
        automaticallyAdjustContentInsets={false}
        style={styles.webView}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        decelerationRate="normal"
        onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
        startInLoadingState={true}
        scalesPageToFit={this.state.scalesPageToFit}
        source={{html: this.state.content, baseUrl: 'http://www.kindlezhushou.com'}}
      />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerWebView: {
    flex: 1,
    height: 200,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = PreviewView;