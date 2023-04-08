import 'uno.css';
import presetIcons from '@unocss/preset-icons';
import '@unocss/reset/tailwind.css';

const domBtnCreateTask = document.getElementById('btnCreateTask');
const domPopupCreateTask = document.getElementById('popupCreateTask');

domBtnCreateTask.onclick = (e) => {
  console.log(e);
  domPopupCreateTask.classList.remove('hidden');

  const domClouseCreateTaskPopup = document.getElementById('btnClouseCreateTaskPopup');
  domClouseCreateTaskPopup.onclick = () => {
    domPopupCreateTask.classList.add('hidden');
    domClouseCreateTaskPopup.onclick = null;
  };
};
