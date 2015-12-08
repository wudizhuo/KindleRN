'use strict';

var React = require('react-native');
var {
    View,
    Text,
    TouchableHighlight,
    ToastAndroid,
    StyleSheet,
    } = React;

var MenuListPage = React.createClass({

    getInitialState: function () {
        return {};
    },

    _onPressSetting() {
        ToastAndroid.show('_onPressSetting Icon', ToastAndroid.SHORT)
        //this.props.navigator.push({
        //    name: 'preview',
        //    url: this.state.inputText
        //});
    },

    render: function () {
        return (
            <View style={styles.container}>
                <TouchableHighlight
                    style={styles.touchable}
                    underlayColor="#1976D2"
                    onPress={this._onPressSetting}>
                    <Text style={styles.text}>
                        设置
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3b3b3b',
    },
    touchable: {
        backgroundColor: '#2196F3',
        alignSelf: 'stretch',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        textAlign: 'center',
        color: '#FFFFFF',
    },
});

module.exports = MenuListPage;