function drawToDoItems(itemsArray) {
    deleteAllItems(toDoItems);
    for(let i = 0; i < itemsArray.length; i++){
        const itemNumber = document.createElement('div');
        itemNumber.innerText = itemsArray[i].id;
        itemNumber.className = "toDoList__number";
        const itemDate = document.createElement('div');
        itemDate.innerText = itemsArray[i].date + "\n" + itemsArray[i].time;
        itemDate.className = "toDoList__date";

        const itemImportanceCounter = document.createElement('div');
        itemImportanceCounter.innerText = itemsArray[i].importance;
        itemImportanceCounter.className = "toDoList__importanceCounter";

        const itemImportanceTrigger = document.createElement('div');
        itemImportanceTrigger.className = "toDoList__importanceTrigger";

        const itemArrowUp = document.createElement('div');
        itemArrowUp.className = "toDoList__arrowBottom toDoList__arrowUp";
        itemArrowUp.id = "arrowUp";
        itemImportanceTrigger.appendChild(itemArrowUp);

        const itemArrowDown = document.createElement('div');
        itemArrowDown.className = "toDoList__arrowBottom toDoList__arrowDown";
        itemArrowDown.id = "arrowDown";
        itemImportanceTrigger.appendChild(itemArrowDown);

        const itemDescription = document.createElement('div');
        if(itemsArray[i].isDone === true){
            itemDescription.className = "toDoList__description toDoList__description--done";
        }else{
            itemDescription.className = "toDoList__description";
        }
        itemDescription.innerText = itemsArray[i].title;

        const itemEditButton = document.createElement('div');
        itemEditButton.className = "toDoList__controlButton toDoList__controlButton--pencil";
        const itemDoneButton = document.createElement('div');
        if(itemsArray[i].isDone === true){
            itemDoneButton.className = "toDoList__controlButton toDoList__checkbox toDoList__checkbox--inactive";
        } else{
            itemDoneButton.className = "toDoList__controlButton toDoList__checkbox";
        }
        const itemDeleteButton = document.createElement('div');
        itemDeleteButton.className = "toDoList__controlButton toDoList__controlButton--rubbish";

        const listItem = document.createElement('li');
        listItem.className = "toDoList__item";

        listItem.appendChild(itemNumber);
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
    var idCounter;
    if(addInput.value === ''){
        return alert("Input is empty")
    }
    if(localStorage.length > 0 && localStorage.getItem(localStorage.length + '') === null){
        idCounter = localStorage.length;
    }else {
        idCounter = 0;
    }
    const toDoObj = {
        id: idCounter,
        title: addInput.value,
        date: getDateNow(),
        time: getTimeNow(),
        importance: 1,
        isDone: false
    };
    localStorage.setItem(idCounter+'', JSON.stringify(toDoObj));
    parseToDoItems();
    drawToDoItems(itemsArray);
    addInput.value = '';
}
function  parseToDoItems(){
    itemsArray = [];
    for(let i = 0; i < localStorage.length; i++){
        if(localStorage.getItem(i+'')) {
            let itemObject;
            itemObject = JSON.parse(localStorage.getItem(i + ''));
            itemsArray.push(itemObject);
        }
    }
    //console.log(itemsArray);
}
function getDateNow() {
    const date = new Date();
    let day = date.getDay();
    let month = date.getMonth();
    if(day < 10){
        day = '0' + day;
    }
    if(month < 10){
        month = '0' + month;
    }
    return  day + '.' + month + '.' + date.getFullYear();
}
function getTimeNow() {
    const date = new Date();
    let minutes = date.getMinutes();
    let hours = date.getHours();
    if(minutes < 10){
        minutes = '0' + minutes;
    }
    if(hours < 10){
        hours = '0' + hours;
    }
    return  hours + ":" + minutes;
}
function bindEvents(toDoItem){
    const checkButton = toDoItem.querySelector('.toDoList__checkbox');
    const editButton = toDoItem.querySelector('.toDoList__controlButton--pencil');
    const deleteButton = toDoItem.querySelector('.toDoList__controlButton--rubbish');
    const triggerUp = toDoItem.querySelector('.toDoList__arrowUp');
    const triggerDown = toDoItem.querySelector('.toDoList__arrowDown');
    const sortButton = document.querySelector('.toDoList__sortArrow');
    const dateFilterButton = document.querySelector('.toDoList__arrow');
    const searchButton = document.querySelector('.toDoList__filter');

    triggerUp.addEventListener('click', changeImportance);
    triggerDown.addEventListener('click', changeImportance);
    checkButton.addEventListener('click', checkToDoItem);
    editButton.addEventListener('click', openEditMenu);
    deleteButton.addEventListener('click', openDeleteMenu);
    sortButton.addEventListener('click', sortArray);
    dateFilterButton.addEventListener('click', filterDate);
    searchButton.addEventListener('click', searchItem)
}
function searchItem() {
    const searchInput = document.querySelector('.toDoList__search');
    var resultObject = [];
    for(let i = 0; i < itemsArray.length; i++){
        if(itemsArray[i].title.indexOf(searchInput.value) !== -1){
            resultObject.push(itemsArray[i]);
        }
    }
    searchInput.value = '';
    drawToDoItems(resultObject);
}
function filterDate() {
        if(isDateFilterUsed === false){
            function compare( a, b) {
                if (a.id < b.id) {
                    return 1;
                }
                if (a.id > b.id) {
                    return -1;
                } else {
                    return 0;
                }
            }
            itemsArray.sort( compare );
            isDateFilterUsed = true;
            drawToDoItems(itemsArray);
        }else{
            parseToDoItems();
            isDateFilterUsed = false;
            drawToDoItems(itemsArray);
        }

}
 function sortArray() {
     if(isSortArrayUsed === false){
         function compare( a, b) {
             if (a.importance < b.importance) {
                 return -1;
             }
             if (a.importance > b.importance) {
                 return 1;
             } else {
                 return 0;
             }
         }
         itemsArray.sort( compare );
         isSortArrayUsed = true;
         drawToDoItems(itemsArray);
     } else {
         function compare( a, b) {
             if (a.importance < b.importance) {
                 return 1;
             }
             if (a.importance > b.importance) {
                 return -1;
             } else {
                 return 0;
             }
         }
         itemsArray.sort( compare );
         isSortArrayUsed = false;
         drawToDoItems(itemsArray);
     }
}
function changeImportance() {
    let itemId = this.parentNode.parentNode.querySelector('.toDoList__number').innerText;
    for(let i = 0; i < itemsArray.length; i++) {
            if (itemId == itemsArray[i].id) {
                const itemArrow = this.parentNode.parentNode.querySelector('.toDoList__arrowUp');
                //console.log(this);
                if(this == itemArrow){
                    itemsArray[i].importance++;
                }else{
                    itemsArray[i].importance--;
                    if(itemsArray[i].importance < 1){
                        itemsArray[i].importance = 1;
                    }
                }
                localStorage.setItem(i + '', JSON.stringify(itemsArray[i]));
            }
        }
    drawToDoItems(itemsArray);
}
function checkToDoItem() {
    this.classList.toggle('toDoList__checkbox--inactive');
    const itemTitle = this.parentNode.querySelector('.toDoList__description');
    itemTitle.classList.toggle('toDoList__description--done');
    let itemId = this.parentNode.querySelector('.toDoList__number').innerText;
    for(let i = 0; i < itemsArray.length; i++) {
        if (itemId == itemsArray[i].id) {
            if(itemsArray[i].isDone === true){
                itemsArray[i].isDone = false;
            }else {
                itemsArray[i].isDone = true;
            }
            localStorage.setItem(i + '', JSON.stringify(itemsArray[i]));
        }
    }
}
function openEditMenu() {
    const editMenu = document.querySelector('.editMenu__wrapper');
    const deleteMenu = document.querySelector('.deleteMenu__wrapper');
    const saveButton = document.getElementById("editButton__yes");
    const cancelButton = document.getElementById("editButton__no");
    const editInput = document.querySelector('.editMenu__input');
    tempContext = this.parentNode;
    editInput.value = '';
    editMenu.style.display = 'block';
    deleteMenu.style.display = 'block';
    cancelButton.addEventListener('click', function(){
        editMenu.style.display = 'none';
        deleteMenu.style.display = 'none';
    });
    saveButton.addEventListener('click', editToDoItem);
    // bind for saving "this" for another function
}
function editToDoItem(){
    const editMenu = document.querySelector('.editMenu__wrapper');
    const deleteMenu = document.querySelector('.deleteMenu__wrapper');
    const editInput = document.querySelector('.editMenu__input');
    let itemId = tempContext.querySelector('.toDoList__number').innerText;
    if(editInput.value === ''){
        return alert("Input is empty")
    }
    //console.log(itemId);
    for(let i = 0; i < itemsArray.length; i++) {
        if (itemId == itemsArray[i].id) {
            itemsArray[i].title = editInput.value;
            localStorage.setItem(i + '', JSON.stringify(itemsArray[i]));
        }
    }
    editMenu.style.display = 'none';
    deleteMenu.style.display = 'none';
    drawToDoItems(itemsArray);
}
function deleteAllItems() {
    let toDoItems = document.querySelectorAll('.toDoList__item');
    for(let i = 0; i < toDoItems.length; i++){
        let deleteItem = toDoItems[i];
        toDoList.removeChild(deleteItem);
    }
}
function openDeleteMenu() {
    const deleteMenu = document.querySelector('.deleteMenu__wrapper1');
    const deleteWrapper = document.querySelector('.deleteMenu__wrapper');
    const saveButton = document.getElementById("deleteMenuButton--yes");
    const cancelButton = document.getElementById("deleteMenuButton--no");
    tempContext = this.parentNode;
    deleteWrapper.style.display = 'block';
    deleteMenu.style.display = 'block';
    cancelButton.addEventListener('click', function(){
        deleteWrapper.style.display = 'none';
        deleteMenu.style.display = 'none';
    });
    saveButton.addEventListener('click', deleteToDoItem);
}
function deleteToDoItem() {
    const deleteWrapper = document.querySelector('.deleteMenu__wrapper');
    let itemId = tempContext.querySelector('.toDoList__number').innerText;
    itemId = parseInt(itemId);
    for(let i = 0; i < itemsArray.length; i++){
        if(itemId === itemsArray[i].id){
            for(b = itemId; b < localStorage.length; b++){
                if(localStorage.getItem(b + 1) != null){
                    let tempObject = JSON.parse(localStorage.getItem(b + 1));
                    tempObject.id = tempObject.id - 1;
                    JSON.stringify(tempObject);
                    localStorage.setItem(b, JSON.stringify(tempObject));
                }
            }
        }
    }
    localStorage.removeItem((localStorage.length - 1));
    deleteWrapper.style.display = 'none';
    parseToDoItems();
    drawToDoItems(itemsArray);
}
const toDoForm = document.getElementById('toDoForm');
const addInput = document.getElementById('addInput');
const toDoList = document.getElementById('toDoList');
const toDoItems = document.querySelectorAll('.toDoList__item');
var isDateFilterUsed = false;
var isSortArrayUsed = false;
var tempContext; // bind is working with mistake
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
parseToDoItems();
drawToDoItems(itemsArray);
toDoForm.addEventListener('submit', addToDoItem);