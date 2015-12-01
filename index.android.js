'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    ToastAndroid,
    } = React;

var KindleReact = React.createClass({

    getInitialState: function() {
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
                <Text style={styles.welcome}>
                    Kindle助手
                </Text>
                <View>
                    <TextInput
                        style={{height: 220, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(inputText) => this.setState({inputText})}
                        value={this.state.inputText}
                        />
                </View>
                <View style={{
                    flexDirection:'row'
                    }
                }>
                    <Text style={styles.instructions}
                          onPress={this._clean}
                        >
                        清除内容
                    </Text>
                    <Text style={styles.instructions}
                          onPress={this._preview}
                        >
                        预览内容
                    </Text>
                </View>
                <Text style={styles.instructions}
                      onPress={this._send}
                    >
                    发送到我的kindle
                </Text>
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
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        height: 50,
        borderWidth: 1,
        alignItems: 'center',
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('KindleReact', () => KindleReact);
