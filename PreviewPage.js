'use strict';

var React = require('react-native');
var {
    View,
    Text,
    StyleSheet,
    ToolbarAndroid,
    ToastAndroid,
    } = React;

var WebViewAndroid = require('react-native-webview-android');

var ToolbarView = require('./ToolbarView');

var DEFAULT_URL = 'http://www.kindlezhushou.com';

var Preview = React.createClass({

    getInitialState: function () {
        return {
            url: this.props.data,
            status: 'No Page Loaded',
            backButtonEnabled: false,
            forwardButtonEnabled: false,
            loading: true,
            scalesPageToFit: true,
        };
    },

    onNavigationStateChange: function (navState) {
        this.setState({
            backButtonEnabled: navState.canGoBack,
            forwardButtonEnabled: navState.canGoForward,
            url: navState.url,
            status: navState.title,
            loading: navState.loading,
            scalesPageToFit: true
        });
    },

    //TODO 显示loading

    onShouldStartLoadWithRequest: function (event) {
        // Implement any custom loading logic here, don't forget to return!
        return true;
    },

    render: function () {
        return (
            <View style={styles.container}>
                <ToolbarView />
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
                    url={this.state.url}
                    />
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerWebView: {
        flex: 1,
        height: 200,
    }
});

module.exports = Preview;