'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    ToolbarAndroid,
    View,
    TextInput,
    ToastAndroid,
    Navigator,
    TouchableHighlight,
    TouchableOpacity,
    } = React;

var Dimensions = require('Dimensions');
var preview = require('./PreviewPage');
var ToolbarView = require('./ToolbarView');

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
        this.setState({"url": this.state.inputText});
        this.props.navigator.push({
            name: 'preview',
            url: this.state.inputText
        });
    },

    _send() {
        ToastAndroid.show('PressSend Icon', ToastAndroid.SHORT)
    },


    render: function () {
        return (
            <View>
                <ToolbarView />
                <View>
                    <View>
                        <TextInput
                            style={styles.textInput}
                            textAlignVertical="top"
                            multiline={true}
                            onChangeText={(inputText) => this.setState({inputText})}
                            value={this.state.inputText}
                            />
                    </View>
                    <View style={{
                        flex: 1,
                        width:Dimensions.get('window').width,
                        flexDirection:'row',
                        alignSelf: 'stretch',
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
            </View>
        );
    }
});

var styles = StyleSheet.create({
    textInput: {
        fontSize: 20,
        height: 220,
        borderColor: 'gray',
        borderWidth: 1,
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