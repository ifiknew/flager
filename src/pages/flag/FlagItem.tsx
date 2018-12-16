import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtAvatar, AtIcon, AtButton } from 'taro-ui'
import './FlagItem.scss'
interface FlagItemProps {
  data: App.Flag,
  disableNavigation?: boolean
  disableInline?: boolean

  active?: boolean
  onClick?: (data: App.Flag) => void 
}

class FlagItem extends Component<FlagItemProps> {
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
  render() {
    const { data } = this.props
    if (data == null) { return null }
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
                  <AtAvatar circle image={data.userAvatar} size="small" />
                  <View className="info">
                    <Text>{data.title}</Text>
                    <Text className="time">
                      {`${data.userName || ''} 立于 ${data.createTimeStr}`}
                    </Text>
                  </View>
              </View>
              
              <View className="content">
                <Text>{data.content}</Text>
              </View>

              <View className="footer">
                <View className="left">
                  <View className="iconWrapper"><AtIcon value='heart-2' size='24' color='#eee' className="heartIcon"/><Text>点赞</Text></View>
                  <View className="iconWrapper"><AtIcon value='star-2' size='24' color='#eee'/><Text>关注</Text></View>
                </View>
                <View className='right'>
                  <AtButton type='secondary' size='small' >我要参与</AtButton>
                </View>
              </View>

            </View>
          </View>
        ) : (
          <View className="body">
            <View className="left">
              <AtAvatar circle image={data.userAvatar} size="small" />
            </View>
    
            <View className="right">
              <View className="headline inline">
                <Text>{data.title}</Text>
                <Text className="time">
                  {data.createTimeStr}
                </Text>
              </View>
              <View className="content">
                <Text>{data.content.length > 100 && this.props.active != true ? data.content.slice(0, 100).trim() + '...' : data.content}</Text>
              </View>
              <View className="footer" style={{ maxHeight: this.props.active ? '999px' : '0 !important', overflow: 'hidden' }}>
                <View className="left">
                  <View className="iconWrapper"><AtIcon value='heart-2' size='24' color='#eee' className="heartIcon"/><Text>点赞</Text></View>
                </View>
                <View className='right'>
                  <AtButton type='secondary' size='small' >删除</AtButton>
                </View>
              </View>
            </View>
          </View>
        )}



      </View>
    )
  }
}

export default FlagItem