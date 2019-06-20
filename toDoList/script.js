function drawToDoItems(itemsArray) {
    deleteAllItems(toDoItems);
    for(let i = 0; i < itemsArray.length; i++){
        const itemDate = document.createElement('div');
        itemDate.innerText = itemsArray[i].date + "\n" + itemsArray[i].time;
        itemDate.className = "toDoList__date";

        const itemImportanceCounter = document.createElement('div');
        itemImportanceCounter.innerText = itemsArray[i].importance;
        itemImportanceCounter.className = "toDoList__importanceCounter";

        const itemImportanceTrigger = document.createElement('div');
        itemImportanceTrigger.className = "toDoList_importanceTrigger";

        const itemArrowUp = document.createElement('div');
        itemArrowUp.className = "toDoList__arrowBottom toDoList__arrowUp";
        itemImportanceTrigger.appendChild(itemArrowUp);

        const itemArrowDown = document.createElement('div');
        itemArrowDown.className = "toDoList__arrowBottom";
        itemImportanceTrigger.appendChild(itemArrowDown);

        const itemDescription = document.createElement('div');
        itemDescription.className = "toDoList__description";
        itemDescription.innerText = itemsArray[i].title;

        const itemEditButton = document.createElement('div');
        itemEditButton.className = "toDoList__controlButton toDoList__controlButton--pencil";
        const itemDoneButton = document.createElement('div');
        itemDoneButton.className = "toDoList__controlButton toDoList__checkbox";
        const itemDeleteButton = document.createElement('div');
        itemDeleteButton.className = "toDoList__controlButton toDoList__controlButton--rubbish";

        const listItem = document.createElement('li');
        listItem.className = "toDoList__item";

        listItem.appendChild(itemDate);
        listItem.appendChild(itemImportanceCounter);
        listItem.appendChild(itemImportanceTrigger);
        listItem.appendChild(itemDescription);
        listItem.appendChild(itemEditButton);
        listItem.appendChild(itemDoneButton);
        listItem.appendChild(itemDeleteButton);
        toDoList.appendChild(listItem);
        bindEvents(listItem);
    }
}
function addToDoItem(event) {
    event.preventDefault();//dont sent data on server

    if(addInput.value === ''){
        return alert("Input is empty")
    }
    let idCounter;
    if(itemsArray.length > 0){
        idCounter = itemsArray[itemsArray.length - 1].id + 1;
    }else {
        idCounter = 0;
    }
    const toDoObj = {
        id: idCounter,
        title: addInput.value,
        date: getDateNow(),
        time: getTimeNow(),
        importance: 1
    };
    itemsArray.push(toDoObj);
    drawToDoItems(itemsArray);
    addInput.value = '';
}
function getDateNow() {
    const date = new Date();
    return  date.getDay() + '.' + date.getMonth() + '.' + date.getFullYear();
}
function getTimeNow() {
    const date = new Date();
    return  date.getHours() + ":" + date.getMinutes();
}
function bindEvents(toDoItem){
    const checkButton = toDoItem.querySelector('.toDoList__checkbox');
    const editButton = toDoItem.querySelector('.toDoList__controlButton--pencil');
    const deleteButton = toDoItem.querySelector('.toDoList__controlButton--rubbish');

    checkButton.addEventListener('click', checkToDoItem);
    editButton.addEventListener('click', editToDoItem);
    deleteButton.addEventListener('click', deleteToDoItem);
}
function checkToDoItem() {
    this.classList.toggle('toDoList__checkbox--inactive');
}
function editToDoItem() {
    const listItem = this.parentNode;
    const editMenu = document.querySelector('.deleteMenu__wrapper');
    const editInput = document.querySelector('.editMenu__input');
    const saveButton = document.querySelector('.deleteMenu__button--yes');
    const cancelButton = document.querySelector('.deleteMenu__button--no');

    editMenu.style.display = 'block';
    cancelButton.addEventListener('click',);//here
}
function deleteAllItems() {
    let toDoItems = document.querySelectorAll('.toDoList__item');
    for(let i = 0; i < toDoItems.length; i++){
        let deleteItem = toDoItems[i];
        toDoList.removeChild(deleteItem);
    }
}
function deleteToDoItem() {
    const listItem = this.parentNode;
    let itemDescription = this.parentNode.querySelector(".toDoList__description").innerText;
    for(let i = 0; i < itemsArray.length; i++){
        if(itemDescription === itemsArray[i].title){
            itemsArray.splice(i, 1);
        }
    }
    toDoList.removeChild(listItem);
    console.log(itemsArray);
}
const toDoForm = document.getElementById('toDoForm');
const addInput = document.getElementById('addInput');
const toDoList = document.getElementById('toDoList');
const toDoItems = document.querySelectorAll('.toDoList__item');
var itemsArray = [
/*{
    id: 0,
    title: "Task for example",
    date: "12.10.2018",
    time: "13:24",
    importance: 5
    }
*/
];
toDoForm.addEventListener('submit', addToDoItem);