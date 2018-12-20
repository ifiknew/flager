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
    data: [] as Array<App.Flag>,
    page: 0
  }
  componentDidMount() {
    Taro.getSystemInfo({
      success: res =>  {
        this.setState({
          clientHeight: res.windowHeight
        })
      }
    })
    this.fetchList()

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.keyword != this.props.keyword) {
      this.fetchList(0)
    }
  }
  fetchList = (page = this.state.page) => {
    API.query({
      url: '/flag/'+ this.props.type ,
      searchParams: {
        title: this.props.keyword || ''
      },
      option: {
        method: 'POST',
        data: {
          "pageNumber": page,
          "pageSize": 20,
        }
      }
    }).then(res => {
      const prev = page == 0 ? [] : this.state.data
      this.setState({
        data: prev
          .filter(v => !res.data.content.some(u => u.id == v.id))
          .concat(
            res.data.content.map(v => ({
              ...v,
              ...Parser.parseDescription(v.description),
              createTimeStr: Parser.parseTimeAndFormat(v.createTime)
            }))
          ),
        page: res.data.last ? 0 : page + 1
      })
    })
  }
  handleScrollToUpper = () => {
    console.log('toUpper')
    this.fetchList(0)
  }
  handleScrollToLower = () => {
    console.log('toLower')
    this.fetchList()
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