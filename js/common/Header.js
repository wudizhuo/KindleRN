import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {primaryColor} from '@js/common/Colors';

class Header extends Component {
    render() {
        return (
            <View style={styles.header}>
                <View style={styles.headerCenter}>
                    <Text style={styles.title}>Kindle助手</Text>
                </View>
                <View style={styles.headerLeft}>
                    <Button title="Back"/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#96969A',
        backgroundColor: primaryColor,
        flexDirection: 'row',
        paddingTop: 20,
    },
    headerLeft: {},
    headerCenter: {
        flex: 1,
        position: 'absolute',
        top: 27,
        left: 0,
        right: 0,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 19,
        fontWeight: '600',
        textAlign: 'center',
    },
    exampleContainer: {
        flex: 1,
    },
});

module.exports = Header;