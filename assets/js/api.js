const btnGetPos = document.getElementById("getLocation");

const divInfo = document.getElementById("weather-infos");
const cardHeader = document.getElementById("weather-header");
const cardBody = document.getElementById("weather-body");
const weatherIco = document.getElementById("weather-ico");
const cardFooter = document.getElementById("weather-footer");
const skyState = document.getElementById("sky-state");
const tempState = document.getElementById("temp-state");
const city = document.getElementById("city");
const card = document.getElementById("card");
const cardFront = document.querySelector(".card-front");
const cardBack = document.querySelector(".card-back");
const longitude = document.getElementById('longitude');
const latitude = document.getElementById('latitude');
const tempMin = document.getElementById('temp-min');
const tempMax = document.getElementById('temp-max');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const wind = document.getElementById('wind');

const apiKey = "af9b9ec2b1d5fa676df0970fc7aaeb20";
let urlDefault =
	"https://api.openweathermap.org/data/2.5/weather?lat=48.8450165&lon=2.3995822&units=metric&appid=af9b9ec2b1d5fa676df0970fc7aaeb20";
let lat;
let lon;

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
	urlAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=fr&units=metric&appid=af9b9ec2b1d5fa676df0970fc7aaeb20`;
	callApi(urlAPI);
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
			switch (weatherId) {
				case 200:
					weatherIco.src = "assets/img/light.png";
					break;
				case 300:
					weatherIco.src = "assets/img/rain+light.png";
					break;
				case 500:
					weatherIco.src = "assets/img/rain.png";
					break;
				case 600:
					weatherIco.src = "assets/img/snow.png";
					break;
				case 700:
					weatherIco.src = "assets/img/cloudy.png";
					break;
				case 800:
					weatherIco.src = "assets/img/sunny.png";
					break;
				case 801:
					weatherIco.src = "assets/img/clouds.png";
					break;
			}
			// ? weatherFooter -> AllStates
			skyState.textContent = `${data.weather[0].description}`;
			tempState.textContent = `${Math.floor(data.main.temp)} °C (${Math.floor(data.main.feels_like)} ressenti)`;
			city.textContent = `${data.name} - ${data.sys.country}`;
			card.addEventListener("touchmove", () => {
				cardFront.classList.toggle("active");
				cardBack.classList.toggle("active");
			});
			card.addEventListener("click", () => {
				cardFront.classList.toggle("active");
				cardBack.classList.toggle("active");
			});
			let unix_timestamp_sunset = data.sys.sunrise;
			let unix_timestamp_sunrise = data.sys.sunset;
			let sunsetConv = convertUNIXTimestamp(unix_timestamp_sunset);
			let sunriseConv = convertUNIXTimestamp(unix_timestamp_sunrise);


			longitude.textContent = `${data.coord.lon}`;
			latitude.textContent = `${data.coord.lat}`;
			tempMin.textContent = `${Math.floor(data.main.temp_min)} °C`;
			tempMax.textContent = `${Math.floor(data.main.temp_max)} °C`;
			sunrise.textContent = `${sunsetConv}`;
			sunset.textContent = `${sunriseConv}`;
			wind.textContent = `${data.wind.speed} m/s`;


		})
		.catch((error) => console.log(error));
}

function convertUNIXTimestamp(time){
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
	getLocation();
});
