// Save tasks in localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  const text = document.getElementById('taskText').value;
  const file = document.getElementById('fileInput').files[0];
  const image = document.getElementById('imageInput').files[0];
  const audio = document.getElementById('audioInput').files[0];

  if (!text) return alert('Please enter a task.');

  const task = { text, file: null, image: null, audio: null };

  if (file) task.file = URL.createObjectURL(file);
  if (image) task.image = URL.createObjectURL(image);
  if (audio) task.audio = URL.createObjectURL(audio);

  tasks.push(task);
  saveTasks();
  renderTasks();

  document.getElementById('taskText').value = "";
  document.getElementById('fileInput').value = "";
  document.getElementById('imageInput').value = "";
  document.getElementById('audioInput').value = "";
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task';

    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    taskText.onclick = () => li.classList.toggle('complete');

    const actions = document.createElement('div');
    actions.className = 'actions';

    if (task.file) {
      const fileLink = document.createElement('a');
      fileLink.href = task.file;
      fileLink.textContent = '📄 View File';
      fileLink.target = '_blank';
      actions.appendChild(fileLink);
    }

    if (task.image) {
      const img = document.createElement('img');
      img.src = task.image;
      img.alt = 'Task Image';
      img.style.maxWidth = '100px';
      img.style.marginTop = '10px';
      actions.appendChild(img);
    }

    if (task.audio) {
      const audioEl = document.createElement('audio');
      audioEl.src = task.audio;
      audioEl.controls = true;
      actions.appendChild(audioEl);
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    actions.appendChild(deleteBtn);

    li.appendChild(taskText);
    li.appendChild(actions);
    taskList.appendChild(li);
  });
}

function toggleTheme() {
  document.body.classList.toggle('dark');
}

document.getElementById('themeToggle').onclick = toggleTheme;

// Initial render
renderTasks();
