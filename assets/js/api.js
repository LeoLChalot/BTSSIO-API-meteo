const btnGetPos = document.getElementById("getLocation");
const btnGetSearch = document.getElementById("getSearch");
const divInfo = document.getElementById("weather-infos");
const cardHeader = document.getElementById("weather-header");
const cardBody = document.getElementById("weather-body");
const weatherIco = document.getElementById("weather-ico");
const cardFooter = document.getElementById("weather-footer");
const skyState = document.getElementById("sky-state");
const tempState = document.getElementById("temp-state");
const city = document.getElementById("city");
const btnMore = document.querySelector("#more");
const btnLess = document.querySelector("#less");
const card = document.getElementById("card");
const cardFront = document.querySelector(".card-front");
const cardBack = document.querySelector(".card-back");
const longitude = document.getElementById("longitude");
const latitude = document.getElementById("latitude");
const tempMin = document.getElementById("temp-min");
const tempMax = document.getElementById("temp-max");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const wind = document.getElementById("wind");
let cityInput = "";
const apiKey = "af9b9ec2b1d5fa676df0970fc7aaeb20";
let urlDefault =
	"https://api.openweathermap.org/data/2.5/weather?lat=48.8450165&lon=2.3995822&units=metric&appid=af9b9ec2b1d5fa676df0970fc7aaeb20";
let lat;
let lon;
btnMore.style["opacity"] = "0";

// ? API Geolocation -> Récupération de la géolocalisation
function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
	} else {
		console.error("Geolocation is not supported by this browser.");
	}
}
const successCallback = (position) => {
	lat = position.coords.latitude;
	lon = position.coords.longitude;
	if (cityInput == "") {
		urlAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=fr&units=metric&appid=af9b9ec2b1d5fa676df0970fc7aaeb20`;
		callApi(urlAPI);
	} else {
		urlAPI = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&lang=fr&units=metric&appid=af9b9ec2b1d5fa676df0970fc7aaeb20`;
		callApi(urlAPI);
	}
};
const errorCallback = (error) => {
	console.log(error);
};
function callApi(urlAPI) {
	axios
		.get(urlAPI)
		.then((response) => {
			console.log(response.data);
			let data = response.data;
			console.log(data.weather);
			console.log(data.weather[0].id);
			let weatherId = data.weather[0].id;
			// ? weatherBody -> WeatherIco
			if (200 > weatherId > 299) {
				weatherIco.src = "assets/img/light.png";
				cardFront.background = "url(assets/img/jpg/light.jpg)";
				cardBack.background = "url(assets/img/jpg/light.jpg)";
			} else if (300 > weatherId > 499) {
				weatherIco.src = "assets/img/rain+light.png";
				cardFront.style.background = "url(assets/img/jpg/rain+light.jpg)";
				cardBack.background = "url(assets/img/jpg/light.jpg)";
			} else if (500 > weatherId > 599) {
				weatherIco.src = "assets/img/rain.png";
				cardFront.style.background = "url(assets/img/jpg/rain.jpg)";
				cardBack.background = "url(assets/img/jpg/light.jpg)";
			} else if (600 > weatherId > 699) {
				weatherIco.src = "assets/img/snow.png";
				cardFront.style.background = "url(assets/img/jpg/snow.jpg)";
				cardBack.background = "url(assets/img/jpg/light.jpg)";
			} else if (700 > weatherId > 799) {
				weatherIco.src = "assets/img/cloudy.png";
				cardFront.style.background = "url(assets/img/jpg/cloudy.jpg)";
				cardBack.background = "url(assets/img/jpg/light.jpg)";
			} else if (weatherId == 800) {
				weatherIco.src = "assets/img/sunny.png";
				cardFront.style.background = "url(assets/img/jpg/sunny.jpg)";
				cardBack.style.background = "url(assets/img/jpg/sunny.jpg)";
			} else {
				weatherIco.src = "assets/img/clouds.png";
				cardFront.style.background = "url(assets/img/jpg/clouds.jpg)";
				cardBack.background = "url(assets/img/jpg/light.jpg)";
			}
			cardFront.style.backgroundSize = "cover";
			cardBack.style.backgroundSize = "cover";
			cardFooter.style.color = "white";

			// ? weatherFooter -> AllStates
			skyState.textContent = `${data.weather[0].description}`;
			tempState.textContent = `${Math.floor(data.main.temp)} °C (${Math.floor(data.main.feels_like)} ressenti)`;
			city.textContent = `${data.name} - ${data.sys.country}`;
			btnMore.style["opacity"] = "1";

			let unix_timestamp_sunset = data.sys.sunrise;
			let unix_timestamp_sunrise = data.sys.sunset;
			let sunsetConv = convertUNIXTimestamp(unix_timestamp_sunset);
			let sunriseConv = convertUNIXTimestamp(unix_timestamp_sunrise);

			longitude.textContent = `${data.coord.lon}`;
			latitude.textContent = `${data.coord.lat}`;
			longitude.style["color"] = "#005c12";
			latitude.style["color"] = "#005c12";
			tempMin.textContent = `${Math.floor(data.main.temp_min)} °C`;
			tempMin.style["color"] = "#2271b3";
			tempMax.textContent = `${Math.floor(data.main.temp_max)} °C`;
			tempMax.style["color"] = "#b32d2e";
			sunrise.textContent = `${sunsetConv}`;
			sunset.textContent = `${sunriseConv}`;
			sunrise.style["color"] = "#bd8600";
			sunset.style["color"] = "#bd8600";
			wind.textContent = `${data.wind.speed} m/s`;
			wind.style["color"] = "#043959";
		})
		.catch((error) => console.log(error));
}
function convertUNIXTimestamp(time) {
	let date = new Date(time * 1000);
	// Hours part from the timestamp
	let hours = date.getHours();
	// Minutes part from the timestamp
	let minutes = "0" + date.getMinutes();
	// Seconds part from the timestamp
	let seconds = "0" + date.getSeconds();
	// Will display time
	let formattedTime = hours + "h" + minutes.substr(-2);
	//  + ":" + seconds.substr(-2)
	console.log(formattedTime);
	return formattedTime;
}
btnGetPos.addEventListener("click", () => {
	if (!cityInput == "") {
		cityInput = "";
	}
	getLocation();
});
btnGetSearch.addEventListener("click", () => {
	cityInput = window.prompt("Ville", "");
	cityInput = cityInput.trim();
	console.log("city : " + city);
	getLocation();
});
btnMore.addEventListener("click", () => {
	cardFront.classList.toggle("active");
	cardBack.classList.toggle("active");
});
btnLess.addEventListener("click", () => {
	cardFront.classList.toggle("active");
	cardBack.classList.toggle("active");
});
