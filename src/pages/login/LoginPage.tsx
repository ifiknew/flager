import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtButton, AtAvatar } from 'taro-ui'
import './LoginPage.scss'
import FlagImage from './flag.png'
class LoginPage extends Component {

  config: Config = {
    navigationBarTitleText: '授权'
  }

  state = {
    current: 0,

  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () {
    
  }

  componentDidHide () { }

  handleGetUserInfo = (e: { detail: { userInfo: { nickName:string, avatarUrl: string  } } } | any) => {
    const {
      nickName,
      avatarUrl
    } = e.detail.userInfo
    console.log(e)
    Taro.setStorageSync('nickName', nickName)
    Taro.setStorageSync('avatarUrl', avatarUrl)
    Taro.navigateTo({
      url: '/pages/index/index'
    })
  }

  render () {
    return (
      <View className='LoginPage'>
        <View className="content">
          <View className="imageWrapper"><Image  src={FlagImage} /></View>
          <View className="text">FLAG根据地</View>
          <AtButton type="primary" openType="getUserInfo" onGetUserInfo={this.handleGetUserInfo} >授权并登陆</AtButton>
          <AtButton type="secondary">残忍拒绝</AtButton>
        </View>
      </View>
    )
  }
}

export default LoginPage
