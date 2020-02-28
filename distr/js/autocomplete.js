const createAutoComplete = ({
	root,
	renderOption,
	onOptionSelect,
	inputValue,
	fetchData
}) => {
	root.innerHTML = `
    <label><b>Search</b></label>
    <input class = "input" />
    <div class="dropdown">
      <div class= "dropdown-menu">
        <div class = "dropdown-content results"></div>
      </div>
    </div>
  `;

	// Select the input text field
	const input = root.querySelector('input');
	const dropdown = root.querySelector('.dropdown');
	const resultsWrapper = root.querySelector('.results');

	/* 
  OnInput
  
  This function calls fetchData after a user inputs a string to search the imdb api.
  We use the debounce function to limit how often fetchData will be invoked. We append the search
  results to
  
  params:
    event: The event object created when the user types into the search bar.
  
  */
	const onInput = debounce(async (event) => {
		const items = await fetchData(event.target.value);

		if (!items.length) {
			dropdown.classList.remove('is-active');
			return;
		}

		resultsWrapper.innerHTML = '';
		dropdown.classList.add('is-active');
		for (let item of items) {
			const option = document.createElement('a');

			option.classList.add('dropdown-item');
			option.innerHTML = renderOption(item);

			option.addEventListener('click', () => {
				dropdown.classList.remove('is-active');
				input.value = inputValue(item);
				onOptionSelect(item);
			});
			resultsWrapper.appendChild(option);
		}
	}, 500);

	//The search bar will call onInput with each keystroke
	input.addEventListener('input', onInput);

	//The Search options will collapse if we click anywhere on the screen other than the dropdown menu
	document.addEventListener('click', (event) => {
		if (!root.contains(event.target)) {
			dropdown.classList.remove('is-active');
		}
	});
};
