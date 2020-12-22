import move3d from '../modules/mainButton.js';

('use strict');

let screenHeight = window.innerHeight;
let screenWidth = window.innerWidth;
let mobileScreen = true;
if (screenWidth > 1024) mobileScreen = false;

//mouse move anim
if (!mobileScreen) {
  const cursor = document.querySelector('.cursor');
  cursor.style.display = 'block';
  document.addEventListener('mousemove', event => {
    anime({
      targets: cursor,
      duration: 0,
      easing: 'linear',
      left: event.clientX,
      top: event.clientY,
    });
  });
}

let order = {
  'Вид съемки': 'Индивидуальная/Контент съемка',
  'Количество часов': 2,
};
//calculator logic
//type of ph
const typePhList = document.querySelectorAll(`input[name='type-ph']`);
const secondTabH2 = document.querySelector('.quest-tab:nth-of-type(3) .quest-tab__question');
const additionalServ = document.querySelector('.additionalServ-check');
const idea_check = additionalServ.querySelector('.idea-check');
const stylist_check = additionalServ.querySelector('.stylist-check');
const thirdTab = document.querySelector('.quest-tab:nth-of-type(4)');

const thirdTabQuests = document.querySelectorAll('.veriable-item');
const questForBrands = document.querySelectorAll('.for-brands');
const questForFamily = document.querySelectorAll('.for-family');
const questForReport = document.querySelectorAll('.for-report');

typePhList.forEach(element => {
  element.addEventListener('change', addNewQuestions);
});
function addNewQuestions(event) {
  order = {
    "Вид съемки": 'Индивидуальная/Контент съемка',
    "Количество часов": hours_number.value,
  };
  order['Вид съемки'] = event.target.value;
  checkboxInput.forEach(elem => (elem.checked = false));

  if (event.target.value === 'Репортаж') {
    secondTabH2.textContent = 'Количество часов';
    hours_number.setAttribute('name', 'hours_number');
    hours_number.setAttribute('min', '1');
    hours_number.setAttribute('max', '5');
    hours_number.setAttribute('step', '1');
    hours_number.setAttribute('value', '2');
    hours_number.nextElementSibling.textContent = hours_number.value;
    additionalServ.style.display = 'none';
    order['Количество кадров для обработки'] = retouch_number.value;
  } else if (event.target.value === 'Съемка одежды') {
    secondTabH2.textContent = 'Количество луков';
    hours_number.setAttribute('name', 'number_of_looks');
    hours_number.setAttribute('min', '10');
    hours_number.setAttribute('max', '100');
    hours_number.setAttribute('step', '5');
    hours_number.setAttribute('value', '20');
    hours_number.nextElementSibling.textContent = hours_number.value;
    delete order['Количество человек на съемке'];
    delete order['Количество часов'];
    order['Количество луков'] = hours_number.value;
    order['Количество кадров для обработки'] = retouch_number.value;
    idea_check.style.display = "none";
    idea_check.previousElementSibling.style.display = 'none';
    stylist_check.style.display = 'none';
    additionalServ.style.display = '';
  } else {
    secondTabH2.textContent = 'Количество часов';
    hours_number.setAttribute('name', 'hours_number');
    hours_number.setAttribute('min', '1');
    hours_number.setAttribute('max', '5');
    hours_number.setAttribute('step', '1');
    hours_number.setAttribute('value', '2');
    hours_number.nextElementSibling.textContent = hours_number.value;
    additionalServ.style.display = '';
    stylist_check.style.display = '';
    idea_check.style.display = '';
    idea_check.previousElementSibling.style.display = '';
    order['Количество часов'] = hours_number.value;
    delete order['Количество человек на съемке'];
  }

  thirdTab.style.display = 'none';
  thirdTabQuests.forEach(element => {
    element.style.display = 'none';
  }); 

  if (event.target.value === 'Репортаж') {
    thirdTab.style.display = 'block';
    questForReport.forEach(elem => elem.style.display = 'block');
    order['Количество часов'] = hours_number.value;
    order['Количество человек на съемке'] = people_number.value;
  }

  if (event.target.value === 'Съемка одежды') {
    thirdTab.style.display = 'block';
    questForBrands.forEach(elem => (elem.style.display = 'block'));
  }
  if (event.target.value === 'Семейная') {
    thirdTab.style.display = 'block';
    questForFamily.forEach(elem => (elem.style.display = 'block'));
    order['Количество человек на съемке'] = people_number.value;
  }
}

//listen to range inputs
  const rangeInput = document.querySelectorAll(`input[type='range']`);
  rangeInput.forEach(elem => elem.addEventListener('input', changeRangeValue));
  function changeRangeValue(event) {
    event.target.nextElementSibling.textContent = event.target.value;
    order[`${event.target.previousElementSibling.textContent}`] = event.target.value;
  }
//listen to checkbox input 
  const checkboxInput = document.querySelectorAll(`input[type='checkbox']`);
  checkboxInput.forEach(elem => elem.addEventListener('change', changeCheckboxValue));
  function changeCheckboxValue(event) {
    order[`${event.target.value}`] = event.target.checked;
  }
//listen to event radio 
  const eventInput = document.querySelectorAll('input[name="type-event"]');
  eventInput.forEach(elem => elem.addEventListener('change', saveEventType));
function saveEventType(event) {
  order['Вид мероприятия'] = event.target.value;
}

//calculate button
calculate.addEventListener('click', doCalculation);
function doCalculation() { 
  const oneLookCost = 70;
  const oneHourIndividCost = 1500;
  const oneHourIndividAddCost = 1000;
  const oneHourReportCost = 700;
  const oneHourLoveCost = 2000; 
  const StudioHourCost = 500;
  const MakeUpCost = 400;
  const BarberCost = 500; 
  const StylistCost = 1200;
  const OnePhotoRetouch = 50;
  const NumOfPeopleAddCost = 100;
  const ArrOfServices = new Map();
  let studioCost, makeUpCost, barberCost, stylistCost, photoRetouchCost, numOfPeopleCost;


  const hours = order['Количество луков'] || order['Количество часов'];
  const PhotographerCost =
    hours > 5
      ? hours * oneLookCost
      : order['Вид съемки'] === 'Индивидуальная/Контент съемка'
      ? oneHourIndividCost + (hours - 1) * oneHourIndividAddCost
      : order['Вид съемки'] === 'Репортаж'
      ? hours * oneHourReportCost
      : order['Вид съемки'] === 'Love Story' || order['Вид съемки'] === 'Семейная'
      ? oneHourLoveCost + (hours - 1) * oneHourIndividAddCost
      : false;
    ArrOfServices.set('Стоимость фотографа', PhotographerCost);

  if (order['Студия']) {
  studioCost = hours > 5 ? (hours / 10) * StudioHourCost : hours * StudioHourCost;
  ArrOfServices.set('Студия', studioCost);
  }
  
  if (order['Макияж']) {
    makeUpCost = MakeUpCost;
    ArrOfServices.set('Макияж', makeUpCost);
  }

  if (order['2 образа от стилиста']) {
    stylistCost = StylistCost;
    ArrOfServices.set('Стилист', stylistCost);
  }

  if (order['Прическа']) {
    barberCost = BarberCost;
    ArrOfServices.set('Прическа', barberCost);
  }

  if (order['Количество кадров для обработки']) {
    console.log(1231);
    photoRetouchCost =
      order['Количество кадров для обработки'] > 5
        ? order['Количество кадров для обработки'] * OnePhotoRetouch * 0.8
        : order['Количество кадров для обработки'] * OnePhotoRetouch;
    ArrOfServices.set('Количество кадров для обработки', photoRetouchCost);
  }
  

  if (order['Количество человек на съемке'] > 2 && order['Вид съемки'] === 'Семейная') {
    numOfPeopleCost = (order['Количество человек на съемке'] - 2) * NumOfPeopleAddCost;
    ArrOfServices.set('Количество человек на съемке', numOfPeopleCost);
  }
  
  let totalSum = 0;
  ArrOfServices.forEach(val => totalSum += val);
  createModal(ArrOfServices, totalSum);
}

//modal window init 
const modal = document.querySelector('.modal-window'); 

function createModal(map, totalSum) {
const table = modal.querySelector('table');
const tBody = document.createElement('tbody');
map.forEach((val, key) => {
  const tr = document.createElement("tr");
  const thKey = document.createElement('th');
  const tdVal = document.createElement('td');

  tdVal.textContent = val + ' грн.';  
  thKey.textContent = key + ':';

  tr.append(thKey, tdVal);
  tBody.append(tr);
})
  table.append(tBody);
  const th = document.createElement('th');
  th.textContent = 'Итого:';
  const td = document.createElement('td');
  td.textContent = totalSum + ' грн.';
  const tr = document.createElement('tr');
  tr.append(th,td);
  const tfoot = document.createElement('tfoot');
  tfoot.append(tr);
  tBody.after(tfoot);
  modal.style.display = 'block';
  windowAnim.play();
}

//modal window anim 
 const windowAnim = anime({
   targets: modal,
   opacity: [0, 1],
   scaleX: [0.8, 1],
   scaleY: [0.8, 1],
   translateY: ['-150%', '-50%'],
   easing: 'easeOutQuint',
   duration: 500,
   autoplay: false,
   complete() {this.reverse()}
 });

document.querySelector('.modal-window__cross').addEventListener('click', () => {
  windowAnim.play();
  const tBody = modal.querySelector('tbody');
  const tfoot = modal.querySelector('tfoot');
  setTimeout(() => {
    tBody.remove();
    tfoot.remove();
    modal.style.display = '';
  }, 500);
});