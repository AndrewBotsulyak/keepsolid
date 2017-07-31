function createItemElement(){
	const li = document.createElement('li');
	li.classList.add('todo-list--item');

	li.innerHTML = `
		<label class='check-label'>
			<input type="checkbox" class='check' />
		</label>
		<div class="edit-input" contenteditable="false" ></div>
		<div class="edit"></div>
		<div class="delete">×</div>
	`;
	
	return li;
}

export { createItemElement };

/**
 * Class represents TodoListItem.
 * @param {HTMLElement} item - DOM Element (<li>).
 * 
 * @property {HTMLElement} item - <li>.
 * @property {HTMLElement} delete - delete <li>.
 * @property {HTMLElement} check - checkbox inside <li>.
 * @property {HTMLElement} editElem -  btn for edit input
 */
export default class TodoListItem{

	constructor( item = null, checked = false, content = '' ){

		this.itemElem = item;
		this.input = this.itemElem.querySelector('.edit-input');
		this.delete = this.itemElem.querySelector('.delete');
		this.check = this.itemElem.querySelector('.check');
		this.editElem = this.itemElem.querySelector('.edit'); 
		this.labelElem = this.itemElem.querySelector('.check-label');

		this.parent = (() => {
			let todo = this.itemElem.parentElement;
			while(!todo.classList.contains('todo-list')){
				todo = todo.parentElement;
			}
			return todo;
		})();

		this.state = {
			checked: checked,
			content
		}

		this.setValue(content);
		this.setChecked(checked);
		 
		// create Custom Event

		this.input.addEventListener('keyup', (event) => this.onType(event));

		this.editElem.addEventListener('click', (event) => this.onEdit(event));

		this.check.addEventListener('click', (event) => this.ClickCheckbox(event));

		this.delete.addEventListener('click', (event) => this.onDelete(event));
	}



	onType(event){
		this.setState({content: this.input.textContent});
	}

	dispStateChangeEvent(){
		const stateEvent = new CustomEvent('todostatechange',{
			bubbles: true,
			detail:{
				item: this,
				state: this.state
			}
		 });
		 this.itemElem.dispatchEvent(stateEvent);
	}

	createFromStorage(){
		this.setValue(content);
		this.check.checked = this.state.checked;
	}

	setState(newState){
		this.state = Object.assign({}, this.state, newState);
		this.dispStateChangeEvent();
	}

	ClickCheckbox(event) {
		if(this.isEditable()) this.toggleEdit();
		if(this.isChecked()){
			this.input.style.textDecoration = 'line-through';
			this.setEditable(false);
			this.labelElem.classList.add('check-label-active');
		}
		else{
			this.input.style.textDecoration = 'none';
			this.labelElem.classList.remove('check-label-active');			
		}

		this.setState({checked: this.isChecked()});
		

	}

	isChecked() {
		return this.check.checked; 
	}

	setChecked(bool){
		this.check.checked = bool;
		if(bool){
			this.input.style.textDecoration = 'line-through';
			this.setEditable(false);
			this.labelElem.classList.add('check-label-active');
		}
		else{
			this.input.style.textDecoration = 'none';
			this.labelElem.classList.remove('check-label-active');
		}
	}

	setEditable(bool){
		if(bool){
			this.input.contentEditable = 'true';
		}
		else{
			this.input.contentEditable = 'false';
		}
	}

	isEditable(){
		return this.input.contentEditable === 'true';
	}

	toggleEdit(){
		if(!this.isEditable()){
			this.setEditable(true);
			this.input.style.outline = 'auto 5px rgb(77, 144, 254)';
		}
		else {
			this.setEditable(false);
			this.input.style.outline = 'none';
		} 
	}

	// click on 'this.editElem' callback
	onEdit(event){
		if(this.isChecked()) return;

		this.toggleEdit();
	}

	// click on 'this.delete' callback, dispatch 'closeItem' event.
	onDelete(event) {					
		let closeEvent = new CustomEvent('closeItem', {
			 	bubbles: true,
				cancelable: true,
				detail:{
					item: this
				}
			});
		this.itemElem.dispatchEvent(closeEvent);
		this.remove();  
	}

	remove(){
		this.parent.removeChild(this.itemElem);
		return this;
	}

	getItem() {
		return this.itemElem;
	}

	/**
	 * @param {Object} obj - obj with styles  
	 */
	setStyle(obj){
		for(let prop in obj){
			this.itemElem.style[prop] = obj[prop];
		}
	}

	/**
	 * @param {string} text - input value.
	 */
	setValue(text = '') {
		this.input.textContent = text;
	}

}