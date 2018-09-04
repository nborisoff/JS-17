const line = document.getElementById('line');
const rightHandle = document.getElementById('rightHandle');
const leftHandle = document.getElementById('leftHandle');
const middleHandle = document.getElementById('middleHandle');
let tabs = document.getElementsByClassName('tabs_content');

rightHandle.addEventListener('click', (e) => {
	
	line.classList.remove('left');
	line.classList.remove('middle');
	line.classList.add('right');
	
		if(!e.target.classList.contains('active')){

			leftHandle.classList.remove('active','show');
			middleHandle.classList.remove('active','show');
			tabs[0].classList.remove('active');
			tabs[1].classList.remove('active');
			tabs[2].classList.add('active');
			
			setTimeout( () =>{
				e.target.classList.add('active');
			},300);
			
			setTimeout( () =>{
				e.target.classList.add('show');
			},600);
			
		}
});

leftHandle.addEventListener('click', (e) => {
	
	line.classList.remove('right');
	line.classList.remove('middle');
	line.classList.add('left');
	
		if(!e.target.classList.contains('active')){
			
			rightHandle.classList.remove('active','show');
			middleHandle.classList.remove('active','show');
			tabs[1].classList.remove('active');
			tabs[2].classList.remove('active');
			tabs[0].classList.add('active');
			
			setTimeout( () =>{
				e.target.classList.add('active');
			},300);
			
			setTimeout( () =>{
				e.target.classList.add('show');
			},600);
			
		}
});

middleHandle.addEventListener('click', (e) => {
	
	line.classList.remove('left');
	line.classList.remove('right');
	line.classList.add('middle');
	
		if(!e.target.classList.contains('active')){

			leftHandle.classList.remove('active','show');
			rightHandle.classList.remove('active','show');
			tabs[0].classList.remove('active');
			tabs[2].classList.remove('active');
			tabs[1].classList.add('active');
			
			setTimeout( () =>{
				e.target.classList.add('active');
			},300);
			
			setTimeout( () =>{
				e.target.classList.add('show');
			},600);
			
		}
});
