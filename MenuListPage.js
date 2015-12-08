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
                    style={styles.touchable_header}
                    underlayColor="#B3E5FC">
                    <Text style={styles.text}>
                        Kindle助手
                    </Text>
                </TouchableHighlight>

                <View
                    style={styles.divider}
                    />

                <TouchableHighlight
                    style={styles.touchable}
                    underlayColor="#B3E5FC"
                    onPress={this._onPressSetting}>
                    <Text style={styles.text}>
                        设置
                    </Text>
                </TouchableHighlight>
                <View
                    style={styles.divider}
                    />
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3b3b3b',
    },
    touchable_header: {
        height: 108,
        justifyContent:'center',
    },

    touchable: {
        height: 66,
        alignItems: 'center',
        justifyContent:'center',
    },

    text: {
        fontSize: 20,
        marginLeft: 16,
        color: '#03A9F4',
    },
    divider: {
        height: 1,
        backgroundColor: '#0288D1',
    },
});

module.exports = MenuListPage;