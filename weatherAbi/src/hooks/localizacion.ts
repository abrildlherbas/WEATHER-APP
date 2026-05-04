import { useEffect, useState } from 'react';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  reverseGeocodeAsync,
} from 'expo-location';

const usarLocalizacion = () => {
  const [coordenadas, cambiarCoordenadas] = useState<{
    latitud: number;
    longitud: number;
    ciudad: string;
  } | null>(null);

  const [permiso, cambiarEstadoDeLosPermisos] = useState(false);

  useEffect(() => {
    async function obtenerLocalizacionActual() {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const loc = await getCurrentPositionAsync({});
      const { latitude, longitude } = loc.coords;

      const [lugar] = await reverseGeocodeAsync({ latitude, longitude });
      console.log('📍 LUGAR 👉', JSON.stringify(lugar, null, 2));

      // Prioridad: district → city → region → fallback
      let ciudad =
        (lugar?.district ||
          lugar?.city ||
          lugar?.region ||
          'VILLA LUGANO'
        ).toUpperCase();

      // 🔥 Hack para barrios de CABA
      if (ciudad === 'COMUNA 8') {
        ciudad = 'VILLA LUGANO';
      }

      cambiarCoordenadas({
        latitud: latitude,
        longitud: longitude,
        ciudad,
      });

      cambiarEstadoDeLosPermisos(true);
    }

    obtenerLocalizacionActual();
  }, []);

  return {
    coordenadas: () => coordenadas,
    coordenadasDisponibles: () => coordenadas !== null && permiso,
  };
};

export default usarLocalizacion;
