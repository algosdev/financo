const budget = document.getElementById("budget");
const time = document.getElementById("time");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const z = document.getElementById("p-or-m");
const ds = document.getElementById("description");
const amount = document.getElementById("amount");
const ready = document.getElementById("form");
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");

let first = (localStorage.getItem("first") === null) ? true : localStorage.getItem("first");
if (first == true) {
  setTimeout(() => {
    if (first) {
      window.onload = whenOnload();
      localStorage.setItem('first', 'false');
    }
  }, 5300);
}
else {
  whenOnload();
}
function whenOnload() {
  console.log("Loaded");
  document.querySelector(".preload-cont").style.display = "none";
  document.querySelector("body").style.overflow = "visible";
}

let datam = [];
let datap = [];
let m = new Date();
let s = [
  "January",
  "February",
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
time.innerHTML = m.getFullYear() + " " + s[m.getMonth()];
ready.addEventListener("submit", getData);
function updateTop() {
  let m = document.querySelectorAll("#gotValueM");
  let p = document.querySelectorAll("#gotValueP");
  datap = Array.from(p).map((e) => parseFloat(e.innerText));
  datam = Array.from(m).map((e) => parseFloat(e.innerText));
  let sumP = parseFloat(datap.reduce((a, b) => a + b, 0).toFixed(2));
  let sumM = -parseFloat(datam.reduce((a, b) => a + b, 0).toFixed(2));
  income.innerHTML = "+ " + sumP.toFixed(2);
  expense.innerHTML = "-  " + sumM.toFixed(2);
  let total = (sumP - sumM).toFixed(2);
  budget.innerHTML = total;
}
function removeIt(e) {
  let p = e.parentElement;
  p.remove();
  updateTop();
}
function showIncome(a, b) {
  let list = `<li><span id="info">${a}</span><span class="gotValue" id="gotValueP">+${b}</span><button class="close" onclick="removeIt(this)">&times;</button></li>`;
  plus.innerHTML += list;
  updateTop();
}
function showExpense(a, b) {
  let list = `<li><span id="info">${a}</span><span class="gotValue" id="gotValueM">-${b}</span><button class="close" onclick="removeIt(this)">&times;</button></li>`;
  minus.innerHTML += list;
  updateTop();
}
function restartAll() {
  ds.value = "";
  amount.value = "";
  z.selectedIndex = 0;
}
function getData(e) {
  e.preventDefault();
  let value = parseFloat(amount.value).toFixed(2);
  if (ds.value == "" || amount.value == "") {
    alert("Please, input both Description and Value!");
  } else {
    if (z.value == 1) {
      showIncome(ds.value, value);
      restartAll();
    } else {
      showExpense(ds.value, value);
      restartAll();
    }
  }
}
