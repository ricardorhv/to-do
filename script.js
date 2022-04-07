addTask()

function openModal(){
  modal.classList.remove('hidden')
  bg.classList.add('bg-black')
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
    task: task
  }
  localStorage.setItem('tasks', JSON.stringify([...taskLS, tasks]))
}

function removeTaskLS(id){
  const tasks = getTaskLS()
  localStorage.setItem('tasks', JSON.stringify(tasks.filter(task => task.id !== id)))
}

function addTask(){
  const task = getTaskLS()
  container.innerHTML = ''
  task.forEach(taskValue => {
    container.innerHTML += `<div class="card-task">
                        <input type="text" disabled value="${taskValue.task}">
                        <button class="btn-del" onClick="removeTask(${taskValue.id})">
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
})

btnSave.addEventListener('click', () => {
  addTaskLS()
  addTask()
  closeModal()
})

btnCancel.addEventListener('click', () => {
  closeModal()
})