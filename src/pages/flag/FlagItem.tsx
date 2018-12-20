import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtAvatar, AtIcon, AtButton, AtActionSheet, AtActionSheetItem } from 'taro-ui'
import './FlagItem.scss'
import API from '../../utils/API';
import CreateFlagModal from './CreateFlagModal';
interface FlagItemProps {
  data: App.Flag,
  flag?: App.Flag,
  disableNavigation?: boolean
  disableInline?: boolean


  active?: boolean
  onClick?: (data: App.Flag) => void
  onUpdate?: () => void
}

class FlagItem extends Component<FlagItemProps> {
  state = {
    showEditModal: false,
    showAction: false,
  }
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.data)
    } else {
      if (this.props.disableNavigation !== true) {
        Taro.navigateTo({
          url: '/pages/flag/FlagPage?id='+this.props.data.id
        })
      }
    }
  }

  handleFollow = () => {
    const { data } = this.props
    API.query({
      url: '/member/follow/'+data.id,
      searchParams: {
        des: !data.isFollow
      },
      option: {
        method: 'POST',
      }
    }).then(_ => {
      if (this.props.onUpdate) {
        this.props.onUpdate()
      }
    })
  }

  handlePraise = () => {
    const { data } = this.props
    API.query({
      url: '/member/praise/'+data.id,
      searchParams: {
        des: !data.isPraise
      },
      option: {
        method: 'POST',
      }
    }).then(_ => {
      if (this.props.onUpdate) {
        this.props.onUpdate()
      }
    })
  }

  handleJoin = () => {
    const { data } = this.props
    API.query({
      url: '/member/join/'+data.id,
      searchParams: {
        des: !data.isJoin
      },
      option: {
        method: 'POST',
      }
    }).then(_ => {
      if (this.props.onUpdate) {
        this.props.onUpdate()
      }
    })
  }

  handleShowModal = () => {
    if (this.state.showEditModal && this.props.onUpdate) {
      this.props.onUpdate()
    }
    this.setState({ showEditModal: !this.state.showEditModal })
  }

  handleShowAction = () => {
    this.setState({ showAction: !this.state.showAction })
  }

  handleCloseFlag = (status) => {
    const { data } = this.props
    API.query({
      url: '/flag/close/'+data.id,
      searchParams: {
        flagStatus: status
      },
      option: {
        method: 'POST',
      }
    }).then(_ => {
      this.setState({ showAction: false })
      if (this.props.onUpdate) {
        this.props.onUpdate()
      }
    })
  }

  handlePraiseComment = () => {
    const { data } = this.props
    API.query({
      url: '/member/praise/'+data.id,
      searchParams: {
        des: !data.isPraise
      },
      option: {
        method: 'POST',
      }
    }).then(_ => {
      if (this.props.onUpdate) {
        this.props.onUpdate()
      }
    })
  }

  handleDeleteComment = () => {
    const { data } = this.props
    API.query({
      url: '/comment/delete/'+data.flagId+'/'+data.id,
      option: {
        method: 'DELETE',
      }
    }).then(_ => {
      if (this.props.onUpdate) {
        this.props.onUpdate()
      }
    })
  }

  render() {
    const { data } = this.props
    if (data == null) { return null }
    data.content = data.content || ''
    data.tasks = data.tasks || []
    return (
      <View
        className='FlagItem'
        onClick={this.handleClick}
        style={this.props.disableInline ? { borderBottom: '8px solid #f7f7f7' } 
        : this.props.active ? { borderBottom: '8px solid #f7f7f7', borderTop: '8px solid #f7f7f7' }
        : {}}
      >
        {this.props.disableInline ? (
          <View className="body">
            <View className="right">
              <View className="headline">
                  <AtAvatar circle image={data.creator.avatar} size="small" />
                  <View className="info">
                    <Text className="title">{data.title}</Text>
                    <Text 
                      className="time" 
                      style={data.status == 2 ?{color: '#4caf50'} : data.status == 1 ? {color: '#f44336'} : {}}
                    >
                      {`${data.creator.username || '匿名人士'} 立于 ${data.createTimeStr}`}
                      {data.status == 2 ? '，屹立不倒' : data.status == 1 ? '，Flag倒了' : ''}
                    </Text>
                  </View>
              </View>
              
              <View className="content">
                <Text>{data.content}</Text>
              </View>

              <View className="footer">
                <View className="left">
                  <View className="iconWrapper" onClick={this.handlePraise}>
                    <AtIcon value='heart-2' size='16' color={data.isPraise ? '#6190E8' : '#eee'} className="heartIcon"/>
                    <Text style={{ color: data.isPraise ? '#6190E8' : '#d9d9d9' }}>{data.isPraise?'已':''}点赞</Text>
                  </View>
                  <View className="iconWrapper" onClick={this.handleFollow}>
                    <AtIcon value='star-2' size='16' color={data.isFollow ? '#6190E8' : '#eee'}/>
                    <Text style={{ color: data.isFollow ? '#6190E8' : '#d9d9d9' }}>{data.isFollow?'已':''}关注</Text>
                  </View>
                </View>
                <View className='right'>
                  {data.isCreator && data.status == 0 && <AtButton type='secondary' size='small' onClick={this.handleShowModal}>编辑</AtButton> }
                  {data.isCreator && data.status == 0 && <AtButton type='secondary' size='small' onClick={this.handleShowAction}>关闭</AtButton> }
                  {!data.isCreator && data.status == 0 && (data.isPermitJoin || data.isJoin) &&<AtButton type='secondary' size='small' onClick={this.handleJoin}>{data.isJoin ? '我要退出' : '我要参与'}</AtButton> }
                </View>
              </View>

            </View>
          </View>
        ) : (
          <View className="body">
            <View className="left">
              <AtAvatar circle image={data.creator.avatar} size="small" />
            </View>
    
            <View className="right">
              <View className="headline inline">
                <Text className="title">{data.title}</Text>
                <Text className="time">
                  {data.createTimeStr}
                </Text>
              </View>
              <View className="content">
                <Text>{data.content.length > 50 && this.props.active != true ? data.content.slice(0, 50).trim() + '...' : data.content}</Text>
              </View>
              {/** only for comment */}
              <View className="footer" style={{ maxHeight: this.props.active ? '999px' : '0 !important', overflow: 'hidden' }}>
                <View className="left">
                  {/* <View className="iconWrapper" onClick={this.handlePraiseComment}>
                    <AtIcon value='heart-2' size='16' color={data.isPraise ? '#6190E8' : '#eee'} className="heartIcon"/>
                    <Text style={{ color: data.isPraise ? '#6190E8' : '#d9d9d9' }}>{data.isPraise?'已':''}点赞</Text>
                  </View> */}
                </View>
                <View className='right'>
                  {this.props.flag!.isCreator && (
                    <AtButton type='secondary' size='small' onClick={this.handleDeleteComment}>删除</AtButton>
                  )}
                  
                </View>
              </View>

            </View>
          </View>
        )}
        {this.state.showEditModal && (
          <CreateFlagModal onHide={this.handleShowModal} flag={this.props.data}/>
        )}
        {this.state.showAction && (
          <AtActionSheet 
            isOpened={this.state.showAction}
            title={
              data.tasks.some(v => v.status != 2) ? 
                '看起来你已经准备放弃了...'
              : '哦？你的Flag现在的情况是...'
            }
            onCancel={this.handleShowAction} 
            onClose={this.handleShowAction}
          >
            {(data.tasks.length == 0 || data.tasks.every(v => v.status == 2)) && (
              <AtActionSheetItem onClick={ this.handleCloseFlag.bind(this, 2) }>
                Flag屹立不倒
              </AtActionSheetItem>
            )}

            <AtActionSheetItem onClick={ this.handleCloseFlag.bind(this, 1) }>
              Flag倒了
            </AtActionSheetItem>
          </AtActionSheet>
        )}

      </View>
    )
  }
}

export default FlagItem