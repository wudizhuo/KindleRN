'use strict';

var React = require('react-native');

var {
    AppRegistry,
    View,
    Navigator,
    ToolbarAndroid,
    Text,
    BackAndroid,
    StyleSheet,
    } = React;

var _navigator;
var MainView = require('./main.android');

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

    getInitialState: function () {
        return {
            kindle: this._getHome(),
            colorProps: {
                titleColor: '#FFFFFF',
                subtitleColor: '#6a7180',
            },
        };
    },

    componentWillMount: function () {
        BackAndroid.addEventListener('hardwareBackPress', this._handleBackButtonPress);
    },

    _getHome: function () {
        return {
            title: 'Kindle 助手',
            component: this._renderHome(),
        };
    },

    render() {
        return (
            <View>
                {this._renderNavigation()}
            </View>
        );
    },

    _renderHome: function () {
        return React.createClass({
            render: function () {
                return (
                    <MainView/>
                );
            }
        });
    },

    _renderNavigation: function () {
        var Component = this.state.kindle.component;
        return (
            <View style={styles.container}>
                <ToolbarAndroid
                    style={styles.toolbar}
                    title={this.state.kindle.title}
                    {...this.state.colorProps}
                    />
                <Component />
            </View>
        );
    },
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toolbar: {
        backgroundColor: '#2196F3',
        height: 56,
    },
});

AppRegistry.registerComponent('KindleReact', () => KindleReact);

module.exports = KindleReact;