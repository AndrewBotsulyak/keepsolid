/*
Class represents TodoListItem.
@param {HTMLElement} item - DOM Element (<li>).

@property {HTMLElement} item - <li>.
@property {HTMLElement} parentElem - <ul>.
@property {HTMLElement} input - text field.
@property {HTMLElement} delete - delete <li>.
@property {HTMLElement} check - checkbox inside <li>.
*/
export default class TodoListItem{
	
	constructor(item) {
		
		this.item = item;
		this.parentElem = this.item.parentNode;
		this.input = this.item.querySelector('.edit-input');
		this.delete = this.item.querySelector('.delete');
		this.check = this.item.querySelector('.check');

		// create Custom Event
		this.closeEvent = new CustomEvent('closeItem', { cancelable: true });

		this.check.addEventListener('click', (event) => this.onClickCheckbox(event));

		this.delete.addEventListener('click', (event) => this.onDelete(event))
		
	}

	onClickCheckbox(event) {

		if(this.isChecked()){
			this.input.style.textDecoration = 'line-through';
			this.input.setAttribute('disabled', 'disabled');
		}
		else{
			this.input.style.textDecoration = 'none';
			this.input.removeAttribute('disabled');
		}
	}

	isChecked() {
		return this.check.checked; 
	}

	onDelete(event) {					
		this.item.dispatchEvent(this.closeEvent); 
	}

	// return DOMElement 
	getItem() {
		return this.item;
	}

	setValue(text) {
		this.input.value = text;
	}

	static createDOMElement() {
		const li = document.createElement('li');
		li.classList.add('todo-list--item');

		li.innerHTML = `
			<input type="checkbox" class='check'/>
			<input type="text" class='edit-input' />
			<div class="delete">×</div>
		`;
		
		return li;
	}



}