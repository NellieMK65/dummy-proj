const BASE_URL = 'http://localhost:3000/films';

document.addEventListener('DOMContentLoaded', () => {
	fetchMovies();

	// search movies
	const form = document.querySelector('#search-form');
	form.addEventListener('submit', (e) => {
		// prevent default behavior
		e.preventDefault();
		const input = document.querySelector('#search');

		if (input.value) {
			fetchMovies(input.value);
		} else {
			fetchMovies();
		}
	});

	// add movie
	const addMovieForm = document.querySelector('#add-movie-form');
	addMovieForm.addEventListener('submit', (e) => {
		e.preventDefault();

		const formData = new FormData(addMovieForm);
		const data = Object.fromEntries(formData);

		addMovie(data);
	});
});

function fetchMovies(searchTerm = '') {
	fetch(`${BASE_URL}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((res) => res.json())
		.then((movies) => {
			// clear movies
			document.querySelector('#movies').innerHTML = '';

			// if search term is available we filter
			if (searchTerm) {
				// filter out movies that match the search input
				movies
					.filter((movie) =>
						movie.title
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
					)
					.forEach((movie) => renderMovie(movie));
			} else {
				movies.forEach((movie) => renderMovie(movie));
			}
		})
		.catch((err) => console.log(err));
}

function renderMovie(movie) {
	const moviesContainer = document.querySelector('#movies');

	const parentDiv = document.createElement('div');
	parentDiv.classList.add('card');

	const image = document.createElement('img');
	image.classList.add('card-img-top', 'mt-2');
	image.height = 200;
	image.src = movie.poster;
	image.alt = movie.title;

	// append the image to the parent div
	parentDiv.appendChild(image);

	const cardBody = document.createElement('div');
	cardBody.classList.add('card-body');

	// movie title
	const title = document.createElement('h5');
	title.className = 'card-title';
	title.innerText = movie.title;
	title.style.minHeight = '50px';

	// movie description
	const description = document.createElement('p');
	description.className = 'card-text';
	description.innerText = movie.description;
	description.style.minHeight = '150px';

	const seats = document.createElement('p');
	seats.className = 'card-text';
	seats.innerText = `Seats available: ${movie.capacity - movie.tickets_sold}`;

	// button
	const button = document.createElement('button');
	button.classList.add('btn', 'btn-primary');
	button.innerText = 'Buy movie';
	button.addEventListener('click', () => {
		alert(`Movie with id ${movie.id} clicked`);
	});

	cardBody.append(title, description, seats, button);

	// append card body to parent div
	parentDiv.appendChild(cardBody);

	// append each card to the movie container
	moviesContainer.appendChild(parentDiv);
}

function addMovie(movie) {
	// console.log(JSON.stringify({ ...movie, tickets_sold: 0 }));
	fetch(`${BASE_URL}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ ...movie, tickets_sold: 0 }),
	})
		.then((res) => res.json())
		.then(() => {
			// if movie is added successfully
			// 1. close the modal
			const myModalEl = document.getElementById('exampleModal');
			const modal = bootstrap.Modal.getInstance(myModalEl);
			modal.hide();

			// 2. refetch our movies
			fetchMovies();
		})
		.catch((error) => console.log(error));
}
