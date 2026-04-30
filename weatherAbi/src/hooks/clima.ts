import { useQuery } from '@tanstack/react-query';

export const usarPronosticoClimatico = ({
  fecha,
  latitud,
  longitud,
  clave_de_api,
}: {
  fecha: Date;
  latitud: number;
  longitud: number;
  clave_de_api: string;
}) => {
  const { isPending, isError, error, data } = useQuery({
    queryKey: [
      fecha.getDate(),
      fecha.getHours(),
      latitud.toPrecision(2),
      longitud.toPrecision(2),
    ],

    queryFn: async () => {
      const resultado = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${clave_de_api}&q=${latitud},${longitud}`
      );

      const data = await resultado.json();

      // 🔍 DEBUG (podés borrarlo después)
      console.log('RESPUESTA API 👉', data);

      return data;
    },
  });

  return {
    // estados
    estaPendiente: () => isPending,
    huboUnProblema: () => isError,

    // datos seguros (NO rompen nunca)
    ciudad: () => data?.location?.name ?? 'Cargando...',
    condicionClimatica: () => data?.current?.condition?.text ?? '',
    humedadEnPorcentaje: () => data?.current?.humidity ?? 0,
    presionEnHectopascales: () => data?.current?.pressure_mb ?? 0,
    velocidadDelVientoEnKilometrosPorHora: () => data?.current?.wind_kph ?? 0,
    temperaturaEnGradosCelsius: () => data?.current?.temp_c ?? 0,

    // error
    descripcionDelProblema: () =>
      isError ? (error as Error).message : '',

    // objeto completo
    pronostico: () =>
      data?.current
        ? {
            condicion_climatica: data.current.condition?.text ?? '',
            humedad_en_porcentaje: data.current.humidity ?? 0,
            presion_en_hectopascales: data.current.pressure_mb ?? 0,
            velocidad_del_viento_en_kilometros_por_hora:
              data.current.wind_kph ?? 0,
            temperatura_en_grados_celsius: data.current.temp_c ?? 0,
          }
        : null,
  };
};

export default usarPronosticoClimatico;