const BASE_URL = 'http://localhost:3000/films';

document.addEventListener('DOMContentLoaded', () => {
	fetchMovies();
});

function fetchMovies() {
	fetch(`${BASE_URL}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((res) => res.json())
		.then((movies) => {
			movies.forEach((movie) => renderMovie(movie));
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

	// button
	const button = document.createElement('button');
	button.classList.add('btn', 'btn-primary');
	button.innerText = 'Buy movie';

	cardBody.append(title, description, button);

	// append card body to parent div
	parentDiv.appendChild(cardBody);

	// append each card to the movie container
	moviesContainer.appendChild(parentDiv);
}
