const endpoint = 'https://api.adviceslip.com/advice';
// References
const button = document.querySelector('.js-box-button');
const content = document.querySelector('.js-box-content');
const adviceId = document.querySelector('.js-box-id');
// To avoid fetching same advice
let id;

document.addEventListener('DOMContentLoaded', fetchAdviceAndRenderToDOM);
button.addEventListener('click', fetchAdviceAndRenderToDOM);

async function fetchAdviceAndRenderToDOM() {
	const randomID = randomInteger(1, 224);
	if (id && randomID === id) {
		return fetchAdviceAndRenderToDOM();
	}
	const data = await fetch(`${endpoint}/${randomID}`).then((response) => response.json());
	// Extract advice content
	const advice = data.slip.advice;
	// Render to DOM
	content.innerHTML = `“${advice}”`;
	adviceId.innerHTML = randomID;
	// Set current id
	id = randomID;
}

function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
