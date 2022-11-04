const TodoList = require('../src/TodoList.js')

describe('TodoList', () => {
  let todoList

  beforeEach(() => {
    todoList = new TodoList()
  })

  it('creates a todo item', () => {
    // set up
    const expected = {
      id: 1,
      text: 'turn the heating on!',
      status: 'incomplete',
      date: new Date().toDateString()
    }

    // execute
    const result = todoList.create('turn the heating on!')

    // verify
    expect(result).toEqual(expected)
  })

  it('returns all items', () => {
    // set up
    const item1 = {
      id: 1,
      text: 'turn the heating on!',
      status: 'incomplete',
      date: new Date().toDateString()
    }
    const item2 = {
      id: 2,
      text: 'Do the washing up!',
      status: 'incomplete',
      date: new Date().toDateString()
    }
    const expected = [item1, item2]

    // execute
    todoList.create('turn the heating on!')
    todoList.create('Do the washing up!')

    // verify
    expect(todoList.showAll()).toEqual(expected)
  })

  it("if there's more than one item show the first 20 chars of the item text, followed by '...'", () => {
    // set up
    const expected = [
      {
        id: 1,
        text: 'turn the heating on!...',
        status: 'incomplete',
        date: new Date().toDateString()
      },
      {
        id: 2,
        text: 'Do the washing up! o...',
        status: 'incomplete',
        date: new Date().toDateString()
      }
    ]
    // execute
    todoList.create('turn the heating on! before is too late')
    todoList.create('Do the washing up! otherwise we all gonna die')
    // verify
    expect(todoList.showAll()).toEqual(expected)
  })

  it('should show the full description if there is only one item', () => {
    // SETUP
    const expected = [
      {
        id: 1,
        text: 'Do the washing up! otherwise we all gonna die',
        status: 'incomplete',
        date: new Date().toDateString()
      }
    ]
    // EXECUTE
    todoList.create('Do the washing up! otherwise we all gonna die')
    // VERIFY
    expect(todoList.showAll()).toEqual(expected)
  })

  it('sets item to be complete if found', () => {
    // set up
    const item1 = todoList.create('turn the heating on!')
    const expected = {
      id: 1,
      text: 'turn the heating on!',
      status: 'complete',
      date: new Date().toDateString()
    }

    // execute
    const result = todoList.setComplete(item1.id)

    // verify
    expect(result).toEqual(expected)
  })

  it('throws error if not found', () => {
    // set up

    // execute, verify
    expect(() => todoList.setComplete(1)).toThrowError('Item not found')
  })

  it('gets incomplete items', () => {
    // set up
    const item1 = todoList.create('turn the heating on!')
    const item2 = todoList.create('Do the washing up')
    todoList.setComplete(item1.id)
    const expected = [item2]

    // execute
    const result = todoList.getByStatus('incomplete')

    // verify
    expect(result).toEqual(expected)
  })

  it('gets complete items', () => {
    // set up
    const item1 = todoList.create('turn the heating on!')
    const item2 = todoList.create('Do the washing up')
    todoList.setComplete(item1.id)
    const expected = [item1]

    // execute
    const result = todoList.getByStatus('complete')

    // verify
    expect(result).toEqual(expected)
  })

  it('finds item by id', () => {
    // set up
    const item1 = todoList.create('turn the heating on!')
    const expected = {
      id: 1,
      text: 'turn the heating on!',
      status: 'incomplete',
      date: new Date().toDateString()
    }

    // execute
    const result = todoList.findBy(item1.id)

    // verify
    expect(result).toEqual(expected)
  })

  it('findBy throws error if not found', () => {
    // set up

    // execute, verify
    expect(() => todoList.findBy(1)).toThrowError('Item not found')
  })

  it('deletes item by id', () => {
    // set up
    const item1 = todoList.create('turn the heating on!')
    const expected = {
      id: 1,
      text: 'turn the heating on!',
      status: 'incomplete',
      date: new Date().toDateString()
    }

    // execute
    const deletedItem = todoList.deleteBy(1)

    // verify
    expect(deletedItem).toEqual(expected)
    expect(todoList.showAll()).toEqual([])
  })

  it('delete throws error if not found', () => {
    // set up

    // execute, verify
    expect(() => todoList.deleteBy(1)).toThrowError('Item not found')
  })

  it('should return the itemes of that selected date', () => {
    // set up
    const result = [
      {
        id: 1,
        text: 'turn the heating on!',
        status: 'incomplete',
        date: new Date().toDateString()
      }
    ]
    todoList.create('turn the heating on!')
    // execute
    const search = todoList.filterByDate(new Date().toDateString())
    // verify
    expect(search).toEqual(result)
  })

  it('should change the status of the selected item', () => {
    // set up
    todoList.create('turn the heating on!')

    // verify
    expect(todoList.setToCompleted(1)).toEqual({
      id: 1,
      text: 'turn the heating on!',
      status: 'completed',
      date: new Date().toDateString()
    })
  })

  it('should edit the text of the selected item', () => {
    // set up
    todoList.create('turn the heating on!')

    // verify
    expect(todoList.editText(1)).toEqual({
      id: 1,
      text: 'turn the heating off! you know how expensive it is? get a jumper!',
      status: 'incomplete',
      date: new Date().toDateString()
    })
  })
})
