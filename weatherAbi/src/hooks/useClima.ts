import { useEffect, useState } from 'react';

type Clima = {
  temp: number;
  min: number;
  max: number;
  ciudad: string;
  descripcion: string;
  humedad: number;
  viento: number;
  presion: number;
  code: number;
};

export const useClima = (
  lat: number,
  lon: number,
  apiKey: string
) => {
  const [clima, setClima] = useState<Clima | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClima = async () => {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=1&lang=es`
        );

        const data = await res.json();

        if (!data.current || !data.location) {
          throw new Error('API inválida');
        }

        setClima({
          temp: Math.round(data.current.temp_c),
          min: Math.round(data.forecast.forecastday[0].day.mintemp_c),
          max: Math.round(data.forecast.forecastday[0].day.maxtemp_c),
          ciudad: data.location.name.toUpperCase(),
          descripcion: data.current.condition.text,
          humedad: data.current.humidity,
          presion: data.current.pressure_mb,
          viento: parseFloat((data.current.wind_kph / 3.6).toFixed(1)),
          code: data.current.condition.code,
        });
      } catch (e) {
        console.log('Error clima:', e);
        setClima(null);
      } finally {
        setLoading(false);
      }
    };

    fetchClima();
  }, [lat, lon]);

  return { clima, loading };
};