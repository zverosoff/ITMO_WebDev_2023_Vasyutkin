import 'uno.css';
import '@unocss/reset/tailwind.css';
import Dom from './src/constants/DOM';
import { randomString } from './src/utils/srtingUtils';

class TaskVO {
  static fromJSON(json) {
    return new TaskVO(json.id, json.title, json.date, json.tag);
  }

  constructor(id, title, date, tag) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.tag = tag;
  }
}

let inpTitle = document.getElementById('inpTitle');
let inpDate = document.getElementById('inpDate');
let countries = document.getElementById('countries');

const KEY_LOCAL_TASKS = 'tasks';

const task = new TaskVO('Read', Date.now());

const getDOM = (id) => document.getElementById(id);
const QUERY = (container, id) => container.querySelector(`[data-id="${id}"]`);

const domTemplateTask = getDOM(Dom.Template.TASK);
const domTaskColumn = domTemplateTask.parentNode;
domTemplateTask.remove();

const rawTasks = localStorage.getItem(KEY_LOCAL_TASKS);

const tasks = (rawTasks && JSON.parse(rawTasks).map((json) => TaskVO.fromJSON(json))) || [];
tasks.forEach((taskVO) => renderTask(taskVO));
console.log(tasks);

const selectTagsArrays = ['Web', 'Update', 'Desing', 'Content'];
const selectList = getDOM('tags');

function tagsList() {
  let tag = '';
  selectTagsArrays.forEach((item) => {
    tag += `
    <option value="${item}">${item}</option>
    `;
    selectList.innerHTML = `<option selected disabled>Choose a tag</option>` + tag;
  });
}

domTaskColumn.onclick = (e) => {
  console.log(e.target);
  renderTaskPopup('Update Task', 'Update', () => {
    console.log('>Update task -> On Confirm');
  });
};

getDOM(Dom.Button.CREATE_TASK).onclick = () => {
  console.log('> domPopupCreateTask.classList');

  renderTaskPopup('Create Task', 'Create', () => {
    onCreateTaskClick();
    console.log('>Create task -> On Confirm');
  });
};

function onCreateTaskClick() {
  const taskId = `task_${Date.now()}`;
  const taskTitle = inpTitle.value;
  const taskVO = new TaskVO(taskId, taskTitle, inpDate.value, tags.value);

  renderTask(taskVO);
  tasks.push(taskVO);
  console.log('confirm', taskVO);
  localStorage.setItem(KEY_LOCAL_TASKS, JSON.stringify(tasks));
}

function renderTask(taskVO) {
  const domTaskClone = domTemplateTask.cloneNode(true);
  domTaskClone.dataset.id = taskVO.id;
  QUERY(domTaskClone, Dom.Template.Task.TITLE).innerText = taskVO.title;
  QUERY(domTaskClone, Dom.Template.Task.DATE).innerText = taskVO.date;
  QUERY(domTaskClone, Dom.Template.Task.COUTRIES).innerText = taskVO.tag;
  domTaskColumn.prepend(domTaskClone);
}

function renderTaskPopup(popupTitle, btnConfirmText, confirmCallback) {
  const domPopupCreateTask = getDOM(Dom.Popup.CREATE_TASK);
  const domBtnClose = QUERY(domPopupCreateTask, Dom.Button.CLOSE_POPUP_CREATE_TASK);
  const domBtnConfirm = QUERY(domPopupCreateTask, Dom.Button.POPUP_CREATE_TASK_CONFIRM);
  const domTitle = QUERY(domPopupCreateTask, Dom.Popup.CreateTask.TITLE);
  domBtnConfirm.innerText = btnConfirmText;
  domTitle.innerText = popupTitle;

  const onClousePopup = () => {
    domPopupCreateTask.classList.add('hidden');
    domBtnClose.onclick = null;
    domBtnConfirm.onclick = null;
  };

  domPopupCreateTask.classList.remove('hidden');
  domBtnClose.onclick = onClousePopup;

  let acceptData = () => {
    tasks.push({
      text: inpTitle.value,
      date: inpDate.value,
      description: countries.value,
    });

    console.log(taskVO);
  };

  domBtnConfirm.onclick = () => {
    const taskTitle = inpTitle.value;
    const taskDate = inpDate.value;
    const taskTags = tags.value;
    confirmCallback && confirmCallback(taskTitle, taskDate, taskTags);
    onClousePopup();
  };
  tagsList();
}
