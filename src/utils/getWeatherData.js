import { fetchApi } from "./";

const getWeatherData = async (date, time, location) => {
  try {
    date = date.replace(/\//gi, "-");
    const baseUrl =
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

    const weatherData = await fetchApi(
      `${baseUrl}${location}/${date}T${time}:00?key=${process.env.REACT_APP_VISUAL_CROSSING_KEY}&include=current`,
      { method: "GET" }
    );

    const data = weatherData.currentConditions;
    return { icon: data.icon, conditions: data.conditions };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

export default getWeatherData;
