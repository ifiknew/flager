import Taro, { Component } from '@tarojs/taro'
import './CreateFlagModal.scss'
import { View } from '@tarojs/components'
import { AtIcon, AtInput, AtTextarea, AtCheckbox } from 'taro-ui'
import API from '../../utils/API';
export interface CreateFlagModalProps {
  onHide: () => void,
  flag?: App.Flag
}

export default class CreateFlagModal extends Component<CreateFlagModalProps, any> {
  state = {
    title: '',
    content: '',
    taskList: [] as Array<{ name: string, status: number }>,
    attend: []
  }
  componentDidMount() {
    const { flag } = this.props
    if (flag != null) {
      this.setState({
        title: flag.title,
        content: flag.content,
        taskList: flag.tasks,
        attend: [flag.isPermitJoin]
      })
    }
  }
  handleChangeTitle = (title) => {
    this.setState({ title })
  }
  handleChangeContent = (e) => {
    this.setState({ content: e.target.value })
  }
  handleChangeTask = (index, task) => {
    this.setState({
      taskList: this.state.taskList.map((v,i) => i !== index ? v : { name: task, status: v.status })
    })
  }
  handleAddTask = () => {
    this.setState({
      taskList: [...this.state.taskList, { name: '', status: 0 }]
    })
  }
  handleDeleteTask = (index) => {
    this.setState({
      taskList: this.state.taskList.filter((_,i) => i !== index)
    })
  }
  handleChangeAttend = (attend) => {
    this.setState({
      attend
    })
  }
  handleSubmit = () => {
    const { flag } = this.props
    API.query({
      url: flag == null ? '/flag/create' : '/flag/save/'+flag.id,
      option: {
        method: 'POST',
        data: {
          description: JSON.stringify({
            content: this.state.content,
            tasks: this.state.taskList
          }),
          isPermitJoin: this.state.attend.some(Boolean),
          title: this.state.title,

          startTime: '2019-07-07 11:11:11',
          tasks: [],
          type: 0
        }
      },
      success: '创建成功'
    }).then(res => {
      if (res.statusCode == 200) {
        this.props.onHide()
      }
    })
  }
  prevent = (e : any) => {
    e.stopPropagation()
  }
  public render() {
    const { flag } = this.props
    return (
      <View className="CreateFlagModalWrapper" onClick={this.props.onHide}>
        <View className="CreateFlagModal" onClick={this.prevent}>
          <View className="header">{flag ? '修改' : '立个'}Flag</View>
          <View className="body">
            <View className="title">标题</View>
            <AtInput
              name='value1'
              type='text'
              placeholder='flag标题'
              value={this.state.title}
              onChange={this.handleChangeTitle}
              customStyle={{
                padding: '0'
              }}
            />
            <View className="title">内容</View>
            <AtTextarea
              value={this.state.content}
              onChange={this.handleChangeContent}
              maxlength={'500'}
              placeholder='我宣誓,我要...'
              customStyle={{position: 'relative'}}
            />
            <View className="title">参与者</View>
            <AtCheckbox
              options={[{ value: true, label: '允许其他人加入' }]}
              selectedList={this.state.attend}
              onChange={this.handleChangeAttend}
            />
            <View className="title">任务</View>
            <View className="taskGroup">
              {this.state.taskList.map((v, index) => (
                <View style={{ marginBottom: '4px' }}>
                  <AtInput
                    name={`task${v}`}
                    type='text'
                    placeholder={v.name ? '' : `任务${index+1}内容...`}
                    value={v.name}
                    onChange={this.handleChangeTask.bind(this, index)}
                    customStyle={{
                      padding: '0'
                    }}
                    disabled={this.props.flag && v.status != 0}
                  >
                    {!(this.props.flag && v.status != 0) && (
                      <AtIcon value='close-circle' size='16' color='#ccc' onClick={this.handleDeleteTask.bind(this, index)}></AtIcon>
                    )}
                  </AtInput>
                </View>
              ))}
              <View className="addTaskButton" onClick={this.handleAddTask}>+ 添加任务</View>

            </View>
          </View>
          <View className="footer">
            <View className="cancelButton" onClick={this.props.onHide}>放弃</View>
            <View className="confirmButton" onClick={this.handleSubmit}>{flag? '重新宣誓' : '宣誓'}</View>
          </View>
        </View>
      </View>
    );
  }
}
