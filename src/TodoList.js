/* eslint-disable array-callback-return */
class TodoList {
  constructor() {
    this.id = 0
    this.items = []
  }

  create(str) {
    this.id++
    const item = {
      id: this.id,
      text: str,
      status: 'incomplete',
      date: new Date().toDateString()
    }
    this.items.push(item)

    return item
  }

  showAll() {
    if (this.items.length > 1) {
      this.items.map((item) => {
        if (item.text.length > 20) {
          item.text = item.text.substring(0, 20) + '...'
        }
      })
    }

    return this.items
  }

  setComplete(id) {
    const item = this.findBy(id)
    item.status = 'complete'
    return item
  }

  getByStatus(status) {
    return this.items.filter((item) => item.status === status)
  }

  findBy(id) {
    const item = this.items.find((item) => item.id === id)
    if (item === undefined) throw new Error('Item not found')
    return item
  }

  filterByDate(date) {
    console.log('here', new Date().toDateString())
    const filteredItemes = []
    this.items.forEach((item) => {
      if (item.date === date) {
        filteredItemes.push(item)
      }
    })
    if (filteredItemes === undefined) throw new Error('Item not found')
    return filteredItemes
  }

  deleteBy(id) {
    const item = this.findBy(id)
    const index = this.items.indexOf(item)
    return this.items.splice(index, 1)[0]
  }
}
module.exports = TodoList
