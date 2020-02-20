/* 
debounce

This function is a debouncer we can use throughout the application
when making request. We take in the function to be executed and 
wrap it with the debouncer. timeOutId and setTimeOut ensure a set
ammount of time will pass before making the request. In this case,
each keystroke in the search field will clear the timeout and start
the timer again. Once a second has passed, the request will be made
with the user given input string. 

*/
const debounce = (func, delay = 1000) => {
	let timeOutId;
	return (...args) => {
		if (timeOutId) {
			clearTimeout(timeOutId);
		}
		timeOutId = setTimeout(() => {
			func.apply(null, args);
		}, delay);
	};
};
