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
    DrawerLayoutAndroid,
    TouchableOpacity,
    } = React;

var Dimensions = require('Dimensions');
var preview = require('./PreviewPage');
var MenuList = require('./MenuListPage');


var DRAWER_REF = 'drawer';
var DRAWER_WIDTH_LEFT = 180;

var MainView = React.createClass({

    getInitialState: function () {
        return {
            inputText: 'http://www.kindlezhushou.com 电脑端 欢迎使用',
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

    //TODO post code post
    _preview() {
        this.props.navigator.push({
            name: 'preview',
            url: this.state.inputText
        });
    },

    _send() {
        ToastAndroid.show('PressSend Icon', ToastAndroid.SHORT)
    },


    onSelectMenu: function() {
        this.props.navigator.push({
            name: 'setting',
        });
        this.refs[DRAWER_REF].closeDrawer();
    },

    render: function () {
        return (
            <DrawerLayoutAndroid
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                drawerWidth={Dimensions.get('window').width - DRAWER_WIDTH_LEFT}
                keyboardDismissMode="on-drag"
                ref={DRAWER_REF}
                renderNavigationView={this._renderNavigationView}>
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
        return (
            <View>
                <ToolbarAndroid
                    navIcon={require('image!ic_menu_white')}
                    onIconClicked={() => this.refs[DRAWER_REF].openDrawer()}
                    style={styles.toolbar}
                    title={'Kindle 助手'}
                    navigator={this.props.navigator}
                    {...this.state.colorProps}
                    />
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
        );
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
});

module.exports = MainView;