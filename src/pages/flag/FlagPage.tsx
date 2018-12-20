import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar, AtTabs, AtTabsPane, AtButton, AtAvatar, AtIcon } from 'taro-ui'
import './FlagPage.scss'
import FlagItem from './FlagItem';
import API from '../../utils/API';
import Parser from '../../utils/Parser';
import { func } from 'prop-types';

class FlagPage extends Component {

  config: Config = {
    navigationBarTitleText: 'Flag详情'
  }

  state = {
    searchKey: '',
    activeTabIndex: 0,
    activeCommentId: '',
    comment: '',

    data: undefined as App.Flag | undefined,
    members: [] as App.Member[],
    comments: [] as App.Flag[]
  }

  componentDidMount() {

    this.fetchDetail()
    this.fetchMember()
    this.fetchComment()
  }

  fetchDetail = () => {
    const id = this.getId()

    API.query({
      url: '/flag/detail/'+id,
      option: {
        method: 'GET',
      }
    }).then(res => {
      this.setState({
        data: {
          ...res.data,
          ...Parser.parseDescription(res.data.description),
          createTimeStr: Parser.parseTimeAndFormat(res.data.createTime)
        }
      })
    })
  }

  fetchMember = () => {
    const id = this.getId()
    API.query({
      url: '/member/list/'+id,
      option: {
        method: 'POST',
        data: {
          pageNumber: 0,
          pageSize: 99
        } 
      }
    }).then(res => {
      this.setState({
        members: res.data.content
      })
    })
  }

  fetchComment = () => {
    const id = this.getId()
    API.query({
      url: '/comment/list/'+id,
      option: {
        method: 'POST',
        data: {
          pageNumber: 0,
          pageSize: 99
        } 
      }
    }).then(res => {
      this.setState({
        comments: res.data.content
      })
    })
  }

  handleChangeTab = (activeTabIndex) => this.setState({ activeTabIndex })

  handleClickComment = (data: App.Flag) => this.setState({ activeCommentId: this.state.activeCommentId != data.id ? data.id : -1 })

  handleChangeComment = (comment: string) => this.setState({ comment })
  
  handleSubmitComment = () => {
    const id = this.getId()
    API.query({
      url: '/comment/add/'+id,
      option: {
        method: 'POST',
        data: {
          content: this.state.comment
        },
      },
    }).then(res => {
      this.setState({ comment: '' })
      this.fetchComment()
    })
  }

  handleFinishTask = (index: number, status) => {
    const id = this.getId()
    const { data }  = this.state
    API.query({
      url: '/flag/save/'+id,
      option: {
        method: 'POST',
        data: {
          description: JSON.stringify({
            content: this.state.data!.content,
            tasks: this.state.data!.tasks.map((v, i) => i != index ? v : ({
              ...v,
              status
            }))
          }),
          title: data!.title,
          isPermitJoin: data!.isPermitJoin,
          type: 0
        },
      },
      success: '',
    }).then(res => {
      this.fetchDetail()
    })
  } 
  getId = () => {
    const pages = Taro.getCurrentPages()
    const cur = pages[pages.length - 1]
    const id = cur.options.id
    return id
  }
  render() {
    const data = this.state.data
    if (data == null) { return null }
    return (
      <View className="FlagPage">
        <View className="content">
          <FlagItem data={data} onUpdate={this.fetchDetail} disableNavigation disableInline/>
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
                {data.tasks != null && data.tasks.map((v, index) => {
                  return (
                    <View className="item">
                      <View className="left">
                        <View className="icon" style={{ backgroundColor: v.status == 1 ? '#dfdfdf' : '#6190E8' }}>
                          {v.status == 2 ? <AtIcon value='check' size='16' color='#fff' /> : index+1}
                        </View>
                        <View className="name" style={v.status != 0 ? { color: '#aaa' } : {}}>{v.name}</View>
                      </View>
                      <View className="buttonWrapper">
                        {v.status == 0 && <AtButton type='secondary' size='small' circle onClick={this.handleFinishTask.bind(this, index, 2)}>完成</AtButton>}
                        {v.status == 0 && <AtButton type='secondary' size='small' circle onClick={this.handleFinishTask.bind(this, index, 1)}>失败</AtButton>}
                      </View>
                    </View>
                  )
                })}
              </View>
            </AtTabsPane>
            <AtTabsPane current={this.state.activeTabIndex} index={1}>
              <View className="AvatarGroup">
                {this.state.members.map(v => (
                  <View className="item">
                    <AtAvatar image={v.avatar} circle size="small"/>
                    <View>{v.username}</View>
                  </View>
                ))}
              </View>
            </AtTabsPane>
            <AtTabsPane current={this.state.activeTabIndex} index={2}>
              <View className="CommentGroup">
                {this.state.comments
                  .map(v => ({
                    ...v,
                    createTimeStr: Parser.parseTimeAndFormat(v.commentTime),
                    title: v.creator.username
                  }))
                  .map(v => (
                    <View className="item">
                      <FlagItem 
                        data={v} 
                        onClick={this.handleClickComment} 
                        active={this.state.activeCommentId == v.id}
                        onUpdate={this.fetchComment}
                        flag={data}
                      />
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