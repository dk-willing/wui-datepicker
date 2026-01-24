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

function setupEventListeners() {
  inputEl.addEventListener("click", () => {
    console.log("Clicked");
    if (isOpen) {
      closePicker();
    } else {
      openPicker();
    }
  });

  document
    .querySelector(".date-picker__nav-btn-prev-year")
    .addEventListener("click", () => {
      currentYear--;
      renderCalender();
    });

  document
    .querySelector(".date-picker__nav-btn-prev-month")
    .addEventListener("click", () => {
      currentMonth--;

      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalender();
    });

  document
    .querySelector(".date-picker__nav-btn-next-month")
    .addEventListener("click", () => {
      currentMonth++;

      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }

      renderCalender();
    });

  document
    .querySelector(".date-picker__nav-btn-next-year")
    .addEventListener("click", () => {
      currentYear++;
      renderCalender();
    });

  daysContainer.addEventListener("click", (e) => {
    const dayEl = e.target.closest(".date-picker__day");
    if (!dayEl) return;

    const day = parseInt(dayEl.textContent);
    selecteDate(currentYear, currentMonth, day);
  });

  document
    .querySelector(".date-picker__today-btn")
    .addEventListener("click", () => {
      const today = new Date();
      currentMonth = today.getMonth();
      currentYear = today.getFullYear();

      selecteDate(today.getFullYear(), today.getMonth(), today.getDate());

      renderCalender();
    });

  document
    .querySelector(".date-picker__clear-btn")
    .addEventListener("click", () => {
      selectedDate = null;
      inputEl.value = " ";
      renderCalender();
    });

  document.addEventListener("click", (e) => {
    if (!pickerEl.contains(e.target) && !inputEl.contains(e.target)) {
      closePicker();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePicker();
    }
  });
}

function openPicker() {
  console.log(selectedDate);
  pickerEl.style.display = "block";
  isOpen = true;
}
function closePicker() {
  pickerEl.style.display = "none";
  isOpen = false;
}
function selecteDate(year, month, day) {
  selectedDate = new Date(year, month, day);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  inputEl.value = `${day} ${months[month]}, ${year}`;
  renderCalender();
  closePicker();
}

function renderCalender() {
  const monthsFull = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  titleEl.textContent = `${monthsFull[currentMonth]} ${currentYear}`;

  daysContainer.innerHTML = "";

  // Calculating to populate the calender with day values like 1, 2, 3, 4, 5, to the last day
  const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // this would give us the first day

  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate(); // If we looking for the today days in January the months argument would be February which is the "+1" and the day argument which is 0 would get the last day  of the previous month

  // Similary if we are in a particular month we can pass 0 to get the previous months dates
  const previousMonthDays = new Date(currentYear, currentMonth, 0).getDate();

  // To get today
  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  // Previous Month days
  for (let i = firstDay - 1; i >= 0; i--) {
    const dayEl = document.createElement("div");
    dayEl.className = "date-picker__day date-picker__day-other-month";
    dayEl.textContent = previousMonthDays - i;
    daysContainer.appendChild(dayEl);
  }

  // Current Month Days
  for (let day = 1; day <= totalDays; day++) {
    const dayEl = document.createElement("div");
    dayEl.className = "date-picker__day";

    if (
      day === todayDate &&
      currentMonth === todayMonth &&
      currentYear === todayYear
    ) {
      dayEl.classList.add("date-picker__day-today");
    }

    if (
      selectedDate &&
      day === selectedDate.getDate() &&
      currentMonth === selectedDate.getMonth() &&
      currentYear === selectedDate.getFullYear()
    ) {
      dayEl.classList.add("date-picker__day-selected");
    }

    dayEl.textContent = day;

    daysContainer.appendChild(dayEl);
  }

  // For the next month
  const totalCells = 42;
  const currentCells = firstDay + totalDays;
  const nextDays = totalCells - currentCells;

  for (let i = 1; i <= nextDays; i++) {
    const dayEl = document.createElement("div");
    dayEl.className = "date-picker__day date-picker__day-other-month";

    dayEl.textContent = i;

    daysContainer.appendChild(dayEl);
  }
}
