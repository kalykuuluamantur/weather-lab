// Импорт библиотеки для работы с HTTP-запросами
const fetch = require("node-fetch");

// Функция для получения данных о погоде
async function fetchWeather(city) {
  // API ключ OpenWeatherMap
  const apiKey = "your_api_key_here"; // Замените на ваш API ключ

  // URL для получения данных о погоде
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    // Отправляем GET-запрос к API
    const response = await fetch(url);

    // Проверяем статус-код ответа
    if (response.ok) {
      // Если запрос успешен, обрабатываем данные
      const data = await response.json();
      // Извлекаем необходимую информацию о погоде
      const weatherDescription = data.weather[0].description;
      const temperature = data.main.temp;
      const temperatureCelsius = temperature - 273.15; // Конвертируем в градусы Цельсия
      return `Погода в ${city}: ${weatherDescription}, температура: ${temperatureCelsius.toFixed(
        2
      )}°C`;
    } else {
      return "Ошибка при получении данных о погоде";
    }
  } catch (error) {
    console.error("Произошла ошибка:", error);
    return "Произошла ошибка при выполнении запроса";
  }
}

// Пример использования функции
const city = "Moscow";
fetchWeather(city)
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
