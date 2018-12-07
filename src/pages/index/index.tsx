import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '../../actions/counter'

import { AtTabBar, AtSearchBar, AtTabs, AtTabsPane } from 'taro-ui'


import './index.scss'
import HomePage from '../home/HomePage';

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

  render () {
    return (
      <View className='Index'>
        {this.state.current === 0 ? (
          <HomePage />
        ) : null}
        <AtTabBar
          fixed
          tabList={[
            { title: '主页', iconType: 'home' },
            { title: '我的', iconType: 'user' },
          ]}
          onClick={this.handleClick}
          current={this.state.current}
        />
      </View>
    )
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>
