'use strict';

var React = require('react-native');
var {
    ToolbarAndroid,
    StyleSheet,
    } = React;

var ToolbarView = React.createClass({

    getInitialState: function () {
        return {
            colorProps: {
                titleColor: '#FFFFFF',
                subtitleColor: '#6a7180',
            },
        };
    },

    render: function () {
        return (
            <ToolbarAndroid
                style={styles.toolbar}
                navIcon={require('image!android_back_white')}
                onIconClicked={this.props.onBackClicked}
                title={'Kindle 助手'}
                navigator={this.props.navigator}
                {...this.state.colorProps}
                />
        );
    }
});

var styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#2196F3',
        height: 56,
    },
});

module.exports = ToolbarView;