import './main.scss';

import './scss/todo.scss';
import './scss/todo-list/todo-list.scss';
import './scss/todo-list/--item/todo-list--item.scss';

import './scss/toolbar.scss';

import './scss/buttons.scss';

import TodoBuilder from './js/todoBuilder.js'; 

const container = document.querySelector('.content-canvas');

const build = new TodoBuilder(container);
start();



async function start(){
    if(build.hasLocalStorage()){
        await build.createTodoFromStorage();
    }
    else{
        await build.createTodo();
    }
    let pl = document.querySelector('.todo-placeholder');
    console.log(pl);
} 












