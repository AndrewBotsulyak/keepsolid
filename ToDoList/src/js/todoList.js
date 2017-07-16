import TodoListItem from './todoListItem.js';

/*
Class represents TodoList.
@param {HTMLElement} todo - DOMElement container of ToDo App.

@property {HTMLElement} todo - DOM Element container of ToDo App.
@property {HTMLElement} input - text field for writing a new todo.
@property {HTMLElement} add - adding todo in list (<ul>).
@property {HTMLElement} ul - container of <li>.
@property {Array} arr - array with TodoListItems.
*/
export default class TodoList{

	constructor(todo) {

		this.todo = todo;
		this.input = this.todo.querySelector('.main-input');
		this.add = this.todo.querySelector('.add-item');
		this.ul = this.todo.querySelector('.todo-list');
		this.arr = [];

		this.add.addEventListener('click', (event) => this.onAddItem(event));		
	}

	onAddItem(event) {
		if(!this.isInputEmpty()){
			const newItem = TodoListItem.createDOMElement();	// create new HTMLElement -> li
			const newElem = this.ul.appendChild(newItem);

			const objItem = new TodoListItem(newElem);

			// subscribe on TodoListItem event
			newElem.addEventListener('closeItem', (event) => this.onDeleteItem(objItem));  

			objItem.setValue(this.input.value);
			
			this.arr.push(objItem);
		}
	}

	isInputEmpty() {
		return (this.input.value) ? false : true;
	}

	/*
	@param {TodoListItem} obj - TodoListItem which will be delete from DOM.
	*/
	onDeleteItem(obj) {
		
		this.ul.removeChild(obj.getItem());

		this.arr = this.arr.filter(el => el !== obj);
	}

}