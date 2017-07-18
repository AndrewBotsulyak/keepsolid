import TodoList from './todoList.js';

/**
 * class create all TodoLists
 * @param {HTMLElement} container - DOMElement container of TodoLists.
 *
 * @property {HTMLElement} containerElem - DOMElement container of TodoLists.
 * @property {Array} todosArr - array with all TodoLists.
 * @property {HTMLElement} btnBuild - btn which is added new TodoList.
 * @property {CustomEvent} addEvent - 'addtodolist' event;
 */
export default class TodoBuilder{

	constructor(container){

		this.containerElem = container;
		this.todosArr = [];
		this.btnBuild = document.querySelector('.build-todo');

		this.addEvent = new CustomEvent('addtodolist', { bubbles : true });

		this.btnBuild.addEventListener('click', (event) => this.onBuild(event));
	}

	onBuild(event){
		this.createTodo();
		this.containerElem.dispatchEvent(this.addEvent);
	}

	/**
	 * @return {TodoList} just created.
	 */
	createTodo(){
		const todo = new TodoList();
		let todoElem = todo.createElement();
		todoElem = this.renderTodo(todoElem);
		todo.init(todoElem);
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
	 * @return {Array} array of elements which just have been added in DOM.
	 */
	createTodos(count){
		let arr = [];
		for(let i = 0; i < count; i++){
			arr.push(this.createTodo());
		}
		return arr;
	}

}