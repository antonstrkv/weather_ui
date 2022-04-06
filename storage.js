import { addSavedCity, getWeather } from "./main.js";

//localStorage.clear()

showStorage();

function showStorage() {
	if (localStorage.getItem('currentCity')) {
		let savedStorageCities = JSON.parse(localStorage.getItem('favoriteCities'));

		savedStorageCities.forEach(item => {
			addSavedCity(item)
		})
		getWeather(localStorage.getItem('currentCity'));
	}
}

export function saveStorageCurrentCity(Name) {
	const currentCity = Name;
	localStorage.setItem('currentCity', currentCity);
}

export function saveStorageFavoriteCities() {
	let favoriteCities = [];

	const savedElements = document.querySelectorAll('.main__btn');

	savedElements.forEach(item => {
		favoriteCities.push(item.textContent);
	})

	favoriteCities = JSON.stringify(favoriteCities);
	localStorage.setItem('favoriteCities', favoriteCities);
}
