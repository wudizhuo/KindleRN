'use strict';

var React = require('react-native');

var {
    AppRegistry,
    View,
    Navigator,
    Text,
    BackAndroid,
    StyleSheet,
    } = React;

var _navigator;
var MainView = require('./main.android');

BackAndroid.addEventListener('hardwareBackPress', () => {
    if (_navigator && _navigator.getCurrentRoutes().length > 1) {
        _navigator.pop();
        return true;
    }
    return false;
});

var RouteMapper = function (route, navigationOperations, onComponentRef) {
    _navigator = navigationOperations;
    if (route.name === 'main') {
        return (
            <MainView navigator={navigationOperations}/>
        );
    }

};

var KindleReact = React.createClass({
    configureScene(route){
        return Navigator.SceneConfigs.FadeAndroid;
    },

    render() {
        return (
            <Navigator
                initialRoute={{name: 'main'}}
                configureScene={this.configureScene}
                renderScene={RouteMapper}/>
        );
    }

});

AppRegistry.registerComponent('KindleReact', () => KindleReact);

module.exports = KindleReact;