
/*
Class represents form with autocomplete option.
@param {HTMLElement} form - DOM Element (form with input).
@param {Array} arr - Array with information.
@property {HTMLElement} form - form.
@property {HTMLElement} input - form's input.
@property {HTMLElement} ul - form's ul with all matches.
@property {HTMLElement} items - ul's items.
@property {Array} copyArr - array for showing current result of search.
@readonly
@property {Array} mainArr - array with all information.
*/
export default class Autocomplete{


	constructor(form,arr) {
		this.form = form;
		this.input = form.querySelector('.search-input');
		this.ul = form.querySelector('.result');
		this.items = form.querySelectorAll('.item');
		this.copyArr = arr.slice();
		this.mainArr =	arr.slice();
		this.copyArr.sort((a,b)=> a.toLowerCase().localeCompare(b.toLowerCase()));
		this.mainArr.sort((a,b)=> a.toLowerCase().localeCompare(b.toLowerCase()));
		this.mainArr = this.mainArr.map((el)=>{
			return `
				<li class="item" data-name='${el}'>
					${el}
				</li>
			`;
		});

		//    input
		this.input.addEventListener('keyup', (event) => this.keyUPInput(event));
		this.input.addEventListener('focusin', (event) => this.displaySort(event));

		// form
		this.form.addEventListener('click',(event)=>this.clickSearchForm(event));
		this.form.addEventListener('keydown',(event)=>{
			if(event.keyCode == 13 && this.form.querySelector('.item.active'))
				event.preventDefault();
		});

		//document
		document.documentElement.addEventListener('click',(event)=>this.documClick(event));

	}

	keyControl(event){
		if(event.keyCode == 40 || event.keyCode == 38){

		let elem = this.form.querySelector('.item.active');
		let prev, next;
		
		if(!elem){
			elem = this.form.querySelector('.item');
			elem.classList.toggle('active');
			return false;
		}

		prev = elem.previousElementSibling;
		next = elem.nextElementSibling;

		if(event.keyCode == 38){
			if(prev) prev.classList.toggle('active');
			else return false;
		}
		else{
			if(next) next.classList.toggle('active');
			else return false;
		}
		elem.classList.toggle('active');
		return false;

		}
		if(event.keyCode == 13){
			let elem = this.form.querySelector('.item.active');
			if(elem){
				this.displayItem(elem);
			}
		}
			return true;
	}

	lostFocus(event){
		let forms = document.querySelectorAll('.search-form');
		forms.forEach((el)=> el.querySelector('.result').innerHTML = '');
	}

	keyUPInput(event){
		if(this.keyControl(event)) this.displayResult(this.input.value);
	}

	clickSearchForm(event){
		let elem = event.target;
		if(elem.classList.contains('item'))
		{
			this.displayItem(elem);
		}
	}

	documClick(event){
		let elem = event.target;
		if(!elem.classList.contains('item') 
			&& !elem.classList.contains('search-input') 
			&& !elem.classList.contains('w-style'))
			this.ul.innerHTML = '';
	}

	displaySort(event){
		let forms = document.querySelectorAll('.search-form');
		forms.forEach((el)=> el.querySelector('.result').innerHTML = '');
		
		if(this.input.value !== '')
		{
			this.displayResult(this.input.value);
			return;
		}
		
		this.renderItems(this.mainArr);
	}

	displayItem(elem){
		this.input.value = elem.dataset.name;
		this.ul.innerHTML = '';
		setTimeout(()=>alert(this.input.value),10);
	}

	renderItems(arr){
		this.ul.innerHTML = arr.join('');
	}

	displayResult(value){
		let matches = this.findMatch(value,this.copyArr);
		let reg = new RegExp(value, 'gi');
		let max = 5, count = 0;
		let arr;
		if(value === ''){
			this.displaySort();
			max = matches.length;
			return;
		}
		if(matches.length == 0){
			this.input.classList.add('nofind');
			this.ul.innerHTML = "<li class='item'>Нет совпадений</li>";
			return;
		}
		else {
			this.input.classList.remove('nofind');
		}

		arr = this.makeDOMList(matches, reg, value);

		this.renderItems(arr);
	}

	makeDOMList(matchesArr, reg, value, count = 0, max = 5){
		return matchesArr.map((country)=>{
			if(count < max) count++;
			else return;

			let str = country.replace(reg,`<span class='w-style'>${value.toLowerCase()}</span>`);
			return `
				<li class="item" data-name='${country}'>
					${str}
				</li>
			`;
		});
	}

	findMatch(search,arr){
		search = search.toLowerCase();
		return arr.filter((item)=> item.toLowerCase().includes(search));
	}

}