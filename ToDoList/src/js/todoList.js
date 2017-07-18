import TodoListItem from './todoListItem.js';

/**
 * Class represents TodoList.
 * @param {HTMLElement} todo - DOMElement wrap of ToDo.
 *
 * @property {HTMLElement} todoElem - DOM Element container of ToDo App.
 * @property {HTMLElement} input - text field for creating new todo.
 * @property {HTMLElement} add - adding todo in list (<ul>).
 * @property {HTMLElement} ul - container of TodoListItems (<li>).
 * @property {Array} arrItems - array with TodoListItems. 
 */
export default class TodoList{

	init(todo){

		this.todoElem = todo;
		this.input = this.todoElem.querySelector('.main-input');
		this.add = this.todoElem.querySelector('.add-item');
		this.ul = this.todoElem.querySelector('.todo-list');
		this.clearList = this.todoElem.querySelector('.clearAll');
		this.arrItems = [];

		//	subscribe on TodoListItem's 'closeItem' event
		this.ul.addEventListener('closeItem', (event) => this.onDeleteItem(event));  

		this.todoElem.addEventListener('submit', (event) => this.onAddItem(event));
		
		this.clearList.addEventListener('click', (event) => this.clearAll(event));

	}

	onAddItem(event) {
		event.preventDefault();
		if(!this.isInputEmpty()){
			const objItem =  new TodoListItem();
			
			const newElem = objItem.createElement();

			objItem.init(this.ul.appendChild(newElem));

			objItem.setValue(this.input.textContent);
			
			this.arrItems.push(objItem);
		}
	}

	isInputEmpty() {
		return (this.input.textContent) ? false : true;
	}

	/**
	 * @param {Object} obj - obj with styles  
	 */
	setStyle(obj){
		for(let prop in obj){
			this.todoElem.style[prop] = obj[prop];
		}
	}

	onDeleteItem(event) {

		const elem = event.target;

		this.ul.removeChild(elem);

		this.arrItems = this.arrItems.filter(el => el.getItem() !== elem);
	}

	// clear list of items
	clearAll(event){
		this.ul.innerHTML = '';
		this.arrItems = [];
	}

	createElement(){
		const div = document.createElement('div');
		div.classList.add('todo');
		div.innerHTML = `
			<form action="" class="todo-form">
				<div class='main-input' contenteditable="true" ></div>
				<input type="submit" class="add-item btn" value="Add" />
				<div class="clearAll btn">Clear</div>
			</form>
			<ul class="todo-list">

			</ul>
		`;

		return div;
	}

}