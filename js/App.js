import MainView from '@js/MainView';
import PreviewView from '@js/PreviewView';
import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import {primaryColor} from '@js/common/Colors';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="MainView" component={MainView} title="Kindle助手" titleStyle={{color:'white'}}
                 navigationBarStyle={{backgroundColor:primaryColor}} initial={true}/>
          <Scene key="PreviewView" component={PreviewView} title="PreviewView"/>
        </Scene>
      </Router>
    )
  }
}