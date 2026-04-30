import { View, Text, StyleSheet } from 'react-native';

const NavParaDesplazarseEntreDias = ({ hoy, ayer, maniana }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>{ayer.toDateString()}</Text>

      <Text style={[styles.texto, styles.activo]}>{hoy.toDateString()}</Text>

      <Text style={styles.texto}>{maniana.toDateString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },

  texto: {
    color: '#999',
  },

  activo: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default NavParaDesplazarseEntreDias;
