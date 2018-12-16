import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '../../actions/counter'

import { AtAvatar, AtTabBar, AtIcon } from 'taro-ui'


import './index.scss'
import HomePage from '../home/HomePage';

import API from '../../utils/API'
import CreateFlagModal from '../flag/CreateFlagModal';

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

interface Index {
  props: PageStateProps & PageDispatchProps & PageOwnProps;
}

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  state = {
    current: 0,
    avatar: '',
    userName: '',
    showModal: false
  }
  componentDidMount() {
    
    
    this.setState({
      avatar: Taro.getStorageSync('avatarUrl'),
      userName: Taro.getStorageSync('nickName'),
    })
  }
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () {
    
  }

  componentDidHide () { }

  handleClick = (current: number) => {
    this.setState({ current })
  }

  handleShowModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  render () {
    return (
      <View className='Index'>
        {this.state.current === 0 ? (
          <HomePage />
        ) : (
          <View className="Profile">
            <View className="header">
              <AtAvatar image={this.state.avatar} circle size="large"/>
              <View className="name">{this.state.userName}</View>
            </View>
          </View>
        )}
        <AtTabBar
          fixed
          tabList={[
            { title: '主页', iconType: 'home' },
            { title: '我的', iconType: 'user' },
          ]}
          onClick={this.handleClick}
          current={this.state.current}
        />
        {(this.state.current === 0) && (
          <View className="addIconWrapper" style={{ height: 56, width: 56 }} onClick={this.handleShowModal}><AtIcon value='add' size='30' color='#fff'></AtIcon></View>
        )}
        {this.state.showModal && (
          <CreateFlagModal onHide={this.handleShowModal}/>
        )}
      </View>
    )
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>
