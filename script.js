addTask()
let idToUpdate
let operation
function openModal(){
  modal.classList.remove('hidden')
  bg.classList.add('bg-black')
  taskAdd.focus()
}

function closeModal(){
  modal.classList.add('hidden')
  bg.classList.remove('bg-black')
  taskAdd.value = ''
}

function getTaskLS(){
  const taskLS = JSON.parse(localStorage.getItem("tasks"))
  return taskLS === null ? [] : taskLS
}

function addTaskLS(){
  const taskLS = getTaskLS()
  const task = taskAdd.value
  if(!task){
    return taskAdd.focus()
  }
  const tasks = {
    id: taskLS.length + 1,
    taskName: task
  }
  localStorage.setItem('tasks', JSON.stringify([...taskLS, tasks]))
}

function removeTaskLS(id){
  const tasks = getTaskLS()
  localStorage.setItem('tasks', JSON.stringify(tasks.filter(task => task.id !== id)))
}

function updateTaskLS(id) {
  const taskLS = getTaskLS()
  const tasks = taskLS.map(task => {
    if(task.id === id) {
      task.taskName = taskAdd.value
    }
    return task
  })

  
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

function updateTask(id) {
  const tasks = getTaskLS()
  const taskName = tasks.find((task) => task.id === id)
  taskAdd.value = taskName.taskName
  operation = 'up'
  idToUpdate = id 
}

function addTask(){
  const taskLS = getTaskLS()
  container.innerHTML = ''
  taskLS.forEach(task => {
    container.innerHTML += `<div class="card-task">
                        <input type="text" disabled value="${task.taskName}" id="taskInput">
                        <button class="btn-edit" onClick="updateTask(${task.id}); openModal()">
                          <span class="iconify" data-icon="bxs:edit"></span>
                        </button>
                        <button class="btn-del" onClick="removeTask(${task.id})">
                          <span class="iconify" data-icon="ic:round-done-all"></span>
                        </button>
                      </div>
  `
  })
}

function removeTask(id){
  removeTaskLS(id)
  addTask()
}

btnAdd.addEventListener('click', () => {
  openModal()
  operation = 'add'
})

btnSave.addEventListener('click', () => {
  if(operation === 'add') {
    addTaskLS()
  } else {
    updateTaskLS(idToUpdate)
  }
  addTask()
  closeModal()
})

btnCancel.addEventListener('click', closeModal)