import usarPronosticoClimatico from '../src/hooks/clima';
import LayoutParaLaPantallaPrincipalDelClima from '../src/componentes/contenedores/LayoutParaLaPantallaPrincipalDelClima';
import NavParaDesplazarseEntreDias from '../src/componentes/NavParaDesplazarseEntreDias';
import { usarFechas } from '../src/hooks/dias';
import usarLocalizacion from '../src/hooks/localizacion';
import TarjetaParaDatosClimaticos from '../src/componentes/TarjetaParaDatosClimaticos';

import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

const PantallaInicialParaElClima = () => {
  const { fechas } = usarFechas();
  const { coordenadas, coordenadasDisponibles } = usarLocalizacion();

  return (
    <LayoutParaLaPantallaPrincipalDelClima>
      <NavParaDesplazarseEntreDias {...fechas()} />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {coordenadasDisponibles() && (
          <>
            <TarjetaParaDatosClimaticos
              fecha={fechas().hoy}
              latitud={coordenadas().latitud}
              longitud={coordenadas().longitud}
              clave_de_api={process.env.EXPO_PUBLIC_API_KEY as string}
              ciudadOverride={coordenadas().ciudad}
            />

            <TarjetaParaDatosClimaticos
              fecha={fechas().maniana}
              latitud={coordenadas().latitud}
              longitud={coordenadas().longitud}
              clave_de_api={process.env.EXPO_PUBLIC_API_KEY as string}
              ciudadOverride={coordenadas().ciudad}
            />

            <TarjetaParaDatosClimaticos
              fecha={fechas().ayer}
              latitud={coordenadas().latitud}
              longitud={coordenadas().longitud}
              clave_de_api={process.env.EXPO_PUBLIC_API_KEY as string}
              ciudadOverride={coordenadas().ciudad}
            />
          </>
        )}
      </ScrollView>
    </LayoutParaLaPantallaPrincipalDelClima>
  );
};

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
    gap: 20,
  },

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

export default PantallaInicialParaElClima;