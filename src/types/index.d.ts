declare namespace App {

  interface Flag {
    id: string
    flagId: string
    title: string

    content: string
    tasks: Array<Task>

    createTime: number
    createTimeStr: string
    finishTime: any
    
    isCreator: boolean,
    isFollow: boolean,
    isJoin: boolean,
    isPermitJoin: boolean,
    isPraise: boolean,
    
    status: number

    creator: {
      id: string,
      username: string,
      avatar: string
    }

    commentTime: string
    
  }

  interface Task {
    id: number
    name: string
    status: number
  }
  interface Member {
    username: string,
    avatar: string
  }
}