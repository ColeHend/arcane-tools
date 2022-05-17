// ---------chararacter creation display-----------
const nameEntry = document.getElementById("nameEntry");
const statsEntry = document.getElementById("statsEntry");
const raceEntry = document.getElementById("raceEntry");
const classEntry = document.getElementById("classEntry");
const backgroundEntry = document.getElementById("backgroundEntry");
const creationArr = [
  nameEntry,
  statsEntry,
  raceEntry,
  classEntry,
  backgroundEntry,
];
var creationSpot = 0;
// -------character creation nav-----------
const lastViewDisplay = document.getElementsByClassName("previousViewDisplay");
const nextViewDisplay = document.getElementsByClassName("nextViewDisplay");
for (const element of lastViewDisplay) {
  element.addEventListener("click", previousStep);
}
for (const element of nextViewDisplay) {
  element.addEventListener("click", nextStep);
}
function previousStep(e) {
  creationSpot -= 1;
}
function nextStep(e) {
  creationSpot += 1;
}
