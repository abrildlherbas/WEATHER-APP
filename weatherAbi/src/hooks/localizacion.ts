import { useEffect, useState } from 'react';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';

export const usarLocalizacion = () => {
  const [coordenadas, cambiarCoordenadas] = useState<{
    latitud: number;
    longitud: number;
  } | null>(null);

  const [permiso, cambiarEstadoDeLosPermisos] = useState(false);

  useEffect(() => {
    async function obtenerLocalizacionActual() {
      const { status } = await requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.log('❌ Permiso denegado');
        return;
      }

      const localizacion = await getCurrentPositionAsync({});

      console.log('📍 COORDENADAS REALES 👉', localizacion.coords);

      cambiarCoordenadas({
        latitud: localizacion.coords.latitude,
        longitud: localizacion.coords.longitude,
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