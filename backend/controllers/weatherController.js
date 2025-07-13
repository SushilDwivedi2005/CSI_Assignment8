import axios from "axios";

export const getWeather = async (req, res, next) => {
  try {
    const { city } = req.query;
    const apiKey = process.env.OPENWEATHER_API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const { data } = await axios.get(url);
    console.log(data)
    res.json({
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
    });
  } catch (err) {
    next(err);
  }
};
