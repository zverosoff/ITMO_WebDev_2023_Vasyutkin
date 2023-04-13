import 'uno.css';
import '@unocss/reset/tailwind.css';
import Dom from './src/constants/DOM';
import { randomString } from './src/utils/srtingUtils';

class TaskVO {
  constructor(title, date, tag) {
    this.title = title;
    this.date = date;
    this.tag = tag;
  }
}

let inpTitle = document.getElementById('inpTitle');
let inpDate = document.getElementById('inpDate');
let countries = document.getElementById('countries');

const task = new TaskVO('Read', Date.now());

const getDOM = (id) => document.getElementById(id);
const QUERY = (container, id) => container.querySelector(`[data-id="${id}"]`);

const domTask = getDOM(Dom.Template.TASK);

const tasks = [];

const selectTagsArrays = ['Web', 'Update', 'Desing', 'Content'];
const selectList = getDOM('tags');

function tagsList() {
  let tag = '';
  selectTagsArrays.forEach((item) => {
    tag += `
    <option value="${item}">${item}</option>
    `;
    selectList.innerHTML = tag;
  });
}

getDOM(Dom.Button.CREATE_TASK).onclick = () => {
  console.log('> domPopupCreateTask.classList');

  const domPopupCreateTask = getDOM(Dom.Popup.CREATE_TASK);
  const domBtnClose = QUERY(domPopupCreateTask, Dom.Button.CLOSE_POPUP_CREATE_TASK);
  const domBtnConfirm = QUERY(domPopupCreateTask, Dom.Button.POPUP_CREATE_TASK_CONFIRM);
  domPopupCreateTask.classList.remove('hidden');

  const onClousePopup = () => {
    domPopupCreateTask.classList.add('hidden');
    domBtnClose.onclick = null;
    domBtnConfirm.onclick = null;
  };

  domBtnClose.onclick = onClousePopup;

  let acceptData = () => {
    tasks.push({
      text: inpTitle.value,
      date: inpDate.value,
      description: countries.value,
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

    console.log(taskVO);
  };

  let resetForm = () => {
    inpTitle.value = '';
    inpDate.value = '';
    tags.value = '';
  };

  domBtnConfirm.onclick = () => {
    console.log('conmirm');
    const taskVO = new TaskVO(inpTitle.value, inpDate.value, tags.value);
    const taskView = domTask.cloneNode(true);

    QUERY(taskView, Dom.Template.Task.TITLE).innerText = taskVO.title;
    QUERY(taskView, Dom.Template.Task.DATE).innerText = taskVO.date;
    QUERY(taskView, Dom.Template.Task.COUTRIES).innerText = taskVO.tag;

    domTask.parentNode.prepend(taskView);
    tasks.push(taskVO);

    localStorage.setItem('tasks', JSON.stringify(tasks));

    console.log('confirm', taskVO);

    onClousePopup();
    resetForm();
  };
  tagsList();
};
