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

	init(item){

		this.itemElem = item;
		this.input = this.itemElem.querySelector('.edit-input');
		this.delete = this.itemElem.querySelector('.delete');
		this.check = this.itemElem.querySelector('.check');
		this.editElem = this.itemElem.querySelector('.edit'); 


		// create Custom Event
		this.closeEvent = new CustomEvent('closeItem', { bubbles: true, cancelable: true });

		this.editElem.addEventListener('click', (event) => this.onEdit(event));

		this.check.addEventListener('click', (event) => this.onClickCheckbox(event));

		this.delete.addEventListener('click', (event) => this.onDelete(event));
	}

	onClickCheckbox(event) {
		if(this.isEditable()) this.toggleEdit();
		if(this.isChecked()){
			this.input.style.textDecoration = 'line-through';
			this.setEditable(false);
		}
		else{
			this.input.style.textDecoration = 'none';
		}
	}

	isChecked() {
		return this.check.checked; 
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
		this.itemElem.dispatchEvent(this.closeEvent); 
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
	setValue(text) {
		this.input.textContent = text;
	}

	createElement() {
		const li = document.createElement('li');
		li.classList.add('todo-list--item');

		li.innerHTML = `
			<input type="checkbox" class='check' />
			<div class="edit-input" contenteditable="false" ></div>
			<div class="edit"></div>
			<div class="delete">×</div>
		`;
		
		return li;
	}



}