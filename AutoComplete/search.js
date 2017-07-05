class SearchField{


	constructor(form,arr) {
		this.form = form;
		this.input = form.querySelector('.search-input');
		this.ul = form.querySelector('.result');
		this.items = form.querySelectorAll('.item');
		this.copyArr = arr.slice();
		this.mainArr =	arr.slice();
		this.mainArr.sort((a,b)=>{
			return a.toLowerCase().localeCompare(b.toLowerCase());
		});
		this.mainArr = this.mainArr.map((el)=>{
			return `
				<li class="item" data-name='${el}'>
					${el}
				</li>
			`;
		});
		

		//    input
		this.AddInputCallback('keyup',(event)=>this.KeyUPInput(event));
		this.AddInputCallback('focusin',(event)=>this.DisplaySort(event));
		
		
		// form
		this.AddSearchFormCallback('click',(event)=>this.ClickSearchForm(event));

		//document
		document.documentElement.addEventListener('click',(event)=>this.DocumClick(event));

		this.form.addEventListener('keydown',(event)=>{
			if(event.keyCode == 13 && this.form.querySelector('.item.active'))
				event.preventDefault();
		});

	}

	AddInputCallback(eventStr,func){
		this.input.addEventListener(eventStr,(event)=>func(event));
	}

	AddSearchFormCallback(eventStr,func){
		this.form.addEventListener(eventStr,(event)=>func(event));
	}

	KeyControl(event){
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
			if(prev)
				prev.classList.toggle('active');
			else
				return false;
		}
		else{
			if(next)
				next.classList.toggle('active');
			else
				return false;
		}
		elem.classList.toggle('active');
		return false;

		}
		if(event.keyCode == 13){
			let elem = this.form.querySelector('.item.active');
			if(elem){
				this.DisplayItem(elem);
			}
		}
			return true;
	}

	LostFocus(event){
		let forms = document.querySelectorAll('.search-form');
		forms.forEach((el)=>{
				el.querySelector('.result').innerHTML = '';
		});
	}

	KeyUPInput(event){
		if(this.KeyControl(event))
			this.DisplayResult(this.input.value);
	}

	ClickSearchForm(event){

		let elem = event.target;
		elem =(elem.parentNode.dataset.name)? elem.parentNode:elem;
		if(elem.dataset.name)
		{
			this.DisplayItem(elem);
		}
	}

	DocumClick(event){
		let elem = event.target;
		if(!elem.classList.contains('item') 
			&& !elem.classList.contains('search-input') 
			&& !elem.classList.contains('w-style'))
			this.ul.innerHTML = '';
	}

	DisplaySort(event){
		let forms = document.querySelectorAll('.search-form');
		forms.forEach((el)=>{
				el.querySelector('.result').innerHTML = '';
		});
		
		if(this.input.value !== '')
		{
			this.DisplayResult(this.input.value);
			return;
		}
		
		this.RenderItems(this.mainArr);
	}

	DisplayItem(elem){
		this.input.value = elem.dataset.name;
		this.ul.innerHTML = '';
		setTimeout(()=>alert(this.input.value),10);
	}

	RenderItems(arr){
		this.ul.innerHTML = arr.join('');
	}

	DisplayResult(value){
		let matches = this.FindMatch(value,this.copyArr);
		let reg = new RegExp(value, 'gi');
		let max = 5, count = 0;
		let arr;
		if(value === ''){
			this.DisplaySort();
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

		arr = matches.map((country)=>{

			if(count < max)
				count++;
			else
				return;

			let str = country.replace(reg,`<span class='w-style'>${value.toLowerCase()}</span>`);
			return `
				<li class="item" data-name='${country}'>
					${str}
				</li>
			`;
		});

		this.RenderItems(arr);
	}

	FindMatch(search,arr){
		search = search.toLowerCase();
		return arr.filter((item)=>{
			return item.toLowerCase().includes(search);
		});
	}

}