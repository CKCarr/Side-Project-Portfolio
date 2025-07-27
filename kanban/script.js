const cards = document.querySelectorAll('.card');
const lists = document.querySelectorAll('.list');

for (const card of cards) {
    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", dragEnd);
}

for (const list of lists) {
    list.addEventListener("dragover", dragOver);
    list.addEventListener("dragenter", dragEnter);
    list.addEventListener("dragleave", dragLeave);
    list.addEventListener("drop", dragDrop);
}

function dragStart(e) {
    // allows the drop location to know which element is being moved when you release it
    e.dataTransfer.setData("text/plain", this.id);
}
function dragEnd() {
    console.log("Drag Ended");
}
function dragOver(e) {
    // this line overrides the browser default and allows you to drop elements into other elements
    e.preventDefault();
}
function dragEnter(e) {
    e.preventDefault();
    this.classList.add("over");
}
function dragLeave(e) {
    this.classList.remove("over");
}
function dragDrop(e) {
    const data = e.dataTransfer.getData("text/plain");
    const card = document.getElementById(data);
    this.appendChild(card);
    this.classList.remove("over");
}

// task addition functionality
let taskCounter = 5; // starts w/ card4

const addTaskBtn = document.getElementById("addTaskBtn");
const newTaskInput = document.getElementById("newTaskInput");
const toDoList = document.getElementById('list1'); // add the tasks to the TODO column
addTaskBtn.addEventListener("click", () => {
    const taskText = newTaskInput.value.trim();
    if (taskText === "") return; // do not add empty tasks

    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.setAttribute("draggable", true);
    newCard.id = `card${taskCounter++}`;
    newCard.textContent = taskText;

    // reattach drag events
    newCard.addEventListener("dragstart", dragStart);
    newCard.addEventListener("dragend", dragEnd);

    // append the new card to the TODO list
    toDoList.appendChild(newCard);
    newTaskInput.value = ""; // clear the input field
});
