let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear(); // This sets the current month and current year

let selectedDate = null; // This is because by default we haven't selected any date
let isOpen = false; // By default the datepicker/calender is not opened

let inputEl, pickerEl, daysContainer, titleEl;

document.addEventListener("DOMContentLoaded", () => {
  inputEl = document.querySelector(".date-input");
  pickerEl = document.querySelector(".date-picker");
  daysContainer = document.querySelector(".date-picker__days");
  titleEl = document.querySelector(".date-picker__title");

  //   Inorder to setup event listeners on the DOM  elements we must call the function that setups the event listeners
  setupEventListeners();

  //   To render the calender once the DOM is loaded we must call the render calender function
  renderCalender();
});

function setupEventListeners() {}

function openPicker() {}
function closePicker() {}
function selecteDate() {}
function renderCalender() {}
