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

	constructor(todo = null, title = '', arrItems = [] ){

		this.todoElem = todo;
		this.input = this.todoElem.querySelector('.main-input');
		this.add = this.todoElem.querySelector('.add-item');
		this.ul = this.todoElem.querySelector('.todo-list');
		this.clearList = this.todoElem.querySelector('.clearAll');
		this.titleElem = this.todoElem.querySelector('.title');
		this.deleteTodo = this.todoElem.querySelector('.delete-todo');

		this.titleElem.textContent = title;
		this.title = title;
		this.arrItems = [];

		this.parent = (() => {
			let build = this.todoElem.parentElement;
			while(!build.classList.contains('todo-container')){
				build = build.parentElement;
			}
			return build;
		})();

		this.state = {
			title: title,
			arrItems
		}
		
		this.deleteTodo.addEventListener('click', (event) => this.onRemove(event));

		this.titleElem.addEventListener('keyup', (event) => this.onType(event));			

		//	subscribe on TodoListItem's 'closeItem' event
		this.ul.addEventListener('closeItem', (event) => this.onDeleteItem(event));  

		this.todoElem.addEventListener('submit', (event) => this.onAddItem(event));
		
		this.clearList.addEventListener('click', (event) => this.clearAll(event));

	}

	setState(newState){
		this.state = Object.assign({}, this.state, newState);
		this.dispStateChangeEvent();
	}

	onRemove(event){
		let closeEvent = new CustomEvent('TodoList.remove', {
			 	bubbles: true,
				cancelable: true,
				detail:{
					item: this
				}
			});
		this.todoElem.dispatchEvent(closeEvent);
		this.parent.removeChild(this.todoElem);
	}

	onType(event){
		this.title = this.titleElem.textContent;
		this.setState({ title: this.title });
	}

	dispStateChangeEvent(){
		const stateEvent = new CustomEvent('todostatechange',{
			bubbles: true,
			detail:{
				item: this,
				state: this.state
			}
		 });
		 this.todoElem.dispatchEvent(stateEvent);
	}

	createFromStorage() {
		this.state.arrItems.forEach(el => {
			const newElem = this.ul.appendChild(TodoListItem.createElement());
			const objItem =  new TodoListItem(newElem, el.checked, el.content);
			this.arrItems.push(objItem);
		});
	}

	onAddItem(event) {
		event.preventDefault();
		if(!this.isInputEmpty()){
			debugger;
			const newElem = this.ul.appendChild(TodoListItem.createElement());
			const objItem =  new TodoListItem(newElem, null, this.input.textContent);
			this.arrItems.push(objItem);
			this.setState({ arrItems: this.arrItems.map(el => el.state)});
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
		const elem = event.detail.item;
		this.arrItems = this.arrItems.filter(el => el !== elem);
		
		this.setState({ arrItems: this.arrItems.map(el => el.state)});
	}

	// clear list of items
	clearAll(event){
		if(this.arrItems.length !== 0){
			this.arrItems.forEach(elem => elem.remove());
			this.arrItems = [];

			this.setState({ arrItems: [] });
		}
	}

	static createElement(){
		const div = document.createElement('div');
		div.classList.add('todo');
		div.innerHTML = `
			<form action="" class="todo-form">
				<div class="delete-todo">×</div>
				<div class='title' contenteditable="true"></div>
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