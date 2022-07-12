import { addSavedCity, getWeather } from "./main.js";

//localStorage.clear()

showStorage();

function showStorage() {
		let savedStorageCities = JSON.parse(localStorage.getItem('favoriteCities'));

		savedStorageCities.forEach(item => {
			addSavedCity(item)
		})
		getWeather(getCookie());
	}


export function saveStorageCurrentCity(currentCity) {
	let updatedCookie = "currentCity=" + encodeURIComponent(currentCity) + ";max-age=3600";
	document.cookie = updatedCookie;
}
	
function getCookie() {
	let name = 'currentCity';
	let matches = document.cookie.match(new RegExp(
	  "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : "Kiev";
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
