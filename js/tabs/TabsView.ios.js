'use strict';

var F8Colors = require('F8Colors');
var StatusBarIOS = require('StatusBarIOS');
var React = require('React');
var TabBarIOS = require('TabBarIOS');
var TabBarItemIOS = require('TabBarItemIOS');
var Navigator = require('Navigator');
var MainView = require('./MainView');

import type {Tab, Day} from '../reducers/navigation';

class TabsView extends React.Component {
  props:{
    tab: Tab;
    day: Day;
    onTabSelect: (tab: Tab) => void;
    navigator: Navigator;
    };

  componentDidMount() {
    StatusBarIOS && StatusBarIOS.setStyle('light-content');
  }

  onTabSelect(tab:Tab) {
    if (this.props.tab !== tab) {
      this.props.onTabSelect(tab);
    }
  }

  render() {
    return (
      <TabBarIOS tintColor={F8Colors.darkText}>
        <TabBarItemIOS
          title="主页"
          selected={this.props.tab === 'main'}
          onPress={this.onTabSelect.bind(this, 'main')}
        >
          <MainView
            navigator={this.props.navigator}
          />
        </TabBarItemIOS>
        <TabBarItemIOS
          title="设置"
          selected={this.props.tab === 'setting'}
          onPress={this.onTabSelect.bind(this, 'setting')}
        >
          <MainView
            navigator={this.props.navigator}
          />
        </TabBarItemIOS>
      </TabBarIOS>
    );
  }

}

module.exports = TabsView;
