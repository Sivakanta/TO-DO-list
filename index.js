const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");
let list = JSON.parse(localStorage.getItem("list"));

if (list) {
    list.forEach(task => {
    toDoList(task);
});
}

formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      toDoList();
});


function toDoList(task) {
   let newtask = inputEl.value;
   
   if(task){
    newtask = task.name;
   }
   const liEl = document.createElement("li");

   if(task && task.checked){
    liEl.classList.add("checked");
   }

    liEl.innerText = newtask ;
    ulEl.appendChild(liEl);
    inputEl.value = "" ;

    const checkBtn = document.createElement("div");
    checkBtn.innerHTML = `<i class="fa-solid fa-square-check">` ;
    liEl.appendChild(checkBtn);

    const delBtn = document.createElement("div");
    delBtn.innerHTML =`<i class="fa-solid fa-trash-can"></i>` ;
    liEl.appendChild(delBtn);
    
    checkBtn.addEventListener("click" , () => {
        liEl.classList.toggle("checked");
        updateLocalStorage();
    });

    delBtn.addEventListener("click" , () => {
        liEl.remove();
        updateLocalStorage();
    });

    updateLocalStorage();
}

function updateLocalStorage(){
    const liEls = document.querySelectorAll("li");
    list = [];
    liEls.forEach(liEl => {
        list.push({
            name: liEl.innerText,
            checked: liEl.classList.contains("checked"),
        });
    });
   localStorage.setItem("list" , JSON.stringify(list));
}