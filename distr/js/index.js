/* 
fetchData

This function returns an array of movie objects based on a searchTerm passed in 
by the user. We use the axios library to send an request to the omdb api. 

params:
	searchTerm: The string we will use to send our request to the omdb api

return: returns an array of movie objects
*/
const fetchData = async (searchTerm) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params : {
			apikey : '6eddeff',
			s      : searchTerm
		}
	});

	if (response.data.Error) {
		return [];
	}

	return response.data.Search;
};

// Select the input text field
const input = document.querySelector('input');

/* 
OnInput

This function calls fetchData after a user inputs a string to search the imdb api.
We use the debounce function to limit how often fetchData will be invoked. We append the search
results to

params:
	event: The event object created when the user types into the search bar.

*/
const onInput = debounce(async (event) => {
	const movies = await fetchData(event.target.value);

	for (let movie of movies) {
		const div = document.createElement('div');

		div.innerHTML = `
			<img src="${movie.Poster}" />
			<h1>${movie.Title}</h1>
		`;

		document.querySelector('#target').appendChild(div);
	}
}, 500);

//The search bar will call onInput with each keystroke
input.addEventListener('input', onInput);
