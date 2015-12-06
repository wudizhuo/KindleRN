'use strict';

var React = require('react-native');

var {
    AppRegistry,
    View,
    Navigator,
    BackAndroid,
    StyleSheet,
    } = React;

var _navigator;
var MainView = require('./MainPage');
var Preview = require('./PreviewPage');

var RouteMapper = function (route, navigationOperations, onComponentRef) {
    var Component = null;
    _navigator = navigationOperations;
    switch (route.name) {
        case "main":
            Component = MainView;
            break;
        case "preview":
            Component = Preview;
            break;
        default: //default view
            Component = MainView;
    }
    return <Component navigator={navigationOperations}/>
};

var KindleReact = React.createClass({
    configureScene(route){
        return Navigator.SceneConfigs.FadeAndroid;
    },

    getInitialState: function () {
        return {};
    },

    componentWillMount: function () {
        BackAndroid.addEventListener('hardwareBackPress', this._handleBackButtonPress);
    },

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress');
    },

    render() {
        return (
            <Navigator
                initialRoute={'main'}
                configureScene={this.configureScene}
                renderScene={RouteMapper}
                />
        );
    },

    _handleBackButtonPress: function () {
        if (_navigator && _navigator.getCurrentRoutes().length > 1) {
            _navigator.pop();
            return true;
        }
        return false;
    },
});

var styles = StyleSheet.create({});

AppRegistry.registerComponent('KindleReact', () => KindleReact);

module.exports = KindleReact;