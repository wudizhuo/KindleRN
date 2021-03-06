import MainView from '@js/MainView';
import PreviewView from '@js/PreviewView';
import Setting from '@js/Setting';
import React, {Component} from 'react';
import {Router, Scene, Actions} from 'react-native-router-flux';
import {primaryColor} from '@js/common/Colors';

export default class App extends Component {
  render() {
    return (
      <Router getSceneStyle={getSceneStyle}>
        <Scene key="root">
          <Scene key="Setting" component={Setting} title="Setting" titleStyle={{color:'white'}}
                 navigationBarStyle={{backgroundColor:primaryColor}}/>
          <Scene key="MainView" component={MainView} title="Kindle助手" titleStyle={{color:'white'}}
                 navigationBarStyle={{backgroundColor:primaryColor}}
                 leftTitle="菜单"
                 onLeft={() => Actions.Setting()}
                 leftButtonTextStyle={{color:'white'}}
                 initial={true}/>
          <Scene key="PreviewView" component={PreviewView} title="PreviewView" titleStyle={{color:'white'}}
                 navigationBarStyle={{backgroundColor:primaryColor}}/>
        </Scene>
      </Router>
    )
  }
}
const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 64;
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};