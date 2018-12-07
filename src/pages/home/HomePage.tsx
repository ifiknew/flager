import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar, AtTabs, AtTabsPane } from 'taro-ui'
import './HomePage.scss'
import FlagList from '../flag/FlagList';
const LIST:Array<App.Flag> = [
  {
    id: 1,
    title: '测试flag标题',
    content: '测试flag内容',

    userId: 1,
    userName: '测试用户名',
    userAvatar: '测试头像',

    timestamp: new Date().valueOf(),
  },
  {
    id: 1,
    title: '测试flag标题',
    content: '测试flag内容',

    userId: 1,
    userName: '测试用户名',
    userAvatar: '测试头像',

    timestamp: new Date().valueOf(),
  },
  {
    id: 1,
    title: '测试flag标题',
    content: '测试flag内容',

    userId: 1,
    userName: '测试用户名',
    userAvatar: '测试头像',

    timestamp: new Date().valueOf(),
  },
  {
    id: 1,
    title: '测试flag标题',
    content: '测试flag内容',

    userId: 1,
    userName: '测试用户名',
    userAvatar: '测试头像',

    timestamp: new Date().valueOf(),
  },
  {
    id: 1,
    title: '测试flag标题',
    content: '测试flag内容',

    userId: 1,
    userName: '测试用户名',
    userAvatar: '测试头像',

    timestamp: new Date().valueOf(),
  },
  {
    id: 1,
    title: '测试flag标题',
    content: '测试flag内容',

    userId: 1,
    userName: '测试用户名',
    userAvatar: '测试头像',

    timestamp: new Date().valueOf(),
  },
  {
    id: 1,
    title: '测试flag标题',
    content: '测试flag内容',

    userId: 1,
    userName: '测试用户名',
    userAvatar: '测试头像',

    timestamp: new Date().valueOf(),
  },
  {
    id: 1,
    title: '测试flag标题',
    content: '测试flag内容',

    userId: 1,
    userName: '测试用户名',
    userAvatar: '测试头像',

    timestamp: new Date().valueOf(),
  }
]
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
              <FlagList data={LIST}/>
            </AtTabsPane>
            <AtTabsPane current={this.state.activeTabIndex} index={1}>
              <FlagList data={LIST}/>
            </AtTabsPane>
            <AtTabsPane current={this.state.activeTabIndex} index={2}>
              <FlagList data={LIST}/>
            </AtTabsPane>
            <AtTabsPane current={this.state.activeTabIndex} index={3}>
              <FlagList data={LIST}/>
            </AtTabsPane>
            <AtTabsPane current={this.state.activeTabIndex} index={4}>
              <FlagList data={LIST}/>
            </AtTabsPane>
          </AtTabs>
        </View>
      </View>
    )
  }
}

export default HomePage