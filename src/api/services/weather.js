import client from '../client';

const getWeatherByLocation = async (location) => {
   const params = {
      q: location,
      units: 'metric',
      appid: ''
   }

   let data = {}, error = null;

   try {
      const res = await client.get('weather', { params });
      data = res.data;
   } catch (err) {
      error = new Error(err.message);
   }

   return { data, error }
}

export default getWeatherByLocation;
