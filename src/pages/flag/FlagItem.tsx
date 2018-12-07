import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import './FlagItem.scss'
interface FlagItemProps {
  data: App.Flag
}

class FlagItem extends Component<FlagItemProps> {

  render() {
    const { data } = this.props
    return (
      <View
        className='FlagItem'
      >
        <View className="body">
          <View className="left">
            <AtAvatar circle image={data.userAvatar} size="small" />
          </View>
          <View className="right">
            <View className="headline">
              <Text>{data.userName}</Text>
              <Text className="time">
              {new Intl.DateTimeFormat(
                'zh-CN', 
                {
                  month: '2-digit', day: '2-digit',
                  hour: '2-digit', minute: '2-digit',
                  hour12: false,
                }
              ).format(new Date(data.timestamp))}
              </Text>
            </View>
            <View className="content">
              <Text>{data.content}</Text>
            </View>
          </View>
        </View>
        <View className="footer">

        </View>

      </View>
    )
  }
}

export default FlagItem