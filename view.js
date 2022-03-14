export const UI_ELEMENTS = {
	TABS_BUTTONS: document.querySelectorAll('.main-tabs__item'),
	TABS: document.querySelectorAll('.main-tabs__block'),
	FORM_SEARCH: document.querySelector('.search-form'),
	INPUT_SEARCH: document.querySelector('.search__input'),
	WEATHER_TITLE_NOW: document.querySelector('.weather-title__now'),
	WEATHER_TEMPERATURE: document.querySelector('.weather-now__temperature'),
	WEATHER_NOW_IMG: document.querySelector('.weather-now__img'),
	HEART_BTN: document.querySelector('.weather-now__btn'),
	CITY_BUTTONS: document.querySelectorAll('.main__btn'),
	CITY_LIST: document.querySelector('.city-list'),
	DETAILS_TITLE: document.querySelector('.weather-details__title'),
	DETAILS_ITEMS: document.querySelectorAll('.weather-detail__list-item'),
	HOURLY_INFO: document.querySelector('.weather-forecast__list'),
	FORECAST_TITLE: document.querySelector('.weather-forecast__title'),
}

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const SERVER = {
	ICON: 'https://openweathermap.org/img/w/',
	URL: 'http://api.openweathermap.org/data/2.5/weather',
	URL_HOURLY: 'https://api.openweathermap.org/data/2.5/forecast',
	API_KEY: '1041b355b3b6422eb66d9f5e517f7b52',
}