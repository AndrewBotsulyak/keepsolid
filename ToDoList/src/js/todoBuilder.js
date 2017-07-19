import TodoList from './todoList.js';

/**
 * class create all TodoLists
 * @param {HTMLElement} container - DOMElement container of TodoLists.
 *
 * @property {HTMLElement} containerElem - DOMElement container of TodoLists.
 * @property {Array} todosArr - array with all TodoLists.
 * @property {HTMLElement} btnAddTodo - btn which is added new TodoList.
 */
export default class TodoBuilder{

	constructor(container){

		this.containerElem = container;
		this.todosArr = [];
		this.btnAddTodo = document.querySelector('.build-todo');

		this.btnAddTodo.addEventListener('click', (event) => this.onBuild(event));
	}

	onBuild(event){
		this.createTodo();
	}

	/**
	 * @return {TodoList} just created.
	 */
	createTodo(){
		const todo = new TodoList();			
		let todoElem = todo.createElement();   
		todoElem = this.renderTodo(todoElem);
		todo.init(todoElem);					// initialize 
		this.todosArr.push(todo);
		return todo;
	}

	/**
	 * @param  {HTMLElement} todoElem - TodoLIst.
	 * @return {HTMLElement} elem in DOM.
	 */
	renderTodo(todoElem){
		return this.containerElem.appendChild(todoElem);
	}

	/**
	 * @param  {Number} count - quantity of new TodoLists.
	 * @return {Array} array of elements which has just been added in DOM.
	 */
	createTodos(count){
		let arr = [];
		for(let i = 0; i < count; i++){
			arr.push(this.createTodo());
		}
		return arr;
	}

}