import usarPronosticoClimatico from '../src/hooks/clima';
import LayoutParaLaPantallaPrincipalDelClima from '../src/componentes/contenedores/LayoutParaLaPantallaPrincipalDelClima';
import NavParaDesplazarseEntreDias from '../src/hooks/dias';
import { usarFechas } from '../src/hooks/dias';
import usarLocalizacion from '../src/hooks/localizacion';
import { View, Text } from 'react-native';

const PantallaInicialParaElClima = () => {
  const { fechas } = usarFechas();
  const { coordenadas, coordenadasDisponibles } = usarLocalizacion();

  return (
    <LayoutParaLaPantallaPrincipalDelClima>
      <NavParaDesplazarseEntreDias {...fechas()} />
      <View>
        {coordenadasDisponibles() && (
          <TarjetaParaDatosClimaticos
            fecha={fechas().hoy}
            latitud={coordenadas().latitud}
            longitud={coordenadas().longitud}
            clave_de_api={process.env.EXPO_PUBLIC_API_KEY as string}
          />
        )}
      </View>
    </LayoutParaLaPantallaPrincipalDelClima>
  );
};

const TarjetaParaDatosClimaticos = (props: Parameters<typeof usarPronosticoClimatico>[0]) => {
  const { ciudad, temperaturaEnGradosCelsius } = usarPronosticoClimatico(props);
  return (
    <View>
      <Text className="text-6xl">Ciudad: {ciudad()}</Text>
      <Text className="text-6xl">Temperatura: {temperaturaEnGradosCelsius()}</Text>
    </View>
  );
};

export default PantallaInicialParaElClima;
