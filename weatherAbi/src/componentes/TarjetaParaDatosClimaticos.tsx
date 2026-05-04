import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Svg, Circle, Line, Path, G } from 'react-native-svg';
import { useState } from 'react';
import { useClima } from '../hooks/useClima';

// ─── Tipos ────────────────────────────────────────────────────────────────────

type Props = {
  fecha: string | Date;
  latitud: number;
  longitud: number;
  clave_de_api: string;
  ciudadOverride?: string;
};

// ─── ESTILO BASE SVG (CLAVE) ─────────────────────────────────────────────────

const stroke = {
  stroke: '#111',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  fill: 'none',
};

// ─── ICONOS PRO ──────────────────────────────────────────────────────────────

const IconoSol = () => (
  <Svg width={120} height={120} viewBox="0 0 120 120">
    <Circle cx="60" cy="60" r="18" {...stroke} />
    <G {...stroke}>
      <Line x1="60" y1="10" x2="60" y2="25" />
      <Line x1="60" y1="95" x2="60" y2="110" />
      <Line x1="10" y1="60" x2="25" y2="60" />
      <Line x1="95" y1="60" x2="110" y2="60" />

      <Line x1="25" y1="25" x2="35" y2="35" />
      <Line x1="85" y1="85" x2="95" y2="95" />
      <Line x1="25" y1="95" x2="35" y2="85" />
      <Line x1="85" y1="35" x2="95" y2="25" />
    </G>
  </Svg>
);

const IconoLluvia = () => (
  <Svg width={120} height={120} viewBox="0 0 120 120">
    <Path
      d="M30 70 Q35 45 60 45 Q65 25 85 35 Q100 35 100 55 Q110 55 110 70 Q110 85 90 85 L40 85 Q30 85 30 70"
      {...stroke}
    />
    <G {...stroke}>
      <Line x1="40" y1="90" x2="35" y2="105" />
      <Line x1="60" y1="90" x2="55" y2="105" />
      <Line x1="80" y1="90" x2="75" y2="105" />
    </G>
  </Svg>
);

const IconoNublado = () => (
  <Svg width={130} height={100} viewBox="0 0 150 110">
    <Path
      d="M25 75 Q25 45 55 45 Q60 25 85 30 Q110 30 115 55 Q130 55 130 70 Q130 90 110 90 L50 90 Q25 90 25 75Z"
      {...stroke}
    />
  </Svg>
);

const IconoParcial = () => (
  <Svg width={130} height={110} viewBox="0 0 150 120">
    <Circle cx="55" cy="45" r="18" {...stroke} />
    <Path
      d="M25 80 Q25 55 50 55 Q55 35 75 40 Q95 40 100 60 Q115 60 115 75 Q115 90 95 90 L45 90 Q25 90 25 80Z"
      {...stroke}
    />
  </Svg>
);

const IconoNieve = () => (
  <Svg width={120} height={120} viewBox="0 0 120 120">
    <G {...stroke}>
      <Line x1="60" y1="20" x2="60" y2="100" />
      <Line x1="30" y1="40" x2="90" y2="80" />
      <Line x1="90" y1="40" x2="30" y2="80" />
    </G>
  </Svg>
);

const IconoTormenta = () => (
  <Svg width={120} height={120} viewBox="0 0 120 120">
    <Path
      d="M70 10 L40 60 H65 L45 110 L90 50 H65 Z"
      {...stroke}
    />
  </Svg>
);

// ─── RESOLVER ICONO ──────────────────────────────────────────────────────────

function resolverIcono(code: number): React.ReactNode {
  if (code === 1000) return <IconoSol />;
  if (code === 1003) return <IconoParcial />;
  if ([1006, 1009].includes(code)) return <IconoNublado />;
  if ([1063, 1180, 1183, 1186, 1189, 1192, 1195].includes(code))
    return <IconoLluvia />;
  if ([1066, 1114, 1210, 1213, 1216].includes(code)) return <IconoNieve />;
  if ([1087, 1273, 1276].includes(code)) return <IconoTormenta />;
  return <IconoNublado />;
}

// ─── FECHAS ───────────────────────────────────────────────────────────────────

function offsetFecha(base: Date, dias: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + dias);
  return d;
}

function fmt(d: Date) {
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

// ─── COMPONENTE ───────────────────────────────────────────────────────────────

export default function TarjetaParaDatosClimaticos({
  fecha,
  latitud,
  longitud,
  clave_de_api,
  ciudadOverride,
}: Props) {
  const [offset, setOffset] = useState(0);
  const base = offsetFecha(new Date(fecha), offset);
  const { clima, loading } = useClima(latitud, longitud, clave_de_api);

  if (loading)
    return (
      <View style={s.card}>
        <ActivityIndicator color="#111" />
      </View>
    );

  if (!clima)
    return (
      <View style={s.card}>
        <Text style={s.error}>Error al cargar clima</Text>
      </View>
    );

  const horasBarra = [
    { label: '', temp: clima.min, ahora: false },
    { label: '', temp: Math.round((clima.min + clima.temp) / 2), ahora: false },
    { label: 'NOW', temp: clima.temp, ahora: true },
    { label: '', temp: Math.round((clima.max + clima.temp) / 2), ahora: false },
    { label: '', temp: clima.max, ahora: false },
  ];

  return (
    <View style={s.card}>
      {/* NAV */}
      <View style={s.nav}>
        <TouchableOpacity onPress={() => setOffset(o => o - 1)}>
          <Text style={s.navArrow}>{'<'}</Text>
        </TouchableOpacity>

        <View style={s.navDates}>
          <Text style={s.navInactiva}>{fmt(offsetFecha(base, -1))}</Text>
          <View style={s.navActivaWrap}>
            <Text style={s.navActiva}>{fmt(base)}</Text>
          </View>
          <Text style={s.navInactiva}>{fmt(offsetFecha(base, 1))}</Text>
        </View>

        <TouchableOpacity onPress={() => setOffset(o => o + 1)}>
          <Text style={s.navArrow}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* CIUDAD */}
      <Text style={s.ciudad}>{ciudadOverride ?? clima.ciudad}</Text>

      {/* ICONO */}
      <View style={s.iconoWrap}>{resolverIcono(clima.code)}</View>

      {/* METRICAS */}
      <View style={s.metricas}>
        {[
          { val: clima.humedad, unit: '%' },
          { val: clima.presion, unit: 'hPa' },
          { val: clima.viento, unit: 'm/s' },
        ].map((m, i) => (
          <View key={i} style={s.metricaRow}>
            <Text style={s.metricaNum}>{m.val}</Text>
            <Text style={s.metricaUnit}>{m.unit}</Text>
          </View>
        ))}
      </View>

      {/* TEMP */}
      <View style={s.tempRow}>
        <Text style={s.tempActual}>{clima.temp}°</Text>
      </View>

      {/* BAR */}
      <View style={s.barra}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {horasBarra.map((h, i) => (
            <View key={i} style={s.barraItem}>
              <Text style={s.barraTmp}>{h.temp}°</Text>
              <Text style={s.barraLabel}>{h.label}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

// ─── ESTILOS ──────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  card: {
    width: 260,
    backgroundColor: '#fafafa',
    borderRadius: 32,
    padding: 20,
    alignItems: 'center',
  },

  error: { color: '#999' },

  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  navArrow: { fontSize: 14, color: '#bbb' },

  navDates: { flexDirection: 'row', gap: 8 },
  navInactiva: { color: '#ccc', fontSize: 10 },
  navActivaWrap: { borderBottomWidth: 1, borderBottomColor: '#111' },
  navActiva: { fontWeight: '700' },

  ciudad: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 4,
    marginVertical: 10,
  },

  iconoWrap: { marginVertical: 10 },

  metricas: { flexDirection: 'row', gap: 12 },
  metricaRow: { alignItems: 'center' },
  metricaNum: { fontSize: 14 },
  metricaUnit: { fontSize: 10, color: '#999' },

  tempRow: { marginVertical: 10 },
  tempActual: { fontSize: 48, fontWeight: '900' },

  barra: { marginTop: 10 },
  barraItem: { alignItems: 'center', marginHorizontal: 6 },
  barraTmp: { fontSize: 12 },
  barraLabel: { fontSize: 8, color: '#ccc' },
});