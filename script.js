// Координаты города Navodari
const LATITUDE = 44.3467;
const LONGITUDE = 28.8297;
const API_KEY = '9280aada2cc49efb34f7ddbe8efa373c';
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}&units=metric&lang=ru`;

function getTimeOfDay(sunrise, sunset) {
    const now = new Date().getTime() / 1000;
    if (now >= sunrise && now < sunrise + 3600) return 'morning';
    if (now >= sunrise + 3600 && now < sunset - 3600) return 'day';
    if (now >= sunset - 3600 && now < sunset) return 'evening';
    return 'night';
}

function getWeatherCondition(weatherType, temp, timeOfDay) {
    weatherType = weatherType.toLowerCase();
    
    if (weatherType.includes('thunderstorm')) return 'thunderstorm';
    if (weatherType.includes('drizzle') || weatherType.includes('rain')) return 'rain';
    if (weatherType.includes('snow')) return 'snow';
    if (weatherType.includes('mist') || weatherType.includes('fog')) return 'fog';
    if (weatherType.includes('clear') || weatherType.includes('sunny')) {
        if (temp > 30) return 'hot';
        return timeOfDay;
    }
    if (weatherType.includes('cloud')) return timeOfDay;
    return timeOfDay;
}

async function getWeather() {
    try {
        const response = await fetch(WEATHER_API_URL);
        if (!response.ok) throw new Error('Ошибка при получении данных погоды');
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('weatherContent').innerHTML = 
            `<div class="error">❌ Ошибка: ${error.message}</div>`;
        console.error('Weather API Error:', error);
    }
}

function displayWeather(data) {
    const { main, weather, wind, sys } = data;
    const temp = Math.round(main.temp);
    const feelsLike = Math.round(main.feels_like);
    const humidity = main.humidity;
    const windSpeed = wind.speed;
    const description = weather[0].description;
    const weatherType = weather[0].main;

    const timeOfDay = getTimeOfDay(sys.sunrise, sys.sunset);
    const condition = getWeatherCondition(weatherType, temp, timeOfDay);

    let icon = '🌤️';
    let timeText = '';

    if (condition === 'thunderstorm') {
        icon = '⛈️';
        timeText = 'Гроза';
    } else if (condition === 'rain') {
        icon = '🌧️';
        timeText = 'Дождь';
    } else if (condition === 'snow') {
        icon = '❄️';
        timeText = 'Снег';
    } else if (condition === 'fog') {
        icon = '🌫️';
        timeText = 'Туман';
    } else if (condition === 'hot') {
        icon = '🔥';
        timeText = 'Жара';
    } else if (condition === 'morning') {
        icon = '🌅';
        timeText = 'Утро';
    } else if (condition === 'day') {
        icon = '☀️';
        timeText = 'День';
    } else if (condition === 'evening') {
        icon = '🌆';
        timeText = 'Вечер';
    } else if (condition === 'night') {
        icon = '🌙';
        timeText = 'Ночь';
    }

    const html = `
        <div class="weather-icon">${icon}</div>
        <div class="weather-description">${description}</div>
        <div class="weather-info">
            <div class="info-block">
                <p>Температура</p>
                <div class="value">${temp}°C</div>
            </div>
            <div class="info-block">
                <p>Ощущается как</p>
                <div class="value">${feelsLike}°C</div>
            </div>
            <div class="info-block">
                <p>Влажность</p>
                <div class="value">${humidity}%</div>
            </div>
            <div class="info-block">
                <p>Ветер</p>
                <div class="value">${windSpeed} м/с</div>
            </div>
        </div>
    `;

    document.getElementById('weatherContent').innerHTML = html;
    document.getElementById('timeInfo').textContent = timeText;
    updateWeatherEffects(condition);
    updateBackground(condition);
}

function updateBackground(condition) {
    document.body.className = condition;
}

function updateWeatherEffects(condition) {
    const weatherEffect = document.getElementById('weatherEffect');
    weatherEffect.innerHTML = '';

    if (condition === 'rain') {
        createRainEffect();
    } else if (condition === 'snow') {
        createSnowEffect();
    } else if (condition === 'fog') {
        createFogEffect();
    } else if (condition === 'thunderstorm') {
        createThunderstormEffect();
    } else if (condition === 'night') {
        createStarsEffect();
    } else if (condition === 'morning') {
        createMorningEffect();
    } else if (condition === 'day') {
        createDayEffect();
    } else if (condition === 'evening') {
        createEveningEffect();
    } else if (condition === 'hot') {
        createHotEffect();
    }
}

function createRainEffect() {
    const weatherEffect = document.getElementById('weatherEffect');
    for (let i = 0; i < 100; i++) {
        const raindrop = document.createElement('div');
        raindrop.className = 'raindrop';
        raindrop.style.left = Math.random() * 100 + '%';
        raindrop.style.top = Math.random() * -100 + '%';
        raindrop.style.animationDuration = (0.3 + Math.random() * 0.3) + 's';
        raindrop.style.animationDelay = Math.random() * 0.5 + 's';
        weatherEffect.appendChild(raindrop);
    }
}

function createSnowEffect() {
    const weatherEffect = document.getElementById('weatherEffect');
    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.top = Math.random() * -50 + '%';
        snowflake.style.animationDuration = (2 + Math.random() * 3) + 's';
        snowflake.style.animationDelay = Math.random() * 2 + 's';
        snowflake.style.width = (3 + Math.random() * 8) + 'px';
        snowflake.style.height = snowflake.style.width;
        weatherEffect.appendChild(snowflake);
    }
}

function createFogEffect() {
    const weatherEffect = document.getElementById('weatherEffect');
    for (let i = 0; i < 3; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        cloud.style.width = (200 + Math.random() * 300) + 'px';
        cloud.style.height = (100 + Math.random() * 150) + 'px';
        cloud.style.top = (Math.random() * 60) + '%';
        cloud.style.animationDuration = (15 + Math.random() * 20) + 's';
        cloud.style.animationDelay = Math.random() * 5 + 's';
        weatherEffect.appendChild(cloud);
    }
}

function createThunderstormEffect() {
    const weatherEffect = document.getElementById('weatherEffect');
    
    for (let i = 0; i < 3; i++) {
        const bolt = document.createElement('div');
        bolt.className = 'lightning-bolt';
        bolt.style.left = Math.random() * 100 + '%';
        bolt.style.top = Math.random() * 50 + '%';
        bolt.style.animationDelay = Math.random() * 3 + 's';
        weatherEffect.appendChild(bolt);
    }
    
    for (let i = 0; i < 150; i++) {
        const raindrop = document.createElement('div');
        raindrop.className = 'raindrop';
        raindrop.style.left = Math.random() * 100 + '%';
        raindrop.style.top = Math.random() * -100 + '%';
        raindrop.style.animationDuration = (0.2 + Math.random() * 0.2) + 's';
        raindrop.style.animationDelay = Math.random() * 0.3 + 's';
        weatherEffect.appendChild(raindrop);
    }
}

function createStarsEffect() {
    const weatherEffect = document.getElementById('weatherEffect');
    
    const moon = document.createElement('div');
    moon.className = 'moon';
    weatherEffect.appendChild(moon);
    
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 60 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        weatherEffect.appendChild(star);
    }
}

function createMorningEffect() {
    const weatherEffect = document.getElementById('weatherEffect');
    
    for (let i = 0; i < 2; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        cloud.style.width = (200 + Math.random() * 200) + 'px';
        cloud.style.height = (80 + Math.random() * 80) + 'px';
        cloud.style.top = (10 + Math.random() * 30) + '%';
        cloud.style.animationDuration = (20 + Math.random() * 10) + 's';
        cloud.style.animationDelay = Math.random() * 3 + 's';
        weatherEffect.appendChild(cloud);
    }
}

function createDayEffect() {
    const weatherEffect = document.getElementById('weatherEffect');
    
    const sun = document.createElement('div');
    sun.className = 'sun';
    weatherEffect.appendChild(sun);
}

function createEveningEffect() {
    const weatherEffect = document.getElementById('weatherEffect');
    
    for (let i = 0; i < 3; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        cloud.style.width = (200 + Math.random() * 300) + 'px';
        cloud.style.height = (100 + Math.random() * 100) + 'px';
        cloud.style.top = (15 + Math.random() * 40) + '%';
        cloud.style.background = 'rgba(255, 150, 100, 0.5)';
        cloud.style.animationDuration = (25 + Math.random() * 15) + 's';
        cloud.style.animationDelay = Math.random() * 4 + 's';
        weatherEffect.appendChild(cloud);
    }
}

function createHotEffect() {
    const weatherEffect = document.getElementById('weatherEffect');
    
    const sun = document.createElement('div');
    sun.className = 'sun';
    sun.style.boxShadow = '0 0 150px rgba(255, 136, 0, 0.8)';
    weatherEffect.appendChild(sun);
}

// Загружаем погоду при загрузке страницы
getWeather();

// Обновляем каждые 10 минут
setInterval(getWeather, 600000);
