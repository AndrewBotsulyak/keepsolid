import Autocomplete from './autocomplete.js';



/*
Class represents chips over Autocomplete class.
@extends Autocomplete.
@param {HTMLElement} form - DOM Element (form with input).
@param {Array} arr - Array with information.
@property {HTMLElement} chipsElem - container for all chips-item.
@property {HTMLElement} chipsResult - string with all chips names.
@property {Array} chipsArr - array with all chips names.
*/
export default class Chips extends Autocomplete{
	constructor(form, arr){
		super(form, arr);
		this.chipsElem = this.form.querySelector('.chips');
		this.chipsResult = this.form.querySelector('.chips-result');
		this.chipsArr = [];

	}

	addChip(name){
		if(!this.chipsArr.includes(name)){
			this.chipsArr.push(name)
			return true;
		}
		return false;
	}

	removeChip(chip){
		let name = chip.dataset.name;

		this.chipsArr = this.chipsArr.filter((item) => item != name);

		chip.parentNode.removeChild(chip);

		this.displayChipResult(this.chipsArr);
	}

	displayItem(elem){      			// override method
		let name = elem.dataset.name;

		if(this.addChip(name)){
			let newItem = this.chipTemplate(name);			// return DOM Element
			this.chipsElem.insertBefore(newItem, this.chipsElem.lastElementChild); // add in DOM
			this.displayChipResult(this.chipsArr);
		}
	}

	displayChipResult(arr){
		this.chipsResult.innerHTML = arr.join(', ');
	}

	chipTemplate(name){
		let item = document.createElement('li');
		item.className = 'chips-item';
		item.dataset.name = name;
		item.innerHTML = `
			<span class="chips-item--name">${name}</span>
			<div class="chips-item--close">×</div>
		`;
		return item;
	}

	clickSearchForm(event){     // override method
		let elem = event.target;

		if(event.target.classList.contains('chips-item--close')){
			let chip = elem.parentNode;
			this.removeChip(chip);
		}
		super.clickSearchForm(event);
	}


}