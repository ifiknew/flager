import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar, AtTabs, AtTabsPane } from 'taro-ui'
import './HomePage.scss'
import FlagList from '../flag/FlagList';
import Mock from 'mockjs'
import API from '../../utils/API';

class HomePage extends Component {
  state = {
    searchKey: '',
    activeTabIndex: 1
  }

  handleChangeSearchKey = (searchKey) => this.setState({ searchKey })

  handleSearch = () => {

  }

  handleChangeTab = (activeTabIndex) => this.setState({ activeTabIndex })

  render() {
    return (
      <View className="HomePage">
        <AtSearchBar
          fixed
          value={this.state.searchKey}
          onChange={this.handleChangeSearchKey}
          onActionClick={this.handleSearch}
        />
        <View className="body">
          <AtTabs
            current={this.state.activeTabIndex}
            scroll
            tabList={[
              { title: '关注' },
              { title: '热门' },
              { title: '点赞' },
              { title: '参与' },
              { title: '我的' },
            ]}
            onClick={this.handleChangeTab}
          >
            <AtTabsPane current={this.state.activeTabIndex} index={0}>
              <FlagList type="followed"/>
            </AtTabsPane>
            <AtTabsPane current={this.state.activeTabIndex} index={1}>
              <FlagList type="popular"/>
            </AtTabsPane>
            <AtTabsPane current={this.state.activeTabIndex} index={2}>
              <FlagList type="praised"/>
            </AtTabsPane>
            <AtTabsPane current={this.state.activeTabIndex} index={3}>
              <FlagList type="joined"/>
            </AtTabsPane>
            <AtTabsPane current={this.state.activeTabIndex} index={4}>
              <FlagList type="my"/>
            </AtTabsPane>
          </AtTabs>
          {this.state.searchKey && (
            <View className="searchView">
              <FlagList type="search/title" keyword={this.state.searchKey}/>
            </View>
          )}
        </View>
      </View>
    )
  }
}

export default HomePage