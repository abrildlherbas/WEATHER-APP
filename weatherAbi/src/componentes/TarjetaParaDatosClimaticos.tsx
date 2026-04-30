import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';

type Props = {
  fecha: string;
  latitud: number;
  longitud: number;
  clave_de_api: string;
};

type Clima = {
  temp: number;
  descripcion: string;
  ciudad: string;
};

const TarjetaParaDatosClimaticos = ({
  fecha,
  latitud,
  longitud,
  clave_de_api,
}: Props) => {
  const [clima, setClima] = useState<Clima | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerClima = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${clave_de_api}&units=metric&lang=es`
        );

        const data = await res.json();

        setClima({
          temp: data.main.temp,
          descripcion: data.weather[0].description,
          ciudad: data.name,
        });
      } catch (error) {
        console.log('Error clima:', error);
      } finally {
        setLoading(false);
      }
    };

    obtenerClima();
  }, []);

  if (loading) {
    return (
      <View style={styles.card}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!clima) {
    return (
      <View style={styles.card}>
        <Text>Error al cargar clima</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.fecha}>{fecha}</Text>

      <Text style={styles.ciudad}>{clima.ciudad}</Text>

      <View style={styles.icono}>
        <Feather name="cloud" size={80} color="#555" />
      </View>

      <View style={styles.info}>
        <Text style={styles.temp}>{Math.round(clima.temp)}°C</Text>
        <Text>{clima.descripcion}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 260,
    height: 420,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  fecha: {
    alignSelf: 'flex-end',
    color: '#999',
  },

  ciudad: {
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 2,
  },

  icono: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  info: {
    alignItems: 'center',
    gap: 5,
  },

  temp: {
    fontSize: 50,
    fontWeight: 'bold',
  },
});

export default TarjetaParaDatosClimaticos;