import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar, AtTabs, AtTabsPane, AtButton, AtAvatar, AtIcon } from 'taro-ui'
import './FlagPage.scss'
import FlagItem from './FlagItem';
import Mock from 'mockjs'

const LIST:Array<App.Flag> = Mock.mock({
  'list|1-10': [{
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
    activeTabIndex: 0,
    activeCommentId: -1,
    comment: '',
  }

  handleChangeTab = (activeTabIndex) => this.setState({ activeTabIndex })

  handleClickComment = (data: App.Flag) => this.setState({ activeCommentId: this.state.activeCommentId != data.id ? data.id : -1 })

  handleChangeComment = (comment: string) => this.setState({ comment })
  
  handleSubmitComment = () => {
    
  }
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
                        <View className="icon" style={{ backgroundColor: isCurrent ? '#79a1eb' : v.checked ? '#6ecaa6' : '#dfdfdf' }}>{v.checked ? <AtIcon value='check' size='16' color='#fff' /> : index+1}</View>
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
              <View className="AvatarGroup">
                {LIST.map(v => (
                  <View className="item">
                    <AtAvatar image={v.userAvatar} circle size="small"/>
                    <View>{v.userName}</View>
                  </View>
                ))}
              </View>
            </AtTabsPane>
            <AtTabsPane current={this.state.activeTabIndex} index={2}>
              <View className="CommentGroup">
                {LIST.map(v => (
                    <View className="item">
                      <FlagItem data={v} onClick={this.handleClickComment} active={this.state.activeCommentId == v.id}/>
                    </View>
                ))}
              </View>
            </AtTabsPane>
          </AtTabs>
        </View>
        {this.state.activeTabIndex == 2 && (
          <View className="CommentControl">
            <AtSearchBar
              placeholder="评论一下..."
              actionName='评论'
              value={this.state.comment}
              onChange={this.handleChangeComment}
              onActionClick={this.handleSubmitComment}
            />
          </View>
        )}
      </View>
    )
  }
}

export default FlagPage