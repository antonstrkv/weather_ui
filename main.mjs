import { UI_ELEMENTS, MONTHS, SERVER } from "./view.mjs"


UI_ELEMENTS.FORM_SEARCH.addEventListener('submit', () => {
	getWeather(getCity());
})


UI_ELEMENTS.HEART_BTN.addEventListener('click', () => {
	const isActiveClass = UI_ELEMENTS.HEART_BTN.className === 'weather-now__btn weather-now__btn--active';

	if (isActiveClass) {
		UI_ELEMENTS.HEART_BTN.classList.remove('weather-now__btn--active')
		removeSavedCityByHeart();
	} else {
		UI_ELEMENTS.HEART_BTN.classList.add('weather-now__btn--active')
		addSavedCity();
	}
})


for (let tabBtn of UI_ELEMENTS.TABS_BUTTONS) {
	tabBtn.addEventListener('click', () => {
		const idForTab = tabBtn.getAttribute('href')
		const currentTab = document.querySelector(idForTab)

		DeleteActiveClassesTabs()

		currentTab.classList.add('main-tabs__block--active')
		tabBtn.classList.add('main-tabs__item--active')
	})
}


function getWeather(inputValue) {
	loadJson(inputValue, SERVER.URL)
		.then(showInfo);

	loadJsonForecast(inputValue, SERVER.URL_HOURLY)
		.then(showInfoForecast);

	UI_ELEMENTS.INPUT_SEARCH.value = '';
}


function getCity() {
	return UI_ELEMENTS.INPUT_SEARCH.value;
}


function loadJson(cityName, serverUrl) {
	const url = `${serverUrl}?q=${cityName}&appid=${SERVER.API_KEY}`;

	return fetch(url)
		.then(response => {
			if (response.ok) {
				return response.json()
			} else {
				alert('Некорректный город')
			}
		})
		.catch(err => alert(`Ошибка: ${err.message}`))
}


function loadJsonForecast(cityName, serverUrl) {
	const url = `${serverUrl}?q=${cityName}&appid=${SERVER.API_KEY}`;

	return fetch(url)
		.then(response => {
			if (response.ok) {
				return response.json()
			}
		})
		.catch(err => alert(`Ошибка: ${err.message}`))
}


function showInfo(json) {
	UI_ELEMENTS.WEATHER_TEMPERATURE.textContent = Math.round(json.main.temp - 273.16) + '°';
	UI_ELEMENTS.WEATHER_NOW_IMG.src = `${SERVER.ICON}${json.weather[0].icon}.png`;
	UI_ELEMENTS.WEATHER_TITLE_NOW.textContent = json.name;

	UI_ELEMENTS.DETAILS_TITLE.textContent = json.name;
	UI_ELEMENTS.DETAILS_ITEMS[0].textContent = `Temperature: ${Math.round(json.main.temp - 273.16)}°`;
	UI_ELEMENTS.DETAILS_ITEMS[1].textContent = `Feels like: ${Math.round(json.main.feels_like - 273.16)}°`;
	UI_ELEMENTS.DETAILS_ITEMS[2].textContent = `Weather: ${json.weather[0].main}`;
	UI_ELEMENTS.DETAILS_ITEMS[3].textContent = `Sunrise: ${(new Date(json.sys.sunrise * 1000)).toLocaleTimeString().substring(0, 5)}`;
	UI_ELEMENTS.DETAILS_ITEMS[4].textContent = `Sunset: ${(new Date(json.sys.sunset * 1000)).toLocaleTimeString().substring(0, 5)}`;

	UI_ELEMENTS.FORECAST_TITLE.textContent = json.name;
	checkSavedStatus();
	showHeart();
}


function showInfoForecast(data) {
	deleteForecastItems();

	for (let i = 0; i < data.list.length; i++) {
		const date = dateConverter(data.list[i].dt);
		const time = timeConverter(data.list[i].dt);
		const temperature = Math.round(data.list[i].main.temp - 273.16);
		const feelsLike = Math.round(data.list[i].main.feels_like - 273.16);
		const icon = data.list[i].weather[0].icon;
		const weather = data.list[i].weather[0].description;
		addForecast(date, time, temperature, feelsLike, icon, weather);
	}
}


function DeleteActiveClassesTabs() {
	UI_ELEMENTS.TABS.forEach(tab => tab.classList.remove('main-tabs__block--active'))
	UI_ELEMENTS.TABS_BUTTONS.forEach(tabBtn => tabBtn.classList.remove('main-tabs__item--active'))
}


function createElementAddedLocation(text) {
	let li = document.createElement('li');
	li.className = 'city-list__item';

	const TEMPLATE = `
	<button class="main__btn">${text}</button>
	<button class="city-list__close-btn"></button>
	`;
	li.innerHTML = TEMPLATE;

	return li;
}


function addCityListeners() {
	const savedElements = document.querySelectorAll('.main__btn')

	savedElements.forEach(item => {
		item.addEventListener('click', () => {
			getWeather(item.textContent);
			UI_ELEMENTS.HEART_BTN.classList.add('weather-now__btn--active')
		})
	})
}


function addDeleteCityListeners() {
	const deleteButtons = document.querySelectorAll('.city-list__close-btn')
	deleteButtons.forEach(item => {
		item.addEventListener('click', () => {
			removeSavedCity(item);
			UI_ELEMENTS.HEART_BTN.classList.remove('weather-now__btn--active')
		})
	})
}


function addSavedCity() {
	let cityElement = createElementAddedLocation(UI_ELEMENTS.WEATHER_TITLE_NOW.textContent)
	UI_ELEMENTS.CITY_LIST.append(cityElement);
	addCityListeners();
	addDeleteCityListeners();
}


function removeSavedCity(element) {
	element.parentElement.remove();
}


function removeSavedCityByHeart() {
	const savedCities = document.querySelectorAll('.main__btn')

	savedCities.forEach(item => {
		if (UI_ELEMENTS.WEATHER_TITLE_NOW.textContent === item.textContent) {
			removeSavedCity(item);
		}
	})
}


function checkSavedStatus() {
	UI_ELEMENTS.HEART_BTN.classList.remove('weather-now__btn--active')
	const savedCities = document.querySelectorAll('.main__btn')

	savedCities.forEach(item => {
		if (UI_ELEMENTS.WEATHER_TITLE_NOW.textContent === item.textContent) {
			UI_ELEMENTS.HEART_BTN.classList.add('weather-now__btn--active')
		}
	})
}


function addForecast(date, time, temperature, feelsLike, icon, weather) {

	UI_ELEMENTS.HOURLY_INFO.insertAdjacentHTML('beforeend',
		`<li class="main__hourly-item">
			<article class="card-weather">
				<div class="card-weather__top">
					<time class="card-weather__date">${date}</time>
					<time class="card-weather__date">${time}</time>
				</div>
				<div class="card-weather__bottom">
					<div class="card-weather__box">
						<span class="card-weather__temperature">Temperature: ${temperature}°</span>
						<span class="card-weather__temperature">Feels like: ${feelsLike}°</span>
					</div>
					<div class="card-weather__box" style="background-image:url(${SERVER.ICON}${icon}.png)" >
						<p class="Forecast__text"> ${weather}</p>
					</div>
				</div>
			</article>
		</li>`
	)
}


function deleteForecastItems() {
	const Items = document.querySelectorAll('.main__hourly-item');

	Items.forEach(item => { item.remove(); })
}


function showHeart() {
	UI_ELEMENTS.HEART_BTN.classList.remove('hidden');
}


function dateConverter(unix) {
	const date = new Date(unix * 1000);
	const month = MONTHS[date.getMonth()];

	let day = String(date.getDate());
	if (day.length === 1) {
		day = 0 + day;
	}

	return `${ day } ${ month }`;
}


function timeConverter(unix) {
	const date = new Date(unix * 1000);

	let hour = String(date.getHours());
	if (hour.length === 1) {
		hour = 0 + hour;
	}
	let minute = String(date.getMinutes());
	if (minute.length === 1) {
		minute = 0 + minute;
	}

	return `${ hour }: ${ minute }`;
}
