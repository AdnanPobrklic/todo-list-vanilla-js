const store = document.querySelector(':root');
const bgOne = document.querySelector("#bg-one")
const bgTwo = document.querySelector("#bg-two")
const bgThree = document.querySelector("#bg-three")
const timeDate = document.getElementById("time-date");
const todoInput = document.getElementById("todo-input");
const todoBtn = document.getElementById("todo-btn");
const todosList = document.getElementById("todos-list");
const warning = document.getElementById("warning");
let todos = JSON.parse(localStorage.getItem("todos") || "[]");

bgOne.addEventListener('click', () => setBackground('rgb(238,225,233)', 'linear-gradient(175deg, rgba(24,17,136,1) 0%, rgba(53,53,116,1) 19%, rgba(39,102,117,1) 69%, rgba(44,76,83,1) 100%)'))

bgTwo.addEventListener('click', () => setBackground('rgb(88,86,87)', 'linear-gradient(70deg, rgba(88,86,87,1) 0%, rgba(173,173,173,1) 34%, rgba(159,170,167,1) 59%, rgba(82,82,85,1) 100%)'))

bgThree.addEventListener('click', () => setBackground('rgb(238,225,233)', 'linear-gradient(70deg, rgba(238,225,233,1) 0%, rgba(249,255,206,1) 34%, rgba(174,237,252,1) 59%, rgba(203,204,224,1) 100%)'))

setInterval(updateDateTime, 1000);

todos.forEach(element => {
    createTodoElement(todosList, element)
});

todoBtn.addEventListener('click', event => {
    event.preventDefault()
    handleUserAction()
})

todoInput.addEventListener('keyup', event => {
    if (event.keyCode === 13) {
        handleUserAction()
    }
})

function handleUserAction() {
    if (todoInput.value.length > 20) {
        addOrRemoveAnimation(todoInput, todoBtn, 'horizontal-shaking 500ms linear 0s 5')
        changeOpacity(warning, '1')
        setTimeout(changeOpacity, 2000, warning, '0')
        setTimeout(addOrRemoveAnimation, 2000, todoInput, todoBtn, 'none')
    } else if (todoInput.value !== '') {
        const todoValue = todoInput.value;
        todoInput.value = '';

        const randomNum = Math.floor(Math.random() * 1000000);
        const todoObject = {
            id: randomNum,
            text: todoValue,
        };
        todos.push(todoObject);
        localStorage.setItem("todos", JSON.stringify(todos));

        createTodoElement(todosList, todoObject);
    }
}

function createTodoElement(ul, todoValue) {
    let li = document.createElement("li");
    li.id = todoValue.id

    let p = document.createElement("p");
    p.classList.add("li-text-content");
    p.innerText = todoValue.text;

    let div = document.createElement("div");
    div.classList.add("icons");

    let checkIcon = document.createElement("i");
    checkIcon.classList.add("fa-solid", "fa-check", "check-mark");

    let trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-solid", "fa-trash", "trash");

    div.append(checkIcon);
    div.append(trashIcon);

    li.append(p, div);

    ul.append(li);

    checkIcon.addEventListener("click", markLi);
    trashIcon.addEventListener("click", deleteLi);
}

function updateDateTime() {
    const dateObject = new Date();
    const date = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    
    const currentDateAndTime = `${date < 10 ? '0' + date : date}/${month < 10 ? '0' + month : month}/${year} @ ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    timeDate.textContent = currentDateAndTime;
}

function addOrRemoveAnimation(element1, element2, value) {
    element1.style.animation = value;
    element2.style.animation = value;
}

function changeOpacity(element, value) {
    element.style.opacity = value;
}

function markLi(e) {
    let pTagInsideLi = e.target.parentElement.previousElementSibling;
    pTagInsideLi.classList.toggle("checked");
    e.target.classList.toggle("check-mark-active");
}

function deleteLi(e) {
    let liParentTag = e.target.parentElement.parentElement;
    liParentTag.remove();
    localStorage.removeItem(`${liParentTag.id}`);
    
    const todoIdToDelete = parseInt(liParentTag.id); 

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === todoIdToDelete) { 
            todos.splice(i, 1); 
            break; 
        }
    }

    localStorage.setItem("todos", JSON.stringify(todos)); 
}

function setBackground(rgb, linearGradient){
    var value = getComputedStyle(store);
    store.style.setProperty('--background-rgb', rgb);
    store.style.setProperty('--background-linear-gradient', linearGradient);
}

