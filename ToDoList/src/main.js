import './scss/todo.scss';
import './scss/todo-list/todo-list.scss';
import './scss/todo-list/--item/todo-list--item.scss';

import TodoBuilder from './js/todoBuilder.js'; 

const container = document.querySelector('.todo-container');

const build = new TodoBuilder(container);
if(build.hasLocalStorage()){
    build.createTodoFromStorage();
}
else{
   build.createTodo();
}












