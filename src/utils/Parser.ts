const Parser = {
  parseDescription: (des: string) => {
    try {
      const json = JSON.parse(des)
      return {
        content: json.content || '',
        tasks: json.tasks || json.taskList || []
      }
    } catch (error) {
      return {
        content: '',
        tasks: []
      }
    }
  },
  parseTime: (time :string) => {
    return new Date(time).valueOf() 
  },
  parseTimeAndFormat: (time: string) => {
    const d = new Date(time)
    return `${d.getMonth()+1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
  }
}

export default Parser