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
	const data = await fetch(endpoint).then((response) => response.json());
	const newId = data.slip.id;
	// If return same advice
	if (id && newId === id) {
		return fetchAdviceAndRenderToDOM();
	}
	// If not, then...
	const advice = data.slip.advice;
	// Render to DOM
	content.innerHTML = `“${advice}”`;
	adviceId.innerHTML = newId;
	// Set current id
	id = newId;
}
