import Taro, { Component, Config } from '@tarojs/taro'
import { ScrollView } from '@tarojs/components'
import FlagItem from './FlagItem';
import API from '../../utils/API';
import Parser from '../../utils/Parser';
interface FlagListProps {
  type?: string,
  keyword?: string,
}

class FlagList extends Component<FlagListProps> {
  state = {
    clientHeight: 900,
    activeId: -1,
    data: [] as Array<App.Flag>
  }
  componentDidMount() {
    Taro.getSystemInfo({
      success: res =>  {
        this.setState({
          clientHeight: res.windowHeight
        })
      }
    })
    API.query({
      url: '/flag/'+ this.props.type ,
      searchParams: {
        title: this.props.keyword || ''
      },
      option: {
        method: 'POST',
        data: {
          "pageNumber": 0,
          "pageSize": 20,
        }
      }
    }).then(res => {
      this.setState({
        data: res.data.content.map(v => ({
          ...v,
          ...Parser.parseDescription(v.description),
          createTimeStr: Parser.parseTimeAndFormat(v.createTime)
        }))
      })
    })
  }
  handleScrollToUpper = () => {
    console.log('toUpper')
  }
  handleScrollToLower = () => {
    console.log('toLower')
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
        onScrollToLower={this.handleScrollToLower}
      >
        {this.state.data.map(v => (
          <FlagItem data={v} />
        ))}
      </ScrollView>
    )
  }
}

export default FlagList