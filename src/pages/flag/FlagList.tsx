import Taro, { Component, Config } from '@tarojs/taro'
import { ScrollView } from '@tarojs/components'
import FlagItem from './FlagItem';

interface FlagListProps {
  data: Array<App.Flag>
}

class FlagList extends Component<FlagListProps> {
  state = {
    clientHeight: 900
  }
  componentDidMount() {
    Taro.getSystemInfo({
      success: res =>  {
        this.setState({
          clientHeight: res.windowHeight
        })
      }
    })
  }
  handleScrollToUpper = () => {

  }
  render() {
    return (
      <ScrollView
        className='FlagList'
        scrollY
        scrollWithAnimation
        style={`height: ${this.state.clientHeight - 44 - 52 - 47}px;`}
        scrollTop={0}
        lowerThreshold={20}
        upperThreshold={20}
        onScrollToUpper={this.handleScrollToUpper}
      >
        {this.props.data.map(v => (
          <FlagItem data={v} />
        ))}
      </ScrollView>
    )
  }
}

export default FlagList