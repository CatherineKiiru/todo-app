// selectors to store html elements which we will use in different functionalities
// the document.querySelector()method stores html elements with classes to their respective constants
// const is the same as let. Difference is variables defined with const cannot be reassigned

const todoInput = document.querySelector ('.todo_input');
const todoButton = document.querySelector ('.todo_button');
const todoList = document.querySelector ('.todo_list');
const filterOption = document.querySelector('filter_todo');

//event listeners
//event listeners are methods that attach an event handler to the specified element
// examples of events are a user clicking, pressing a key, etc
//In this example, when the user clicks "+" button, the function addTodo will execute
//when they click "select" element(dropdown), the filterTodo function will execute
todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteCheck)
filterOption.addEventListener("click",filterTodo)

//functions.
//The addTodo function below will execute when the add button on input will be clicked
//This function is responsible for adding a task, adding a check & delete button
//First, call the event.preventDefault() method which cancels the event if it's cancelable
//This method prevents the page from submitting the form, since our button is of submit type
    //todo DIV. With the help of document.createElement() method,a html div element.. 
    //..will contain the task, check and delete the button
function addTodo(event){
    event.preventDefault();  
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    
    //todo LI. 
    //The html <li> element is our actual task which we are getting from todoInput.value..
    //..which takes whatever the user types in the input field and stores it in the <li>element 
    //..this is similar to how we're creating both check & delete buttons
    //appendChild tasks to the list 
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.Value;
    newTodo.classList.add('todo_item');
    todoDiv.appendChild(newTodo);
    if(todoInput.value === ""){ //strictly equals comparision operator
        return null
    }
//check mark BUTTON. See comments above
const completedButton = document.createElement('button');
completedButton.innerHTML = '<i class= "fas fa-check"></i>';
completedButton.classList.add('complete_btn')
todoDiv.appendChild(completedButton);
//Delete BUTTON. See comments above
const deleteButton = document.createElement('button');
deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
deleteButton.classList.add('delete_btn')
todoDiv.appendChild(deleteButton);
//Append to actual LIST
todoList.appendChild(todoDiv);
//Clear todo input VALUE
todoInput.value = ""
}

//Delete & check
//As we have added an event listener to our todoList <div>, whenever we click on check..
//..or delete button, this function will execute. 
//e.target gets the target element and are checking if it's the delete or check button
//If it's delete_btn, we are getting its parent element with .parentElement property..
//..and deleting it with the help of .remove() method after the transition is completed..
//..which is added by adding 'fall' class to the whole <div>
function deleteCheck (e){
    const item = e.target;
    //delete item
    if (item.classList[0] ==="delete_btn"){
        const todo = item.parentElement;
        //animation transition
        todo.classList.add("fall")
        todo.addEventListener('transitionend', function (){
            todo.remove()
        })
    }
    //complete item
    if (item.classList[0] === "complete_btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completedItem")
    }
}
//filtering the tasks according to the options
//When you click one of the options of dropdown then the filterTodo function below..
//.. will execute.This function filters the tasks(all, completed, uncompleted)
//In constant todos, we are storing all the todo tasks, then using loop to iterate over them
// In the loop, we are checking which option is clicked from the dropdown & filtering..
//..the elements by implementing the display style to the todos.
function filterTodo(e) {
    const todos = todoList.childNodes;
    for(let i = 1; i<todos.length; i++){
        switch (e.target.value){
            case "all":
                todos[i].style.display = "flex";
                break;
            case "completed":
                if (todos[i].classlist.contains('completedItem')){
                    todos[i].style.display = "flex";
                } else {
                    todos [i].style.display = "none"
                }
                break;
            case "uncompleted":
                if (!todos[i].classList.contains('completedItem')) {
                    todos[i].style.display = "flex";
                    } else {
                    todos[i].style.display = "none";
                    }
                break;
        }
    }
} 