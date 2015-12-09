'use strict';

var React = require('react-native');
var {
    AsyncStorage,
    StyleSheet,
    Text,
    View,
    TextInput,
    ToastAndroid,
    TouchableHighlight,
    } = React;

var WebViewAndroid = require('react-native-webview-android');

var ToolbarView = require('./ToolBarView');

var Dimensions = require('Dimensions');

var SettingPage = React.createClass({

    getInitialState: function () {
        return {
            from_email: '',
            receive_email: '',
        };
    },

    componentDidMount: function () {
        AsyncStorage.getItem("from_email").then((value) => {
            console.log("--value---" + value);
            this.setState({from_email: value});
        }).done();
        AsyncStorage.getItem("receive_email").then((value) => {
            console.log("--value---" + value);
            this.setState({receive_email: value});
        }).done();
    },

    _complete() {
        AsyncStorage.setItem("from_email", this.state.from_email);
        AsyncStorage.setItem("receive_email", this.state.receive_email);
        this.props.navigator.pop();
    },

    render: function () {
        return (
            <View style={styles.container}>
                <ToolbarView
                    onBackClicked={this.props.navigator.pop}
                    />
                <View>
                    <TextInput
                        style={styles.textInput}
                        textAlignVertical="top"
                        placeholder="请填入一个您的认可列表的邮箱"
                        onChangeText={(from_email) => this.setState({from_email:from_email})}
                        value={this.state.from_email}
                        />

                    <TextInput
                        style={styles.textInput}
                        textAlignVertical="top"
                        placeholder="请填入您的kindle接收邮箱"
                        onChangeText={(receive_email) => this.setState({receive_email:receive_email})}
                        value={this.state.receive_email}
                        />

                    <TouchableHighlight
                        style={styles.touchable}
                        underlayColor="#1976D2"
                        onPress={this._complete}>
                        <Text style={styles.button}>
                            完成
                        </Text>
                    </TouchableHighlight>
                </View>


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
                    url={"file:///android_asset/kindle.html"}
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
        marginTop: 5,
        flex: 1,
        height: 200,
    },
    textInput: {
        marginTop: 5,
        fontSize: 16,
        borderColor: '#03A9F4',
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
});

module.exports = SettingPage;
