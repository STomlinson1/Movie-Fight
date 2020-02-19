const fetchData = async () => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params : {
			apikey : '6eddeff',
			s      : 'avengers'
		}
	});

	console.log(response.data);
};

fetchData();
