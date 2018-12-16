declare namespace App {

  interface Flag {
    id: string
    
    title: string

    content: string
    tasks: Array<Task>

    createTime: number
    createTimeStr: string



    userId: number
    userName: string
    userAvatar: string

    timestamp: number

    taskList: Array<Task>
    
  }

  interface Task {
    id: number
    name: string
    checked: boolean
  }
}