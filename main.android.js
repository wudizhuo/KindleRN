'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    TextInput,
    ToastAndroid,
    TouchableHighlight,
    TouchableOpacity,
    } = React;

var Dimensions = require('Dimensions');

var MainView = React.createClass({

    getInitialState: function () {
        return {
            inputText: '',
        };
    },

    _clean() {
        this.setState((state) => {
            return {
                inputText: '',
            };
        });
    },

    _preview() {
        ToastAndroid.show('Press _preview Icon', ToastAndroid.SHORT)
    },

    _send() {
        ToastAndroid.show('PressSend Icon', ToastAndroid.SHORT)
    },


    render: function () {
        return (
            <View style={styles.container}>
                <View>
                    <TextInput
                        style={{height: 220, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(inputText) => this.setState({inputText})}
                        value={this.state.inputText}
                        />
                </View>
                <View style={{
                    display:'flex',
                    flex: 1,
                    width:Dimensions.get('window').width,
                    flexDirection:'row',
                    alignSelf: 'stretch',
                    alignItem: 'stretch',
                    justifyContent:'space-around',
                    }
                }>
                    <TouchableHighlight
                        style={styles.touchable}
                        underlayColor="#1976D2"
                        onPress={this._clean}>
                        <View>
                            <Text style={styles.button}>
                                清除内容
                            </Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={styles.touchable}
                        underlayColor="#1976D2"
                        onPress={this._preview}>
                        <View>
                            <Text style={styles.button}>
                                预览内容
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>

                <TouchableHighlight
                    style={styles.touchable}
                    underlayColor="#1976D2"
                    onPress={this._send}>
                    <Text style={styles.button}>
                        发送到我的kindle
                    </Text>
                </TouchableHighlight>

            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    touchable: {
        flex: 1,
        backgroundColor: '#2196F3',
        alignSelf: 'stretch',
        margin: 2,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {},
});

module.exports = MainView;