'use strict';
import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  } from 'react-native';

var BASE_URL = 'http://kindlezhushou.com/v3/';

var html = '<!DOCTYPE html><html><head></head><body>加载中。。。</body></html>';

class PreviewView extends Component {

  getInitialState() {
    return {
      url: this.props.data,
      status: 'No Page Loaded',
      backButtonEnabled: false,
      forwardButtonEnabled: false,
      loading: true,
      scalesPageToFit: true,
      response: {
        content: html
      }
    };
  }

  componentDidMount () {
    var reqUrl = BASE_URL + "send/preview";
    this.setState({
      isLoading: true,
      data: null,
    });

    var post_data = {
      url: this.state.url,
    }

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
        this.setState({
          isLoading: false,
          response: responseText,
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          response: null,
        });
      });
  }

  onNavigationStateChange (navState) {
    this.setState({
      backButtonEnabled: navState.canGoBack,
      forwardButtonEnabled: navState.canGoForward,
      url: navState.url,
      status: navState.title,
      loading: navState.loading,
      scalesPageToFit: true
    });
  }

  onShouldStartLoadWithRequest(event) {
    // Implement any custom loading logic here, don't forget to return!
    return true;
  }

  render() {
    return (
      <View style={styles.container}>
        <ToolbarView onBackClicked={this.props.navigator.pop}/>
        {this._contentView()}
      </View>
    );
  }

  _contentView() {
    console.log("---render----" + this.state.response.content);
    if (this.state.isLoading) {
      return (
        <View style={[styles.container, styles.center]}>
          <ProgressBarAndroid styleAttr="Inverse"/>
          <Text
            style={{
                            marginTop:20
                        }}
          >发送中....</Text>
        </View>
      );
    } else {
      return (
        <WebViewAndroid
          javaScriptEnabled={true}
          javaScriptEnabledAndroid={true}
          onNavigationStateChange={this.onNavigationStateChange}
          onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
          startInLoadingState={true}
          scalesPageToFit={this.state.scalesPageToFit}
          geolocationEnabled={false}
          builtInZoomControls={false}
          style={styles.containerWebView}
          html={this.state.response.content}
        />
      );
    }
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