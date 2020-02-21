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

const root = document.querySelector('.autocomplete');

root.innerHTML = `
	<label><b>Search For a Move</b></label>
	<input class = "input" />
	<div class="dropdown">
		<div class= "dropdown-menu">
			<div class = "dropdown-content results"></div>
		</div>
	</div>
`;

// Select the input text field
const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

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

	if (!movies.length) {
		dropdown.classList.remove('is-active');
		return;
	}

	resultsWrapper.innerHTML = '';
	dropdown.classList.add('is-active');
	for (let movie of movies) {
		const option = document.createElement('a');
		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

		option.classList.add('dropdown-item');
		option.innerHTML = `
			<img src="${imgSrc}" />
			${movie.Title}
		`;

		option.addEventListener('click', () => {
			dropdown.classList.remove('is-active');
			input.value = movie.Title;
		});
		resultsWrapper.appendChild(option);
	}
}, 500);

//The search bar will call onInput with each keystroke
input.addEventListener('input', onInput);

document.addEventListener('click', (event) => {
	if (!root.contains(event.target)) {
		dropdown.classList.remove('is-active');
	}
});
