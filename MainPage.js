'use strict';

var React = require('react-native');
var {
    StyleSheet,
    AsyncStorage,
    Text,
    ToolbarAndroid,
    View,
    TextInput,
    ToastAndroid,
    ProgressBarAndroid,
    Navigator,
    TouchableHighlight,
    DrawerLayoutAndroid,
    TouchableOpacity,
    } = React;

var Dimensions = require('Dimensions');
var preview = require('./PreviewPage');
var MenuList = require('./MenuListPage');


var DRAWER_REF = 'drawer';
var DRAWER_WIDTH_LEFT = 180;

var BASE_URL = 'http://kindlezhushou.com/V2/';

var MainView = React.createClass({

    getInitialState: function () {
        return {
            inputText: 'http://wiki.jikexueyuan.com/project/react/',
            isLoading: false,
            colorProps: {
                titleColor: '#FFFFFF',
                subtitleColor: '#6a7180',
            },
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
        this.props.navigator.push({
            name: 'preview',
            url: this.state.inputText
        });
    },

    _send() {
        AsyncStorage.getItem("from_email").then((value) => {
            this.setState({from_email: value});
            if (value == null) {
                this.goToSetting();
                return;
            }
        }).done();
        AsyncStorage.getItem("receive_email").then((value) => {
            this.setState({receive_email: value});
            if (value == null) {
                this.goToSetting();
                return;
            }
        }).done();

        this.setState({
            isLoading: true,
        });

        var post_data = {
            url: this.state.inputText,
            from_email: this.state.from_email,
            to_email: this.state.receive_email
        }

        var reqUrl = BASE_URL + "send/url";

        fetch(reqUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post_data)
        }).then((response) => response.json())
            .then((responseText) => {
                console.log(responseText);
                if (responseText.status != 0) {
                    ToastAndroid.show(responseText.msg, ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show("发送成功", ToastAndroid.SHORT);
                }
                this.setState({
                    isLoading: false,
                });
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                });
            });

    },


    onSelectMenu: function () {
        this.goToSetting();
        this.refs[DRAWER_REF].closeDrawer();
    },

    goToSetting: function () {
        this.props.navigator.push({
            name: 'setting',
        });
    },

    render: function () {
        return (
            <DrawerLayoutAndroid
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                drawerWidth={Dimensions.get('window').width - DRAWER_WIDTH_LEFT}
                keyboardDismissMode="on-drag"
                ref={DRAWER_REF}
                renderNavigationView={this._renderNavigationView}>
                <ToolbarAndroid
                    navIcon={require('image!ic_menu_white')}
                    onIconClicked={() => this.refs[DRAWER_REF].openDrawer()}
                    style={styles.toolbar}
                    title={'Kindle 助手'}
                    navigator={this.props.navigator}
                    {...this.state.colorProps}
                    />
                {this._contentView()}
            </DrawerLayoutAndroid>
        );
    },

    _renderNavigationView: function () {
        return (
            <MenuList
                onSelectMenu={this.onSelectMenu}
                />
        );
    },

    onSelectTheme: function (theme) {
        this.refs[DRAWER_REF].closeDrawer();
        this.setState({theme: theme});
    },

    _contentView: function () {
        if (this.state.isLoading) {
            return (
                <View style={[styles.container, styles.center]}>
                    <ProgressBarAndroid styleAttr="Inverse"/>
                    <Text
                        style={{
                            marginTop:20
                        }}
                        >发送中....</Text>
                </View>
            );
        } else {
            return (
                <View>
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
                                <Text style={styles.button}>
                                    清除内容
                                </Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                style={styles.touchable}
                                underlayColor="#1976D2"
                                onPress={this._preview}>
                                <Text style={styles.button}>
                                    预览内容
                                </Text>
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
            )
        }
        ;
    },
});

var styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#03A9F4',
        height: 56,
    },
    textInput: {
        fontSize: 20,
        height: 220,
        borderColor: 'gray',
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
    container: {
        flex: 1,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

module.exports = MainView;