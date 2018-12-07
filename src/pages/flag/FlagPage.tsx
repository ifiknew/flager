import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar, AtTabs, AtTabsPane, AtButton } from 'taro-ui'
import './FlagPage.scss'
import FlagItem from './FlagItem';
import Mock from 'mockjs'

const LIST:Array<App.Flag> = Mock.mock({
  'list|5-50': [{
    'id|+1': 1,
    title: /[a-z ]{1,20}/,
    content: /[a-z ]{1,200}/,

    'userId|+1': 2,
    userName: /[a-z ]{1,20}/,
    userAvatar: '',

    timestamp: new Date().valueOf(),
    'taskList|0-10': [{
      name: /[a-z ]{1,20}/,
      'checked|1': true
    }]
  }]
}).list
class FlagPage extends Component {

  config: Config = {
    navigationBarTitleText: 'Flag详情'
  }

  state = {
    searchKey: '',
    activeTabIndex: 1
  }

  handleChangeTab = (activeTabIndex) => this.setState({ activeTabIndex })

  render() {
    const data = LIST[0]
    return (
      <View className="FlagPage">
        <View className="content">
          <FlagItem data={data} disableNavigation disableInline/>
        </View>
        <View className="menu">
          <AtTabs
            current={this.state.activeTabIndex}
            scroll
            tabList={[
              { title: '任务栏' },
              { title: '参与者' },
              { title: '评论区' },
            ]}
            onClick={this.handleChangeTab}
          >
            <AtTabsPane current={this.state.activeTabIndex} index={0}>
              <View className='Timeline'>
                {data.taskList != null && data.taskList.map((v, index) => {
                  const isCurrent = v.checked === false && (index === 0 || data.taskList[index-1].checked === true) 
                  return (
                    <View className="item">
                      <View className="left">
                        <View className="icon" style={{ backgroundColor: isCurrent ? '#79a1eb' : v.checked ? '#6ecaa6' : '#dfdfdf' }}>{v.checked ? '✔' : index+1}</View>
                        <View className="name" style={isCurrent === false ? { color: '#ccc' } : {}}>{v.name}</View>
                      </View>
                      <View className="buttonWrapper">
                        {isCurrent && <AtButton type='secondary' size='small' >完成</AtButton>}
                      </View>
                    </View>
                  )
                })}
              </View>
            </AtTabsPane>
            <AtTabsPane current={this.state.activeTabIndex} index={1}>
              2
            </AtTabsPane>
            <AtTabsPane current={this.state.activeTabIndex} index={2}>
              3
            </AtTabsPane>
          </AtTabs>
        </View>
      </View>
    )
  }
}

export default FlagPage