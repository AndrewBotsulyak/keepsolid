import Autocomplete from './autocomplete.js';

const defaultOptions = {
	onSelectItem: function(event){
		console.log('add new chip, value: ',event.target.dataset.name);
	},
	repeat: false  // bool, allows to click one or more(true) times on item .
}

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
	constructor(form, arr, options){
		super(form, arr, options);
		this.chipsElem = this.form.querySelector('.chips');
		this.chipsResult = this.form.querySelector('.chips-result');
		this.chipsArr = [];
		this.chipsArrElements = new Map();
		this.options = Object.assign({}, defaultOptions, options);
		this.onSelectItem = this.options.onSelectItem;				// option callback to select items    

	}

	addChip(name){
		if(this.options.repeat || !this.chipsArr.includes(name)){
			this.chipsArr.push(name);
			return true;
		}
		return false;
	}

	removeChip(chip){
		let name = chip.dataset.name;

		this.chipsArrElements.delete(chip);	              // delete current chip
		this.chipsArr = [];								  // reset array of strings with names
		for(let value of this.chipsArrElements.values()){ 
			this.chipsArr.push(value);  				  // save current order for chipsResult															
		}													

		chip.parentNode.removeChild(chip);
		
		this.displayChipResult(this.chipsArr);
	}

	selectItem(elem){      			    //  default behaviour on select items.
		let name = elem.dataset.name;

		if(this.addChip(name)){
			let newItem = this.chipTemplate(name);		// return DOM Element
			this.chipsArrElements.set(newItem, name);	// add element (Map())
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
