'use strict';

var StatusBarIOS = require('StatusBarIOS');
var React = require('React');
var TabBarIOS = require('TabBarIOS');
var TabBarItemIOS = require('TabBarItemIOS');
var Navigator = require('Navigator');
var MainView = require('./MainView');

class TabsView extends React.Component {
  props:{
    navigator: Navigator
    };

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'main',
      day: '',
    };
  }

  onTabSelect(tab) {
    if (this.state.tab !== tab) {
      this.setState(
        {
          selectedTab: tab
        });
    }
  }

  render() {
    return (
      <TabBarIOS
        unselectedTintColor="yellow"
        tintColor="white"
        barTintColor="darkslateblue"
      >
        <TabBarIOS.Item
          title="主页"
          selected={this.state.selectedTab === 'main'}
          onPress={this.onTabSelect.bind(this, 'main')}
        >
          <MainView/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="设置"
          selected={this.state.selectedTab === 'setting'}
          onPress={this.onTabSelect.bind(this, 'setting')}
        >
          <MainView
            navigator={this.props.navigator}
          />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

module.exports = TabsView;
